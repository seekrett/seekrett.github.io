/** A cute little figure skate. */
export function SkateIcon({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M16 6h16c2 0 3 1.4 3 3v18c0 3 2 5 5 6l10 3c4 1.2 6 3.6 6 7v2c0 1.6-1.3 3-3 3H15c-1.7 0-3-1.4-3-3V10c0-2.2 1.8-4 4-4z"
        fill="#fff"
        stroke="#f2559b"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M22 16h8M22 22h8M22 28h9" stroke="#ffa6cf" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 48v6M46 48v6" stroke="#9fdcf7" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 56h46c3 0 5-1.5 6-4" fill="none" stroke="#8ab8d6" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="40" cy="12" r="5" fill="#ffcde4" stroke="#f2559b" strokeWidth="2" />
    </svg>
  )
}
