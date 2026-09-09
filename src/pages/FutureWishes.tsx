import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SparkleBurst from '../components/effects/SparkleBurst'
import FloatingBalloons from '../components/effects/FloatingBalloons'
import './FutureWishes.css'

interface FutureWishesProps {
  onComplete: () => void
}

/**
 * ── Page 10: "Our Future Wishes" ─────────────────────────────
 * A dreamy night sky. Touch special stars to reveal hidden
 * wishes — a secret constellation forms once all six are found.
 * The wishes below are easy to edit / replace.
 * ─────────────────────────────────────────────────────────────
 */

const WISHES: string[] = [
  'A wish for all your dreams to come true. 🌟❤️',
  'A wish for many more beautiful memories together. 📸✨',
  'A wish for countless adventures waiting for us. ✈️🌍',
  'A wish for happiness that never runs out. 🫂❤️',
  'A wish that our friendship always stays this special. 🤝✨',
  "A wish for a future filled with moments we'll never forget. 🌙❤️",
]

interface StarSpec {
  x: number
  y: number
  bub: 'left' | 'center' | 'right'
  vert: 'below' | 'above'
  ang: number
  delay: number
  dur: number
  size: number
}

/* Positions are hand-placed so the sky looks natural (never a line). */
const STARS: StarSpec[] = [
  { x: 26, y: 28, bub: 'left', vert: 'below', ang: -6, delay: 0.2, dur: 3.4, size: 1 },
  { x: 74, y: 20, bub: 'right', vert: 'below', ang: 9, delay: 1.4, dur: 4.1, size: 1.15 },
  { x: 50, y: 43, bub: 'center', vert: 'below', ang: -3, delay: 0.9, dur: 3.7, size: 1.3 },
  { x: 27, y: 66, bub: 'left', vert: 'above', ang: 5, delay: 2.1, dur: 4.4, size: 1 },
  { x: 79, y: 64, bub: 'right', vert: 'above', ang: -8, delay: 0.5, dur: 3.2, size: 1.1 },
  { x: 14, y: 84, bub: 'left', vert: 'above', ang: 4, delay: 1.8, dur: 4.6, size: 0.95 },
]

const COUNT = 6

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

/* One layer of tiny background stars (seeded, gentle twinkle) */
function StarLayer({
  seed,
  count,
  layer,
}: {
  seed: number
  count: number
  layer: string
}) {
  const stars = useMemo(() => {
    const rand = seededRandom(seed)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: rand() * 3 + 1.5,
      delay: rand() * 6,
      dur: rand() * 3.5 + 2.5,
      op: rand() * 0.55 + 0.25,
    }))
  }, [seed, count])

  return (
    <div className={`fw-field ${layer}`} aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="fw-tiny"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.op,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  )
}

/* A fleeting little starburst that radiates outward (finale) */
function StarBurst({ trigger, count = 30 }: { trigger: number; count?: number }) {
  const stars = useMemo(() => {
    if (trigger <= 0) return []
    const rand = seededRandom(trigger * 4733 + 90211)
    return Array.from({ length: count }, (_, i) => {
      const angle = rand() * Math.PI * 2
      const dist = rand() * 60 + 34
      return {
        id: `${trigger}-${i}`,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        size: rand() * 12 + 6,
        rot: rand() * 200 - 100,
        delay: rand() * 0.28,
        dur: rand() * 1 + 1,
      }
    })
  }, [trigger, count])

  if (trigger <= 0) return null

  return (
    <div className="fw-star-burst" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="fw-burst-star"
          style={
            {
              fontSize: `${s.size}px`,
              ['--dx' as string]: `${s.dx}vw`,
              ['--dy' as string]: `${s.dy}vh`,
              ['--rot' as string]: `${s.rot}deg`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            } as React.CSSProperties
          }
        >
          ✦
        </span>
      ))}
    </div>
  )
}

