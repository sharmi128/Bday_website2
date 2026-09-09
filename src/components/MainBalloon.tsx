import { useCallback, useEffect, useRef, useState } from 'react'

type FeedbackState =
  | { kind: 'idle' }
  | { kind: 'hover' }
  | { kind: 'touch' }
  | { kind: 'shaking'; level: number }

interface MainBalloonProps {
  onPop: () => void
}

function MainBalloon({ onPop }: MainBalloonProps) {
  const [feedback, setFeedback] = useState<FeedbackState>({ kind: 'idle' })
  const timeoutsRef = useRef<number[]>([])
  const fuseRef = useRef(false)

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  const schedule = useCallback((fn: () => void, ms: number) => {
    timeoutsRef.current.push(window.setTimeout(fn, ms))
  }, [])

  const handlePress = useCallback(() => {
    if (fuseRef.current) return
    fuseRef.current = true

    setFeedback({ kind: 'shaking', level: 1 })

    schedule(() => setFeedback({ kind: 'shaking', level: 2 }), 240)
    schedule(() => setFeedback({ kind: 'shaking', level: 3 }), 500)

    schedule(() => onPop(), 850)
  }, [onPop, schedule])

  const handleMouseEnter = useCallback(() => {
    setFeedback((prev) =>
      prev.kind === 'idle' ? { kind: 'hover' } : prev,
    )
  }, [])

  const handleMouseLeave = useCallback(() => {
    setFeedback((prev) => (prev.kind === 'hover' ? { kind: 'idle' } : prev))
  }, [])

  const handleTouchStart = useCallback(() => {
    setFeedback((prev) =>
      prev.kind === 'idle' ? { kind: 'touch' } : prev,
    )
  }, [])

  const className =
    feedback.kind === 'shaking'
      ? `main-balloon balloon-shake balloon-shake-${feedback.level}`
      : 'main-balloon'

  return (
    <div
      className={`balloon-hitbox ${feedback.kind === 'hover' ? 'is-hovered' : ''} ${
        feedback.kind === 'touch' ? 'is-touched' : ''
      }`}
      onClick={handlePress}
      onPointerDown={handleTouchStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label="Touch the birthday balloon to begin"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handlePress()
        }
      }}
    >
      <div className={className}>
        <div className="balloon-glow" />
        <svg viewBox="0 0 240 330" className="balloon-svg" role="presentation">
          <defs>
            <radialGradient id="balloonBody" cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#ff9db0" />
              <stop offset="30%" stopColor="#ff6b8b" />
              <stop offset="70%" stopColor="#e0436a" />
              <stop offset="100%" stopColor="#c92f56" />
            </radialGradient>
            <radialGradient id="balloonHighlight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <linearGradient id="stringGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f5f5f5" />
              <stop offset="50%" stopColor="#c9c9c9" />
              <stop offset="100%" stopColor="#f5f5f5" />
            </linearGradient>
          </defs>

          <ellipse
            cx="120"
            cy="120"
            rx="110"
            ry="115"
            fill="url(#balloonBody)"
          />

          <ellipse cx="84" cy="84" rx="34" ry="42" fill="url(#balloonHighlight)" opacity="0.55" />
          <ellipse cx="60" cy="70" rx="12" ry="18" fill="rgba(255,255,255,0.9)" opacity="0.8" />

          <path d="M120 232 L134 258 L120 268 L106 258 Z" fill="url(#balloonBody)" />

          <path
            d="M120 268 C120 268 114 296 120 320"
            stroke="#d8d8d8"
            strokeWidth="2.5"
            fill="none"
            />
          <ellipse cx="184" cy="150" rx="8" ry="5" fill="rgba(120,220,255,0.2)" />
        </svg>
        <div className="balloon-sheen" />
      </div>
    </div>
  )
}

export default MainBalloon