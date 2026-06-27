export function convertToPercentage(gpa, gradingSystem, scale) {
  if (gpa === undefined || gpa === null || gpa === '') return null;
  const val = parseFloat(gpa);
  if (isNaN(val)) return null;

  if (gradingSystem === 'Percentage') {
    return parseFloat(val.toFixed(2));
  }

  const numericScale = parseFloat(scale || '10');
  if (isNaN(numericScale) || numericScale <= 0) return null;

  if (numericScale === 10) {
    // Standard CBSE / AICTE conversion for 10-point scale: CGPA * 9.5
    return parseFloat((val * 9.5).toFixed(2));
  } else {
    // Linear conversion for other scales (e.g. 4, 5)
    return parseFloat(((val / numericScale) * 100).toFixed(2));
  }
}

export function formatGpa(gpa, gradingSystem, scale, percentage) {
  if (gpa === undefined || gpa === null || gpa === '') return '—';
  
  if (gradingSystem === 'Percentage') {
    return `${gpa}%`;
  }

  const scaleStr = scale ? `/${scale}` : '';
  const pctStr = percentage !== undefined && percentage !== null ? ` (${percentage}% equivalent)` : '';
  return `${gpa}${scaleStr}${pctStr}`;
}
