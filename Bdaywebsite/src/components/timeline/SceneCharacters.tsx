/**
 * SceneCharacters — Fictional Indian college characters used across every
 * timeline memory so the story looks continuous:
 *
 *  • The Girl  — 20–22, long black hair, teal/emerald kurta, dark leggings, white sneakers.
 *  • The Boy   — 20–22, short black messy hair, light shirt, blue jeans, white sneakers.
 *
 * They are close platonic friends: always a natural, fun, candid distance apart —
 * never romantic. Each sprite renders inside its own <g> with feet at (0,0);
 * callers apply translate/scale/flip.
 */

export const SKIN_G = '#e2a06f'
export const SKIN_GS = '#d08f5d'
export const SKIN_B = '#c08452'
export const SKIN_BS = '#a96f43'
export const DARK_HAIR = '#211510'
const TEAL = '#2f9c94'
const GOLD = '#e8c468'
const LEGG = '#2b303c'
const SHIRT = '#eef4f9'
const SHIRT_S = '#d8e4ed'
const JEANS = '#3d5b85'
const JEANS_B = '#2f4970'
const SHOE = '#f1ede6'

interface GirlProps {
  expr?: 'happy' | 'laugh' | 'mischief'
  arm?: 'rest' | 'phone' | 'cotton' | 'peace' | 'tease'
  stride?: boolean
}

interface BoyProps {
  expr?: 'happy' | 'laugh' | 'grin' | 'annoyed' | 'calm'
  arm?: 'rest' | 'phone' | 'point' | 'peace' | 'wave' | 'selfie' | 'pocket'
  stride?: boolean
}

/* ------------------------------------------------------------------ */
/*  Shared little pieces                                               */
/* ------------------------------------------------------------------ */

function Sleeve({ side, c }: { side: 'left' | 'right'; c: string }) {
  // short kurta/shirt sleeve cap at the shoulder
  const m = side === 'left' ? -1 : 1
  return <path d={`M${6 * m} -140 Q ${16 * m} -147 ${22 * m} -138 Q ${16 * m} -136 ${7 * m} -135 Z`} fill={c} />
}

/** Filters used by the phone-glowing arms; add once to each scene <defs>. */
export function CharGlowDefs() {
  return (
    <>
      <filter id="gphoneglow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <filter id="bphoneglow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </>
  )
}

