import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import Starfield from '../components/effects/Starfield'
import AmbientParticles from '../components/effects/AmbientParticles'
import FloatingBalloons from '../components/effects/FloatingBalloons'
import './FinalGiftBox.css'

type Phase = 'closed' | 'opening' | 'revealing' | 'revealed' | 'finalMessage' | 'theEnd' | 'forever'

interface Gift {
  id: number
  icon: string
  label: string
  dx: number
  up: number
  sc: number
  rot: number
  dur: number
  delay: number
  size: number
}

/* Gifts rise out of the box, one by one, on their own trajectory. */
const GIFTS: Gift[] = [
  { id: 0, icon: '💵', label: 'Money', dx: -34, up: 36, sc: 1.18, rot: -14, dur: 1.6, delay: 1.55, size: 5.6 },
  { id: 1, icon: '❤️', label: 'Heart', dx: -26, up: 13, sc: 0.9, rot: -9, dur: 1.4, delay: 2.0, size: 3.4 },
  { id: 2, icon: '🍫', label: 'Kinder Joy chocolates', dx: -8, up: 42, sc: 1.15, rot: 12, dur: 1.75, delay: 2.45, size: 5.6 },
  { id: 3, icon: '⭐', label: 'Star', dx: 14, up: 15, sc: 0.85, rot: 12, dur: 1.45, delay: 2.9, size: 3.4 },
  { id: 4, icon: '✈️', label: 'Airplane', dx: 26, up: 44, sc: 1.24, rot: -12, dur: 1.85, delay: 3.35, size: 6.2 },
  { id: 5, icon: '🎈', label: 'Balloon', dx: -6, up: 33, sc: 1.0, rot: -7, dur: 1.55, delay: 3.8, size: 3.8 },
  { id: 6, icon: '🕷️', label: 'Spider hero', dx: -40, up: 20, sc: 1.28, rot: 8, dur: 1.5, delay: 4.25, size: 6.2 },
  { id: 7, icon: '🎀', label: 'Ribbon', dx: 30, up: 9, sc: 0.85, rot: 16, dur: 1.4, delay: 4.7, size: 3.6 },
  { id: 8, icon: '⚡️', label: 'Pikachu hero', dx: 2, up: 46, sc: 1.34, rot: 0, dur: 1.9, delay: 5.15, size: 6.8 },
  { id: 9, icon: '✨', label: 'Sparkle', dx: -17, up: 22, sc: 0.8, rot: 12, dur: 1.5, delay: 5.6, size: 3.6 },
  { id: 10, icon: '🏠', label: 'House', dx: 36, up: 24, sc: 1.18, rot: -10, dur: 1.65, delay: 6.05, size: 5.8 },
  { id: 11, icon: '🎁', label: 'Tiny gift', dx: 9, up: 12, sc: 0.85, rot: -12, dur: 1.4, delay: 6.5, size: 4 },
  { id: 12, icon: '🚗', label: 'Car', dx: -12, up: 28, sc: 1.24, rot: 4, dur: 1.6, delay: 6.95, size: 6 },
  { id: 13, icon: '🏍️', label: 'Bike', dx: 40, up: 38, sc: 1.18, rot: 6, dur: 1.85, delay: 7.4, size: 6 },
]

const MESSAGES = [
  'These are just little things... ❤️',
  'But the most precious gift is our friendship. 🥹❤️',
  'Happy Birthday, Bruno! 🎂🎉❤️',
  `I hope you get everything you dream of,
and may your life always be filled with happiness,
beautiful memories and amazing adventures. ✨`,
  'Happy Birthday once again, Bruno! ❤️🎂',
]

const FLOATIES = [
  { e: '✨', left: 4, top: 30, delay: 0, dur: 9 },
  { e: '❤️', left: 12, top: 70, delay: 1.2, dur: 8 },
  { e: '⭐', left: 24, top: 40, delay: 2.1, dur: 10 },
  { e: '🎈', left: 36, top: 80, delay: 0.6, dur: 9 },
  { e: '✨', left: 50, top: 20, delay: 1.7, dur: 11 },
  { e: '💖', left: 62, top: 75, delay: 0.3, dur: 8 },
  { e: '⭐', left: 74, top: 36, delay: 2.4, dur: 10 },
  { e: '🎈', left: 86, top: 65, delay: 1, dur: 9 },
  { e: '✨', left: 93, top: 28, delay: 1.9, dur: 8 },
  { e: '❤️', left: 47, top: 55, delay: 2.8, dur: 12 },
]

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

