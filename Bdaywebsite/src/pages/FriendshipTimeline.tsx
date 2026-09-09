import { useEffect, useMemo, useRef, useState } from 'react'
import type { ComponentType } from 'react'
import {
  Scene01,
  Scene02,
  Scene03,
  Scene04,
  Scene05,
  Scene06,
  Scene07,
} from '../components/timeline/MemoryScenes'
import './FriendshipTimeline.css'

interface FriendshipTimelineProps {
  onComplete: () => void
}

interface Memory {
  id: number
  icon: string
  title: string
  scene: ComponentType<{ animated?: boolean }>
  body: React.ReactNode
  detail?: React.ReactNode
  caption?: React.ReactNode
  animatedScene?: boolean
}

const CHAT_BUBBLES = [
  { text: 'One more gossip? 😂', side: 'left' },
  { text: 'Wait… I have something to tell you! 👀', side: 'right' },
  { text: '“Just 5 minutes…” → 2 hours later 🤣', side: 'center' },
]

const CLOSER_LABELS = [
  { icon: '🎬', label: 'Reels' },
  { icon: '📸', label: 'Random Pictures' },
  { icon: '🚌', label: 'Industrial Visit' },
  { icon: '😂', label: 'Endless Laughter' },
]

const FUNNY_CAPTIONS = [
  'Teasing mode: ON 😈',
  'Your reaction = My entertainment 😂',
  'Fight? What fight? We\'re fine! 🤝🤣',
]

