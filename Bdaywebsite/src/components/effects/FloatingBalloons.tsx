import { useMemo, type CSSProperties } from 'react'

interface DecorativeBalloon {
  id: number
  side: 'left' | 'right'
  color: string
  left: number
  top: number
  size: number
  depth: number
  drift: number
  duration: number
  delay: number
  opacity: number
}

interface FloatingBalloonsProps {
  count?: number
}

const PALETTE = [
  { body: '#ff6b8b', light: '#ff9db0', dark: '#e0436a' },
  { body: '#ffb84d', light: '#ffcf7f', dark: '#e09b2f' },
  { body: '#5bc8ff', light: '#8fd8ff', dark: '#35a9e8' },
  { body: '#a88bff', light: '#c3adff', dark: '#8a6beb' },
  { body: '#ff7bc4', light: '#ffa1d6', dark: '#eb5aa8' },
  { body: '#7ce8a0', light: '#a3f0bd', dark: '#54c97e' },
]

function FloatingBalloons({ count = 9 }: FloatingBalloonsProps) {
  const balloons = useMemo<DecorativeBalloon[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const color = PALETTE[i % PALETTE.length]
      const side: 'left' | 'right' = i % 2 === 0 ? 'left' : 'right'
      return {
        id: i,
        side,
        color: color.body,
        left: Math.random() * 40 + (side === 'left' ? 2 : 55),
        top: Math.random() * 60 + 8,
        size: Math.random() * 22 + 18,
        depth: Math.random() * 0.5 + 0.7,
        drift: (Math.random() * 60 + 20) * (Math.random() > 0.5 ? 1 : -1),
        duration: Math.random() * 10 + 9,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.3 + 0.5,
      }
    })
  }, [count])

  return (
    <div className="decorative-balloons" aria-hidden="true">
      {balloons.map((b) => {
        const style: CSSProperties = {
          left: `${b.left}%`,
          top: `${b.top}%`,
          width: `${b.size}px`,
          animationDuration: `${b.duration}s`,
          animationDelay: `${b.delay}s`,
          opacity: b.opacity,
          ['--drift' as string]: `${b.drift}px`,
        }
        return (
          <div key={b.id} className={`mini-balloon ${b.side}`} style={style}>
            <svg viewBox="0 0 80 110" className="mini-balloon-svg">
              <ellipse cx="40" cy="42" rx="36" ry="42" fill={b.color} />
              <ellipse cx="24" cy="30" rx="14" ry="10" fill="rgba(255,255,255,0.35)" />
              <path d="M40 82 L52 92 L38 102 L40 108" fill={b.color} />
            </svg>
          </div>
        )
      })}
    </div>
  )
}

export default FloatingBalloons