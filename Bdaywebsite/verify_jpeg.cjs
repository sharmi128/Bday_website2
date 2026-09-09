const fs = require('fs');
const path = require('path');

function parseJpeg(buf) {
  if (buf[0] !== 0xFF || buf[1] !== 0xD8) return { ok: false, reason: 'No SOI marker' };
  let pos = 2;
  let dims = null;
  while (pos < buf.length - 1) {
    if (buf[pos] !== 0xFF) { pos++; continue; }
    const marker = buf[pos + 1];
    if (marker === 0xD9) return { ok: true, eoiFound: true, dims }; // EOI
    if (marker === 0x01 || (marker >= 0xD0 && marker <= 0xD7)) { pos += 2; continue; }
    const segLen = (buf[pos + 2] << 8) | buf[pos + 3];
    if (segLen < 2) return { ok: false, reason: 'Bad segment length' };
    if (marker >= 0xC0 && marker <= 0xCF && marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC) {
      const height = (buf[pos + 5] << 8) | buf[pos + 6];
      const width = (buf[pos + 7] << 8) | buf[pos + 8];
      dims = { width, height };
    }
    pos += 2 + segLen;
  }
  return { ok: true, eoiFound: false, dims };
}

const files = ['page1_img1.jpg','page2_img1.jpg','page3_img1.jpg','page3_img2.jpg','page4_img1.jpg','page4_img2.jpg','page5_img1.jpg','page5_img2.jpg'];

for (const f of files) {
  const p = path.join(__dirname, 'pdf_extracted', f);
  const buf = fs.readFileSync(p);
  const r = parseJpeg(buf);
  console.log(f + ': ' + JSON.stringify(r) + ' size=' + buf.length + ' lastbytes=' + buf.slice(-4).toString('hex'));
}