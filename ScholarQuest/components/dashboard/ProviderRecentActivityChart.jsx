'use client';

export default function ProviderRecentActivityChart({ applications = [] }) {
  // Calculate trends by day (last 7 days)
  const now = new Date();
  const days = [];
  const counts = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    days.push(d.toLocaleDateString('default', { weekday: 'short' }));

    const count = applications.filter(app => {
      const appDate = new Date(app.appliedAt || app.createdAt || new Date());
      return appDate.getDate() === d.getDate() && appDate.getMonth() === d.getMonth() && appDate.getFullYear() === d.getFullYear();
    }).length;
    counts.push(count);
  }

  const maxCount = Math.max(...counts, 1);
  const chartMax = maxCount > 5 ? Math.ceil(maxCount * 1.2) : 5; 
  
  // SVG Dimensions
  const width = 500;
  const height = 220;
  const paddingX = 20;
  const paddingY = 20;
  
  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  // Map data to SVG coordinates
  const points = counts.map((count, i) => {
    const x = paddingX + (i / (counts.length - 1)) * innerWidth;
    const y = paddingY + innerHeight - (count / chartMax) * innerHeight;
    return { x, y, count, label: days[i] };
  });

  // Create smooth bezier curve path
  const createPath = () => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const cp1X = curr.x + (next.x - curr.x) / 2;
      const cp1Y = curr.y;
      const cp2X = curr.x + (next.x - curr.x) / 2;
      const cp2Y = next.y;
      d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${next.x} ${next.y}`;
    }
    return d;
  };

  const linePath = createPath();
  const areaPath = linePath ? `${linePath} L ${points[points.length - 1].x} ${paddingY + innerHeight} L ${points[0].x} ${paddingY + innerHeight} Z` : '';

  return (
    <div className="clean-card p-8 rounded-2xl flex flex-col h-full min-h-[350px]">
      <h4 className="font-headline-md text-xl font-semibold mb-8 text-on-surface">Recent Activity</h4>
      
      <div className="flex-1 relative w-full flex flex-col justify-end">
        {/* Chart Area */}
        <div className="relative w-full h-[220px]">
          <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-tertiary)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--color-tertiary)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area */}
            <path d={areaPath} fill="url(#activityGradient)" />

            {/* Line */}
            <path d={linePath} fill="none" stroke="var(--color-tertiary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

            {/* Data Points */}
            {points.map((p, i) => (
              <g key={i} className="group">
                <circle cx={p.x} cy={p.y} r="5" fill="var(--color-surface)" stroke="var(--color-tertiary)" strokeWidth="3" />
                <circle cx={p.x} cy={p.y} r="14" fill="var(--color-tertiary)" fillOpacity="0.2" className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                <text x={p.x} y={p.y - 16} textAnchor="middle" fill="var(--color-on-surface)" fontSize="14" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.count}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* X Axis Labels */}
        <div className="flex justify-between w-full mt-4 px-[20px]">
          {points.map((p, i) => (
            <span key={i} className={`text-[12px] font-medium ${i === points.length - 1 ? 'text-tertiary font-bold' : 'text-on-surface-variant'}`} style={{ transform: 'translateX(-50%)' }}>
              {i === points.length - 1 ? 'Today' : p.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
