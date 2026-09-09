const { loadImage } = require('@napi-rs/canvas');
const fs = require('fs');
const path = require('path');

const files = ['page1_img1.jpg','page2_img1.jpg','page3_img1.jpg','page3_img2.jpg','page4_img1.jpg','page4_img2.jpg','page5_img1.jpg','page5_img2.jpg'];

(async () => {
  for (const f of files) {
    const p = path.join(__dirname, 'pdf_extracted', f);
    try {
      const img = await loadImage(p);
      console.log(f + ': OK ' + img.width + 'x' + img.height);
      const buf = fs.readFileSync(p);
      // verify EOI marker
      const last = buf.lastIndexOf(Buffer.from([0xFF, 0xD9]));
      console.log('   size=' + buf.length + ' EOI at ' + last + ' (expected ~' + (buf.length - 4) + ')');
    } catch (e) {
      console.log(f + ': FAILED -> ' + e.message);
    }
  }
})();