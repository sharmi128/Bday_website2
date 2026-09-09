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
  // Body is like "<</Filter...>>\r\nstream\r\n<data>\r\nendstream"
  const sm = objBody.match(/stream\r?\n([\s\S]*?)endstream/);
  if (!sm) return null;
  let data = sm[1].replace(/\r?\n$/, '');
  // Check filters
  if (objBody.includes('/FlateDecode')) {
    try {
      data = zlib.inflateSync(Buffer.from(data, 'latin1')).toString('latin1');
    } catch (e) {
      try {
        data = zlib.inflateRawSync(Buffer.from(data, 'latin1')).toString('latin1');
      } catch (e2) {
        console.log('inflate failed in stream:', e2.message);
        return null;
      }
    }
  }
  return data;
}

const objects = parseObjects(raw);

// 1. Decompress ToUnicode CMap (object 9)
const cmapData = getStreamData(objects[9]);
console.log('=== ToUnicode CMap ===');
console.log(cmapData);

// 2. Build glyph -> unicode map from CMap
const glyphMap = {};
if (cmapData) {
  const bfcharRe = /beginbfchar\s*([\s\S]*?)endbfchar/g;
  let m;
  while ((m = bfcharRe.exec(cmapData)) !== null) {
    const entries = [...m[1].matchAll(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/g)];
    entries.forEach(e => {
      glyphMap[parseInt(e[1], 16)] = String.fromCodePoint(parseInt(e[2], 16));
    });
  }
  const bfrangeRe = /beginbfrange\s*([\s\S]*?)endbfrange/g;
  while ((m = bfrangeRe.exec(cmapData)) !== null) {
    // Two forms: <s> <e> <dst>  or  <s> <e> [<d1> <d2> ...]
    const blocks = [...m[1].matchAll(/(<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*(?:<([0-9a-fA-F]+)>|\[[\s\S]*?\]))/g)];
    blocks.forEach(b => {
      const start = parseInt(b[2], 16);
      const end = parseInt(b[3], 16);
      if (b[4]) {
        // Simple range
        let dst = parseInt(b[4], 16);
        for (let c = start; c <= end; c++) {
          glyphMap[c] = String.fromCodePoint(dst);
          dst++;
        }
      } else {
        // Array range
        const arrMatch = b[1].match(/\[([\s\S]*?)\]/);
        if (arrMatch) {
          const vals = [...arrMatch[1].matchAll(/<([0-9a-fA-F]+)>/g)].map(x => parseInt(x[1], 16));
          for (let i = 0; i <= end - start && i < vals.length; i++) {
            glyphMap[start + i] = String.fromCodePoint(vals[i]);
          }
        }
      }
    });
  }
}
console.log('\n');
console.log('Glyph map entries:', Object.keys(glyphMap).length);

// 3. Process each page
const pageObjNums = [7, 16, 19, 23, 27, 31];
const contentStreams = pageObjNums.map(n => getStreamData(objects[n]));

// Decode text: sequence of <2-byte-hex> Tj operators and TD movements
function decodeContent(stream) {
  // Find all BT starts, collect text
  let result = [];
  let btIdx = 0;
  let pos = 0;
  while (true) {
    const bt = stream.indexOf('BT', pos);
    if (bt === -1) break;
    // Find the ET that follows
    const et = stream.indexOf('ET', bt);
    if (et === -1) break;
    const block = stream.substring(bt, et + 2);
    
    // Extract Tj string ops with their Tm y-position for line grouping
    // Format: <XXXX>Tj 157.5 -0 TD <XXXX>Tj ...  (glyphs per char separated by TD)
    let blockResult = { y: null, text: '' };
    const tmMatch = block.match(/[\d.]+ [\d.]+ [\d.]+ [\d.]+ ([\d.]+) ([\d.]+) Tm/);
    
    // Collect all <hex> that are followed by Tj (glyphs),
    // respecting TD movement as normal flow (each glyph is a char)
    const glyphs = [];
    const hexRe = /<([0-9a-fA-F]{2,4})>\s*Tj/g;
    let hm;
    while ((hm = hexRe.exec(block)) !== null) {
      const code = parseInt(hm[1], 16);
      const ch = glyphMap[code] !== undefined ? glyphMap[code] : '[' + hm[1] + ']';
      glyphs.push(ch);
    }
    blockResult.text = glyphs.join('');
    if (tmMatch) {
      blockResult.y = parseFloat(tmMatch[1]);
    }
    result.push(blockResult);
    pos = et + 2;
  }
  return result;
}

// Print each page's decoded text grouped into lines by y-coord
contentStreams.forEach((stream, i) => {
  console.log('\n========== PAGE ' + (i + 1) + ' ==========');
  if (!stream) { console.log('(no content stream)'); return; }
  const blocks = decodeContent(stream);
  // Group by y-coordinate (blocks with same y are on same line, different Tm x)
  const lines = [];
  blocks.forEach(b => {
    const y = b.y !== null ? b.y.toFixed(1) : '?';
    const existing = lines.find(l => l.y === y);
    if (existing) {
      existing.text += b.text;
    } else {
      lines.push({ y, text: b.text });
    }
  });
  // Sort by y descending (PDF y grows downward typically... actually Pdf y origin is bottom-left, so larger y = higher)
  lines.sort((a, b) => parseFloat(b.y) - parseFloat(a.y));
  lines.forEach(l => {
    console.log('y=' + l.y + ': ' + l.text);
  });
});

// Extract images to separate files
const imageObjMap = {
  14: 'page1_img1.jpg',
  17: 'page2_img1.jpg',
  20: 'page3_img1.jpg',
  21: 'page3_img2.jpg',
  24: 'page4_img1.jpg',
  25: 'page4_img2.jpg',
  28: 'page5_img1.jpg',
  29: 'page5_img2.jpg',
};

fs.mkdirSync('pdf_extracted', { recursive: true });
for (const [objNum, filename] of Object.entries(imageObjMap)) {
  const body = objects[objNum];
  const sm = body.match(/stream\r?\n([\s\S]*?)endstream/);
  if (sm) {
    // Extract Length bytes exactly. The data after "stream\r\n" of exact Length
    const data = sm[1].replace(/\r?\n$/, '');
    // The DCTDecode stream is raw JPEG data
    fs.writeFileSync('pdf_extracted/' + filename, Buffer.from(data + '\n', 'latin1'));
    // Verify JPEG magic
    const b = Buffer.from(data, 'latin1');
    console.log('\nImage ' + filename + ': magic=' + b.slice(0,2).toString('hex'));
  }
}
console.log('\nImages written to pdf_extracted/');