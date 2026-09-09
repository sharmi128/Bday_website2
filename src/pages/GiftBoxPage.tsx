import { useCallback, useEffect, useRef, useState } from 'react'
import SuperHero from '../components/SuperHero'
import ConfettiBurst from '../components/effects/ConfettiBurst'
import SparkleBurst from '../components/effects/SparkleBurst'
import FloatingBalloons from '../components/effects/FloatingBalloons'

interface GiftBoxPageProps {
  onComplete: () => void
}

type Phase =
  | 'intro'
  | 'ready'
  | 'opening'
  | 'celebration'
  | 'next-question'
  | 'transition'
  | 'done'

const TAMIL_WISH = 'இனிய பிறந்தநாள் நல்வாழ்த்துக்கள் நல்லவனே 🎈'

const FLOATIES = [
  { emoji: '🎈', left: 10, top: 20, delay: 0, duration: 7, sway: 14, roll: 18 },
  { emoji: '❤️', left: 22, top: 62, delay: 0.8, duration: 6.2, sway: -12, roll: -14 },
  { emoji: '✨', left: 36, top: 28, delay: 1.6, duration: 7.4, sway: 10, roll: 24 },
  { emoji: '🎉', left: 50, top: 68, delay: 0.4, duration: 6.6, sway: -16, roll: -20 },
  { emoji: '💖', left: 62, top: 24, delay: 2, duration: 7, sway: 12, roll: 16 },
  { emoji: '🎊', left: 74, top: 56, delay: 1.1, duration: 6.4, sway: -10, roll: -26 },
  { emoji: '🎈', left: 86, top: 28, delay: 0.2, duration: 7.2, sway: 16, roll: 20 },
  { emoji: '✨', left: 6, top: 50, delay: 2.4, duration: 6, sway: -12, roll: -16 },
  { emoji: '💛', left: 44, top: 10, delay: 1.3, duration: 7.6, sway: 8, roll: 22 },
  { emoji: '❤️', left: 90, top: 72, delay: 0.6, duration: 6.8, sway: -14, roll: -18 },
]

