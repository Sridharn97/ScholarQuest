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

  // Map counts to height classes (h-0 to h-64 relative scale)
  const getHeights = (count) => {
    const percent = count / maxCount;
    if (percent === 0) return 'h-2'; // min height
    if (percent < 0.2) return 'h-12';
    if (percent < 0.4) return 'h-24';
    if (percent < 0.6) return 'h-36';
    if (percent < 0.8) return 'h-48';
    return 'h-64';
  };

  return (
    <div className="clean-card p-8 rounded-2xl">
      <div className="flex justify-between items-center mb-8">
        <h4 className="font-headline-md text-xl font-semibold">Application Trends</h4>
      </div>
      <div className="h-64 w-full flex items-end justify-between px-2">
        {months.map((label, i) => (
          <div key={label + i} className="flex flex-col items-center gap-2 group w-8">
            <div
              className={`w-full bg-secondary/20 rounded-t-lg transition-all group-hover:bg-secondary ${getHeights(counts[i])} ${counts[i] === maxCount && maxCount > 0 ? 'bg-secondary' : ''}`}
              title={`${counts[i]} applications`}
            />
            <span className={`text-label-sm ${counts[i] === maxCount && maxCount > 0 ? 'font-bold text-secondary' : ''}`}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
