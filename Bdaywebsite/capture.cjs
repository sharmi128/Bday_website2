const puppeteer = require('puppeteer-core')
const fs = require('fs')
const path = require('path')

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const OUT = path.join(__dirname, 'captures')
const sleep = (ms) => new Promise(r => setTimeout(r, ms))

let n = 0
async function snap(page, label, wait = 600) {
  await sleep(wait)
  n++
  const file = path.join(OUT, `${String(n).padStart(2,'0')}-${label}.png`)
  await page.screenshot({ path: file })
  console.log(`  [${n}] ${label}`)
}

async function click(page, selector, timeout = 15000) {
  await page.waitForSelector(selector, { visible: true, timeout })
  await page.click(selector)
  console.log(`  clicked ${selector}`)
}

async function run() {
  fs.rmSync(OUT, { recursive: true, force: true })
  fs.mkdirSync(OUT, { recursive: true })

  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    defaultViewport: { width: 1280, height: 800 },
  })
  const page = await browser.newPage()
  const errors = []
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
  page.on('pageerror', e => errors.push(String(e)))

  console.log('1. Loading...')
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 20000 })
  await snap(page, 'balloon-scene', 2500)

  // 2. Pop the balloon
  console.log('2. Popping balloon...')
  await click(page, '[aria-label="Touch the birthday balloon to begin"]')
  await snap(page, 'balloon-popped', 1500)
  await snap(page, 'balloon-fading', 2500)

  // 3. Password challenge
  console.log('3. Password challenge...')
  await page.waitForSelector('.challenge-scene', { timeout: 20000 })
  await snap(page, 'password-reveal', 4500)
  await click(page, 'input')
  await page.keyboard.type('01December', { delay: 50 })
  await snap(page, 'password-typed', 300)
  await click(page, 'button[aria-label="Submit password"]')
  await snap(page, 'password-success', 3000)

  // 4. Gift box
  console.log('4. Gift box...')
  await page.waitForSelector('.giftbox-scene', { timeout: 20000 })
  await snap(page, 'giftbox-ready', 3500)
  await click(page, '[aria-label="Tap the birthday gift box to reveal your wish"]')
  await snap(page, 'giftbox-shaking', 1000)
  await snap(page, 'giftbox-open', 4000)
  await snap(page, 'giftbox-wish', 3500)
  await page.waitForSelector('.giftbox-next-btn', { visible: true, timeout: 15000 })
  await snap(page, 'giftbox-next-ready', 500)
  await click(page, '.giftbox-next-btn')
  await snap(page, 'giftbox-leaving', 2000)

  // 5. Cake scene
  console.log('5. Cake scene...')
  await page.waitForSelector('.cake-scene', { timeout: 20000 })
  await snap(page, 'cake-open', 4000)

  await page.waitForSelector('.cake-btn-wish', { visible: true, timeout: 15000 })
  await snap(page, 'cake-make-wish-btn', 500)
  await click(page, '.cake-btn-wish')
  await snap(page, 'cake-wishing', 5000)

  await page.waitForSelector('.cake-btn-blow', { visible: true, timeout: 15000 })
  await snap(page, 'cake-blow-btn', 500)
  await click(page, '.cake-btn-blow')
  await snap(page, 'cake-blowing', 3500)
  await snap(page, 'cake-candles-out', 2500)

  await page.waitForSelector('.cake-btn-cut', { visible: true, timeout: 15000 })
  await snap(page, 'cake-cut-btn', 500)
  await click(page, '.cake-btn-cut')
  await snap(page, 'cake-cutting', 3000)
  await snap(page, 'cake-cut-done', 3000)

  await page.waitForSelector('.cake-btn-feed', { visible: true, timeout: 15000 })
  await snap(page, 'cake-feed-btn', 500)
  await click(page, '.cake-btn-feed')
  await snap(page, 'cake-feeding', 3500)
  await snap(page, 'cake-feed-done', 3500)

  await page.waitForSelector('.cake-btn-handshake', { visible: true, timeout: 15000 })
  await snap(page, 'cake-handshake-btn', 500)
  await click(page, '.cake-btn-handshake')
  await snap(page, 'cake-handshake', 3500)
  await snap(page, 'cake-handshake-done', 2000)

  await page.waitForSelector('.cake-btn-continue', { visible: true, timeout: 15000 })
  await snap(page, 'cake-continue-btn', 500)
  await click(page, '.cake-btn-continue')
  await snap(page, 'cake-leaving', 3000)

  console.log(`\nDone — ${n} screenshots in captures/`)
  if (errors.length) {
    console.log(`\n${errors.length} console errors:`)
    errors.forEach(e => console.log('  ', e))
  } else {
    console.log('No console errors.')
  }
  await browser.close()
}

run().catch(e => { console.error('FATAL', e); process.exit(1) })