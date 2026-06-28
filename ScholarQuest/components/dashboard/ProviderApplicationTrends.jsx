'use client';

export default function ProviderApplicationTrends({ applications = [] }) {
  // If no applications, show empty state
  if (!applications || applications.length === 0) {
    return (
      <div className="clean-card p-8 rounded-2xl flex flex-col items-center justify-center h-full min-h-[350px]">
        <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-outline text-3xl">bar_chart</span>
        </div>
        <h4 className="font-headline-md text-xl font-semibold mb-2">Application Trends</h4>
        <p className="text-on-surface-variant text-center max-w-[250px]">
          No application data available yet. Trends will appear here once students start applying.
        </p>
      </div>
    );
  }

  // Calculate trends by month (last 6 months)
  const now = new Date();
  const months = [];
  const counts = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString('default', { month: 'short' }));

    // Count applications in this month
    const count = applications.filter(app => {
      const appDate = new Date(app.appliedAt || app.createdAt || new Date());
      return appDate.getMonth() === d.getMonth() && appDate.getFullYear() === d.getFullYear();
    }).length;
    counts.push(count);
  }

  const maxCount = Math.max(...counts, 1); // Avoid division by zero

  return (
    <div className="clean-card p-8 rounded-2xl flex flex-col h-full">
      <h4 className="font-headline-md text-xl font-semibold mb-8">Application Trends</h4>
      <div className="flex-1 w-full flex items-end justify-between px-2 pb-2 pt-6 min-h-[220px]">
        {months.map((label, i) => {
          const heightPct = counts[i] === 0 ? '4px' : `${(counts[i] / maxCount) * 100}%`;
          const isMax = counts[i] === maxCount && maxCount > 0;
          
          return (
            <div key={label + i} className="flex flex-col items-center gap-4 group flex-1">
              <div className="relative w-8 h-48 bg-surface-container-highest/20 rounded-full flex items-end overflow-hidden group-hover:bg-surface-container-highest/30 transition-colors">
                <div
                  className={`w-full rounded-full transition-all duration-700 ease-out ${isMax ? 'bg-primary' : 'bg-outline-variant/50 group-hover:bg-primary/70'}`}
                  style={{ height: heightPct }}
                  title={`${counts[i]} applications`}
                />
              </div>
              <span className={`text-label-sm ${isMax ? 'font-bold text-primary' : 'text-on-surface-variant font-medium'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
