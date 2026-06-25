'use client';

export default function StudentAnalyticsOverview() {
  return (
    <div className="h-44 relative mt-4">
      <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
        <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" strokeWidth="1" className="text-outline-variant/20" />
        <line x1="0" y1="70" x2="500" y2="70" stroke="currentColor" strokeWidth="1" className="text-outline-variant/20" />
        <line x1="0" y1="110" x2="500" y2="110" stroke="currentColor" strokeWidth="1" className="text-outline-variant/20" />
        <line x1="0" y1="150" x2="500" y2="150" stroke="currentColor" strokeWidth="1" className="text-outline-variant/20" />

        <defs>
          <linearGradient id="blueArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M 0 130 C 100 110, 150 80, 250 70 C 350 60, 400 110, 500 40 L 500 150 L 0 150 Z" fill="url(#blueArea)" />
        <path d="M 0 130 C 100 110, 150 80, 250 70 C 350 60, 400 110, 500 40" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />

        <circle cx="250" cy="70" r="3" fill="var(--color-primary)" />
        <circle cx="125" cy="100" r="3" fill="var(--color-primary)" />
      </svg>
    </div>
  );
}
