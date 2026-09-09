const fs = require('fs');
const zlib = require('zlib');

// Parse the raw PDF to extract object 9 (ToUnicode) and all object streams
const raw = fs.readFileSync('public/memories.pdf', 'latin1');

// Extract object 9 raw
function getObject(raw, num) {
  const re = new RegExp(num + '\\s+0\\s+obj(.*?)endobj', 's');
  const m = raw.match(re);
  return m ? m[1] : null;
}

const obj9 = getObject(raw, 9);
console.log('=== OBJECT 9 (ToUnicode CMap) ===');
console.log(obj9);

// Find stream of object 9 and decompress
const streamMatch = obj9.match(/stream\r?\n([\s\S]*?)endstream/);
if (streamMatch) {
  let data = Buffer.from(streamMatch[1].replace(/\r\n$/, '').replace(/\n$/, ''), 'latin1');
  try {
    const dec = zlib.inflateSync(data);
    console.log('\n=== DECOMPRESSED ToUnicode CMap ===');
    console.log(dec.toString('latin1'));
  } catch (e) {
    console.log('decompress failed', e.message);
    console.log('raw hex:', data.toString('hex').substring(0, 400));
  }
}
