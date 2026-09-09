const fs = require('fs');
const zlib = require('zlib');
const buf = fs.readFileSync('public/memories.pdf');

// Parse PDF objects
const str = buf.toString('latin1');

// Find all stream objects and decompress them
function extractStreams(pdfBuffer) {
  const content = pdfBuffer.toString('latin1');
  const streams = [];
  let idx = 0;
  while (true) {
    const start = content.indexOf('stream\r\n', idx);
    if (start === -1) break;
    const dataStart = start + 'stream\r\n'.length;
    const end = content.indexOf('endstream', dataStart);
    if (end === -1) break;
    const raw = content.substring(dataStart, end);
    // Remove trailing \r\n
    const clean = raw.replace(/\r\n$/, '');
    streams.push({
      start,
      data: clean,
      length: end - dataStart - 2
    });
    idx = end + 10;
  }
  return streams;
}

const streams = extractStreams(buf);
console.log('Found ' + streams.length + ' streams');

let allDecompressed = '';

for (let i = 0; i < streams.length; i++) {
  const s = streams[i];
  const dataBuffer = Buffer.from(s.data, 'latin1');
  
  let decompressed;
  try {
    decompressed = zlib.inflateSync(dataBuffer);
  } catch (e) {
    try {
      decompressed = zlib.inflateRawSync(dataBuffer);
    } catch (e2) {
      try {
        decompressed = zlib.gunzipSync(dataBuffer);
      } catch (e3) {
        continue;
      }
    }
  }
  
  const text = decompressed.toString('latin1');
  allDecompressed += '\n=== STREAM ' + i + ' ===\n' + text;
}

// Write all decompressed streams for analysis
fs.writeFileSync('pdf_streams_dump.txt', allDecompressed);
console.log('Wrote pdf_streams_dump.txt, length: ' + allDecompressed.length);

// Now extract text from decompressed content streams
const btBlocks = [];
let bidx = 0;
while (true) {
  const start = allDecompressed.indexOf('BT', bidx);
  if (start === -1) break;
  const end = allDecompressed.indexOf('ET', start);
  if (end === -1) break;
  btBlocks.push(allDecompressed.substring(start, end + 2));
  bidx = end + 2;
}
console.log('\nFound ' + btBlocks.length + ' BT/ET blocks');

// Extract text from each block
const textLines = [];
btBlocks.forEach(block => {
  const tjMatches = [...block.matchAll(/\(([^)]*)\)\s*Tj/g)];
  tjMatches.forEach(m => { if (m[1]) textLines.push(m[1]); });
  const bodyMatches = [...block.matchAll(/\[((?:\([^)]*\)|<\w+>|\d+|[-\d.]+)*)\]\s*TJ/g)];
  bodyMatches.forEach(m => {
    const parts = [...m[1].matchAll(/\(([^)]*)\)/g)];
    parts.forEach(p => { if (p[1]) textLines.push(p[1]); });
  });
  // Also try text showing operators
  const hexMatches = [...block.matchAll(/<([0-9a-fA-F]+)>\s*Tj/g)];
  hexMatches.forEach(m => { textLines.push('HEX:' + m[1]); });
});

console.log('\n=== EXTRACTED TEXT LINES ===');
textLines.forEach(l => console.log(l));
