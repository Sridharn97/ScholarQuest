'use client';

export default function StudentAnalyticsOverview({ data }) {
  const dataPoints = data && data.length > 0 ? data : [0, 0, 0, 0, 0, 0, 0];
  let maxVal = Math.max(...dataPoints);
  if (maxVal === 0) maxVal = 1; // Prevent division by zero
  
  const width = 500;
  const minY = 130;
  const maxY = 40;
  const heightRange = minY - maxY;

  const points = dataPoints.map((val, i) => {
    const x = (i / (dataPoints.length - 1)) * width;
    const y = minY - (val / maxVal) * heightRange;
    return [x, y];
  });

  const createSmoothPath = (pts) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0][0]},${pts[0][1]}`;
    
    let path = `M ${pts[0][0]},${pts[0][1]}`;
    
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];
      
      const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
      const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
      
      const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
      const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
      
      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
    }
    return path;
  };

  const pathStr = createSmoothPath(points);
  const areaStr = points.length > 0 ? `${pathStr} L ${width} 150 L 0 150 Z` : '';

  return (
    <div className="h-44 relative mt-4">
      <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
        <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" strokeWidth="1" className="text-outline-variant/20" />
        <line x1="0" y1="70" x2="500" y2="70" stroke="currentColor" strokeWidth="1" className="text-outline-variant/20" />
        <line x1="0" y1="110" x2="500" y2="110" stroke="currentColor" strokeWidth="1" className="text-outline-variant/20" />
        <line x1="0" y1="150" x2="500" y2="150" stroke="currentColor" strokeWidth="1" className="text-outline-variant/20" />

        <defs>
          <linearGradient id="blueArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {pathStr && (
          <>
            <path d={areaStr} fill="url(#blueArea)" />
            <path d={pathStr} fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
            
            {points.map((pt, idx) => (
              <circle key={idx} cx={pt[0]} cy={pt[1]} r="3" fill="var(--color-primary)" />
            ))}
          </>
        )}
      </svg>
    </div>
  );
}
