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
    <div className="clean-card p-8 rounded-2xl">
      <h4 className="font-headline-md text-xl font-semibold mb-8">Application Status Breakdown</h4>
      <div className="flex items-center justify-between mt-auto mb-6">
        <div className="relative w-36 h-36 shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--color-surface-container-highest)" strokeWidth="16" />
            {approved > 0 && <circle cx="50" cy="50" r="35" fill="transparent" stroke="#22c55e" strokeWidth="16" strokeDasharray={`${appLen} ${c - appLen}`} strokeDashoffset={appOff} className="transition-all duration-1000" />}
            {review > 0 && <circle cx="50" cy="50" r="35" fill="transparent" stroke="#3b82f6" strokeWidth="16" strokeDasharray={`${revLen} ${c - revLen}`} strokeDashoffset={revOff} className="transition-all duration-1000 delay-100" />}
            {pending > 0 && <circle cx="50" cy="50" r="35" fill="transparent" stroke="#f97316" strokeWidth="16" strokeDasharray={`${penLen} ${c - penLen}`} strokeDashoffset={penOff} className="transition-all duration-1000 delay-200" />}
            {rejected > 0 && <circle cx="50" cy="50" r="35" fill="transparent" stroke="#ef4444" strokeWidth="16" strokeDasharray={`${rejLen} ${c - rejLen}`} strokeDashoffset={rejOff} className="transition-all duration-1000 delay-300" />}
          </svg>
        </div>

        <div className="flex flex-col gap-4 pl-6 border-l border-outline-variant/20 flex-1 ml-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs font-bold text-on-surface">Approved</span>
            </div>
            <span className="text-xs font-bold text-on-surface-variant">{approved}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs font-bold text-on-surface">Under Review</span>
            </div>
            <span className="text-xs font-bold text-on-surface-variant">{review}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-xs font-bold text-on-surface">Pending</span>
            </div>
            <span className="text-xs font-bold text-on-surface-variant">{pending}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs font-bold text-on-surface">Rejected</span>
            </div>
            <span className="text-xs font-bold text-on-surface-variant">{rejected}</span>
          </div>
        </div>
      </div>
      <Link href="/provider/applications" className="mt-6 block text-center text-primary font-label-md hover:underline">
        Track All Applications →
      </Link>
    </div>
  );
}
