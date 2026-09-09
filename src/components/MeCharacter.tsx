export type MePose = 'idle' | 'wave' | 'cheer' | 'clap'

interface MeCharacterProps {
  className?: string
  pose?: MePose
}

function MeCharacter({ className = '', pose = 'idle' }: MeCharacterProps) {
  const isWave = pose === 'wave'
  const isCheer = pose === 'cheer'
  const isClap = pose === 'clap'

  return (
    <svg viewBox="0 0 200 360" className={`me-character ${className}`} aria-label="Birthday hero" role="img">
      <defs>
        <linearGradient id="me-sweater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8563a" />
          <stop offset="100%" stopColor="#b93624" />
        </linearGradient>
        <linearGradient id="me-hood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f26a4a" />
          <stop offset="100%" stopColor="#c3432a" />
        </linearGradient>
        <linearGradient id="me-jeans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b5aa8" />
          <stop offset="100%" stopColor="#283e7c" />
        </linearGradient>
        <linearGradient id="me-shoe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f6fa" />
          <stop offset="100%" stopColor="#c7ccd8" />
        </linearGradient>
        <radialGradient id="me-hair-grad" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#4a3224" />
          <stop offset="100%" stopColor="#2c1a10" />
        </radialGradient>
      </defs>

      {/* Contact shadow */}
      <ellipse className="me-contact" cx="100" cy="340" rx="54" ry="9" fill="rgba(0,0,0,0.5)" />

      <g className="me-breath">
        {/* ===== LEGS + FEET ===== */}
        <g className="me-legs">
          {/* Left leg */}
          <path d="M86 250 q-4 8 -6 22 q-4 28 0 48 q2 12 12 12 l8 0 q10 0 12 -12 q4 -22 -2 -50 q-3 -16 -10 -20 q-6 -3 -14 0 z" fill="url(#me-jeans)" />
          {/* Right leg */}
          <path d="M114 250 q4 8 6 24 q4 26 0 46 q-3 12 -12 12 l-8 0 q-10 0 -12 -12 q-3 -24 2 -48 q3 -17 10 -20 q6 -3 14 -2 z" fill="url(#me-jeans)" opacity="0.96" />
          {/* Left shoe */}
          <path d="M72 322 q-2 10 8 13 l14 2 q12 0 13 -8 q2 -12 -6 -14 q-14 -4 -19 1 q-13 6 -10 6 z" fill="url(#me-shoe)" />
          <path d="M70 326 l18 -4 6 4 -18 6 z" fill="#e8eaf2" opacity="0.6" />
          {/* Right shoe */}
          <path d="M120 322 q2 10 -8 13 l-14 2 q-12 0 -13 -8 q-2 -12 6 -14 q14 -4 19 1 q13 6 10 6 z" fill="url(#me-shoe)" opacity="0.95" />
          <path d="M130 326 l-18 -4 -6 4 18 6 z" fill="#e8eaf2" opacity="0.6" />
        </g>

        {/* ===== TORSO (casual hoodie) ===== */}
        <path d="M62 186 q-4 28 -2 52 q1 18 14 22 q26 8 52 0 q13 -4 14 -22 q2 -24 -2 -52 q-4 -28 -38 -32 q-34 4 -38 32 z" fill="url(#me-sweater)" />
        {/* Hoodie pocket */}
        <path d="M84 236 q16 10 34 0 q-2 10 -17 12 q-15 -2 -17 -12 z" fill="#a8321f" />
        {/* Hoodie drawstrings */}
        <path d="M92 200 l-2 22 M108 200 l2 22" stroke="#c3432a" strokeWidth="3" strokeLinecap="round" />
        {/* Zipper hint */}
        <line x1="100" y1="188" x2="100" y2="252" stroke="#7c2416" strokeWidth="2" />

        {/* ===== ARMS ===== */}
        {/* Left arm (far side, hanging) */}
        <path d="M64 196 q-22 14 -26 38 q-3 20 12 24 q10 3 15 -6 q8 -20 12 -40 q3 -16 -13 -16 z" fill="url(#me-hood)" />
        {/* Left hand */}
        <circle cx="56" cy="258" r="10" fill="#e8b390" />

        {/* Right arm (near side) - pose driven */}
        {isIdle(isWave, isCheer, isClap) ? (
          <g className="me-arm-right">
            <path d="M136 196 q22 12 28 36 q5 22 -10 26 q-11 2 -15 -8 q-8 -22 -12 -40 q-3 -14 9 -14 z" fill="url(#me-hood)" />
            <circle cx="152" cy="260" r="10" fill="#e8b390" />
          </g>
        ) : isCheer ? (
          <g className="me-arm-right me-cheer-arm">
            <path d="M136 196 q26 2 38 -18 q8 -16 -2 -24 q-10 -8 -18 2 q-14 20 -22 34 q-6 10 4 6 z" fill="url(#me-hood)" />
            <circle cx="166" cy="158" r="10" fill="#e8b390" />
          </g>
        ) : isClap ? (
          <g className="me-arm-right me-clap-arm">
            <path d="M136 196 q24 8 32 24 q8 16 0 24 q-10 8 -20 -4 q-12 -18 -18 -34 q-4 -12 6 -10 z" fill="url(#me-hood)" />
            <circle cx="166" cy="238" r="10" fill="#e8b390" />
          </g>
        ) : (
          <g className="me-arm-right me-wave-arm">
            <path d="M136 196 q26 -4 40 -22 q10 -14 2 -22 q-9 -8 -18 2 q-14 18 -26 34 q-6 10 2 8 z" fill="url(#me-hood)" />
            {/* Open waving hand with fingers */}
            <g transform="translate(168 152) rotate(-18)">
              <circle cx="4" cy="0" r="10" fill="#e8b390" />
              <rect x="-2" y="-18" width="5" height="16" rx="2.5" fill="#d9a37e" />
              <rect x="6" y="-21" width="5" height="16" rx="2.5" fill="#d9a37e" />
              <rect x="14" y="-17" width="5" height="13" rx="2.5" fill="#d9a37e" />
              <rect x="-9" y="-13" width="5" height="12" rx="2.5" fill="#e8b390" />
            </g>
          </g>
        )}

        {/* ===== NECK ===== */}
        <rect x="92" y="166" width="16" height="20" rx="7" fill="#e8b390" />

        {/* ===== HEAD ===== */}
        <g className="me-head">
          {/* Neck shadow bound */}
          <path d="M88 168 q12 8 24 0 l0 4 q-12 8 -24 0 z" fill="#c98d68" opacity="0.7" />

          {/* Face */}
          <path d="M80 150 q0 -26 8 -35 q9 -9 24 -9 q15 0 24 9 q8 9 8 35 q0 14 -6 10 q-12 -8 -26 -8 q-14 0 -26 8 q-6 4 -6 -10 z" fill="#e8b390" />
          {/* Ear hint */}
          <circle cx="104" cy="150" r="3.4" fill="#d9a37e" />

          {/* Eyes with blink */}
          <g className="me-eyes">
            <ellipse cx="92" cy="152" rx="3.6" ry="4.2" fill="#2c1c10" />
            <ellipse cx="110" cy="152" rx="3.6" ry="4.2" fill="#2c1c10" />
            <circle cx="93" cy="150" r="1.2" fill="#ffffff" />
            <circle cx="111" cy="150" r="1.2" fill="#ffffff" />
          </g>
          {/* Brows */}
          <path d="M85 144 q7 -4 14 -1 M105 143 q7 -3 13 1" stroke="#3a2418" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Friendly smile */}
          <path d="M94 166 q8 7 16 0" stroke="#a3563a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          {/* Nose */}
          <path d="M101 156 q2 3 1 6" stroke="#d19a76" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Natural hairstyle */}
          <path d="M78 150 q-2 -34 12 -44 q6 -5 14 -5 q14 0 20 7 q14 12 12 40 q-2 4 -6 2 q-16 -12 -34 -12 q-16 0 -30 8 q-4 3 -8 -6 z" fill="url(#me-hair-grad)" />
          <path d="M80 136 q0 -24 10 -32 q8 -6 18 -6 q10 0 16 6 q8 8 10 22 q-12 -14 -30 -14 q-18 0 -24 24 z" fill="#3a2418" opacity="0.9" />
          {/* Sideburn strands */}
          <path d="M80 146 q-3 10 -1 18 q1 6 4 8 q2 -8 1 -16 q-1 -7 -1 -10 z" fill="#3a2418" opacity="0.8" />
          <path d="M120 144 q3 10 1 18 q-1 6 -4 8 q-2 -8 -1 -16 q1 -7 1 -10 z" fill="#3a2418" opacity="0.8" />
        </g>
      </g>
    </svg>
  )
}

function isIdle(isWave: boolean, isCheer: boolean, isClap: boolean) {
  return !isWave && !isCheer && !isClap
}

export default MeCharacter