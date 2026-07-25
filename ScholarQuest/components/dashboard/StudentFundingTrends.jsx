'use client';

export default function StudentFundingTrends({ data, labels }) {
  const dataPoints = data && data.length > 0 ? data : [0, 0, 0, 0, 0, 0];
  const chartLabels = labels && labels.length > 0 ? labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  let maxVal = Math.max(...dataPoints);
  if (maxVal === 0) maxVal = 1;
  const minVal = Math.min(...dataPoints, 0);
  
  const width = 500;
  const minY = 100;
  const maxY = 30; 
  const heightRange = minY - maxY;

  const points = dataPoints.map((val, i) => {
    const x = (i / (dataPoints.length - 1)) * width;
    const y = minY - ((val - minVal) / (maxVal - minVal)) * heightRange;
    return [x, y];
  });

  const pathStr = points.reduce((acc, point, i) => {
    return acc + (i === 0 ? `M ${point[0]} ${point[1]}` : ` L ${point[0]} ${point[1]}`);
  }, '');

  return (
    <div className="w-full mt-auto">
      <div className="h-[120px] relative px-4 mt-6">
        <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
          <path d={pathStr} fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" />
          {points.map((pt, idx) => (
            <circle key={idx} cx={pt[0]} cy={pt[1]} r="4" fill="var(--color-secondary)" />
          ))}
        </svg>
      </div>
      <div className="flex justify-between text-xs text-on-surface-variant font-bold mt-4 px-4">
        {chartLabels.map((label, idx) => (
          <span key={idx} className={`text-center w-8 ${idx === 0 ? '-ml-4' : ''} ${idx === chartLabels.length - 1 ? '-mr-4' : ''}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