const MEMORIES: Memory[] = [
  {
    id: 0,
    icon: '🎓',
    title: 'The Day We Met',
    scene: Scene01,
    body: (
      <>
        It all started here… at college. 🎓
        <br />
        <br />
        Funny thing is, that day I didn&apos;t even know who you were. You were just another person in the
        crowd, and I had no idea that one day you would become such an important part of my life.
      </>
    ),
    detail: (
      <span className="ft-detail-text">📍 College — Where our story quietly began</span>
    ),
  },
  {
    id: 1,
    icon: '📱',
    title: 'The Beginning of Our Friendship',
    scene: Scene02,
    body: (
      <>
        Then came the mobile phone chats… 📱
        <br />
        <br />
        At first, it was just normal conversations. But slowly, those random messages turned into long chats,
        gossip sessions, silly conversations, and talking about absolutely everything. 😂
        <br />
        <br />
        Somewhere between all those messages, our friendship started becoming something special.
      </>
    ),
    caption: (
      <div className="ft-chat-bubbles" aria-label="floating chat bubbles">
        {CHAT_BUBBLES.map((b, i) => (
          <span
            key={i}
            className={`ft-chat is-${b.side}`}
          >
            {b.text}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: 2,
    icon: '🎢',
    title: 'Our First Special Memory',
    scene: Scene03,
    body: (
      <>
        Wonderla… 🎢🤍
        <br />
        <br />
        3rd year, college IV — and honestly one of the craziest days ever. We laughed, screamed on every
        ride, went completely crazy, and just had so much fun.
        <br />
        <br />
        Looking back, it wasn&apos;t just a trip… it became our first really special memory. My favourite
        kind of day. 💛
      </>
    ),
    caption: (
      <span className="ft-caption">“Some days become memories. Some memories become forever. ♾️”</span>
    ),
  },
  {
    id: 3,
    icon: '🚌',
    title: 'The Moment We Became Closer',
    scene: Scene04,
    body: (
      <>
        Somewhere along the way, we stopped being just college friends and became much closer. 🫂
        <br />
        <br />
        Our industrial visit, taking random pictures, making reels, laughing at silly things, and spending
        more time together slowly made our bond stronger.
      </>
    ),
    caption: (
      <div className="ft-closer">
        <div className="ft-closer-labels">
          {CLOSER_LABELS.map((l, i) => (
            <span className="ft-closer-label" key={i}>
              <span className="ft-closer-ico">{l.icon}</span> {l.label}
            </span>
          ))}
        </div>
        <span className="ft-caption">More memories. More laughter. A much stronger bond.</span>
      </div>
    ),
  },
  {
    id: 4,
    icon: '😂',
    title: 'The Funniest Period',
    scene: Scene05,
    body: (
      <>
        Honestly… one of my favourite things is teasing you. 😂
        <br />
        <br />
        I&apos;ll find the smallest thing and somehow turn it into a whole conversation just to annoy you.
        And your reactions? Even better. 🤣
        <br />
        <br />
        Our friendship has its own language — random teasing, silly fights, making fun of each other, and
        laughing five minutes later like nothing happened.
      </>
    ),
    caption: (
      <div className="ft-funny">
        {FUNNY_CAPTIONS.map((c, i) => (
          <span className="ft-funny-chip" key={i}>
            {c}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: 5,
    icon: '🌊',
    title: 'A Moment I\u2019ll Never Forget',
    scene: Scene06,
    animatedScene: true,
    body: (
      <>
        Kanyakumari, then Muttom Beach… 🌊✨
        <br />
        <br />
        Kanyakumari — the tip of India — and then your place at Dafi&apos;s house in Muttom. That whole
        outing felt genuinely special: the conversations, the laughs, the sea, just going out together and
        creating memories without even realising how precious they were.
        <br />
        <br />
        A simple plan. A beautiful place. A day I&apos;ll always keep. 🤍
      </>
    ),
    caption: (
      <span className="ft-caption">
        “No big plans. No special reason. Just us, a beautiful place, and a memory I&apos;ll always keep. 🌊🤍”
      </span>
    ),
  },
  {
    id: 6,
    icon: '♾️',
    title: 'Where We Are Today',
    scene: Scene07,
    body: (
      <>
        Look how far we&apos;ve come… 🥹🤍
        <br />
        <br />
        From two people who didn&apos;t even know each other to two friends who now have countless
        conversations, jokes, memories, outings, reels, teasing moments, and stories that only we understand.
        <br />
        <br />
        We may not know what the future holds, or where life will take us after college… but I&apos;m really
        glad that somewhere along the way, our paths crossed.
        <br />
        <br />
        From strangers <span className="ft-arrow">→</span> friends <span className="ft-arrow">→</span> close
        friends <span className="ft-arrow">→</span> a collection of memories I never want to forget. 🫂♾️
      </>
    ),
    caption: (
      <span className="ft-caption">
        And honestly… this timeline isn&apos;t the end. There are still so many memories waiting to be added. 🤍✨
      </span>
    ),
  },
]

function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function FriendshipTimeline({ onComplete }: FriendshipTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [progress, setProgress] = useState(0)

  const floaters = useMemo(() => {
    const d = ['🤍', '✨', '📸', '💬', '🌟', '🎈', '💫', '🫶']
    return Array.from({ length: 12 }, (_, i) => {
      const left = (i * 83) % 100
      const size = 14 + ((i * 37) % 18)
      const duration = 12 + ((i * 53) % 10)
      const delay = (i * 2.3) % 9
      return { id: i, emoji: d[i % d.length], left, size, duration, delay }
    })
  }, [])

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 60)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return
    const progressEl = root.querySelector('.ft-progress')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const p = entry.intersectionRatio
            setProgress((prev) => Math.max(prev, p))
          }
        })
      },
      { threshold: [0.1, 0.3, 0.5, 0.7, 0.9] },
    )
    if (progressEl) observer.observe(progressEl)
    return () => observer.disconnect()
  }, [])

  const handleContinue = () => {
    if (leaving) return
    setLeaving(true)
    window.setTimeout(onComplete, 850)
  }

  return (
    <div
      ref={rootRef}
      className={`ft-page${ready ? ' is-ready' : ''}${leaving ? ' is-leaving' : ''}`}
    >
      {/* background — warm cream scrapbook */}
      <div className="ft-bg" aria-hidden="true" />
      <div className="ft-paper-noise" aria-hidden="true" />
      <div className="ft-stars" aria-hidden="true">
        {floaters.map((f) => (
          <span
            key={f.id}
            style={{
              left: `${f.left}%`,
              fontSize: `${f.size}px`,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
            }}
          >
            {f.emoji}
          </span>
        ))}
      </div>

      {/* top progress ribbon */}
      <div className={`ft-progress-wrap${ready ? ' is-in' : ''}`}>
        <div className="ft-progress" style={{ width: `${6 + progress * 94}%` }} />
      </div>

      {/* ══════════ HERO HEADER ══════════ */}
      <header className="ft-hero">
        <span className="ft-hero-spark ft-hero-spark-a" aria-hidden="true">⭐</span>
        <span className="ft-hero-spark ft-hero-spark-b" aria-hidden="true">🤍</span>
        <span className="ft-hero-spark ft-hero-spark-c" aria-hidden="true">✨</span>
        <p className="ft-hero-kicker">a little story about us</p>
        <h1 className="ft-hero-title">
          <span className="ft-hero-clock">🕰️</span>
          Our Friendship Timeline
          <span className="ft-hero-heart">🤍</span>
        </h1>
        <p className="ft-hero-sub">
          From complete strangers… to two people who became best friends. One memory at a time. 💫
        </p>
        <div className="ft-hero-rule" aria-hidden="true">
          <span className="ft-hero-rule-core" />
        </div>
        <a className="ft-hero-scroll" href="#ft-mem-0">
          <span className="ft-hero-scroll-hint">scroll through our story</span>
          <span className="ft-hero-scroll-arrow" aria-hidden="true">↓</span>
        </a>
      </header>

      {/* ══════════ TIMELINE ══════════ */}
      <main className="ft-timeline">
        {MEMORIES.map((m, i) => (
          <TimelineRow key={m.id} memory={m} index={i} />
        ))}

        {/* to-be-continued ending */}
        <TimelineEnd />
      </main>

      {/* ══════════ END CTA ══════════ */}
      <footer className="ft-end-cta">
        <button type="button" className="ft-continue-btn" onClick={handleContinue}>
          <span className="ft-continue-label">This story is still being written… 🤍✨</span>
        </button>
      </footer>
    </div>
  )
}

