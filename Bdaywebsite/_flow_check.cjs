/* Temporary full-flow verification for the birthday site (dev tool, like capture.cjs). */
const puppeteer = require('puppeteer-core')

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = 'http://localhost:5173/'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function wait(page, selector, label, timeout = 20000) {
  await page.waitForSelector(selector, { visible: true, timeout })
  console.log(`  OK  ${label}  (${selector})`)
}

async function click(page, selector, label, timeout = 20000) {
  await page.waitForSelector(selector, { visible: true, timeout })
  await page.click(selector)
  console.log(`  >   ${label}  (click ${selector})`)
}

async function assertBalloons(page, label) {
  const count = await page.$$eval('.decorative-balloons', (els) => els.length)
  console.log(`  ✓   ${label} has ${count} decorative balloon layer(s)`)
  if (count < 1) throw new Error(`No balloons on ${label}`)
}

async function run() {
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

  console.log('1) Load site…')
  await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 30000 })
  await wait(page, '.entrance-scene', 'Page 1 Balloon Entrance')
  const fpAtStart = await page.$('.fp-page') !== null
  console.log(`  page loads as entrance-scene (final gift present? ${fpAtStart})`)
  if (fpAtStart) throw new Error('Final Gift Box is the first page — main.tsx regression!')
  await assertBalloons(page, 'Page 1')
  await page.waitForSelector('[aria-label="Touch the birthday balloon to begin"]', { visible: true })

  console.log('2) Pop balloon → Password Challenge')
  await click(page, '[aria-label="Touch the birthday balloon to begin"]', 'pop entrance balloon')
  await wait(page, '.challenge-scene', 'Page 2 Password Challenge')
  await assertBalloons(page, 'Page 2')
  await page.waitForSelector('input.challenge-input', { visible: true, timeout: 15000 })
  await page.click('input.challenge-input')
  await page.keyboard.type('01December', { delay: 30 })
  console.log('  >   typed password 01December')
  await click(page, 'button[aria-label="Submit password"]', 'submit password')

  console.log('3) Gift Box')
  await wait(page, '.giftbox-scene', 'Page 3 Gift Box')
  await assertBalloons(page, 'Page 3')
  await sleep(3000)
  await click(page, '[aria-label="Tap the birthday gift box to reveal your wish"]', 'open gift box')
  await wait(page, '.giftbox-next-btn', 'gift box next button', 20000)
  await click(page, '.giftbox-next-btn', 'continue after gift box')
  await wait(page, '.cake-scene', 'Page 4 Cake Scene')

  console.log('4) Cake')
  await wait(page, '.cake-btn-wish', 'cake: make wish')
  await click(page, '.cake-btn-wish', 'wish')
  await wait(page, '.cake-btn-blow', 'cake: blow')
  await click(page, '.cake-btn-blow', 'blow candles')
  await sleep(4500)
  await wait(page, '.cake-btn-cut', 'cake: cut')
  await click(page, '.cake-btn-cut', 'cut cake')
  await sleep(4000)
  await wait(page, '.cake-btn-feed', 'cake: feed')
  await click(page, '.cake-btn-feed', 'feed')
  await sleep(4000)
  await wait(page, '.cake-btn-handshake', 'cake: handshake')
  await click(page, '.cake-btn-handshake', 'handshake')
  await sleep(3500)
  await wait(page, '.cake-btn-continue', 'cake: continue')
  await click(page, '.cake-btn-continue', 'continue after cake')
  await wait(page, '.wishes-page', 'Page 5 Character Wishes')

  console.log('5) Character Wishes (10)')
  for (let i = 0; i < 10; i++) {
    await click(page, '.wishes-image-wrap', `wish ${i + 1}: touch character`)
    await wait(page, '.wishes-next-btn', `wish ${i + 1}: next`, 8000)
    await click(page, '.wishes-next-btn', `wish ${i + 1}: continue`)
    await sleep(800)
  }
  await wait(page, '.wishes-cele-btn', 'wishes: grand finale', 8000)
  await click(page, '.wishes-cele-btn', 'continue after wishes')
  await wait(page, '.memory-page', 'Page 6 Memories')

  console.log('6) Memories')
  await assertBalloons(page, 'Page 6')
  await click(page, '.memory-invite-btn', 'open memory space')
  await wait(page, '.memory-continue-btn', 'memory: continue')
  await click(page, '.memory-continue-btn', 'continue after memories')
  await wait(page, '.funny-page', 'Page 7 Inside Jokes (FunnyMoments)')

  console.log('7) Funny Moments (8 slots)')
  await assertBalloons(page, 'Page 7')
  await click(page, '.funny-start-btn', 'start funny moments')
  for (let i = 0; i < 8; i++) {
    await wait(page, '.funny-next-btn', `funny slot ${i + 1}: next`, 8000)
    await click(page, '.funny-next-btn', `funny slot ${i + 1}`)
    await sleep(700)
  }
  await wait(page, '.funny-more-btn', 'funny: ending', 8000)
  await click(page, '.funny-more-btn', 'continue after funny moments')
  await wait(page, '.reasons-page', 'Page 8 Challenges (Reasons)')

  console.log('8) Reasons (6 notes)')
  await assertBalloons(page, 'Page 8')
  await click(page, '.reasons-yes-btn', 'yes, tell me why')
  await wait(page, '.reasons-next-btn', 'reasons: album open', 8000)
  for (let i = 0; i < 5; i++) {
    await click(page, '.reasons-next-btn', `reason note ${i + 2}`)
    await sleep(700)
  }
  await wait(page, '.reasons-more-btn', 'reasons: end', 8000)
  await click(page, '.reasons-more-btn', 'continue after reasons')
  await wait(page, '.tl-page', 'Page 9 Timeline')

  console.log('9) Timeline')
  await assertBalloons(page, 'Page 9')
  await wait(page, '.tl-begin-btn', 'timeline: start', 25000)
  await click(page, '.tl-begin-btn', 'start journey')
  for (let i = 0; i < 6; i++) {
    await wait(page, '.tl-next-btn', `timeline memory ${i + 2}: next`, 8000)
    await click(page, '.tl-next-btn', `timeline memory ${i + 2}`)
    await sleep(600)
  }
  await wait(page, '.tl-finale-btn', 'timeline: finale', 10000)
  await click(page, '.tl-finale-btn', 'continue after timeline')
  await wait(page, '.fw-page', 'Page 10 Future Wishes')

  console.log('10) Future Wishes (6 stars)')
  await assertBalloons(page, 'Page 10')
  await sleep(4500)
  for (let i = 0; i < 6; i++) {
    const ok = await page.evaluate((idx) => {
      const star = document.querySelectorAll('.fw-star')[idx]
      if (!star || star.disabled) return false
      star.click()
      return true
    }, i)
    if (!ok) throw new Error(`star ${i + 1} not clickable`)
    console.log(`  >   touched star ${i + 1}`)
    await sleep(900)
  }
  await wait(page, '.fw-finale-btn', 'future wishes: finale', 12000)
  await click(page, '.fw-finale-btn', 'continue after future wishes')
  await wait(page, '.letter-page', 'Page: Letter')

  console.log('11) Letter')
  await assertBalloons(page, 'Letter')
  await click(page, '.letter-open-btn', 'open letter')
  await wait(page, '.letter-smile-btn', 'letter: text shown', 10000)
  await click(page, '.letter-smile-btn', 'continue after letter')
  await wait(page, '.kc-page', 'Page: Keychain')

  console.log('12) Keychain')
  await assertBalloons(page, 'Keychain')
  await wait(page, '.kc-btn', 'keychain: button', 12000)
  await page.waitForFunction(
    () => {
      const el = document.querySelector('.kc-btn')
      if (!el) return false
      const s = getComputedStyle(el)
      return parseFloat(s.opacity) > 0.9 && s.pointerEvents === 'auto'
    },
    { timeout: 15000 },
  )
  console.log('  >   keychain button interactive')
  await click(page, '.kc-btn', 'continue after keychain')
  await wait(page, '.fp-page', 'Page 11 Final Gift Box')

  console.log('13) Final Gift Box → THE END → FOREVER')
  await assertBalloons(page, 'Final Gift Box')
  await wait(page, '.fp-open-btn', 'final gift: open button', 10000)
  await click(page, '.fp-open-btn', 'open final gift box')
  await wait(page, '.fp-end-overlay.show', 'final: THE END', 40000)
  console.log('  ✓   THE END reached')
  await wait(page, '.fp-forever-overlay.show', 'final: FOREVER', 15000)
  console.log('  ✓   FOREVER reached')
  await wait(page, '.fp-replay.is-in', 'final: replay button', 15000)
  console.log('  ✓   FRIENDSHIP-IS-FOREVER + REPLAY button reached')
  await click(page, '.fp-replay', 'replay')
  await wait(page, '.fp-open-btn', 'final: box reset after replay', 10000)
  console.log('  ✓   Replay reset to closed gift box')

  console.log('\nFULL FLOW PASSED — all 13 stages verified in order.')
  if (errors.length) {
    console.log(`\n${errors.length} browser error(s):`)
    errors.forEach((e) => console.log('  ', e))
    process.exitCode = 1
  } else {
    console.log('No console errors.')
  }
  await browser.close()
}

run().catch((e) => { console.error('FLOW FAILED:', e); process.exit(1) })