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
// page content obj numbers: 7(p1),16(p2),19(p3),23(p4),27(p5),31(p6)
[['P1',7],['P2',16],['P3',19],['P4',23],['P5',27],['P6',31]].forEach(([label, num]) => {
  const s = getStreamData(objects[num]);
  if (!s) { console.log(label, 'no stream'); return; }
  console.log('\n=== ' + label + ' image ops ===');
  const imgRe = /q\s+([\d.]+) 0 0 (-?[\d.]+) ([\d.]+) ([\d.]+) cm\s*\/(IM\d+) Do Q/g;
  let m;
  while ((m = imgRe.exec(s)) !== null) {
    const sx = parseFloat(m[1]), sy = parseFloat(m[2]);
    const tx = parseFloat(m[3]), ty = parseFloat(m[4]);
    console.log('  ' + m[5] + ': scale=(' + sx + ',' + sy + ') at (' + tx + ',' + ty + ')');
    console.log('    => x[' + tx.toFixed(0) + '..' + (tx + sx).toFixed(0) + '] y(' + Math.min(ty, ty + sy).toFixed(0) + '..' + Math.max(ty, ty + sy).toFixed(0) + ')');
  }
  // also list all cm ops with Do
  const allDo = [...s.matchAll(/([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) cm\s*\/(\w+) Do/g)];
  if (allDo.length) {
    allDo.forEach(mm => console.log('  rawDo ' + mm[7] + ' a=' + mm[1] + ' b=' + mm[2] + ' c=' + mm[3] + ' d=' + mm[4] + ' e=' + mm[5] + ' f=' + mm[6]));
  }
});