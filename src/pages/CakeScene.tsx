import { useCallback, useEffect, useRef, useState } from 'react'
import MeHero, { type MePose } from '../components/MeHero'
import AnimeGirl, { type GirlPose } from '../components/AnimeGirl'
import ConfettiBurst from '../components/effects/ConfettiBurst'
import SparkleBurst from '../components/effects/SparkleBurst'
import FloatingBalloons from '../components/effects/FloatingBalloons'
import Starfield from '../components/effects/Starfield'
import AmbientParticles from '../components/effects/AmbientParticles'
import { cakeText } from '../data/cakeData'
import '../CakeScene.css'

interface CakeSceneProps {
  onComplete: () => void
}

/**
 * ── State machine ──────────────────────────────────────────────
 * intro        (auto lines)               → wish
 * wish         [MAKE A WISH ⭐]           → blowCandles   (SHANTRA looks at BRUNO + cake)
 * blowCandles  [BLOW THE CANDLES 🕯️💨]   → candlesOut    (flames flicker → smoke)
 * candlesOut   (auto, clap + burst)       → cutCake
 * cutCake      [CUT THE CAKE 🎂🔪]         → cutting → cakeCut (knife saws, slice separates)
 * cakeCut      (auto, burst)              → feedShantra   (BRUNO feeds SHANTRA, hand→cake→mouth)
 * shantraFeedsMe (auto, reverse feed)     → handshake     (SHANTRA feeds BRUNO)
 * handshake    [SHAKE HANDS 🤝]           → hands meet, shake, glow
 * finished     [CONTINUE THE SURPRISE]    → done
 * ────────────────────────────────────────────────────────────────
 */
type Phase =
  | 'intro'
  | 'wish'
  | 'blowCandles'
  | 'candlesOut'
  | 'cutCake'
  | 'cutting'
  | 'cakeCut'
  | 'feedShantra'
  | 'shantraFeedsMe'
  | 'handshake'
  | 'finished'
  | 'transition'
  | 'done'

interface Morsel {
  x: number
  y: number
  show: boolean
  gone: boolean
}

