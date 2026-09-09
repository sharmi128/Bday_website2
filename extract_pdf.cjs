const fs = require('fs');
const buf = fs.readFileSync('public/memories.pdf');
const str = buf.toString('latin1');
const texts = [];
let idx = 0;
while (true) {
  const start = str.indexOf('BT', idx);
  if (start === -1) break;
  const end = str.indexOf('ET', start);
  if (end === -1) break;
  const block = str.substring(start, end + 2);
  const tjMatches = [...block.matchAll(/\(([^)]+)\)\s*Tj/g)];
  const tj2Matches = [...block.matchAll(/\[([^\]]+)\]\s*TJ/g)];
  tjMatches.forEach(m => texts.push(m[1]));
  tj2Matches.forEach(m => {
    const inner = m[1];
    const parts = [...inner.matchAll(/\(([^)]+)\)/g)];
    parts.forEach(p => texts.push(p[1]));
  });
  idx = end + 2;
}
console.log(texts.join('\n'));
