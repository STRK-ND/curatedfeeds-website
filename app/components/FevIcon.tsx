interface FevIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function FevIcon({ width = 32, height = 32, className }: FevIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="fevGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b9d" />
          <stop offset="100%" stopColor="#c9b6df" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" stroke="url(#fevGradient)" strokeWidth="2" />
      <path d="M12 16a4 4 0 0 0 8 0" stroke="currentColor" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3" fill="url(#fevGradient)" />
    </svg>
  );
}