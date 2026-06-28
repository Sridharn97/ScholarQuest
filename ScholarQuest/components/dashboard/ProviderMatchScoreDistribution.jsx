'use client';

export default function ProviderMatchScoreDistribution({ applications = [] }) {
  // Buckets for match scores
  const buckets = [
    { label: '< 50%', count: 0 },
    { label: '50-70%', count: 0 },
    { label: '71-90%', count: 0 },
    { label: '> 90%', count: 0 },
  ];

  applications.forEach((app) => {
    const score = app.score || 0;
    if (score < 50) buckets[0].count++;
    else if (score <= 70) buckets[1].count++;
    else if (score <= 90) buckets[2].count++;
    else buckets[3].count++;
  });

  const maxCount = Math.max(...buckets.map(b => b.count), 1);

  return (
    <div className="clean-card p-8 rounded-2xl flex flex-col h-full">
      <h4 className="font-headline-md text-xl font-semibold mb-6">Match Score Distribution</h4>
      <div className="flex-1 w-full flex items-end justify-between px-2 pb-2 pt-4">
        {buckets.map((bucket, i) => {
          const heightPct = bucket.count === 0 ? '4px' : `${(bucket.count / maxCount) * 100}%`;
          const isMax = bucket.count === maxCount && maxCount > 0;
          
          return (
            <div key={bucket.label} className="flex flex-col items-center gap-3 group flex-1">
              <div className="relative w-8 h-40 bg-surface-container-highest/10 rounded-full flex items-end overflow-hidden group-hover:bg-surface-container-highest/20 transition-colors">
                <div
                  className={`w-full rounded-full transition-all duration-700 ease-out ${isMax ? 'bg-secondary' : 'bg-secondary/40 group-hover:bg-secondary/70'}`}
                  style={{ height: heightPct }}
                  title={`${bucket.count} applications`}
                />
              </div>
              <span className={`text-xs font-label-md ${isMax ? 'font-bold text-secondary' : 'text-on-surface-variant'}`}>
                {bucket.label}
              </span>
              <span className="text-xs font-bold text-on-surface">{bucket.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
