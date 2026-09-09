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
  const sm = objBody.match(/stream\r?\n([\s\S]*?)endstream/);
  if (!sm) return null;
  let data = sm[1].replace(/\r?\n$/, '');
  if (objBody.includes('/FlateDecode')) {
    try {
      data = zlib.inflateSync(Buffer.from(data, 'latin1')).toString('latin1');
    } catch (e) {
      try {
        data = zlib.inflateRawSync(Buffer.from(data, 'latin1')).toString('latin1');
      } catch (e2) { return null; }
    }
  }
  return data;
}

const objects = parseObjects(raw);
const cmapData = getStreamData(objects[9]);
const glyphMap = {};
{
  const bfcharRe = /beginbfchar\s*([\s\S]*?)endbfchar/g;
  let m;
  while ((m = bfcharRe.exec(cmapData)) !== null) {
    const entries = [...m[1].matchAll(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/g)];
    entries.forEach(e => {
      glyphMap[parseInt(e[1], 16)] = String.fromCodePoint(parseInt(e[2], 16));
    });
  }
}

// Decompress font W array (object 10) to get glyph widths
const fontW = {};
{
  const wBody = objects[10];
  const wMatch = wBody.match(/\/W\s*\[([\s\S]*?)\]/);
  if (wMatch) {
    const tokens = wMatch[1].trim().split(/\s+/);
    let i = 0;
    while (i < tokens.length) {
      const c = parseInt(tokens[i], 10);
      i++;
      if (tokens[i] === '[') {
        i++;
        const ws = [];
        while (tokens[i] !== ']') { ws.push(parseInt(tokens[i], 10)); i++; }
        i++;
        ws.forEach((w, idx) => { fontW[c + idx] = w; });
      } else {
        const w = parseInt(tokens[i], 10);
        i++;
        fontW[c] = w;
      }
    }
  }
}

// Process each page with x positions
const pageObjNums = [7, 16, 19, 23, 27, 31];
pageObjNums.forEach((objNum, pi) => {
  const stream = getStreamData(objects[objNum]);
  if (!stream) return;
  console.log('\n========== PAGE ' + (pi + 1) + ' (obj ' + objNum + ') ==========');
  
  // Parse the stream into text runs with positions
  // Track current Tm
  let x = 0, y = 0;
  // We need to process operators in order
  // Strategy: tokenize each BT...ET block, tracking Tm/Td/TD and Tj strings
  
  let pos = 0;
  while (true) {
    const bt = stream.indexOf('BT', pos);
    if (bt === -1) break;
    const et = stream.indexOf('ET', bt);
    if (et === -1) break;
    const block = stream.substring(bt, et + 2);
    pos = et + 2;
    
    // Parse content for lines. WPS emits: "[x y Tx Ty Tm] <g>Tj tx ty TD <g>Tj ..."
    let blockX, blockY;
    const tm = block.match(/[\d.]+ [\d.]+ [\d.]+ [\d.]+ ([\d.]+) ([\d.]+) Tm/);
    if (tm) { blockX = parseFloat(tm[1]); blockY = parseFloat(tm[2]); }
    else continue;
    
    // Collect glyph runs with positions
    // Pattern: <hex> Tj OR [array] TJ, with TD in between
    const runRe = /(?:<([0-9a-fA-F]+)>\s*Tj|\[([\s\S]*?)\]\s*TJ)|([\d.]+) ([\d.]+) TD/g;
    let m;
    let curX = blockX;
    let text = '';
    let lastX = blockX;
    const segments = [];
    while ((m = runRe.exec(block)) !== null) {
      if (m[3] !== undefined) {
        // TD movement: record gap
        const dx = parseFloat(m[3]);
        curX += dx;
        // gap in points = dx * 0.05 (scale)
        segments.push({ type: 'gap', dx });
      } else if (m[1] !== undefined) {
        const code = parseInt(m[1], 16);
        const ch = glyphMap[code] !== undefined ? glyphMap[code] : '?';
        segments.push({ type: 'glyph', code, ch });
      } else if (m[2] !== undefined) {
        // TJ array
        const arrRe = /\(([^)]*)\)|<([0-9a-fA-F]+)>/g;
        let am;
        while ((am = arrRe.exec(m[2])) !== null) {
          if (am[1] !== undefined) {
            for (const c of am[1]) segments.push({ type: 'lit', ch: c });
          } else if (am[2] !== undefined) {
            const code = parseInt(am[2], 16);
            const ch = glyphMap[code] !== undefined ? glyphMap[code] : '?';
            segments.push({ type: 'glyph', code, ch });
          }
        }
      }
    }
    
    // Reconstruct: use widths (0.05 scale) to detect spaces
    // Font size = 240 * scale(0.05) = 12pt. Widths are per 1000 units.
    let line = '';
    segments.forEach(s => {
      if (s.type === 'gap') {
        // gap amount in points = s.dx * 0.05
        const pts = Math.abs(s.dx) * 0.05;
        if (pts > 4.5) line += ' '; // word space
      } else if (s.type === 'lit') {
        line += s.ch;
      } else if (s.type === 'glyph') {
        line += s.ch;
      }
    });
    console.log('y=' + blockY.toFixed(1) + ' x=' + blockX.toFixed(1) + ': ' + line);
  }
});