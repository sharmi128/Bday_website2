const puppeteer = require('puppeteer-core')
const fs = require('fs')
const path = require('path')

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const OUT = path.join(__dirname, 'captures-ft')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  fs.rmSync(OUT, { recursive: true, force: true })
  fs.mkdirSync(OUT, { recursive: true })

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    defaultViewport: { width: 1280, height: 800 },
  })
  const page = await browser.newPage()
  const errors = []
  page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()) })
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + String(e)))

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 20000 })
  await page.waitForSelector('.ft-page', { timeout: 15000 })
  await sleep(1200)

  let n = 0
  const snap = async (label) => {
    n++
    await page.screenshot({ path: path.join(OUT, `${String(n).padStart(2, '0')}-${label}.png`) })
    console.log(`  [${n}] ${label}`)
  }

  await snap('hero')

  const heights = [1200, 2200, 3200, 4200, 5600, 6900, 8200]
  for (const h of heights) {
    await page.evaluate((y) => window.scrollTo(0, y), h)
    await sleep(1200)
    await snap(`scroll-${h}`)
  }

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await sleep(1400)
  await snap('end')

  console.log(`\nDone — ${n} screenshots`)
  if (errors.length) {
    console.log(`\n${errors.length} errors:`)
    errors.forEach((e) => console.log('  ', e))
  } else {
    console.log('No console errors.')
  }
  await browser.close()
}

main().catch((e) => { console.error('FATAL', e); process.exit(1) })