function TimelineRow({ memory, index }: { memory: Memory; index: number }) {
  const { ref, inView } = useInView<HTMLElement>(0.15)
  const side = index % 2 === 0 ? 'left' : 'right'
  const Scene = memory.scene
  const photoParallax = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = photoParallax.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.setProperty('--parallax', `${entry.intersectionRatio - 0.5}px`)
          }
        })
      },
      { threshold: Array.from({ length: 10 }, (_, k) => k / 10) },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={`ft-mem-${index}`}
      ref={ref}
      className={`ft-row is-${side}${inView ? ' is-in' : ''}`}
    >
      {/* the timeline dot + vertical line live in .ft-row::before handled by container */}
      <div className="ft-node" aria-hidden="true">
        <span className="ft-node-core">{memory.icon}</span>
      </div>

      <article className="ft-card">
        <span className={`ft-tape ft-tape-${side}`} aria-hidden="true" />
        <span className="ft-number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* AI-generated photo */}
        <div className="ft-photo" ref={photoParallax}>
          <div className="ft-photo-inner">
            <Scene animated={memory.animatedScene} />
          </div>
          <span className="ft-polaroid-corner ft-polaroid-corner-a" aria-hidden="true">🤍</span>
          <span className="ft-polaroid-corner ft-polaroid-corner-b" aria-hidden="true">✨</span>
        </div>

        <div className="ft-card-body">
          <div className="ft-card-head">
            <span className="ft-card-icon" aria-hidden="true">{memory.icon}</span>
            <h3 className="ft-card-title">{memory.title}</h3>
          </div>
          <p className="ft-card-text">{memory.body}</p>
          {memory.detail && <div className="ft-detail">{memory.detail}</div>}
          {memory.caption && <div className="ft-captions">{memory.caption}</div>}
          <div className="ft-sig" aria-hidden="true">
            <span className="ft-sig-line" />
            <span className="ft-sig-heart">🤍</span>
            <span className="ft-sig-line" />
          </div>
        </div>
      </article>
    </section>
  )
}

function TimelineEnd() {
  const { ref, inView } = useInView<HTMLElement>(0.2)
  return (
    <section ref={ref} className={`ft-end${inView ? ' is-in' : ''}`}>
      <div className="ft-end-node" aria-hidden="true">
        <span>♾️</span>
      </div>
      <div className="ft-end-line" aria-hidden="true">
        <span className="ft-end-dash" />
        <span className="ft-end-dot" />
        <span className="ft-end-dash" />
        <span className="ft-end-dot" />
        <span className="ft-end-dot last" />
      </div>
      <p className="ft-end-text">
        To be continued… <span className="ft-end-arrow">→</span> <span className="ft-end-infinity">♾️</span>
      </p>
      <p className="ft-end-note">some stories never really end 🤍✨</p>
    </section>
  )
}

export default FriendshipTimeline
