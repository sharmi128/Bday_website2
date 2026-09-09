import { useMemo } from 'react'

interface Cloud {
  id: number
  top: number
  width: number
  duration: number
  opacity: number
  scale: number
}

interface CloudsProps {
  count?: number
}

function Clouds({ count = 6 }: CloudsProps) {
  const clouds = useMemo<Cloud[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 70 + 5,
      width: Math.random() * 220 + 180,
      duration: Math.random() * 60 + 70,
      opacity: Math.random() * 0.35 + 0.15,
      scale: Math.random() * 0.6 + 0.7,
    }))
  }, [count])

  return (
    <div className="clouds-layer" aria-hidden="true">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="cloud"
          style={{
            top: `${cloud.top}%`,
            width: `${cloud.width}px`,
            animationDuration: `${cloud.duration}s`,
            opacity: cloud.opacity,
            transform: `scale(${cloud.scale})`,
            animationDelay: `-${Math.random() * 80}s`,
          }}
        >
          <div className="cloud-body" />
          <div className="cloud-cap cloud-cap-1" />
          <div className="cloud-cap cloud-cap-2" />
        </div>
      ))}
    </div>
  )
}

export default Clouds