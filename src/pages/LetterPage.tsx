import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SparkleBurst from '../components/effects/SparkleBurst'
import AmbientParticles from '../components/effects/AmbientParticles'
import FloatingBalloons from '../components/effects/FloatingBalloons'
import './LetterPage.css'

interface LetterPageProps {
  onComplete: () => void
}

/**
 * ── Page 9: "A Letter For You" ──────────────────────────────────
 * Step 1: Tender intro + "OPEN MY LETTER 💌" button
 * Step 2: The envelope opens — sparkles + gentle floating hearts
 * Step 3: An elegant handwritten letter — a personal Tanglish
 *         letter, kept exactly as the author wrote it.
 * ────────────────────────────────────────────────────────────────
 */

const AMBIENT_ICONS = ['❤️', '💌', '✨', '🫶', '🌹', '💛']
const RISE_ICONS = ['❤️', '💌', '✨', '🫶', '💛']

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

/* Gentle hearts + sparkles rising gently from a source point */
function HeartsRise({
  trigger,
  count = 14,
  className = 'letter-hearts-rise',
}: {
  trigger: number
  count?: number
  className?: string
}) {
  const items = useMemo(() => {
    if (trigger <= 0) return []
    const rand = seededRandom(trigger * 7919 + 55813)
    return Array.from({ length: count }, (_, i) => ({
      id: `${trigger}-${i}`,
      emoji: RISE_ICONS[i % RISE_ICONS.length],
      sway: rand() * 130 - 65,
      lift: rand() * 130 + 160,
      rot: rand() * 40 - 20,
      size: rand() * 20 + 15,
      delay: rand() * 0.4,
    }))
  }, [trigger, count])

  if (trigger <= 0) return null

  return (
    <div className={className} aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.id}
          style={
            {
              fontSize: `${it.size}px`,
              ['--sway' as string]: `${it.sway}px`,
              ['--lift' as string]: `${it.lift}px`,
              ['--rot' as string]: `${it.rot}deg`,
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

function LetterPage({ onComplete }: LetterPageProps) {
  const [phase, setPhase] = useState<'intro' | 'envelope' | 'letter'>('intro')
  const [introLeaving, setIntroLeaving] = useState(false)
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [envelopeLeaving, setEnvelopeLeaving] = useState(false)
  const [btnGlow, setBtnGlow] = useState(false)
  const [openSpark, setOpenSpark] = useState(0)
  const [heartsKey, setHeartsKey] = useState(0)
  const [leavingPage, setLeavingPage] = useState(false)
  const timersRef = useRef<number[]>([])
  const mountedRef = useRef(true)
  const openFuseRef = useRef(false)
  const smileFuseRef = useRef(false)

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

  // OPEN MY LETTER 💌 → glow, sparkles, envelope unfolds, then the letter
  const handleOpen = useCallback(() => {
    if (openFuseRef.current) return
    openFuseRef.current = true
    setBtnGlow(true)
    setOpenSpark((n) => n + 1)
    setIntroLeaving(true)
    addTimer(() => setPhase('envelope'), 420)
    addTimer(() => setEnvelopeOpen(true), 940)
    addTimer(() => {
      setHeartsKey((k) => k + 1)
      setOpenSpark((n) => n + 1)
    }, 1300)
    addTimer(() => setEnvelopeLeaving(true), 2250)
    addTimer(() => setPhase('letter'), 2900)
  }, [addTimer])

  // READING THIS MADE YOU SMILE? → next page
  const handleSmile = useCallback(() => {
    if (smileFuseRef.current) return
    smileFuseRef.current = true
    setLeavingPage(true)
    addTimer(() => onComplete(), 750)
  }, [addTimer, onComplete])

  // Soft always-on floating hearts + sparkles across the page
  const ambient = useMemo(() => {
    const rand = seededRandom(24601)
    return Array.from({ length: 8 }, (_, i) => {
      const riff = i * 3 + 1
      return {
        id: i,
        left: rand() * 100,
        size: rand() * 13 + 12,
        delay: rand() * 8,
        duration: rand() * 7 + 11,
        sway: rand() * 90 - 45,
        emoji: AMBIENT_ICONS[(rand() > 0.45 ? 0 : riff) % AMBIENT_ICONS.length],
      }
    })
  }, [])

  return (
    <div
      className={`letter-page${phase === 'letter' ? ' letter-shown' : ''}${
        leavingPage ? ' leaving' : ''
      }`}
    >
      <div className="letter-bg" aria-hidden="true" />
      <div className="page-balloon-atmosphere dim" aria-hidden="true">
        <FloatingBalloons count={8} />
      </div>
      <div className="letter-glow" aria-hidden="true" />
      <div className="letter-ambient" aria-hidden="true">
        {ambient.map((h) => (
          <span
            key={h.id}
            className={`letter-ambient-icon${h.id % 4 === 0 ? ' letter-ambient-spark' : ''}`}
            style={
              {
                left: `${h.left}%`,
                fontSize: `${h.size}px`,
                animationDelay: `${h.delay}s`,
                animationDuration: `${h.duration}s`,
                ['--sway' as string]: `${h.sway}px`,
              } as React.CSSProperties
            }
          >
            {h.emoji}
          </span>
        ))}
      </div>
      <div className="letter-particles-layer">
        <AmbientParticles count={18} />
      </div>

      {/* ================= STEP 1 — TENDER INTRO ================= */}
      {phase === 'intro' && (
        <div className={`letter-intro${introLeaving ? ' is-leaving' : ''}`}>
          <div className="letter-intro-inner">
            <div className="letter-intro-emblem" aria-hidden="true">
              <span className="letter-intro-emoji">💌</span>
              <span className="letter-intro-spark">✨</span>
            </div>

            <h2 className="letter-intro-kicker">One last thing I want to tell you… ❤️</h2>
            <h3 className="letter-intro-title">Do you want to read a little message from me? 💌✨</h3>
            <p className="letter-intro-sub">Some things are easier to write than to say… 🥹</p>

            <div className="letter-intro-btn-wrap">
              <button
                className={`letter-open-btn${btnGlow ? ' is-glow' : ''}`}
                onClick={handleOpen}
              >
                <span className="letter-open-label">OPEN MY LETTER 💌</span>
              </button>
              {openSpark > 0 && <SparkleBurst trigger={openSpark} />}
              <HeartsRise trigger={openSpark} count={10} />
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2 — ENVELOPE OPENS ================= */}
      {phase === 'envelope' && (
        <div
          className={`letter-envelope-scene${envelopeOpen ? ' opened' : ''}${
            envelopeLeaving ? ' leaving' : ''
          }`}
        >
          <div className="envelope-backdrop" aria-hidden="true" />
          <div className="letter-envelope">
            <div className="envelope-insert" aria-hidden="true">
              <span className="envelope-insert-heart">❤️</span>
            </div>
            <div className="envelope-back" aria-hidden="true" />
            <div className="envelope-flap" aria-hidden="true" />
            <div className="envelope-pocket" aria-hidden="true" />
            <span className="envelope-seal" aria-hidden="true">❤️</span>
            <HeartsRise trigger={heartsKey} className="letter-hearts-rise envelope-hearts" />
            {openSpark > 1 && <SparkleBurst trigger={openSpark} />}
          </div>
        </div>
      )}

      {/* ================= STEP 3 — THE LETTER ================= */}
      {phase === 'letter' && (
        <section className="letter-paper">
          <span className="letter-corner lc-tl" aria-hidden="true">❤️</span>
          <span className="letter-corner lc-tr" aria-hidden="true">✨</span>
          <span className="letter-corner lc-bl" aria-hidden="true">💌</span>
          <span className="letter-corner lc-br" aria-hidden="true">🌷</span>
          <span className="letter-rose lr-1" aria-hidden="true">🌹</span>
          <span className="letter-rose lr-2" aria-hidden="true">🌹</span>
          <span className="letter-rose lr-3" aria-hidden="true">🌹</span>
          <div className="letter-seal" aria-hidden="true">❤️</div>

          {/* ════════════════════════════════════════════════════════
              ✍️  THE PERSONAL LETTER (written by the author)
              ════════════════════════════════════════════════════════ */}
          <div className="letter-scroll" role="region" aria-label="My letter to you">
            <p className="letter-greeting">Hello Nanbane… ❤️🫂</p>

            <p className="letter-line">
              Naan unakkaga indha letter type panni tharen… okay va? 🥹💌
            </p>

            <p className="letter-line">
              First first ah namma 2nd year IV pogumbodhu, lift-la naan
              unkitta “En back-la open ah irukku, theriyalaya?” nu ketten 😂😭
            </p>
            <p className="letter-line">
              Athukku nee onnum sollama thalaiya mattum asachitu irundha! 😭😂
            </p>
            <p className="letter-line">
              Appove naan nenachen… “Enna ivlo periya aal maari attitude
              kaamikuraan… romba attitude person pola!” nu 🤣🤦🏻‍♀️
            </p>
            <p className="letter-line">Aana apram ethukko naan unakku text pannen… 📱✨</p>
            <p className="letter-line">
              Appuram konjam konjama namma neraiya gossip pesa aarambichom 😂🤭
            </p>
            <p className="letter-line">Ethachum pannitu sirippom 🤣</p>
            <p className="letter-line">Neraiya vishayam share pannuvom 🫂❤️</p>

            <p className="letter-line letter-em">
              Apdiye konjam konjama close aagi… eppo namma best friends aanom
              nu theriyama, best friends aagitom. 🥹❤️🫶🏻
            </p>

            <p className="letter-line">Unna enakku romba pudikkum. ❤️</p>
            <p className="letter-line">
              Nee periya thappu pannalum kooda, unakku support panna thonra
              alavukku unna pudikkum. 🥹🫂
            </p>

            <p className="letter-line">
              Aana recent-ah neraiya problems nala namakkulla konjam sanda
              nadakuthu… 🥺💔
            </p>
            <p className="letter-line">
              Idhu evalo naal pogumnu enakkum theriyala… Aana mudinja varaikkum
              seekiram mudinjiduchuna nalla irukkum nu naan romba aasapadren. 🥹🤍
            </p>
            <p className="letter-line">
              Ippadi namakkulla sanda irukkuradhu enakku nijamave pudikala. 💔🫂
            </p>

            <p className="letter-line">
              Nee enakku neraiya ice cream vaangi thanthurukka 🍦😂❤️
            </p>
            <p className="letter-line">
              Naan enna ketalum mudinja varaikkum panni kuduppa… “No” nu romba
              easy-ah solla maata. 🥹🤍
            </p>
            <p className="letter-line">Nee romba supportive-ah iruppa. 🫂✨</p>
            <p className="letter-line">Unmaiya sollanumna, nee romba nalla paiyan. ❤️</p>
            <p className="letter-line">Ippadiye iru. 🥹🤍</p>

            <p className="letter-line">
              En birthday-ku enakku gift vaangi kuduthathukkum romba thanks! 🎁❤️🥹
            </p>
            <p className="letter-line">
              Adhu mattum illa… Ithuvuraikkum nee enakkaaga pannina ella
              help-kum, ella support-kum, ella little little things-kum… romba
              romba thanks. 🫂❤️✨
            </p>

            <h4 className="letter-wish-heading">MY WISH FOR YOU 🌙✨</h4>
            <p className="letter-line">
              Unakku pudichavanga kooda nee romba happy-ah, life long
              sirichikitte irukkanum. 🥹❤️
            </p>
            <p className="letter-line">
              Unakku pidicha maari oru beautiful life unakku kidaikkanum nu
              naan manasaara wish panren. 🤍✨
            </p>
            <p className="letter-line">Adhu nadakkanum nu naanum pray panren. 🙏🏻❤️</p>

            <p className="letter-line">Avlo thaan… 🥹🫂</p>
            <p className="letter-line">
              Perusa edhuvum illa…{' '}
              <span className="letter-em-inline">Nee happy-ah irundha podhum. ❤️</span>
            </p>
            <p className="letter-line">
              Thank you for being a part of my life, nanbane. 🫂❤️✨
            </p>
            <p className="letter-line letter-bday">Happy Birthday once again! 🎂🎉❤️</p>

            <div className="letter-sign">
              — Un friend,
              <span className="letter-sign-name">Sharmi ❤️🫶🏻</span>
            </div>
          </div>

          <div className="letter-footer">
            <div className="letter-smile-zone">
              <p className="letter-smile-q">Reading this made you smile? ❤️</p>
              <button className="letter-smile-btn" onClick={handleSmile}>
                LET'S KEEP GOING → ✨
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default LetterPage