function GirlHead({ expr }: { expr: GirlProps['expr'] }) {
  return (
    <g>
      {/* long back hair flowing behind the shoulders */}
      <path d="M-17 -198 C -30 -158, -33 -122, -17 -102 C -15 -94, -9 -90, -6 -100 C -9 -120, -22 -160, -16 -198 Z" fill={DARK_HAIR} />
      <path d="M17 -198 C 30 -158, 33 -122, 17 -102 C 15 -94, 9 -90, 6 -100 C 9 -120, 22 -160, 16 -198 Z" fill={DARK_HAIR} />
      {/* ears */}
      <circle cx="-12.6" cy="-170" r="2.6" fill={SKIN_G} />
      <circle cx="12.6" cy="-170" r="2.6" fill={SKIN_G} />
      {/* face */}
      <ellipse cx="0" cy="-170" rx="12.4" ry="14.4" fill={SKIN_G} />
      <ellipse cx="0" cy="-163" rx="9.6" ry="7.6" fill="rgba(255,255,255,0.18)" />
      {/* hair top + centre-part fringe */}
      <path d="M-16 -196 C -24 -214, 24 -214, 16 -196 C 10 -205, -10 -205, -16 -196 Z" fill={DARK_HAIR} />
      <path d="M-13 -196 C -9 -188, -5 -185, -2 -188 C -2 -196, -7 -201, -13 -197 Z" fill={DARK_HAIR} />
      <path d="M13 -196 C 9 -188, 5 -185, 2 -188 C 2 -196, 7 -201, 13 -197 Z" fill={DARK_HAIR} />
      <path d="M-6 -194 C -4 -187, 0 -186, 4 -188 C 6 -180, 2 -172, -2 -178 C -5 -184, -6 -189, -6 -194 Z" fill={DARK_HAIR} />
      {/* side locks framing the face */}
      <path d="M-13 -190 C -17 -182, -17 -168, -13 -158 C -10 -152, -7 -154, -8 -166 C -8 -176, -10 -184, -9 -190 Z" fill={DARK_HAIR} />
      <path d="M13 -190 C 17 -182, 17 -168, 13 -158 C 10 -152, 7 -154, 8 -166 C 8 -176, 10 -184, 9 -190 Z" fill={DARK_HAIR} />
      {/* brows */}
      <path d="M-9 -181 Q -5.4 -183.2 -3 -181.5" stroke={DARK_HAIR} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M9 -181 Q 5.4 -183.2 3 -181.5" stroke={DARK_HAIR} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* eyes */}
      {expr === 'mischief' ? (
        <>
          <path d="M-8.4 -173 Q -6.4 -174.6 -4.4 -173.4" stroke={DARK_HAIR} strokeWidth="1.7" fill="none" strokeLinecap="round" />
          <ellipse cx="5" cy="-173.2" rx="1.5" ry="2" fill={DARK_HAIR} />
          <circle cx="5.4" cy="-173.9" r="0.55" fill="#fff" />
        </>
      ) : (
        <>
          <ellipse cx="-5.1" cy="-173" rx="1.55" ry="2.1" fill={DARK_HAIR} />
          <circle cx="-4.7" cy="-173.8" r="0.6" fill="#fff" />
          <ellipse cx="5.1" cy="-173" rx="1.55" ry="2.1" fill={DARK_HAIR} />
          <circle cx="5.5" cy="-173.8" r="0.6" fill="#fff" />
        </>
      )}
      {/* nose */}
      <path d="M-0.6 -170 Q 1.6 -166.8 0.4 -165" stroke="rgba(150,90,55,0.65)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      {/* cheeks */}
      <ellipse cx="-7.4" cy="-164.5" rx="2.5" ry="1.6" fill="rgba(244,120,120,0.4)" />
      <ellipse cx="7.4" cy="-164.5" rx="2.5" ry="1.6" fill="rgba(244,120,120,0.4)" />
      {/* mouth */}
      {expr === 'laugh' ? (
        <>
          <path d="M-4 -160.6 Q 0 -154.4 4 -160.6 Q 0 -157.8 -4 -160.6 Z" fill="#7c4430" />
          <path d="M-2.4 -158.9 Q 0 -156.4 2.4 -158.9 Q 0 -160.2 -2.4 -158.9 Z" fill="#e88888" />
        </>
      ) : expr === 'mischief' ? (
        <path d="M-4.2 -160.8 Q -1 -157.2 1 -159.6 Q 2.6 -156.2 4.6 -158 Q 2.4 -155.4 -0.4 -157.4 Q -3 -153.6 -4.2 -160.8 Z" fill="#7c4430" />
      ) : (
        <path d="M-3.8 -159.8 Q 0 -156.6 3.8 -159.8" stroke="#8a4a28" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}
      {/* tiny gold stud */}
      <circle cx="-12.6" cy="-167.5" r="0.9" fill={GOLD} />
      <circle cx="12.6" cy="-167.5" r="0.9" fill={GOLD} />
    </g>
  )
}

function BoyHead({ expr }: { expr: BoyProps['expr'] }) {
  const annoyed = expr === 'annoyed'
  return (
    <g>
      {/* ears */}
      <circle cx="-12.4" cy="-176" r="2.7" fill={SKIN_B} />
      <circle cx="12.4" cy="-176" r="2.7" fill={SKIN_B} />
      {/* face */}
      <ellipse cx="0" cy="-176" rx="12.4" ry="14.4" fill={SKIN_B} />
      {!annoyed && <ellipse cx="0" cy="-169" rx="9.6" ry="7.4" fill="rgba(255,255,255,0.14)" />}
      {/* short messy hair */}
      <path d="M-15 -200 C -27 -214, 27 -214, 15 -200 C 20 -196, 16 -194, 11 -196 C 14 -190, 8 -188, 4 -192 C 1 -186, -3 -188, -4 -194 C -8 -188, -13 -190, -12 -196 C -18 -196, -18 -198, -15 -200 Z" fill={DARK_HAIR} />
      <path d="M-13 -197 Q -8 -191 -5 -194" stroke={DARK_HAIR} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M13 -197 Q 8 -191 5 -194" stroke={DARK_HAIR} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* brows (furrowed when annoyed) */}
      {annoyed ? (
        <>
          <path d="M-9 -182 Q -5.4 -184 -3 -181.4" stroke={DARK_HAIR} strokeWidth="1.9" fill="none" strokeLinecap="round" />
          <path d="M3 -181.4 Q 5.4 -184 9 -182" stroke={DARK_HAIR} strokeWidth="1.9" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M-9 -182 Q -5.4 -184.2 -3 -182.4" stroke={DARK_HAIR} strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M9 -182 Q 5.4 -184.2 3 -182.4" stroke={DARK_HAIR} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </>
      )}
      {/* eyes */}
      {annoyed ? (
        <>
          <ellipse cx="-5" cy="-174.4" rx="1.5" ry="1.7" fill={DARK_HAIR} />
          <circle cx="-4.7" cy="-175" r="0.55" fill="#fff" />
          <ellipse cx="5" cy="-174.4" rx="1.5" ry="1.7" fill={DARK_HAIR} />
          <circle cx="5.3" cy="-175" r="0.55" fill="#fff" />
        </>
      ) : (
        <>
          <ellipse cx="-5" cy="-174.6" rx="1.5" ry="2" fill={DARK_HAIR} />
          <circle cx="-4.6" cy="-175.4" r="0.6" fill="#fff" />
          <ellipse cx="5" cy="-174.6" rx="1.5" ry="2" fill={DARK_HAIR} />
          <circle cx="5.4" cy="-175.4" r="0.6" fill="#fff" />
        </>
      )}
      {/* nose */}
      <path d="M-0.6 -172.5 Q 1.4 -169.4 0.3 -167.6" stroke="rgba(120,70,40,0.7)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      {/* cheeks */}
      {annoyed ? (
        <>
          <ellipse cx="-7.6" cy="-168" rx="2.7" ry="1.9" fill="rgba(255,120,110,0.55)" />
          <ellipse cx="7.6" cy="-168" rx="2.7" ry="1.9" fill="rgba(255,120,110,0.55)" />
        </>
      ) : (
        <>
          <ellipse cx="-7.4" cy="-170" rx="2.4" ry="1.5" fill="rgba(244,130,120,0.35)" />
          <ellipse cx="7.4" cy="-170" rx="2.4" ry="1.5" fill="rgba(244,130,120,0.35)" />
        </>
      )}
      {/* mouth */}
      {expr === 'annoyed' ? (
        <path d="M-3.4 -162.2 Q 0 -164.4 3.4 -162.2 Q 0 -160 -3.4 -162.2 Z" fill="#7a4030" />
      ) : expr === 'laugh' ? (
        <>
          <path d="M-4 -164.4 Q 0 -157.4 4 -164.4 Q 0 -161.4 -4 -164.4 Z" fill="#7c4430" />
          <path d="M-2.4 -162.6 Q 0 -159.6 2.4 -162.6 Q 0 -164 -2.4 -162.6 Z" fill="#e88888" />
        </>
      ) : expr === 'grin' ? (
        <path d="M-4.4 -163.2 Q 0 -158.6 4.4 -163.2 Q 0 -160 -4.4 -163.2 Z" fill="#7c4430" />
      ) : expr === 'calm' ? (
        <path d="M-3.6 -163.6 Q 0 -161.2 3.6 -163.6" stroke="#6d3a20" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M-3.8 -163.4 Q 0 -160.2 3.8 -163.4" stroke="#6d3a20" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  The Girl                                                            */
/* ------------------------------------------------------------------ */

export function Girl({ expr = 'happy', arm = 'rest', stride = false }: GirlProps) {
  return (
    <g>
      {/* legs + feet */}
      <g transform={stride ? 'rotate(7 7 -42)' : undefined}>
        <rect x="-11" y="-84" width="7.4" height="78" rx="3.4" fill={LEGG} />
        <rect x="-13" y="-9" width="9.6" height="7" rx="3.2" fill={SHOE} />
        <rect x="-13.4" y="-2.6" width="10.4" height="2.6" rx="1.2" fill="#d8d3ca" />
      </g>
      <g transform={stride ? 'rotate(-5 -3 -42)' : undefined}>
        <rect x="3.6" y="-84" width="7.4" height="78" rx="3.4" fill="#232832" />
        <rect x="3.4" y="-9" width="9.6" height="7" rx="3.2" fill={SHOE} />
        <rect x="3" y="-2.6" width="10.4" height="2.6" rx="1.2" fill="#d8d3ca" />
      </g>
      {/* back of kurta */}
      <path d="M-13 -135 C -6 -142, 6 -142, 13 -135 L19 -10 Q 20 -7 0 -7 Q -20 -7 -19 -10 Z" fill={TEAL} />
      <path d="M0 -139 L0 -7" stroke="rgba(255,255,255,0.16)" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
      <rect x="-18.6" y="-11" width="37.2" height="3.1" rx="1.5" fill={GOLD} />
      {/* arms */}
      {arm === 'rest' && (
        <g>
          <Sleeve side="left" c={TEAL} />
          <Sleeve side="right" c={TEAL} />
          <g transform="rotate(6 8 -120)">
            <path d="M8 -133 C 13 -126, 15 -112, 14 -98 L6.5 -98 C 7 -110, 7 -124, 4 -134 Z" fill={SKIN_G} />
            <ellipse cx="10.2" cy="-93.5" rx="3.6" ry="4.2" fill={SKIN_G} />
          </g>
          <g transform="scale(-1 1)">
            <g transform="rotate(6 8 -120)">
              <path d="M8 -133 C 13 -126, 15 -112, 14 -98 L6.5 -98 C 7 -110, 7 -124, 4 -134 Z" fill={SKIN_G} />
              <ellipse cx="10.2" cy="-93.5" rx="3.6" ry="4.2" fill={SKIN_G} />
            </g>
          </g>
        </g>
      )}
      {arm === 'phone' && (
        <g>
          <Sleeve side="left" c={TEAL} />
          <Sleeve side="right" c={TEAL} />
          {/* left arm hangs */}
          <g transform="scale(-1 1)">
            <g transform="rotate(6 8 -120)">
              <path d="M8 -133 C 13 -126, 15 -112, 14 -98 L6.5 -98 C 7 -110, 7 -124, 4 -134 Z" fill={SKIN_G} />
              <ellipse cx="10.2" cy="-93.5" rx="3.6" ry="4.2" fill={SKIN_G} />
            </g>
          </g>
          {/* right arm up holding phone */}
          <ellipse cx="15" cy="-110" rx="10" ry="11" fill="rgba(140,220,255,0.55)" filter="url(#gphoneglow)" />
          <path d="M11 -134 C 18 -126, 20 -118, 17.6 -112 L10.6 -114 C 12 -124, 9 -130, 4.5 -134 Z" fill={SKIN_G} />
          <ellipse cx="15.6" cy="-106.6" rx="3.6" ry="3.9" fill={SKIN_G} />
          <g transform="rotate(-12 16 -106)">
            <rect x="12.4" y="-118" width="8.6" height="13" rx="1.7" fill="#a0305a" />
            <rect x="13.3" y="-116.6" width="6.8" height="7.2" rx="1" fill="#bfe8ff" />
            <rect x="13.3" y="-108" width="6.8" height="1.4" rx="0.6" fill="#e86a9a" />
          </g>
        </g>
      )}
      {arm === 'cotton' && (
        <g>
          <Sleeve side="left" c={TEAL} />
          <Sleeve side="right" c={TEAL} />
          {/* right arm hangs holding nothing */}
          <g transform="rotate(6 8 -120)">
            <path d="M8 -133 C 13 -126, 15 -112, 14 -98 L6.5 -98 C 7 -110, 7 -124, 4 -134 Z" fill={SKIN_G} />
            <ellipse cx="10.2" cy="-93.5" rx="3.6" ry="4.2" fill={SKIN_G} />
          </g>
          {/* left arm raised holding candy floss */}
          <g transform="scale(-1 1)">
            <path d="M10 -134 C 16 -128, 21 -122, 22.4 -111 L15.4 -108 C 13 -117, 10 -125, 4.8 -133 Z" fill={SKIN_G} />
            <ellipse cx="19.6" cy="-105.8" rx="3.4" ry="3.8" fill={SKIN_G} />
            <g>
              <rect x="19.6" y="-118" width="1.7" height="6" rx="0.8" fill="#e9d8bb" />
              <ellipse cx="17.4" cy="-123.5" rx="6.4" ry="5.4" fill="#ff8fb3" />
              <ellipse cx="22.8" cy="-124" rx="6.6" ry="5.2" fill="#ffa6c6" />
              <ellipse cx="20.2" cy="-129.6" rx="5.8" ry="4.6" fill="#ff7fa8" />
              <circle cx="23.8" cy="-129" r="1.4" fill="rgba(255,255,255,0.7)" />
            </g>
          </g>
        </g>
      )}
      {arm === 'peace' && (
        <g>
          <Sleeve side="left" c={TEAL} />
          <Sleeve side="right" c={TEAL} />
          <g transform="rotate(-10 -8 -106)">
            <path d="M-11 -134 C -17 -128, -20 -120, -17.6 -112 L-10.6 -114 C -12 -124, -9 -130, -4.5 -134 Z" fill={SKIN_G} />
            <ellipse cx="-14.4" cy="-106.6" rx="3.6" ry="3.9" fill={SKIN_G} />
            <rect x="-15.6" y="-110.6" width="1.6" height="6.4" rx="0.8" fill={SKIN_G} />
            <rect x="-13.4" y="-110.6" width="1.6" height="6.4" rx="0.8" fill={SKIN_G} />
          </g>
          <g transform="rotate(10 8 -106)">
            <path d="M8 -134 C 14 -128, 17 -120, 14.6 -112 L8 -114 C 9 -124, 7 -130, 3 -134 Z" fill={SKIN_G} />
            <ellipse cx="12" cy="-106.6" rx="3.6" ry="3.9" fill={SKIN_G} />
            <rect x="10.8" y="-110.6" width="1.6" height="6.4" rx="0.8" fill={SKIN_G} />
            <rect x="13" y="-110.6" width="1.6" height="6.4" rx="0.8" fill={SKIN_G} />
          </g>
        </g>
      )}
      {arm === 'tease' && (
        <g>
          <Sleeve side="right" c={TEAL} />
          {/* right arm hangs */}
          <g transform="rotate(6 8 -120)">
            <path d="M8 -133 C 13 -126, 15 -112, 14 -98 L6.5 -98 C 7 -110, 7 -124, 4 -134 Z" fill={SKIN_G} />
            <ellipse cx="10.2" cy="-93.5" rx="3.6" ry="4.2" fill={SKIN_G} />
          </g>
          {/* left arm raised, hand near mouth (calling out to tease) */}
          <g transform="scale(-1 1)">
            <Sleeve side="left" c={TEAL} />
            <path d="M10 -133 C 17 -128, 23 -122, 23.6 -112 L16.6 -112 C 16 -120, 11 -127, 5 -133 Z" fill={SKIN_G} />
            <ellipse cx="20.4" cy="-108" rx="3.7" ry="4" fill={SKIN_G} />
          </g>
        </g>
      )}
      {/* neck + head in front */}
      <rect x="-3.4" y="-152" width="6.8" height="13.5" rx="2.6" fill={SKIN_G} />
      <GirlHead expr={expr} />
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  The Boy                                                             */
/* ------------------------------------------------------------------ */

export function Boy({ expr = 'happy', arm = 'rest', stride = false }: BoyProps) {
  return (
    <g>
      {/* legs + feet */}
      <g transform={stride ? 'rotate(-4 -4 -44)' : undefined}>
        <rect x="-12" y="-86" width="8" height="82" rx="3.4" fill={JEANS_B} />
        <rect x="-14.2" y="-9" width="10" height="7" rx="3.2" fill={SHOE} />
        <rect x="-14.8" y="-2.6" width="11" height="2.6" rx="1.2" fill="#c9c4ba" />
      </g>
      <g transform={stride ? 'rotate(4 4 -44)' : undefined}>
        <rect x="4" y="-86" width="8" height="82" rx="3.4" fill={JEANS} />
        <rect x="4.2" y="-9" width="10" height="7" rx="3.2" fill={SHOE} />
        <rect x="3.8" y="-2.6" width="11" height="2.6" rx="1.2" fill="#c9c4ba" />
      </g>
      {/* shirt torso */}
      <path d="M-14 -141 C -6 -148, 6 -148, 14 -141 L18 -18 Q 19 -15 0 -15 Q -19 -15 -18 -18 Z" fill={SHIRT} />
      <path d="M0 -144 L0 -15" stroke="rgba(120,150,170,0.35)" strokeWidth="2" strokeLinecap="round" />
      <rect x="-11" y="-28" width="22" height="2.2" rx="1.1" fill={JEANS_B} />
      {/* arms */}
      {arm === 'rest' && (
        <g>
          <Sleeve side="left" c={SHIRT_S} />
          <Sleeve side="right" c={SHIRT_S} />
          <g transform="rotate(4 8 -122)">
            <path d="M8 -133 C 13 -125, 15 -110, 14 -97 L6.5 -97 C 7 -108, 7 -121, 4 -131 Z" fill={SKIN_B} />
            <ellipse cx="10.4" cy="-92.5" rx="3.8" ry="4.4" fill={SKIN_B} />
          </g>
          <g transform="scale(-1 1)">
            <g transform="rotate(4 8 -122)">
              <path d="M8 -133 C 13 -125, 15 -110, 14 -97 L6.5 -97 C 7 -108, 7 -121, 4 -131 Z" fill={SKIN_B} />
              <ellipse cx="10.4" cy="-92.5" rx="3.8" ry="4.4" fill={SKIN_B} />
            </g>
          </g>
        </g>
      )}
      {arm === 'phone' && (
        <g>
          <Sleeve side="left" c={SHIRT_S} />
          <Sleeve side="right" c={SHIRT_S} />
          <g transform="rotate(4 8 -122)">
            <path d="M8 -133 C 13 -125, 15 -110, 14 -97 L6.5 -97 C 7 -108, 7 -121, 4 -131 Z" fill={SKIN_B} />
            <ellipse cx="10.4" cy="-92.5" rx="3.8" ry="4.4" fill={SKIN_B} />
          </g>
          <ellipse cx="-14" cy="-112" rx="10" ry="11" fill="rgba(140,220,255,0.5)" filter="url(#bphoneglow)" />
          <path d="M-11 -134 C -18 -126, -20 -118, -17.6 -112 L-10.6 -114 C -12 -124, -9 -130, -4.5 -134 Z" fill={SKIN_B} />
          <ellipse cx="-15.4" cy="-107" rx="3.7" ry="4" fill={SKIN_B} />
          <g transform="rotate(12 -16 -107)">
            <rect x="-20.8" y="-118.6" width="8.8" height="13.2" rx="1.7" fill="#31599a" />
            <rect x="-19.8" y="-117" width="6.8" height="7.2" rx="1" fill="#cdeeff" />
            <rect x="-19.8" y="-108.6" width="6.8" height="1.4" rx="0.6" fill="#5aa8ff" />
          </g>
        </g>
      )}
      {arm === 'point' && (
        <g>
          <Sleeve side="left" c={SHIRT_S} />
          <Sleeve side="right" c={SHIRT_S} />
          <g transform="rotate(4 8 -122)">
            <path d="M8 -133 C 13 -125, 15 -110, 14 -97 L6.5 -97 C 7 -108, 7 -121, 4 -131 Z" fill={SKIN_B} />
            <ellipse cx="10.4" cy="-92.5" rx="3.8" ry="4.4" fill={SKIN_B} />
          </g>
          {/* right arm raised pointing up-forward */}
          <path d="M7 -133 C 12 -126, 15 -114, 13.4 -102 L6.8 -104 C 8 -116, 7 -126, 3 -133 Z" fill={SKIN_B} />
          <ellipse cx="10.6" cy="-99.5" rx="3.6" ry="3.9" fill={SKIN_B} />
          <g transform="rotate(28 12 -96)">
            <rect x="9.8" y="-112" width="4.2" height="12" rx="2" fill={SKIN_B} />
            <rect x="10" y="-117" width="2.1" height="5" rx="1" fill={SKIN_B} />
            <rect x="13" y="-116" width="2.1" height="4.4" rx="1" fill={SKIN_B} />
          </g>
        </g>
      )}
      {arm === 'wave' && (
        <g>
          <Sleeve side="left" c={SHIRT_S} />
          <Sleeve side="right" c={SHIRT_S} />
          <g transform="rotate(4 8 -122)">
            <path d="M8 -133 C 13 -125, 15 -110, 14 -97 L6.5 -97 C 7 -108, 7 -121, 4 -131 Z" fill={SKIN_B} />
            <ellipse cx="10.4" cy="-92.5" rx="3.8" ry="4.4" fill={SKIN_B} />
          </g>
          <path d="M-9 -133 C -15 -126, -20 -120, -21.6 -110 L-14.6 -108 C -13 -117, -9 -126, -3 -132 Z" fill={SKIN_B} />
          <ellipse cx="-18" cy="-105.8" rx="3.6" ry="3.9" fill={SKIN_B} />
        </g>
      )}
      {arm === 'selfie' && (
        <g>
          <Sleeve side="right" c={SHIRT_S} />
          <g transform="rotate(4 8 -122)">
            <path d="M8 -133 C 13 -125, 15 -110, 14 -97 L6.5 -97 C 7 -108, 7 -121, 4 -131 Z" fill={SKIN_B} />
            <ellipse cx="10.4" cy="-92.5" rx="3.8" ry="4.4" fill={SKIN_B} />
          </g>
          {/* right arm reaching up with selfie stick */}
          <Sleeve side="left" c={SHIRT_S} />
          <path d="M9 -133 C 15 -126, 20 -115, 21.6 -100 L15 -99 C 13 -108, 9 -121, 5 -132 Z" fill={SKIN_B} />
          <ellipse cx="18.6" cy="-96.5" rx="3.5" ry="3.8" fill={SKIN_B} />
          <g transform="rotate(-55 20 -92)">
            <rect x="18.6" y="-122" width="2.4" height="26" rx="1.2" fill="#2a2a33" />
            <rect x="16" y="-128" width="7.6" height="8.6" rx="2.2" fill="#6a1f3d" />
            <rect x="16.9" y="-126.8" width="5.8" height="5" rx="1.3" fill="#ffd9e8" />
          </g>
        </g>
      )}
      {arm === 'pocket' && (
        <g>
          <Sleeve side="left" c={SHIRT_S} />
          <Sleeve side="right" c={SHIRT_S} />
          <g transform="scale(-1 1)">
            <path d="M8 -133 C 11 -127, 11 -116, 9 -108 L3 -108 C 4 -118, 4 -126, 3 -132 Z" fill={SKIN_B} />
            <ellipse cx="6" cy="-104.5" rx="3" ry="3.4" fill={SKIN_B} />
          </g>
          <path d="M8 -133 C 11 -127, 11 -116, 9 -108 L3 -108 C 4 -118, 4 -126, 3 -132 Z" fill={SKIN_B} />
          <ellipse cx="6" cy="-104.5" rx="3" ry="3.4" fill={SKIN_B} />
        </g>
      )}
      {/* neck + head */}
      <rect x="-3.6" y="-158" width="7.2" height="14" rx="2.8" fill={SKIN_B} />
      <BoyHead expr={expr} />
      {/* annoyed sweat drop */}
      {expr === 'annoyed' && <path d="M16 -188 Q 18 -185 16.4 -182 Q 15 -185 16 -188 Z" fill="#9fd8ef" />}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  Back views (Section 07 — "where we are today")                     */
/* ------------------------------------------------------------------ */

export function GirlBack() {
  return (
    <g>
      <rect x="-11" y="-84" width="7.4" height="78" rx="3.4" fill={LEGG} />
      <rect x="3.6" y="-84" width="7.4" height="78" rx="3.4" fill="#232832" />
      <rect x="-13" y="-9" width="9.6" height="7" rx="3.2" fill={SHOE} />
      <rect x="3.4" y="-9" width="9.6" height="7" rx="3.2" fill={SHOE} />
      <path d="M-13 -135 C -6 -142, 6 -142, 13 -135 L19 -10 Q 20 -7 0 -7 Q -20 -7 -19 -10 Z" fill={TEAL} />
      <rect x="-18.6" y="-11" width="37.2" height="3.1" rx="1.5" fill={GOLD} />
      {/* shoulder bag strap */}
      <path d="M-9 -138 C -4 -120, 4 -118, 9 -136" stroke="rgba(120,70,20,0.5)" strokeWidth="2.6" fill="none" />
      <g transform="rotate(-18 -16 -96)">
        <rect x="-21" y="-102" width="11" height="13" rx="4" fill="#a8643f" />
        <rect x="-20.4" y="-96" width="9.8" height="6.4" rx="3" fill="#8f5130" />
      </g>
      {/* long hair covering the back of the head + torso */}
      <path d="M-16 -196 C -28 -156, -31 -120, -17 -98 C -14 -88, -8 -86, -5 -96 C -10 -118, -22 -156, -15 -196 Z" fill={DARK_HAIR} />
      <path d="M16 -196 C 28 -156, 31 -120, 17 -98 C 14 -88, 8 -86, 5 -96 C 10 -118, 22 -156, 15 -196 Z" fill={DARK_HAIR} />
      <path d="M-15 -197 C -22 -206, 22 -206, 15 -197 C 9 -207, -9 -207, -15 -197 Z" fill={DARK_HAIR} />
    </g>
  )
}

export function BoyBack() {
  return (
    <g>
      <rect x="-12" y="-86" width="8" height="82" rx="3.4" fill={JEANS_B} />
      <rect x="4" y="-86" width="8" height="82" rx="3.4" fill={JEANS} />
      <rect x="-14.2" y="-9" width="10" height="7" rx="3.2" fill={SHOE} />
      <rect x="4.2" y="-9" width="10" height="7" rx="3.2" fill={SHOE} />
      <path d="M-14 -141 C -6 -148, 6 -148, 14 -141 L18 -18 Q 19 -15 0 -15 Q -19 -15 -18 -18 Z" fill={SHIRT} />
      <rect x="-11" y="-28" width="22" height="2.2" rx="1.1" fill={JEANS_B} />
      {/* small backpack */}
      <g transform="rotate(6 0 -105)">
        <rect x="-10" y="-128" width="20" height="25" rx="6" fill="#394d69" />
        <rect x="-10" y="-126" width="20" height="20" rx="6" fill="#4a6480" />
        <rect x="-3.4" y="-112" width="6.8" height="4" rx="2" fill="#2c3f5a" />
        <path d="M-10 -128 L10 -128 L6 -122 L-6 -122 Z" fill="#2c3f5a" />
      </g>
      {/* arms behind */}
      <g transform="rotate(3 8 -120)">
        <path d="M8 -133 C 12 -126, 13 -113, 12 -100 L5.5 -100 C 6.5 -111, 6.5 -123, 4 -131 Z" fill={SKIN_B} />
        <ellipse cx="8.6" cy="-95" rx="3.6" ry="4" fill={SKIN_B} />
      </g>
      <g transform="scale(-1 1)">
        <g transform="rotate(3 8 -120)">
          <path d="M8 -133 C 12 -126, 13 -113, 12 -100 L5.5 -100 C 6.5 -111, 6.5 -123, 4 -131 Z" fill={SKIN_B} />
          <ellipse cx="8.6" cy="-95" rx="3.6" ry="4" fill={SKIN_B} />
        </g>
      </g>
      {/* head back */}
      <ellipse cx="0" cy="-176" rx="12.4" ry="14.4" fill={SKIN_B} />
      <path d="M-14 -199 C -24 -212, 24 -212, 14 -199 C 10 -210, -10 -210, -14 -199 Z" fill={DARK_HAIR} />
      <path d="M-13 -198 Q -8 -192 -4 -194 M13 -198 Q 8 -192 4 -194" stroke={DARK_HAIR} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  Tiny background students (crowd silhouettes, never characters)     */
/* ------------------------------------------------------------------ */

export function StudentShadow({
  x,
  y,
  s = 1,
  tone = '#8a6f5a',
  flip = false,
}: {
  x: number
  y: number
  s?: number
  tone?: string
  flip?: boolean
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`} opacity="0.8">
      <ellipse cx="0" cy="-6" rx="7" ry="2" fill="rgba(0,0,0,0.18)" />
      <rect x="-5" y="-14" width="10" height="10" rx="3.4" fill={tone} />
      <circle cx="0" cy="-19" r="4.6" fill={tone} />
      <path d="M-4 -23 C -4 -26, 4 -26, 4 -23 Z" fill="rgba(0,0,0,0.35)" />
    </g>
  )
}