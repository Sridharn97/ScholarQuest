'use client';

export default function ProviderTopScholarshipsChart({ applications = [], scholarships = [] }) {
  if (!scholarships || scholarships.length === 0) {
    return (
      <div className="clean-card p-8 rounded-2xl flex flex-col items-center justify-center h-full min-h-[350px]">
        <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-outline text-3xl">bar_chart</span>
        </div>
        <h4 className="font-headline-md text-xl font-semibold mb-2">Top Scholarships</h4>
        <p className="text-on-surface-variant text-center max-w-[250px]">
          Post your first scholarship to start tracking top performers.
        </p>
      </div>
    );
  }

  // Count applications per scholarship
  const appCounts = {};
  applications.forEach(app => {
    if (app.scholarshipId) {
      appCounts[app.scholarshipId] = (appCounts[app.scholarshipId] || 0) + 1;
    }
  });

  // Map to array and sort
  let sortedScholarships = scholarships
    .map(s => ({
      id: s.id,
      name: s.name || 'Unnamed Scholarship',
      count: appCounts[s.id] || 0
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // top 5

  // If we have fewer than 5, pad with empty for visual consistency in the bar chart
  while (sortedScholarships.length > 0 && sortedScholarships.length < 5) {
    sortedScholarships.push({ id: `empty-${sortedScholarships.length}`, name: '-', count: 0, isEmpty: true });
  }

  const maxCount = sortedScholarships.length > 0 ? Math.max(...sortedScholarships.map(s => s.count), 1) : 1;

  if (sortedScholarships.reduce((acc, curr) => acc + curr.count, 0) === 0) {
    return (
      <div className="clean-card p-8 rounded-2xl flex flex-col items-center justify-center h-full min-h-[350px]">
        <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-outline text-3xl">bar_chart</span>
        </div>
        <h4 className="font-headline-md text-xl font-semibold mb-2">Top Scholarships</h4>
        <p className="text-on-surface-variant text-center max-w-[250px]">
          No applications yet. When students apply, your top scholarships will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="clean-card p-8 rounded-2xl flex flex-col h-full min-h-[350px]">
      <h4 className="font-headline-md text-xl font-semibold mb-8 text-on-surface">Top Scholarships</h4>
      <div className="flex-1 flex items-end justify-between px-2 gap-4 h-48">
        {sortedScholarships.map((schol, i) => {
          const heightPct = schol.count === 0 ? '4px' : `${(schol.count / maxCount) * 100}%`;
          const isMax = schol.count === maxCount && maxCount > 0;
          
          return (
            <div key={schol.id + i} className="flex flex-col items-center group flex-1 h-full">
              <div className="h-6 flex items-end mb-2">
                <span className={`text-sm sm:text-base font-bold ${isMax ? 'text-primary' : 'text-on-surface-variant'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  {schol.isEmpty ? '' : schol.count}
                </span>
              </div>
              <div className="flex-1 w-full flex items-end justify-center">
                <div 
                  className={`w-full max-w-[48px] rounded-t-xl transition-all duration-700 ease-out flex items-end justify-center pb-2 ${isMax ? 'bg-primary shadow-lg shadow-primary/20' : schol.isEmpty ? 'bg-surface-container-lowest' : 'bg-surface-container-highest/50 group-hover:bg-primary/40'}`}
                  style={{ height: heightPct, minHeight: schol.count > 0 ? '32px' : '4px' }}
                >
                </div>
              </div>
              <div className="h-10 mt-3 flex items-start justify-center px-1 w-full overflow-hidden">
                <span 
                  className={`text-xs sm:text-sm font-semibold text-center line-clamp-2 leading-tight ${isMax ? 'text-primary' : 'text-on-surface-variant'}`}
                  title={schol.name}
                >
                  {schol.name === '-' ? '' : schol.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
