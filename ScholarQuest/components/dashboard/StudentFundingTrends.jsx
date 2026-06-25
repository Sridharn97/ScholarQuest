'use client';

export default function StudentFundingTrends() {
  return (
    <div className="w-full mt-auto">
      <div className="h-[120px] relative px-4 mt-6">
        <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
          <path d="M 0 100 L 100 80 L 200 90 L 300 50 L 400 65 L 500 30" fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" />
          <circle cx="0" cy="100" r="4" fill="var(--color-secondary)" />
          <circle cx="100" cy="80" r="4" fill="var(--color-secondary)" />
          <circle cx="200" cy="90" r="4" fill="var(--color-secondary)" />
          <circle cx="300" cy="50" r="4" fill="var(--color-secondary)" />
          <circle cx="400" cy="65" r="4" fill="var(--color-secondary)" />
          <circle cx="500" cy="30" r="4" fill="var(--color-secondary)" />
        </svg>
      </div>
      <div className="flex justify-between text-xs text-on-surface-variant font-bold mt-4 px-4">
        <span className="text-center w-8 -ml-4">Jan</span>
        <span className="text-center w-8">Feb</span>
        <span className="text-center w-8">Mar</span>
        <span className="text-center w-8">Apr</span>
        <span className="text-center w-8">May</span>
        <span className="text-center w-8 -mr-4">Jun</span>
      </div>
    </div>
  );
}
