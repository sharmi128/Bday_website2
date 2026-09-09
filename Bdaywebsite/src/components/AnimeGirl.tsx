export type GirlPose =
  | 'idle'
  | 'talking'
  | 'pointing'
  | 'clapping'
  | 'eating'
  | 'handshake'
  | 'smiling'
  | 'openMouth'
  | 'offering'
  | 'notice'

interface AnimeGirlProps {
  className?: string
  pose?: GirlPose
}

/**
 * SHANTRA — complete connected girl character.
 * Head→neck→body, hands→arms→shoulders, skirt→legs→shoes grounded
 * with a contact shadow. Turns to face BRUNO and the cake when needed.
 */
function AnimeGirl({ className = '', pose = 'idle' }: AnimeGirlProps) {
  const isTalking = pose === 'talking'
  const isPointing = pose === 'pointing'
  const isClapping = pose === 'clapping'
  const isEating = pose === 'eating'
  const isHandshake = pose === 'handshake'
  const isSmiling = pose === 'smiling'
  const isOpenMouth = pose === 'openMouth'
  const isOffering = pose === 'offering'
  const isNotice = pose === 'notice'
  const looksRight = isNotice || isOffering || isOpenMouth || isEating || isHandshake
  const eyesClosed = isEating

  return (
    <svg viewBox="0 0 200 360" className={className} aria-label="SHANTRA" role="img">
      <defs>
        <radialGradient id="ag-hair-grad" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#6B4ECF" />
          <stop offset="100%" stopColor="#4A2FA0" />
        </radialGradient>
        <radialGradient id="ag-skin-grad" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#FFE0CC" />
          <stop offset="100%" stopColor="#F5C9A8" />
        </radialGradient>
        <radialGradient id="ag-eye-grad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#5B9FFF" />
          <stop offset="70%" stopColor="#2B6FFF" />
          <stop offset="100%" stopColor="#1A4FD0" />
        </radialGradient>
        <linearGradient id="ag-dress-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D02040" />
          <stop offset="100%" stopColor="#A01830" />
        </linearGradient>
        <linearGradient id="ag-apron-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0F0F8" />
        </linearGradient>
        <radialGradient id="ag-shadow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.55)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Interaction anchor points (invisible, used for feeding / handshake) */}
      <g fill="none">
        <circle className="ag-mouth" cx="100" cy="130" r="0.01" />
        <circle className="ag-offer-hand" cx="172" cy="120" r="0.01" />
        <circle className="ag-shake-hand" cx="180" cy="116" r="0.01" />
      </g>

      {/* Contact shadow on the floor */}
      <ellipse cx="100" cy="347" rx="56" ry="10" fill="url(#ag-shadow)" />

      {/* ── Hair (back layer) ── */}
      <g className="ag-hair-back">
        <ellipse cx="100" cy="105" rx="58" ry="62" fill="url(#ag-hair-grad)" />
        <ellipse cx="100" cy="165" rx="36" ry="52" fill="#4A2FA0" opacity="0.7" />
      </g>

      {/* ── Neck ── */}
      <rect x="88" y="140" width="24" height="30" rx="10" fill="#F5C9A8" />

      {/* ── Body / Dress ── */}
      <g className="ag-body">
        {/* Dress top */}
        <path d="M65 158 Q68 148 100 145 Q132 148 135 158 L138 210 Q100 215 62 210 Z" fill="url(#ag-dress-grad)" />
        {/* Dress skirt */}
        <path d="M62 210 Q58 260 52 308 L148 308 Q142 260 138 210 Z" fill="#C01838" />
        <path d="M62 210 Q58 260 52 308 L148 308 Q142 260 138 210 Z" fill="rgba(255,255,255,0.08)" />
        {/* Belt / waist ribbon */}
        <rect x="64" y="204" width="72" height="10" rx="3" fill="#D02040" />
        <rect x="92" y="201" width="16" height="16" rx="4" fill="#FFD700" />
        <rect x="95" y="204" width="10" height="10" rx="3" fill="#FFAA00" />
        {/* Dress collar / white accent */}
        <path d="M88 145 Q100 155 112 145" stroke="#fff" strokeWidth="2" fill="none" opacity="0.6" />
        {/* Red bow on chest */}
        <ellipse cx="88" cy="162" rx="8" ry="5" fill="#FF5070" transform="rotate(-15 88 162)" />
        <ellipse cx="112" cy="162" rx="8" ry="5" fill="#FF5070" transform="rotate(15 112 162)" />
        <circle cx="100" cy="162" r="4" fill="#FF3060" />
      </g>

      {/* ── Legs + shoes (peeking under the skirt) ── */}
      <g className="ag-legs">
        <path d="M80 304 q0 14 2 20 q1 8 9 8 l12 0 q8 0 9 -8 q1 -8 0 -18 l-16 -2 z" fill="#F0C8D8" />
        <path d="M120 304 q0 14 -2 20 q-1 8 -9 8 l-12 0 q-8 0 -9 -8 q-1 -8 0 -18 l16 -2 z" fill="#E9BDA6" />
        {/* Ballet-style shoes */}
        <path d="M74 330 q-2 8 6 9 l22 1 q12 0 14 -7 q2 -9 -7 -10 q-16 -2 -22 2 q-11 5 -13 5 z" fill="#FF5070" />
        <path d="M126 330 q2 8 -6 9 l-22 1 q-12 0 -14 -7 q-2 -9 7 -10 q16 -2 22 2 q11 5 13 5 z" fill="#E8486B" />
      </g>

      {/* ── Arms ── */}
      {isClapping ? (
        <>
          <g className="ag-arm-l ag-clap-l">
            <path d="M65 158 Q70 130 86 124" stroke="#F5C9A8" strokeWidth="16" fill="none" strokeLinecap="round" />
            <circle cx="88" cy="123" r="10" fill="#F5C9A8" />
          </g>
          <g className="ag-arm-r ag-clap-r">
            <path d="M135 158 Q130 130 114 124" stroke="#F5C9A8" strokeWidth="16" fill="none" strokeLinecap="round" />
            <circle cx="112" cy="123" r="10" fill="#F5C9A8" />
          </g>
        </>
      ) : (
        <>
          {/* Left arm */}
          <g className="ag-arm-l">
            <path d="M65 158 Q46 176 38 210" stroke="#F5C9A8" strokeWidth="16" fill="none" strokeLinecap="round" />
            <circle cx="38" cy="213" r="10" fill="#F5C9A8" />
          </g>
          {/* Right arm */}
          {isHandshake ? (
            <g className="ag-arm-r ag-handshake-hand">
              <path d="M135 158 Q162 132 178 118" stroke="#F5C9A8" strokeWidth="16" fill="none" strokeLinecap="round" />
              <circle cx="180" cy="116" r="10" fill="#F5C9A8" />
            </g>
          ) : isOffering ? (
            <g className="ag-arm-r ag-offering-arm">
              <path d="M135 158 Q160 138 170 122" stroke="#F5C9A8" strokeWidth="16" fill="none" strokeLinecap="round" />
              <circle cx="172" cy="120" r="10" fill="#F5C9A8" />
            </g>
          ) : isPointing ? (
            <g className="ag-arm-r ag-point-arm">
              <path d="M135 158 Q156 144 164 126" stroke="#F5C9A8" strokeWidth="16" fill="none" strokeLinecap="round" />
              <g transform="translate(165 124) rotate(20)">
                <circle cx="0" cy="0" r="10" fill="#F5C9A8" />
                <rect x="-4" y="-21" width="5" height="18" rx="2.5" fill="#f0bd9a" />
                <rect x="4" y="-22" width="5" height="19" rx="2.5" fill="#f0bd9a" />
              </g>
            </g>
          ) : (
            <g className="ag-arm-r">
              <path d="M135 158 Q154 176 162 210" stroke="#F5C9A8" strokeWidth="16" fill="none" strokeLinecap="round" />
              <circle cx="162" cy="213" r="10" fill="#F5C9A8" />
            </g>
          )}
        </>
      )}

      {/* ── Hair (front layer) ── */}
      <g className="ag-hair-front">
        <path d="M45 90 Q42 65 100 48 Q158 65 155 90 Q155 115 140 120 Q130 100 118 108 Q108 118 100 105 Q92 118 82 108 Q70 100 60 120 Q45 115 45 90 Z" fill="url(#ag-hair-grad)" />
        <path d="M55 78 Q70 92 85 80" stroke="#5B3CBF" strokeWidth="1.5" fill="none" opacity="0.4" />
        <path d="M115 80 Q130 92 145 78" stroke="#5B3CBF" strokeWidth="1.5" fill="none" opacity="0.4" />
        <path d="M45 90 Q38 120 35 175" stroke="#5B3CBF" strokeWidth="3" fill="none" opacity="0.3" />
        <path d="M155 90 Q162 120 165 175" stroke="#5B3CBF" strokeWidth="3" fill="none" opacity="0.3" />
      </g>

      {/* ── Hair accessory (red bow) ── */}
      <g>
        <ellipse cx="145" cy="72" rx="14" ry="9" fill="#FF5070" transform="rotate(-20 145 72)" />
        <ellipse cx="145" cy="72" rx="14" ry="9" fill="rgba(255,255,255,0.15)" transform="rotate(-20 145 72)" />
        <circle cx="145" cy="72" r="4" fill="#FF3060" />
      </g>

      {/* ── Face (turns toward BRUNO / the cake) ── */}
      <g className={`ag-face${looksRight ? ' ag-face-right' : ''}`}>
        <ellipse cx="100" cy="110" rx="42" ry="48" fill="url(#ag-skin-grad)" />
        {/* Cheek blush */}
        <ellipse cx="68" cy="118" rx="12" ry="7" fill="#FFB0A0" opacity="0.5" />
        <ellipse cx="132" cy="118" rx="12" ry="7" fill="#FFB0A0" opacity="0.5" />

        {/* ── Eyes ── */}
        <g className={`ag-eyes${looksRight ? ' ag-eyes-right' : ''}`}>
          {eyesClosed ? (
            <>
              <path d="M68 106 q10 -8 20 0 M112 106 q10 -8 20 0" stroke="#5A2A80" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Left eye */}
              <g className="ag-eye ag-left-eye">
                <ellipse cx="78" cy="108" rx="13" ry="14" fill="white" />
                <ellipse cx="78" cy="109" rx="9" ry="10" fill="url(#ag-eye-grad)" />
                <ellipse cx="78" cy="109" rx="4" ry="5" fill="#0A2040" />
                <circle cx="74" cy="104" r="3.5" fill="white" />
                <circle cx="82" cy="107" r="1.8" fill="white" opacity="0.7" />
                <ellipse cx="78" cy="96" rx="14" ry="4" fill="url(#ag-skin-grad)" className="ag-eyelid-left" />
              </g>
              {/* Right eye */}
              <g className="ag-eye ag-right-eye">
                <ellipse cx="122" cy="108" rx="13" ry="14" fill="white" />
                <ellipse cx="122" cy="109" rx="9" ry="10" fill="url(#ag-eye-grad)" />
                <ellipse cx="122" cy="109" rx="4" ry="5" fill="#0A2040" />
                <circle cx="118" cy="104" r="3.5" fill="white" />
                <circle cx="126" cy="107" r="1.8" fill="white" opacity="0.7" />
                <ellipse cx="122" cy="96" rx="14" ry="4" fill="url(#ag-skin-grad)" className="ag-eyelid-right" />
              </g>
            </>
          )}
        </g>

        {/* Eyebrows */}
        <path d="M66 94 Q78 88 90 94" stroke="#3A2080" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M110 94 Q122 88 134 94" stroke="#3A2080" strokeWidth="2.2" fill="none" strokeLinecap="round" />

        {/* Nose */}
        <path d="M98 118 Q100 122 102 118" stroke="#E8B898" strokeWidth="1.5" fill="none" />

        {/* ── Mouth ── */}
        {isTalking ? (
          <g className="ag-mouth-talk">
            <ellipse cx="100" cy="130" rx="7" ry="5" fill="#E88080" />
            <ellipse cx="100" cy="129" rx="6" ry="3" fill="#FFB0B0" />
          </g>
        ) : isOpenMouth ? (
          <g className="ag-mouth-open">
            <ellipse cx="100" cy="132" rx="9" ry="12" fill="#E87A7A" />
            <ellipse cx="100" cy="128" rx="7" ry="6" fill="#FFB0B0" />
          </g>
        ) : isEating ? (
          <g className="ag-mouth-chew">
            <path d="M90 128 Q100 140 110 128" fill="#E88080" />
            <path d="M92 128 Q100 136 108 128" fill="#FFB0B0" />
          </g>
        ) : isSmiling || isClapping || isOffering || isHandshake ? (
          <path d="M88 126 Q100 140 112 126" stroke="#E88080" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M90 127 Q100 134 110 127" stroke="#E8A088" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}
      </g>

      {/* ── Animation reference strands ── */}
      <path d="M45 90 Q38 130 32 185" stroke="none" fill="none" className="ag-hair-strand-l" />
      <path d="M155 90 Q162 130 168 185" stroke="none" fill="none" className="ag-hair-strand-r" />
    </svg>
  )
}

export default AnimeGirl