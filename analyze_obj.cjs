const fs = require('fs');
const zlib = require('zlib');

const raw = fs.readFileSync('public/memories.pdf', 'latin1');

// Split PDF into objects properly
// Split on "endobj" but streams may contain the literal "endobj"? unlikely; use obj offsets.

function parseObjects(data) {
  const objects = {};
  // Match: N 0 obj ... endobj
  const re = /(\d+)\s+0\s+obj([\s\S]*?)\bendobj/g;
  let m;
  while ((m = re.exec(data)) !== null) {
    const num = parseInt(m[1], 10);
    objects[num] = m[2];
  }
  return objects;
}

const objects = parseObjects(raw);
console.log('Object count:', Object.keys(objects).length);

// Print object headers
for (const num of Object.keys(objects).sort((a, b) => a - b)) {
  const body = objects[num];
  const header = body.substring(0, 200).replace(/[\r\n]+/g, ' | ');
  console.log('Obj ' + num + ': ' + header);
}

fs.writeFileSync('pdf_objects_dump.txt', '');
for (const num of Object.keys(objects).sort((a, b) => a - b)) {
  fs.appendFileSync('pdf_objects_dump.txt', '===== OBJ ' + num + ' =====\n' + objects[num] + '\n\n');
}