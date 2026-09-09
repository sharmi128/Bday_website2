import { useMemo } from 'react'

interface Star {
  id: number
  left: number
  top: number
  size: number
  delay: number
  duration: number
  opacity: number
}

interface StarfieldProps {
  count?: number
}

function Starfield({ count = 26 }: StarfieldProps) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
      opacity: Math.random() * 0.5 + 0.3,
    }))
  }, [count])

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}

export default Starfield