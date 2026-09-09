import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SparkleBurst from '../components/effects/SparkleBurst'
import ConfettiBurst from '../components/effects/ConfettiBurst'
import CelebratoryFlash from '../components/effects/CelebratoryFlash'
import AmbientParticles from '../components/effects/AmbientParticles'
import FloatingBalloons from '../components/effects/FloatingBalloons'
import './FunnyMoments.css'

interface FunnyMomentsProps {
  onComplete: () => void
}

interface FunnyMoment {
  theme: string
  kicker: string
  title: string
  lines: string[]
  note: string
}

/**
 * ── Page 8: "Funny Moments" ────────────────────────────────
 * Playful intro → exactly 5 REAL funny moments, one at a time.
 * Each moment is a themed scrapbook card with its own personality.
 * ───────────────────────────────────────────────────────────
 */
const MOMENTS: FunnyMoment[] = [
  {
    theme: 'questions',
    kicker: 'the interrogation zone ❓',
    title: 'MY RANDOM QUESTIONS',
    lines: [
      "I always ask you so many random, crazy questions… 😂😭",
      "And most of the time, you don't even know the answer! 🤣",
      "…which is exactly why I enjoy asking you even more — I get to tease you and have fun with you! 😂❤️",
    ],
    note: "no thought is too weird to ask you ✨",
  },
  {
    theme: 'stranger',
    kicker: 'our own weird little world 🎬',
    title: 'OUR STRANGER THINGS CHALLENGE',
    lines: [
      'Our Stranger Things challenge was honestly SO MUCH FUN! 😂🔥',
      'It was one of those moments where we just kept doing the challenge and enjoying the craziness together. 🤣❤️',
      'No monsters needed — we already brought our own chaos. ⚡✨',
    ],
    note: 'the adventure never really ended 🔥',
  },
  {
    theme: 'drawing',
    kicker: 'a tiny technical disaster 🎨',
    title: 'THE DRAWING CHALLENGE',
    lines: [
      'I gave you numbers from 1 to 10 and asked you to draw based on them. 😂🎨',
      "But the funniest part? Your Doodle option didn't even show up! 😭🤣",
      "I was all ready for the challenge… and the Doodle option just decided to disappear completely. 😂💀",
    ],
    note: 'doodle.exe has left the chat 💀',
  },
  {
    theme: 'cadpoint',
    kicker: 'our bus full of comedy 🚌',
    title: 'CADPOINT COMEDY',
    lines: [
      "While going to CADPoint, the 'Jersha kolantha nee' comedy happened. 😂😭",
      'It was SO RANDOM and SO FUNNY that it became one of those little moments I still remember and laugh about. 🤣❤️',
    ],
    note: 'the ride was fun… the laughter was peak ❤️',
  },
  {
    theme: 'teasing',
    kicker: 'certified pro teaser 😜',
    title: 'MY NEVER-ENDING TEASING',
    lines: [
      'And honestly… I tease you A LOT. 😂🤭',
      "Sometimes for no reason. Sometimes just because it's fun.",
      'And most of those little teasing moments have become some of my favourite funny memories. 😂❤️',
      "Basically… my favourite way of annoying you while having fun with you. 🤣🫶",
    ],
    note: 'never-ending supply of teasing. sorry — not sorry 😜🫶',
  },
]

const ROTATIONS = ['-2.2deg', '1.8deg', '-1.1deg', '2.4deg', '-1.8deg']

const BURST_EMOJI = ['😂', '🤣', '😭', '❤️', '🔥', '🤭', '💛', '✨', '🎉']

const pad = (n: number) => String(n).padStart(2, '0')

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

/* Playful burst of floating emojis (reused for intro + NEXT taps) */
function EmojiBurst({
  trigger,
  className = 'funny-emoji-burst',
}: {
  trigger: number
  className?: string
}) {
  const items = useMemo(() => {
    if (trigger <= 0) return []
    const rand = seededRandom(trigger * 18081 + 31337)
    return Array.from({ length: 18 }, (_, i) => ({
      id: `${trigger}-${i}`,
      emoji: BURST_EMOJI[(i * 7 + trigger) % BURST_EMOJI.length],
      dx: rand() * 300 - 150,
      dy: rand() * -260 - 30,
      rot: rand() * 160 - 80,
      size: rand() * 22 + 18,
      delay: rand() * 0.12,
    }))
  }, [trigger])

  if (trigger <= 0) return null

  return (
    <div className={className} aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.id}
          style={
            {
              fontSize: `${it.size}px`,
              ['--dx' as string]: `${it.dx}px`,
              ['--dy' as string]: `${it.dy}px`,
              ['--rot' as string]: `${it.rot}deg`,
              animationDelay: `${it.delay}s`,
            } as React.CSSProperties
          }
        >
          {it.emoji}
        </span>
      ))}
    </div>
  )
}

