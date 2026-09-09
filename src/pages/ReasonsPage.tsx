import { useCallback, useEffect, useRef, useState } from 'react'
import SparkleBurst from '../components/effects/SparkleBurst'
import AmbientParticles from '../components/effects/AmbientParticles'
import FloatingBalloons from '../components/effects/FloatingBalloons'
import './ReasonsPage.css'

interface ReasonsPageProps {
  onComplete: () => void
}

/**
 * ── Page 8: "6 Why You Are Special to Me" 🤍✨ ───────────
 * Intro (question) → interactive YES button → a warm grid of
 * six friendship cards. Each card reveals with a soft
 * fade-in / slide-up, floating hearts & sparkles decorate the
 * page, and a handwritten closing line wraps it all up.
 * ─────────────────────────────────────────────────────────
 */

interface ReasonCard {
  num: string
  icon: string
  title: string
  text: string
  deco: string
  tint: string
}

const REASONS: ReasonCard[] = [
  {
    num: '01',
    icon: '🫂',
    title: 'You Never Say No',
    text: 'Because whenever I ask you for something, you never simply say no. Somehow, you always try to help me or find a way. That little effort of yours means more to me than you know.',
    deco: '🤍',
    tint: 'c1',
  },
  {
    num: '02',
    icon: '🍦',
    title: 'You Buy Me Ice Cream',
    text: "Because you're the kind of friend who can turn an ordinary moment into a happy memory… sometimes it's as simple as buying me ice cream and making my whole mood better. 🍦🤍",
    deco: '🍦',
    tint: 'c2',
  },
  {
    num: '03',
    icon: '🌷',
    title: 'You Always Support Me',
    text: 'Because no matter what I am going through, you always support me. You listen, encourage me, and remind me that I am not alone. Having someone like you beside me is really special.',
    deco: '🌸',
    tint: 'c3',
  },
  {
    num: '04',
    icon: '🤝',
    title: 'You Are Always Helpful',
    text: 'Because whenever I need help, you are there. Whether it is something big or something completely silly, you still try to help me. That is one of the things I appreciate about you the most.',
    deco: '⭐',
    tint: 'c4',
  },
  {
    num: '05',
    icon: '😂',
    title: 'You Always Make Me Laugh',
    text: 'Because somehow, you always make me laugh. Even when I am not in the mood, talking to you somehow turns into laughing over the most random things. You make my days brighter without even trying.',
    deco: '🌈',
    tint: 'c5',
  },
  {
    num: '06',
    icon: '🫶',
    title: 'Being With You Is Always Fun',
    text: 'Because with you, I can be completely myself. We can talk about anything, joke about everything, and just be silly together. Somehow, even doing nothing with you becomes a fun memory. 🤍',
    deco: '🎈',
    tint: 'c6',
  },
]

