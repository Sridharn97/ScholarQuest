'use client';

export default function ProviderCategoryBreakdown({ categories = [], totalCount = 0 }) {
  const circumference = 301.59; // 2 * Math.PI * 48
  let currentOffset = 0;

  return (
    <div className="clean-card p-8 rounded-2xl">
      <h4 className="font-headline-md text-xl font-semibold mb-8">Programs by Category</h4>
      
      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 opacity-60">
          <span className="material-symbols-outlined text-4xl mb-2">donut_large</span>
          <p className="text-sm">No data available</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 mb-6">
            <svg className="w-40 h-40 transform -rotate-90 drop-shadow-sm" viewBox="0 0 120 120">
              {/* Background */}
              <circle cx="60" cy="60" r="48" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-surface-container-highest/20" />
              
              {/* Dynamic Slices */}
              {categories.map((c, i) => {
                const length = (c.count / (totalCount || 1)) * circumference;
                const offset = currentOffset;
                currentOffset -= length; // subtract to move counter-clockwise in SVG
                
                return (
                  <circle 
                    key={c.label}
                    cx="60" cy="60" r="48" 
                    fill="transparent" 
                    stroke={c.hex} 
                    strokeWidth="12" 
                    strokeDasharray={`${length} ${circumference}`} 
                    strokeDashoffset={offset} 
                    strokeLinecap="round" 
                    className="transition-all duration-1000 ease-out" 
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline-md text-2xl text-on-surface">{totalCount}</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mt-0.5">Total</span>
            </div>
          </div>
          
          <div className="w-full grid grid-cols-2 gap-y-3 gap-x-2">
            {categories.map((c) => (
              <div key={c.label} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${c.colorClass} flex-shrink-0`} />
                <span className="font-body-sm text-xs text-on-surface-variant truncate">{c.label}</span>
                <span className="font-label-sm text-xs font-bold ml-auto">{c.pctString}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
