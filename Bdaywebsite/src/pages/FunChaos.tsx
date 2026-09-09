import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CelebratoryFlash from '../components/effects/CelebratoryFlash'
import SparkleBurst from '../components/effects/SparkleBurst'
import FloatingBalloons from '../components/effects/FloatingBalloons'
import AmbientParticles from '../components/effects/AmbientParticles'
import './FunChaos.css'

interface FunChaosProps {
  onComplete: () => void
}

const CHAOS_EMOJI = ['🎉', '🎊', '🥳', '🎈', '✨', '🔥', '💫', '🫶', '💛', '😂', '🤭', '💖', '⭐', '🎆', '🎇']

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function ChaosBurst({ trigger }: { trigger: number }) {
  const items = useMemo(() => {
    if (trigger <= 0) return []
    const rand = seededRandom(trigger * 23457 + 9999)
    return Array.from({ length: 30 }, (_, i) => ({
      id: `${trigger}-${i}`,
      emoji: CHAOS_EMOJI[i % CHAOS_EMOJI.length],
      dx: rand() * 500 - 250,
      dy: rand() * -400 - 50,
      rot: rand() * 360 - 180,
      size: rand() * 28 + 20,
      delay: rand() * 0.3,
      dur: rand() * 1.2 + 1.5,
    }))
  }, [trigger])

  if (trigger <= 0) return null

  return (
    <div className="chaos-burst" aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.id}
          className="chaos-particle"
          style={
            {
              fontSize: `${it.size}px`,
              ['--dx' as string]: `${it.dx}px`,
              ['--dy' as string]: `${it.dy}px`,
              ['--rot' as string]: `${it.rot}deg`,
              ['--dur' as string]: `${it.dur}s`,
              animationDelay: `${it.delay}s`,
            } as React.CSSProperties
          }
        >
          {it.emoji}
        </span>
      ))}
    </div>
  )
}

function FunChaos({ onComplete }: FunChaosProps) {
  const [phase, setPhase] = useState<'intro' | 'chaos' | 'finale'>('intro')
  const [burstKey, setBurstKey] = useState(0)
  const [sparkKey, setSparkKey] = useState(0)
  const [flashKey, setFlashKey] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [introLeaving, setIntroLeaving] = useState(false)
  const timersRef = useRef<number[]>([])
  const mountedRef = useRef(true)
  const introFuseRef = useRef(false)
  const chaosFuseRef = useRef(false)
  const finaleFuseRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      timersRef.current.forEach((t) => window.clearTimeout(t))
      timersRef.current = []
    }
  }, [])

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = window.setTimeout(() => {
      if (mountedRef.current) fn()
    }, ms)
    timersRef.current.push(t)
    return t
  }, [])

  const handleStart = useCallback(() => {
    if (introFuseRef.current) return
    introFuseRef.current = true
    setIntroLeaving(true)
    setBurstKey((k) => k + 1)
    setFlashKey((k) => k + 1)
    addTimer(() => setPhase('chaos'), 600)
  }, [addTimer])

  const handleChaos = useCallback(() => {
    if (chaosFuseRef.current) return
    chaosFuseRef.current = true
    setBurstKey((k) => k + 1)
    setSparkKey((k) => k + 1)
    setFlashKey((k) => k + 1)
    addTimer(() => {
      chaosFuseRef.current = false
    }, 500)
  }, [addTimer])

  const handleFinish = useCallback(() => {
    if (finaleFuseRef.current) return
    finaleFuseRef.current = true
    setBurstKey((k) => k + 1)
    setFlashKey((k) => k + 1)
    setLeaving(true)
    addTimer(() => onComplete(), 800)
  }, [addTimer, onComplete])

  const floatingEmojis = useMemo(() => {
    const rand = seededRandom(12345)
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: rand() * 100,
      size: rand() * 22 + 16,
      delay: rand() * 8,
      duration: rand() * 10 + 12,
      sway: rand() * 80 - 40,
      emoji: CHAOS_EMOJI[i % CHAOS_EMOJI.length],
    }))
  }, [])

  return (
    <div className={`funchaos-page${leaving ? ' leaving' : ''}`}>
      <div className="funchaos-bg" aria-hidden="true" />
      <div className="page-balloon-atmosphere" aria-hidden="true">
        <FloatingBalloons count={12} />
      </div>
      <div className="funchaos-glow" aria-hidden="true" />
      <div className="funchaos-particles-layer">
        <AmbientParticles count={20} />
      </div>

      <div className="funchaos-floaters" aria-hidden="true">
        {floatingEmojis.map((f) => (
          <span
            key={f.id}
            className="funchaos-floater"
            style={
              {
                left: `${f.left}%`,
                fontSize: `${f.size}px`,
                animationDelay: `${f.delay}s`,
                animationDuration: `${f.duration}s`,
                ['--sway' as string]: `${f.sway}px`,
              } as React.CSSProperties
            }
          >
            {f.emoji}
          </span>
        ))}
      </div>

      {/* INTRO */}
      {phase === 'intro' && (
        <div className={`funchaos-intro${introLeaving ? ' is-leaving' : ''}`}>
          <div className="funchaos-intro-inner">
            <div className="funchaos-intro-emblem" aria-hidden="true">
              <span className="funchaos-intro-emoji">🎉</span>
              <span className="funchaos-intro-spark">✨</span>
            </div>
            <h2 className="funchaos-intro-kicker">Ready for some chaos? 🥳</h2>
            <h3 className="funchaos-intro-title">
              Let's go absolutely wild! 🔥✨
            </h3>
            <button className="funchaos-start-btn" onClick={handleStart}>
              UNLEASH THE CHAOS 🎉🎊
            </button>
          </div>
        </div>
      )}

      {/* CHAOS PHASE */}
      {phase === 'chaos' && (
        <div className="funchaos-stage" onClick={handleChaos}>
          <div className="funchaos-center">
            <div className="funchaos-big-emoji">🥳</div>
            <h2 className="funchaos-title">PURE CHAOS ENERGY</h2>
            <p className="funchaos-sub">TAP ANYWHERE FOR MORE CHAOS 🔥</p>
          </div>
          <ChaosBurst trigger={burstKey} />
          {sparkKey > 0 && <SparkleBurst trigger={sparkKey} />}
        </div>
      )}

      {/* FINALE */}
      {phase === 'chaos' && (
        <div className="funchaos-finish-area">
          <button className="funchaos-go-btn" onClick={handleFinish}>
            OK THAT'S ENOUGH CHAOS 😂 →
          </button>
        </div>
      )}

      {burstKey > 0 && <ChaosBurst trigger={burstKey} />}
      {flashKey > 0 && <CelebratoryFlash trigger={flashKey} />}
    </div>
  )
}

export default FunChaos
