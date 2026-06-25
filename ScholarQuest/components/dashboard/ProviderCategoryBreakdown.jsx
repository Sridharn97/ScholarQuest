'use client';

export default function ProviderCategoryBreakdown() {
  const categories = [
    { label: 'STEM Program', pct: '52%', color: 'bg-[#004ac6]' },
    { label: 'Leadership', pct: '28%', color: 'bg-[#712ae2]' },
    { label: 'Other', pct: '20%', color: 'bg-[#c3c6d7]' },
  ];

  return (
    <div className="clean-card p-8 rounded-2xl">
      <h4 className="font-headline-md text-xl font-semibold mb-8">Applications by Category</h4>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-40 h-40 mb-6">
          <svg className="w-40 h-40 transform -rotate-90 drop-shadow-sm" viewBox="0 0 120 120">
            {/* Background */}
            <circle cx="60" cy="60" r="48" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-surface-container-highest/20" />
            {/* STEM 52% (52% of 301.59 = 156.8) */}
            <circle cx="60" cy="60" r="48" fill="transparent" stroke="#004ac6" strokeWidth="12" strokeDasharray="156.8 301.6" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
            {/* Leadership 28% (28% of 301.59 = 84.4) */}
            <circle cx="60" cy="60" r="48" fill="transparent" stroke="#712ae2" strokeWidth="12" strokeDasharray="84.4 301.6" strokeDashoffset="-156.8" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
            {/* Other 20% (20% of 301.59 = 60.3) */}
            <circle cx="60" cy="60" r="48" fill="transparent" stroke="#c3c6d7" strokeWidth="12" strokeDasharray="60.3 301.6" strokeDashoffset="-241.2" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-headline-md text-2xl text-on-surface">528</span>
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mt-0.5">Total</span>
          </div>
        </div>
        
        <div className="w-full grid grid-cols-2 gap-y-3 gap-x-2">
          {categories.map((c) => (
            <div key={c.label} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${c.color} flex-shrink-0`} />
              <span className="font-body-sm text-xs text-on-surface-variant truncate">{c.label}</span>
              <span className="font-label-sm text-xs font-bold ml-auto">{c.pct}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
