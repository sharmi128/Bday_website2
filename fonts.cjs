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
  const bfcharRe = /beginbfchar\s*([\s\S]*?)endbfchar/g;
  let m;
  while ((m = bfcharRe.exec(cmapData)) !== null) {
    [...m[1].matchAll(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/g)].forEach(e => {
      glyphMap[parseInt(e[1], 16)] = String.fromCodePoint(parseInt(e[2], 16));
    });
  }
}

// Parse W array from obj 10
const wBody = objects[10];
console.log('=== FONT OBJECT 10 ===');
console.log(wBody.substring(0, 1200));

const widths = {};
const wm = wBody.match(/\/W\s*\[([\s\S]*?)\]/);
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
    } else {
      widths[c] = parseInt(tokens[i], 10);
      i++;
    }
  }
}
console.log('\n=== GLYPH WIDTHS ===');
Object.keys(widths).sort((a,b)=>a-b).forEach(c => {
  if (glyphMap[+c]) console.log(c + ' (' + glyphMap[+c] + '): ' + widths[c]);
});