function GiftBoxPage({ onComplete }: GiftBoxPageProps) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [showHero, setShowHero] = useState(false)
  const [showGiftBox, setShowGiftBox] = useState(false)
  const [showFirstMessage, setShowFirstMessage] = useState(false)
  const [showTapHint, setShowTapHint] = useState(false)
  const [giftBoxShaking, setGiftBoxShaking] = useState(false)
  const [ribbonLoosening, setRibbonLoosening] = useState(false)
  const [boxOpening, setBoxOpening] = useState(false)
  const [goldenLight, setGoldenLight] = useState(false)
  const [burstTrigger, setBurstTrigger] = useState(0)
  const [showTamilWish, setShowTamilWish] = useState(false)
  const [showBalloons, setShowBalloons] = useState(false)
  const [showNextButton, setShowNextButton] = useState(false)
  const [heroExcited, setHeroExcited] = useState(false)
  const fuseRef = useRef(false)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const timers: number[] = []
    timers.push(window.setTimeout(() => setShowHero(true), 300))
    timers.push(window.setTimeout(() => setShowGiftBox(true), 800))
    timers.push(window.setTimeout(() => setShowFirstMessage(true), 1500))
    timers.push(window.setTimeout(() => setPhase('ready'), 2400))
    timers.push(window.setTimeout(() => setShowTapHint(true), 2600))
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [])

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  const schedule = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms))
  }, [])

  const handleOpenGift = useCallback(() => {
    if (fuseRef.current || phase !== 'ready') return
    fuseRef.current = true
    setPhase('opening')
    setGiftBoxShaking(true)
    setHeroExcited(true)
    setShowTapHint(false)

    schedule(() => {
      setGiftBoxShaking(false)
      setRibbonLoosening(true)
    }, 600)

    schedule(() => {
      setRibbonLoosening(false)
      setBoxOpening(true)
    }, 1500)

    schedule(() => {
      setGoldenLight(true)
      setBurstTrigger((n) => n + 1)
    }, 2300)

    schedule(() => {
      setShowTamilWish(true)
      setShowBalloons(true)
      setPhase('celebration')
    }, 2900)

    schedule(() => setPhase('next-question'), 8600)
    schedule(() => setShowNextButton(true), 9900)
  }, [phase, schedule])

  const handleNext = useCallback(() => {
    if (phase !== 'next-question') return
    setPhase('transition')
    schedule(() => {
      setPhase('done')
      onComplete()
    }, 1800)
  }, [phase, onComplete, schedule])

  const handleBoxKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleOpenGift()
      }
    },
    [handleOpenGift],
  )

  return (
    <div className="giftbox-scene">
      {/* Background layers */}
      <div className="giftbox-bg" />
      <div className="page-balloon-atmosphere" aria-hidden="true">
        <FloatingBalloons count={8} />
      </div>

      {/* City skyline */}
      <div className="giftbox-skyline" aria-hidden="true">
        <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="gb-skyline-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1235" />
              <stop offset="100%" stopColor="#060a1e" />
            </linearGradient>
          </defs>
          <g opacity="0.3">
            <rect x="20" y="100" width="45" height="200" fill="#080c20" />
            <rect x="80" y="60" width="55" height="240" fill="#0a1028" />
            <rect x="150" y="130" width="40" height="170" fill="#080c20" />
            <rect x="210" y="40" width="60" height="260" fill="#0c1438" />
            <rect x="290" y="110" width="35" height="190" fill="#090e24" />
            <rect x="340" y="70" width="50" height="230" fill="#0a1028" />
            <rect x="410" y="140" width="40" height="160" fill="#080c20" />
            <rect x="470" y="50" width="65" height="250" fill="#0c1438" />
            <rect x="555" y="90" width="45" height="210" fill="#090e24" />
            <rect x="620" y="30" width="55" height="270" fill="#0a1028" />
            <rect x="695" y="100" width="40" height="200" fill="#080c20" />
            <rect x="755" y="55" width="60" height="245" fill="#0c1438" />
            <rect x="835" y="120" width="35" height="180" fill="#090e24" />
            <rect x="890" y="45" width="50" height="255" fill="#0a1028" />
            <rect x="960" y="110" width="45" height="190" fill="#080c20" />
            <rect x="1020" y="65" width="55" height="235" fill="#0c1438" />
            <rect x="1095" y="85" width="40" height="215" fill="#090e24" />
            <rect x="1150" y="130" width="50" height="170" fill="#0a1028" />
          </g>
          <g opacity="0.2">
            {[80, 230, 410, 580, 760, 920, 1090].map((bx) =>
              [0, 1, 2, 3].map((row) =>
                [0, 1].map((col) => (
                  <rect
                    key={`w${bx}${row}${col}`}
                    x={bx + 10 + col * 22}
                    y={130 + row * 30}
                    width="6"
                    height="8"
                    fill="#ffd700"
                    rx="1"
                  />
                ))
              )
            )}
          </g>
        </svg>
      </div>

      {/* Web background pattern */}
      <div className="giftbox-web-bg" aria-hidden="true">
        <svg viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(
            (angle) => (
              <line
                key={`r${angle}`}
                x1="600"
                y1="450"
                x2={600 + Math.cos((angle * Math.PI) / 180) * 700}
                y2={450 + Math.sin((angle * Math.PI) / 180) * 700}
                stroke="rgba(255,50,50,0.03)"
                strokeWidth="0.8"
              />
            )
          )}
          {[100, 200, 320, 460, 620].map((r) => (
            <circle
              key={`c${r}`}
              cx="600"
              cy="450"
              r={r}
              fill="none"
              stroke="rgba(255,50,50,0.025)"
              strokeWidth="0.8"
            />
          ))}
        </svg>
      </div>

      {/* Ambient sparkles */}
      <div className="giftbox-sparkles" aria-hidden="true">
        {Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            className="gb-sparkle"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 85}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animationDelay: `${(i * 0.7) % 6}s`,
              animationDuration: `${(i % 4) + 3}s`,
            }}
          />
        ))}
      </div>

      {/* Red accent glow */}
      <div className="giftbox-red-glow" aria-hidden="true" />
      {/* Blue accent glow */}
      <div className="giftbox-blue-glow" aria-hidden="true" />

      {/* Content layer */}
      <div className={`giftbox-content${phase === 'transition' ? ' fade-out' : ''}`}>
        {/* Hero character */}
        <div className={`giftbox-hero-wrap${showHero ? ' visible' : ''}${heroExcited ? ' excited' : ''}`}>
          <SuperHero className="giftbox-hero-svg" />
        </div>

        {/* First message */}
        <div className={`giftbox-message giftbox-msg-1${showFirstMessage ? ' visible' : ''}`}>
          Hey... I brought something special for you. 🎁👀
        </div>

        {/* Tap hint */}
        {showTapHint && phase === 'ready' && (
          <p className="giftbox-tap-hint">
            Tap the gift box to open your wish <span className="hint-emoji">🎁✨</span>
          </p>
        )}

        {/* Gift box container */}
        <div className={`giftbox-stage${showGiftBox ? ' visible' : ''}`}>
          <div
            className={`giftbox-box ${
              giftBoxShaking ? 'shaking' : ''
            } ${ribbonLoosening ? 'ribbon-loose' : ''} ${
              boxOpening ? 'opening' : ''
            }`}
            role="button"
            tabIndex={0}
            aria-label="Tap the birthday gift box to reveal your wish"
            onClick={handleOpenGift}
            onKeyDown={handleBoxKeyDown}
          >
            {/* Box glow */}
            <div className={`giftbox-glow${goldenLight ? ' active' : ''}`} />

            {/* Sparkles around box */}
            <div className="giftbox-box-sparkles" aria-hidden="true">
              <SparkleBurst trigger={burstTrigger} />
            </div>

            {/* Gift box SVG */}
            <svg viewBox="0 0 200 180" className="giftbox-svg">
              <defs>
                <linearGradient id="gb-box-main" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a38a0" />
                  <stop offset="100%" stopColor="#0c2060" />
                </linearGradient>
                <linearGradient id="gb-box-side" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#102878" />
                  <stop offset="100%" stopColor="#0a1c58" />
                </linearGradient>
                <linearGradient id="gb-ribbon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d02040" />
                  <stop offset="100%" stopColor="#a01830" />
                </linearGradient>
                <linearGradient id="gb-lid-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e40b0" />
                  <stop offset="100%" stopColor="#1530a0" />
                </linearGradient>
                <filter id="gb-box-shadow">
                  <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Box body */}
              <rect x="25" y="70" width="150" height="100" rx="4" fill="url(#gb-box-main)" filter="url(#gb-box-shadow)" />

              {/* Box side highlight */}
              <rect x="25" y="70" width="25" height="100" rx="4" fill="url(#gb-box-side)" opacity="0.5" />

              {/* Vertical ribbon */}
              <rect x="88" y="70" width="24" height="100" fill="url(#gb-ribbon)" />
              <rect x="88" y="70" width="24" height="100" fill="rgba(255,255,255,0.1)" />

              {/* Horizontal ribbon */}
              <rect x="25" y="108" width="150" height="24" fill="url(#gb-ribbon)" />
              <rect x="25" y="108" width="150" height="24" fill="rgba(255,255,255,0.1)" />

              {/* Ribbon center knot */}
              <circle cx="100" cy="120" r="14" fill="#d02040" />
              <circle cx="100" cy="120" r="14" fill="rgba(255,255,255,0.15)" />
              <circle cx="100" cy="120" r="8" fill="#c01838" />

              {/* Bow loops */}
              <ellipse cx="82" cy="108" rx="18" ry="12" fill="#d02040" transform="rotate(-15 82 108)" />
              <ellipse cx="82" cy="108" rx="18" ry="12" fill="rgba(255,255,255,0.12)" transform="rotate(-15 82 108)" />
              <ellipse cx="118" cy="108" rx="18" ry="12" fill="#d02040" transform="rotate(15 118 108)" />
              <ellipse cx="118" cy="108" rx="18" ry="12" fill="rgba(255,255,255,0.12)" transform="rotate(15 118 108)" />

              {/* Bow tails */}
              <path d="M82 120 Q70 140 55 138" stroke="#d02040" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M118 120 Q130 140 145 138" stroke="#d02040" strokeWidth="6" fill="none" strokeLinecap="round" />

              {/* Bow center dot */}
              <circle cx="100" cy="108" r="6" fill="#ff5070" />

              {/* Box lid */}
              <g className="giftbox-lid">
                <rect x="18" y="55" width="164" height="20" rx="4" fill="url(#gb-lid-top)" filter="url(#gb-box-shadow)" />
                <rect x="88" y="55" width="24" height="20" fill="url(#gb-ribbon)" />
                <rect x="88" y="55" width="24" height="20" fill="rgba(255,255,255,0.1)" />
              </g>

              {/* Gold trim accents */}
              <line x1="25" y1="70" x2="175" y2="70" stroke="#ffd700" strokeWidth="1" opacity="0.4" />
              <line x1="18" y1="55" x2="182" y2="55" stroke="#ffd700" strokeWidth="1" opacity="0.4" />
              <line x1="18" y1="75" x2="182" y2="75" stroke="#ffd700" strokeWidth="1" opacity="0.4" />
            </svg>

            {/* Golden light rays */}
            <div className={`giftbox-light-rays${goldenLight ? ' active' : ''}`} aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="light-ray"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating balloons */}
          {showBalloons && (
            <div className="giftbox-balloons" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="giftbox-balloon"
                  style={{
                    left: `${15 + i * 10}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${3 + (i % 3)}s`,
                  }}
                >
                  <svg viewBox="0 0 50 70" className="gb-balloon-svg">
                    <defs>
                      <radialGradient id={`balloon-${i}`} cx="40%" cy="30%">
                        <stop offset="0%" stopColor={
                          i % 3 === 0 ? '#ff6b8b' : i % 3 === 1 ? '#5bc8ff' : '#ffd700'
                        } />
                        <stop offset="100%" stopColor={
                          i % 3 === 0 ? '#d04060' : i % 3 === 1 ? '#3090d0' : '#c0a030'
                        } />
                      </radialGradient>
                    </defs>
                    <ellipse cx="25" cy="28" rx="22" ry="26" fill={`url(#balloon-${i})`} />
                    <ellipse cx="18" cy="20" rx="5" ry="8" fill="rgba(255,255,255,0.3)" transform="rotate(-20 18 20)" />
                    <polygon points="25,54 22,60 28,60" fill={
                      i % 3 === 0 ? '#d04060' : i % 3 === 1 ? '#3090d0' : '#c0a030'
                    } />
                    <line x1="25" y1="60" x2="25" y2="75" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                  </svg>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Celebration text */}
        {phase === 'next-question' && (
          <div className="giftbox-celebration-text">
            <p className="giftbox-celebrate-msg">
              Your birthday celebration is about to begin... 🎂✨
            </p>
          </div>
        )}

        {/* Next question */}
        {phase === 'next-question' && showNextButton && (
          <>
            <p className="giftbox-next-question">
              Are you ready for your next surprise? 👀❤️
            </p>
            <button className="giftbox-next-btn" onClick={handleNext}>
              LET'S CELEBRATE! 🎉
            </button>
          </>
        )}

        {/* Confetti */}
        {phase !== 'intro' && phase !== 'ready' && phase !== 'done' && (
          <div className="giftbox-confetti-layer">
            <ConfettiBurst trigger={burstTrigger} />
          </div>
        )}
      </div>

      {/* Tamil birthday wish overlay */}
      <div
        className={`tamil-wish-overlay${showTamilWish ? ' visible' : ''}${phase === 'transition' ? ' leaving' : ''}`}
        aria-hidden="true"
      >
        <div className="tamil-wish-glow" />
        {FLOATIES.map((f) => (
          <span
            key={`${f.emoji}-${f.left}-${f.top}`}
            className="tamil-wish-floaty"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
              ['--sway' as string]: `${f.sway}px`,
              ['--roll' as string]: `${f.roll}deg`,
            }}
          >
            {f.emoji}
          </span>
        ))}
        <div className="tamil-wish-card">
          <p className="tamil-wish-title">{TAMIL_WISH}</p>
        </div>
      </div>

      {/* Placeholder screen after transition */}
      {phase === 'done' && (
        <div className="page4-placeholder">
          <div className="page4-glow" />
          <div className="page4-content">
            <div className="page4-sparkle page4-sparkle-a" aria-hidden="true">🎂</div>
            <div className="page4-sparkle page4-sparkle-b" aria-hidden="true">✨</div>
            <div className="page4-sparkle page4-sparkle-c" aria-hidden="true">👀</div>
            <h2 className="page4-title">Something delicious is waiting for you... 🎂👀✨</h2>
            <p className="page4-sub">Stay tuned for something magical!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default GiftBoxPage