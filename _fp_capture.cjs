const puppeteer = require('puppeteer-core')
const fs = require('fs')
const path = require('path')

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const OUT = path.join(__dirname, 'captures-fp')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let n = 0
async function snap(page, label, wait = 600) {
  await sleep(wait)
  n++
  const file = path.join(OUT, `${String(n).padStart(2, '0')}-${label}.png`)
  await page.screenshot({ path: file })
  console.log(`  [${n}] ${label}`)
}

async function run() {
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
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
  page.on('pageerror', (e) => errors.push(String(e)))

  const boxSel = '[aria-label="Open the final birthday gift box"]'
  const btnSel = '.fp-open-btn'

  console.log('1. Load desktop...')
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 20000 })
  await snap(page, 'intro', 2600)

  // double-click guard test: click twice quickly, only one sequence should start
  console.log('2. Click OPEN twice (fuse check)...')
  await page.click(btnSel)
  await page.click(boxSel)
  await snap(page, 'opening', 900)
  await snap(page, 'lid-open-light', 1100)

  console.log('3. Revealing...')
  await snap(page, 'revealing-early', 2500)
  await snap(page, 'revealing-mid', 4000)
  await snap(page, 'revealing-late', 4000)

  console.log('4. Message...')
  await page.waitForSelector('.fp-msg-overlay.show', { timeout: 25000 })
  await snap(page, 'message-1', 2600)
  await snap(page, 'message-2', 3200)
  await snap(page, 'message-birthday', 3200)
  await snap(page, 'message-wish', 5200)

  console.log('5. THE END...')
  await page.waitForSelector('.fp-end-overlay.show', { timeout: 20000 })
  await snap(page, 'the-end', 4200)

  console.log('6. Forever...')
  await page.waitForSelector('.fp-forever-overlay.show', { timeout: 20000 })
  await snap(page, 'forever-story', 2600)
  await snap(page, 'forever-infinity', 3500)
  await page.waitForSelector('.fp-replay.is-in', { timeout: 20000 })
  await snap(page, 'forever-final', 2000)

  // replay: verify it returns to the intro scene
  console.log('7. Replay...')
  await page.click('.fp-replay')
  await snap(page, 'replay-back-to-intro', 1800)

  // mobile viewport test
  console.log('8. Mobile (375x667)...')
  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true })
  await page.reload({ waitUntil: 'networkidle0' })
  await snap(page, 'mobile-intro', 2600)
  await page.tap(btnSel)
  await snap(page, 'mobile-opening', 2600)
  await snap(page, 'mobile-revealing', 4500)
  await page.waitForSelector('.fp-msg-overlay.show', { timeout: 25000 })
  await snap(page, 'mobile-message', 3000)

  console.log(`\nDone — ${n} screenshots in captures-fp/`)
  if (errors.length) {
    console.log(`\n${errors.length} console errors:`)
    errors.forEach((e) => console.log('  ', e))
  } else {
    console.log('No console errors.')
  }
  await browser.close()
}

run().catch((e) => { console.error('FATAL', e); process.exit(1) })