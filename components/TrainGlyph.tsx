export function TrainGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Rails */}
      <line x1="0" y1="52" x2="220" y2="52" strokeDasharray="2 4" opacity="0.6" />
      <line x1="0" y1="56" x2="220" y2="56" strokeDasharray="2 4" opacity="0.35" />
      {/* Locomotive */}
      <rect x="8" y="14" width="52" height="30" rx="3" />
      <rect x="14" y="22" width="10" height="8" rx="1" />
      <rect x="28" y="22" width="10" height="8" rx="1" />
      <rect x="42" y="22" width="10" height="8" rx="1" />
      <path d="M54 30 L66 30 L66 14 L60 14 Z" />
      <path d="M58 14 V8 H62 V14" />
      {/* Smoke */}
      <circle cx="60" cy="4" r="1.4" opacity="0.7" />
      <circle cx="65" cy="2" r="1" opacity="0.5" />
      {/* Wheels */}
      <circle cx="18" cy="48" r="4" />
      <circle cx="34" cy="48" r="4" />
      <circle cx="50" cy="48" r="4" />
      {/* Coupling */}
      <line x1="66" y1="40" x2="76" y2="40" />
      {/* Carriage 1 */}
      <rect x="76" y="20" width="56" height="24" rx="3" />
      <rect x="84" y="26" width="8" height="10" rx="1" />
      <rect x="96" y="26" width="8" height="10" rx="1" />
      <rect x="108" y="26" width="8" height="10" rx="1" />
      <rect x="120" y="26" width="8" height="10" rx="1" />
      <circle cx="88" cy="48" r="4" />
      <circle cx="120" cy="48" r="4" />
      <line x1="132" y1="40" x2="142" y2="40" />
      {/* Carriage 2 */}
      <rect x="142" y="20" width="56" height="24" rx="3" />
      <rect x="150" y="26" width="8" height="10" rx="1" />
      <rect x="162" y="26" width="8" height="10" rx="1" />
      <rect x="174" y="26" width="8" height="10" rx="1" />
      <rect x="186" y="26" width="8" height="10" rx="1" />
      <circle cx="154" cy="48" r="4" />
      <circle cx="186" cy="48" r="4" />
      <line x1="198" y1="40" x2="210" y2="40" />
      {/* Trailing dots */}
      <circle cx="212" cy="40" r="1" />
      <circle cx="216" cy="40" r="1" />
    </svg>
  );
}
