const fs = require('fs');
const zlib = require('zlib');

const raw = fs.readFileSync('public/memories.pdf', 'latin1');

function parseObjects(data) {
  const objects = {};
  const re = /(\d+)\s+0\s+obj([\s\S]*?)\bendobj/g;
  let m;
  while ((m = re.exec(data)) !== null) {
    objects[parseInt(m[1], 10)] = m[2];
  }
  return objects;
}

function getStreamData(objBody) {
  const sm = objBody.match(/stream\r?\n([\s\S]*?)endstream/);
  if (!sm) return null;
  let data = sm[1].replace(/\r?\n$/, '');
  if (objBody.includes('/FlateDecode')) {
    try { data = zlib.inflateSync(Buffer.from(data, 'latin1')).toString('latin1'); }
    catch (e) {
      try { data = zlib.inflateRawSync(Buffer.from(data, 'latin1')).toString('latin1'); }
      catch (e2) { return null; }
    }
  }
  return data;
}

const objects = parseObjects(raw);
const cmapData = getStreamData(objects[9]);
const glyphMap = {};
{
  const bfcharRe = /beginbfchar\s*([\s\S]*?)endbfchar/g;
  let m;
  while ((m = bfcharRe.exec(cmapData)) !== null) {
    const entries = [...m[1].matchAll(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/g)];
    entries.forEach(e => { glyphMap[parseInt(e[1], 16)] = String.fromCodePoint(parseInt(e[2], 16)); });
  }
}

const pageObjNums = [7, 16, 19, 23, 27, 31];

pageObjNums.forEach((objNum, pi) => {
  const stream = getStreamData(objects[objNum]);
  if (!stream) { console.log('PAGE ' + (pi+1) + ': no stream'); return; }
  console.log('\n========== PAGE ' + (pi + 1) + ' ==========');
  
  let pos = 0;
  while (true) {
    const bt = stream.indexOf('BT', pos);
    if (bt === -1) break;
    const et = stream.indexOf('ET', bt);
    if (et === -1) break;
    const block = stream.substring(bt, et + 2);
    pos = et + 2;

    // Only process blocks that render text (have Tf)
    if (!block.includes('Tf')) continue;

    const tm = block.match(/(-?[\d.]+) (-?[\d.]+) (-?[\d.]+) (-?[\d.]+) (-?[\d.]+) (-?[\d.]+) Tm/);
    if (!tm) continue;
    const startX = parseFloat(tm[5]);
    const startY = parseFloat(tm[6]);
    const scaleX = parseFloat(tm[1]);
    const fontSize = parseFloat((block.match(/\/FT8 ([\d.]+) Tf/) || [0,'240'])[1]);

    // Parse glyphs and TD advances
    const parts = [];
    const re = /<([0-9a-fA-F]{2,4})>\s*Tj|(-?[\d.]+) (-?[\d.]+) TD/g;
    let m;
    while ((m = re.exec(block)) !== null) {
      if (m[2] !== undefined) {
        parts.push({ t: 'adv', dx: parseFloat(m[2]) });
      } else {
        const code = parseInt(m[1], 16);
        parts.push({ t: 'g', ch: glyphMap[code] !== undefined ? glyphMap[code] : '?' });
      }
    }

    // Reconstruct with positions: x-space advance per glyph = dx * scaleX
    // We'll use total advance including a trailing offset
    let curX = startX;
    let str = '';
    let prevEnd = startX;
    let prevAdv = 0;
    let glyphCount = 0;
    parts.forEach(p => {
      if (p.t === 'adv') {
        prevAdv = p.dx;
      } else {
        const w = prevAdv * scaleX; // graphical width of previous glyph approx
        // gap between prev glyph start and this glyph start
        if (glyphCount > 0) {
          // A word space renders as extra gap beyond normal kerning
          // Normal letter gaps: G = w (they're laid sequentially with no overlap, advancements = widths)
        }
        str += p.ch;
        glyphCount++;
        prevEnd = curX;
        curX += w;
      }
    });

    console.log('y=' + startY.toFixed(1) + ' x=' + startX.toFixed(1) + ' fs=' + fontSize + ' scale=' + scaleX + ' : ' + str);
  }
});