function CakeScene({ onComplete }: CakeSceneProps) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [mePose, setMePose] = useState<MePose>('idle')
  const [girlPose, setGirlPose] = useState<GirlPose>('idle')
  const [showText, setShowText] = useState('')
  const [candleCount] = useState(6)
  const [flamesLit, setFlamesLit] = useState(true)
  const [blowing, setBlowing] = useState(false)
  const [smokeVisible, setSmokeVisible] = useState(false)
  const [knifeVisible, setKnifeVisible] = useState(false)
  const [cutProgress, setCutProgress] = useState(0)
  const [cakeCut, setCakeCut] = useState(false)
  const [showCutLine, setShowCutLine] = useState(false)
  const [showSlice, setShowSlice] = useState(false)
  const [showCrumbs, setShowCrumbs] = useState(false)
  const [showCream, setShowCream] = useState(false)
  const [morselMe, setMorselMe] = useState<Morsel | null>(null)
  const [morselGirl, setMorselGirl] = useState<Morsel | null>(null)
  const [handshakeActive, setHandshakeActive] = useState(false)
  const [handshakeGlow, setHandshakeGlow] = useState(false)
  const [claspPos, setClaspPos] = useState<{ x: number; y: number } | null>(null)
  const [claspActive, setClaspActive] = useState(false)
  const [shakeCam, setShakeCam] = useState(false)
  const [finalMessage, setFinalMessage] = useState('')
  const [burstTrigger, setBurstTrigger] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [heartParticles, setHeartParticles] = useState(false)
  const [cameraZoom, setCameraZoom] = useState(false)

  const timersRef = useRef<number[]>([])
  const cutIvRef = useRef<number | null>(null)
  const blowBusyRef = useRef(false)
  const wishBusyRef = useRef(false)
  const cutBusyRef = useRef(false)
  const feedBusyRef = useRef(false)
  const handshakeBusyRef = useRef(false)
  const continueBusyRef = useRef(false)
  const mountedRef = useRef(true)
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      timersRef.current.forEach((t) => window.clearTimeout(t))
      if (cutIvRef.current) window.clearInterval(cutIvRef.current)
    }
  }, [])

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, ms)
    timersRef.current.push(t)
    return t
  }, [])

  const triggerBurst = useCallback(() => {
    setBurstTrigger((t) => t + 1)
    setShowConfetti(true)
    setShowSparkles(true)
    addTimer(() => setShowConfetti(false), 3000)
    addTimer(() => setShowSparkles(false), 2600)
  }, [addTimer])

  const advancePhase = useCallback((next: Phase, delay: number) => {
    addTimer(() => {
      if (mountedRef.current) setPhase(next)
    }, delay)
  }, [addTimer])

  /** Center point (px, relative to the cinema = viewport) of an anchor element inside a character/cake SVG. */
  const getAnchor = useCallback((sel: string) => {
    const el = document.querySelector<Element>(sel)
    if (!el) return null
    const r = el.getBoundingClientRect()
    if (r.width === 0 && r.height === 0) return null
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
  }, [])

  // ── Intro lines ──
  useEffect(() => {
    addTimer(() => {
      setShowText(cakeText.intro1)
      setMePose('happy')
      setGirlPose('notice')
    }, 900)
    addTimer(() => {
      setShowText(cakeText.intro2)
      setMePose('talking')
      setGirlPose('smiling')
    }, 3500)
    addTimer(() => {
      setShowText('')
      setMePose('idle')
      setGirlPose('idle')
      setPhase('wish')
      triggerBurst()
    }, 5600)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── MAKE A WISH button: SHANTRA looks at BRUNO + the cake ──
  const handleMakeWish = useCallback(() => {
    if (phaseRef.current !== 'wish') return
    if (wishBusyRef.current) return
    wishBusyRef.current = true
    setCameraZoom(true)
    setMePose('gesturing')
    setGirlPose('notice')
    setShowText(cakeText.wish1)
    addTimer(() => {
      setShowText(cakeText.wish2)
      setMePose('talking')
      setGirlPose('smiling')
    }, 3200)
    addTimer(() => {
      setShowText(cakeText.blowIntro)
      setCameraZoom(false)
      setMePose('pointing')
      setGirlPose('pointing')
      setPhase('blowCandles')
    }, 6500)
  }, [addTimer])

  // ── Candles out (shared completion) ──
  const handleCandlesOut = useCallback(() => {
    if (phaseRef.current !== 'blowCandles') return
    setFlamesLit(false)
    setBlowing(false)
    setSmokeVisible(true)
    setGirlPose('clapping')
    setMePose('clapping')
    setShowText(cakeText.wishMade)
    triggerBurst()
    advancePhase('candlesOut', 2400)
  }, [advancePhase, triggerBurst])

  // ── BLOW THE CANDLES button ──
  const handleButtonBlow = useCallback(() => {
    if (phaseRef.current !== 'blowCandles') return
    if (blowBusyRef.current) return
    blowBusyRef.current = true
    setShowText('')
    setMePose('idle')
    setGirlPose('notice')
    // 1. All flames are ON. 2. Trigger a brief, clear flicker on every flame.
    setBlowing(true)
    // 3. Then turn ALL flames completely OFF and let the smoke rise.
    addTimer(() => {
      if (mountedRef.current) handleCandlesOut()
    }, 950)
  }, [handleCandlesOut, addTimer])

  useEffect(() => {
    if (phase !== 'candlesOut') return
    addTimer(() => {
      setShowText(cakeText.cutIntro)
      setMePose('pointing')
      setGirlPose('idle')
      setPhase('cutCake')
    }, 200)
  }, [phase, addTimer])

  // ── CUT THE CAKE button ──
  const handleCutCake = useCallback(() => {
    if (phaseRef.current !== 'cutCake') return
    if (cutBusyRef.current) return
    cutBusyRef.current = true
    setShowText('')
    setMePose('pointing')
    setGirlPose('notice')
    setPhase('cutting')
  }, [])

  useEffect(() => {
    if (phase !== 'cutting') return
    if (cutIvRef.current) window.clearInterval(cutIvRef.current)
    setKnifeVisible(true)
    setShowCutLine(false)
    setCakeCut(false)
    setCutProgress(0)
    let p = 0
    const iv = window.setInterval(() => {
      p += 1.5
      const next = Math.min(p, 100)
      setCutProgress(next)
      if (next >= 100) {
        window.clearInterval(iv)
        if (cutIvRef.current === iv) cutIvRef.current = null
        setKnifeVisible(false)
        setCakeCut(true)
        setShowCutLine(true)
        setShowSlice(true)
        setShowCrumbs(true)
        setShowCream(true)
        setPhase('cakeCut')
      }
    }, 16)
    cutIvRef.current = iv
    return () => window.clearInterval(iv)
  }, [phase])

  useEffect(() => {
    if (phase !== 'cakeCut') return
    triggerBurst()
    setGirlPose('clapping')
    setMePose('clapping')
    setShowText(cakeText.cutDone)
    addTimer(() => {
      setShowCream(false)
      setShowCrumbs(false)
      setShowText(cakeText.feedIntro)
      setMePose('happy')
      setGirlPose('smiling')
    }, 2400)
    addTimer(() => {
      setShowText('')
      setMePose('idle')
      setGirlPose('idle')
      setPhase('feedShantra')
    }, 5200)
  }, [phase, triggerBurst, addTimer])

  // ── FEED SHANTRA (BRUNO feeds SHANTRA) — hand → cake → mouth ──
  const handleFeed = useCallback(() => {
    if (phaseRef.current !== 'feedShantra') return
    if (feedBusyRef.current) return
    feedBusyRef.current = true
    const cake = getAnchor('.ctx-cake-piece')
    const meHand = getAnchor('.bh-feed-hand')
    const herMouth = getAnchor('.ag-mouth')
    if (!cake || !meHand || !herMouth) {
      // Safety net: never strand the flow even if an anchor can't be measured.
      setShowText('')
      setMePose('happy')
      setGirlPose('smiling')
      triggerBurst()
      addTimer(() => {
        setShowText(cakeText.handshakeIntro)
        setPhase('handshake')
      }, 1800)
      return
    }

    setShowText('')
    setMorselGirl(null)
    setMePose('pointing')
    setGirlPose('notice')

    // 0. Pick the slice up off the cake
    addTimer(() => {
      setMorselMe({ x: cake.x, y: cake.y, show: true, gone: false })
    }, 200)
    // 1. He lifts it up to his hand
    addTimer(() => {
      setMePose('feeding')
      setMorselMe({ x: meHand.x, y: meHand.y, show: true, gone: false })
    }, 1000)
    // 2. His hand carries it to SHANTRA's mouth
    addTimer(() => {
      setMorselMe({ x: herMouth.x, y: herMouth.y, show: true, gone: false })
      setGirlPose('openMouth')
      setMePose('feeding')
    }, 2200)
    // 3. She receives it and eats
    addTimer(() => {
      setMorselMe({ x: herMouth.x, y: herMouth.y, show: true, gone: true })
      setGirlPose('eating')
      setMePose('happy')
      setHeartParticles(true)
    }, 3200)
    addTimer(() => {
      setGirlPose('smiling')
      setShowText(cakeText.feedDone)
    }, 4100)
    // 4. Reverse — SHANTRA feeds BRUNO
    addTimer(() => {
      setHeartParticles(false)
      setMorselMe(null)
      setShowText(cakeText.feedReturn)
      setMePose('receptive')
      setGirlPose('offering')
      const herHand = getAnchor('.ag-offer-hand')
      const meMouth = getAnchor('.bh-mouth')
      if (herHand && meMouth) {
        setMorselGirl({ x: herHand.x, y: herHand.y, show: true, gone: false })
        addTimer(() => {
          setShowText('')
          setMorselGirl({ x: meMouth.x, y: meMouth.y, show: true, gone: false })
          setMePose('receptive')
          setGirlPose('smiling')
        }, 1600)
        addTimer(() => {
          setMorselGirl({ x: meMouth.x, y: meMouth.y, show: true, gone: true })
          setMePose('happy')
          setGirlPose('clapping')
          triggerBurst()
          setShowText(cakeText.finalTitle)
        }, 3000)
        addTimer(() => {
          setMorselGirl(null)
          setMePose('idle')
          setGirlPose('idle')
          setShowText(cakeText.handshakeIntro)
          setPhase('handshake')
        }, 7000)
      } else {
        setMorselGirl(null)
        addTimer(() => {
          setPhase('handshake')
        }, 2200)
      }
    }, 5600)
  }, [addTimer, getAnchor, triggerBurst])

  // ── Handshake prompt after a beat ──
  useEffect(() => {
    if (phase !== 'handshake' || handshakeActive) return
    addTimer(() => setShowText(cakeText.handshakePrompt), 2600)
  }, [phase, handshakeActive, addTimer])

  // ── SHAKE HANDS — hands physically meet ──
  const handleHandshake = useCallback(() => {
    if (phaseRef.current !== 'handshake' || handshakeActive) return
    if (handshakeBusyRef.current) return
    handshakeBusyRef.current = true
    setHandshakeActive(true)
    setShowText('')
    setMePose('handshake')
    setGirlPose('handshake')

    const meHand = getAnchor('.bh-shake-hand')
    const herHand = getAnchor('.ag-shake-hand')
    if (meHand && herHand) {
      setClaspPos({ x: (meHand.x + herHand.x) / 2, y: (meHand.y + herHand.y) / 2 })
      setClaspActive(true)
    }
    setShakeCam(true)
    setCameraZoom(true)
    addTimer(() => setHandshakeGlow(true), 450)
    addTimer(() => {
      setShakeCam(false)
      setClaspActive(false)
      setHandshakeGlow(false)
      setMePose('happy')
      setGirlPose('smiling')
      triggerBurst()
      setShowText(cakeText.finalTitle)
    }, 3600)
    addTimer(() => {
      setHandshakeActive(false)
      setPhase('finished')
      setFinalMessage('first')
    }, 8400)
  }, [addTimer, triggerBurst, handshakeActive, getAnchor])

  useEffect(() => {
    if (phase !== 'finished') return
    addTimer(() => setFinalMessage('second'), 4500)
    addTimer(() => setFinalMessage('third'), 8500)
    addTimer(() => {
      setShowText(cakeText.finalMessage3)
      triggerBurst()
    }, 8800)
  }, [phase, addTimer, triggerBurst])

  const handleContinue = useCallback(() => {
    if (phaseRef.current !== 'finished') return
    if (continueBusyRef.current) return
    continueBusyRef.current = true
    setPhase('transition')
    addTimer(() => {
      setPhase('done')
      onComplete()
    }, 1800)
  }, [onComplete, addTimer])

  const cutP = Math.min(Math.max(cutProgress, 0), 100)
  const knifeTransform = `translate(${22 - cutP * 0.18}px, ${-70 + cutP * 1.5}px) rotate(${14 - cutP * 0.22}deg)`

  const isSceneVisible =
    phase === 'intro' ||
    phase === 'wish' ||
    phase === 'blowCandles' ||
    phase === 'candlesOut' ||
    phase === 'cutCake' ||
    phase === 'cutting' ||
    phase === 'cakeCut' ||
    phase === 'feedShantra' ||
    phase === 'shantraFeedsMe' ||
    phase === 'handshake' ||
    phase === 'finished'

  const showMakeWishBtn = phase === 'wish'
  const showBlowBtn = phase === 'blowCandles'
  const showCutBtn = phase === 'cutCake'
  const showFeedBtn = phase === 'feedShantra'
  const showHandshakeBtn = phase === 'handshake' && !handshakeActive
  const showContinueBtn = phase === 'finished' && finalMessage === 'third'
  const showKnife = phase === 'cutting' && knifeVisible
  const isTransitioning = phase === 'transition'
  const isDone = phase === 'done'

  if (isDone) return null

  return (
    <div className={`cake-scene${isTransitioning ? ' cake-transition' : ''}`}>
      {/* Background */}
      <div className="cake-bg" />
      <Starfield count={26} />
      <FloatingBalloons count={10} />
      <AmbientParticles count={24} />

      {/* Fairy lights strung overhead */}
      <div className="cake-lights" aria-hidden="true">
        <div className="cake-lights-string" />
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className="cake-light"
            style={{
              left: `${2 + (i / 16) * 96}%`,
              animationDelay: `${i * 0.22}s`,
            }}
          />
        ))}
      </div>

      {/* Warm ambient glow + cinematic bokeh */}
      <div className="cake-ambient-glow" aria-hidden="true" />
      <div className="cake-bokeh" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className="cake-bokeh-dot"
            style={{
              left: `${8 + (i * 11) % 84}%`,
              top: `${12 + (i * 17) % 52}%`,
              width: `${42 + (i % 4) * 26}px`,
              height: `${30 + (i % 3) * 18}px`,
              animationDelay: `${i * 0.55}s`,
            }}
          />
        ))}
      </div>

      {/* Drifting sparkles */}
      <div className="cake-float-sparkles" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className="cake-float-sparkle"
            style={{
              left: `${6 + (i * 8.3) % 88}%`,
              top: `${18 + (i * 13.7) % 60}%`,
              animationDelay: `${i * 0.7}s`,
              fontSize: `${11 + (i % 3) * 6}px`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* Confetti & Sparkles */}
      {showConfetti && (
        <div className="cake-confetti-layer">
          <ConfettiBurst trigger={burstTrigger} />
        </div>
      )}
      {showSparkles && (
        <div className="cake-sparkles-layer">
          <SparkleBurst trigger={burstTrigger} />
        </div>
      )}

      {/* Heart particles */}
      {heartParticles && (
        <div className="cake-heart-particles" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              className="cake-heart"
              style={{
                left: `${34 + (i % 5) * 8}%`,
                animationDelay: `${i * 0.15}s`,
                fontSize: `${18 + (i % 3) * 9}px`,
              }}
            >
              ❤️
            </span>
          ))}
        </div>
      )}

      {/* ── Main cinematic scene: SHANTRA left · cake center foreground · ME (BRUNO) right ── */}
      {isSceneVisible && (
        <div className={`cake-cinema${cameraZoom ? ' zoomed' : ''}${shakeCam ? ' wobble' : ''}`}>
          <div className="cake-floor" aria-hidden="true" />

          <div className="cake-center-stage">
          {/* SHANTRA */}
          <div className="cake-girl-wrap">
            <div className="cake-name-label cake-name-shantra">SHANTRA</div>
            <div className="cake-contact-shadow" aria-hidden="true" />
            <AnimeGirl className="cake-girl-svg" pose={girlPose} />
          </div>

          {/* ME */}
          <div className="cake-me-wrap">
            <div className="cake-name-label cake-name-me">ME</div>
            <div className="cake-contact-shadow" aria-hidden="true" />
            <MeHero className="cake-me-svg" pose={mePose} />
          </div>

          {/* Cake */}
          <div className={`cake-stage${cakeCut ? ' cut' : ''}`}>
            <div className="cake-table">
              <svg viewBox="0 0 400 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="table-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B6914" />
                    <stop offset="100%" stopColor="#5A4510" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="400" height="8" rx="2" fill="#A07828" />
                <rect x="10" y="8" width="380" height="50" rx="4" fill="url(#table-grad)" />
                <rect x="15" y="14" width="370" height="3" rx="1" fill="#C09838" opacity="0.4" />
              </svg>
            </div>

            <div className="cake-glow" aria-hidden="true" />

            <div className="cake-body">
              <svg viewBox="0 0 300 260" className="cake-svg">
                <defs>
                  <linearGradient id="cake-red" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E83030" />
                    <stop offset="100%" stopColor="#C01818" />
                  </linearGradient>
                  <linearGradient id="cake-blue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E83030" />
                    <stop offset="100%" stopColor="#C01818" />
                  </linearGradient>
                  <linearGradient id="frosting-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#F0E8F8" />
                  </linearGradient>
                  <filter id="cake-shadow">
                    <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#000" floodOpacity="0.35" />
                  </filter>
                  <radialGradient id="candle-glow" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="rgba(255,190,70,0.55)" />
                    <stop offset="100%" stopColor="rgba(255,190,70,0)" />
                  </radialGradient>
                </defs>

                {/* Bottom Tier */}
                <rect x="30" y="165" width="240" height="70" rx="8" fill="url(#cake-red)" filter="url(#cake-shadow)" />
                <rect x="30" y="165" width="240" height="70" rx="8" fill="rgba(255,255,255,0.08)" />
                <rect x="30" y="185" width="240" height="6" fill="rgba(255,255,255,0.15)" />
                {Array.from({ length: 8 }, (_, i) => (
                  <line key={`bwl${i}`} x1={150} y1={200} x2={30 + i * 34} y2={235} stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" />
                ))}
                {[40, 75, 110].map((r) => (
                  <path key={`bwc${r}`} d={`M${150 - r} ${200 + r * 0.8} Q150 ${200 + r * 0.5} ${150 + r} ${200 + r * 0.8}`} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" />
                ))}
                {[55, 90, 120, 155, 185, 220, 250].map((x) => (
                  <ellipse key={`drip${x}`} cx={x} cy={167} rx="8" ry="5" fill="url(#frosting-grad)" />
                ))}

                {/* Middle Tier */}
                <rect x="60" y="110" width="180" height="60" rx="7" fill="url(#cake-blue)" filter="url(#cake-shadow)" />
                <rect x="60" y="110" width="180" height="60" rx="7" fill="rgba(255,255,255,0.06)" />
                <rect x="60" y="128" width="180" height="5" fill="rgba(255,255,255,0.12)" />
                {Array.from({ length: 6 }, (_, i) => (
                  <line key={`mwl${i}`} x1={150} y1={140} x2={60 + i * 36} y2={170} stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" />
                ))}
                {[30, 60].map((r) => (
                  <path key={`mwc${r}`} d={`M${150 - r} ${140 + r * 0.5} Q150 ${140 + r * 0.3} ${150 + r} ${140 + r * 0.5}`} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" />
                ))}
                {[75, 105, 135, 165, 195, 225].map((x) => (
                  <ellipse key={`mdrip${x}`} cx={x} cy={112} rx="7" ry="4.5" fill="url(#frosting-grad)" />
                ))}

                {/* Top Tier */}
                <rect x="95" y="65" width="110" height="50" rx="6" fill="url(#cake-red)" filter="url(#cake-shadow)" />
                <rect x="95" y="65" width="110" height="50" rx="6" fill="rgba(255,255,255,0.08)" />
                <rect x="95" y="78" width="110" height="4" fill="rgba(255,255,255,0.12)" />
                {Array.from({ length: 4 }, (_, i) => (
                  <line key={`twl${i}`} x1={150} y1={90} x2={95 + i * 37} y2={115} stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" />
                ))}
                {[20, 40].map((r) => (
                  <path key={`twc${r}`} d={`M${150 - r} ${90 + r * 0.4} Q150 ${90 + r * 0.25} ${150 + r} ${90 + r * 0.4}`} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" />
                ))}

                {/* Frosting top */}
                <path d="M95 67 Q95 58 100 58 L200 58 Q205 58 205 67" fill="url(#frosting-grad)" />
                <path d="M100 58 Q105 50 110 58 Q115 50 120 58 Q125 50 130 58 Q135 50 140 58 Q145 50 150 58 Q155 50 160 58 Q165 50 170 58 Q175 50 180 58 Q185 50 190 58 Q195 50 200 58" fill="url(#frosting-grad)" />

                {/* Spider emblem */}
                <circle cx="150" cy="140" r="11" fill="#1A1A2E" opacity="0.9" />
                <circle cx="150" cy="139" r="4" fill="#303050" />
                <line x1="150" y1="132" x2="139" y2="125" stroke="#303050" strokeWidth="1.2" />
                <line x1="150" y1="132" x2="161" y2="125" stroke="#303050" strokeWidth="1.2" />
                <line x1="149" y1="146" x2="138" y2="153" stroke="#303050" strokeWidth="1.2" />
                <line x1="151" y1="146" x2="162" y2="153" stroke="#303050" strokeWidth="1.2" />

                {/* Cake message — the birthday belongs to BRUNO */}
                <text x="150" y="125" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF" opacity="0.9" fontFamily="sans-serif" letterSpacing="1">
                  HAPPY BIRTHDAY
                </text>
                <text x="150" y="54" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFD700" fontFamily="sans-serif" letterSpacing="2">
                  BRUNO!
                </text>

                {/* Spider-Man face (top tier) */}
                <ellipse cx="150" cy="76" rx="11" ry="9" fill="#E83030" opacity="0.9" />
                <ellipse cx="145" cy="74" rx="3" ry="4" fill="white" opacity="0.85" />
                <ellipse cx="155" cy="74" rx="3" ry="4" fill="white" opacity="0.85" />
                <path d="M143 72 Q145 69 147 72" stroke="#1A1A2E" strokeWidth="0.6" fill="none" />
                <path d="M153 72 Q155 69 157 72" stroke="#1A1A2E" strokeWidth="0.6" fill="none" />
                <line x1="150" y1="70" x2="150" y2="82" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                <line x1="143" y1="74" x2="157" y2="74" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />

                {/* Cake cut line */}
                {showCutLine && (
                  <line x1="150" y1="58" x2="150" y2="235" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeDasharray="6 4" className="cake-cut-line" />
                )}

                {/* Candles + warm glow */}
                {Array.from({ length: candleCount }, (_, i) => {
                  const cx = 122 + i * 11
                  return (
                    <g key={`candle${i}`}>
                      <circle cx={cx} cy={12} r="13" fill="url(#candle-glow)" />
                      <rect x={cx - 2.5} y={26} width="5" height="30" rx="2" fill={i % 2 === 0 ? '#FFD700' : '#FF6060'} />
                      <rect x={cx - 2.5} y={26} width="5" height="30" rx="2" fill="rgba(255,255,255,0.25)" />
                      <line x1={cx} y1={26} x2={cx} y2={20} stroke="#555" strokeWidth="1.2" />
                      {flamesLit && (
                        <g className={`cake-flame${blowing ? ' blowing' : ''}`} style={{ transformOrigin: `${cx}px 14px`, animationDelay: `${(i % 3) * 0.05}s` }}>
                          <ellipse cx={cx} cy={13} rx="10" ry="14" fill="rgba(255,180,50,0.25)" />
                          <ellipse cx={cx} cy={14} rx="5.5" ry="9" fill="#FF9500" />
                          <ellipse cx={cx} cy={12} rx="3" ry="6" fill="#FFD54F" />
                          <ellipse cx={cx} cy={10} rx="1.2" ry="3.5" fill="#FFF8E1" />
                        </g>
                      )}
                      {smokeVisible && !flamesLit && (
                        <g>
                          <circle className="cake-smoke smoke-a" cx={cx - 2} cy={20} r="2.6" fill="rgba(180,180,205,0.45)" style={{ animationDelay: `${i * 0.09}s` }} />
                          <circle className="cake-smoke smoke-b" cx={cx + 3} cy={16} r="2.2" fill="rgba(180,180,205,0.35)" style={{ animationDelay: `${i * 0.09 + 0.12}s` }} />
                          <circle className="cake-smoke smoke-c" cx={cx} cy={12} r="1.9" fill="rgba(180,180,205,0.22)" style={{ animationDelay: `${i * 0.09 + 0.24}s` }} />
                          <circle className="cake-smoke smoke-d" cx={cx - 1} cy={22} r="1.5" fill="rgba(180,180,205,0.28)" style={{ animationDelay: `${i * 0.09 + 0.36}s` }} />
                        </g>
                      )}
                    </g>
                  )
                })}

                {/* Invisible anchor for the cake slice being picked up */}
                <circle className="ctx-cake-piece" cx="196" cy="150" r="0.01" fill="none" />
              </svg>
            </div>

            {/* Knife — visibly saws through the cake */}
            {showKnife && (
              <div className="cake-knife" style={{ transform: knifeTransform }}>
                <div className="cake-knife-saw">
                  <svg viewBox="0 0 60 200" className="cake-knife-svg">
                    <defs>
                      <linearGradient id="blade-grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#D0D0E0" />
                        <stop offset="50%" stopColor="#F0F0F8" />
                        <stop offset="100%" stopColor="#C0C0D0" />
                      </linearGradient>
                      <linearGradient id="handle-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5A3A1A" />
                        <stop offset="100%" stopColor="#3A2510" />
                      </linearGradient>
                    </defs>
                    <rect x="25" y="20" width="10" height="120" rx="2" fill="url(#blade-grad)" />
                    <rect x="26" y="30" width="3" height="90" fill="rgba(255,255,255,0.3)" rx="1" />
                    <rect x="22" y="135" width="16" height="65" rx="4" fill="url(#handle-grad)" />
                    <rect x="23" y="138" width="14" height="4" rx="1" fill="#C09838" />
                  </svg>
                </div>
              </div>
            )}

            {/* Separated cake slice + crumbs + cream */}
            {showSlice && (
              <div className="cake-slice-wrap">
                <div className="cake-slice">
                  <svg viewBox="0 0 60 190" className="cake-slice-svg">
                    <defs>
                      <linearGradient id="slice-red" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E83030" />
                        <stop offset="100%" stopColor="#C01818" />
                      </linearGradient>
                      <linearGradient id="slice-blue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E83030" />
                        <stop offset="100%" stopColor="#C01818" />
                      </linearGradient>
                    </defs>
                    <rect x="8" y="72" width="42" height="54" rx="5" fill="url(#slice-red)" />
                    <rect x="8" y="30" width="42" height="44" rx="5" fill="url(#slice-blue)" />
                    <path d="M12 30 Q18 26 24 30 Q30 26 36 30 Q42 26 48 30 L48 24 Q42 20 36 24 Q30 20 24 24 Q18 20 12 24 Z" fill="#fff" />
                    <rect x="22" y="4" width="4" height="22" rx="1.5" fill="#FFD700" />
                    <path d="M26 20 L28 26 L24 26 Z" fill="#fff" opacity="0.8" />
                    <circle cx="16" cy="150" r="3" fill="#fff" opacity="0.6" />
                    <circle cx="44" cy="160" r="2.5" fill="#fff" opacity="0.5" />
                  </svg>
                </div>
                {showCrumbs && (
                  <div className="cake-crumbs" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className="cake-crumb"
                        style={{
                          left: `${8 + i * 9}%`,
                          animationDelay: `${i * 0.08}s`,
                          width: `${5 + (i % 3) * 3}px`,
                          height: `${4 + (i % 2) * 3}px`,
                        }}
                      />
                    ))}
                  </div>
                )}
                {showCream && <div className="cake-cream-blob" aria-hidden="true" />}
              </div>
            )}
          </div>
          </div>

          {/* Cake piece travelling from BRUNO's hand → SHANTRA's mouth */}
          {morselMe && (
            <div
              className={`cake-morsel morsel-me${morselMe.show ? ' show' : ''}${morselMe.gone ? ' gone' : ''}`}
              style={{ left: morselMe.x, top: morselMe.y }}
            >
              <svg viewBox="0 0 40 40" className="cake-morsel-svg">
                <rect x="2" y="14" width="36" height="24" rx="3" fill="#E83030" />
                <rect x="2" y="9" width="36" height="8" rx="3" fill="white" />
                <rect x="2" y="5" width="36" height="5" rx="2" fill="#C01818" />
              </svg>
            </div>
          )}

          {/* Cake piece travelling from SHANTRA's hand → BRUNO's mouth */}
          {morselGirl && (
            <div
              className={`cake-morsel morsel-girl${morselGirl.show ? ' show' : ''}${morselGirl.gone ? ' gone' : ''}`}
              style={{ left: morselGirl.x, top: morselGirl.y }}
            >
              <svg viewBox="0 0 40 40" className="cake-morsel-svg">
                <rect x="2" y="14" width="36" height="24" rx="3" fill="#E83030" />
                <rect x="2" y="9" width="36" height="8" rx="3" fill="white" />
                <rect x="2" y="5" width="36" height="5" rx="2" fill="#C01818" />
              </svg>
            </div>
          )}

          {/* Clasped hands meeting between BRUNO and SHANTRA */}
          {claspPos && (
            <div
              className={`cake-hands${claspActive ? ' active' : ''}`}
              style={{ left: claspPos.x, top: claspPos.y }}
            >
              <svg viewBox="0 0 90 46" className="cake-hands-svg">
                <ellipse cx="45" cy="23" rx="30" ry="18" fill="rgba(255,235,190,0.22)" />
                <g transform="translate(42 23)">
                  <rect x="-16" y="-20" width="6" height="40" rx="3" fill="#F5C9A8" />
                  <ellipse cx="-8" cy="0" rx="8" ry="11" fill="#FFD9C4" />
                  <rect x="-20" y="-9" width="12" height="5" rx="2.5" fill="#F5C9A8" />
                  <rect x="-20" y="-1" width="12" height="5" rx="2.5" fill="#F5C9A8" />
                  <rect x="-20" y="7" width="12" height="5" rx="2.5" fill="#F5C9A8" />
                </g>
                <g transform="translate(48 23)">
                  <rect x="10" y="-20" width="6" height="40" rx="3" fill="#E0B08A" />
                  <ellipse cx="8" cy="0" rx="8" ry="11" fill="#F0C89C" />
                  <rect x="8" y="-9" width="12" height="5" rx="2.5" fill="#E0B08A" />
                  <rect x="8" y="-1" width="12" height="5" rx="2.5" fill="#E0B08A" />
                  <rect x="8" y="7" width="12" height="5" rx="2.5" fill="#E0B08A" />
                </g>
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Text bubble */}
      {showText && isSceneVisible && (
        <div className="cake-text-bubble">
          <p className="cake-text-msg">{showText}</p>
        </div>
      )}

      {/* Heartfelt messages */}
      {finalMessage === 'first' && (
        <div className="cake-heartfelt-wrap">
          <p className="cake-heartfelt-msg">{cakeText.finalMessage1}</p>
        </div>
      )}
      {finalMessage === 'second' && (
        <div className="cake-heartfelt-wrap">
          <p className="cake-heartfelt-msg">{cakeText.finalMessage2}</p>
        </div>
      )}
      {finalMessage === 'third' && (
        <div className="cake-heartfelt-wrap">
          <p className="cake-heartfelt-msg cake-heartfelt-both">
            {cakeText.finalMessage1}
            <br />
            <br />
            {cakeText.finalMessage2}
          </p>
        </div>
      )}

      {/* ── Action Buttons ── */}
      {showMakeWishBtn && (
        <button className="cake-btn cake-btn-wish" onClick={handleMakeWish}>
          {cakeText.makeWishBtn}
        </button>
      )}
      {showBlowBtn && (
        <button className="cake-btn cake-btn-blow" onClick={handleButtonBlow}>
          {cakeText.blowBtn}
        </button>
      )}
      {showCutBtn && (
        <button className="cake-btn cake-btn-cut" onClick={handleCutCake}>
          {cakeText.cutBtn}
        </button>
      )}
      {showFeedBtn && (
        <button className="cake-btn cake-btn-feed" onClick={handleFeed}>
          {cakeText.feedBtn}
        </button>
      )}
      {showHandshakeBtn && (
        <button className="cake-btn cake-btn-handshake" onClick={handleHandshake}>
          {cakeText.handshakeBtn}
        </button>
      )}
      {showContinueBtn && (
        <button className="cake-btn cake-btn-continue" onClick={handleContinue}>
          {cakeText.continueBtn}
        </button>
      )}

      {/* Handshake glow overlay */}
      {handshakeGlow && <div className="cake-handshake-glow" aria-hidden="true" />}

      {/* Next placeholder */}
      {isTransitioning && (
        <div className="cake-next-placeholder">
          <p className="cake-next-msg">Your favourite characters are waiting to wish you... 👀✨</p>
        </div>
      )}
    </div>
  )
}

export default CakeScene