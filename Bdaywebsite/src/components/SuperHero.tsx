function SuperHero({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      aria-label="Web-slinging superhero"
    >
      <defs>
        <linearGradient id="sh-suit-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e03050" />
          <stop offset="100%" stopColor="#b01835" />
        </linearGradient>
        <linearGradient id="sh-suit-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b01835" />
          <stop offset="100%" stopColor="#8a1025" />
        </linearGradient>
        <linearGradient id="sh-legs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1838a0" />
          <stop offset="100%" stopColor="#102878" />
        </linearGradient>
        <linearGradient id="sh-mask" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#e03050" />
          <stop offset="100%" stopColor="#a01830" />
        </linearGradient>
        <clipPath id="sh-head-clip">
          <circle cx="100" cy="75" r="34" />
        </clipPath>
        <clipPath id="sh-torso-clip">
          <rect x="65" y="118" width="70" height="92" rx="12" />
        </clipPath>
        <filter id="sh-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#e03050" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Ambient glow */}
      <circle cx="100" cy="150" r="95" fill="none" stroke="rgba(224,48,80,0.06)" strokeWidth="1.5" filter="url(#sh-glow)" />

      {/* Web rings on suit (clipped to torso) */}
      <g clipPath="url(#sh-torso-clip)" opacity="0.2">
        <circle cx="100" cy="135" r="22" fill="none" stroke="#fff" strokeWidth="0.6" />
        <circle cx="100" cy="135" r="44" fill="none" stroke="#fff" strokeWidth="0.5" />
        <circle cx="100" cy="135" r="66" fill="none" stroke="#fff" strokeWidth="0.4" />
      </g>

      {/* === LEFT LEG === */}
      <rect x="71" y="210" width="22" height="56" rx="9" fill="url(#sh-legs)" transform="rotate(7 82 238)" />
      <rect x="64" y="258" width="32" height="20" rx="10" fill="#e03050" transform="rotate(7 80 268)" />

      {/* === RIGHT LEG === */}
      <rect x="107" y="210" width="22" height="56" rx="9" fill="url(#sh-legs)" transform="rotate(-10 118 238)" />
      <rect x="104" y="256" width="32" height="20" rx="10" fill="#e03050" transform="rotate(-10 120 266)" />

      {/* === TORSO === */}
      <rect x="65" y="118" width="70" height="92" rx="12" fill="url(#sh-suit-top)" />

      {/* Mid-section */}
      <rect x="68" y="175" width="64" height="35" rx="6" fill="url(#sh-suit-mid)" />

      {/* Spider emblem on chest */}
      <ellipse cx="100" cy="142" rx="6" ry="4.5" fill="#1a1a2e" />
      <line x1="100" y1="146.5" x2="100" y2="155" stroke="#1a1a2e" strokeWidth="1.4" />
      <line x1="93" y1="144" x2="88" y2="152" stroke="#1a1a2e" strokeWidth="1" />
      <line x1="107" y1="144" x2="112" y2="152" stroke="#1a1a2e" strokeWidth="1" />
      <line x1="94" y1="142" x2="86" y2="140" stroke="#1a1a2e" strokeWidth="1" />
      <line x1="106" y1="142" x2="114" y2="140" stroke="#1a1a2e" strokeWidth="1" />
      <line x1="95" y1="140" x2="89" y2="134" stroke="#1a1a2e" strokeWidth="0.8" />
      <line x1="105" y1="140" x2="111" y2="134" stroke="#1a1a2e" strokeWidth="0.8" />

      {/* === RIGHT ARM — extended web-shooting === */}
      <rect x="132" y="125" width="42" height="16" rx="8" fill="#e03050" transform="rotate(-22 153 133)" />
      {/* Right glove */}
      <ellipse cx="172" cy="114" rx="11" ry="9" fill="#b01030" transform="rotate(-15 172 114)" />
      {/* Web-shooter fingers — iconic gesture */}
      <rect x="172" y="103" width="4.5" height="12" rx="2.25" fill="#b01030" transform="rotate(10 174 109)" />
      <rect x="178" y="104" width="4.5" height="10" rx="2.25" fill="#b01030" transform="rotate(5 180 109)" />
      {/* Pinky + ring tucked */}
      <rect x="166" y="108" width="4" height="7" rx="2" fill="#b01030" transform="rotate(-15 168 111)" />
      {/* Web line shooting from wrist */}
      <line x1="183" y1="108" x2="198" y2="90" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="183" y1="108" x2="195" y2="95" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" strokeLinecap="round" />

      {/* === LEFT ARM — pulled back === */}
      <rect x="26" y="128" width="42" height="16" rx="8" fill="#e03050" transform="rotate(20 47 136)" />
      {/* Left glove */}
      <ellipse cx="24" cy="122" rx="11" ry="9" fill="#b01030" transform="rotate(15 24 122)" />
      {/* Clenched fist bump */}
      <circle cx="24" cy="122" r="9" fill="#b01030" />

      {/* === HEAD — full mask === */}
      <circle cx="100" cy="75" r="34" fill="url(#sh-mask)" />

      {/* Web pattern on mask (clipped to head) */}
      <g clipPath="url(#sh-head-clip)" opacity="0.3">
        {/* Radial web lines from center */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <line
            key={`wl${angle}`}
            x1="100"
            y1="75"
            x2={100 + Math.cos((angle * Math.PI) / 180) * 36}
            y2={75 + Math.sin((angle * Math.PI) / 180) * 36}
            stroke="#fff"
            strokeWidth="0.6"
          />
        ))}
        {/* Concentric web rings */}
        <circle cx="100" cy="75" r="10" fill="none" stroke="#fff" strokeWidth="0.5" />
        <circle cx="100" cy="75" r="18" fill="none" stroke="#fff" strokeWidth="0.5" />
        <circle cx="100" cy="75" r="26" fill="none" stroke="#fff" strokeWidth="0.4" />
        <circle cx="100" cy="75" r="34" fill="none" stroke="#fff" strokeWidth="0.3" />
      </g>

      {/* Eye lenses — large, expressive, angular */}
      <path d="M73 65 L88 58 Q93 57 95 62 L95 74 Q95 78 90 78 L77 76 Q73 75 72 71 Z" fill="#ffffff" />
      <path d="M105 62 Q107 57 112 58 L127 65 L128 71 Q127 75 123 76 L110 78 Q105 78 105 74 Z" fill="#ffffff" />

      {/* Eye outlines */}
      <path d="M73 65 L88 58 Q93 57 95 62 L95 74 Q95 78 90 78 L77 76 Q73 75 72 71 Z" fill="none" stroke="#1a1a2e" strokeWidth="2" />
      <path d="M105 62 Q107 57 112 58 L127 65 L128 71 Q127 75 123 76 L110 78 Q105 78 105 74 Z" fill="none" stroke="#1a1a2e" strokeWidth="2" />

      {/* Eye lens reflections */}
      <ellipse cx="83" cy="66" rx="3" ry="2.5" fill="#ffffff" opacity="0.6" />
      <ellipse cx="118" cy="66" rx="3" ry="2.5" fill="#ffffff" opacity="0.6" />

      {/* Mask edge detail — around eyes */}
      <path d="M72 71 Q76 80 85 82" stroke="#1a1a2e" strokeWidth="1.2" fill="none" opacity="0.3" />
      <path d="M128 71 Q124 80 115 82" stroke="#1a1a2e" strokeWidth="1.2" fill="none" opacity="0.3" />

      {/* Chin / jaw line */}
      <path d="M80 96 Q100 108 120 96" stroke="#b01835" strokeWidth="1" fill="none" opacity="0.4" />

      {/* Web accent lines on legs */}
      <line x1="82" y1="218" x2="82" y2="250" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" />
      <line x1="118" y1="218" x2="118" y2="250" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" />
    </svg>
  )
}

export default SuperHero
