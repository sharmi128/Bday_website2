import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Starfield from '../components/effects/Starfield'
import AmbientParticles from '../components/effects/AmbientParticles'
import FloatingBalloons from '../components/effects/FloatingBalloons'
import './TimelinePage.css'

interface TimelinePageProps {
  onComplete: () => void
}

interface Milestone {
  emoji: string
  title: string
  text: string
  /** Optional: drop a photo into /public and set its path here, e.g. '/milestone-1.jpg' */
  photo?: string
}

/* ════════════════════════════════════════════════════════════════
   ✏️  EDIT ME — Your friendship milestones (7 editable memories).
   Add a photo by placing a file in /public and writing its path.
   ════════════════════════════════════════════════════════════════ */
const MILESTONES: Milestone[] = [
  {
    emoji: '🫂',
    title: 'THE DAY WE MET',
    text: '[Add our first meeting details here]',
    photo: '/memories/memory-1.jpg',
  },
  {
    emoji: '❤️',
    title: 'THE BEGINNING OF OUR FRIENDSHIP',
    text: '[Add how our friendship started here]',
    photo: '/memories/memory-2.jpg',
  },
  {
    emoji: '📸',
    title: 'OUR FIRST SPECIAL MEMORY',
    text: '[Add memory details here]',
    photo: '/memories/memory-3.jpg',
  },
  {
    emoji: '✨',
    title: 'THE MOMENT WE BECAME CLOSER',
    text: '[Add details here]',
    photo: '/memories/memory-4.jpg',
  },
  {
    emoji: '😂',
    title: 'THE FUNNIEST PERIOD',
    text: '[Add details here]',
    photo: '/memories/memory-5.jpg',
  },
  {
    emoji: '🥹',
    title: 'A MOMENT WE WILL NEVER FORGET',
    text: '[Add details here]',
    photo: '/memories/memory-6.jpg',
  },
  {
    emoji: '❤️',
    title: 'WHERE WE ARE TODAY',
    text: '[Add our present friendship details here]',
    photo: '/memories/memory-7.jpg',
  },
]

