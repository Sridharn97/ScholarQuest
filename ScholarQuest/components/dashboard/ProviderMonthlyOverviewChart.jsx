'use client';

export default function ProviderMonthlyOverviewChart({ applications = [] }) {
  // Calculate trends by month (last 6 months)
  const now = new Date();
  const months = [];
  const counts = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString('default', { month: 'short' }));

    const count = applications.filter(app => {
      const appDate = new Date(app.appliedAt || app.createdAt || new Date());
      return appDate.getMonth() === d.getMonth() && appDate.getFullYear() === d.getFullYear();
    }).length;
    counts.push(count);
  }

  const maxCount = Math.max(...counts, 1);
  const chartMax = maxCount > 5 ? Math.ceil(maxCount * 1.2) : 1.2; 
  
  // SVG Dimensions
  const width = 500;
  const height = 180;
  const paddingX = 20;
  const paddingY = 20;
  
  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  // Map data to SVG coordinates
  const points = counts.map((count, i) => {
    const x = paddingX + (i / (counts.length - 1)) * innerWidth;
    const y = paddingY + innerHeight - (count / chartMax) * innerHeight;
    return { x, y, count, label: months[i] };
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

  // Y-axis grid lines (5 steps)
  const ySteps = 5;
  const gridLines = Array.from({ length: ySteps + 1 }).map((_, i) => {
    const y = paddingY + innerHeight - (i / ySteps) * innerHeight;
    const val = (i / ySteps) * chartMax;
    return { y, val: val % 1 === 0 ? val : val.toFixed(1) };
  });

  // Calculate percentage increase
  const currentMonth = counts[5];
  const prevMonth = counts[4];
  let increase = 0;
  let increaseText = "No change in applications";
  if (prevMonth === 0 && currentMonth > 0) {
    increase = 100;
    increaseText = `+100% increase in applications this month compared to last month`;
  } else if (prevMonth > 0) {
    increase = Math.round(((currentMonth - prevMonth) / prevMonth) * 100);
    if (increase > 0) {
      increaseText = `+${increase}% increase in applications this month compared to last month`;
    } else if (increase < 0) {
      increaseText = `${increase}% decrease in applications this month compared to last month`;
    }
  }

  return (
    <div className="clean-card p-8 rounded-2xl flex flex-col h-full">
      <h4 className="font-headline-md text-lg font-semibold mb-10 text-on-surface">Monthly Applications Overview</h4>
      
      <div className="flex-1 relative w-full flex my-auto">
        {/* Y Axis Labels */}
        <div className="flex flex-col justify-between h-[180px] pr-4 py-[20px] text-[11px] font-medium text-on-surface-variant">
          {gridLines.reverse().map((g, i) => (
            <span key={i} className="leading-none">{g.val}</span>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative w-full">
          <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {gridLines.map((g, i) => (
              <line key={i} x1="0" y1={g.y} x2={width} y2={g.y} stroke="var(--color-outline-variant)" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />
            ))}

            {/* Area */}
            <path d={areaPath} fill="url(#areaGradient)" />

            {/* Line */}
            <path d={linePath} fill="none" stroke="var(--color-primary)" strokeWidth="3" />

            {/* Data Points */}
            {points.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="4" fill="var(--color-primary)" />
                <circle cx={p.x} cy={p.y} r="10" fill="var(--color-primary)" fillOpacity="0.2" className="opacity-0 hover:opacity-100 transition-opacity cursor-pointer" />
                <text x={p.x} y={p.y - 12} textAnchor="middle" fill="var(--color-on-surface)" fontSize="13" fontWeight="bold">
                  {p.count}
                </text>
              </g>
            ))}
          </svg>

          {/* X Axis Labels */}
          <div className="absolute left-0 right-0 -bottom-6 flex justify-between px-[20px]">
            {points.map((p, i) => (
              <span key={i} className="text-[12px] font-medium text-on-surface-variant" style={{ transform: 'translateX(-50%)' }}>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
