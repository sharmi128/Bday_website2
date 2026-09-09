import { useMemo } from 'react'

interface Sparkle {
  id: number
  angle: number
  distance: number
  delay: number
  duration: number
  size: number
}

interface SparkleBurstProps {
  trigger: number
}

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function SparkleBurst({ trigger }: SparkleBurstProps) {
  const sparkles = useMemo<Sparkle[]>(() => {
    const rand = seededRandom(trigger * 7853 + 49297)
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      angle: rand() * 360,
      distance: rand() * 220 + 120,
      delay: rand() * 0.15,
      duration: rand() * 0.8 + 1,
      size: rand() * 8 + 5,
    }))
  }, [trigger])

  return (
    <div className="sparkle-burst" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={`${trigger}-${s.id}`}
          className="burst-sparkle"
          style={{
            ['--angle' as string]: `${s.angle}deg`,
            ['--distance' as string]: `${s.distance}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#ffd166" />
          </svg>
        </span>
      ))}
    </div>
  )
}

export default SparkleBurst