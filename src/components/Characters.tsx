import type { ReactElement } from 'react'
import type { CharacterData } from '../data/characters'

export interface CharacterSceneProps {
  character: CharacterData
  revealed: boolean
  interacted: boolean
}

const commonDefs = (
  accent: string,
  secondary: string,
) => (
  <>
    <radialGradient id="char-glow" cx="50%" cy="30%" r="80%">
      <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
      <stop offset="60%" stopColor={accent} stopOpacity="0.08" />
      <stop offset="100%" stopColor="transparent" />
    </radialGradient>
    <linearGradient id="char-floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={secondary} stopOpacity="0.25" />
      <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
    </linearGradient>
    <filter id="char-soft">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </>
)

export function SpiderScene({ revealed, interacted }: CharacterSceneProps) {
  const voterId = 'spider'
  return (
    <svg viewBox="0 0 400 500" className="char-svg char-svg-spider" preserveAspectRatio="xMidYMid meet">
      <defs>
        {commonDefs('#e83030', '#1a40c0')}
        <linearGradient id={`${voterId}-suit`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff3b3b" />
          <stop offset="60%" stopColor="#c81a1a" />
          <stop offset="100%" stopColor="#8f0f14" />
        </linearGradient>
        <linearGradient id={`${voterId}-blue`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1f5ce0" />
          <stop offset="100%" stopColor="#0d2f9c" />
        </linearGradient>
        <radialGradient id={`${voterId}-eye`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f0f6ff" />
          <stop offset="100%" stopColor="#bfd4ff" />
        </radialGradient>
        <filter id={`${voterId}-soft`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <linearGradient id={`${voterId}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1030" />
          <stop offset="55%" stopColor="#19123f" />
          <stop offset="100%" stopColor="#241442" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="400" height="500" fill={`url(#${voterId}-sky)`} />

      {/* Moon glow */}
      <circle cx="320" cy="80" r="60" fill={`url(#char-glow)`} />
      <circle cx="320" cy="80" r="16" fill="#ffd9a0" opacity="0.8" />
      <circle cx="316" cy="76" r="3" fill="#d9a870" opacity="0.6" />

      {/* Skyline */}
      <g opacity="0.7">
        {[
          [0, 300, 40, 200], [48, 240, 55, 260], [112, 320, 36, 180],
          [156, 200, 60, 300], [226, 290, 44, 210], [278, 230, 56, 270],
          [342, 310, 40, 190],
        ].map(([x, y, w, h], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill="#0d1033" />
            <line x1={x} y1={y} x2={x + w} y2={y} stroke={`#1a2060`} strokeWidth="1.5" />
          </g>
        ))}
      </g>

      {/* Lit windows */}
      <g opacity="0.5">
        {[46, 126, 156].map((bx) =>
          [0, 1, 2].map((row) =>
            [0, 1].map((col) => (
              <rect
                key={`${bx}${row}${col}`}
                x={bx + 10 + col * 18}
                y={255 + row * 26}
                width="6"
                height="8"
                fill="#ffd86e"
              />
            ))
          )
        )}
      </g>

      {/* Rooftop edge */}
      <rect x="90" y="348" width="230" height="12" rx="4" fill="#0a0d28" />
      <rect x="80" y="356" width="250" height="144" fill="#06081d" />

      {/* Breathing web strands from hand */}
      <g className="char-web-strands" opacity="0.65">
        <line x1="108" y1="230" x2="40" y2="120" stroke="#cfd8ff" strokeWidth="1.6" opacity="0.5" />
        <line x1="100" y1="242" x2="16" y2="180" stroke="#cfd8ff" strokeWidth="1.2" opacity="0.35" />
        <line x1="116" y1="222" x2="70" y2="90" stroke="#cfd8ff" strokeWidth="1" opacity="0.3" />
      </g>

      {/* Body */}
      <g className="char-breath">
        {/* Legs */}
        <g fill={`url(#${voterId}-blue)`}>
          <path d="M175 330 q-6 55 2 78 q8 16 24 14 l30-6 q10-2 12-12 q3-14 -4-58 q-4-22 -16-30 z" />
          <path d="M235 330 q10 55 16 80 q5 16 22 16 l30 0 q12 0 12-14 q0-14 -12-58 q-6-22 -18-28 z" opacity="0.9" />
        </g>
        {/* Boots */}
        <ellipse cx="205" cy="424" rx="30" ry="10" fill="#0c0e24" />
        <ellipse cx="283" cy="428" rx="30" ry="10" fill="#0c0e24" />

        {/* Arm forward (right) */}
        <path d="M256 236 q44 6 64 30 q10 12 6 22 q-6 14 -24 12 q-34 -6 -58 -26 q-14 -13 -14 -22 q0 -10 26 -16 z" fill={`url(#${voterId}-blue)`} />
        {/* Hand web-shooter */}
        <circle cx="292" cy="266" r="8" fill="#0d0f26" />
        <circle cx="290" cy="252" r="5" fill="#ffda6a" />

        {/* Back arm */}
        <path d="M152 250 q-6 0 -8 10 q-3 12 12 20 q30 16 48 8 q10 -5 4 -14 q-8 -12 -30 -20 q-13 -5 -26 -4 z" fill="#b3151c" />

        {/* Torso */}
        <path d="M158 172 q-8 20 2 60 q8 32 24 44 q6 5 12 0 q16 -12 26 -44 q10 -38 2 -62 q-18 -10 -66 2 z" fill={`url(#${voterId}-suit)`} />
        {/* Waist red/blue separation */}
        <path d="M186 264 q12 6 26 0 q8 -4 8 -12 l0 -46 q0 -8 -10 -10 q-10 0 -16 10 l-4 40 q2 12 -4 18 z" fill="#c81a1a" />
        <path d="M186 278 q12 5 26 2 q14 -3 16 -16 q1 -8 -2 -12 q-12 6 -26 6 q-12 0 -16 -2 q-2 12 2 22 z" fill={`url(#${voterId}-suit)`} />

        {/* Web pattern on torso */}
        <g stroke="#5c1010" strokeWidth="1" fill="none" opacity="0.8">
          <path d="M164 190 q20 10 40 8 q18 -2 28 -6" />
          <path d="M162 212 q22 12 44 10 q18 -2 30 -8" />
          <path d="M170 236 q18 10 38 8 q16 -2 26 -8" />
        </g>

        {/* Spider emblem */}
        <g transform="translate(200 232)" fill="#0a0c20">
          <circle cx="0" cy="0" r="7" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
            <line key={i} x1="0" y1="-4" x2={Math.cos((a * Math.PI) / 180) * 16} y2={-4 + Math.sin((a * Math.PI) / 180) * 16} stroke="#0a0c20" strokeWidth="2" />
          ))}
        </g>

        {/* Head */}
        <g className="char-head">
          <path d="M172 172 q0 -34 14 -44 q12 -8 28 -8 q16 0 28 8 q14 10 14 44 q0 16 -6 24 q-10 12 -36 12 q-26 0 -36 -12 q-6 -8 -6 -24 z" fill={`url(#${voterId}-suit)`} />
          {/* Eye lenses */}
          <g className="char-eyes">
            <path d="M182 158 q8 -12 18 -8 q8 3 4 14 q-2 6 -10 8 q-12 2 -14 -6 q0 -4 2 -8 z" fill={`url(#${voterId}-eye)`} />
            <path d="M212 152 q16 -12 26 -6 q8 5 2 14 q-8 10 -18 8 q-10 -2 -12 -10 q0 -4 2 -6 z" fill={`url(#${voterId}-eye)`} />
          </g>
          {/* Mask web lines */}
          <g stroke="#8c0e12" strokeWidth="0.8" fill="none" opacity="0.7">
            <path d="M170 138 q30 8 60 0" />
            <path d="M168 148 q32 8 64 0" />
          </g>
        </g>
      </g>

      {/* Interactive web + gift */}
      <g className={`char-interact object-object${interacted ? ' object-reacted' : ''}${revealed ? ' object-revealed' : ''}`} style={{ transformOrigin: '330px 330px' }}>
        <circle cx="330" cy="330" r="34" fill="transparent" stroke="#cfd8ff" strokeWidth="1" opacity="0.5" />
        <g stroke="#cfd8ff" strokeWidth="1" opacity="0.7">
          <line x1="330" y1="296" x2="330" y2="364" />
          <line x1="296" y1="330" x2="364" y2="330" />
          <line x1="306" y1="306" x2="354" y2="354" />
          <line x1="354" y1="306" x2="306" y2="354" />
        </g>
        <circle cx="330" cy="330" r="12" fill="none" stroke="#ffffff" strokeWidth="1.4" opacity="0.9">
          <animate attributeName="r" values="12;16;12" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="330" cy="330" r="5" fill="#ffd86e">
          <animate attributeName="r" values="5;7;5" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Glow floor */}
      <ellipse cx="200" cy="450" rx="120" ry="20" fill={`url(#char-floor)`} />
    </svg>
  )
}

export function HulkScene({ revealed, interacted }: CharacterSceneProps) {
  const voterId = 'hulk'
  return (
    <svg viewBox="0 0 400 500" className="char-svg char-svg-hulk" preserveAspectRatio="xMidYMid meet">
      <defs>
        {commonDefs('#30c040', '#8040c0')}
        <linearGradient id={`${voterId}-skin`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4cc85c" />
          <stop offset="55%" stopColor="#2f9e40" />
          <stop offset="100%" stopColor="#1c6b2c" />
        </linearGradient>
        <linearGradient id={`${voterId}-pants`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5a2a86" />
          <stop offset="100%" stopColor="#301850" />
        </linearGradient>
        <radialGradient id={`${voterId}-dramatic`} cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#3cff6a" stopOpacity="0.18" />
          <stop offset="55%" stopColor="#18a83c" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="500" fill={`url(#${voterId}-dramatic)`} />
      <rect width="400" height="500" fill="#071407" />

      {/* Cinematic spotlight */}
      <circle cx="180" cy="180" r="150" fill={`url(#char-glow)`} />

      {/* Ground rubble */}
      <ellipse cx="200" cy="440" rx="170" ry="46" fill="#0a1a0d" />
      <g fill="#123018">
        <polygon points="40,438 90,420 120,442 100,452 50,452" />
        <polygon points="290,440 350,424 378,440 350,452 300,452" />
        <polygon points="150,450 200,436 240,450 210,456 170,456" />
      </g>

      {/* Body */}
      <g className="char-breath" style={{ transformOrigin: '200px 430px' }}>
        {/* Legs */}
        <g fill={`url(#${voterId}-pants)`}>
          <path d="M182 330 q-4 44 2 70 q4 20 20 22 l8 0 q14 0 18 -14 q4 -16 0 -70 q-2 -22 -14 -28 z" />
          <path d="M240 330 q2 44 10 70 q6 20 22 20 l6 0 q14 0 16 -14 q2 -16 -6 -70 q-4 -22 -16 -28 z" opacity="0.92" />
        </g>
        {/* Torn pants at knees */}
        <g fill={`url(#${voterId}-pants)`} opacity="0.85">
          <path d="M196 392 l-7 6 2 12 9 -8 z" />
          <path d="M260 386 l7 8 -2 12 -9 -9 z" />
        </g>
        {/* Boots */}
        <ellipse cx="212" cy="436" rx="34" ry="12" fill="#0d1a10" />
        <ellipse cx="282" cy="438" rx="34" ry="12" fill="#0d1a10" />

        {/* Arms (huge) */}
        <g>
          <path d="M120 210 q-16 -12 -22 18 q-6 34 10 64 q14 26 40 24 q8 -1 8 -10 q0 -7 -6 -14 q-18 -22 -22 -44 q-4 -22 2 -34 z" fill={`url(#${voterId}-skin)`} />
          <circle cx="168" cy="292" r="17" fill="none" stroke="#1c6b2c" strokeWidth="2" opacity="0.5" />
          <circle cx="168" cy="292" r="10" fill="#2f9e40" />
        </g>
        <g>
          <path d="M286 204 q18 -6 24 20 q7 34 -8 66 q-12 28 -38 26 q-8 -1 -8 -10 q0 -7 7 -14 q18 -20 21 -44 q3 -24 -4 -38 z" fill={`url(#${voterId}-skin)`} />
          <circle cx="258" cy="300" r="18" fill="none" stroke="#1c6b2c" strokeWidth="2" opacity="0.5" />
        </g>
        {/* First: fists */}
        <circle cx="162" cy="304" r="22" fill={`url(#${voterId}-skin)`} />
        <circle cx="268" cy="308" r="22" fill={`url(#${voterId}-skin)`} />

        {/* Torso */}
        <path d="M142 150 q-10 60 2 106 q10 38 30 50 q6 4 12 0 q20 -12 30 -50 q12 -46 2 -106 q-10 -32 -38 -36 q-28 4 -38 36 z" fill={`url(#${voterId}-skin)`} />
        {/* Pec lines */}
        <path d="M158 186 q40 20 82 0" stroke="#1c6b2c" strokeWidth="3" fill="none" opacity="0.6" />
        <path d="M200 200 l0 26" stroke="#1c6b2c" strokeWidth="3" opacity="0.5" />
        <path d="M160 230 q40 18 80 0" stroke="#1c6b2c" strokeWidth="2.5" fill="none" opacity="0.5" />
        {/* Abs */}
        <path d="M188 256 q12 6 24 0" stroke="#1c6b2c" strokeWidth="2.5" fill="none" opacity="0.5" />

        {/* Head */}
        <g className="char-head">
          <path d="M150 128 q2 -30 16 -42 q10 -9 34 -9 q24 0 34 9 q14 12 16 42 q2 28 -6 22 q-8 -4 -16 -12 q-10 8 -28 8 q-18 0 -28 -8 q-8 8 -16 12 q-8 6 -6 -22 z" fill={`url(#${voterId}-skin)`} />
          {/* Brow */}
          <path d="M156 116 q44 -12 88 0" stroke="#12301a" strokeWidth="5" fill="none" />
          {/* Eyes */}
          <g className="char-eyes">
            <ellipse cx="176" cy="130" rx="9" ry="11" fill="#04160a" />
            <ellipse cx="224" cy="130" rx="9" ry="11" fill="#04160a" />
          </g>
        </g>
      </g>

      {/* Interactive gem */}
      <g className={`char-interact${interacted ? ' object-reacted' : ''}${revealed ? ' object-revealed' : ''}`} style={{ transformOrigin: '330px 300px' }}>
        <circle cx="330" cy="300" r="42" fill={`url(#char-glow)`} opacity="0.8" />
        <path d="M308 294 l22 -30 22 30 q-6 22 -22 26 q-16 -4 -22 -26 z" fill="#9dffd0">
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M316 290 l14 -18 14 18 q-6 12 -14 14 q-8 -2 -14 -14 z" fill="#28ff7a" />
      </g>

      {/* Float particles */}
      <g fill="#4cff7a" opacity="0.5">
        {[[60, 120], [350, 90], [40, 320], [370, 260], [90, 60], [330, 420]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2 + (i % 2)}>
            <animate attributeName="cy" values={`${y};${y - 18};${y}`} dur={`${3 + i}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur={`${3 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      <ellipse cx="200" cy="452" rx="150" ry="18" fill={`url(#char-floor)`} />
    </svg>
  )
}

export function ElevenScene({ revealed, interacted }: CharacterSceneProps) {
  const voterId = 'eleven'
  return (
    <svg viewBox="0 0 400 500" className="char-svg char-svg-eleven" preserveAspectRatio="xMidYMid meet">
      <defs>
        {commonDefs('#ff6030', '#30c0ff')}
        <linearGradient id={`${voterId}-hoodie`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cf6038" />
          <stop offset="100%" stopColor="#7c2e12" />
        </linearGradient>
        <radialGradient id={`${voterId}-neon`} cx="70%" cy="85%" r="70%">
          <stop offset="0%" stopColor="#24e0ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Room bg */}
      <rect width="400" height="500" fill={`url(#${voterId}-neon)`} />
      <rect width="400" height="500" fill="#0e0a22" />

      {/* Wall panels */}
      <rect x="20" y="40" width="160" height="420" fill="#150f30" stroke="#241a4a" strokeWidth="3" />
      <rect x="190" y="40" width="80" height="420" fill="#121030" stroke="#241a4a" strokeWidth="3" />
      <rect x="280" y="40" width="100" height="420" fill="#14102e" stroke="#241a4a" strokeWidth="3" />

      {/* Neon sign */}
      <text x="200" y="90" textAnchor="middle" fontSize="30" letterSpacing="6" fill="#24e0ff" opacity="0.9" fontFamily="'Courier New', monospace">
        ARCADE
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.4s" repeatCount="indefinite" />
      </text>

      {/* CRT arcade cabinet */}
      <g transform="translate(60 150)">
        <rect x="0" y="0" width="110" height="150" rx="12" fill="#1c1440" stroke="#3a2a70" strokeWidth="2" />
        <rect x="14" y="14" width="82" height="64" rx="6" fill="#040510" stroke="#5a4aa0" strokeWidth="2" />
        <g fill="#ff2e6e">
          <rect x="20" y="20" width="24" height="10" />
          <rect x="50" y="22" width="26" height="12" />
        </g>
        <g fill="#24e0ff" opacity="0.9">
          <rect x="20" y="36" width="14" height="8" />
          <rect x="56" y="40" width="20" height="6" />
        </g>
        <rect x="30" y="96" width="50" height="18" rx="4" fill="#241a50" stroke="#3a2a70" strokeWidth="1.5" />
        <circle cx="46" cy="105" r="4" fill="#ff2e6e" />
        <circle cx="66" cy="105" r="4" fill="#ff2e6e" />
      </g>

      {/* Couch */}
      <rect x="150" y="360" width="180" height="80" rx="16" fill="#33206a" stroke="#4a3380" strokeWidth="2" />
      <rect x="156" y="336" width="26" height="50" rx="10" fill="#33206a" />
      <rect x="298" y="336" width="26" height="50" rx="10" fill="#33206a" />
      <rect x="176" y="336" width="102" height="24" rx="10" fill="#2a1a58" />

      {/* Christmas lights */}
      <g>
        {[30, 80, 130, 180, 230, 280, 330, 375].map((x, i) => (
          <circle key={i} cx={x} cy="52" r="4" fill={i % 2 ? '#ffd24a' : '#ff5060'}>
            <animate attributeName="opacity" values="1;0.2;1" dur={`${1.6 + (i % 3)}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* Character */}
      <g className="char-breath" style={{ transformOrigin: '220px 430px' }}>
        {/* Legs */}
        <path d="M196 360 q-6 20 -4 44 q0 14 10 16 l14 0 q12 0 14 -14 q2 -20 -2 -46 q-2 -16 -14 -16 z" fill="#24306a" />
        <path d="M244 360 q6 20 4 44 q0 12 -8 14 l-12 0 q-12 0 -14 -12 q-2 -20 2 -46 q2 -16 14 -16 z" fill="#1c2858" />
        {/* Shoes */}
        <rect x="188" y="422" width="40" height="12" rx="6" fill="#14204c" />
        <rect x="226" y="422" width="40" height="12" rx="6" fill="#101a40" />

        {/* Torso hoodie */}
        <path d="M174 220 q-8 40 -4 76 q2 22 16 28 q16 7 34 0 q14 -6 16 -28 q4 -36 -4 -76 q-6 -34 -31 -38 q-25 4 -27 38 z" fill={`url(#${voterId}-hoodie)`} />
        {/* Hood */}
        <path d="M172 214 q2 -8 28 -8 q26 0 28 8 l-4 12 -24 -4 -24 4 z" fill="#a84a24" />
        {/* Front pocket-ish */}
        <path d="M196 284 q24 12 48 0 q-2 14 -24 16 q-22 -2 -24 -16 z" fill="#8c3414" />

        {/* Arms */}
        <path d="M174 232 q-20 10 -22 34 q0 18 14 22 q8 2 12 -6 q2 -20 6 -38 q2 -12 -10 -12 z" fill={`url(#${voterId}-hoodie)`} />
        {/* Fist (determined) */}
        <circle cx="168" cy="296" r="9" fill="#d9b08c" />
        <path d="M206 232 q20 10 24 34 q2 18 -12 22 q-8 2 -12 -6 q-4 -18 -8 -38 q-2 -12 8 -12 z" fill="#a84a24" />

        {/* Neck */}
        <rect x="206" y="196" width="28" height="22" rx="8" fill="#d9b08c" />

        {/* Head */}
        <g className="char-head">
          <path d="M188 190 q0 -26 8 -34 q10 -10 32 -8 q18 2 26 12 q4 8 0 22 q-6 16 -14 10 q-14 -8 -38 0 q-14 6 -14 -2 z" fill="#d9b08c" />
          {/* Short buzz hair */}
          <path d="M192 150 l34 0 q6 0 8 6 q-4 14 -12 22 q-18 6 -30 -6 q-6 -8 -6 -22 z" fill="#241c10" />
          {/* Eyes - kitkat about face size */}
          <g className="char-eyes">
            <circle cx="214" cy="176" r="4" fill="#1c1416" />
            <circle cx="244" cy="170" r="4" fill="#1c1416" />
          </g>
        </g>
      </g>

      {/* Interactive arcade joystick / eggo gift */}
      <g className={`char-interact${interacted ? ' object-reacted' : ''}${revealed ? ' object-revealed' : ''}`} style={{ transformOrigin: '320px 340px' }}>
        <circle cx="322" cy="340" r="40" fill={`url(#char-glow)`} opacity="0.8" />
        {/* Gift eggo-style */}
        <rect x="300" y="322" width="44" height="34" rx="6" fill="#ffb020" stroke="#e08810" strokeWidth="2" />
        <line x1="322" y1="322" x2="322" y2="356" stroke="#ffd86e" strokeWidth="3" />
        <rect x="300" y="330" width="44" height="6" fill="#ffd86e" opacity="0.8" />
        <rect x="304" y="314" width="10" height="10" rx="3" fill="#ffd86e" />
        <rect x="330" y="314" width="10" height="10" rx="3" fill="#ffd86e" />
        <circle cx="322" cy="322" r="6" fill="#ffffff" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.2s" repeatCount="indefinite" />
        </circle>
      </g>

      <ellipse cx="220" cy="444" rx="130" ry="16" fill={`url(#char-floor)`} />
    </svg>
  )
}

export function MaxScene({ revealed, interacted }: CharacterSceneProps) {
  const voterId = 'max'
  return (
    <svg viewBox="0 0 400 500" className="char-svg char-svg-max" preserveAspectRatio="xMidYMid meet">
      <defs>
        {commonDefs('#ff4060', '#ff8030')}
        <linearGradient id={`${voterId}-pants`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2030" />
          <stop offset="100%" stopColor="#140d18" />
        </linearGradient>
        <linearGradient id={`${voterId}-shirt`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff6a5a" />
          <stop offset="100%" stopColor="#b03a30" />
        </linearGradient>
        <radialGradient id={`${voterId}-sunset`} cx="70%" cy="20%" r="85%">
          <stop offset="0%" stopColor="#ff9a44" stopOpacity="0.3" />
          <stop offset="45%" stopColor="#e04a5a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Dusk sky */}
      <rect width="400" height="500" fill="#1c0e1a" />
      <rect width="400" height="500" fill={`url(#${voterId}-sunset)`} />

      {/* Sun low */}
      <circle cx="300" cy="200" r="55" fill="#ff7a3a" opacity="0.35" />
      <circle cx="300" cy="200" r="30" fill="#ffb060" opacity="0.5" />

      {/* Fence (hawkins-ish bikeshed vibe) */}
      <g stroke="#3a2028" strokeWidth="6">
        <line x1="0" y1="360" x2="400" y2="360" />
        <line x1="0" y1="330" x2="400" y2="330" opacity="0.7" />
        {[30, 90, 150, 210, 270, 330, 390].map((x, i) => (
          <line key={i} x1={x} y1="300" x2={x} y2="360" opacity="0.5" />
        ))}
      </g>

      {/* Ground */}
      <rect x="0" y="360" width="400" height="140" fill="#241016" />

      {/* Character */}
      <g className="char-breath" style={{ transformOrigin: '200px 430px' }}>
        {/* Legs jeans */}
        <g fill={`url(#${voterId}-pants)`}>
          <path d="M176 344 q-8 30 -6 58 q0 16 12 20 l16 4 q14 0 16 -14 q3 -26 -2 -58 q-3 -24 -16 -26 q-10 0 -20 16 z" />
          <path d="M240 344 q2 30 6 58 q4 16 14 18 l14 0 q14 -2 16 -16 q2 -26 -4 -58 q-4 -24 -16 -26 q-8 -2 -18 14 z" />
        </g>
        {/* Boots (red high-tops) */}
        <path d="M166 424 q0 10 8 12 l28 4 q12 0 12 -10 q0 -8 -10 -8 l-24 -2 q-14 -2 -14 4 z" fill="#b03028" />
        <path d="M250 424 q0 10 -6 12 l-26 4 q-12 0 -12 -10 q0 -8 10 -8 l24 -2 q14 -2 10 4 z" fill="#9a241e" opacity="0.9" />

        {/* Torso shirt */}
        <path d="M166 220 q-10 44 -6 82 q3 26 18 30 q22 6 44 0 q15 -4 18 -30 q4 -38 -6 -82 q-7 -34 -34 -36 q-27 2 -34 36 z" fill={`url(#${voterId}-shirt)`} />
        {/* Stripe */}
        <path d="M176 268 q24 12 48 2 q-2 14 -24 16 q-24 -2 -24 -18 z" fill="#ffe0c0" />

        {/* Arms */}
        <path d="M166 240 q-22 12 -24 38 q0 18 16 20 q8 2 12 -8 q2 -26 8 -44 q2 -12 -12 -6 z" fill={`url(#${voterId}-shirt)`} />
        <circle cx="160" cy="298" r="9" fill="#e8b090" />
        <path d="M206 240 q22 12 24 38 q2 18 -14 20 q-8 2 -12 -8 q-4 -26 -10 -44 q-2 -12 12 -6 z" fill={`url(#${voterId}-shirt)`} />
        <circle cx="240" cy="296" r="9" fill="#e8b090" />

        {/* Neck */}
        <rect x="202" y="196" width="36" height="26" rx="10" fill="#e8b090" />

        {/* Head */}
        <g className="char-head">
          <path d="M180 192 q0 -28 10 -38 q10 -8 26 -8 q18 0 28 8 q10 10 10 38 q0 14 -8 10 q-14 -8 -30 -8 q-16 0 -30 8 q-6 4 -6 -10 z" fill="#e8b090" />
          {/* Red hair + bandana */}
          <path d="M182 158 q0 -16 16 -22 q20 -8 40 2 q12 6 10 16 q-18 -12 -40 -8 q-20 4 -26 12 z" fill="#d03020" />
          <path d="M182 150 q4 -20 22 -26 q22 -8 40 -2 q14 4 16 14 q-12 -8 -30 -8 q-24 2 -34 10 q-10 8 -14 12 z" fill="#ffcc00" opacity="0.85" />
          {/* Freckles */}
          <circle cx="214" cy="188" r="1.6" fill="#c0604a" />
          <circle cx="222" cy="192" r="1.6" fill="#c0604a" />
          <circle cx="248" cy="182" r="1.6" fill="#c0604a" />
          <circle cx="254" cy="188" r="1.6" fill="#c0604a" />
          {/* Eyes */}
          <g className="char-eyes">
            <circle cx="216" cy="176" r="5" fill="#301c20" />
            <circle cx="252" cy="174" r="5" fill="#301c20" />
          </g>
        </g>
      </g>

      {/* Skateboard */}
      <g className="char-skate" style={{ transformOrigin: '300px 458px' }}>
        <rect x="262" y="452" width="90" height="8" rx="4" fill="#1a1020" transform="rotate(-4 307 456)" />
        <circle cx="280" cy="464" r="8" fill="#20242c" stroke="#3a4050" strokeWidth="1.5" />
        <circle cx="334" cy="460" r="8" fill="#20242c" stroke="#3a4050" strokeWidth="1.5" />
        <rect x="280" y="442" width="14" height="8" rx="3" fill="#ff4060" transform="rotate(-4 287 446)" />
      </g>

      {/* Interactive handlebar-gift */}
      <g className={`char-interact${interacted ? ' object-reacted' : ''}${revealed ? ' object-revealed' : ''}`} style={{ transformOrigin: '330px 300px' }}>
        <circle cx="332" cy="300" r="40" fill={`url(#char-glow)`} opacity="0.75" />
        <rect x="316" y="284" width="32" height="26" rx="5" fill="#ffd020" stroke="#e08a10" strokeWidth="1.5" />
        <line x1="332" y1="284" x2="332" y2="310" stroke="#ffffff" strokeWidth="2.2" />
        <circle cx="332" cy="292" r="8" fill="#ff4060" />
        <circle cx="332" cy="292" r="3" fill="#ffffff" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>

      <ellipse cx="200" cy="452" rx="150" ry="16" fill={`url(#char-floor)`} />
    </svg>
  )
}

export function SteveScene({ revealed, interacted }: CharacterSceneProps) {
  const voterId = 'steve'
  return (
    <svg viewBox="0 0 400 500" className="char-svg char-svg-steve" preserveAspectRatio="xMidYMid meet">
      <defs>
        {commonDefs('#ff9030', '#ffd040')}
        <linearGradient id={`${voterId}-shirt`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a8fd0" />
          <stop offset="100%" stopColor="#1c5a94" />
        </linearGradient>
        <linearGradient id={`${voterId}-jeans`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a5a78" />
          <stop offset="100%" stopColor="#262f45" />
        </linearGradient>
        <radialGradient id={`${voterId}-glow`} cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#ffd24a" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#ff8a3a" stopOpacity="0.06" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Mall interior */}
      <rect width="400" height="500" fill="#24181a" />
      <rect width="400" height="500" fill={`url(#${voterId}-glow)`} />

      {/* Mall floor */}
      <rect x="0" y="370" width="400" height="130" fill="#1c1214" />
      <g stroke="#3a262a" strokeWidth="2" opacity="0.6">
        <line x1="0" y1="410" x2="400" y2="410" />
        <line x1="100" y1="370" x2="100" y2="500" />
        <line x1="200" y1="370" x2="200" y2="500" />
        <line x1="300" y1="370" x2="300" y2="500" />
      </g>

      {/* Store sign */}
      <rect x="120" y="60" width="160" height="60" rx="8" fill="#38222a" stroke="#50303a" strokeWidth="2" />
      <text x="200" y="100" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#ffd24a" fontFamily="'Georgia', serif" opacity="0.95">
        STAR COURT
        <animate attributeName="opacity" values="0.95;0.7;0.95" dur="3.4s" repeatCount="indefinite" />
      </text>

      {/* Storefront pillars */}
      <rect x="30" y="120" width="46" height="250" fill="#301c20" />
      <rect x="324" y="120" width="46" height="250" fill="#301c20" />
      {/* Window stripe */}
      <rect x="86" y="210" width="228" height="34" fill="#241418" opacity="0.8" />

      {/* Christmas garland */}
      <g>
        <path d="M30 130 q40 18 80 0 q40 -18 80 0 q40 18 80 0 q40 -18 90 0" stroke="#1c3a20" strokeWidth="6" fill="none" opacity="0.9" />
        {[50, 90, 130, 170, 210, 250, 290, 330].map((x, i) => (
          <circle key={i} cx={x} cy={128} r="3.4" fill={i % 2 ? '#ffd24a' : '#ff5060'}>
            <animate attributeName="opacity" values="1;0.3;1" dur={`${1.8 + (i % 3)}s`} begin={`${i * 0.25}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* Character */}
      <g className="char-breath" style={{ transformOrigin: '200px 440px' }}>
        {/* Legs jeans */}
        <g fill={`url(#${voterId}-jeans)`}>
          <path d="M180 348 q-8 34 -5 60 q2 20 16 22 l14 2 q12 0 14 -14 q2 -28 -3 -60 q-3 -26 -17 -28 q-10 -2 -19 18 z" />
          <path d="M238 348 q2 36 4 60 q3 16 15 16 l12 0 q12 0 14 -12 q3 -28 -1 -60 q-2 -28 -16 -28 q-8 0 -18 16 z" />
        </g>
        {/* White sneakers */}
        <rect x="170" y="428" width="42" height="14" rx="7" fill="#e8e8f0" />
        <rect x="230" y="428" width="42" height="14" rx="7" fill="#d8d8e0" />

        {/* Torso shirt (pastel blue polo) */}
        <path d="M170 228 q-12 46 -8 84 q3 30 20 34 q26 6 44 0 q17 -4 20 -34 q4 -38 -8 -84 q-8 -34 -34 -38 q-26 4 -34 38 z" fill={`url(#${voterId}-shirt)`} />
        {/* Collar */}
        <path d="M182 220 l18 14 18 -14 8 -6 -14 -8 -24 0 -16 8 z" fill="#e8e8f0" />

        {/* Arms */}
        <path d="M168 250 q-24 12 -26 40 q0 18 16 18 q10 0 13 -10 q2 -26 8 -44 q2 -12 -11 -4 z" fill={`url(#${voterId}-shirt)`} />
        <circle cx="158" cy="308" r="9" fill="#e8c0a0" />
        <path d="M204 250 q26 12 28 40 q2 18 -14 18 q-10 0 -13 -10 q-4 -26 -10 -44 q-2 -12 9 -4 z" fill={`url(#${voterId}-shirt)`} />
        <circle cx="232" cy="306" r="9" fill="#e8c0a0" />

        {/* Neck */}
        <rect x="202" y="202" width="36" height="24" rx="10" fill="#e8c0a0" />

        {/* Head */}
        <g className="char-head">
          <path d="M180 204 q0 -30 10 -40 q12 -10 30 -10 q18 0 30 10 q10 10 10 40 q0 14 -8 8 q-16 -10 -32 -10 q-16 0 -32 10 q-8 6 -8 -8 z" fill="#e8c0a0" />
          {/* Iconic voluminous hair */}
          <path d="M176 190 q-4 -34 10 -44 q14 -12 34 -12 q22 0 36 12 q14 10 10 44 q0 -16 -14 -24 q-10 -6 -24 -6 q-12 0 -24 6 q-18 8 -18 24 z" fill="#6b4028" />
          <path d="M180 178 q-2 -18 8 -26 q12 -8 28 -6 q8 0 14 4 q2 10 -4 16 q-20 -10 -40 0 q-6 6 -6 12 z" fill="#7c4c30" />
          {/* Side hair vol */}
          <path d="M176 182 q-8 2 -10 14 q-2 16 4 30 q6 12 14 10 q2 -20 -2 -38 q-2 -12 -6 -16 z" fill="#5c341f" />
          <path d="M244 176 q8 2 10 14 q2 18 -4 30 q-6 12 -14 10 q-2 -20 2 -38 q2 -12 6 -16 z" fill="#5c341f" />
          {/* Eyes */}
          <g className="char-eyes">
            <circle cx="214" cy="204" r="5" fill="#2c1c28" />
            <circle cx="252" cy="202" r="5" fill="#2c1c28" />
          </g>
          {/* Smile */}
          <path d="M222 224 q8 8 16 0" stroke="#a05038" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* Interactive mall badge gift */}
      <g className={`char-interact${interacted ? ' object-reacted' : ''}${revealed ? ' object-revealed' : ''}`} style={{ transformOrigin: '330px 320px' }}>
        <circle cx="330" cy="320" r="42" fill={`url(#char-glow)`} opacity="0.8" />
        <circle cx="330" cy="320" r="22" fill="#d8c860" stroke="#8a7a28" strokeWidth="2">
          <animate attributeName="r" values="22;26;22" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <text x="330" y="327" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#5a4a10">S</text>
        <path d="M314 300 l16 -10 0 8 -16 10 z" fill="#ffd24a" />
        <path d="M346 300 l-16 -10 0 8 16 10 z" fill="#ffd24a" />
      </g>

      <ellipse cx="200" cy="452" rx="150" ry="16" fill={`url(#char-floor)`} />
    </svg>
  )
}

export function VillainScene({ revealed, interacted }: CharacterSceneProps) {
  const voterId = 'villain'
  return (
    <svg viewBox="0 0 400 500" className="char-svg char-svg-villain" preserveAspectRatio="xMidYMid meet">
      <defs>
        {commonDefs('#c02040', '#400020')}
        <linearGradient id={`${voterId}-skin`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8c0c0" />
          <stop offset="100%" stopColor="#6e4a50" />
        </linearGradient>
        <linearGradient id={`${voterId}-soil`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a1420" />
          <stop offset="100%" stopColor="#12050a" />
        </linearGradient>
        <radialGradient id={`${voterId}-red`} cx="60%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#ff2030" stopOpacity="0.28" />
          <stop offset="60%" stopColor="#a01020" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Dark upside-down atmosphere */}
      <rect width="400" height="500" fill="#060006" />
      <rect width="400" height="500" fill={`url(#${voterId}-red)`} />

      {/* Floating dust */}
      <g fill="#903040">
        {[[50, 90], [350, 130], [30, 260], [370, 320], [80, 40], [330, 60], [140, 30], [250, 45]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.5 + (i % 2)} opacity="0.5">
            <animate attributeName="cy" values={`${y};${y + 20};${y}`} dur={`${4 + i}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur={`${4 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* Vines */}
      <g stroke="#2a0a18" strokeWidth="6" fill="none" opacity="0.9">
        <path d="M0 500 q20 -80 60 -120 q40 -40 60 -80 q12 -24 8 -44" />
        <path d="M400 500 q-30 -90 -90 -160 q-40 -48 -50 -84" />
        <path d="M40 500 q60 -40 100 -100 q30 -46 36 -100" />
      </g>
      <g stroke="#200614" strokeWidth="4" fill="none" opacity="0.8">
        <path d="M70 120 q30 -30 16 -70" />
        <path d="M320 160 q-30 -40 -10 -96" />
      </g>

      {/* Character - tall } */}
      <g className="char-breath" style={{ transformOrigin: '200px 470px' }}>
        {/* Legs */}
        <g fill={`url(#${voterId}-soil)`}>
          <path d="M184 390 q-2 52 4 74 q4 16 18 18 l10 2 q14 0 16 -16 q2 -30 -4 -76 q-3 -24 -16 -28 q-14 4 -28 26 z" />
          <path d="M238 390 q-2 52 2 74 q4 16 18 16 l8 0 q14 0 16 -14 q2 -32 -4 -74 q-4 -26 -18 -28 q-12 2 -22 26 z" />
        </g>

        {/* Cloak/tattered robe */}
        <path d="M142 220 q-14 70 0 170 q6 38 20 44 q38 12 76 0 q14 -6 20 -44 q14 -100 0 -170 q-8 -40 -58 -44 q-50 6 -58 44 z" fill="#1a0812" />
        {/* Robe tatters */}
        <path d="M160 420 q-8 18 2 34" stroke="#1a0812" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M242 416 q4 22 -4 36" stroke="#1a0812" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M200 452 q-2 12 2 20" stroke="#1a0812" strokeWidth="12" fill="none" strokeLinecap="round" />

        {/* Chest vines */}
        <g stroke="#320a18" strokeWidth="3" fill="none" opacity="0.8">
          <path d="M164 300 q36 22 72 0" />
          <path d="M164 330 q36 22 72 0" />
        </g>

        {/* Left arm (twisted) */}
        <g>
          <path d="M150 250 q-20 14 -24 40 q-3 22 6 34 q14 16 30 4 q6 -6 6 -16 q-16 -20 -18 -40 q-2 -14 0 -22 z" fill={`url(#${voterId}-soil)`} />
          {/* Bent hand segments */}
          <path d="M124 318 q8 12 22 12 q14 -2 20 -10 q-4 16 -14 24 q-16 8 -30 -4 z" fill="#3a1420" />
          <path d="M128 344 q6 8 18 8 q12 -2 18 -8 q-6 14 -18 16 q-14 2 -22 -8 z" fill={`url(#${voterId}-soil)`} />
        </g>

        {/* Right arm raised */}
        <g className="char-arm-rise">
          <path d="M248 240 q14 -26 34 -38 q16 -10 26 -4 q12 8 2 20 q-20 22 -34 30 q-12 6 -16 4 q-10 -4 -12 -12 z" fill="#2a0a16" />
          <path d="M290 198 q-6 10 -16 14 q-10 4 -18 2 q6 12 18 16 q16 4 26 -6 z" fill={revealed ? '#ff3040' : '#7a2028'} />
          {!revealed && (
            <circle cx="302" cy="196" r="10" fill="none" stroke="#b02030" strokeWidth="2" opacity="0.6">
              <animate attributeName="r" values="10;16;10" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
            </circle>
          )}
        </g>

        {/* Shoulders spikes */}
        <path d="M150 246 q-8 8 -20 6 l14 -16 z" fill="#2c0c18" />
        <path d="M244 238 q8 8 20 6 l-12 -18 z" fill="#2c0c18" />

        {/* Head */}
        <g className="char-head">
          <path d="M160 194 q8 -46 40 -46 q32 0 40 46 q4 30 -6 34 q-34 6 -68 0 q-10 -4 -6 -34 z" fill={`url(#${voterId}-skin)`} />
          {/* Organic cracks */}
          <path d="M164 180 q12 6 24 2 q10 -4 18 -12" stroke="#5a2030" strokeWidth="2.5" fill="none" opacity="0.7" />
          <path d="M236 192 q-10 8 -22 8 q-14 0 -26 -8" stroke="#5a2030" strokeWidth="2.5" fill="none" opacity="0.5" />
          {/* Eyes */}
          <g className="char-eyes">
            <ellipse cx="196" cy="182" rx="5" ry="7" fill="#d02030">
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.6s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="236" cy="182" rx="5" ry="7" fill="#d02030">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.6s" begin="1.2s" repeatCount="indefinite" />
            </ellipse>
          </g>
        </g>
      </g>

      {/* Interactive upside-down glowing eye key */}
      <g className={`char-interact${interacted ? ' object-reacted' : ''}${revealed ? ' object-revealed' : ''}`} style={{ transformOrigin: '320px 380px' }}>
        <circle cx="320" cy="380" r="40" fill={`url(#char-glow)`} opacity="0.55" />
        <ellipse cx="320" cy="380" rx="20" ry="26" fill="#16060c" stroke="#c02040" strokeWidth="2" />
        <ellipse cx="320" cy="380" rx="9" ry="14" fill="#ff3040">
          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.6s" repeatCount="indefinite" />
        </ellipse>
        <circle cx="320" cy="380" r="3" fill="#ffffff" opacity="0.9">
          <animate attributeName="cy" values="374;386;374" dur="3.4s" repeatCount="indefinite" />
        </circle>
      </g>

      <ellipse cx="200" cy="488" rx="140" ry="14" fill="#1a040c" />
    </svg>
  )
}

export function PrincessScene({ revealed, interacted }: CharacterSceneProps) {
  const voterId = 'princess'
  return (
    <svg viewBox="0 0 400 500" className="char-svg char-svg-princess" preserveAspectRatio="xMidYMid meet">
      <defs>
        {commonDefs('#ff60a0', '#a040c0')}
        <linearGradient id={`${voterId}-dress`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff8ec0" />
          <stop offset="45%" stopColor="#c0489a" />
          <stop offset="100%" stopColor="#5a1868" />
        </linearGradient>
        <linearGradient id={`${voterId}-bodice`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffc0e0" />
          <stop offset="100%" stopColor="#d078b0" />
        </linearGradient>
        <radialGradient id={`${voterId}-magic`} cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#d0a0ff" stopOpacity="0.25" />
          <stop offset="55%" stopColor="#ff80c0" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Castle night */}
      <rect width="400" height="500" fill="#140b2c" />
      <rect width="400" height="500" fill={`url(#${voterId}-magic)`} />

      {/* Moon */}
      <circle cx="320" cy="90" r="50" fill={`url(#char-glow)`} />
      <circle cx="320" cy="90" r="18" fill="#ffe6b0" opacity="0.9" />

      {/* Castle silhouette */}
      <g fill="#1a0e38">
        <rect x="20" y="260" width="150" height="180" />
        <rect x="30" y="210" width="26" height="60" />
        <rect x="134" y="210" width="26" height="60" />
        <rect x="230" y="240" width="150" height="200" />
        <rect x="240" y="190" width="26" height="60" />
        <rect x="344" y="190" width="26" height="60" />
        <rect x="170" y="300" width="60" height="140" />
      </g>
      {/* Castle towers tops */}
      <g fill="#1a0e38">
        <path d="M22 210 l20 -22 22 22 z" />
        <path d="M126 210 l20 -22 22 22 z" />
        <path d="M232 190 l20 -22 22 22 z" />
        <path d="M336 190 l20 -22 22 22 z" />
      </g>
      {/* Windows lit */}
      <g fill="#ffd86e" opacity="0.85">
        <rect x="74" y="300" width="14" height="20" rx="6" />
        <rect x="300" y="280" width="14" height="20" rx="6" />
      </g>

      {/* Garden wall */}
      <rect y="430" width="400" height="70" fill="#0d0722" />
      <g stroke="#241650" strokeWidth="3">
        <line x1="0" y1="446" x2="400" y2="446" />
        {[40, 90, 140, 190, 240, 290, 340].map((x, i) => <line key={i} x1={x} y1="432" x2={x} y2="446" />)}
      </g>

      {/* Floating glow particles */}
      <g>
        {[[60, 120], [340, 180], [120, 60], [280, 120], [40, 300], [360, 340], [180, 60], [250, 40]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2 + (i % 2)} fill="#ffc0e0" opacity="0.7">
            <animate attributeName="cy" values={`${y};${y - 24};${y}`} dur={`${3 + i}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0.1;0.7" dur={`${3 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* Character */}
      <g className="char-breath" style={{ transformOrigin: '200px 460px' }}>
        {/* Gown */}
        <path d="M120 330 q-4 70 6 112 q6 24 74 24 q68 0 74 -24 q10 -42 6 -112 q-4 -52 -80 -52 q-76 0 -80 52 z" fill={`url(#${voterId}-dress)`} />
        {/* Dress sheen */}
        <path d="M150 330 q-4 70 6 112 q4 16 40 24 q10 -40 6 -100 q-4 -40 -28 -48 q-18 6 -24 12 z" fill="#ffd0e8" opacity="0.25" />
        {/* Dress bottom sparkle line */}
        <path d="M132 448 q68 22 136 0" stroke="#ffe0f0" strokeWidth="2" fill="none" opacity="0.5" />
        {/* Golden trim */}
        <path d="M128 360 q72 26 144 0" stroke="#ffd24a" strokeWidth="2.4" fill="none" opacity="0.75" />

        {/* Bodice */}
        <path d="M168 220 q-8 34 -6 70 q0 18 16 22 q22 6 44 0 q16 -4 16 -22 q2 -36 -6 -70 q-6 -30 -32 -32 q-26 2 -32 32 z" fill={`url(#${voterId}-bodice)`} />
        {/* Necklace */}
        <path d="M180 244 q20 16 40 0" stroke="#ffd24a" strokeWidth="2" fill="none" />
        <circle cx="200" cy="252" r="4" fill="#ffd24a" />

        {/* Ring sleeve arms */}
        <path d="M168 248 q-18 20 -20 44 q0 16 14 14 q10 -2 14 -12 q-4 -24 2 -38 q-2 -8 -10 -8 z" fill={`url(#${voterId}-bodice)`} />
        <circle cx="162" cy="304" r="9" fill="#f0c0b0" />
        <path d="M204 248 q18 20 20 44 q2 16 -12 14 q-10 -2 -14 -12 q2 -24 -4 -38 q4 -8 10 -8 z" fill={`url(#${voterId}-bodice)`} />
        <circle cx="208" cy="304" r="9" fill="#f0c0b0" />

        {/* Neck */}
        <rect x="204" y="196" width="32" height="26" rx="10" fill="#f0c0b0" />

        {/* Hair (long blonde waves) */}
        <path d="M164 200 q-28 40 -20 120 q6 60 20 60 q2 -30 0 -70 q-4 -30 0 -60 q-4 -40 0 -50 z" fill="#e8b844" />
        <path d="M246 200 q28 40 20 120 q-6 60 -20 60 q-2 -30 0 -70 q4 -30 0 -60 q4 -40 0 -50 z" fill="#dca238" />

        {/* Head */}
        <g className="char-head">
          <path d="M178 196 q0 -30 10 -40 q12 -8 32 -8 q20 0 32 8 q10 10 10 40 q0 14 -8 10 q-16 -8 -34 -8 q-18 0 -34 8 q-8 4 -8 -10 z" fill="#f0c0b0" />
          {/* Crown */}
          <path d="M172 162 l28 -22 28 22 q-6 10 -28 10 q-22 0 -28 -10 z" fill="#ffd24a" />
          <circle cx="200" cy="144" r="4" fill="#ff4060" />
          <circle cx="180" cy="152" r="2.5" fill="#60c0ff" />
          <circle cx="220" cy="152" r="2.5" fill="#60c0ff" />
          {/* Top hair bun */}
          <circle cx="200" cy="140" r="12" fill="#e8b844" />
          {/* Eyes */}
          <g className="char-eyes">
            <circle cx="212" cy="192" r="5" fill="#2050a8" />
            <circle cx="244" cy="190" r="5" fill="#2050a8" />
          </g>
          {/* Gentle smile */}
          <path d="M222 212 q8 8 16 0" stroke="#b06080" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          {/* Blush */}
          <ellipse cx="204" cy="210" rx="6" ry="3" fill="#ff90a0" opacity="0.5" />
          <ellipse cx="254" cy="208" rx="6" ry="3" fill="#ff90a0" opacity="0.5" />
        </g>
      </g>

      {/* Interactive rose */}
      <g className={`char-interact${interacted ? ' object-reacted' : ''}${revealed ? ' object-revealed' : ''}`} style={{ transformOrigin: '316px 360px' }}>
        <circle cx="316" cy="360" r="36" fill={`url(#char-glow)`} opacity="0.7" />
        <path d="M316 376 q2 18 -4 28 q6 -4 4 -8 q2 10 0 8 z" fill="#2c7020" stroke="#2c7020" strokeWidth="2" />
        <path d="M316 368 q-2 18 4 26 q-4 -8 -2 -14 q-3 8 -2 4 z" fill="#2c7020" />
        <circle cx="316" cy="356" r="16" fill="#ff4060">
          <animate attributeName="r" values="16;19;16" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="310" cy="350" r="10" fill="#ff6080" />
        <circle cx="322" cy="350" r="8" fill="#e02c50" />
        <path d="M304 344 q6 -8 14 -6 q-4 -2 -10 2 q-6 6 -4 4 z" fill="#2c7020" />
        <path d="M330 346 q6 -10 16 -8 q-8 -2 -12 4 z" fill="#2c7020" />
      </g>

      <ellipse cx="200" cy="470" rx="150" ry="18" fill={`url(#char-floor)`} />
    </svg>
  )
}

export function MisaScene({ revealed, interacted }: CharacterSceneProps) {
  const voterId = 'misa'
  return (
    <svg viewBox="0 0 400 500" className="char-svg char-svg-misa" preserveAspectRatio="xMidYMid meet">
      <defs>
        {commonDefs('#d02040', '#ffffff')}
        <linearGradient id={`${voterId}-dress`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16060e" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <radialGradient id={`${voterId}-light`} cx="50%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ff3050" stopOpacity="0.18" />
          <stop offset="55%" stopColor="#d02040" stopOpacity="0.05" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Gothic room */}
      <rect width="400" height="500" fill="#050508" />
      <rect width="400" height="500" fill={`url(#${voterId}-light)`} />

      {/* Candles */}
      <g>
        {[60, 110, 250, 300].map((x, i) => (
          <g key={i}>
            <rect x={x - 5} y={380} width="10" height="50" fill="#181820" rx="2" />
            <rect x={x - 1.5} y={364} width="3" height="18" fill="#4a4a5a" />
            <ellipse cx={x} cy={362} rx="4" ry="6" fill="#ffb030">
              <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </ellipse>
          </g>
        ))}
      </g>

      {/* Windows */}
      <g>
        <path d="M300 40 q60 10 60 140 l-8 70 -104 0 q0 -60 8 -70 q18 -70 44 -140 z" fill="#101018" stroke="#20202a" strokeWidth="3" />
        <path d="M342 40 l-2 200" stroke="#20202a" strokeWidth="2" />
      </g>

      {/* Cross on wall */}
      <g stroke="#d02040" strokeWidth="8" strokeLinecap="round" opacity="0.5">
        <line x1="84" y1="120" x2="84" y2="180" />
        <line x1="62" y1="144" x2="106" y2="144" />
      </g>

      {/* Character */}
      <g className="char-breath" style={{ transformOrigin: '190px 460px' }}>
        {/* Legs */}
        <g fill="#0a0a0a">
          <path d="M170 380 q-4 34 0 56 q2 16 12 18 l12 0 q12 0 14 -14 q3 -28 0 -56 q-2 -20 -14 -22 q-14 -2 -24 18 z" />
          <path d="M222 380 q-2 34 1 56 q2 16 12 16 l10 0 q12 0 14 -12 q3 -28 0 -56 q-2 -22 -14 -22 q-12 2 -23 18 z" />
        </g>
        {/* Goth boots */}
        <path d="M164 456 q0 8 6 10 l24 2 q10 0 10 -8 q0 -6 -8 -6 l-22 -2 q-10 0 -10 4 z" fill="#050505" />
        <path d="M226 454 q0 8 6 10 l22 2 q10 0 10 -8 q0 -6 -8 -6 l-20 -2 q-10 0 -10 4 z" fill="#050505" />

        {/* Gothic Lolita dress */}
        <path d="M120 300 q-6 60 4 96 q8 30 66 30 q58 0 66 -30 q10 -36 4 -96 q-7 -58 -70 -58 q-63 0 -70 58 z" fill={`url(#${voterId}-dress)`} stroke="#1c0c16" strokeWidth="1.5" />
        {/* Ruffled hem */}
        <path d="M126 416 q64 24 148 0" stroke="#2a1020" strokeWidth="5" fill="none" />
        <path d="M130 428 q64 22 140 0" stroke="#1c0812" strokeWidth="4" fill="none" />
        {/* Apron (white) */}
        <path d="M146 296 q4 60 6 92 q0 24 38 24 q38 0 38 -24 q2 -32 6 -92 q2 -30 -44 -30 q-46 0 -44 30 z" fill="#f0f0f6" />
        {/* Apron red cross */}
        <path d="M190 322 l0 22 M179 333 l22 0" stroke="#d02040" strokeWidth="5" />
        <path d="M190 360 l0 16 M183 368 l14 0" stroke="#d02040" strokeWidth="3" />
        {/* Dangling hearts on apron */}
        <path d="M146 296 q-2 8 4 12 q6 2 8 -2 q-2 6 -8 8 q-6 -2 -14 0 q-2 -8 2 -14 z" fill="#d02040" opacity="0.85" />
        <path d="M254 296 q2 8 -4 12 q-6 2 -8 -2 q2 6 8 8 q6 -2 14 0 q2 -8 -2 -14 z" fill="#d02040" opacity="0.85" />

        {/* Torso top */}
        <path d="M164 228 q-8 30 -6 58 q0 14 16 16 q24 6 46 0 q16 -2 16 -16 q2 -28 -6 -58 q-6 -26 -30 -28 q-24 2 -36 28 z" fill={`url(#${voterId}-dress)`} />
        {/* Red bow at chest */}
        <path d="M188 244 q8 8 16 0 q-4 12 -16 12 q-12 0 -16 -12 q8 8 16 0 z" fill="#d02040" />
        <circle cx="196" cy="250" r="4" fill="#ff2030" />

        {/* Long sleeves */}
        <path d="M160 242 q-24 10 -30 34 q-4 20 8 26 q8 4 14 -4 q6 -24 12 -44 q2 -12 -4 -12 z" fill={`url(#${voterId}-dress)`} />
        {/* Ruffled cuff */}
        <path d="M134 300 q6 10 14 12 q10 2 14 -4 q3 10 -4 14 q-10 4 -20 -2 q-8 -4 -4 -20 z" fill="#2a1020" />
        <circle cx="146" cy="312" r="8" fill="#e8e0e0" />

        <path d="M218 240 q24 10 30 34 q4 20 -8 26 q-8 4 -14 -4 q-6 -24 -12 -44 q-2 -12 4 -12 z" fill={`url(#${voterId}-dress)`} />
        <path d="M246 298 q-6 10 -14 12 q-10 2 -14 -4 q-3 10 4 14 q10 4 20 -2 q8 -4 4 -20 z" fill="#2a1020" />
        <circle cx="234" cy="312" r="8" fill="#e8e0e0" />

        {/* Necklace + cross */}
        <path d="M184 230 q12 12 24 0" stroke="#d8d8e0" strokeWidth="1.6" fill="none" />
        <path d="M204 240 l0 60 M192 252 l24 0 M194 258 l4 0 M204 268 l0 0 M197 274 l16 0" stroke="#d8d8e0" strokeWidth="3.4" transform="translate(0 8)" />

        {/* Head */}
        <g className="char-head">
          <path d="M178 208 q0 -32 10 -42 q12 -8 30 -8 q18 0 30 8 q10 10 10 42 q0 12 -8 8 q-18 -10 -32 -10 q-14 0 -32 10 q-8 4 -8 -8 z" fill="#f0e8e8" />
          {/* Blonde hair - twintails */}
          <path d="M174 190 q-10 12 -10 26 q2 40 16 70 q8 18 16 8 q4 -14 0 -34 q-6 -34 0 -58 z" fill="#f0d040" />
          <path d="M246 188 q10 12 10 26 q-2 40 -16 70 q-8 18 -16 8 q-4 -14 0 -34 q6 -34 0 -58 z" fill="#e8c236" />
          {/* Bangs */}
          <path d="M176 180 q0 -22 12 -32 q12 -8 30 -6 q16 2 24 10 q4 10 2 22 q-16 -14 -34 -12 q-20 2 -34 18 z" fill="#fbd94a" />
          <path d="M178 168 q4 -18 16 -24 q14 -8 28 -6 z" fill="#ffdf60" />
          {/* Eyes */}
          <g className="char-eyes">
            <circle cx="212" cy="204" r="5.5" fill="#181820" />
            <circle cx="244" cy="202" r="5.5" fill="#181820" />
          </g>
          {/* Wink / cute smile */}
          <g>
            <path d="M222 224 q7 7 14 0" stroke="#c05878" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </g>
        </g>
      </g>

      {/* Interactive cross keychain */}
      <g className={`char-interact${interacted ? ' object-reacted' : ''}${revealed ? ' object-revealed' : ''}`} style={{ transformOrigin: '320px 300px' }}>
        <circle cx="320" cy="300" r="42" fill={`url(#char-glow)`} opacity="0.55" />
        <path d="M308 262 l24 0 M320 250 l0 22 M312 280 l16 0 M320 280 l0 28" stroke="#ff3040" strokeWidth="9" strokeLinecap="round" />
        <circle cx="320" cy="322" r="5" fill="#ff3040" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M312 240 q8 6 16 0 q-4 10 -16 8 q-8 -2 -14 -6 z" fill="#181828" />
      </g>

      <ellipse cx="196" cy="476" rx="140" ry="14" fill="#050505" />
    </svg>
  )
}

export function AnimeGirlScene({ revealed, interacted }: CharacterSceneProps) {
  const voterId = 'anime'
  return (
    <svg viewBox="0 0 400 500" className="char-svg char-svg-animegirl" preserveAspectRatio="xMidYMid meet">
      <defs>
        {commonDefs('#ff80b0', '#ffb0d0')}
        <linearGradient id={`${voterId}-hair`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd0e8" />
          <stop offset="100%" stopColor="#f0a8c8" />
        </linearGradient>
        <radialGradient id={`${voterId}-sky`} cx="50%" cy="20%" r="85%">
          <stop offset="0%" stopColor="#ffd0e8" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#a070d0" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Dreamy sky */}
      <rect width="400" height="500" fill="#160d28" />
      <rect width="400" height="500" fill={`url(#${voterId}-sky)`} />

      {/* Cherry blossom branches */}
      <g stroke="#5a2a48" strokeWidth="6" fill="none" opacity="0.9">
        <path d="M-20 40 q60 10 120 -20 q50 -24 120 -10" />
        <path d="M70 12 q20 30 60 44 q30 10 50 0" />
        <path d="M200 -20 q30 30 90 46" />
      </g>
      {/* Blossom clusters */}
      <g>
        {[
          [40, 30], [80, 20], [130, 6], [170, 4], [230, 10], [270, 22], [320, 18], [360, 10],
          [110, 42], [180, 36], [230, 44], [300, 38],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={7} fill="#ff8ab8" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.5;0.9" dur={`${2.4 + (i % 3)}s`} begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={x + 8} cy={y + 4} r={6} fill="#ff9cc4" opacity="0.85" />
            <circle cx={x - 8} cy={y + 4} r={6} fill="#ff9cc4" opacity="0.85" />
            <circle cx={x} cy={y + 8} r={5} fill="#ff8ab8" opacity="0.8" />
            <circle cx={x} cy={y} r={2.5} fill="#ffd0e8" />
          </g>
        ))}
      </g>
      {/* Falling petals */}
      <g>
        {[60, 140, 240, 330, 200, 380].map((x, i) => (
          <ellipse key={i} cx={x} cy={120 + i * 40} rx="4" ry="3" fill="#ff9cc4" opacity="0.7" transform={`rotate(${i * 30} ${x} ${120 + i * 40})`}>
            <animate attributeName="cy" values={`${120 + i * 40};${430 + (i % 3) * 20};${120 + i * 40}`} dur={`${9 + i}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0;0.7" dur={`${9 + i}s`} repeatCount="indefinite" />
          </ellipse>
        ))}
      </g>

      {/* Ground */}
      <ellipse cx="200" cy="448" rx="170" ry="40" fill="#2a1638" />
      <ellipse cx="200" cy="452" rx="140" ry="24" fill="#3a2048" />

      {/* Character */}
      <g className="char-breath" style={{ transformOrigin: '200px 450px' }}>
        {/* Legs */}
        <g fill="#f0e0e8">
          <path d="M180 372 q-6 30 -4 52 q0 16 12 18 l14 0 q12 0 14 -14 q3 -26 0 -52 q-2 -22 -16 -24 q-14 0 -20 20 z" />
          <path d="M236 372 q2 30 3 52 q2 14 12 14 l12 0 q12 0 14 -12 q3 -28 1 -52 q-2 -24 -16 -24 q-12 0 -26 22 z" />
        </g>
        {/* Pastel shoes */}
        <ellipse cx="204" cy="458" rx="26" ry="10" fill="#ff8ab8" />
        <ellipse cx="258" cy="458" rx="26" ry="10" fill="#f078a8" />

        {/* Flowy skirt */}
        <path d="M152 330 q4 50 46 52 q46 2 48 -46 q2 -52 -48 -52 q-48 0 -46 46 z" fill="#ff9cc4" />
        <path d="M160 356 q40 18 82 0 q-4 22 -42 24 q-38 -2 -40 -24 z" fill="#f088b4" />

        {/* Torso blouse */}
        <path d="M168 238 q-8 30 -6 54 q0 16 18 18 q22 6 40 0 q18 -2 18 -18 q2 -24 -6 -54 q-6 -28 -32 -30 q-26 2 -32 30 z" fill="#ffffff" />
        {/* Cute ribbon */}
        <path d="M192 246 q8 8 16 0 q-3 12 -16 12 q-13 0 -16 -12 q8 8 16 0 z" fill="#ff6a9a" />
        <path d="M204 256 q4 16 8 24 q2 6 -2 8 q-6 2 -8 -4 q-4 -12 -8 -22 q2 -6 10 -6 z" fill="#ff6a9a" />

        {/* Arms */}
        <path d="M168 252 q-22 12 -24 36 q-2 18 12 18 q9 0 13 -9 q4 -26 10 -42 q2 -12 -11 -3 z" fill="#ffffff" />
        <path d="M204 252 q22 12 24 36 q2 18 -12 18 q-9 0 -13 -9 q-4 -26 -10 -42 q-2 -12 11 -3 z" fill="#ffffff" />
        <circle cx="160" cy="306" r="8.5" fill="#f0c8d8" />
        <circle cx="212" cy="306" r="8.5" fill="#f0c8d8" />

        {/* Neck */}
        <rect x="204" y="206" width="30" height="24" rx="10" fill="#f0c8d8" />

        {/* Head */}
        <g className="char-head">
          <path d="M182 204 q0 -30 10 -40 q12 -8 28 -8 q18 0 28 8 q10 10 10 40 q0 12 -7 8 q-16 -8 -31 -8 q-16 0 -31 8 q-7 4 -7 -8 z" fill="#f0c8d8" />
          {/* Pink long hair */}
          <path d="M178 190 q-14 16 -16 46 q-2 42 12 84 q4 14 16 8 q4 -10 0 -32 q-8 -44 -4 -88 q0 -12 -8 -18 z" fill={`url(#${voterId}-hair)`} />
          <path d="M238 186 q14 16 16 46 q2 44 -12 84 q-4 14 -16 8 q-4 -10 0 -32 q8 -44 4 -88 q0 -12 8 -18 z" fill={`url(#${voterId}-hair)`} />
          {/* Bangs */}
          <path d="M180 182 q-2 -22 12 -32 q12 -8 30 -6 q18 2 26 12 q2 12 0 22 q-16 -14 -34 -12 q-20 2 -34 16 z" fill={`url(#${voterId}-hair)`} />
          <path d="M184 168 q4 -16 14 -22 q12 -8 24 -6 q10 2 8 10 q-12 -6 -22 -4 q-14 2 -24 22 z" fill={`url(#${voterId}-hair)`} />
          {/* Eyes - big sparkle */}
          <g className="char-eyes">
            <ellipse cx="211" cy="200" rx="8" ry="9" fill="#5a2040" />
            <ellipse cx="239" cy="200" rx="8" ry="9" fill="#5a2040" />
            <circle cx="213" cy="197" r="4" fill="#ffd0e8" />
            <circle cx="241" cy="197" r="4" fill="#ffd0e8" />
            <circle cx="209" cy="203" r="1.6" fill="#ffffff" />
            <circle cx="237" cy="203" r="1.6" fill="#ffffff" />
          </g>
          {/* Blush + smile */}
          <ellipse cx="202" cy="214" rx="7" ry="3.5" fill="#ff80a0" opacity="0.55" />
          <ellipse cx="250" cy="212" rx="7" ry="3.5" fill="#ff80a0" opacity="0.55" />
          <path d="M222 220 q9 9 18 0" stroke="#b05880" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* Interactive cherry-blossom gift */}
      <g className={`char-interact${interacted ? ' object-reacted' : ''}${revealed ? ' object-revealed' : ''}`} style={{ transformOrigin: '330px 330px' }}>
        <circle cx="330" cy="330" r="38" fill={`url(#char-glow)`} opacity="0.7" />
        <g transform="translate(330 330)">
          <circle cx="0" cy="0" r="16" fill="#ff8ab8">
            <animate attributeName="r" values="16;19;16" dur="2.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="-6" cy="-4" r="6" fill="#ffb0d0" />
          <circle cx="6" cy="-4" r="6" fill="#ffb0d0" />
          <circle cx="0" cy="7" r="5" fill="#ffd0e8" />
          <circle cx="0" cy="0" r="2.4" fill="#ff6a9a" />
        </g>
      </g>

      <ellipse cx="210" cy="472" rx="140" ry="14" fill={`url(#char-floor)`} />
    </svg>
  )
}

export function MagicalScene({ revealed, interacted }: CharacterSceneProps) {
  const voterId = 'magic'
  return (
    <svg viewBox="0 0 400 500" className="char-svg char-svg-magical" preserveAspectRatio="xMidYMid meet">
      <defs>
        {commonDefs('#ffd700', '#6080ff')}
        <linearGradient id={`${voterId}-robe`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a1a5c" />
          <stop offset="100%" stopColor="#0d0a2a" />
        </linearGradient>
        <radialGradient id={`${voterId}-aurora`} cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#6080ff" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#c060ff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Night sky */}
      <rect width="400" height="500" fill="#06041a" />
      <rect width="400" height="500" fill={`url(#${voterId}-aurora)`} />

      {/* Aurora bands */}
      <path d="M0 140 q100 -40 200 -10 q100 30 200 -20" stroke="#40e0ff" strokeWidth="6" fill="none" opacity="0.25" filter="url(#char-soft)" />
      <path d="M0 180 q110 -34 210 0 q100 34 190 -10" stroke="#a060ff" strokeWidth="5" fill="none" opacity="0.18" />

      {/* Stars */}
      <g fill="#ffffff">
        {[[40, 60], [90, 110], [150, 40], [210, 90], [260, 50], [320, 100], [360, 60], [120, 160], [300, 150], [60, 200]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.6 + (i % 2)}>
            <animate attributeName="opacity" values="1;0.2;1" dur={`${2 + (i % 3)}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* Shooting star */}
      <g opacity="0.8">
        <line x1="330" y1="30" x2="290" y2="90" stroke="#ffe9a0" strokeWidth="2" strokeLinecap="round">
          <animate attributeName="opacity" values="0;0.9;0" dur="5s" begin="1s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Floating islands / pillars */}
      <g fill="#0d0a30" opacity="0.8">
        <path d="M20 430 q30 -20 80 -10 q50 10 60 40 q-40 10 -90 10 q-40 0 -50 -40 z" />
        <path d="M260 450 q30 -16 80 -6 q40 8 44 34 q-40 6 -80 6 q-40 0 -44 -34 z" />
      </g>

      {/* Character hover glow */}
      <circle cx="200" cy="330" r="120" fill={`url(#char-glow)`} />

      {/* Character */}
      <g className="char-float" style={{ transformOrigin: '200px 300px' }}>
        {/* Robe */}
        <path d="M150 300 q-8 70 2 118 q10 44 48 44 q38 0 48 -44 q10 -48 2 -118 q-8 -58 -50 -58 q-42 0 -50 58 z" fill={`url(#${voterId}-robe)`} />
        {/* Robe trim */}
        <path d="M158 380 q42 18 84 0" stroke="#ffd700" strokeWidth="2" fill="none" opacity="0.8" />
        <path d="M160 404 q40 16 80 0" stroke="#ffd700" strokeWidth="1.6" fill="none" opacity="0.6" />
        {/* Floating rune */}
        <g className="char-rune" opacity="0.7">
          <circle cx="200" cy="398" r="10" fill="none" stroke="#ffd700" strokeWidth="1.4" />
          <path d="M200 390 l6 12 -6 6 -6 -6 z" fill="#ffd700" />
        </g>

        {/* Body / tabard */}
        <path d="M172 226 q-8 30 -6 54 q0 14 16 16 q22 6 40 0 q16 -2 16 -16 q2 -24 -6 -54 q-6 -28 -30 -30 q-24 2 -30 30 z" fill="#181040" stroke="#2a1a5c" strokeWidth="1.5" />

        {/* Scarf */}
        <path d="M162 224 q38 24 76 0 q-6 16 -24 20 q-28 4 -28 -6 q-18 2 -24 -14 z" fill="#ffd700" />

        {/* Arms - open welcoming */}
        <path d="M170 244 q-26 14 -32 42 q-4 18 10 18 q9 0 12 -10 q4 -26 10 -42 q2 -10 -10 -8 z" fill="#181040" />
        <circle cx="156" cy="304" r="8" fill="#e8c8b0" />
        <path d="M202 244 q26 14 32 42 q4 18 -10 18 q-9 0 -12 -10 q-4 -26 -10 -42 q-2 -10 10 -8 z" fill="#2a1a5c" />
        <circle cx="220" cy="304" r="8" fill="#e8c8b0" />

        {/* Neck */}
        <rect x="202" y="200" width="30" height="28" rx="10" fill="#e8c8b0" />

        {/* Head */}
        <g className="char-head">
          <path d="M180 202 q0 -28 10 -38 q12 -8 28 -8 q16 0 26 8 q10 10 10 38 q0 12 -7 8 q-16 -8 -29 -8 q-15 0 -29 8 q-9 4 -9 -8 z" fill="#e8c8b0" />
          {/* Wavy brown hair */}
          <path d="M176 186 q-4 -24 10 -34 q12 -8 30 -6 q16 2 24 10 q4 10 2 20 q-16 -14 -34 -12 q-20 2 -32 16 z" fill="#4a2818" />
          <path d="M176 178 q2 -14 12 -20 q12 -6 24 -4 q12 2 18 10 q2 8 -2 14 q-12 -10 -26 -8 q-16 4 -26 8 z" fill="#5c301c" />
          {/* Star mark on forehead */}
          <path d="M202 168 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" fill="#ffd700" opacity="0.9" />
          {/* Eyes */}
          <g className="char-eyes">
            <ellipse cx="211" cy="198" rx="5" ry="6" fill="#1c1030" />
            <ellipse cx="237" cy="196" rx="5" ry="6" fill="#1c1030" />
            <circle cx="213" cy="196" r="1.8" fill="#ffffff" />
            <circle cx="239" cy="194" r="1.8" fill="#ffffff" />
          </g>
          <path d="M222 216 q8 7 16 0" stroke="#a06078" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* Floating magic light orbs */}
      <g>
        {[[80, 300], [320, 330], [60, 220], [340, 230], [120, 130], [290, 120]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={6 + (i % 3)} fill="#ffd700" opacity="0.5">
              <animate attributeName="cy" values={`${y};${y - 26};${y}`} dur={`${4 + i}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.1;0.5" dur={`${4 + i}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={x} cy={y} r={2.5} fill="#ffffff" opacity="0.9" />
          </g>
        ))}
      </g>

      {/* Interactive wishing star */}
      <g className={`char-interact${interacted ? ' object-reacted' : ''}${revealed ? ' object-revealed' : ''}`} style={{ transformOrigin: '330px 350px' }}>
        <circle cx="330" cy="350" r="44" fill={`url(#char-glow)`} opacity="0.6" />
        <path d="M330 320 l8 16 18 2 -13 12 3 18 -16 -9 -16 9 3 -18 -13 -12 18 -2 z" fill="#ffd700">
          <animate attributeName="opacity" values="1;0.6;1" dur="2.2s" repeatCount="indefinite" />
        </path>
        <path d="M330 330 l5 9 10 1 -8 8 2 11 -9 -5 -9 5 2 -11 -8 -8 10 -1 z" fill="#fff3c0" />
      </g>

      <ellipse cx="205" cy="470" rx="150" ry="16" fill={`url(#char-floor)`} />
    </svg>
  )
}

export function PirateScene({ revealed, interacted }: CharacterSceneProps) {
  const voterId = 'pirate'
  return (
    <svg viewBox="0 0 400 500" className="char-svg char-svg-pirate" preserveAspectRatio="xMidYMid meet">
      <defs>
        {commonDefs('#ff9a2a', '#1f8fc0')}
        <linearGradient id={`${voterId}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1b33" />
          <stop offset="55%" stopColor="#122c50" />
          <stop offset="100%" stopColor="#0a1a30" />
        </linearGradient>
        <linearGradient id={`${voterId}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#123c60" />
          <stop offset="100%" stopColor="#071c33" />
        </linearGradient>
        <linearGradient id={`${voterId}-vest`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e83a2a" />
          <stop offset="100%" stopColor="#a81f14" />
        </linearGradient>
        <linearGradient id={`${voterId}-hat`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8c878" />
          <stop offset="100%" stopColor="#c49a4a" />
        </linearGradient>
      </defs>

      {/* Moonlit ocean sky */}
      <rect width="400" height="500" fill={`url(#${voterId}-sky)`} />
      {/* Moon */}
      <circle cx="322" cy="80" r="54" fill={`url(#char-glow)`} />
      <circle cx="322" cy="80" r="20" fill="#ffedbe" opacity="0.95" />
      <circle cx="316" cy="74" r="3" fill="#e8c878" opacity="0.7" />
      {/* Stars */}
      <g fill="#ffffff">
        {[[40, 60], [90, 110], [150, 40], [210, 90], [260, 50], [360, 130], [120, 160], [70, 200]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.5 + (i % 2)}>
            <animate attributeName="opacity" values="1;0.2;1" dur={`${2.2 + (i % 3)}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
      {/* Ocean */}
      <rect y="352" width="400" height="148" fill={`url(#${voterId}-sea)`} />
      <line x1="0" y1="352" x2="400" y2="352" stroke="#ffd86e" strokeWidth="2" opacity="0.35" />
      {/* Waves */}
      <g stroke="#2aa0d0" strokeWidth="2.5" fill="none" opacity="0.5">
        <path d="M0 384 q20 -8 40 0 q20 8 40 0 q20 -8 40 0 q20 8 40 0 q20 -8 40 0 q20 8 40 0 q20 -8 40 0 q20 8 40 0" />
        <path d="M-10 404 q20 -8 40 0 q20 8 40 0 q20 -8 40 0 q20 8 40 0 q20 -8 40 0 q20 8 40 0 q20 -8 40 0 q20 8 40 0" opacity="0.3" />
      </g>
      {/* Ship deck */}
      <rect x="10" y="420" width="380" height="18" rx="5" fill="#3a2818" />
      <g stroke="#4a3420" strokeWidth="2" opacity="0.8">
        <line x1="40" y1="424" x2="360" y2="424" />
        <line x1="40" y1="432" x2="360" y2="432" />
      </g>
      {/* Rail posts */}
      <g fill="#1c2c40">
        <rect x="16" y="378" width="8" height="46" rx="2" />
        <rect x="376" y="378" width="8" height="46" rx="2" />
      </g>
      <rect x="12" y="370" width="376" height="8" rx="4" fill="#24384f" />
      {/* Mast rope */}
      <line x1="48" y1="52" x2="48" y2="420" stroke="#5a4430" strokeWidth="4" />
      <line x1="48" y1="52" x2="118" y2="150" stroke="#5a4430" strokeWidth="2.4" />

      {/* Character */}
      <g className="char-breath" style={{ transformOrigin: '200px 440px' }}>
        {/* Legs - dark pants, connected to hips */}
        <g fill="#1c2432">
          <path d="M176 298 q-6 52 -4 84 q0 14 12 16 l14 0 q12 0 14 -14 q3 -32 -2 -74 q-3 -26 -17 -30 q-11 -4 -17 18 z" />
          <path d="M238 298 q2 52 2 84 q3 14 13 14 l12 0 q12 0 14 -12 q3 -32 -2 -74 q-3 -28 -17 -30 q-9 -2 -22 18 z" opacity="0.95" />
        </g>
        {/* Boots */}
        <path d="M170 424 q0 10 8 12 l24 4 q12 0 12 -10 q0 -8 -10 -8 l-22 -2 q-14 -2 -12 4 z" fill="#0d1220" />
        <path d="M254 424 q0 10 -8 12 l-24 4 q-12 0 -12 -10 q0 -8 10 -8 l22 -2 q14 -2 12 4 z" fill="#0d1220" opacity="0.95" />

        {/* Bare chest + red vest */}
        <path d="M168 198 q-10 46 -4 78 q4 24 18 28 q18 6 36 0 q14 -4 18 -28 q6 -32 -4 -78 q-8 -34 -32 -36 q-24 2 -32 36 z" fill="#e8b390" />
        {/* Vest left */}
        <path d="M166 206 q-8 40 -3 70 q2 18 14 22 l10 2 q-7 -18 -9 -40 q-4 -34 2 -54 z" fill={`url(#${voterId}-vest)`} />
        {/* Vest right */}
        <path d="M234 206 q8 40 3 70 q-2 18 -14 22 l-10 2 q7 -18 9 -40 q4 -34 -2 -54 z" fill={`url(#${voterId}-vest)`} opacity="0.98" />
        {/* Sash */}
        <path d="M170 272 q30 10 60 0 q-2 14 -30 16 q-28 -2 -30 -16 z" fill="#ffb020" />
        {/* Chest highlight */}
        <path d="M186 210 q14 10 28 0" stroke="#d9a37e" strokeWidth="2" fill="none" opacity="0.6" />

        {/* Arms - slim athletic */}
        <path d="M164 214 q-22 12 -26 34 q-4 18 8 24 q9 5 16 -3 q8 -10 10 -28 q2 -18 -2 -27 q-2 -5 -6 0 z" fill="#e8b390" />
        <circle cx="150" cy="276" r="8.5" fill="#e8b390" />
        <path d="M206 214 q22 12 26 34 q4 18 -8 24 q-9 5 -16 -3 q-8 -10 -10 -28 q-2 -18 2 -27 q2 -5 6 0 z" fill="#e8b390" opacity="0.96" />
        <circle cx="232" cy="276" r="8.5" fill="#e8b390" />

        {/* Neck */}
        <rect x="196" y="176" width="28" height="24" rx="9" fill="#e8b390" />

        {/* Head */}
        <g className="char-head">
          {/* Face */}
          <path d="M186 178 q0 -30 8 -40 q10 -8 24 -8 q16 0 26 8 q8 10 6 40 q0 12 -6 8 q-14 -8 -26 -8 q-12 0 -26 8 q-6 4 -6 -8 z" fill="#e8b390" />
          {/* Energetic anime eyes (looking toward ME) */}
          <g className="char-eyes">
            <ellipse cx="194" cy="172" rx="7" ry="9" fill="#241420" />
            <ellipse cx="224" cy="170" rx="7" ry="9" fill="#241420" />
            <circle cx="191" cy="169" r="3.2" fill="#ffffff" />
            <circle cx="221" cy="167" r="3.2" fill="#ffffff" />
            <circle cx="195" cy="175" r="1.4" fill="#ffffff" />
            <circle cx="225" cy="173" r="1.4" fill="#ffffff" />
          </g>
          {/* Confident brows */}
          <path d="M184 160 q10 -6 22 -2 M218 158 q12 -4 20 2" stroke="#241420" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          {/* Big grin */}
          <path d="M196 196 q16 14 32 0 q-6 14 -16 16 q-10 -2 -16 -16 z" fill="#241420" />
          <path d="M198 194 q12 10 24 0 q-12 10 -24 0 z" fill="#f0a0a0" opacity="0.9" />
          {/* Black messy anime hair */}
          <path d="M178 162 q-4 -30 12 -40 q14 -8 30 -4 q2 -10 12 -12 q8 -2 12 6 q8 -4 14 4 q6 8 2 18 q10 0 12 12 q2 8 -4 12 q-2 10 -10 6 q-22 -14 -44 -10 q-26 4 -36 8 z" fill="#20141a" />
          <path d="M184 150 q-2 -14 8 -20 q10 -6 20 -4 q-4 -6 4 -8 q8 -2 10 4 q8 -2 12 4 q4 6 0 12 q-18 -6 -32 -2 q-16 4 -22 14 z" fill="#2c1c22" />
          {/* Straw adventure hat */}
          <g transform="translate(200 128)">
            <path d="M-52 8 q52 20 104 0 q6 -14 -10 -18 q-40 10 -84 -10 q-14 6 -10 28 z" fill={`url(#${voterId}-hat)`} />
            <path d="M-30 2 q10 8 30 8 q20 0 30 -8 q-18 12 -30 12 q-14 0 -30 -12 z" fill="#c49a4a" />
            <path d="M-34 4 q2 -26 34 -26 q32 0 34 26 q-6 -10 -16 -12 q-36 -6 -52 12 z" fill={`url(#${voterId}-hat)`} />
            <path d="M-14 -10 q34 -12 66 0 l-8 4 q-26 -8 -50 0 z" fill="#e83a2a" />
          </g>
        </g>
      </g>

      {/* Interactive treasure chest gift */}
      <g className={`char-interact${interacted ? ' object-reacted' : ''}${revealed ? ' object-revealed' : ''}`} style={{ transformOrigin: '330px 330px' }}>
        <circle cx="330" cy="330" r="42" fill={`url(#char-glow)`} opacity="0.7" />
        <path d="M312 330 l14 -16 14 16 -4 20 -20 0 z" fill="#6a4020" />
        <path d="M310 336 l20 -8 20 8 q-6 14 -20 16 q-14 -2 -20 -16 z" fill="#8a5a2c" />
        <path d="M318 322 q12 -8 24 0" stroke="#ffd24a" strokeWidth="3" fill="none" />
        <circle cx="330" cy="326" r="3" fill="#ffd24a">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M326 348 q4 8 12 8 q-2 10 -12 6 q-8 -4 -6 -14 q4 -4 6 0 z" fill="#ffd24a" opacity="0.9" transform="translate(0 4)" />
      </g>

      <ellipse cx="200" cy="444" rx="150" ry="16" fill={`url(#char-floor)`} />
    </svg>
  )
}

export function ElectricScene({ revealed, interacted }: CharacterSceneProps) {
  const voterId = 'electric'
  return (
    <svg viewBox="0 0 400 500" className="char-svg char-svg-electric" preserveAspectRatio="xMidYMid meet">
      <defs>
        {commonDefs('#ffd23a', '#ff7a2a')}
        <linearGradient id={`${voterId}-fur`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe04a" />
          <stop offset="60%" stopColor="#f0b828" />
          <stop offset="100%" stopColor="#d89a18" />
        </linearGradient>
        <linearGradient id={`${voterId}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1430" />
          <stop offset="55%" stopColor="#102a48" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
        <radialGradient id={`${voterId}-moon`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffedb0" />
          <stop offset="100%" stopColor="#ffd878" />
        </radialGradient>
      </defs>

      {/* Night meadow */}
      <rect width="400" height="500" fill={`url(#${voterId}-sky)`} />
      {/* Moon */}
      <circle cx="318" cy="86" r="46" fill={`url(#char-glow)`} />
      <circle cx="318" cy="86" r="17" fill={`url(#${voterId}-moon)`} />
      {/* Stars */}
      <g fill="#ffffff">
        {[[50, 60], [110, 120], [160, 46], [230, 96], [280, 50], [370, 120], [90, 180]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.5 + (i % 2)}>
            <animate attributeName="opacity" values="1;0.2;1" dur={`${2 + (i % 3)}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
      {/* Hills */}
      <ellipse cx="120" cy="430" rx="220" ry="120" fill="#0a1c20" />
      <ellipse cx="320" cy="450" rx="240" ry="130" fill="#081620" />
      {/* Grass silhouettes */}
      <g stroke="#123a24" strokeWidth="3" fill="none" opacity="0.9">
        <path d="M20 440 q4 -24 10 -40 M26 440 q-4 -20 2 -34" />
        <path d="M368 436 q4 -26 12 -42 M376 436 q-4 -22 2 -36" />
        <path d="M60 460 q4 -20 8 -32 M66 460 q-4 -16 0 -28" />
        <path d="M336 462 q3 -18 8 -30 M342 462 q-3 -14 0 -24" />
      </g>

      {/* Fireflies */}
      <g fill="#ffe98a" opacity="0.8">
        {[[70, 260], [330, 220], [120, 150], [300, 320], [200, 120], [360, 300], [60, 330]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2 + (i % 2)}>
            <animate attributeName="cy" values={`${y};${y - 22};${y}`} dur={`${3.4 + i}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.1;0.8" dur={`${3.4 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* Creature - complete connected body */}
      <g className="char-breath" style={{ transformOrigin: '200px 440px' }}>
        {/* Tail (connected at body, lightning bolt shape) */}
        <path d="M162 408 q-18 4 -24 20 q-6 14 2 24 l-14 14 q-6 8 4 10 q8 0 12 -10 l10 -12 q14 2 18 -14 q2 -18 -8 -32 z" fill={`url(#${voterId}-fur)`} />
        {/* Tail dark stripes */}
        <path d="M152 426 h16 M158 442 h16" stroke="#8a6410" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

        {/* Legs + feet */}
        <path d="M176 420 q-2 14 4 22 q6 8 14 6 q8 -2 6 -12 q-2 -10 -8 -16 z" fill={`url(#${voterId}-fur)`} />
        <path d="M216 420 q2 14 -4 22 q-6 8 -14 6 q-8 -2 -6 -12 q2 -10 8 -16 z" fill={`url(#${voterId}-fur)`} />
        {/* Feet */}
        <ellipse cx="184" cy="446" rx="13" ry="7" fill="#d89a18" />
        <ellipse cx="214" cy="446" rx="13" ry="7" fill="#c98a10" />

        {/* Body */}
        <ellipse cx="198" cy="392" rx="40" ry="38" fill={`url(#${voterId}-fur)`} />
        {/* Belly */}
        <ellipse cx="198" cy="404" rx="24" ry="24" fill="#fff3c8" />
        {/* Back stripes */}
        <g stroke="#8a6410" strokeWidth="4" strokeLinecap="round" opacity="0.85">
          <line x1="166" y1="380" x2="182" y2="372" />
          <line x1="168" y1="366" x2="184" y2="358" />
          <line x1="230" y1="380" x2="214" y2="372" />
          <line x1="228" y1="366" x2="212" y2="358" />
        </g>

        {/* Arms + paws (connected) */}
        <path d="M158 386 q-18 6 -24 20 q-6 14 2 22 q6 6 14 2 q8 -6 10 -18 q2 -14 2 -22 q-4 -6 -4 -4 z" fill={`url(#${voterId}-fur)`} />
        <circle cx="144" cy="418" r="9" fill="#f0c020" />
        {/* Paw fingers */}
        <path d="M140 424 l-3 5 M144 425 l0 6 M149 424 l3 5" stroke="#b88010" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M238 386 q18 6 24 20 q6 14 -2 22 q-6 6 -14 2 q-8 -6 -10 -18 q-2 -14 -2 -22 q4 -6 4 -4 z" fill={`url(#${voterId}-fur)`} />
        <circle cx="252" cy="418" r="9" fill="#e8b018" />
        <path d="M248 424 l-3 5 M252 425 l0 6 M257 424 l3 5" stroke="#b88010" strokeWidth="2.4" strokeLinecap="round" />

        {/* Head (connected to body) */}
        <g className="char-head">
          <ellipse cx="198" cy="340" rx="42" ry="40" fill={`url(#${voterId}-fur)`} />
          {/* Ears - connected to head */}
          <path d="M160 316 q-14 -18 -8 -34 q8 -14 22 -8 q4 -16 16 -16 q14 0 16 16 q-14 -2 -20 8 q-16 10 -26 34 z" fill={`url(#${voterId}-fur)`} />
          <path d="M152 292 q6 -14 16 -16 q-4 12 -12 18 z" fill="#241410" />
          <path d="M236 316 q14 -18 8 -34 q-8 -14 -22 -8 q-4 -16 -16 -16 q-14 0 -16 16 q14 -2 20 8 q16 10 26 34 z" fill={`url(#${voterId}-fur)`} />
          <path d="M244 292 q-6 -14 -16 -16 q4 12 12 18 z" fill="#241410" />
          {/* Brown stripes on head */}
          <g stroke="#8a6410" strokeWidth="4" strokeLinecap="round" opacity="0.85">
            <line x1="168" y1="322" x2="182" y2="316" />
            <line x1="228" y1="322" x2="214" y2="316" />
          </g>
          {/* Face: cheeks */}
          <ellipse cx="178" cy="352" rx="13" ry="9" fill="#fff3c8" />
          <ellipse cx="218" cy="352" rx="13" ry="9" fill="#fff3c8" />
          {/* Eyes */}
          <g className="char-eyes">
            <ellipse cx="184" cy="338" rx="6" ry="8" fill="#18101c" />
            <ellipse cx="212" cy="338" rx="6" ry="8" fill="#18101c" />
            <circle cx="186" cy="334" r="2.6" fill="#ffffff" />
            <circle cx="214" cy="334" r="2.6" fill="#ffffff" />
          </g>
          {/* Blush */}
          <ellipse cx="172" cy="352" rx="6" ry="3.5" fill="#ff8060" opacity="0.45" />
          <ellipse cx="224" cy="352" rx="6" ry="3.5" fill="#ff8060" opacity="0.45" />
          {/* Cute mouth */}
          <path d="M192 356 q5 5 10 0 q5 5 10 0" stroke="#241410" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* Interactive electric spark gift */}
      <g className={`char-interact${interacted ? ' object-reacted' : ''}${revealed ? ' object-revealed' : ''}`} style={{ transformOrigin: '330px 330px' }}>
        <circle cx="330" cy="330" r="42" fill={`url(#char-glow)`} opacity="0.75" />
        <path d="M330 300 l12 24 24 4 -18 16 5 26 -23 -14 -23 14 5 -26 -18 -16 24 -4 z" fill="#ffd23a">
          <animate attributeName="opacity" values="1;0.55;1" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M330 316 l8 16 16 3 -12 10 4 18 -16 -10 -16 10 4 -18 -12 -10 16 -3 z" fill="#fff7c0" />
        <circle cx="330" cy="312" r="4" fill="#ffffff">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Ground shadow */}
      <ellipse cx="198" cy="452" rx="120" ry="16" fill={`url(#char-floor)`} />
    </svg>
  )
}

export function CurlyScene({ revealed, interacted }: CharacterSceneProps) {
  const voterId = 'curly'
  return (
    <svg viewBox="0 0 400 500" className="char-svg char-svg-curly" preserveAspectRatio="xMidYMid meet">
      <defs>
        {commonDefs('#4aa8ff', '#ffb040')}
        <linearGradient id={`${voterId}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c1636" />
          <stop offset="100%" stopColor="#150f28" />
        </linearGradient>
        <linearGradient id={`${voterId}-shirt`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8ecf4" />
          <stop offset="100%" stopColor="#c2c8d8" />
        </linearGradient>
        <linearGradient id={`${voterId}-jeans`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c5aa8" />
          <stop offset="100%" stopColor="#1e3d78" />
        </linearGradient>
      </defs>

      {/* 80s bedroom at night */}
      <rect width="400" height="500" fill={`url(#${voterId}-wall)`} />
      {/* Floor */}
      <rect y="388" width="400" height="112" fill="#201830" />
      {/* Floorboards */}
      <g stroke="#2e2244" strokeWidth="2" opacity="0.7">
        <line x1="0" y1="410" x2="400" y2="410" />
        <line x1="0" y1="440" x2="400" y2="440" />
        <line x1="0" y1="470" x2="400" y2="470" />
      </g>
      {/* Window + moon */}
      <rect x="262" y="46" width="108" height="130" rx="8" fill="#0e0a1e" stroke="#3a2a5a" strokeWidth="6" />
      <line x1="316" y1="46" x2="316" y2="176" stroke="#3a2a5a" strokeWidth="5" />
      <line x1="262" y1="112" x2="370" y2="112" stroke="#3a2a5a" strokeWidth="5" />
      <circle cx="320" cy="96" r="24" fill={`url(#char-glow)`} />
      <circle cx="320" cy="96" r="13" fill="#ffedbe" opacity="0.95" />
      {/* Stars in window */}
      <g fill="#ffffff" opacity="0.8">
        <circle cx="280" cy="70" r="1.6" />
        <circle cx="296" cy="138" r="1.4" />
        <circle cx="352" cy="78" r="1.6" />
      </g>
      {/* String lights across wall */}
      <path d="M20 66 q50 20 100 0 q50 -20 100 0 q30 12 62 0" stroke="#1c1630" strokeWidth="2" fill="none" />
      <g>
        {[30, 60, 95, 130, 165, 200, 235, 275, 315, 350].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={58 + (i % 2) * 18} r="4.5" fill={i % 2 ? '#ffd24a' : '#ff5060'}>
              <animate attributeName="opacity" values="1;0.3;1" dur={`${1.7 + (i % 3)}s`} begin={`${i * 0.25}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={x} cy={58 + (i % 2) * 18} r="8" fill={i % 2 ? '#ffd24a' : '#ff5060'} opacity="0.15" />
          </g>
        ))}
      </g>
      {/* Corkboard with adventure notes */}
      <rect x="18" y="150" width="120" height="150" rx="6" fill="#6a4020" stroke="#4a2a12" strokeWidth="4" />
      <g stroke="#c8c0b0" strokeWidth="2" strokeLinecap="round" opacity="0.7">
        <line x1="36" y1="176" x2="120" y2="176" />
        <line x1="36" y1="206" x2="120" y2="206" />
        <line x1="36" y1="236" x2="114" y2="236" />
      </g>
      <circle cx="36" cy="176" r="3" fill="#ff6a6a" />
      {/* Compass sketch on board */}
      <circle cx="78" cy="270" r="18" fill="none" stroke="#e8e0c8" strokeWidth="2" opacity="0.6" />
      <path d="M78 254 l4 8 4 2 -4 8 -4 -8 -4 8 -4 -8 4 -8 -4 -2 z" fill="#e8e0c8" opacity="0.5" />
      {/* Radio / cassette player */}
      <rect x="14" y="330" width="70" height="46" rx="6" fill="#2a2038" stroke="#3e3052" strokeWidth="2" />
      <rect x="22" y="338" width="54" height="12" rx="3" fill="#12101e" />
      <circle cx="32" cy="362" r="4" fill="#ffd24a" />
      <circle cx="62" cy="362" r="4" fill="#ffd24a" />

      {/* Character - friendly curly-haired boy */}
      <g className="char-breath" style={{ transformOrigin: '200px 440px' }}>
        {/* Legs - jeans, connected to hips */}
        <g fill={`url(#${voterId}-jeans)`}>
          <path d="M176 300 q-6 46 -4 76 q0 16 12 18 l14 0 q12 0 14 -14 q3 -30 -2 -72 q-3 -26 -17 -28 q-10 -2 -17 20 z" />
          <path d="M238 300 q2 46 2 76 q3 16 13 16 l12 0 q12 0 14 -12 q3 -30 -1 -72 q-3 -28 -17 -28 q-9 0 -23 20 z" opacity="0.96" />
        </g>
        {/* Sneakers */}
        <path d="M170 424 q-2 10 8 12 l16 2 q12 0 13 -8 q2 -12 -8 -14 q-3 0 -8 4 q-15 10 -21 4 z" fill="#e8eaf2" />
        <line x1="172" y1="430" x2="206" y2="434" stroke="#9aa0b4" strokeWidth="2" />
        <path d="M256 424 q2 10 -8 12 l-16 2 q-12 0 -13 -8 q-2 -12 8 -14 q3 0 8 4 q15 10 21 4 z" fill="#d8dce8" opacity="0.95" />
        <line x1="254" y1="430" x2="222" y2="434" stroke="#9aa0b4" strokeWidth="2" />

        {/* Striped retro tee */}
        <path d="M168 200 q-10 44 -4 78 q4 24 18 28 q18 6 36 0 q14 -4 18 -28 q6 -34 -4 -78 q-8 -34 -32 -36 q-24 2 -32 36 z" fill={`url(#${voterId}-shirt)`} />
        {/* Horizontal stripes */}
        <g fill="none" strokeWidth="6" opacity="0.85">
          <path d="M166 222 q34 8 68 0" stroke="#e8563a" />
          <path d="M164 244 q36 8 72 0" stroke="#2c86d0" />
          <path d="M164 266 q36 8 72 0" stroke="#e8563a" />
          <path d="M166 288 q34 8 68 0" stroke="#2c86d0" />
        </g>
        {/* Short sleeves + arms */}
        <path d="M164 208 q-22 10 -30 30 q-8 18 4 26 q9 6 16 -2 q10 -12 16 -34 q3 -16 -6 -20 z" fill="#d0d6e4" />
        <path d="M152 252 q-2 16 6 24 q6 6 14 0 q8 -6 8 -22 q0 -16 -6 -24 q-8 -6 -14 0 q-4 8 -8 22 z" fill="#e8b390" />
        <circle cx="160" cy="286" r="9" fill="#e8b390" />
        <path d="M208 208 q22 10 30 30 q8 18 -4 26 q-9 6 -16 -2 q-10 -12 -16 -34 q-3 -16 6 -20 z" fill="#d0d6e4" />
        <path d="M220 252 q2 16 -6 24 q-6 6 -14 0 q-8 -6 -8 -22 q0 -16 6 -24 q8 -6 14 0 q4 8 8 22 z" fill="#e8b390" />
        <circle cx="212" cy="286" r="9" fill="#e8b390" />

        {/* Neck */}
        <rect x="196" y="178" width="28" height="24" rx="9" fill="#e8b390" />

        {/* Head */}
        <g className="char-head">
          {/* Round friendly face */}
          <path d="M184 176 q0 -30 8 -40 q10 -8 26 -8 q16 0 26 8 q8 10 6 40 q0 12 -6 8 q-14 -8 -26 -8 q-12 0 -26 8 q-6 4 -6 -8 z" fill="#e8b390" />
          {/* Curly dark hair - cloud of curls */}
          <g fill="#241410">
            <circle cx="186" cy="156" r="13" />
            <circle cx="200" cy="146" r="14" />
            <circle cx="214" cy="156" r="13" />
            <circle cx="174" cy="168" r="11" />
            <circle cx="226" cy="168" r="11" />
            <circle cx="200" cy="136" r="12" />
            <circle cx="174" cy="152" r="12" />
            <circle cx="226" cy="152" r="12" />
            <circle cx="188" cy="144" r="10" />
            <circle cx="212" cy="144" r="10" />
          </g>
          {/* Fringe curls */}
          <g fill="#33201a">
            <circle cx="180" cy="162" r="8" />
            <circle cx="193" cy="156" r="9" />
            <circle cx="207" cy="156" r="9" />
            <circle cx="220" cy="162" r="8" />
          </g>
          {/* Eyes (friendly, ready for adventure) */}
          <g className="char-eyes">
            <ellipse cx="196" cy="178" rx="5.5" ry="6.5" fill="#1c1418" />
            <ellipse cx="222" cy="178" rx="5.5" ry="6.5" fill="#1c1418" />
            <circle cx="198" cy="176" r="2" fill="#ffffff" />
            <circle cx="224" cy="176" r="2" fill="#ffffff" />
          </g>
          {/* Brows */}
          <path d="M187 168 q9 -5 18 -1 M214 168 q9 -4 17 1" stroke="#241410" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          {/* Big smile + freckles */}
          <path d="M198 200 q11 10 22 0" stroke="#a3563a" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <circle cx="192" cy="190" r="1.5" fill="#c98d68" />
          <circle cx="198" cy="193" r="1.5" fill="#c98d68" />
          <circle cx="204" cy="190" r="1.5" fill="#c98d68" />
        </g>
      </g>

      {/* Interactive glowing compass gift */}
      <g className={`char-interact${interacted ? ' object-reacted' : ''}${revealed ? ' object-revealed' : ''}`} style={{ transformOrigin: '330px 340px' }}>
        <circle cx="330" cy="340" r="42" fill={`url(#char-glow)`} opacity="0.7" />
        <circle cx="330" cy="340" r="22" fill="#c89a3a" stroke="#8a6420" strokeWidth="2">
          <animate attributeName="r" values="22;25;22" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="330" cy="340" r="17" fill="#f5efdc" />
        <path d="M330 326 l4 8 6 2 -6 2 -4 8 -4 -8 -6 -2 6 -2 z" fill="#e8563a" />
        <path d="M330 354 l-4 -6 -5 -1 5 -1 4 -6 4 6 5 1 -5 1 z" fill="#2c86d0" />
        <circle cx="330" cy="340" r="2.4" fill="#141414" />
        <path d="M330 320 l0 40 M310 340 l40 0" stroke="#c8b080" strokeWidth="1.6" opacity="0.5" />
      </g>

      <ellipse cx="200" cy="446" rx="150" ry="16" fill={`url(#char-floor)`} />
    </svg>
  )
}

const sceneMap: Record<string, (props: CharacterSceneProps) => ReactElement> = {
  web: SpiderScene,
  green: HulkScene,
  pirate: PirateScene,
  electric: ElectricScene,
  redhair: MaxScene,
  psychic: ElevenScene,
  retrohero: SteveScene,
  curly: CurlyScene,
  gothic: MisaScene,
}

export function CharacterScene({ character, revealed, interacted }: CharacterSceneProps) {
  const Scene = sceneMap[character.id] ?? SpiderScene
  return (
    <div className="character-stage">
      <div className="char-sky" style={{ background: character.bgGradient }} />
      <Scene character={character} revealed={revealed} interacted={interacted} />
      <div className="char-stage-vignette" aria-hidden="true" />
    </div>
  )
}

export default CharacterScene