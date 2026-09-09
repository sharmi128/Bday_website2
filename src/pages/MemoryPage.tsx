import { useCallback, useEffect, useRef, useState } from 'react'
import FloatingBalloons from '../components/effects/FloatingBalloons'
import './MemoryPage.css'

interface MemoryPageProps {
  onComplete?: () => void
}

const MEMORIES = [
  { src: '/memories/memory-1.jpg', caption: 'Where it all began' },
  { src: '/memories/memory-2.jpg', caption: 'Golden hours together' },
  { src: '/memories/memory-3.jpg', caption: 'Laughter that never fades' },
  { src: '/memories/memory-4.jpg', caption: 'Fearless, always' },
  { src: '/memories/memory-5.jpg', caption: 'Sunshine on our shoulders' },
  { src: '/memories/memory-6.jpg', caption: 'Hand in hand' },
  { src: '/memories/memory-7.jpg', caption: 'Tiny adventures, big smiles' },
  { src: '/memories/memory-8.jpg', caption: 'Forever us' },
]

function MemoryPage({ onComplete }: MemoryPageProps) {
  const [opened, setOpened] = useState(false)
  const [onamZoom, setOnamZoom] = useState(false)
  const timersRef = useRef<number[]>([])
  const onamTimerRef = useRef<number | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      timersRef.current.forEach((t) => window.clearTimeout(t))
      if (onamTimerRef.current) window.clearTimeout(onamTimerRef.current)
    }
  }, [])

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = window.setTimeout(() => {
      if (mountedRef.current) fn()
    }, ms)
    timersRef.current.push(t)
    return t
  }, [])

  const handleOpen = useCallback(() => {
    if (opened) return
    setOpened(true)
    addTimer(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 350)
  }, [opened, addTimer])

  const handleContinue = useCallback(() => {
    if (!opened) return
    onComplete?.()
  }, [opened, onComplete])

  const handleOnamTap = useCallback(() => {
    if (onamZoom) return
    setOnamZoom(true)
    if (onamTimerRef.current) window.clearTimeout(onamTimerRef.current)
    onamTimerRef.current = window.setTimeout(() => {
      if (mountedRef.current) setOnamZoom(false)
    }, 1200)
  }, [onamZoom])

  return (
    <div className={`memory-page${opened ? ' opened' : ''}`}>
      <div className="memory-bg" aria-hidden="true" />

      <div className="memory-ambient-glow" aria-hidden="true" />
      <div className="memory-bokeh" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className="memory-bokeh-dot"
            style={{
              left: `${(i * 13 + 6) % 92}%`,
              top: `${(i * 17 + 8) % 70}%`,
              width: `${40 + (i % 4) * 24}px`,
              height: `${28 + (i % 3) * 16}px`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="memory-float-balloons" aria-hidden="true">
        <FloatingBalloons count={8} />
      </div>

      {/* ================= STEP 1 — MEMORY INVITATION BOX ================= */}
      {!opened && (
        <div className="memory-invite-wrap">
          <div className="memory-invite-card">
            <span className="memory-corner mem-corner-tl" aria-hidden="true">🌹</span>
            <span className="memory-corner mem-corner-tr" aria-hidden="true">🌹</span>
            <span className="memory-corner mem-corner-bl" aria-hidden="true">🌹</span>
            <span className="memory-corner mem-corner-br" aria-hidden="true">🌹</span>

            <span className="memory-rose mem-rose-1" aria-hidden="true">🌹</span>
            <span className="memory-rose mem-rose-2" aria-hidden="true">🌹</span>

            <div className="memory-invite-sparkles" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <span
                  key={i}
                  className="memory-invite-sparkle"
                  style={{
                    left: `${(i * 19 + 5) % 95}%`,
                    top: `${(i * 23 + 8) % 80}%`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  ✨
                </span>
              ))}
            </div>

            <span className="memory-invite-balloon mem-ball-1" aria-hidden="true">🎈</span>
            <span className="memory-invite-balloon mem-ball-2" aria-hidden="true">🎈</span>
            <span className="memory-invite-balloon mem-ball-3" aria-hidden="true">🎈</span>
            <span className="memory-invite-balloon mem-ball-4" aria-hidden="true">🎈</span>

            <div className="memory-invite-icon" aria-hidden="true">💌</div>
            <h2 className="memory-invite-title">Do you want to save our memories? 💭❤️</h2>
            <button className="memory-invite-btn" onClick={handleOpen}>
              YES, SHOW ME ❤️
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2 — MEMORY SPACE (EMPTY & SCROLLABLE) ================= */}
      {opened && (
        <div className="memory-space">
          <div className="memory-scroll-inner">
            {/* Outer decorative border */}
            <div className="memory-frame">
              <span className="memory-corner mem-corner-tl" aria-hidden="true">🌹</span>
              <span className="memory-corner mem-corner-tr" aria-hidden="true">🌹</span>
              <span className="memory-corner mem-corner-bl" aria-hidden="true">🌹</span>
              <span className="memory-corner mem-corner-br" aria-hidden="true">🌹</span>

              {/* Balloons around the outer border */}
              <span className="memory-border-balloon mb-1" aria-hidden="true">🎈</span>
              <span className="memory-border-balloon mb-2" aria-hidden="true">🎈</span>
              <span className="memory-border-balloon mb-3" aria-hidden="true">🎈</span>
              <span className="memory-border-balloon mb-4" aria-hidden="true">🎈</span>
              <span className="memory-border-balloon mb-5" aria-hidden="true">🎈</span>
              <span className="memory-border-balloon mb-6" aria-hidden="true">🎈</span>

              {/* Soft hearts along the border */}
              <span className="memory-border-heart mh-1" aria-hidden="true">❤️</span>
              <span className="memory-border-heart mh-2" aria-hidden="true">❤️</span>
              <span className="memory-border-heart mh-3" aria-hidden="true">❤️</span>
              <span className="memory-border-heart mh-4" aria-hidden="true">❤️</span>
              <span className="memory-border-heart mh-5" aria-hidden="true">❤️</span>
              <span className="memory-border-heart mh-6" aria-hidden="true">❤️</span>

              {/* Sparkles drifting inside */}
              <div className="memory-space-sparkles" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => (
                  <span
                    key={i}
                    className="memory-space-sparkle"
                    style={{
                      left: `${(i * 17 + 7) % 94}%`,
                      top: `${((i * 29 + 12) % 160)}%`,
                      animationDelay: `${i * 0.55}s`,
                    }}
                  >
                    ✨
                  </span>
                ))}
              </div>

              {/* The memory scrapbook — filled with our photos */}
              <div className="memory-gallery">
                <h3 className="memory-gallery-title">Our Precious Moments</h3>
                <p className="memory-gallery-sub">
                  Every picture holds a story — this is ours 💞
                </p>

                <div className="memory-photo-grid">
                  {MEMORIES.map((m, i) => (
                    <figure
                      className={`memory-photo-card rot-${(i % 4) + 1}`}
                      key={m.src}
                    >
                      <img src={m.src} alt={m.caption} loading="lazy" />
                      <figcaption>{m.caption}</figcaption>
                    </figure>
                  ))}
                </div>

                {/* Featured Onam memory — our special scrapbook polaroid */}
                <div className="memory-onam">
                  <span className="memory-onam-tape onam-tape-l" aria-hidden="true" />
                  <span className="memory-onam-tape onam-tape-r" aria-hidden="true" />
                  <span className="memory-onam-flower of-1" aria-hidden="true">🌸</span>
                  <span className="memory-onam-flower of-2" aria-hidden="true">🌼</span>
                  <span className="memory-onam-flower of-3" aria-hidden="true">🤍</span>
                  <span className="memory-onam-flower of-4" aria-hidden="true">✨</span>

                  <div className="memory-onam-polaroid">
                    <button
                      type="button"
                      className={`memory-onam-photo-wrap${onamZoom ? ' zoomed' : ''}`}
                      onClick={handleOnamTap}
                      aria-label="Tap to zoom the Onam memory photo"
                    >
                      <img src="/onam.jpg" alt="Our Onam memory" loading="lazy" />
                      <span className="memory-onam-zspark zsp-1" aria-hidden="true">✦</span>
                      <span className="memory-onam-zspark zsp-2" aria-hidden="true">✨</span>
                      <span className="memory-onam-zspark zsp-3" aria-hidden="true">✨</span>
                      <span className="memory-onam-zspark zsp-4" aria-hidden="true">✦</span>
                    </button>

                    <div className="memory-onam-caption">
                      <p>
                        “One of those little moments that became a beautiful memory. 🌸❤️
                        <br />Our Onam memory… filled with smiles, fun and moments I’ll
                        always remember. 🥹✨
                        <br />Some pictures capture a moment, but some moments stay in our
                        hearts forever. 🤍🫂”
                      </p>
                    </div>
                  </div>

                  <div className="memory-onam-divider" aria-hidden="true">
                    <span className="memory-onam-divider-line" />
                    <span className="memory-onam-divider-heart">❤️</span>
                    <span className="memory-onam-divider-line" />
                  </div>

                  <p className="memory-onam-signoff">
                    A little Onam memory… a forever friendship memory. 🌸🤍✨
                  </p>
                </div>

                <p className="memory-gallery-footer">
                  ..and so many more still to come 🌷
                </p>
              </div>
            </div>

            <button className="memory-continue-btn" onClick={handleContinue}>
              CONTINUE OUR STORY → ✨
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MemoryPage
