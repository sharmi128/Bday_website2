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
// Also allow multi-char sequences in Tj strings (literal text)
const pageObjNums = [7, 16, 19, 23, 27, 31];

pageObjNums.forEach((objNum, pi) => {
  const stream = getStreamData(objects[objNum]);
  if (!stream) return;
  console.log('\n========== PAGE ' + (pi + 1) + ' ==========');
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
    const x = parseFloat(tm[5]);
    const y = parseFloat(tm[6]);
    // all strings: hex Tj and literal (..) Tj
    let txt = '';
    const re = /<([0-9a-fA-F]{2,4})>\s*Tj|\(([^)]*)\)\s*Tj|\[(.*?)\]\s*TJ/g;
    let m;
    while ((m = re.exec(block)) !== null) {
      if (m[1]) txt += glyphMap[parseInt(m[1], 16)] !== undefined ? glyphMap[parseInt(m[1], 16)] : '?';
      else if (m[2] !== undefined) txt += m[2];
      else if (m[3] !== undefined) txt += '(TJ:' + m[3] + ')';
    }
    if (txt) blocks.push({ y, x, txt });
  }
  blocks.sort((a, b) => (b.y - a.y) || (a.x - b.x));
  let prevY = null;
  let prevEnd = null;
  for (const b of blocks) {
    const gap = prevY !== null && Math.abs(b.y - prevY) < 3 ? (b.x - prevEnd) : null;
    const gapMark = gap !== null ? ('  [gap=' + (gap > 2.2 ? ' ' : '') + (gap !== null ? gap.toFixed(1) : '') + ']') : '';
    console.log('y=' + b.y.toFixed(0) + ' x=' + b.x.toFixed(1) + ' ' + b.txt + gapMark);
    if (prevY !== null && Math.abs(b.y - prevY) < 3) prevEnd = b.x; else prevEnd = null;
    prevY = b.y;
  }
});