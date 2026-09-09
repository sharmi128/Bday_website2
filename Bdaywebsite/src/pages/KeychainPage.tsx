import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Starfield from '../components/effects/Starfield'
import AmbientParticles from '../components/effects/AmbientParticles'
import FloatingBalloons from '../components/effects/FloatingBalloons'
import './KeychainPage.css'

interface KeychainPageProps {
  onComplete: () => void
}

/* Seven charms — one for each friendship milestone from the timeline. */
const CHARMS = [
  { emoji: '🫂', label: 'the day we met' },
  { emoji: '❤️', label: 'our beginning' },
  { emoji: '📸', label: 'first memory' },
  { emoji: '✨', label: 'closer than ever' },
  { emoji: '😂', label: 'funniest moments' },
  { emoji: '🥹', label: 'unforgettable' },
  { emoji: '🌟', label: 'where we are today' },
]

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function KeychainPage({ onComplete }: KeychainPageProps) {
  const [step, setStep] = useState(0)
  const [bodyIn, setBodyIn] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const timersRef = useRef<number[]>([])
  const mountedRef = useRef(true)
  const continueFuseRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    addTimer(() => setStep(1), 300)
    addTimer(() => setStep(2), 1800)
    addTimer(() => setStep(3), 3400)
    addTimer(() => setStep(4), 4800)
    addTimer(() => setBodyIn(true), 5200)
    return () => {
      mountedRef.current = false
      timersRef.current.forEach((t) => window.clearTimeout(t))
      timersRef.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = window.setTimeout(() => {
      if (mountedRef.current) fn()
    }, ms)
    timersRef.current.push(t)
    return t
  }, [])

  const handleContinue = useCallback(() => {
    if (continueFuseRef.current) return
    continueFuseRef.current = true
    setLeaving(true)
    addTimer(() => onComplete(), 950)
  }, [addTimer, onComplete])

  const bokeh = useMemo(() => {
    const rand = seededRandom(75437)
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: rand() * 70 + 40,
      delay: rand() * 8,
      duration: rand() * 7 + 9,
      opacity: rand() * 0.28 + 0.1,
    }))
  }, [])

  const swing = useMemo(() => {
    const rand = seededRandom(2719)
    return CHARMS.map(() => ({
      delay: rand() * 0.9,
      sway: rand() * 6 + 3,
    }))
  }, [])

  return (
    <div className={`kc-page${bodyIn ? ' body-in' : ''}${leaving ? ' leaving' : ''}`}>
      <div className="kc-bg" aria-hidden="true" />
      <div className="page-balloon-atmosphere dim" aria-hidden="true">
        <FloatingBalloons count={8} />
      </div>
      <div className="kc-glow kc-glow-1" aria-hidden="true" />
      <div className="kc-glow kc-glow-2" aria-hidden="true" />
      <div className="kc-vignette" aria-hidden="true" />

      <div className="kc-stars" aria-hidden="true">
        <Starfield count={34} />
      </div>

      <div className="kc-bokeh" aria-hidden="true">
        {bokeh.map((b) => (
          <span
            key={b.id}
            className="kc-bokeh-dot"
            style={{
              left: `${b.left}%`,
              top: `${b.top}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              opacity: b.opacity,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="kc-particles">
        <AmbientParticles count={18} />
      </div>

      {/* ═══════════ INTRO ═══════════ */}
      <div className="kc-intro" aria-hidden="true">
        <p className={`kc-line kc-line-1${step >= 1 ? ' is-in' : ''}${step >= 3 ? ' is-leaving' : ''}`}>
          Some things are far too special to keep in a box... ✨
        </p>
        <p className={`kc-line kc-line-2${step >= 2 ? ' is-in' : ''}${step >= 3 ? ' is-leaving' : ''}`}>
          So here's a little piece of every memory, to carry with you wherever you go. ❤️
        </p>

        <div className={`kc-title-wrap${step >= 3 ? ' is-in' : ''}${step >= 4 ? ' is-leaving' : ''}`}>
          <span className="kc-title-spark" aria-hidden="true">🗝️</span>
          <h1 className="kc-title">YOUR FRIENDSHIP KEYCHAIN ❤️</h1>
          <div className={`kc-title-rule${step >= 3 ? ' is-drawn' : ''}`} aria-hidden="true">
            <span className="kc-title-rule-core" />
          </div>
        </div>
      </div>

      {/* ═══════════ THE KEYCHAIN ═══════════ */}
      <div className="kc-body" aria-hidden="true">
        <div className="kc-keychain">
          <div className="kc-ring">
            <span className="kc-ring-shine" aria-hidden="true" />
          </div>
          <div className="kc-charms">
            {CHARMS.map((c, i) => (
              <div
                key={c.emoji}
                className="kc-charm"
                style={
                  {
                    ['--sway' as string]: `${swing[i].sway}deg`,
                    ['--tdelay' as string]: `${swing[i].delay}s`,
                    animationDelay: `${0.3 + i * 0.14}s`,
                  } as React.CSSProperties
                }
              >
                <span className="kc-charm-thread" aria-hidden="true" />
                <span className="kc-charm-emoji" role="img" aria-label={c.label}>
                  {c.emoji}
                </span>
                <span className="kc-charm-label">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="kc-msg kc-msg-1">
          Seven little charms for seven of our favorite moments together. 🫂
        </p>
        <p className="kc-msg kc-msg-2">
          Every time you look at it, remember — I'll always be right here beside you. ❤️
        </p>

        <button type="button" className="kc-btn" onClick={handleContinue}>
          <span className="kc-btn-label">ONE LAST SURPRISE AWAITS ✨</span>
        </button>
      </div>
    </div>
  )
}

export default KeychainPage