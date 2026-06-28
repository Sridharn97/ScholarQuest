'use client';
import Link from 'next/link';

export default function ProviderStatusBreakdown({ applications = [] }) {
  const approved = applications.filter(a => a.status === 'Approved').length;
  const review = applications.filter(a => a.status === 'Under Review').length;
  const pending = applications.filter(a => a.status === 'Pending').length;
  const rejected = applications.filter(a => a.status === 'Rejected').length;
  const total = applications.length || 1;
  const c = 219.9;
  const appLen = (approved / total) * c;
  const revLen = (review / total) * c;
  const penLen = (pending / total) * c;
  const rejLen = (rejected / total) * c;

  const appOff = 0;
  const revOff = -appLen;
  const penOff = -(appLen + revLen);
  const rejOff = -(appLen + revLen + penLen);

  return (
    <div className="clean-card p-8 rounded-2xl flex flex-col h-full">
      <h4 className="font-headline-md text-xl font-semibold mb-8">Application Status Breakdown</h4>
      <div className="flex flex-col sm:flex-row items-center gap-10 mt-auto mb-8 flex-1 justify-center">
        {/* Donut Chart */}
        <div className="relative w-40 h-40 shrink-0">
          <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" fill="transparent" stroke="var(--color-surface-container-highest)" strokeWidth="12" className="opacity-20" />
            {approved > 0 && <circle cx="50" cy="50" r="38" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${appLen} ${c - appLen}`} strokeDashoffset={appOff} className="transition-all duration-1000" />}
            {review > 0 && <circle cx="50" cy="50" r="38" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${revLen} ${c - revLen}`} strokeDashoffset={revOff} className="transition-all duration-1000 delay-100" />}
            {pending > 0 && <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f97316" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${penLen} ${c - penLen}`} strokeDashoffset={penOff} className="transition-all duration-1000 delay-200" />}
            {rejected > 0 && <circle cx="50" cy="50" r="38" fill="transparent" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${rejLen} ${c - rejLen}`} strokeDashoffset={rejOff} className="transition-all duration-1000 delay-300" />}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-headline-md text-3xl font-bold text-on-surface">{total === 1 && applications.length === 0 ? 0 : total}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-5 flex-1 w-full max-w-[200px]">
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
              <span className="font-label-md text-sm font-medium text-on-surface group-hover:text-green-600 transition-colors">Approved</span>
            </div>
            <span className="font-label-md text-sm font-bold text-on-surface">{approved}</span>
          </div>
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm" />
              <span className="font-label-md text-sm font-medium text-on-surface group-hover:text-blue-600 transition-colors">Under Review</span>
            </div>
            <span className="font-label-md text-sm font-bold text-on-surface">{review}</span>
          </div>
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm" />
              <span className="font-label-md text-sm font-medium text-on-surface group-hover:text-orange-600 transition-colors">Pending</span>
            </div>
            <span className="font-label-md text-sm font-bold text-on-surface">{pending}</span>
          </div>
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
              <span className="font-label-md text-sm font-medium text-on-surface group-hover:text-red-600 transition-colors">Rejected</span>
            </div>
            <span className="font-label-md text-sm font-bold text-on-surface">{rejected}</span>
          </div>
        </div>
      </div>
      <Link href="/provider/applications" className="mt-6 block text-center text-primary font-label-md hover:underline">
        Track All Applications →
      </Link>
    </div>
  );
}
