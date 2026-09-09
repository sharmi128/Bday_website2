import { useMemo } from 'react'

interface Particle {
  id: number
  left: number
  top: number
  size: number
  delay: number
  duration: number
  drift: number
}

interface AmbientParticlesProps {
  count?: number
}

function AmbientParticles({ count = 22 }: AmbientParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 6 + 3,
      delay: Math.random() * 8,
      duration: Math.random() * 10 + 8,
      drift: (Math.random() * 60 + 30) * (Math.random() > 0.5 ? 1 : -1),
    }))
  }, [count])

  return (
    <div className="ambient-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="ambient-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}

export default AmbientParticles