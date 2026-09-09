const puppeteer = require('puppeteer-core')

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function grab(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const s = getComputedStyle(el)
    return {
      opacity: s.opacity,
      transform: s.transform,
      visibility: s.visibility,
      display: s.display,
      pointerEvents: s.pointerEvents,
      text: (el.textContent || '').trim().slice(0, 60),
    }
  }, selector)
}

let failures = 0
function check(name, ok, extra) {
  if (!ok) failures++
  console.log(`${ok ? '  PASS' : '  FAIL'} ${name}${extra ? ' | ' + extra : ''}`)
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

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 20000 })
  await sleep(2800)
  const box = '[aria-label="Open the final birthday gift box"]'

  console.log('\n— Initial scene —')
  let g = await grab(page, '.fp-intro-1')
  check('intro line 1 visible', g && parseFloat(g.opacity) > 0.9, JSON.stringify(g))
  g = await grab(page, '.fp-intro-2')
  check('intro line 2 visible', g && parseFloat(g.opacity) > 0.9)
  g = await grab(page, '.fp-open-btn')
  check('OPEN button visible', g && parseFloat(g.opacity) > 0.9, JSON.stringify(g))
  g = await grab(page, '.fp-lid')
  const lidClosed = g && (g.transform === 'none' || g.transform.includes('matrix(1, 0, 0, 1, 0, 0)'))
  check('lid closed at start', lidClosed, JSON.stringify(g))

  // tap the box itself
  console.log('\n— Tap the box —')
  await page.tap(box)
  await sleep(900)
  check('box shake phase active (phase-opening)', await page.evaluate(() => document.querySelector('.fp-page').className.includes('phase-opening')))
  await sleep(1800)
  g = await grab(page, '.fp-lid')
  check('lid transform changed (opening)', g && g.transform !== 'none' && !g.transform.includes('matrix(1, 0, 0, 1, 0, 0)'), JSON.stringify(g))
  g = await grab(page, '.fp-light')
  check('golden light on', g && parseFloat(g.opacity) > 0.9, JSON.stringify(g))

  console.log('\n— Gifts rising out of the box —')
  await sleep(8000)
  const giftInfo = await page.evaluate(() => {
    const out = { count: 0, settled: 0, boxRect: null, maxY: 0, minX: 0, maxX: 0, minY: Infinity }
    const gifts = Array.from(document.querySelectorAll('.fp-gift'))
    out.count = gifts.length
    const boxR = document.querySelector('.fp-box').getBoundingClientRect()
    out.boxRect = { left: boxR.left, top: boxR.top, right: boxR.right, bottom: boxR.bottom, w: boxR.width, h: boxR.height }
    gifts.forEach((el) => {
      const r = el.getBoundingClientRect()
      out.minY = Math.min(out.minY, r.top)
      out.maxY = Math.max(out.maxY, r.top)
      out.minX = Math.min(out.minX, r.left)
      out.maxX = Math.max(out.maxX, r.left)
      const s = getComputedStyle(el.querySelector('.fp-gift-emoji'))
      if (parseFloat(s.opacity) > 0.9) out.settled++
    })
    return out
  })
  check('14 gifts rendered', giftInfo.count === 14, JSON.stringify(giftInfo.count))
  check('all gifts settled (opacity 1)', giftInfo.settled === 14, JSON.stringify(giftInfo.settled))
  const spread = giftInfo.maxX - giftInfo.minX
  check('gifts spread horizontally (not stacked at box)', spread > 200, `spread=${Math.round(spread)}px`)
  const boxTop = giftInfo.boxRect.top
  check('some gifts rise above the box top', giftInfo.minY < boxTop, `minY=${Math.round(giftInfo.minY)} boxTop=${Math.round(boxTop)}`)
  check('box remains visible during reveal', await page.evaluate(() => {
    const r = document.querySelector('.fp-box').getBoundingClientRect()
    const s = getComputedStyle(document.querySelector('.fp-box'))
    return !(parseFloat(s.opacity) === 0 || r.width === 0)
  }))

  console.log('\n— Emotional message —')
  await page.waitForSelector('.fp-msg-overlay.show', { timeout: 25000 })
  const msgs = await page.evaluate(() => Array.from(document.querySelectorAll('.fp-msg-line')).map((el) => ({ c: el.className, t: el.textContent.trim().slice(0, 34) })))
  const inMsgs = msgs.filter((m) => m.c.includes('is-in'))
  check('exactly 1 message shown at a time', inMsgs.length === 1, JSON.stringify(inMsgs))
  check('first message text', inMsgs[0] && inMsgs[0].t.includes('little things'), JSON.stringify(inMsgs[0]))
  await sleep(3200)
  const inMsgs2 = await page.evaluate(() => Array.from(document.querySelectorAll('.fp-msg-line.is-in')).map((el) => el.textContent.trim().slice(0, 60)))
  check('message 2', inMsgs2.length === 1 && inMsgs2[0].includes('friendship'), JSON.stringify(inMsgs2))
  await sleep(3200)
  const inMsgs3 = await page.evaluate(() => Array.from(document.querySelectorAll('.fp-msg-line.is-in')).map((el) => el.textContent.trim().slice(0, 34)))
  check('birthday message for Bruno', inMsgs3.length === 1 && inMsgs3[0].includes('Bruno'), JSON.stringify(inMsgs3))

  console.log('\n— THE END / FOREVER —')
  await page.waitForSelector('.fp-end-overlay.show', { timeout: 25000 })
  check('THE END title present', await page.evaluate(() => {
    const t = document.querySelector('.fp-end-title')
    return t && t.textContent.includes('THE END')
  }))
  await page.waitForSelector('.fp-forever-overlay.show', { timeout: 25000 })
  await page.waitForSelector('.fp-infinity.is-in', { timeout: 20000 })
  check('forever line 1', await page.evaluate(() => document.querySelector('.fp-fr-1.is-in')?.textContent.includes('NOT the end')))
  await sleep(1700)
  check('infinity glyph visible', await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('.fp-infinity')).opacity) > 0.9))
  await page.waitForSelector('.fp-replay.is-in', { timeout: 20000 })
  const foreverText = await page.evaluate(() => document.querySelector('.fp-final-line.is-in')?.textContent.replace(/\s+/g, ' ').trim())
  check('final friendship line', foreverText && foreverText.includes('NEVER WILL'), JSON.stringify(foreverText))
  await sleep(1500)
  check('replay button visible', await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('.fp-replay')).opacity) > 0.9))

  console.log('\n— No next page / navigation —')
  const nav = await page.evaluate(() => ({
    buttons: Array.from(document.querySelectorAll('button')).filter((b) => parseFloat(getComputedStyle(b).opacity) > 0.5).map((b) => b.textContent.trim().slice(0, 30)),
    anchors: Array.from(document.querySelectorAll('a')).map((a) => a.textContent),
  }))
  check('only replay button present (no NEXT)', nav.buttons.length === 1 && nav.buttons[0].includes('REPLAY'), JSON.stringify(nav.buttons))
  check('no anchor navigation', nav.anchors.length === 0)

  console.log('\n— Replay —')
  await page.tap('.fp-replay')
  await sleep(1800)
  g = await grab(page, '.fp-intro-1')
  check('intro restored after replay', g && parseFloat(g.opacity) > 0.9, JSON.stringify(g))
  g = await grab(page, '.fp-lid')
  check('lid closed again after replay', g && (g.transform === 'none' || g.transform.includes('matrix(1, 0, 0, 1, 0, 0)')), JSON.stringify(g))

  console.log('\n— Reduced motion —')
  const page2 = await browser.newPage()
  await page2.setRequestInterception(true)
  page2.on('request', (req) => req.continue())
  await page2.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page2.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 20000 })
  await sleep(2600)
  await page2.tap(box)
  await sleep(2500)
  const rmPhase = await page2.evaluate(() => document.querySelector('.fp-page').className)
  check('reduced-motion: phase advanced past closed', rmPhase.includes('phase-revealing') || rmPhase.includes('phase-revealed'), rmPhase)
  await page2.close()

  console.log('\n— Final check: console errors —')
  check('no console errors', errors.length === 0, JSON.stringify(errors))

  await browser.close()
  console.log(`\nRESULT: ${failures} failure(s)`)
  process.exit(failures === 0 ? 0 : 1)
}

run().catch((e) => { console.error('FATAL', e); process.exit(1) })