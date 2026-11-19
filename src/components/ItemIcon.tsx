import type { ItemShape } from '../data/profile'

/**
 * Hand-drawn item art in the site's palette, used instead of real logos.
 * Colours come from the --ic (main) and --ic-deep (outline) CSS variables on a parent.
 */
export function ItemIcon({ shape, mark, size = 64 }: { shape: ItemShape; mark: string; size?: number }) {
  const fs = mark.length >= 3 ? 12 : mark.length === 2 ? 16 : 21
  const textY = { gem: 36, potion: 45, scroll: 37, book: 37, feather: 33, orb: 37 }[shape]
  const textX = shape === 'book' ? 35 : 32

  return (
    <svg className="item-icon" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g fill="#fff" stroke="var(--ic-deep)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        {shape === 'gem' && (
          <>
            <polygon points="32,5 55,21 46,58 18,58 9,21" fill="var(--ic)" />
            <polygon points="20,21 32,9 44,21 32,52" fill="#fff" fillOpacity="0.45" stroke="none" />
            <path d="M9 21h46M20 21l12 31 12-31M32 5l-12 16M32 5l12 16" fill="none" strokeWidth="1.6" strokeOpacity="0.6" />
          </>
        )}
        {shape === 'potion' && (
          <>
            <rect x="25" y="4" width="14" height="6" rx="2" fill="var(--ic-deep)" />
            <path d="M27 10h10v10c9 3 15 10 15 19 0 11-9 19-20 19s-20-8-20-19c0-9 6-16 15-19z" />
            <path d="M15 38c6-4 12 4 17 0s11-4 17 0c0 9-7 16-17 16s-17-7-17-16z" fill="var(--ic)" stroke="none" />
            <path d="M18 30c2-4 5-6 8-7" fill="none" stroke="#fff" strokeWidth="3" strokeOpacity="0.9" />
          </>
        )}
        {shape === 'scroll' && (
          <>
            <rect x="13" y="14" width="38" height="36" rx="3" fill="#fffaf0" />
            <rect x="8" y="9" width="48" height="9" rx="4.5" fill="var(--ic)" />
            <rect x="8" y="46" width="48" height="9" rx="4.5" fill="var(--ic)" />
            <path d="M19 25h26M19 40h26" fill="none" strokeWidth="1.5" strokeOpacity="0.35" />
          </>
        )}
        {shape === 'book' && (
          <>
            <rect x="13" y="7" width="40" height="50" rx="4" fill="var(--ic)" />
            <rect x="21" y="12" width="27" height="40" rx="2" fill="#fff" fillOpacity="0.85" />
            <path d="M13 11v42" strokeWidth="5" stroke="var(--ic-deep)" />
            <path d="M42 7v12l4-3 4 3V7" fill="var(--pink-400)" strokeWidth="1.6" />
          </>
        )}
        {shape === 'feather' && (
          <>
            <path d="M50 5C30 8 14 26 16 50l-6 9 9-6c22 1 36-18 31-48z" fill="var(--ic)" />
            <path d="M48 9C36 22 26 36 14 56" fill="none" strokeWidth="1.8" strokeOpacity="0.7" />
            <path d="M26 22l6 4M22 32l7 3M20 42l7 1" fill="none" stroke="#fff" strokeWidth="2" />
          </>
        )}
        {shape === 'orb' && (
          <>
            <path d="M20 54h24l-4-7H24z" fill="var(--ic-deep)" />
            <circle cx="32" cy="30" r="21" fill="var(--ic)" />
            <circle cx="32" cy="30" r="14" fill="#fff" fillOpacity="0.35" stroke="none" />
            <ellipse cx="24" cy="21" rx="6" ry="3.5" fill="#fff" stroke="none" transform="rotate(-35 24 21)" />
          </>
        )}
      </g>
      <text
        x={textX}
        y={textY}
        textAnchor="middle"
        fontFamily="Fredoka, sans-serif"
        fontWeight="700"
        fontSize={fs}
        fill="var(--ink)"
        stroke="#fff"
        strokeWidth="3.5"
        paintOrder="stroke"
        strokeLinejoin="round"
      >
        {mark}
      </text>
    </svg>
  )
}