/* Themed decorative banner for each funny moment */
function MomentDeco({ theme }: { theme: string }) {
  switch (theme) {
    case 'questions':
      return (
        <div className="mom-deco th-q" aria-hidden="true">
          <span className="thq-chip c1">❓</span>
          <span className="thq-chip c2">❓</span>
          <span className="thq-face">😵‍💫</span>
          <span className="thq-chip c3">❓</span>
          <span className="thq-face">🤔</span>
          <span className="thq-chip c4">❓</span>
          <span className="thq-heart h1">❤️</span>
          <span className="thq-heart h2">💛</span>
        </div>
      )
    case 'stranger':
      return (
        <div className="mom-deco th-s" aria-hidden="true">
          <span className="ths-sign">STRANGER VIBES</span>
          <span className="ths-bolt b1">⚡</span>
          <span className="ths-bolt b2">⚡</span>
          <span className="ths-eye">👀</span>
          <span className="ths-fire">🔥</span>
        </div>
      )
    case 'drawing':
      return (
        <div className="mom-deco th-d" aria-hidden="true">
          <div className="thd-nums">
            <span>1️⃣</span>
            <span>2️⃣</span>
            <span>3️⃣</span>
            <span>4️⃣</span>
            <span>5️⃣</span>
            <span>6️⃣</span>
            <span>7️⃣</span>
            <span>8️⃣</span>
            <span>9️⃣</span>
            <span>🔟</span>
          </div>
          <div className="thd-error">
            <span className="thd-error-title">⚠️ ERROR 404</span>
            <span className="thd-error-sub">Doodle option not found 😭</span>
          </div>
        </div>
      )
    case 'cadpoint':
      return (
        <div className="mom-deco th-c" aria-hidden="true">
          <span className="thc-bubble">Jersha kolantha nee 😂</span>
          <span className="thc-bus">🚌</span>
          <span className="thc-road" aria-hidden="true" />
        </div>
      )
    case 'teasing':
      return (
        <div className="mom-deco th-t" aria-hidden="true">
          <span className="tht-bubble b1">😜</span>
          <span className="tht-bubble b2">🤭</span>
          <span className="tht-bubble b3">💕</span>
          <span className="tht-heart h1">❤️</span>
          <span className="tht-heart h2">🫶</span>
        </div>
      )
    default:
      return null
  }
}

