/**
 * MemoryScenes — AI-illustrated "photographs" for the friendship timeline.
 * Every scene is drawn from scratch (no stock photos, no placeholders) using
 * the same two fictional characters from SceneCharacters so the story stays
 * visually continuous. Scene sizes are 4:3 (800 x 600).
 */
import {
  CharGlowDefs,
  Girl,
  Boy,
  GirlBack,
  BoyBack,
  StudentShadow,
} from './SceneCharacters'

/* Shared vintage-photo grade: warm vignette + subtle film grain */
function Film({ warm = '#c9743a' }: { warm?: string }) {
  return (
    <>
      <defs>
        <radialGradient id="tlvg" cx="50%" cy="46%" r="74%">
          <stop offset="55%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor={`${warm}aa`} stopOpacity="0.42" />
        </radialGradient>
        <filter id="tlgrain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="800" height="600" fill="url(#tlvg)" />
      <rect width="800" height="600" filter="url(#tlgrain)" opacity="0.06" />
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  01 — The Day We Met 🎓                                              */
/* ------------------------------------------------------------------ */
export function Scene01() {
  return (
    <svg viewBox="0 0 800 600" className="tl-scene-svg" role="img" aria-label="Two fictional college students meet for the first time on a sunny campus">
      <defs>
        <linearGradient id="s01sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9cccf2" />
          <stop offset="55%" stopColor="#fbe7bd" />
          <stop offset="100%" stopColor="#ffd9a0" />
        </linearGradient>
        <radialGradient id="s01sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff7dd" />
          <stop offset="60%" stopColor="#ffe3a8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffe3a8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="s01path" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8cfa4" />
          <stop offset="100%" stopColor="#d9bd92" />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill="url(#s01sky)" />
      <circle cx="620" cy="120" r="150" fill="url(#s01sun)" />
      {/* soft sun rays */}
      <path d="M520 60 L660 420" stroke="rgba(255,240,190,0.28)" strokeWidth="34" />
      <path d="M700 20 L820 330" stroke="rgba(255,240,190,0.22)" strokeWidth="40" />

      {/* trees */}
      <g>
        <rect x="90" y="250" width="16" height="120" rx="7" fill="#8a5a2e" />
        <ellipse cx="98" cy="238" rx="58" ry="52" fill="#4f8f4a" />
        <ellipse cx="70" cy="252" rx="34" ry="30" fill="#5d9f56" />
      </g>
      <g>
        <rect x="690" y="200" width="14" height="150" rx="6" fill="#8a5a2e" />
        <ellipse cx="697" cy="186" rx="52" ry="48" fill="#4f8f4a" />
        <ellipse cx="726" cy="202" rx="30" ry="26" fill="#5d9f56" />
      </g>

      {/* college building */}
      <g>
        <rect x="360" y="150" width="290" height="230" rx="6" fill="#f3e2c4" />
        <rect x="360" y="150" width="290" height="230" rx="6" fill="none" stroke="#d9bd92" strokeWidth="3" />
        <rect x="392" y="120" width="226" height="40" rx="6" fill="#eecfa2" />
        <text x="505" y="147" textAnchor="middle" fontSize="22" fontWeight="700" fill="#8a5a2e" fontFamily="'Caveat', cursive">
          COLLEGE CAMPUS
        </text>
        {/* columns */}
        {[380, 430, 480, 535, 585, 630].map((c) => (
          <rect key={c} x={c - 6} y="300" width="12" height="80" rx="5" fill="#ead4b0" />
        ))}
        <rect x="352" y="300" width="306" height="12" rx="6" fill="#d9bd92" />
        <rect x="472" y="208" width="66" height="92" rx="6" fill="#5e7d4f" />
        <path d="M472 212 L505 196 L538 212 Z" fill="#7e9c6a" />
        {[312, 380, 448, 560, 628].map((wx) => (
          <rect key={wx} x={wx} y="200" width="44" height="60" rx="5" fill="#bfe0f2" stroke="#d9bd92" strokeWidth="2.5" />
        ))}
        <text x="505" y="345" textAnchor="middle" fontSize="15" fontWeight="600" fill="#8a5a2e" fontFamily="'Caveat', cursive">
          Department of Stories
        </text>
      </g>

      {/* path */}
      <path d="M310 600 L430 470 L520 600 Z" fill="url(#s01path)" />
      <path d="M430 470 L446 600 L520 600 Z" fill="rgba(0,0,0,0.06)" />

      {/* crowd silhouettes */}
      <StudentShadow x={560} y={500} s={0.8} tone="#9a7a5f" flip />
      <StudentShadow x={600} y={514} s={0.78} tone="#7c6f78" />
      <StudentShadow x={540} y={536} s={0.72} tone="#97725a" />
      <StudentShadow x={690} y={520} s={0.8} tone="#8b6f7a" />
      <StudentShadow x={310} y={470} s={0.66} tone="#7d6f63" flip />
      <StudentShadow x={350} y={452} s={0.6} tone="#9a7a5f" />

      {/* the boy — nearby among students, still a stranger */}
      <g transform="translate(655 560) scale(0.98 -0.98)">
        <Boy expr="calm" arm="rest" />
      </g>
      <ellipse cx="572" cy="552" rx="22" ry="5" fill="rgba(0,0,0,0.16)" />
      <StudentShadow x={590} y={560} s={0.7} tone="#a08a72" flip />

      {/* the girl — walking through the campus */}
      <g transform="translate(300 556) scale(1.04 -1.04)">
        <Girl expr="happy" arm="rest" stride />
      </g>
      <ellipse cx="300" cy="560" rx="20" ry="5" fill="rgba(0,0,0,0.16)" />

      {/* foreground green */}
      <path d="M0 585 Q 200 560 400 585 Q 600 610 800 585 L800 600 L0 600 Z" fill="#6fae5c" />
      <path d="M0 592 Q 300 585 800 592 L800 600 L0 600 Z" fill="#5d9d4a" />

      <Film />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  02 — The Beginning of Our Friendship 📱💬                            */
/* ------------------------------------------------------------------ */
export function Scene02() {
  return (
    <svg viewBox="0 0 800 600" className="tl-scene-svg" role="img" aria-label="Two fictional college friends chatting on their phones in a cosy evening corner">
      <defs>
        <linearGradient id="s02wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b2a5e" />
          <stop offset="60%" stopColor="#57365f" />
          <stop offset="100%" stopColor="#7a4a55" />
        </linearGradient>
        <linearGradient id="s02floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b98b5f" />
          <stop offset="100%" stopColor="#96643d" />
        </linearGradient>
      </defs>
      <CharGlowDefs />

      <rect width="800" height="600" fill="url(#s02wall)" />

      {/* big evening window */}
      <rect x="52" y="80" width="320" height="300" rx="14" fill="#7c5brow" opacity="0" />
      <g>
        <rect x="52" y="80" width="320" height="300" rx="14" fill="#1d2b4d" stroke="#e9cfa2" strokeWidth="8" />
        <rect x="76" y="100" width="272" height="256" rx="8" fill="#26386a" />
        {/* window sky */}
        <radialGradient id="s02moonglow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff6d8" />
          <stop offset="100%" stopColor="#fff6d8" stopOpacity="0" />
        </radialGradient>
        <circle cx="200" cy="150" r="26" fill="#ffedbd" />
        <circle cx="200" cy="150" r="70" fill="url(#s02moonglow)" />
        <circle cx="90" cy="120" r="2" fill="#ffe9b0" />
        <circle cx="320" cy="180" r="2.4" fill="#ffe9b0" />
        <circle cx="140" cy="230" r="1.6" fill="#ffe9b0" />
        <circle cx="280" cy="110" r="1.8" fill="#ffe9b0" />
        <rect x="76" y="300" width="272" height="56" rx="8" fill="#202f57" />
        <path d="M76 318 Q 130 308 180 322 Q 240 338 300 316 L348 318 L348 356 L76 356 Z" fill="#2c3d68" />
        {/* lamp */}
        <rect x="352" y="150" width="8" height="60" fill="#e9cfa2" />
        <path d="M342 150 L366 150 L358 140 L350 140 Z" fill="#ffd889" />
        <ellipse cx="354" cy="168" rx="18" ry="22" fill="rgba(255,220,140,0.28)" />
      </g>

      {/* bookshelf */}
      <g>
        <rect x="600" y="120" width="150" height="260" rx="8" fill="#6b3f22" stroke="#8a5a30" strokeWidth="4" />
        {[140, 200, 260].map((y) => (
          <rect key={y} x="614" y={y} width="122" height="46" rx="6" fill="#7d4d2c" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={620 + (i % 4) * 28} y={148 + Math.floor(i / 4) * 58} width="20" height="34" rx="3" fill={['#c94f4f', '#3f7d5a', '#c9923f', '#5a6bb0'][i % 4]} transform={`rotate(${i % 2 ? 3 : -2} ${635 + (i % 4) * 28} ${165 + Math.floor(i / 4) * 58})`} />
        ))}
        <rect x="620" y="320" width="120" height="34" rx="6" fill="#3f7d5a" />
        <rect x="624" y="326" width="112" height="22" rx="5" fill="#4f8f6a" />
      </g>

      {/* fairy lights across the top */}
      {[40, 96, 152, 208, 264, 320, 376, 432, 488, 544, 600, 656, 712, 768].map((x, i) => (
        <g key={x} transform={`translate(${x} ${64 + Math.sin(i) * 14})`}>
          <circle cx="0" cy="0" r="3.4" fill="#ffe08a" />
          <circle cx="0" cy="0" r="7" fill="rgba(255,224,138,0.28)" />
        </g>
      ))}
      <path d="M40 64 Q 100 50 160 72 Q 220 94 280 66 Q 340 38 400 72 Q 460 106 520 70 Q 580 34 640 68 Q 700 100 760 62" stroke="rgba(255,224,138,0.25)" strokeWidth="1.4" fill="none" />

      {/* floor + rug */}
      <rect y="404" width="800" height="196" fill="url(#s02floor)" />
      <rect y="398" width="800" height="10" fill="#b17f4e" />
      <ellipse cx="400" cy="540" rx="360" ry="52" fill="rgba(0,0,0,0.08)" />

      {/* the girl, texting by the window */}
      <g transform="translate(300 505) scale(1.05 -1.05)">
        <Girl expr="happy" arm="phone" />
      </g>
      <ellipse cx="300" cy="508" rx="20" ry="5" fill="rgba(0,0,0,0.2)" />
      <path d="M350 -190 L370 -210" stroke="rgba(255,160,200,0.5)" strokeWidth="2" strokeLinecap="round" />
      <path d="M360 -205 L380 -222" stroke="rgba(255,160,200,0.5)" strokeWidth="2" strokeLinecap="round" />
      <g transform="translate(352 -196) scale(0.9)">
        <path d="M4 4 C 4 0, 12 -8, 12 -8 C 12 -8, 20 0, 20 4 C 20 9, 12 15, 12 15 C 12 15, 4 9, 4 4 Z" fill="#ff5f8f" />
      </g>
      {/* typing dots */}
      <g transform="translate(318 -120)">
        <circle cx="0" cy="0" r="5" fill="#c9f0ff" opacity="0.9" />
        <circle cx="14" cy="0" r="5" fill="#c9f0ff" opacity="0.55" />
        <circle cx="28" cy="0" r="5" fill="#c9f0ff" opacity="0.3" />
      </g>

      {/* the boy, texting near the shelves */}
      <g transform="translate(620 505) scale(1.07 -1.07) scale(-1 1)">
        <Boy expr="laugh" arm="phone" />
      </g>
      <ellipse cx="620" cy="508" rx="20" ry="5" fill="rgba(0,0,0,0.2)" />
      <path d="M588 -150 L572 -168" stroke="rgba(255,160,200,0.5)" strokeWidth="2" strokeLinecap="round" />
      <path d="M580 -165 L566 -182" stroke="rgba(255,160,200,0.5)" strokeWidth="2" strokeLinecap="round" />
      <g transform="translate(574 -160) scale(0.9)">
        <path d="M4 4 C 4 0, 12 -8, 12 -8 C 12 -8, 20 0, 20 4 C 20 9, 12 15, 12 15 C 12 15, 4 9, 4 4 Z" fill="#ffa04d" />
      </g>

      <Film warm="#5b2a4a" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  03 — Our First Special Memory 🎢 (a generic Indian fun park)        */
/* ------------------------------------------------------------------ */
export function Scene03() {
  return (
    <svg viewBox="0 0 800 600" className="tl-scene-svg" role="img" aria-label="Two fictional best friends having fun at a colourful amusement park">
      <defs>
        <linearGradient id="s03sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c2b6e" />
          <stop offset="55%" stopColor="#6b3f8f" />
          <stop offset="100%" stopColor="#e8857a" />
        </linearGradient>
        <linearGradient id="s03plaza" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9b98a" />
          <stop offset="100%" stopColor="#b98f62" />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill="url(#s03sky)" />
      <circle cx="620" cy="400" r="170" fill="rgba(255,190,140,0.5)" />

      {/* roller coaster silhouette */}
      <g opacity="0.92">
        <path d="M40 400 L40 220 M40 220 Q 96 120 150 220 Q 190 290 240 210 Q 275 150 300 210 M240 210 L240 60 M150 220 Q 190 190 230 150" stroke="#3d2a55" strokeWidth="9" fill="none" strokeLinecap="round" />
        {[60, 100, 140, 180, 220].map((x) => (
          <circle key={x} cx={x} cy={190 + (x % 3) * 6} r="9" fill="#7a4a7a" />
        ))}
      </g>

      {/* ferris wheel */}
      <g>
        <circle cx="620" cy="300" r="120" fill="none" stroke="#ffd166" strokeWidth="5" />
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 30} 620 300)`}>
            <line x1="620" y1="180" x2="620" y2="420" stroke="#ff9d6b" strokeWidth="3" opacity="0.85" />
            <line x1="500" y1="300" x2="740" y2="300" stroke="#ff9d6b" strokeWidth="3" opacity="0.5" />
          </g>
        ))}
        <circle cx="620" cy="300" r="12" fill="#ffd166" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2
          const x = 620 + Math.cos(a) * 120
          const y = 300 + Math.sin(a) * 120
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle cx="0" cy="0" r="16" fill={['#56c0e0', '#f26aa4', '#ffd166', '#7ac74f', '#ff8e5b'][i % 5]} />
              <rect x="-5" y="-18" width="10" height="4" rx="2" fill="#8a4a2a" />
            </g>
          )
        })}
        <rect x="614" y="386" width="12" height="80" fill="#5a3a5a" />
      </g>

      {/* striped food stall */}
      <g>
        <rect x="96" y="380" width="180" height="130" rx="8" fill="#8a2f45" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={96 + i * 36} y="380" width="18" height="130" fill="#f6d9a8" opacity="0.85" />
        ))}
        <rect x="88" y="366" width="196" height="22" rx="8" fill="#c94f6f" />
        <rect x="116" y="470" width="40" height="40" rx="6" fill="#f3e2c4" />
        <circle cx="136" cy="454" r="14" fill="#9ad0f0" />
        <circle cx="136" cy="454" r="6" fill="#5aa0d0" />
        <text x="186" y="428" textAnchor="middle" fontSize="20" fontWeight="700" fill="#f6d9a8" fontFamily="'Caveat', cursive">
          cotton candy
        </text>
      </g>

      {/* bunting + string lights */}
      <path d="M60 70 L740 70" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4 10" />
      {[90, 150, 210, 270, 330, 390, 450, 510, 570, 630, 690].map((x) => (
        <g key={x} transform={`translate(${x} 74)`}>
          <line x1="0" y1="0" x2="0" y2="26" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" />
          <path d="M-8 26 L0 14 L8 26 Z" fill={['#ffb35f', '#7ac74f', '#56c0e0', '#ff6b9d'][x % 4]} />
        </g>
      ))}

      {/* plaza floor */}
      <path d="M0 470 Q 260 440 520 470 Q 700 486 800 470 L800 600 L0 600 Z" fill="url(#s03plaza)" />
      <ellipse cx="360" cy="560" rx="300" ry="40" fill="rgba(0,0,0,0.08)" />

      {/* the girl with candy floss */}
      <g transform="translate(280 530) scale(1.1 -1.1)">
        <Girl expr="laugh" arm="cotton" />
      </g>
      <ellipse cx="280" cy="532" rx="21" ry="5" fill="rgba(0,0,0,0.2)" />

      {/* the boy pointing at the rides */}
      <g transform="translate(480 534) scale(1.12 -1.12)">
        <Boy expr="grin" arm="point" />
      </g>
      <ellipse cx="480" cy="536" rx="20" ry="5" fill="rgba(0,0,0,0.2)" />

      {/* sparkles */}
      <path d="M410 350 l4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 8 -4 Z" fill="#ffd166" opacity="0.9" />
      <path d="M250 300 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" fill="#fff3c4" opacity="0.8" />
      <path d="M700 200 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" fill="#ffe08a" opacity="0.7" />

      <Film warm="#7a3550" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  04 — The Moment We Became Closer 🚌 (scrapbook collage)             */
/* ------------------------------------------------------------------ */
export function Scene04() {
  return (
    <svg viewBox="0 0 800 600" className="tl-scene-svg" role="img" aria-label="A scrapbook collage of an industrial visit, silly pictures and making reels together">
      <defs>
        <clipPath id="s04a">
          <rect x="30" y="24" width="340" height="252" rx="8" />
        </clipPath>
        <clipPath id="s04b">
          <rect x="430" y="40" width="340" height="240" rx="8" />
        </clipPath>
        <clipPath id="s04c">
          <rect x="120" y="330" width="560" height="216" rx="8" />
        </clipPath>
        <linearGradient id="s04sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfe0f2" />
          <stop offset="100%" stopColor="#eef4e0" />
        </linearGradient>
        <linearGradient id="s04bus" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8894f" />
          <stop offset="100%" stopColor="#cf6a36" />
        </linearGradient>
      </defs>

      {/* collage base */}
      <rect width="800" height="600" fill="#f6e8cf" />
      {[120, 260, 400, 540, 680].map((x) => (
        <circle key={x} cx={x} cy={60 + (x % 5) * 90} r="7" fill="rgba(180,140,90,0.2)" />
      ))}
      {[80, 220, 360, 500, 640, 760].map((x) => (
        <circle key={x} cx={x} cy={420 + (x % 4) * 70} r="6" fill="rgba(180,140,90,0.22)" />
      ))}

      {/* ---------- Panel A — industrial visit ---------- */}
      <g transform="rotate(-2.5 200 150)" clipPath="url(#s04a)">
        <rect x="30" y="24" width="340" height="252" fill="url(#s04sky)" />
        <rect x="250" y="80" width="150" height="120" rx="6" fill="#d9bd92" />
        <rect x="250" y="40" width="150" height="20" rx="5" fill="#b98f62" />
        <rect x="30" y="246" width="370" height="70" fill="#9ac07a" />
        {/* bus */}
        <g transform="translate(120 140)">
          <rect x="0" y="40" width="210" height="86" rx="16" fill="url(#s04bus)" />
          <rect x="10" y="30" width="150" height="18" rx="8" fill="#ffd9a8" />
          <rect x="14" y="14" width="60" height="16" rx="6" fill="#b25a22" />
          <circle cx="60" cy="128" r="18" fill="#2a2a33" />
          <circle cx="60" cy="128" r="10" fill="#d9d4ca" />
          <circle cx="170" cy="128" r="18" fill="#2a2a33" />
          <circle cx="170" cy="128" r="10" fill="#d9d4ca" />
          <rect x="24" y="52" width="34" height="48" rx="6" fill="#bfe0f2" />
          <rect x="70" y="52" width="34" height="48" rx="6" fill="#bfe0f2" />
          <rect x="116" y="52" width="34" height="48" rx="6" fill="#bfe0f2" />
          <text x="150" y="70" fontSize="13" fontWeight="700" fill="#fff" fontFamily="'Caveat', cursive">
            college trip
          </text>
        </g>
        {/* classmates + our two friends */}
        <StudentShadow x={80} y={255} s={0.7} tone="#8b6f7a" />
        <StudentShadow x={115} y={252} s={0.66} tone="#a08a72" />
        <g transform="translate(60 250) scale(0.62 -0.62)">
          <Girl expr="laugh" arm="peace" />
        </g>
        <g transform="translate(96 252) scale(0.66 -0.66)">
          <Boy expr="grin" arm="wave" />
        </g>
        <ellipse cx="78" cy="252" rx="16" ry="4" fill="rgba(0,0,0,0.15)" />
      </g>

      {/* ---------- Panel B — random pictures ---------- */}
      <g transform="rotate(2.5 600 160)" clipPath="url(#s04b)">
        <rect x="430" y="40" width="340" height="240" fill="#ffe0b3" />
        <circle cx="600" cy="120" r="70" fill="rgba(255,255,255,0.6)" />
        <rect x="430" y="46" width="340" height="8" rx="4" fill="rgba(255,255,255,0.7)" />
        <radialGradient id="s04flash" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <circle cx="600" cy="120" r="90" fill="url(#s04flash)" />
        <path d="M600 70 l0 100 M550 120 l100 0 M568 88 l64 64 M632 88 l-64 64" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" />
        {/* the two friends striking a silly pose */}
        <g transform="translate(520 252) scale(0.72 -0.72)">
          <Girl expr="laugh" arm="peace" />
        </g>
        <g transform="translate(596 254) scale(0.74 -0.74) scale(-1 1)">
          <Boy expr="grin" arm="peace" />
        </g>
        <ellipse cx="560" cy="252" rx="18" ry="4" fill="rgba(0,0,0,0.16)" />
        <ellipse cx="632" cy="252" rx="18" ry="4" fill="rgba(0,0,0,0.16)" />
        <text x="548" y="158" fontSize="12" fill="#a06030" fontFamily="'Caveat', cursive">
          silly pics ftw
        </text>
      </g>

      {/* ---------- Panel C — making reels ---------- */}
      <g transform="rotate(-1 400 438)" clipPath="url(#s04c)">
        <rect x="120" y="330" width="560" height="216" fill="#dceaef" />
        <rect x="120" y="330" width="560" height="216" fill="none" stroke="#c9dbe4" strokeWidth="8" />
        <g transform="translate(150 330)">
          <rect x="0" y="40" width="130" height="150" rx="6" fill="#e5c191" />
          <rect x="0" y="40" width="130" height="26" rx="6" fill="#d3a96f" />
          <circle cx="42" cy="120" r="12" fill="#9ac07a" />
          <circle cx="78" cy="160" r="10" fill="#7aa860" />
          <rect x="0" y="170" width="130" height="12" rx="4" fill="#c99a5e" />
        </g>
        {/* the girl leaning in laughing */}
        <g transform="translate(360 500) scale(0.86 -0.86)">
          <Girl expr="laugh" arm="peace" />
        </g>
        <ellipse cx="360" cy="502" rx="18" ry="4" fill="rgba(0,0,0,0.16)" />
        {/* the boy with selfie stick */}
        <g transform="translate(470 502) scale(0.9 -0.9) scale(-1 1)">
          <Boy expr="laugh" arm="selfie" />
        </g>
        <ellipse cx="470" cy="504" rx="18" ry="4" fill="rgba(0,0,0,0.16)" />
        <circle cx="560" cy="330" r="12" fill="rgba(255,255,255,0.5)" />
        <text x="520" y="376" fontSize="20" fontWeight="700" fill="#5a7d95" fontFamily="'Caveat', cursive">
          reel of the year 😂
        </text>
      </g>

      {/* washi tape strips */}
      <g transform="rotate(-40 210 160)">
        <rect x="180" y="150" width="60" height="16" rx="4" fill="#ffd9a8" opacity="0.85" />
      </g>
      <g transform="rotate(32 420 210)">
        <rect x="388" y="202" width="64" height="16" rx="4" fill="#ffc9c9" opacity="0.85" />
      </g>
      <g transform="rotate(-6 400 470)">
        <rect x="340" y="462" width="120" height="16" rx="4" fill="#c9e7d0" opacity="0.9" />
      </g>

      <Film warm="#8a5a2a" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  05 — The Funniest Period 😂 (teasing each other)                    */
/* ------------------------------------------------------------------ */
export function Scene05() {
  return (
    <svg viewBox="0 0 800 600" className="tl-scene-svg" role="img" aria-label="Two fictional best friends teasing each other with playful exaggerated expressions">
      <defs>
        <linearGradient id="s05sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfe3f2" />
          <stop offset="70%" stopColor="#fce8c4" />
          <stop offset="100%" stopColor="#ffe0b0" />
        </linearGradient>
        <linearGradient id="s05floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eecfa2" />
          <stop offset="100%" stopColor="#d9b98a" />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill="url(#s05sky)" />
      <circle cx="620" cy="150" r="120" fill="rgba(255,244,208,0.7)" />
      <circle cx="620" cy="150" r="60" fill="#fff6dc" />

      {/* cartoon clouds */}
      <ellipse cx="180" cy="120" rx="70" ry="26" fill="rgba(255,255,255,0.85)" />
      <ellipse cx="150" cy="108" rx="34" ry="22" fill="rgba(255,255,255,0.9)" />
      <ellipse cx="210" cy="108" rx="30" ry="20" fill="rgba(255,255,255,0.9)" />
      <ellipse cx="660" cy="90" rx="60" ry="22" fill="rgba(255,255,255,0.75)" />

      {/* floating comic doodles */}
      <g transform="translate(90 260) rotate(-12)">
        <path d="M0 10 L40 10 M0 18 L32 18 M4 26 L28 26" stroke="#ff6b9d" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      </g>
      <g transform="translate(700 250) rotate(14)">
        <path d="M0 8 L34 8 M2 16 L26 16 M6 24 L20 24" stroke="#ffa04d" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      </g>
      <g transform="translate(560 120) rotate(6)">
        <path d="M4 4 C 4 0, 12 -8, 12 -8 C 12 -8, 20 0, 20 4 C 20 9, 12 15, 12 15 C 12 15, 4 9, 4 4 Z" fill="#ffb35f" />
      </g>
      {/* burst dinkus */}
      <g transform="translate(250 170)">
        <circle cx="0" cy="0" r="26" fill="#ffd166" opacity="0.9" />
        <text x="0" y="9" textAnchor="middle" fontSize="26" fontWeight="900" fill="#a05a00">!</text>
      </g>
      <g transform="translate(300 210)">
        <circle cx="0" cy="0" r="20" fill="#ff8ab0" opacity="0.9" />
        <text x="0" y="7" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">!</text>
      </g>

      {/* floor */}
      <path d="M0 470 Q 400 440 800 470 L800 600 L0 600 Z" fill="url(#s05floor)" />
      <ellipse cx="410" cy="545" rx="320" ry="38" fill="rgba(0,0,0,0.07)" />
      {/* scattered doodle hearts/stars */}
      <path d="M120 520 l4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 8 -4 Z" fill="#ffd166" opacity="0.8" />
      <path d="M620 380 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" fill="#ff8ab0" opacity="0.8" />

      {/* the girl — teasing, mischievous */}
      <g transform="translate(320 520) scale(1.12 -1.12)">
        <Girl expr="mischief" arm="tease" />
      </g>
      <ellipse cx="320" cy="522" rx="22" ry="5" fill="rgba(0,0,0,0.2)" />
      {/* teasing speech bubble */}
      <g transform="translate(200 360) rotate(-6)">
        <path d="M4 4 C 4 -1, 12 -9, 24 -3 C 40 -2, 56 8, 54 20 C 52 32, 34 40, 20 38 C 14 42, 12 46, 8 40 C 2 38, 1 34, 4 26 C 2 20, 2 10, 4 4 Z" fill="#fff" stroke="#ff8ab0" strokeWidth="2.5" />
        <text x="27" y="19" textAnchor="middle" fontSize="15" fontWeight="700" fill="#c94f6f" fontFamily="'Caveat', cursive">
          Teasing mode: ON 😈
        </text>
      </g>

      {/* the boy — exaggerated annoyed reaction */}
      <g transform="translate(520 522) scale(1.15 -1.15)">
        <Boy expr="annoyed" arm="rest" />
      </g>
      <ellipse cx="520" cy="524" rx="22" ry="5" fill="rgba(0,0,0,0.2)" />
      {/* annoyed reaction bubble */}
      <g transform="translate(600 360) rotate(6)">
        <path d="M4 4 C 4 -1, 12 -9, 24 -3 C 40 -2, 56 8, 54 20 C 52 32, 34 40, 20 38 C 14 42, 12 46, 8 40 C 2 38, 1 34, 4 26 C 2 20, 2 10, 4 4 Z" fill="#fff" stroke="#5aa8ff" strokeWidth="2.5" />
        <text x="26" y="19" textAnchor="middle" fontSize="15" fontWeight="700" fill="#3a6fb5" fontFamily="'Caveat', cursive">
          Your reaction = My fun 😂
        </text>
      </g>

      {/* fairness meter doodle */}
      <g transform="translate(420 430)">
        <rect x="0" y="0" width="110" height="20" rx="10" fill="#fff" stroke="#d9b98a" strokeWidth="2" />
        <rect x="4" y="4" width="80" height="12" rx="6" fill="#5a3a7a" />
        <text x="55" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7a4250" fontFamily="'Caveat', cursive">
          me: 1 · you: 0
        </text>
      </g>

      <Film warm="#8a5a2a" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  06 — A Moment I Will Never Forget 🌊 (coastal outing)              */
/* ------------------------------------------------------------------ */
export function Scene06({ animated = false }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 800 600" className="tl-scene-svg" role="img" aria-label="Two fictional best friends enjoying a peaceful coastal sunset outing">
      <defs>
        <linearGradient id="s06sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7c08a" />
          <stop offset="45%" stopColor="#f7a0a0" />
          <stop offset="72%" stopColor="#e8847f" />
          <stop offset="100%" stopColor="#c96a7a" />
        </linearGradient>
        <linearGradient id="s06sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e88a7a" />
          <stop offset="45%" stopColor="#c96a9a" />
          <stop offset="100%" stopColor="#5a4a9a" />
        </linearGradient>
        <linearGradient id="s06rock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a6a6a" />
          <stop offset="100%" stopColor="#5a4448" />
        </linearGradient>
        {animated && (
          <linearGradient id="s06wave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f7c0c0" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fff0e0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e8a0a8" stopOpacity="0.8" />
          </linearGradient>
        )}
      </defs>

      <rect width="800" height="600" fill="url(#s06sky)" />
      {/* sun */}
      <circle cx="400" cy="210" r="64" fill="#ffe3a8" />
      <circle cx="400" cy="210" r="96" fill="rgba(255,214,150,0.3)" />

      {/* sea */}
      <rect y="270" width="800" height="330" fill="url(#s06sea)" />
      {/* sun reflection */}
      <ellipse cx="400" cy="300" rx="70" ry="16" fill="rgba(255,220,160,0.5)" />
      <ellipse cx="400" cy="330" rx="44" ry="10" fill="rgba(255,220,160,0.4)" />

      {/* animated waves (subtle) */}
      {animated ? (
        <g className="tl-scene-waves" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M0 ${296 + i * 46} Q 60 ${288 + i * 46}, 120 ${296 + i * 46} T 240 ${296 + i * 46} T 360 ${296 + i * 46} T 480 ${296 + i * 46} T 600 ${296 + i * 46} T 720 ${296 + i * 46} T 800 ${296 + i * 46}`}
              stroke="url(#s06wave)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
          ))}
        </g>
      ) : (
        <path d="M0 300 Q 120 292 240 300 T 480 300 T 720 300 T 800 300" stroke="rgba(255,220,180,0.5)" strokeWidth="4" fill="none" opacity="0.6" />
      )}

      {/* distant land */}
      <path d="M0 270 Q 120 235 260 270 Z" fill="#b0685a" opacity="0.6" />
      <path d="M540 270 Q 640 225 800 270 Z" fill="#a05a5a" opacity="0.5" />

      {/* rocks */}
      <ellipse cx="110" cy="560" rx="150" ry="60" fill="url(#s06rock)" />
      <ellipse cx="80" cy="540" rx="70" ry="46" fill="#7a5252" />
      <ellipse cx="700" cy="565" rx="130" ry="52" fill="url(#s06rock)" />
      <ellipse cx="740" cy="545" rx="60" ry="40" fill="#7a5252" />
      <ellipse cx="640" cy="455" rx="34" ry="20" fill="#8a6060" />

      {/* foreground shore */}
      <path d="M120 520 Q 400 470 690 520 L800 600 L0 600 Z" fill="#c98a6a" />
      <path d="M120 540 Q 400 500 700 540 L800 600 L0 600 Z" fill="#b0705a" />
      {/* small birds */}
      <path d="M250 160 q 6 -7 12 0 q 6 -7 12 0" stroke="#6a4a4a" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* the two friends sitting on a rock, looking at the ocean */}
      <g transform="translate(360 480) scale(0.95 -0.95)">
        <Girl expr="happy" arm="rest" />
      </g>
      <g transform="translate(480 482) scale(1 -1)">
        <Boy expr="calm" arm="pocket" />
      </g>
      <ellipse cx="420" cy="482" rx="70" ry="7" fill="rgba(0,0,0,0.22)" />
      {/* small foam around the rock */}
      <ellipse cx="360" cy="492" rx="80" ry="8" fill="rgba(255,240,220,0.5)" />
      <ellipse cx="440" cy="498" rx="64" ry="6" fill="rgba(255,240,220,0.45)" />

      <Film warm="#7a3a4a" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  07 — Where We Are Today 🫂 (golden hour, from behind)               */
