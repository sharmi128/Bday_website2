function RedHairHero({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      aria-label="Celebration superhero"
    >
      <defs>
        <linearGradient id="rh-suit-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e03050" />
          <stop offset="100%" stopColor="#b01835" />
        </linearGradient>
        <linearGradient id="rh-suit-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b01835" />
          <stop offset="100%" stopColor="#8a1025" />
        </linearGradient>
        <linearGradient id="rh-legs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1838a0" />
          <stop offset="100%" stopColor="#102878" />
        </linearGradient>
        <linearGradient id="rh-mask" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#e03050" />
          <stop offset="100%" stopColor="#a01830" />
        </linearGradient>
        <clipPath id="rh-head-clip">
          <circle cx="100" cy="78" r="34" />
        </clipPath>
        <clipPath id="rh-torso-clip">
          <rect x="65" y="120" width="70" height="88" rx="12" />
        </clipPath>
        <filter id="rh-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#ffd700" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Victory aura */}
      <circle cx="100" cy="140" r="80" fill="none" stroke="rgba(255,215,0,0.08)" strokeWidth="2" filter="url(#rh-glow)" />
      <circle cx="100" cy="140" r="100" fill="none" stroke="rgba(255,215,0,0.04)" strokeWidth="1.5" filter="url(#rh-glow)" />

      {/* Web rings on suit (clipped to torso) */}
      <g clipPath="url(#rh-torso-clip)" opacity="0.18">
        <circle cx="100" cy="138" r="20" fill="none" stroke="#fff" strokeWidth="0.6" />
        <circle cx="100" cy="138" r="40" fill="none" stroke="#fff" strokeWidth="0.5" />
        <circle cx="100" cy="138" r="60" fill="none" stroke="#fff" strokeWidth="0.4" />
      </g>

      {/* === LEFT LEG — wide stance === */}
      <rect x="68" y="206" width="22" height="56" rx="9" fill="url(#rh-legs)" transform="rotate(12 79 234)" />
      <rect x="60" y="252" width="32" height="20" rx="10" fill="#e03050" transform="rotate(12 76 262)" />

      {/* === RIGHT LEG — wide stance === */}
      <rect x="110" y="206" width="22" height="56" rx="9" fill="url(#rh-legs)" transform="rotate(-12 121 234)" />
      <rect x="108" y="252" width="32" height="20" rx="10" fill="#e03050" transform="rotate(-12 124 262)" />

      {/* === TORSO === */}
      <rect x="65" y="120" width="70" height="88" rx="12" fill="url(#rh-suit-top)" />

      {/* Mid-section */}
      <rect x="68" y="172" width="64" height="36" rx="6" fill="url(#rh-suit-mid)" />

      {/* Spider emblem */}
      <ellipse cx="100" cy="140" rx="6" ry="4.5" fill="#1a1a2e" />
      <line x1="100" y1="144.5" x2="100" y2="153" stroke="#1a1a2e" strokeWidth="1.4" />
      <line x1="93" y1="142" x2="88" y2="150" stroke="#1a1a2e" strokeWidth="1" />
      <line x1="107" y1="142" x2="112" y2="150" stroke="#1a1a2e" strokeWidth="1" />
      <line x1="94" y1="140" x2="86" y2="138" stroke="#1a1a2e" strokeWidth="1" />
      <line x1="106" y1="140" x2="114" y2="138" stroke="#1a1a2e" strokeWidth="1" />
      <line x1="95" y1="138" x2="89" y2="132" stroke="#1a1a2e" strokeWidth="0.8" />
      <line x1="105" y1="138" x2="111" y2="132" stroke="#1a1a2e" strokeWidth="0.8" />

      {/* === LEFT ARM — raised high in triumph === */}
      <rect x="24" y="100" width="42" height="16" rx="8" fill="#e03050" transform="rotate(55 45 108)" />
      <circle cx="24" cy="82" r="9" fill="#b01030" />

      {/* === RIGHT ARM — raised high in triumph === */}
      <rect x="134" y="100" width="42" height="16" rx="8" fill="#e03050" transform="rotate(-55 155 108)" />
      <circle cx="176" cy="82" r="9" fill="#b01030" />

      {/* Victory sparkles near fists */}
      <g opacity="0.6">
        <polygon points="18,72 20,68 22,72 18,72" fill="#ffd700" />
        <polygon points="180,72 182,68 184,72 180,72" fill="#ffd700" />
        <polygon points="12,78 13,74 14,78 12,78" fill="#ffd700" />
        <polygon points="188,78 189,74 190,78 188,78" fill="#ffd700" />
        <line x1="15" y1="70" x2="11" y2="66" stroke="#ffd700" strokeWidth="0.8" />
        <line x1="185" y1="70" x2="189" y2="66" stroke="#ffd700" strokeWidth="0.8" />
      </g>

      {/* === HEAD — full mask === */}
      <circle cx="100" cy="78" r="34" fill="url(#rh-mask)" />

      {/* Web pattern on mask (clipped to head) */}
      <g clipPath="url(#rh-head-clip)" opacity="0.3">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <line
            key={`wl${angle}`}
            x1="100"
            y1="78"
            x2={100 + Math.cos((angle * Math.PI) / 180) * 36}
            y2={78 + Math.sin((angle * Math.PI) / 180) * 36}
            stroke="#fff"
            strokeWidth="0.6"
          />
        ))}
        <circle cx="100" cy="78" r="10" fill="none" stroke="#fff" strokeWidth="0.5" />
        <circle cx="100" cy="78" r="18" fill="none" stroke="#fff" strokeWidth="0.5" />
        <circle cx="100" cy="78" r="26" fill="none" stroke="#fff" strokeWidth="0.4" />
        <circle cx="100" cy="78" r="34" fill="none" stroke="#fff" strokeWidth="0.3" />
      </g>

      {/* Eye lenses — large, expressive, angular */}
      <path d="M73 68 L88 61 Q93 60 95 65 L95 77 Q95 81 90 81 L77 79 Q73 78 72 74 Z" fill="#ffffff" />
      <path d="M105 65 Q107 60 112 61 L127 68 L128 74 Q127 78 123 79 L110 81 Q105 81 105 77 Z" fill="#ffffff" />

      {/* Eye outlines */}
      <path d="M73 68 L88 61 Q93 60 95 65 L95 77 Q95 81 90 81 L77 79 Q73 78 72 74 Z" fill="none" stroke="#1a1a2e" strokeWidth="2" />
      <path d="M105 65 Q107 60 112 61 L127 68 L128 74 Q127 78 123 79 L110 81 Q105 81 105 77 Z" fill="none" stroke="#1a1a2e" strokeWidth="2" />

      {/* Eye lens reflections */}
      <ellipse cx="83" cy="69" rx="3" ry="2.5" fill="#ffffff" opacity="0.6" />
      <ellipse cx="118" cy="69" rx="3" ry="2.5" fill="#ffffff" opacity="0.6" />

      {/* Mask edge detail */}
      <path d="M72 74 Q76 83 85 85" stroke="#1a1a2e" strokeWidth="1.2" fill="none" opacity="0.3" />
      <path d="M128 74 Q124 83 115 85" stroke="#1a1a2e" strokeWidth="1.2" fill="none" opacity="0.3" />

      {/* Smile line under mask — triumph expression */}
      <path d="M87 98 Q100 106 113 98" stroke="#b01835" strokeWidth="1.5" fill="none" opacity="0.4" />
    </svg>
  )
}

export default RedHairHero
