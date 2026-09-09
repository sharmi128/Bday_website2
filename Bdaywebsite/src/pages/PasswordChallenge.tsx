import { useCallback, useEffect, useRef, useState } from 'react'
import SuperHero from '../components/SuperHero'
import RedHairHero from '../components/RedHairHero'
import ConfettiBurst from '../components/effects/ConfettiBurst'
import SparkleBurst from '../components/effects/SparkleBurst'
import FloatingBalloons from '../components/effects/FloatingBalloons'

interface PasswordChallengeProps {
  onComplete: () => void
}

type Phase = 'reveal' | 'challenge' | 'success' | 'celebration' | 'done'

function PasswordChallenge({ onComplete }: PasswordChallengeProps) {
  const [phase, setPhase] = useState<Phase>('reveal')
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showHero, setShowHero] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [showClue1, setShowClue1] = useState(false)
  const [showClue2, setShowClue2] = useState(false)
  const [showClue3, setShowClue3] = useState(false)
  const [burstTrigger, setBurstTrigger] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const fuseRef = useRef(false)

  useEffect(() => {
    const timers: number[] = []
    timers.push(window.setTimeout(() => setShowHero(true), 400))
    timers.push(window.setTimeout(() => setShowInput(true), 3400))
    timers.push(window.setTimeout(() => setShowClue1(true), 4200))
    timers.push(window.setTimeout(() => setShowClue2(true), 4800))
    timers.push(window.setTimeout(() => setShowClue3(true), 5400))
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [])

  useEffect(() => {
    if (showInput && phase === 'reveal') {
      const t = window.setTimeout(() => {
        inputRef.current?.focus()
      }, 600)
      return () => window.clearTimeout(t)
    }
  }, [showInput, phase])

  const handleSubmit = useCallback(() => {
    if (phase !== 'reveal' || fuseRef.current) return
    const value = input.trim()

    if (value !== '01December') {
      setError(true)
      window.setTimeout(() => setError(false), 600)
      return
    }

    fuseRef.current = true
    setSuccess(true)
    setPhase('success')
    setBurstTrigger((t) => t + 1)

    window.setTimeout(() => setPhase('celebration'), 2500)
    window.setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 5200)
  }, [input, phase, onComplete])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit],
  )

  const wrongAnswer = phase === 'reveal' && error

  return (
    <div className="challenge-scene">
      {/* Background layers */}
      <div className="challenge-bg" />
      <div className="page-balloon-atmosphere" aria-hidden="true">
        <FloatingBalloons count={8} />
      </div>

      {/* City skyline silhouette */}
      <div className="challenge-skyline" aria-hidden="true">
        <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="skyline-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d1130" />
              <stop offset="100%" stopColor="#080c20" />
            </linearGradient>
          </defs>
          {/* Far buildings */}
          <g opacity="0.25">
            <rect x="20" y="100" width="45" height="200" fill="#0a0e28" />
            <rect x="80" y="60" width="55" height="240" fill="#0c1030" />
            <rect x="150" y="130" width="40" height="170" fill="#0a0e28" />
            <rect x="210" y="40" width="60" height="260" fill="#0d1235" />
            <rect x="290" y="110" width="35" height="190" fill="#0b0f2a" />
            <rect x="340" y="70" width="50" height="230" fill="#0c1030" />
            <rect x="410" y="140" width="40" height="160" fill="#0a0e28" />
            <rect x="470" y="50" width="65" height="250" fill="#0d1235" />
            <rect x="555" y="90" width="45" height="210" fill="#0b0f2a" />
            <rect x="620" y="30" width="55" height="270" fill="#0c1030" />
            <rect x="695" y="100" width="40" height="200" fill="#0a0e28" />
            <rect x="755" y="55" width="60" height="245" fill="#0d1235" />
            <rect x="835" y="120" width="35" height="180" fill="#0b0f2a" />
            <rect x="890" y="45" width="50" height="255" fill="#0c1030" />
            <rect x="960" y="110" width="45" height="190" fill="#0a0e28" />
            <rect x="1020" y="65" width="55" height="235" fill="#0d1235" />
            <rect x="1095" y="85" width="40" height="215" fill="#0b0f2a" />
            <rect x="1150" y="130" width="50" height="170" fill="#0c1030" />
          </g>
          {/* Near buildings (darker, taller) */}
          <g opacity="0.4">
            <rect x="0" y="160" width="65" height="140" fill="#080b1e" />
            <rect x="75" y="120" width="70" height="180" fill="#090d22" />
            <rect x="165" y="170" width="50" height="130" fill="#080b1e" />
            <rect x="235" y="100" width="80" height="200" fill="#0a0e25" />
            <rect x="340" y="150" width="55" height="150" fill="#080b1e" />
            <rect x="415" y="110" width="65" height="190" fill="#090d22" />
            <rect x="505" y="160" width="50" height="140" fill="#080b1e" />
            <rect x="575" y="80" width="75" height="220" fill="#0a0e25" />
            <rect x="675" y="140" width="55" height="160" fill="#080b1e" />
            <rect x="755" y="95" width="70" height="205" fill="#090d22" />
            <rect x="850" y="155" width="50" height="145" fill="#080b1e" />
            <rect x="920" y="105" width="65" height="195" fill="#0a0e25" />
            <rect x="1010" y="145" width="55" height="155" fill="#080b1e" />
            <rect x="1085" y="115" width="60" height="185" fill="#090d22" />
            <rect x="1160" y="165" width="40" height="135" fill="#080b1e" />
          </g>
          {/* Window lights */}
          <g opacity="0.15">
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
      <div className="challenge-web-bg" aria-hidden="true">
        <svg viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
          {/* Central radial web */}
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(
            (angle) => (
              <line
                key={`r${angle}`}
                x1="600"
                y1="450"
                x2={600 + Math.cos((angle * Math.PI) / 180) * 700}
                y2={450 + Math.sin((angle * Math.PI) / 180) * 700}
                stroke="rgba(255,50,50,0.04)"
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
              stroke="rgba(255,50,50,0.035)"
              strokeWidth="0.8"
            />
          ))}
          {/* Corner web — bottom-left */}
          {[0, 30, 60, 90, 120, 150, 180].map((angle) => (
            <line
              key={`bl${angle}`}
              x1="0"
              y1="900"
              x2={Math.cos(((angle - 45) * Math.PI) / 180) * 500}
              y2={900 - Math.sin(((angle - 45) * Math.PI) / 180) * 500}
              stroke="rgba(200,30,50,0.035)"
              strokeWidth="0.8"
            />
          ))}
          {[100, 220, 360].map((r) => (
            <circle
              key={`blc${r}`}
              cx="0"
              cy="900"
              r={r}
              fill="none"
              stroke="rgba(200,30,50,0.03)"
              strokeWidth="0.8"
            />
          ))}
          {/* Corner web — top-right */}
          {[0, 30, 60, 90, 120, 150, 180].map((angle) => (
            <line
              key={`tr${angle}`}
              x1="1200"
              y1="0"
              x2={1200 - Math.cos(((angle - 45) * Math.PI) / 180) * 450}
              y2={Math.sin(((angle - 45) * Math.PI) / 180) * 450}
              stroke="rgba(200,30,50,0.035)"
              strokeWidth="0.8"
            />
          ))}
          {[90, 200, 330].map((r) => (
            <circle
              key={`trc${r}`}
              cx="1200"
              cy="0"
              r={r}
              fill="none"
              stroke="rgba(200,30,50,0.03)"
              strokeWidth="0.8"
            />
          ))}
          {/* Corner web — top-left */}
          {[0, 30, 60, 90, 120, 150, 180].map((angle) => (
            <line
              key={`tl${angle}`}
              x1="0"
              y1="0"
              x2={Math.cos(((angle + 45) * Math.PI) / 180) * 400}
              y2={Math.sin(((angle + 45) * Math.PI) / 180) * 400}
              stroke="rgba(30,50,200,0.025)"
              strokeWidth="0.7"
            />
          ))}
          {[80, 180, 300].map((r) => (
            <circle
              key={`tlc${r}`}
              cx="0"
              cy="0"
              r={r}
              fill="none"
              stroke="rgba(30,50,200,0.02)"
              strokeWidth="0.7"
            />
          ))}
          {/* Corner web — bottom-right */}
          {[0, 30, 60, 90, 120, 150, 180].map((angle) => (
            <line
              key={`br${angle}`}
              x1="1200"
              y1="900"
              x2={1200 + Math.cos(((angle + 135) * Math.PI) / 180) * 400}
              y2={900 + Math.sin(((angle + 135) * Math.PI) / 180) * 400}
              stroke="rgba(30,50,200,0.025)"
              strokeWidth="0.7"
            />
          ))}
          {[80, 180, 300].map((r) => (
            <circle
              key={`brc${r}`}
              cx="1200"
              cy="900"
              r={r}
              fill="none"
              stroke="rgba(30,50,200,0.02)"
              strokeWidth="0.7"
            />
          ))}
        </svg>
      </div>

      {/* Floating web particles (small web-shaped dots) */}
      <div className="challenge-sparkles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            className="ch-sparkle"
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

      {/* Red accent glow — top-right cinematic light */}
      <div className="challenge-red-glow" aria-hidden="true" />

      {/* Blue accent glow — bottom-left */}
      <div className="challenge-blue-glow" aria-hidden="true" />

      {/* Content */}
      <div className={`challenge-content${phase === 'done' ? ' fade-out' : ''}`}>
        {/* Hero character */}
        <div className={`challenge-hero-wrap${showHero ? ' visible' : ''}`}>
          <SuperHero className="challenge-hero-svg" />
        </div>

        {/* Text reveal */}
        <div className={`challenge-text-block${showHero ? ' visible' : ''}`}>
          <p className="challenge-line ch-line-1">
            Do you want to enter the website? 🕷️
          </p>
          <p className={`challenge-line ch-line-2${showHero ? ' visible' : ''}`}>
            To unlock this special website, you need a password!
          </p>
          <p className={`challenge-line ch-line-3${showInput ? ' visible' : ''}`}>
            You have to guess the password yourself! 😉
          </p>
        </div>

        {/* Clue cards */}
        <div className={`challenge-clues${showClue1 ? ' visible' : ''}`}>
          <div className={`clue-card clue-1${showClue1 ? ' visible' : ''}`}>
            <span className="clue-icon">❤️</span>
            <span className="clue-label">Clue 1</span>
            <span className="clue-text">Our friendship starting day</span>
          </div>
          <div className={`clue-card clue-2${showClue2 ? ' visible' : ''}`}>
            <span className="clue-icon">📅</span>
            <span className="clue-label">Clue 2</span>
            <span className="clue-text">Our first special date</span>
          </div>
          <div className={`clue-card clue-3${showClue3 ? ' visible' : ''}`}>
            <span className="clue-icon">✨</span>
            <span className="clue-label">Clue 3</span>
            <span className="clue-text">The month of our special memory</span>
          </div>
        </div>

        {/* Password input */}
        {phase === 'reveal' && (
          <div
            className={`challenge-input-wrap${showInput ? ' visible' : ''}${
              wrongAnswer ? ' shake-error' : ''
            }${success ? ' glow-success' : ''}`}
          >
            <div className="input-icon-lock">🔐</div>
            <input
              ref={inputRef}
              type="text"
              className={`challenge-input${wrongAnswer ? ' input-error' : ''}${
                success ? ' input-success' : ''
              }`}
              placeholder="Type the secret password..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck={false}
              disabled={success}
            />
            <button
              className="challenge-submit"
              onClick={handleSubmit}
              disabled={success}
              aria-label="Submit password"
            >
              Unlock 🔓
            </button>
          </div>
        )}

        {/* Error message */}
        {wrongAnswer && (
          <p className="challenge-error">Oops! That's not correct 😜 Try again!</p>
        )}

        {/* Success celebration */}
        {(phase === 'success' || phase === 'celebration') && (
          <div className="challenge-success-scene">
            <div className="success-character-wrap">
              <RedHairHero className="success-hero-svg" />
            </div>
            <p className="success-text">WOW! You got it correct! 🎉</p>

            {/* Celebration sparkles */}
            <div className="success-sparkles" aria-hidden="true">
              <SparkleBurst trigger={burstTrigger} />
            </div>
          </div>
        )}

        {/* Confetti overlay */}
        {phase !== 'reveal' && phase !== 'done' && (
          <div className="challenge-confetti-layer">
            <ConfettiBurst trigger={burstTrigger} />
          </div>
        )}
      </div>
    </div>
  )
}

export default PasswordChallenge