function FunnyMoments({ onComplete }: FunnyMomentsProps) {
  const [started, setStarted] = useState(false)
  const [introLeaving, setIntroLeaving] = useState(false)
  const [btnShaking, setBtnShaking] = useState(false)
  const [startBurst, setStartBurst] = useState(0)
  const [slotIndex, setSlotIndex] = useState(0)
  const [isLeaving, setIsLeaving] = useState(false)
  const [leavingPage, setLeavingPage] = useState(false)
  const [photoBurst, setPhotoBurst] = useState(0)
  const [photoPopped, setPhotoPopped] = useState(false)
  const [emojiBurstKey, setEmojiBurstKey] = useState(0)
  const timersRef = useRef<number[]>([])
  const mountedRef = useRef(true)
  const startFuseRef = useRef(false)
  const nextFuseRef = useRef(false)
  const photoFuseRef = useRef(false)
  const finishFuseRef = useRef(false)

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

  const moment = MOMENTS[slotIndex]
  const isLast = slotIndex === MOMENTS.length - 1

  // SHOW ME THE CHAOS → shake, confetti, emoji burst, then reveal
  const handleStart = useCallback(() => {
    if (startFuseRef.current) return
    startFuseRef.current = true
    setBtnShaking(true)
    setStartBurst((t) => t + 1)
    setEmojiBurstKey((k) => k + 1)
    addTimer(() => setIntroLeaving(true), 950)
    addTimer(() => setStarted(true), 1380)
  }, [addTimer])

  // Tap the moment card → gentle zoom + rotate + sparkles
  const handleCardTap = useCallback(() => {
    if (isLast) return
    if (photoFuseRef.current) return
    photoFuseRef.current = true
    setPhotoPopped(true)
    setPhotoBurst((t) => t + 1)
    addTimer(() => {
      setPhotoPopped(false)
      photoFuseRef.current = false
    }, 680)
  }, [addTimer, isLast])

  // NEXT FUNNY MOMENT → slide away current moment, reveal the next
  const handleNext = useCallback(() => {
    if (nextFuseRef.current || isLast) return
    nextFuseRef.current = true
    setIsLeaving(true)
    setEmojiBurstKey((k) => k + 1)
    addTimer(() => {
      setIsLeaving(false)
      nextFuseRef.current = false
      setSlotIndex((i) => i + 1)
    }, 440)
  }, [addTimer, isLast])

  // LET'S KEEP GOING → after moment 5, continue to the next page
  const handleFinish = useCallback(() => {
    if (finishFuseRef.current) return
    finishFuseRef.current = true
    setEmojiBurstKey((k) => k + 1)
    setLeavingPage(true)
    addTimer(() => onComplete(), 750)
  }, [addTimer, onComplete])

  if (!moment) return null

  return (
    <div
      className={`funny-page${started ? ' started' : ''}${
        leavingPage ? ' leaving' : ''
      }`}
    >
      <div className="funny-bg" aria-hidden="true" />
      <div className="page-balloon-atmosphere" aria-hidden="true">
        <FloatingBalloons count={8} />
      </div>
      <div className="funny-glow" aria-hidden="true" />
      <div className="funny-drift" aria-hidden="true">
        <span className="funny-drift-emoji fd-1">🎈</span>
        <span className="funny-drift-emoji fd-2">😂</span>
        <span className="funny-drift-emoji fd-3">🤭</span>
        <span className="funny-drift-emoji fd-4">💛</span>
        <span className="funny-drift-emoji fd-5">✨</span>
        <span className="funny-drift-emoji fd-6">😭</span>
        <span className="funny-drift-emoji fd-7">🔥</span>
      </div>
      <div className="funny-particles-layer">
        <AmbientParticles count={16} />
      </div>

      {/* ================= STEP 1 — PLAYFUL INTRO ================= */}
      {!started && (
        <div className={`funny-intro${introLeaving ? ' is-leaving' : ''}`}>
          <div className="funny-intro-inner">
            <div className="funny-intro-emblem" aria-hidden="true">
              <span className="funny-intro-emoji">😂</span>
              <span className="funny-intro-spark">✨</span>
            </div>

            <h2 className="funny-intro-kicker">Okay… enough emotional moments! 😂❤️</h2>
            <h3 className="funny-intro-title">
              Now let's remember some of the moments that still make me laugh…
              🤭🤣
            </h3>

            <div className="funny-intro-btn-wrap">
              <button
                className={`funny-start-btn${btnShaking ? ' is-shaking' : ''}`}
                onClick={handleStart}
              >
                <span className="funny-start-label">SHOW ME THE CHAOS 😂🔥</span>
              </button>
              {startBurst > 0 && (
                <>
                  <ConfettiBurst trigger={startBurst} />
                  <CelebratoryFlash trigger={startBurst} />
                  <EmojiBurst trigger={startBurst} className="funny-emoji-burst funny-burst-start" />
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2 — FUNNY MOMENTS SCRAPBOOK ================= */}
      {started && (
        <section className="funny-stage">
          <div className="funny-album">
            <span className="funny-corner fc-tl" aria-hidden="true">😂</span>
            <span className="funny-corner fc-tr" aria-hidden="true">🤭</span>
            <span className="funny-corner fc-bl" aria-hidden="true">✨</span>
            <span className="funny-corner fc-br" aria-hidden="true">🔥</span>
            <span className="funny-float-emoji fe-1" aria-hidden="true">😂</span>
            <span className="funny-float-emoji fe-2" aria-hidden="true">💛</span>
            <span className="funny-float-emoji fe-3" aria-hidden="true">🤭</span>

            <div className="funny-sheet">
              <header className="funny-head">
                <div className="funny-title">
                  <span className="funny-title-label">FUNNY MOMENT</span>
                  <span className="funny-title-num">#{pad(slotIndex + 1)}</span>
                  <span className="funny-title-emoji">😂</span>
                </div>
                <div className="funny-counter">
                  {pad(slotIndex + 1)} / {pad(MOMENTS.length)}
                </div>
              </header>

              <div className="funny-stage-inner">
                <div
                  key={slotIndex}
                  className={`funny-slot${isLeaving ? ' leaving' : ''}`}
                >
                  <div
                    className={`polaroid${photoPopped ? ' is-popped' : ''} mom-${moment.theme}`}
                    style={{ ['--rot' as string]: ROTATIONS[slotIndex] }}
                    onClick={handleCardTap}
                    role={isLast ? undefined : 'button'}
                    tabIndex={isLast ? undefined : 0}
                    aria-label={isLast ? undefined : 'Funny moment card'}
                  >
                    <span className="polaroid-tape" aria-hidden="true" />
                    <span className="polaroid-heart ph-a" aria-hidden="true">😂</span>
                    <span className="polaroid-heart ph-b" aria-hidden="true">🤭</span>
                    <span className="polaroid-heart ph-c" aria-hidden="true">❤️</span>

                    <span className="mom-kicker">✨ {moment.kicker}</span>
                    <h3 className="mom-title">{moment.title}</h3>

                    <MomentDeco theme={moment.theme} />

                    <div className="mom-body">
                      {moment.lines.map((line, i) => (
                        <p className="mom-line" key={i}>
                          {line}
                        </p>
                      ))}
                    </div>

                    <div className="mom-note">{moment.note}</div>

                    {photoPopped && <SparkleBurst trigger={photoBurst} />}
                  </div>
                </div>
                <EmojiBurst trigger={emojiBurstKey} />
              </div>

              <div className="funny-controls">
                {!isLast ? (
                  <button className="funny-next-btn" onClick={handleNext}>
                    NEXT FUNNY MOMENT 😂 →
                  </button>
                ) : (
                  <button className="funny-go-btn" onClick={handleFinish}>
                    LET'S KEEP GOING → ✨
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default FunnyMoments