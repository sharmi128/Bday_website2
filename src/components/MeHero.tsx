export type MePose =
  | 'idle'
  | 'talking'
  | 'pointing'
  | 'clapping'
  | 'feeding'
  | 'receptive'
  | 'handshake'
  | 'happy'
  | 'gesturing'

interface MeHeroProps {
  className?: string
  pose?: MePose
}

/**
 * ME / BRUNO — a complete, naturally-proportioned young boy.
 * Every limb connects: head→neck→torso, hands→arms→shoulders,
 * feet→legs, with a grounded contact shadow.
 */
function MeHero({ className = '', pose = 'idle' }: MeHeroProps) {
  const isTalking = pose === 'talking'
  const isPointing = pose === 'pointing' || pose === 'gesturing'
  const isClapping = pose === 'clapping'
  const isFeeding = pose === 'feeding'
  const isReceptive = pose === 'receptive'
  const isHandshake = pose === 'handshake'
  const isHappy = pose === 'happy'
  const looksTowardCake = isPointing || isFeeding || isHandshake || isReceptive

  return (
    <svg viewBox="0 0 220 360" className={className} aria-label="BRUNO" role="img">
      <defs>
        <linearGradient id="bh-sweater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8563a" />
          <stop offset="100%" stopColor="#b93624" />
        </linearGradient>
        <linearGradient id="bh-hood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f26a4a" />
          <stop offset="100%" stopColor="#c3432a" />
        </linearGradient>
        <linearGradient id="bh-jeans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b5aa8" />
          <stop offset="100%" stopColor="#283e7c" />
        </linearGradient>
        <linearGradient id="bh-shoe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f6fa" />
          <stop offset="100%" stopColor="#c7ccd8" />
        </linearGradient>
        <radialGradient id="bh-hair-grad" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#4a3224" />
          <stop offset="100%" stopColor="#2c1a10" />
        </radialGradient>
        <radialGradient id="bh-shadow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.55)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Contact shadow on the floor */}
      <ellipse cx="110" cy="349" rx="58" ry="10" fill="url(#bh-shadow)" />

      {/* Interaction anchor points (invisible, used for feeding / handshake) */}
      <g fill="none">
        <circle className="bh-feed-hand" cx="90" cy="167" r="0.01" />
        <circle className="bh-mouth" cx="111" cy="170" r="0.01" />
        <circle className="bh-shake-hand" cx="92" cy="154" r="0.01" />
      </g>

      <g className="bh-breath">
        {/* ===== LEGS + FEET ===== */}
        <g className="bh-legs">
          {/* Left leg */}
          <path d="M96 252 q-4 10 -6 26 q-4 30 0 48 q2 12 12 12 l10 0 q10 0 12 -12 q3 -20 -2 -48 q-3 -16 -9 -20 q-6 -3 -17 -6 z" fill="url(#bh-jeans)" />
          {/* Right leg */}
          <path d="M124 252 q4 10 6 26 q4 30 0 48 q-2 12 -12 12 l-10 0 q-10 0 -12 -12 q-3 -20 2 -48 q3 -16 9 -20 q6 -3 17 -6 z" fill="url(#bh-jeans)" opacity="0.97" />
          {/* Left shoe */}
          <path d="M82 324 q-2 12 8 15 l16 2 q14 0 15 -9 q2 -13 -7 -15 q-16 -4 -22 1 q-12 6 -10 6 z" fill="url(#bh-shoe)" />
          <path d="M80 329 l20 -4 7 5 -20 7 z" fill="#e8eaf2" opacity="0.65" />
          {/* Right shoe */}
          <path d="M132 324 q2 12 -8 15 l-16 2 q-14 0 -15 -9 q-2 -13 7 -15 q16 -4 22 1 q12 6 10 6 z" fill="url(#bh-shoe)" opacity="0.95" />
          <path d="M143 329 l-20 -4 -7 5 20 7 z" fill="#e8eaf2" opacity="0.65" />
        </g>

        {/* ===== TORSO (casual hoodie) ===== */}
        <path d="M72 188 q-4 30 -2 54 q1 18 15 22 q27 8 54 0 q14 -4 15 -22 q2 -24 -2 -54 q-4 -29 -40 -33 q-36 4 -40 33 z" fill="url(#bh-sweater)" />
        {/* Hoodie pocket */}
        <path d="M94 240 q17 10 35 0 q-2 11 -18 13 q-15 -2 -17 -13 z" fill="#a8321f" />
        {/* Drawstrings */}
        <path d="M102 200 l-2 24 M118 200 l2 24" stroke="#c3432a" strokeWidth="3" strokeLinecap="round" />
        {/* Zipper hint */}
        <line x1="110" y1="190" x2="110" y2="256" stroke="#7c2416" strokeWidth="2" />
        {/* Hem shadow */}
        <path d="M74 240 q36 14 72 0" stroke="#8c2617" strokeWidth="2" fill="none" opacity="0.5" />

        {/* ===== ARMS (connected to shoulders) ===== */}
        {/* LEFT arm */}
        {isClapping ? (
          <g className="bh-arm-left mh-clap-left">
            <path d="M84 198 Q72 172 88 152" stroke="url(#bh-hood)" strokeWidth="21" fill="none" strokeLinecap="round" />
            <circle cx="90" cy="150" r="9.5" fill="#e8b390" />
          </g>
        ) : isHappy ? (
          <g className="bh-arm-left">
            <path d="M84 198 Q64 172 70 150" stroke="url(#bh-hood)" strokeWidth="21" fill="none" strokeLinecap="round" />
            <circle cx="70" cy="147" r="9.5" fill="#e8b390" />
          </g>
        ) : (
          <g className="bh-arm-left">
            <path d="M84 198 Q64 218 60 244" stroke="url(#bh-hood)" strokeWidth="21" fill="none" strokeLinecap="round" />
            <circle cx="60" cy="248" r="9.5" fill="#e8b390" />
          </g>
        )}

        {/* RIGHT arm */}
        {isPointing ? (
          <g className="bh-arm-right mh-point-arm">
            <path d="M136 198 Q112 172 100 152" stroke="url(#bh-hood)" strokeWidth="21" fill="none" strokeLinecap="round" />
            <g transform="translate(99 149) rotate(-28)">
              <circle cx="0" cy="0" r="9.5" fill="#e8b390" />
              <rect x="-4" y="-20" width="5" height="18" rx="2.5" fill="#d9a37e" />
              <rect x="4" y="-22" width="5" height="18" rx="2.5" fill="#d9a37e" />
            </g>
          </g>
        ) : isFeeding ? (
          <g className="bh-arm-right mh-feed-arm">
            <path d="M136 198 Q116 174 92 168" stroke="url(#bh-hood)" strokeWidth="21" fill="none" strokeLinecap="round" />
            <circle cx="90" cy="167" r="9.5" fill="#e8b390" />
          </g>
        ) : isReceptive ? (
          <g className="bh-arm-right mh-receptive-arm">
            <path d="M136 198 Q150 236 150 252" stroke="url(#bh-hood)" strokeWidth="21" fill="none" strokeLinecap="round" />
            <circle cx="150" cy="255" r="9.5" fill="#e8b390" />
          </g>
        ) : isHandshake ? (
          <g className="bh-arm-right mh-handshake-arm">
            <path d="M136 198 Q112 170 94 156" stroke="url(#bh-hood)" strokeWidth="21" fill="none" strokeLinecap="round" />
            <circle cx="92" cy="154" r="9.5" fill="#e8b390" />
          </g>
        ) : isClapping ? (
          <g className="bh-arm-right mh-clap-right">
            <path d="M136 198 Q148 172 132 152" stroke="url(#bh-hood)" strokeWidth="21" fill="none" strokeLinecap="round" />
            <circle cx="130" cy="150" r="9.5" fill="#e8b390" />
          </g>
        ) : isHappy ? (
          <g className="bh-arm-right">
            <path d="M136 198 Q156 172 152 150" stroke="url(#bh-hood)" strokeWidth="21" fill="none" strokeLinecap="round" />
            <circle cx="152" cy="147" r="9.5" fill="#e8b390" />
          </g>
        ) : (
          <g className="bh-arm-right">
            <path d="M136 198 Q156 218 160 244" stroke="url(#bh-hood)" strokeWidth="21" fill="none" strokeLinecap="round" />
            <circle cx="160" cy="248" r="9.5" fill="#e8b390" />
          </g>
        )}

        {/* ===== NECK ===== */}
        <rect x="102" y="168" width="16" height="20" rx="7" fill="#e8b390" />

        {/* ===== HEAD (sways gently, turns toward the cake) ===== */}
        <g className="mh-head">
          <g className={looksTowardCake ? 'mh-face-left' : ''}>
            {/* Neck shadow bind */}
            <path d="M98 170 q12 8 24 0 l0 4 q-12 8 -24 0 z" fill="#c98d68" opacity="0.7" />

            {/* Face */}
            <path d="M90 152 q0 -27 9 -36 q9 -9 25 -9 q16 0 25 9 q9 9 9 36 q0 14 -6 10 q-13 -8 -28 -8 q-15 0 -28 8 q-6 4 -6 -10 z" fill="#e8b390" />
            {/* Ear + earlobe */}
            <circle cx="114" cy="152" r="3.4" fill="#d9a37e" />
            <circle cx="114" cy="158" r="2.2" fill="#e8b390" />

            {/* Eyes */}
            <g className="mh-eyes">
              {isReceptive ? (
                <>
                  {/* happy closed eyes while receiving cake */}
                  <path d="M88 154 q5 -6 10 0 M112 154 q5 -6 10 0" stroke="#2c1c10" strokeWidth="3" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  <ellipse cx="102" cy="154" rx="3.8" ry="4.4" fill="#2c1c10" />
                  <ellipse cx="120" cy="154" rx="3.8" ry="4.4" fill="#2c1c10" />
                  <circle cx="103" cy="152" r="1.3" fill="#ffffff" />
                  <circle cx="121" cy="152" r="1.3" fill="#ffffff" />
                </>
              )}
            </g>
            {/* Brows */}
            <path d="M95 145 q8 -4 15 -1 M115 144 q8 -3 14 1" stroke="#3a2418" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Nose */}
            <path d="M111 158 q2 3 1 6" stroke="#d19a76" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Mouth */}
            {isTalking || isReceptive ? (
              <ellipse cx="111" cy="170" rx="5.5" ry="6" fill="#a3563a" className="bh-mouth-open" />
            ) : isHappy || isClapping ? (
              <path d="M102 166 q9 9 18 0" stroke="#a3563a" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            ) : (
              <path d="M104 166 q7 6 14 0" stroke="#a3563a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            )}

            {/* Natural hairstyle */}
            <path d="M88 152 q-2 -36 13 -46 q6 -5 14 -5 q14 0 21 7 q14 12 12 42 q-2 4 -6 2 q-16 -12 -34 -12 q-16 0 -30 8 q-4 3 -8 -6 z" fill="url(#bh-hair-grad)" />
            <path d="M90 138 q-2 -25 11 -33 q9 -6 19 -6 q10 0 17 6 q8 8 10 22 q-13 -14 -31 -14 q-18 0 -26 25 z" fill="#3a2418" opacity="0.9" />
            {/* Sideburns */}
            <path d="M90 148 q-3 11 -1 19 q1 6 4 8 q2 -8 1 -16 q-1 -8 -1 -11 z" fill="#3a2418" opacity="0.8" />
            <path d="M132 146 q3 11 1 19 q-1 6 -4 8 q-2 -8 -1 -16 q1 -8 1 -11 z" fill="#3a2418" opacity="0.8" />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default MeHero