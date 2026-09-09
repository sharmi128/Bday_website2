const fs = require('fs');
const zlib = require('zlib');

const raw = fs.readFileSync('public/memories.pdf', 'latin1');

function parseObjects(data) {
  const objects = {};
  const re = /(\d+)\s+0\s+obj([\s\S]*?)\bendobj/g;
  let m;
  while ((m = re.exec(data)) !== null) objects[parseInt(m[1], 10)] = m[2];
  return objects;
}

function getStreamData(objBody) {
  const sm = objBody.match(/stream\r?\n([\s\S]*?)endstream/);
  if (!sm) return null;
  let data = sm[1].replace(/\r?\n$/, '');
  if (objBody.includes('/FlateDecode')) {
    try { data = zlib.inflateSync(Buffer.from(data, 'latin1')).toString('latin1'); }
    catch (e) {
      try { data = zlib.inflateRawSync(Buffer.from(data, 'latin1')).toString('latin1'); }
      catch (e2) { return null; }
    }
  }
  return data;
}

const objects = parseObjects(raw);
const cmapData = getStreamData(objects[9]);
const glyphMap = {};
{
  const re = /beginbfchar\s*([\s\S]*?)endbfchar/g;
  let m;
  while ((m = re.exec(cmapData)) !== null) {
    [...m[1].matchAll(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/g)].forEach(e => {
      glyphMap[parseInt(e[1], 16)] = String.fromCodePoint(parseInt(e[2], 16));
    });
  }
}

const widths = {};
{
  const wm = objects[10].match(/\/W\s*\[([\s\S]*?)\]/);
  if (wm) {
    const tokens = wm[1].trim().split(/\s+/);
    let i = 0;
    while (i < tokens.length) {
      const c = parseInt(tokens[i], 10);
      i++;
      if (tokens[i] === '[') {
        i++;
        const arr = [];
        while (tokens[i] !== ']') { arr.push(parseInt(tokens[i], 10)); i++; }
        i++;
        arr.forEach((w, idx) => { widths[c + idx] = w; });
      } else { widths[c] = parseInt(tokens[i], 10); i++; }
    }
  }
}
const DEFAULT_W = 750;

const pageObjNums = [7, 16, 19, 23, 27, 31];
const allLines = [];

pageObjNums.forEach((objNum, pi) => {
  const stream = getStreamData(objects[objNum]);
  if (!stream) return;
  const lines = [];
  let pos = 0;
  while (true) {
    const bt = stream.indexOf('BT', pos);
    if (bt === -1) break;
    const et = stream.indexOf('ET', bt);
    if (et === -1) break;
    const block = stream.substring(bt, et + 2);
    pos = et + 2;
    if (!block.includes('Tf')) continue;

    const tm = block.match(/(-?[\d.]+) (-?[\d.]+) (-?[\d.]+) (-?[\d.]+) (-?[\d.]+) (-?[\d.]+) Tm/);
    if (!tm) continue;
    const startX = parseFloat(tm[5]);
    const startY = parseFloat(tm[6]);

    // Parse sequential ops
    const ops = [];
    const re = /<([0-9a-fA-F]{2,4})>\s*Tj|(-?[\d.]+) (-?[\d.]+) TD/g;
    let m;
    while ((m = re.exec(block)) !== null) {
      if (m[2] !== undefined) ops.push({ t: 'adv', dx: parseFloat(m[2]) });
      else ops.push({ t: 'g', code: parseInt(m[1], 16) });
    }

    // Group: for each glyph, preceding advances = sum of advs before it since previous glyph
    const glyphs = [];
    let pendingAdv = 0;
    ops.forEach(op => {
      if (op.t === 'adv') pendingAdv += op.dx;
      else {
        glyphs.push({ code: op.code, adv: pendingAdv });
        pendingAdv = 0;
      }
    });

    // Reconstruct: excess over expected prev width => space
    let text = '';
    let prevCode = null;
    for (let gi = 0; gi < glyphs.length; gi++) {
      const g = glyphs[gi];
      if (gi > 0 && prevCode !== null) {
        const expected = (widths[prevCode] !== undefined ? widths[prevCode] : DEFAULT_W);
        const excess = g.adv - expected;
        const spaceCount = Math.round(excess / (DEFAULT_W * 0.45)); // rough
        if (excess > 140) {
          // ~1.7pt or more extra => space (space width ~333 units => ~80 TD)
          const spaces = Math.max(1, Math.round(excess / 80));
          text += ' '.repeat(spaces);
        }
      }
      const ch = glyphMap[g.code] !== undefined ? glyphMap[g.code] : '?(' + g.code.toString(16) + ')';
      text += ch;
      prevCode = g.code;
    }

    lines.push({ y: startY, x: startX, text });
  }

  // Group into rows by y (flipped: larger y = lower). Sort descending y, then ascending x.
  const rows = [];
  lines.sort((a, b) => (b.y - a.y) || (a.x - b.x));
  lines.forEach(l => {
    const last = rows[rows.length - 1];
    if (last && Math.abs(last.y - l.y) < 2) {
      last.text += l.text;
      if (l.x > last.x + 0.5) last.text = last.text; // preserve
    } else rows.push({ y: l.y, x: l.x, text: l.text });
  });

  console.log('\n========== PAGE ' + (pi + 1) + ' (' + rows.length + ' text rows) ==========');
  rows.forEach(r => console.log(r.text));
  allLines.push({ page: pi + 1, rows });
});