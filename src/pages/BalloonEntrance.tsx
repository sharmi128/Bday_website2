import { useCallback, useRef, useState } from 'react'
import Starfield from '../components/effects/Starfield'
import Clouds from '../components/effects/Clouds'
import AmbientParticles from '../components/effects/AmbientParticles'
import FloatingBalloons from '../components/effects/FloatingBalloons'
import ConfettiBurst from '../components/effects/ConfettiBurst'
import SparkleBurst from '../components/effects/SparkleBurst'
import CelebratoryFlash from '../components/effects/CelebratoryFlash'
import MainBalloon from '../components/MainBalloon'

export type EntrancePhase = 'idle' | 'popping' | 'done'

interface BalloonEntranceProps {
  onComplete: () => void
}

const REVEAL_SPARKLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: 12 + ((i * 23 + 7) % 76),
  top: 16 + ((i * 37 + 11) % 66),
  delay: (i * 0.32) % 2.2,
  size: 10 + ((i * 7) % 9),
}))

function BalloonEntrance({ onComplete }: BalloonEntranceProps) {
  const [phase, setPhase] = useState<EntrancePhase>('idle')
  const [burstTrigger, setBurstTrigger] = useState(0)
  const [revealVisible, setRevealVisible] = useState(false)
  const [revealLeaving, setRevealLeaving] = useState(false)
  const completeRef = useRef(false)

  const handleBalloonPopped = useCallback(() => {
    if (completeRef.current) return
    completeRef.current = true

    setPhase('popping')
    setBurstTrigger((t) => t + 1)
    setRevealVisible(true)

    window.setTimeout(() => {
      setPhase('done')
    }, 1300)

    window.setTimeout(() => {
      setRevealLeaving(true)
    }, 2700)

    window.setTimeout(() => {
      onComplete()
    }, 3400)
  }, [onComplete])

  return (
    <div className={`entrance-scene${phase !== 'idle' ? ' scene-popping' : ''}${phase === 'done' ? ' scene-done' : ''}`}>
      <div className="sky-gradient" />

      <Clouds count={7} />
      <Starfield count={30} />
      <AmbientParticles count={24} />

      <div className="sun-glow" aria-hidden="true" />

      <FloatingBalloons count={10} />

      <CelebratoryFlash trigger={burstTrigger} />

      <div className="scene-vignette" aria-hidden="true" />

      <div className="entrance-center">
        <div className="balloon-stage">
          {phase === 'idle' && (
            <>
              <p className="entrance-hint">
                Touch the balloon to begin <span className="hint-emoji">🎈✨</span>
              </p>
              <MainBalloon onPop={handleBalloonPopped} />
            </>
          )}

          {phase !== 'idle' && (
            <div className="popped-burst-scene">
              <ConfettiBurst trigger={burstTrigger} />
              <SparkleBurst trigger={burstTrigger} />
              <div className="ghost-balloon-ring" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      {phase !== 'idle' && (
        <div
          className={`birthday-reveal${revealVisible ? ' visible' : ''}${revealLeaving ? ' leaving' : ''}`}
          aria-hidden="true"
        >
          <div className="reveal-glow" />
          {REVEAL_SPARKLES.map((s) => (
            <span
              key={s.id}
              className="reveal-sparkle"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                fontSize: `${s.size}px`,
                animationDelay: `${s.delay}s`,
              }}
            >
              ✦
            </span>
          ))}
          <h1 className="reveal-title">
            <span className="reveal-line-1">Happiest Birthday</span>
            <span className="reveal-line-2">
              Buruno <span className="reveal-emoji">🎂</span>
            </span>
          </h1>
        </div>
      )}
    </div>
  )
}

export default BalloonEntrance