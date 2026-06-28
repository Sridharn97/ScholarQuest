'use client';

export default function ProviderTopPrograms({ scholarships = [], applications = [] }) {
  // Calculate applications per scholarship
  const topScholarships = scholarships.map(s => {
    const sApps = applications.filter(a => a.scholarshipId === s.id || a.scholarship === s.name);
    return {
      name: s.name || 'Unnamed',
      applicants: sApps.length,
    };
  }).sort((a, b) => b.applicants - a.applicants).slice(0, 4);

  const maxApps = Math.max(...topScholarships.map(s => s.applicants), 1);

  return (
    <div className="clean-card p-8 rounded-2xl flex flex-col h-full">
      <h4 className="font-headline-md text-xl font-semibold mb-6">Most Popular Programs</h4>
      
      {topScholarships.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 opacity-60">
           <span className="material-symbols-outlined text-4xl mb-2">insert_chart</span>
           <p className="text-sm">No programs data available</p>
        </div>
      ) : (
        <div className="flex-1 w-full flex items-end justify-between px-2 pb-2 pt-4">
          {topScholarships.map((s, i) => {
            const heightPct = s.applicants === 0 ? '4px' : `${(s.applicants / maxApps) * 100}%`;
            const isMax = s.applicants === maxApps && maxApps > 0;
            
            return (
              <div key={s.name + i} className="flex flex-col items-center gap-3 group flex-1">
                <div className="relative w-8 h-40 bg-surface-container-highest/20 rounded-full flex items-end overflow-hidden group-hover:bg-surface-container-highest/30 transition-colors">
                  <div
                    className={`w-full rounded-full transition-all duration-700 ease-out ${isMax ? 'bg-primary' : 'bg-outline-variant/50 group-hover:bg-primary/70'}`}
                    style={{ height: heightPct }}
                    title={`${s.applicants} applications`}
                  />
                </div>
                <span className={`text-xs font-label-md text-center max-w-[80px] truncate ${isMax ? 'font-bold text-primary' : 'text-on-surface-variant'}`} title={s.name}>
                  {s.name.split(' ')[0]} {/* Display only the first word to fit */}
                </span>
                <span className="text-xs font-bold text-on-surface">{s.applicants}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
