const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('public/memories.pdf');

pdf(dataBuffer).then(function(data) {
  console.log('=== NUMBER OF PAGES ===');
  console.log(data.numpages);
  console.log('=== PAGE NUMBERS ===');
  console.log(data.numrender);
  console.log('=== TEXT CONTENT ===');
  console.log(data.text);
}).catch(function(err) {
  console.error('Error:', err);
});
