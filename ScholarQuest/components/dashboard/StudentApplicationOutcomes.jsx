'use client';

export default function StudentApplicationOutcomes({ accepted = 0, review = 0, rejected = 0 }) {
  const total = accepted + review + rejected;
  const pAccepted = total === 0 ? 0 : accepted / total;
  const pReview = total === 0 ? 0 : review / total;
  const pRejected = total === 0 ? 0 : rejected / total;

  const C = 219.9; // Circumference of circle with r=35
  
  const lRejected = pRejected * C;
  const offsetRejected = 0;

  const lReview = pReview * C;
  const offsetReview = -(lRejected);

  const lAccepted = pAccepted * C;
  const offsetAccepted = -(lRejected + lReview);

  return (
    <div className="flex items-center justify-between mt-auto">
      <div className="relative w-36 h-36 shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--color-surface-container-highest)" strokeWidth="16" />
          
          {total > 0 && (
            <>
              {lRejected > 0 && <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--color-error)" strokeWidth="16" strokeDasharray={`${lRejected} ${C - lRejected}`} strokeDashoffset={offsetRejected} className="transition-all duration-1000" />}
              {lReview > 0 && <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--color-secondary)" strokeWidth="16" strokeDasharray={`${lReview} ${C - lReview}`} strokeDashoffset={offsetReview} className="transition-all duration-1000 delay-300" />}
              {lAccepted > 0 && <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--color-primary)" strokeWidth="16" strokeDasharray={`${lAccepted} ${C - lAccepted}`} strokeDashoffset={offsetAccepted} className="transition-all duration-1000 delay-500" />}
            </>
          )}
        </svg>
      </div>
      
      <div className="flex flex-col gap-4 pl-6 border-l border-outline-variant/20 flex-1 ml-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs font-bold text-on-surface">Accepted</span>
          </div>
          <span className="text-xs font-bold text-on-surface-variant">{Math.round(pAccepted * 100)}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-xs font-bold text-on-surface">In Review</span>
          </div>
          <span className="text-xs font-bold text-on-surface-variant">{Math.round(pReview * 100)}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <span className="text-xs font-bold text-on-surface">Rejected</span>
          </div>
          <span className="text-xs font-bold text-on-surface-variant">{Math.round(pRejected * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
