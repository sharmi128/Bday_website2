const fs = require('fs');
const zlib = require('zlib');

const raw = fs.readFileSync('public/memories.pdf', 'latin1');

function parseObjects(data) {
  const objects = {};
  const re = /(\d+)\s+0\s+obj([\s\S]*?)\bendobj/g;
  let m;
  while ((m = re.exec(data)) !== null) {
    const num = parseInt(m[1], 10);
    objects[num] = m[2];
  }
  return objects;
}

function getStreamData(objBody) {
  const sm = objBody.match(/stream\r?\n([\s\S]*?)endstream/);
  if (!sm) return null;
  let data = sm[1].replace(/\r?\n$/, '');
  if (objBody.includes('/FlateDecode')) {
    try {
      data = zlib.inflateSync(Buffer.from(data, 'latin1')).toString('latin1');
    } catch (e) {
      try {
        data = zlib.inflateRawSync(Buffer.from(data, 'latin1')).toString('latin1');
      } catch (e2) { return null; }
    }
  }
  return data;
}

const objects = parseObjects(raw);
const stream = getStreamData(objects[7]);
console.log('stream exists:', !!stream);
if (stream) {
  console.log(stream);
}