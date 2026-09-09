const fs = require('fs');
const zlib = require('zlib');

const raw = fs.readFileSync('public/memories.pdf', 'latin1');

function parseObjects(data) {
  const objects = {};
  const re = /(\d+)\s+0\s+obj([\s\S]*?)\bendobj/g;
  let m;
  while ((m = re.exec(data)) !== null) objects[parseInt(m[1], 10)] = m[2];
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
  const m = /beginbfchar\s*([\s\S]*?)endbfchar/g.exec(cmapData);
  if (m) [...m[1].matchAll(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/g)].forEach(e => {
    glyphMap[parseInt(e[1], 16)] = String.fromCodePoint(parseInt(e[2], 16));
  });
}

// Expected advance per glyph (in TD units): W[c] * 0.24
const widths = {};
{
  const wm = objects[10].match(/\/W\s*\[([\s\S]*?)\]/);
  if (wm) {
    const tokens = wm[1].trim().split(/\s+/);
    let i = 0;
    while (i < tokens.length) {
      const c = parseInt(tokens[i], 10);
      i++;
      if (tokens[i] === '[') {
        i++;
        const arr = [];
        while (tokens[i] !== ']') { arr.push(parseInt(tokens[i], 10)); i++; }
        i++;
        arr.forEach((w, idx) => { widths[c + idx] = w; });
      } else { widths[c] = parseInt(tokens[i], 10); i++; }
    }
  }
}

const pageObjNums = [7, 16, 19, 23, 27, 31];

pageObjNums.forEach((objNum, pi) => {
  const stream = getStreamData(objects[objNum]);
  if (!stream) return;
  const blocks = [];
  let pos = 0;
  while (true) {
    const bt = stream.indexOf('BT', pos);
    if (bt === -1) break;
    const et = stream.indexOf('ET', bt);
    if (et === -1) break;
    const block = stream.substring(bt, et + 2);
    pos = et + 2;
    if (!block.includes('Tf')) continue;

    const tm = block.match(/(-?[\d.]+) (-?[\d.]+) (-?[\d.]+) (-?[\d.]+) (-?[\d.]+) (-?[\d.]+) Tm/);
    if (!tm) continue;
    const startX = parseFloat(tm[5]);
    const startY = parseFloat(tm[6]);

    // Parse glyphs with advances
    const ops = [];
    const re = /<([0-9a-fA-F]{2,4})>\s*Tj|(-?[\d.]+) (-?[\d.]+) TD/g;
    let m;
    while ((m = re.exec(block)) !== null) {
      if (m[2] !== undefined) ops.push({ t: 'adv', dx: parseFloat(m[2]) });
      else ops.push({ t: 'g', code: parseInt(m[1], 16) });
    }
    // compute glyph string and total advance in graph pts (dx * 0.05)
    let text = '';
    let totalAdv = 0;
    ops.forEach(op => {
      if (op.t === 'adv') totalAdv += op.dx;
      else text += glyphMap[op.code] !== undefined ? glyphMap[op.code] : '?';
    });
    blocks.push({ y: startY, x: startX, text, endX: startX + totalAdv * 0.05, totalAdv });
  }

  // Sort blocks: by y desc (top-down after flip), then x asc
  blocks.sort((a, b) => (b.y - a.y) || (a.x - b.x));

  // Group into lines by y
  const lines = [];
  blocks.forEach(b => {
    const last = lines[lines.length - 1];
    if (last && Math.abs(last.y - b.y) < 3) {
      last.items.push(b);
    } else lines.push({ y: b.y, items: [b] });
  });

  console.log('\n========== PAGE ' + (pi + 1) + ' ==========');
  lines.forEach(line => {
    // Build text: insert space if gap between prev block end and this block start > 2.2pt (space ~4pt)
    let out = '';
    let prev = null;
    line.items.forEach(b => {
      if (prev) {
        const gap = b.x - prev.endX;
        if (gap > 2.2) out += ' '; else if (gap < -0.5) out += ''; 
      }
      out += b.text;
      prev = b;
    });
    console.log(out);
  });
});