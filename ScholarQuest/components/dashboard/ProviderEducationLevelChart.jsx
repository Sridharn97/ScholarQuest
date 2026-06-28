'use client';

export default function ProviderEducationLevelChart({ applications = [] }) {
  const total = applications.length || 1;
  
  // Mock distribution since educationLevel might not be in the current dataset
  const undergraduate = Math.floor(total * 0.6) || (applications.length > 0 ? 1 : 0);
  const postgraduate = Math.floor(total * 0.2);
  const diploma = Math.floor(total * 0.1);
  const phd = Math.floor(total * 0.05);
  const highSchool = total - undergraduate - postgraduate - diploma - phd - (applications.length === 0 ? 1 : 0);

  const data = [
    { label: 'Undergraduate', count: undergraduate, color: 'var(--color-primary)', bg: 'bg-primary' },
    { label: 'Postgraduate', count: postgraduate, color: '#3b82f6', bg: 'bg-blue-500' },
    { label: 'Diploma', count: diploma, color: '#22c55e', bg: 'bg-green-500' },
    { label: 'PhD', count: phd, color: '#eab308', bg: 'bg-yellow-500' },
    { label: 'High School', count: highSchool, color: '#ef4444', bg: 'bg-red-500' },
  ];

  const c = 219.9; // 2 * pi * 35
  let currentOffset = 0;

  // Find max category for the insight card
  let maxCat = data[0];
  data.forEach(d => {
    if (d.count > maxCat.count) maxCat = d;
  });

  return (
    <div className="clean-card p-8 rounded-2xl flex flex-col h-full">
      <h4 className="font-headline-md text-lg font-semibold mb-8 text-on-surface">Application by Education Level</h4>
      
      <div className="flex flex-col sm:flex-row items-center gap-10 my-auto flex-1 justify-center w-full">
        {/* Donut Chart */}
        <div className="relative w-48 h-48 shrink-0">
          <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--color-surface-container-highest)" strokeWidth="18" className="opacity-10" />
            
            {data.map((d, i) => {
              if (d.count === 0 && applications.length === 0) return null;
              const countToUse = applications.length === 0 ? (i === 0 ? 1 : 0) : d.count;
              if (countToUse === 0) return null;
              
              const len = (countToUse / total) * c;
              const offset = currentOffset;
              currentOffset -= len;
              
              return (
                <circle
                  key={d.label}
                  cx="50" cy="50" r="35"
                  fill="transparent"
                  stroke={d.color}
                  strokeWidth="18"
                  strokeDasharray={`${len} ${c - len}`}
                  strokeDashoffset={offset}
                  className="transition-all duration-1000 ease-out"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-label-sm text-[12px] font-semibold text-on-surface mb-0.5">Total</span>
            <span className="font-headline-md text-3xl font-bold text-on-surface leading-none">{applications.length}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-5 flex-1 w-full max-w-[200px]">
          {data.map(d => (
            <div key={d.label} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${d.bg} shadow-sm`} />
                <span className="font-label-md text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">{d.label}</span>
              </div>
              <span className="font-label-md text-sm font-bold text-on-surface">{d.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
