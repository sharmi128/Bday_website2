const fs = require('fs');
const buf = fs.readFileSync('public/memories.pdf');
const str = buf.toString('latin1');

// Try to find all text between BT and ET blocks more broadly
const texts = [];
let idx = 0;
while (true) {
  const start = str.indexOf('BT', idx);
  if (start === -1) break;
  const end = str.indexOf('ET', start);
  if (end === -1) break;
  const block = str.substring(start, end + 2);
  
  // Try various text extraction patterns
  // Pattern 1: (text) Tj
  const p1 = [...block.matchAll(/\(([^)]*)\)\s*Tj/g)];
  p1.forEach(m => { if (m[1].trim()) texts.push('P1: ' + m[1]); });
  
  // Pattern 2: [(text)] TJ
  const p2 = [...block.matchAll(/\[([^\]]*)\]\s*TJ/g)];
  p2.forEach(m => {
    const inner = m[1];
    const parts = [...inner.matchAll(/\(([^)]*)\)/g)];
    parts.forEach(p => { if (p[1].trim()) texts.push('P2: ' + p[1]); });
  });
  
  // Pattern 3: Hex strings <hex> Tj
  const p3 = [...block.matchAll(/<([0-9a-fA-F]+)>\s*Tj/g)];
  p3.forEach(m => texts.push('P3 hex: ' + m[1]));
  
  idx = end + 2;
}

console.log('Found ' + texts.length + ' text segments');
texts.forEach(t => console.log(t));

// Also look for ToUnicode maps
const toUnicodeIdx = str.indexOf('/ToUnicode');
if (toUnicodeIdx !== -1) {
  console.log('\n--- Found ToUnicode at index ' + toUnicodeIdx + ' ---');
  console.log(str.substring(toUnicodeIdx, toUnicodeIdx + 200));
}

// Look for font info
const fontMatches = [...str.matchAll(/\/Font\s*<<([^>]*)>>/g)];
console.log('\nFound ' + fontMatches.length + ' font definitions');
fontMatches.forEach((m, i) => {
  console.log('Font ' + i + ': ' + m[1].substring(0, 200));
});