interface GiftItemProps {
  g: Gift
}

function GiftItem({ g }: GiftItemProps) {
  return (
    <span
      className="fp-gift"
      style={
        {
          ['--dx' as string]: `${g.dx}vmin`,
          ['--up' as string]: `${-g.up}vmin`,
          ['--sc' as string]: g.sc,
          ['--rot' as string]: `${g.rot}deg`,
          animationDelay: `${g.delay}s`,
          animationDuration: `${g.dur}s`,
        } as React.CSSProperties
      }
    >
      <span
        className="fp-gift-emoji"
        role="img"
        aria-label={g.label}
        style={{
          fontSize: `${g.size}vmin`,
          animationDelay: `${g.delay + g.dur}s`,
          animationDuration: `${g.dur + 1.4}s`,
        }}
      >
        {g.icon}
      </span>
    </span>
  )
}

function FinalGiftBox() {
  const [phase, setPhase] = useState<Phase>('closed')
  const [runId, setRunId] = useState(0)
  const [introArmed, setIntroArmed] = useState(false)
  const [boxShaking, setBoxShaking] = useState(false)
  const [ribbonLoose, setRibbonLoose] = useState(false)
  const [boxOpen, setBoxOpen] = useState(false)
  const [golden, setGolden] = useState(false)
  const [burst, setBurst] = useState(0)
  const [msgIdx, setMsgIdx] = useState(-1)
  const [foreverStep, setForeverStep] = useState(0)

  const pageRef = useRef<HTMLDivElement | null>(null)
  const fuseRef = useRef(false)
  const mountedRef = useRef(true)
  const timersRef = useRef<number[]>([])

  const schedule = useCallback((fn: () => void, ms: number) => {
    const t = window.setTimeout(() => {
      if (mountedRef.current) fn()
    }, ms)
    timersRef.current.push(t)
  }, [])

  useEffect(() => {
    mountedRef.current = true
    timersRef.current = []
    fuseRef.current = false
    setBoxShaking(false)
    setRibbonLoose(false)
    setBoxOpen(false)
    setGolden(false)
    setBurst(0)
    setMsgIdx(-1)
    setForeverStep(0)
    setPhase('closed')
    setIntroArmed(false)

    schedule(() => setIntroArmed(true), 350)
    return () => {
      mountedRef.current = false
      timersRef.current.forEach((t) => window.clearTimeout(t))
      timersRef.current = []
    }
  }, [runId, schedule])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = pageRef.current
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !el) return
      const rx = (e.clientX / window.innerWidth) * 2 - 1
      const ry = (e.clientY / window.innerHeight) * 2 - 1
      el.style.setProperty('--mpx', rx.toFixed(3))
      el.style.setProperty('--mpy', ry.toFixed(3))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const handleOpen = useCallback(() => {
    if (fuseRef.current || phase !== 'closed') return
    fuseRef.current = true
    setPhase('opening')
    setBoxShaking(true)

    schedule(() => {
      setBoxShaking(false)
      setRibbonLoose(true)
    }, 620)

    schedule(() => {
      setRibbonLoose(false)
      setBoxOpen(true)
    }, 1320)

    schedule(() => {
      setGolden(true)
      setBurst((n) => n + 1)
    }, 1500)

    schedule(() => setPhase('revealing'), 2150)
    schedule(() => setPhase('revealed'), 10600)

    /* ---- emotional message ---- */
    schedule(() => {
      setMsgIdx(0)
      setPhase('finalMessage')
    }, 12600)
    schedule(() => setMsgIdx(1), 15600)
    schedule(() => setMsgIdx(2), 18600)
    schedule(() => setMsgIdx(3), 21600)
    schedule(() => setMsgIdx(4), 26800)

    /* ---- the end ---- */
    schedule(() => setPhase('theEnd'), 30000)

    /* ---- forever (friendship never ends) ---- */
    schedule(() => {
      setPhase('forever')
      setForeverStep(0)
      schedule(() => setForeverStep(1), 1800)
      schedule(() => setForeverStep(2), 3400)
      schedule(() => setForeverStep(3), 7000)
      schedule(() => setForeverStep(4), 9000)
    }, 34800)
  }, [phase, schedule])

  const handleBoxKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleOpen()
      }
    },
    [handleOpen],
  )

  const handleReplay = useCallback(() => {
    fuseRef.current = false
    timersRef.current.forEach((t) => window.clearTimeout(t))
    timersRef.current = []
    setRunId((n) => n + 1)
  }, [])

  const burstSparks = useMemo(() => {
    if (burst <= 0) return []
    const rand = seededRandom(burst * 991 + 11)
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: (rand() * 2 - 1) * 22,
      y: rand() * 34 + 14,
      s: rand() * 2.4 + 1.2,
      d: rand() * 0.35,
      dur: rand() * 0.7 + 0.8,
      r: (rand() * 2 - 1) * 80,
    }))
  }, [burst])

  const burstConfetti = useMemo(() => {
    if (burst <= 0) return []
    const rand = seededRandom(burst * 577 + 31)
    const colors = ['#ffd166', '#ff6b8b', '#7ce8a0', '#5bc8ff', '#ff9a4a', '#ff7bc4']
    return Array.from({ length: 26 }, (_, i) => ({
      id: i,
      x: (rand() * 2 - 1) * 32,
      y: rand() * 30 + 8,
      c: colors[i % colors.length],
      s: rand() * 5 + 4,
      d: rand() * 0.4,
      dur: rand() * 0.9 + 1.1,
      r: (rand() * 2 - 1) * 720,
      w: rand() * 2 + 3,
    }))
  }, [burst])

  const foreverOrbs = useMemo(() => {
    const rand = seededRandom(4242)
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      r: rand() * 6 + 13,
      d: rand() * 2 + 4,
      delay: rand() * 4,
      color: i % 3 === 0 ? '#ffd166' : i % 3 === 1 ? '#ff9ab8' : '#ffe9c8',
      size: rand() * 4 + 3,
    }))
  }, [])

  const endHearts = useMemo(() => {
    const rand = seededRandom(808)
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: rand() * 100,
      delay: rand() * 6,
      dur: rand() * 5 + 6,
      size: rand() * 12 + 10,
    }))
  }, [])

  const foreverHearts = useMemo(() => {
    const rand = seededRandom(909)
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: rand() * 100,
      delay: rand() * 6,
      dur: rand() * 5 + 6,
      size: rand() * 12 + 10,
    }))
  }, [])

  return (
    <div className={`fp-page fp-anim phase-${phase}`} ref={pageRef}>
      {/* ═══ atmosphere ═══ */}
      <div className="fp-bg" aria-hidden="true" />
      <div className="page-balloon-atmosphere" aria-hidden="true">
        <FloatingBalloons count={8} />
      </div>

      <div className="fp-para-far" aria-hidden="true">
        <div className="fp-aurora" />
        <div className="fp-glow fp-glow-1" />
        <div className="fp-glow fp-glow-2" />
        <div className="fp-spotlight" />
      </div>

      <div className="fp-vignette" aria-hidden="true" />

      <div className="fp-stars" aria-hidden="true">
        <Starfield count={36} />
      </div>

      <div className="fp-ambient" aria-hidden="true">
        <AmbientParticles count={18} />
      </div>

      <div className="fp-floaties" aria-hidden="true">
        {FLOATIES.map((f, i) => (
          <span
            key={i}
            className="fp-floaty"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.dur}s`,
            }}
          >
            {f.e}
          </span>
        ))}
      </div>

      {/* ═══ main scene ═══ */}
      <div className="fp-scene">
        {/* intro heading */}
        <div className={`fp-intro${phase !== 'closed' ? ' is-hidden' : ''}`}>
          <p className={`fp-intro-line fp-intro-1${introArmed ? ' is-in' : ''}`}>
            One last surprise... 🎁✨
          </p>
          <p className={`fp-intro-line fp-intro-2${introArmed ? ' is-in' : ''}`}>
            Something special is waiting for you.
          </p>
        </div>

        {/* the gift box */}
        <div
          className={`fp-box${boxShaking ? ' shaking' : ''}${boxOpen ? ' open' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Open the final birthday gift box"
          onClick={handleOpen}
          onKeyDown={handleBoxKeyDown}
        >
          <div className="fp-box-shadow" aria-hidden="true" />

          <div className="fp-box-3d">
            {/* golden light from inside */}
            <div className={`fp-light${golden ? ' on' : ''}`} aria-hidden="true">
              <div className="fp-light-core" />
              <div className="fp-beam" />
              <div className="fp-rays">
                {Array.from({ length: 8 }, (_, r) => (
                  <span key={r} className="fp-ray" style={{ transform: `rotate(${r * 45}deg)` }} />
                ))}
              </div>
            </div>

            {/* body */}
            <div className="fp-body">
              <div className="fp-body-shine" aria-hidden="true" />
              <div className="fp-ribbon-v" aria-hidden="true" />
              <div className="fp-ribbon-h" aria-hidden="true" />
              <div className="fp-knot" aria-hidden="true" />
              <div className="fp-body-lace" aria-hidden="true" />
            </div>

            {/* lid + bow */}
            <div className={`fp-lid${ribbonLoose ? ' loose' : ''}${boxOpen ? ' open' : ''}`}>
              <div className="fp-lid-top" />
              <div className="fp-lid-face" />
              <div className="fp-lid-ribbon" aria-hidden="true" />
              <div className="fp-lid-knot" aria-hidden="true" />
              <div className="fp-bow" aria-hidden="true">
                <span className="fp-bow-loop fp-bow-loop-l" />
                <span className="fp-bow-loop fp-bow-loop-r" />
                <span className="fp-bow-tail fp-bow-tail-l" />
                <span className="fp-bow-tail fp-bow-tail-r" />
                <span className="fp-bow-knot" />
              </div>
            </div>
          </div>

          {/* surprises rising out of the box */}
          {phase !== 'closed' && (
            <div className="fp-gifts">
              {GIFTS.map((g) => (
                <GiftItem key={g.id} g={g} />
              ))}
            </div>
          )}

          {/* burst effects */}
          {burst > 0 && (
            <div className="fp-burst" aria-hidden="true">
              {burstSparks.map((s) => (
                <span
                  key={`s${burst}-${s.id}`}
                  className="fp-burst-spark"
                  style={
                    {
                      ['--sx' as string]: `${s.x}vmin`,
                      ['--sy' as string]: `${s.y}vmin`,
                      ['--ss' as string]: s.s,
                      ['--sr' as string]: `${s.r}deg`,
                      animationDelay: `${s.d}s`,
                      animationDuration: `${s.dur}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
              {burstConfetti.map((c) => (
                <span
                  key={`c${burst}-${c.id}`}
                  className="fp-burst-confetti"
                  style={
                    {
                      ['--sx' as string]: `${c.x}vmin`,
                      ['--sy' as string]: `${c.y}vmin`,
                      ['--sr' as string]: `${c.r}deg`,
                      ['--cw' as string]: `${c.w}px`,
                      background: c.c,
                      width: `${c.w}px`,
                      height: `${c.s}px`,
                      animationDelay: `${c.d}s`,
                      animationDuration: `${c.dur}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          )}

          <div className={`fp-box-glow${golden ? ' on' : ''}`} aria-hidden="true" />
        </div>

        {/* open button + hint */}
        <button
          type="button"
          className={`fp-open-btn${introArmed ? ' is-in' : ''}${phase !== 'closed' ? ' is-hidden' : ''}`}
          onClick={handleOpen}
        >
          OPEN THE BOX 🎁
        </button>
        <p className={`fp-tap-hint${introArmed ? ' is-in' : ''}${phase !== 'closed' ? ' is-hidden' : ''}`}>
          Tap the box or the button ✨
        </p>
      </div>

      {/* burst flash layer */}
      {burst > 0 && <div className="fp-flash" aria-hidden="true" />}

      {/* ═══ emotional message ═══ */}
      <div
        className={`fp-msg-overlay${phase === 'finalMessage' ? ' show' : ''}`}
        aria-hidden={phase !== 'finalMessage'}
      >
        <div className="fp-msg-glow" aria-hidden="true" />
        <div className="fp-msg-inner">
          {MESSAGES.map((m, i) => (
            <p
              key={i}
              className={`fp-msg-line${msgIdx === i ? ' is-in' : ''}${msgIdx > i ? ' is-gone' : ''}`}
            >
              {m}
            </p>
          ))}
        </div>
      </div>

      {/* ═══ THE END ═══ */}
      <div
        className={`fp-end-overlay${phase === 'theEnd' ? ' show' : ''}`}
        aria-hidden={phase !== 'theEnd'}
      >
        <div className="fp-end-stars" aria-hidden="true">
          <Starfield count={30} />
        </div>
        <div className="fp-end-hearts" aria-hidden="true">
          {endHearts.map((h) => (
            <span
              key={h.id}
              className="fp-heart-float"
              style={{
                left: `${h.left}%`,
                fontSize: `${h.size}px`,
                animationDelay: `${h.delay}s`,
                animationDuration: `${h.dur}s`,
              }}
            >
              ❤️
            </span>
          ))}
        </div>
        <h2 className="fp-end-title">THE END... ✨</h2>
      </div>

      {/* ═══ forever ═══ */}
      <div
        className={`fp-forever-overlay${phase === 'forever' ? ' show' : ''}`}
        aria-hidden={phase !== 'forever'}
      >
        <div className="fp-forever-stars" aria-hidden="true">
          <Starfield count={26} />
        </div>
        <div className="fp-forever-hearts" aria-hidden="true">
          {foreverHearts.map((h) => (
            <span
              key={h.id}
              className="fp-heart-float"
              style={{
                left: `${h.left}%`,
                fontSize: `${h.size}px`,
                animationDelay: `${h.delay}s`,
                animationDuration: `${h.dur}s`,
              }}
            >
              ❤️
            </span>
          ))}
        </div>

        <div className="fp-forever-content">
          <p className={`fp-fr-line fp-fr-1${foreverStep >= 0 ? ' is-in' : ''}`}>
            But this is NOT the end of our friendship. ❤️
          </p>
          <p className={`fp-fr-line fp-fr-2${foreverStep >= 1 ? ' is-in' : ''}`}>
            Our story will keep going...
          </p>

          <div className={`fp-infinity${foreverStep >= 2 ? ' is-in' : ''}`}>
            <div className="fp-infinity-orbs" aria-hidden="true">
              {foreverOrbs.map((o) => (
                <span
                  key={o.id}
                  className="fp-infinity-orb"
                  style={
                    {
                      ['--R' as string]: `${o.r}vmin`,
                      ['--od' as string]: `${o.d}s`,
                      ['--oa' as string]: `${o.delay}s`,
                      background: o.color,
                      width: `${o.size}px`,
                      height: `${o.size}px`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <span className="fp-infinity-glyph" role="img" aria-label="Forever">
              ♾️
            </span>
            <p className="fp-infinity-text">
              OUR FRIENDSHIP GOES ON <span className="fp-forever-strong">FOREVER</span>. ❤️
            </p>
          </div>

          <div className={`fp-more${foreverStep >= 3 ? ' is-in' : ''}`}>
            <p className="fp-more-line">More memories.</p>
            <p className="fp-more-line">More adventures.</p>
            <p className="fp-more-line">More laughter.</p>
            <p className="fp-more-line">More moments together. ✨</p>
          </div>

          <p className={`fp-final-line${foreverStep >= 4 ? ' is-in' : ''}`}>
            THE WEBSITE ENDS HERE...
            <br />
            BUT OUR FRIENDSHIP NEVER WILL. ❤️♾️
          </p>

          <button type="button" className={`fp-replay${foreverStep >= 4 ? ' is-in' : ''}`} onClick={handleReplay}>
            REPLAY SURPRISE 🔄
          </button>
        </div>
      </div>
    </div>
  )
}

export default FinalGiftBox