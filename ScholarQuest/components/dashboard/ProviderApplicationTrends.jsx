'use client';

const DEFAULT_HEIGHTS = ['h-32', 'h-48', 'h-56', 'h-40', 'h-52', 'h-36', 'h-60'];
const DEFAULT_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

export default function ProviderApplicationTrends({ 
  barHeights = DEFAULT_HEIGHTS, 
  barLabels = DEFAULT_LABELS 
}) {
  return (
    <div className="clean-card p-8 rounded-2xl">
      <div className="flex justify-between items-center mb-8">
        <h4 className="font-headline-md text-xl font-semibold">Application Trends</h4>
      </div>
      <div className="h-64 w-full flex items-end justify-between px-2">
        {barLabels.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-2 group w-8">
            <div className={`w-full bg-secondary/20 rounded-t-lg transition-all group-hover:bg-secondary ${barHeights[i]} ${label === 'Mar' ? 'bg-secondary' : ''}`} />
            <span className={`text-label-sm ${label === 'Mar' ? 'font-bold text-secondary' : ''}`}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
