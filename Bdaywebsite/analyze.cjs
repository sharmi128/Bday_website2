const fs = require('fs');
const s = fs.readFileSync('pdf_streams_dump.txt', 'latin1');
const has = s.match(/beginbfchar/g);
console.log('bfchar count', has ? has.length : 0);

// Find the ToUnicode CMap definition in the ORIGINAL uncompressed PDF
const raw = fs.readFileSync('public/memories.pdf', 'latin1');
const tuIdx = raw.indexOf('/ToUnicode');
console.log('ToUnicode raw index', tuIdx);

// The ToUnicode refers to an object like "9 0 R". Let's find the object
const refMatch = raw.match(/\/ToUnicode\s+(\d+)\s+(\d+)\s+R/);
console.log('ToUnicode ref', refMatch ? refMatch[1] + ' ' + refMatch[2] : 'none');