/* ------------------------------------------------------------------ */
export function Scene07() {
  return (
    <svg viewBox="0 0 800 600" className="tl-scene-svg" role="img" aria-label="Two fictional best friends standing side by side from behind looking toward an open path at golden hour">
      <defs>
        <linearGradient id="s07sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffcf9a" />
          <stop offset="40%" stopColor="#ffb27a" />
          <stop offset="100%" stopColor="#ff9a7a" />
        </linearGradient>
        <linearGradient id="s07glow" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#fff6dd" />
          <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="s07path" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7d9a8" />
          <stop offset="100%" stopColor="#d9b98a" />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill="url(#s07sky)" />
      {/* sun low on horizon */}
      <circle cx="400" cy="330" r="90" fill="#ffe9b0" />
      <circle cx="400" cy="330" r="150" fill="url(#s07glow)" />
      {/* lens-flare streaks */}
      <circle cx="400" cy="190" r="6" fill="rgba(255,255,255,0.7)" />
      <circle cx="400" cy="470" r="5" fill="rgba(255,255,255,0.5)" />
      <path d="M360 330 L440 330" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <path d="M400 290 L400 370" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />

      {/* college building silhouettes */}
      <g opacity="0.55">
        <rect x="60" y="210" width="180" height="150" rx="6" fill="#c07a5a" />
        <rect x="120" y="180" width="60" height="40" rx="4" fill="#d98a6a" />
        <rect x="580" y="180" width="170" height="180" rx="6" fill="#c07a5a" />
        <rect x="610" y="120" width="110" height="70" rx="4" fill="#d98a6a" />
      </g>

      {/* trees */}
      <g>
        <rect x="480" y="330" width="12" height="90" rx="5" fill="#6a4a3a" />
        <ellipse cx="486" cy="318" rx="46" ry="44" fill="#7a6a3a" />
      </g>
      <g>
        <rect x="240" y="330" width="12" height="90" rx="5" fill="#6a4a3a" />
        <ellipse cx="246" cy="318" rx="40" ry="40" fill="#7a6a3a" />
      </g>

      {/* open path leading to the sun */}
      <path d="M320 600 L392 420 L420 420 L492 600 Z" fill="url(#s07path)" />
      <path d="M392 420 L392 600 L420 600 L420 420 Z" fill="rgba(90,60,40,0.18)" />
      <path d="M330 600 Q 392 500 398 430 M440 600 Q 408 500 404 430" stroke="#c08a5a" strokeWidth="3" fill="none" opacity="0.5" />

      {/* grass */}
      <path d="M0 560 Q 200 540 400 560 Q 600 580 800 560 L800 600 L0 600 Z" fill="#9a8a4a" />
      <path d="M0 575 Q 300 565 800 575 L800 600 L0 600 Z" fill="#8a7a3a" />

      {/* the two friends standing side by side from behind */}
      <g transform="translate(352 560) scale(1 -1)">
        <GirlBack />
      </g>
      <g transform="translate(470 564) scale(1 -1)">
        <BoyBack />
      </g>
      <ellipse cx="400" cy="560" rx="150" ry="14" fill="rgba(0,0,0,0.25)" />
      {/* backlit rim glow */}
      <ellipse cx="400" cy="420" rx="180" ry="80" fill="rgba(255,240,200,0.18)" />

      {/* wind movement lines */}
      <path d="M120 460 q 20 -4 40 0" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M640 470 q 20 -4 40 0" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M480 300 q 18 -3 36 0" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />

      <Film warm="#9a4a3a" />
    </svg>
  )
}