function ReasonsPage({ onComplete }: ReasonsPageProps) {
  const [accepted, setAccepted] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [burstTrigger, setBurstTrigger] = useState(0)
  const timersRef = useRef<number[]>([])
  const mountedRef = useRef(true)
  const fuseRef = useRef(false)
  const finishingRef = useRef(false)
  const scrollerRef = useRef<HTMLDivElement>(null)

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

  // Soft jingle when the cards first appear
  useEffect(() => {
    if (revealed) {
      addTimer(() => setBurstTrigger((t) => t + 1), 260)
    }
  }, [revealed, addTimer])

  // YES… TELL ME WHY tapped
  const handleAccept = useCallback(() => {
    if (accepted || fuseRef.current) return
    fuseRef.current = true
    setAccepted(true)
    setBurstTrigger((t) => t + 1)
    addTimer(() => setRevealed(true), 1000)
  }, [accepted, addTimer])

  // THERE'S STILL MORE… → continue to next page
  const handleFinish = useCallback(() => {
    if (finishingRef.current) return
    finishingRef.current = true
    setLeaving(true)
    addTimer(() => onComplete(), 700)
  }, [addTimer, onComplete])

  return (
    <div
      className={`reasons-page${accepted ? ' accepted' : ''}${revealed ? ' revealed' : ''}${
        leaving ? ' leaving' : ''
      }`}
    >
      <div className="reasons-bg" aria-hidden="true" />
      <div className="page-balloon-atmosphere soft" aria-hidden="true">
        <FloatingBalloons count={6} />
      </div>
      <div className="reasons-ambient-glow" aria-hidden="true" />
      <div className="reasons-drift" aria-hidden="true">
        <span className="reasons-drift-heart rh-1">🤍</span>
        <span className="reasons-drift-heart rh-2">💛</span>
        <span className="reasons-drift-heart rh-3">💖</span>
        <span className="reasons-drift-sparkle rs-1">✨</span>
        <span className="reasons-drift-sparkle rs-2">✦</span>
        <span className="reasons-drift-sparkle rs-3">✨</span>
        <span className="reasons-drift-sparkle rs-4">🌸</span>
        <span className="reasons-drift-heart rh-4">💜</span>
        <span className="reasons-drift-sparkle rs-5">✨</span>
      </div>
      <div className="reasons-particles-layer">
        <AmbientParticles count={16} />
      </div>

      {/* ================= STEP 1 — INTRO + YES BUTTON ================= */}
      {!revealed && (
        <div className={`reasons-intro${accepted ? ' is-leaving' : ''}`}>
          <div className="reasons-intro-inner">
            <div className="reasons-intro-emblem" aria-hidden="true">
              <span className="reasons-intro-icon">🤍</span>
              <span className="reasons-intro-spark">✨</span>
            </div>

            <h2 className="reasons-intro-title">
              Do you want to know why you are so special to me? 🤍✨
            </h2>
            <p className="reasons-intro-sub">
              Some friends come into our life… and quietly make it so much brighter. 🥹🤍
            </p>

            <button
              className={`reasons-yes-btn${accepted ? ' accepted' : ''}`}
              onClick={handleAccept}
              disabled={accepted}
            >
              <span className="reasons-yes-label">YES… SHOW ME WHY 🤍✨</span>
              {accepted && <SparkleBurst trigger={burstTrigger} />}
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2 — SIX FRIENDSHIP CARDS ================= */}
      {revealed && (
        <div className="reasons-section">
          <div ref={scrollerRef} className="reasons-scroller">
            <h2 className="reasons-heading">
              6 Reasons Why You Are Special to Me <span className="reasons-heading-emoji">🤍✨</span>
            </h2>

            <div className="reasons-grid">
              {REASONS.map((r, i) => (
                <article
                  key={r.num}
                  className={`reason-card tint-${r.tint}`}
                  style={{ ['--card-index' as string]: String(i) }}
                >
                  <span className="reason-card-sheen" aria-hidden="true" />
                  <span className="reason-card-deco reason-card-deco-1" aria-hidden="true">
                    {r.deco}
                  </span>
                  <span className="reason-card-deco reason-card-deco-2" aria-hidden="true">
                    ✨
                  </span>
                  <span className="reason-card-spark cs-tl" aria-hidden="true">✦</span>
                  <span className="reason-card-spark cs-br" aria-hidden="true">✦</span>

                  <div className="reason-card-head">
                    <span className="reason-card-num">{r.num}</span>
                    <span className="reason-card-icon" aria-hidden="true">
                      {r.icon}
                    </span>
                  </div>

                  <h3 className="reason-card-title">{r.title}</h3>
                  <p className="reason-card-text">{r.text}</p>
                </article>
              ))}
            </div>

            <p className="reasons-handwritten">
              Maybe these are just six reasons… but honestly, there are a million more. ♾️🤍
            </p>

            <div className="reasons-controls">
              <button className="reasons-more-btn" onClick={handleFinish}>
                THERE'S STILL MORE… ✨
              </button>
              <SparkleBurst trigger={burstTrigger} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReasonsPage
