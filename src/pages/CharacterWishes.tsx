import { useCallback, useEffect, useRef, useState } from 'react'
import ConfettiBurst from '../components/effects/ConfettiBurst'
import SparkleBurst from '../components/effects/SparkleBurst'
import FloatingBalloons from '../components/effects/FloatingBalloons'
import './CharacterWishes.css'

interface WishesCharacter {
  id: string
  image: string
  greeting: string
  message: string
  emoji: string
}

/**
 * Editable list — the 9 birthday characters who each come forward to wish ME.
 * Reuses the exact existing character images from /public (no redraws).
 * Greeting shows the shared birthday line; message is a unique,
 * personality-flavoured wish. No character names are displayed on screen.
 */
const wishCharacters: WishesCharacter[] = [
  {
    id: 'spider',
    image: '/spider.jpg',
    greeting: 'Happy Birthday! 🎂✨',
    message: 'With great power comes great cake. Swing high and never stop chasing your dreams — you have a hero’s heart! ❤️',
    emoji: '🕷️',
  },
  {
    id: 'halk',
    image: '/halk.jpg',
    greeting: 'Happy Birthday! 💚✨',
    message: 'You are way stronger than you think. Smash every worry away — this year is all yours! ❤️',
    emoji: '💚',
  },
  {
    id: 'redtshirt',
    image: '/redtshirt.jpg',
    greeting: 'Happy Birthday! 🎂❤️',
    message: 'Keep smiling, keep shining — the whole world feels warmer because you are in it! ✨',
    emoji: '❤️',
  },
  {
    id: 'misa',
    image: '/misa.jpg',
    greeting: 'Happy Birthday! 🖤✨',
    message: 'Stay confident, stay unique, stay completely you. You were born to stand out — never blend in! ❤️',
    emoji: '🖤',
  },
  {
    id: 'steve',
    image: '/steve.jpg',
    greeting: 'Happy Birthday! 🎂🎉',
    message: 'Have the most amazing year ahead — full of joy, laughter, and unforgettable moments! ❤️',
    emoji: '🎉',
  },
  {
    id: 'eleven',
    image: '/eleven.jpg',
    greeting: 'Happy Birthday! ⚡🎂',
    message: 'You are so much stronger than you know. Keep believing in yourself — because I believe in you! ✨',
    emoji: '⚡',
  },
  {
    id: 'dustiben',
    image: '/dustiben.jpg',
    greeting: 'Happy Birthday! 🎮🎂',
    message: 'May this new year be your greatest adventure yet — full of wins, friends, and golden memories! ❤️',
    emoji: '🎮',
  },
  {
    id: 'max',
    image: '/max.jpg',
    greeting: 'Happy Birthday! 🎧🎂',
    message: 'You absolutely rock. Keep doing you, keep being kind, and make every single day count! ✨',
    emoji: '🎧',
  },
  {
    id: 'pokiee',
    image: '/pokiee.jpg',
    greeting: 'Happy Birthday! ⚡🎂💛',
    message: 'May every new day give you another reason to smile — because you deserve all the happiness! ❤️',
    emoji: '⚡',
  },
]

/** Friend positions (left%, top%) for the final celebration ring. */
const celebrateRing = [
  { left: 47, top: 4 },
  { left: 73, top: 10 },
  { left: 86, top: 34 },
  { left: 75, top: 62 },
  { left: 50, top: 76 },
  { left: 25, top: 62 },
  { left: 12, top: 36 },
  { left: 23, top: 10 },
  { left: 50, top: 40 },
]

// Timing (ms) for the cinematic per-character sequence
const SHOW_WISH_AT = 1000
const HOLD_MS = 4600
const EXIT_MS = 650

interface CharacterWishesProps {
  onComplete: () => void
}

function CharacterWishes({ onComplete }: CharacterWishesProps) {
  const [charIndex, setCharIndex] = useState(0)
  const [wishVisible, setWishVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [celebrating, setCelebrating] = useState(false)
  const [burstTrigger, setBurstTrigger] = useState(0)

  const timersRef = useRef<number[]>([])
  const lockedRef = useRef(false)
  const mountedRef = useRef(true)

  const isLast = charIndex >= wishCharacters.length - 1

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      timersRef.current.forEach((x) => window.clearTimeout(x))
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

  const startWish = useCallback(() => {
    setWishVisible(true)
  }, [])

  const advance = useCallback(() => {
    if (lockedRef.current) return
    lockedRef.current = true
    setExiting(true)

    addTimer(() => {
      setWishVisible(false)
      setExiting(false)
      if (isLast) {
        setCelebrating(true)
        setBurstTrigger((t) => t + 1)
        addTimer(() => setBurstTrigger((t) => t + 1), 900)
        addTimer(() => setBurstTrigger((t) => t + 1), 1800)
      } else {
        setCharIndex((i) => i + 1)
      }
      lockedRef.current = false
    }, EXIT_MS)
  }, [isLast, addTimer])

  // Per-character auto timeline
  useEffect(() => {
    if (celebrating) return
    setWishVisible(false)
    setExiting(false)
    lockedRef.current = false
    addTimer(startWish, SHOW_WISH_AT)
    addTimer(advance, SHOW_WISH_AT + HOLD_MS)
  }, [charIndex, celebrating, addTimer, startWish, advance])

  const handleFinish = useCallback(() => {
    if (lockedRef.current) return
    lockedRef.current = true
    onComplete()
  }, [onComplete])

  const char = wishCharacters[charIndex]

  return (
    <div className={`wishes-page${celebrating ? ' celebrating' : ''}`}>
      <div className="wishes-bg" aria-hidden="true" />
      <div className="page-balloon-atmosphere" aria-hidden="true">
        <FloatingBalloons count={7} />
      </div>
      <div className="wishes-film-vignette" aria-hidden="true" />

      {!celebrating && (
        <div className="wishes-scene" key={`scene-${charIndex}`}>
          {/* ── Progress dots ── */}
          <div className="wishes-progress" aria-hidden="true">
            {wishCharacters.map((c, i) => (
              <span
                key={c.id}
                className={`wishes-dot${i <= charIndex ? ' done' : ''}${i === charIndex ? ' current' : ''}`}
              />
            ))}
          </div>

          {/* ── ME photo — LEFT (fixed while characters change) ── */}
          <div className="wishes-me-wrap">
            <div className="wishes-me-card">
              <span className="w-me-corner wc-tl" aria-hidden="true">⭐</span>
              <span className="w-me-corner wc-tr" aria-hidden="true">✨</span>
              <span className="w-me-corner wc-bl" aria-hidden="true">✨</span>
              <span className="w-me-corner wc-br" aria-hidden="true">⭐</span>
              <img src="/me.jpg" alt="Celebrating" className="wishes-me-img" draggable={false} />
              <span className="wishes-me-glow" aria-hidden="true" />
            </div>
            <p className="wishes-me-tag">It’s all about ME today 💖</p>
          </div>

          {/* ── Wish box — CENTER (connects the two sides) ── */}
          <div
            className={`wishes-wish-box${wishVisible ? ' visible' : ''}${exiting ? ' exiting' : ''}`}
            onClick={advance}
            role="button"
            aria-label="Birthday wish — tap to continue"
          >
            <span className="wishes-box-heart" aria-hidden="true">💖</span>
            <span className="w-box-corner wc-tl" aria-hidden="true">✨</span>
            <span className="w-box-corner wc-tr" aria-hidden="true">✨</span>
            <span className="w-box-corner wc-bl" aria-hidden="true">✨</span>
            <span className="w-box-corner wc-br" aria-hidden="true">✨</span>

            <p className="wishes-box-deco" aria-hidden="true">{char.emoji}</p>
            <p className="wishes-box-greeting">{char.greeting}</p>
            <p className="wishes-box-message">{char.message}</p>

            {wishVisible && (
              <p className="wishes-box-prompt" aria-hidden="true">tap to continue ➜</p>
            )}
          </div>

          {/* ── Character — RIGHT (enters from the right) ── */}
          <div
            className={`wishes-char-stage${exiting ? ' exiting' : ''}`}
            onClick={advance}
            role="button"
            aria-label="Next character wish"
          >
            <div className="wishes-char-ground" aria-hidden="true" />
            <img
              src={char.image}
              alt=""
              className="wishes-char-img"
              draggable={false}
            />
            <span className="wishes-char-glow" aria-hidden="true" />
          </div>
        </div>
      )}

      {/* ═══════════ FINAL GROUP CELEBRATION ═══════════ */}
      {celebrating && (
        <div className="wishes-celebration">
          <div className="wishes-cele-confetti">
            <ConfettiBurst trigger={burstTrigger} />
            <SparkleBurst trigger={burstTrigger} />
          </div>
          <div className="wishes-cele-balloons">
            <FloatingBalloons count={10} />
          </div>

          <div className="wishes-cele-particles" aria-hidden="true">
            {Array.from({ length: 26 }, (_, i) => (
              <span
                key={i}
                className="wishes-cele-particle"
                style={{
                  left: `${(i * 43 + 7) % 100}%`,
                  top: `${(i * 31 + 13) % 95}%`,
                  width: `${(i % 4) + 2}px`,
                  height: `${(i % 4) + 2}px`,
                  animationDelay: `${(i * 0.4) % 6}s`,
                  animationDuration: `${(i % 4) + 3}s`,
                }}
              />
            ))}
          </div>

          <div className="wishes-cele-lights" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <span
                key={i}
                className="wishes-cele-light"
                style={{
                  left: `${2 + (i / 16) * 96}%`,
                  animationDelay: `${i * 0.22}s`,
                }}
              />
            ))}
          </div>

          <div className="wishes-cele-group" aria-hidden="true">
            <div className="wishes-cele-me-card">
              <img src="/me.jpg" alt="" className="wishes-cele-me-img" draggable={false} />
            </div>
            {wishCharacters.map((c, i) => (
              <img
                key={c.id}
                src={c.image}
                alt=""
                className="wishes-cele-friend"
                draggable={false}
                style={{ left: `${celebrateRing[i].left}%`, top: `${celebrateRing[i].top}%` }}
              />
            ))}
          </div>

          <div className="wishes-cele-content">
            <h2 className="wishes-cele-title">9 Wishes. One Special Birthday. ❤️🎂✨</h2>
            <p className="wishes-cele-sub">Happy Birthday! 🎉❤️</p>
            <button className="wishes-cele-btn" onClick={handleFinish}>
              CONTINUE ✨
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CharacterWishes