function FutureWishes({ onComplete }: FutureWishesProps) {
  const [introReady, setIntroReady] = useState(false)
  const [discovered, setDiscovered] = useState<boolean[]>(Array(COUNT).fill(false))
  const [burstKeys, setBurstKeys] = useState<number[]>(Array(COUNT).fill(0))
  const [finale, setFinale] = useState(false)
  const [leavingPage, setLeavingPage] = useState(false)
  const timersRef = useRef<number[]>([])
  const mountedRef = useRef(true)
  const finalePlannedRef = useRef(false)
  const finalFuseRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      timersRef.current.forEach((t) => window.clearTimeout(t))
      timersRef.current = []
    }
  }, [])

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = window.setTimeout(() => {
      if (mountedRef.current) fn()
    }, ms)
    timersRef.current.push(t)
    return t
  }, [])

  // After the intro lines, reveal the interactive sky
  useEffect(() => {
    addTimer(() => setIntroReady(true), 3300)
  }, [addTimer])

  // Once all six wishes are discovered → cinematic constellation
  useEffect(() => {
    if (!introReady || finale || finalePlannedRef.current) return
    if (discovered.every(Boolean)) {
      finalePlannedRef.current = true
      addTimer(() => setFinale(true), 1100)
    }
  }, [introReady, finale, discovered, addTimer])

  // Touch / click a special star → reveal only that wish
  const handleStar = useCallback((i: number) => {
    if (!introReady || finale) return
    setDiscovered((prev) => {
      if (prev[i]) return prev
      const next = [...prev]
      next[i] = true
      return next
    })
    setBurstKeys((prev) => {
      const next = [...prev]
      next[i] = prev[i] + 1
      return next
    })
  }, [introReady, finale])

  // CONTINUE TO THE FINAL SURPRISE → next page
  const handleFinish = useCallback(() => {
    if (finalFuseRef.current) return
    finalFuseRef.current = true
    setLeavingPage(true)
    addTimer(() => onComplete(), 800)
  }, [addTimer, onComplete])

  const found = discovered.filter(Boolean).length

  return (
    <div
      className={`fw-page${introReady ? ' intro-done' : ''}${finale ? ' all-lit' : ''}${
        leavingPage ? ' leaving' : ''
      }`}
    >
      {/* warm night-sky base */}
      <div className="fw-bg" aria-hidden="true" />
      <div className="page-balloon-atmosphere soft" aria-hidden="true">
        <FloatingBalloons count={6} />
      </div>
      <div className="fw-nebula fw-neb-1" aria-hidden="true" />
      <div className="fw-nebula fw-neb-2" aria-hidden="true" />
      <div className="fw-nebula fw-neb-3" aria-hidden="true" />

      <div className="fw-sky">
        <StarLayer seed={104729} count={34} layer="fw-lay-a" />
        <StarLayer seed={1299721} count={22} layer="fw-lay-b" />

        <div className="fw-shoots" aria-hidden="true">
          <span className="fw-shoot fw-shoot-1" />
          <span className="fw-shoot fw-shoot-2" />
          <span className="fw-shoot fw-shoot-3" />
        </div>

        {STARS.map((s, i) => {
          const done = discovered[i]
          return (
            <div
              key={i}
              className={`fw-swrap bub-${s.bub} vert-${s.vert}${done ? ' done' : ''}`}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <button
                type="button"
                className={`fw-star${done ? ' done' : ''}`}
                disabled={!introReady || done}
                onClick={() => handleStar(i)}
                aria-label={`Special star ${i + 1}, touch to reveal a wish`}
                style={
                  {
                    ['--ang' as string]: `${s.ang}deg`,
                    ['--tdelay' as string]: `${s.delay}s`,
                    ['--tdur' as string]: `${s.dur}s`,
                    ['--scale' as string]: s.size,
                  } as React.CSSProperties
                }
              >
                <span className="fw-star-shape" aria-hidden="true">
                  <span className="fw-star-core" />
                </span>
                <span className="fw-star-halo" aria-hidden="true" />
                {done && <span className="fw-mark" aria-hidden="true">✦</span>}
              </button>

              {done && (
                <>
                  <div className="fw-wish" role="status">
                    <span className="fw-wish-glow" aria-hidden="true" />
                    <span className="fw-wish-text">{WISHES[i]}</span>
                  </div>
                  <SparkleBurst trigger={burstKeys[i]} />
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* intro lines → then the stars are ready */}
      {!introReady && (
        <div className="fw-intro" aria-hidden="true">
          <p className="fw-intro-line fw-i1">Some wishes are meant to stay in our hearts... ✨</p>
          <p className="fw-intro-line fw-i2">Maybe the future has a few surprises waiting for us. ❤️</p>
          <p className="fw-intro-line fw-i3">Touch the stars and discover them... ⭐</p>
        </div>
      )}

      {!finale && (
        <div className="fw-progress" aria-live="polite">
          {found} / {COUNT} wishes discovered ✨
        </div>
      )}

      {/* all six found → constellation finale */}
      {finale && (
        <div className="fw-finale">
          <div className="fw-finale-nightsky" aria-hidden="true" />

          <svg
            className="fw-constellation"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {STARS.map((s, i) => {
              const n = (i + 1) % STARS.length
              return (
                <line
                  key={`${i}-${n}`}
                  x1={s.x}
                  y1={s.y}
                  x2={STARS[n].x}
                  y2={STARS[n].y}
                  pathLength={1}
                  style={{ animationDelay: `${0.5 + i * 0.16}s` }}
                />
              )
            })}
          </svg>

          <StarBurst trigger={finale ? 1 : 0} />

          <div className="fw-finale-inner">
            <p className="fw-fin fw-fin-1">You found all my wishes... ⭐❤️</p>
            <p className="fw-fin fw-fin-2">And maybe the best wish of all...</p>
            <p className="fw-fin fw-fin-3">
              Whatever happens in the future,
              <br />
              I hope our friendship always remains a beautiful part of it. ❤️
            </p>
            <p className="fw-fin fw-fin-4">Here's to all the memories we haven't made yet... ✨</p>
            <h2 className="fw-fintitle">OUR STORY ISN'T OVER YET. ❤️</h2>
            <button type="button" className="fw-finale-btn" onClick={handleFinish}>
              CONTINUE TO THE FINAL SURPRISE 👀✨
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FutureWishes