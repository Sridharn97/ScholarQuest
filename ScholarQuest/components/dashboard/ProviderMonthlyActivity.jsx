'use client';

export default function ProviderMonthlyActivity({ monthlyData = [] }) {
  const maxVal = Math.max(...monthlyData.map((d) => d.applications), 1);

  return (
    <div className="clean-card p-8 rounded-2xl">
      <h4 className="font-headline-md text-xl font-semibold mb-8">Monthly Activity vs. Funded Grants</h4>
      
      {monthlyData.length === 0 || maxVal === 1 && monthlyData.every(d => d.applications === 0) ? (
        <div className="flex flex-col items-center justify-center h-48 opacity-60">
           <span className="material-symbols-outlined text-4xl mb-2">bar_chart</span>
           <p className="text-sm">No activity recorded yet</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex items-center gap-3">
                <span className="font-label-sm text-label-sm text-on-surface-variant w-8">{d.month}</span>
                <div className="flex-1 space-y-1.5">
                  {/* Submissions Bar */}
                  <div className="h-2.5 bg-surface-container-highest/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-700 ease-out" style={{ width: `${(d.applications / maxVal) * 100}%` }} />
                  </div>
                  {/* Funded Bar */}
                  <div className="h-1.5 bg-surface-container-highest/20 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full transition-all duration-700 ease-out" style={{ width: `${(d.awarded / maxVal) * 100}%` }} />
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface w-10 text-right">{d.applications}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="font-label-sm text-label-sm text-on-surface-variant">Submissions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-full" />
              <span className="font-label-sm text-label-sm text-on-surface-variant">Funded</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
