type FlowerProps = {
  size?: number;
  rotate?: number;
  petal?: string;
  outline?: string;
  center?: string;
  opacity?: number;
  className?: string;
};

export function Flower({
  size = 48,
  rotate = 0,
  petal = "#fce7f3",
  outline = "#f9a8d4",
  center = "#f59e0b",
  opacity = 1,
  className,
}: FlowerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ transform: `rotate(${rotate}deg)`, opacity }}
      className={className}
      aria-hidden
    >
      <g fill={petal} stroke={outline} strokeWidth="1.2">
        <circle cx="30" cy="13" r="8.5" />
        <circle cx="47" cy="23" r="8.5" />
        <circle cx="47" cy="40" r="8.5" />
        <circle cx="30" cy="50" r="8.5" />
        <circle cx="13" cy="40" r="8.5" />
        <circle cx="13" cy="23" r="8.5" />
      </g>
      <circle cx="30" cy="32" r="6.5" fill={center} stroke="#d97706" strokeWidth="0.8" />
      <circle cx="28" cy="30" r="1.5" fill="#fef3c7" opacity="0.85" />
    </svg>
  );
}

type LeafProps = {
  size?: number;
  rotate?: number;
  color?: string;
  outline?: string;
  opacity?: number;
};

export function Leaf({
  size = 36,
  rotate = 0,
  color = "#bbf7d0",
  outline = "#86efac",
  opacity = 1,
}: LeafProps) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 40 56"
      style={{ transform: `rotate(${rotate}deg)`, opacity }}
      aria-hidden
    >
      <path
        d="M20 4 Q 36 18 36 30 Q 36 46 20 52 Q 4 46 4 30 Q 4 18 20 4 Z"
        fill={color}
        stroke={outline}
        strokeWidth="1.2"
      />
      <path
        d="M20 6 L 20 50"
        stroke="#22c55e"
        strokeWidth="0.8"
        opacity="0.65"
      />
      <path
        d="M20 18 Q 28 20 32 24"
        stroke="#22c55e"
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M20 30 Q 28 32 32 36"
        stroke="#22c55e"
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M20 18 Q 12 20 8 24"
        stroke="#22c55e"
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M20 30 Q 12 32 8 36"
        stroke="#22c55e"
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

type SmallSproutProps = { size?: number; rotate?: number; color?: string };

export function Sprout({ size = 28, rotate = 0, color = "#86efac" }: SmallSproutProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <path
        d="M20 36 L 20 18"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse
        cx="14"
        cy="20"
        rx="6"
        ry="4"
        transform="rotate(-25 14 20)"
        fill={color}
        stroke="#22c55e"
        strokeWidth="1"
      />
      <ellipse
        cx="26"
        cy="20"
        rx="6"
        ry="4"
        transform="rotate(25 26 20)"
        fill={color}
        stroke="#22c55e"
        strokeWidth="1"
      />
    </svg>
  );
}
