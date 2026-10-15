interface PokeballIconProps {
  className?: string;
}

export default function PokeballIcon({ className }: PokeballIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" />
      <path
        d="M4 32a28 28 0 0 1 56 0"
        stroke="currentColor"
        strokeWidth="4"
      />
      <line x1="4" y1="32" x2="22" y2="32" stroke="currentColor" strokeWidth="4" />
      <line x1="42" y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="4" />
      <circle cx="32" cy="32" r="9" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}
