export function TrainGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Tracks */}
      <line x1="0" y1="60" x2="280" y2="60" strokeDasharray="3 4" opacity="0.55" />
      <line x1="0" y1="64" x2="280" y2="64" strokeDasharray="2 5" opacity="0.3" />

      {/* ── Locomotive ──────────────────────────────── */}
      {/* Cab (rear, taller) */}
      <rect x="14" y="14" width="22" height="38" rx="2" />
      <rect x="18" y="20" width="14" height="10" rx="1" />
      {/* Boiler / main body */}
      <rect x="36" y="24" width="34" height="28" rx="3" />
      {/* Smokestack */}
      <rect x="52" y="10" width="6" height="14" />
      <rect x="50" y="10" width="10" height="2" />
      {/* Smoke puffs */}
      <circle cx="55" cy="6" r="2" opacity="0.7" />
      <circle cx="61" cy="3" r="1.4" opacity="0.55" />
      <circle cx="58" cy="1" r="1" opacity="0.4" />
      {/* Front nose / cowcatcher */}
      <path d="M70 24 L76 30 L76 48 L70 52" />
      {/* Headlight */}
      <circle cx="73" cy="39" r="1.6" />
      {/* Cab→boiler seam (subtle) */}
      <line x1="36" y1="34" x2="36" y2="48" opacity="0.4" />
      {/* Boiler band */}
      <line x1="42" y1="24" x2="42" y2="52" opacity="0.35" />
      <line x1="58" y1="24" x2="58" y2="52" opacity="0.35" />
      {/* Locomotive wheels */}
      <circle cx="22" cy="55" r="4" />
      <circle cx="44" cy="55" r="5" />
      <circle cx="62" cy="55" r="5" />

      {/* Coupling */}
      <line x1="76" y1="46" x2="86" y2="46" />

      {/* ── Carriage 1 ──────────────────────────────── */}
      <rect x="86" y="24" width="60" height="28" rx="3" />
      {/* roof line */}
      <line x1="86" y1="29" x2="146" y2="29" opacity="0.5" />
      <rect x="92" y="33" width="8" height="11" rx="1" />
      <rect x="104" y="33" width="8" height="11" rx="1" />
      <rect x="116" y="33" width="8" height="11" rx="1" />
      <rect x="128" y="33" width="8" height="11" rx="1" />
      <circle cx="96" cy="55" r="4" />
      <circle cx="136" cy="55" r="4" />

      {/* Coupling */}
      <line x1="146" y1="46" x2="156" y2="46" />

      {/* ── Carriage 2 ──────────────────────────────── */}
      <rect x="156" y="24" width="60" height="28" rx="3" />
      <line x1="156" y1="29" x2="216" y2="29" opacity="0.5" />
      <rect x="162" y="33" width="8" height="11" rx="1" />
      <rect x="174" y="33" width="8" height="11" rx="1" />
      <rect x="186" y="33" width="8" height="11" rx="1" />
      <rect x="198" y="33" width="8" height="11" rx="1" />
      <circle cx="166" cy="55" r="4" />
      <circle cx="206" cy="55" r="4" />

      {/* Coupling */}
      <line x1="216" y1="46" x2="226" y2="46" />

      {/* ── Carriage 3 (short caboose) ───────────────── */}
      <rect x="226" y="24" width="40" height="28" rx="3" />
      <line x1="226" y1="29" x2="266" y2="29" opacity="0.5" />
      <rect x="232" y="33" width="8" height="11" rx="1" />
      <rect x="244" y="33" width="8" height="11" rx="1" />
      <circle cx="234" cy="55" r="4" />
      <circle cx="258" cy="55" r="4" />

      {/* Trailing dots */}
      <circle cx="271" cy="46" r="0.9" opacity="0.7" />
      <circle cx="276" cy="46" r="0.7" opacity="0.5" />
    </svg>
  );
}