const AMBIENT_ICONS = ['❤️', '✨', '💫', '🫶', '🌟', '💖', '✨', '❤️']

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function TimelinePage({ onComplete }: TimelinePageProps) {
  const [phase, setPhase] = useState<'intro' | 'timeline' | 'finale'>('intro')
  const [step, setStep] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [revealed, setRevealed] = useState<boolean[]>(() => MILESTONES.map(() => false))
  const [progress, setProgress] = useState(0)
  const [hintGone, setHintGone] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const finaleRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<number[]>([])
  const mountedRef = useRef(true)
  const continueFuseRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    addTimer(() => setStep(1), 300)
    addTimer(() => setStep(2), 1700)
    addTimer(() => setStep(3), 2900)
    addTimer(() => setStep(4), 3800)
    addTimer(() => setPhase('timeline'), 5200)
    return () => {
      mountedRef.current = false
      timersRef.current.forEach((t) => window.clearTimeout(t))
      timersRef.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = window.setTimeout(() => {
      if (mountedRef.current) fn()
    }, ms)
    timersRef.current.push(t)
    return t
  }, [])

  /* Reveal each milestone card as it scrolls into view. */
  useEffect(() => {
    if (phase !== 'timeline' && phase !== 'finale') return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = Number((entry.target as HTMLElement).dataset.index)
          setRevealed((prev) => {
            if (prev[idx]) return prev
            const next = prev.slice()
            next[idx] = true
            return next
          })
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.16 }
    )
    cardRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [phase])

  /* Enter the finale once the ending block reaches the viewport. */
  useEffect(() => {
    if (phase !== 'timeline') return
    const el = finaleRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setPhase('finale')
        })
      },
      { threshold: 0.28 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [phase])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0)
    if (el.scrollTop > 12) setHintGone(true)
  }, [])

  /* CONTINUE OUR STORY ✨ → next planned page */
  const handleContinue = useCallback(() => {
    if (continueFuseRef.current) return
    continueFuseRef.current = true
    setLeaving(true)
    addTimer(() => onComplete(), 950)
  }, [addTimer, onComplete])

  const floaters = useMemo(() => {
    const rand = seededRandom(48271)
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: rand() * 100,
      size: rand() * 17 + 12,
      delay: rand() * 9,
      duration: rand() * 8 + 11,
      sway: rand() * 110 - 55,
      emoji: AMBIENT_ICONS[i % AMBIENT_ICONS.length],
    }))
  }, [])

  const bokeh = useMemo(() => {
    const rand = seededRandom(37781)
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: rand() * 60 + 34,
      delay: rand() * 8,
      duration: rand() * 6 + 9,
      opacity: rand() * 0.3 + 0.12,
    }))
  }, [])

  const sideClass = (i: number) =>
    i === MILESTONES.length - 1 ? 'side-center' : i % 2 === 0 ? 'side-left' : 'side-right'

  return (
    <div className={`tl-page${phase === 'finale' ? ' finale' : ''}${leaving ? ' leaving' : ''}`}>
      {/* ── Atmosphere layers ─────────────────────────────── */}
      <div className="tl-bg" aria-hidden="true" />
      <div className="page-balloon-atmosphere dim" aria-hidden="true">
        <FloatingBalloons count={8} />
      </div>
      <div className="tl-nebula tl-n1" aria-hidden="true" />
      <div className="tl-nebula tl-n2" aria-hidden="true" />
      <div className="tl-nebula tl-n3" aria-hidden="true" />
      <div className="tl-vignette" aria-hidden="true" />
      <div className="tl-grain" aria-hidden="true" />

      <div className="tl-stars-layer" aria-hidden="true">
        <Starfield count={30} />
      </div>
      <div className="tl-bokeh" aria-hidden="true">
        {bokeh.map((b) => (
          <span
            key={b.id}
            className="tl-bokeh-dot"
            style={{
              left: `${b.left}%`,
              top: `${b.top}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              opacity: b.opacity,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="tl-floaters" aria-hidden="true">
        {floaters.map((f) => (
          <span
            key={f.id}
            className="tl-floater"
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

      <div className="tl-particles-layer">
        <AmbientParticles count={16} />
      </div>

      {/* ═══════════ CINEMATIC OPENING ═══════════ */}
      {phase === 'intro' && (
        <div className="tl-intro">
          <p className={`tl-line tl-line-1${step >= 1 ? ' is-in' : ''}${step >= 2 ? ' is-leaving' : ''}`}>
            Every friendship has a beginning... ❤️
          </p>
          <p className={`tl-line tl-line-2${step >= 2 ? ' is-in' : ''}${step >= 3 ? ' is-leaving' : ''}`}>
            But ours became a collection of little moments, memories, laughter, and memories we&apos;ll never
            forget. ✨
          </p>

          <div className={`tl-title-wrap${step >= 3 ? ' is-in' : ''}${step >= 4 ? ' is-leaving' : ''}`}>
            <span className="tl-title-spark" aria-hidden="true">✨</span>
            <h1 className="tl-title">OUR FRIENDSHIP TIMELINE ❤️</h1>
            <div className={`tl-title-rule${step >= 4 ? ' is-drawn' : ''}`} aria-hidden="true">
              <span className="tl-title-rule-core" />
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ SCROLLABLE TIMELINE ═══════════ */}
      {phase !== 'intro' && (
        <div className="tl-scroll" ref={scrollRef} onScroll={handleScroll}>
          <div
            className="tl-progress"
            style={{ width: `${progress * 100}%` }}
            aria-hidden="true"
          />

          <div className="tl-track">
            {!hintGone && (
              <div className="tl-hint" aria-hidden="true">
                <span>scroll our story</span>
                <span className="tl-hint-arrow">⬇️</span>
              </div>
            )}

            <div className="tl-vline" aria-hidden="true">
              <span className="tl-vline-base" />
              <span className="tl-vline-fill" style={{ height: `${progress * 100}%` }} />
            </div>

            {MILESTONES.map((m, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                data-index={i}
                className={`tl-milestone ${sideClass(i)}${revealed[i] ? ' is-revealed' : ''}`}
              >
                <span className="tl-node-dot" aria-hidden="true">
                  <span className="tl-node-core" />
                </span>

                <article className="tl-card">
                  <span className="tl-tape" aria-hidden="true" />
                  <span className="tl-card-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <figure className="tl-photo">
                    {m.photo ? (
                      <img className="tl-photo-img" src={m.photo} alt={`${m.title} memory`} loading="lazy" />
                    ) : (
                      <div className="tl-photo-empty" aria-hidden="true">
                        <span className="tl-photo-ico">📸</span>
                        <em>your photo here ✨</em>
                      </div>
                    )}
                  </figure>
                  <div className="tl-card-body">
                    <div className="tl-card-head">
                      <span className="tl-card-emoji" aria-hidden="true">
                        {m.emoji}
                      </span>
                      <h3 className="tl-card-title">{m.title}</h3>
                    </div>
                    <p className="tl-card-text">{m.text}</p>
                    <div className="tl-card-sig" aria-hidden="true">
                      <span className="tl-sig-line" />
                      <span className="tl-sig-heart">❤️</span>
                      <span className="tl-sig-line" />
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* ═══════════ FINAL REVEAL ═══════════ */}
          <div className="tl-finale" ref={finaleRef}>
            <div className="tl-finale-backdrop" aria-hidden="true" />
            <div className="tl-finale-inner">
              <p className="tl-fin tl-fin-1">Look how far we&apos;ve come... ❤️</p>
              <p className="tl-fin tl-fin-2">
                From one small beginning to so many unforgettable moments. ✨
              </p>
              <p className="tl-fin tl-fin-3">
                And somehow, there&apos;s still so much more of our story left to write. 🫂❤️
              </p>
              <button type="button" className="tl-finale-btn" onClick={handleContinue}>
                CONTINUE OUR STORY ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TimelinePage