const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = path.join(__dirname, 'pdf_render');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    defaultViewport: { width: 900, height: 1200 },
  });
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/pc/Desktop/Friendbday/public/memories.pdf', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(4000);
  await page.screenshot({ path: path.join(OUT, 'pdf-test.png'), fullPage: true });
  console.log('screenshot taken');
  await browser.close();
}
run().catch(e => { console.error('FATAL', e); process.exit(1) });