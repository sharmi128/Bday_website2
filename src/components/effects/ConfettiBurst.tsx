import { useMemo } from 'react'

interface ConfettiPiece {
  id: number
  left: number
  color: string
  size: number
  angle: number
  distance: number
  delay: number
  rotate: number
  duration: number
  kind: 'rect' | 'dot'
}

const COLORS = [
  '#ff6b8b',
  '#ffb84d',
  '#5bc8ff',
  '#a88bff',
  '#7ce8a0',
  '#ff7bc4',
  '#ffd166',
  '#ff5d5d',
]

interface ConfettiBurstProps {
  trigger: number
}

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function ConfettiBurst({ trigger }: ConfettiBurstProps) {
  const pieces = useMemo<ConfettiPiece[]>(() => {
    const rand = seededRandom(trigger * 9301 + 49297)
    const result: ConfettiPiece[] = []
    const rectCount = 42
    const dotCount = 18
    let id = 0

    for (let i = 0; i < rectCount; i++) {
      result.push({
        id: id++,
        left: 0,
        color: COLORS[i % COLORS.length],
        size: rand() * 8 + 6,
        angle: rand() * 360,
        distance: rand() * 260 + 140,
        delay: rand() * 0.12,
        rotate: rand() * 900 - 450,
        duration: rand() * 0.9 + 1.1,
        kind: 'rect',
      })
    }

    for (let i = 0; i < dotCount; i++) {
      result.push({
        id: id++,
        left: 0,
        color: COLORS[(i + 2) % COLORS.length],
        size: rand() * 6 + 3,
        angle: rand() * 360,
        distance: rand() * 200 + 100,
        delay: rand() * 0.1,
        rotate: 0,
        duration: rand() * 0.8 + 1,
        kind: 'dot',
      })
    }

    return result
  }, [trigger])

  return (
    <div className="confetti-burst" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={`${trigger}-${p.id}`}
          className={`confetti confetti-${p.kind}`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.kind === 'rect' ? p.size * 1.4 : p.size}px`,
            backgroundColor: p.color,
            ['--angle' as string]: `${p.angle}deg`,
            ['--distance' as string]: `${p.distance}px`,
            ['--spin' as string]: `${p.rotate}deg`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export default ConfettiBurst