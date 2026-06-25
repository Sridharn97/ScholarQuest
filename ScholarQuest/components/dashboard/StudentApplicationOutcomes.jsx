'use client';

export default function StudentApplicationOutcomes() {
  return (
    <div className="flex items-center justify-between mt-auto">
      <div className="relative w-36 h-36 shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--color-surface-container-highest)" strokeWidth="16" />
          <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--color-error)" strokeWidth="16" strokeDasharray="33 186.9" strokeDashoffset="0" className="transition-all duration-1000" />
          <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--color-secondary)" strokeWidth="16" strokeDasharray="132 87.9" strokeDashoffset="-33" className="transition-all duration-1000 delay-300" />
          <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--color-primary)" strokeWidth="16" strokeDasharray="55 164.9" strokeDashoffset="-165" className="transition-all duration-1000 delay-500" />
        </svg>
      </div>
      
      <div className="flex flex-col gap-4 pl-6 border-l border-outline-variant/20 flex-1 ml-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs font-bold text-on-surface">Accepted</span>
          </div>
          <span className="text-xs font-bold text-on-surface-variant">25%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-xs font-bold text-on-surface">In Review</span>
          </div>
          <span className="text-xs font-bold text-on-surface-variant">60%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <span className="text-xs font-bold text-on-surface">Rejected</span>
          </div>
          <span className="text-xs font-bold text-on-surface-variant">15%</span>
        </div>
      </div>
    </div>
  );
}
