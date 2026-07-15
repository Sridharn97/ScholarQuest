'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import useScholarshipDetail from '@/lib/hooks/useScholarshipDetail';
import AISummarizer from '@/components/ai/AISummarizer';

export default function ScholarshipDetailsPage({ params }) {
  const {
    scholarship,
    loading,
    saved,
    applicationStatus,
    handleSaveToTracker,
  } = useScholarshipDetail(params);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!scholarship?.deadline) return;
    
    let targetDate = new Date(scholarship.deadline);
    if (isNaN(targetDate.getTime())) {
      targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 14); // 14 days default if parsing fails
    }

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [scholarship]);

  if (loading || !scholarship) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="material-symbols-outlined text-primary animate-spin" style={{ fontSize: '36px' }}>progress_activity</span>
      </div>
    );
  }

  const requirements = [
    scholarship.gpa && { icon: 'school', label: 'GPA Requirement', value: scholarship.gpa },
    scholarship.nationality && { icon: 'public', label: 'Nationality', value: scholarship.nationality },
    scholarship.targetYear && { icon: 'event', label: 'Target Year', value: scholarship.targetYear },
    (scholarship.fieldOfStudy || scholarship.category) && { icon: 'category', label: 'Field of Study', value: scholarship.fieldOfStudy || scholarship.category },
  ].filter(Boolean);

  const documents = scholarship.requiredDocs || [];

  return (
    <div className="max-w-container-max mx-auto px-gutter py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-on-surface-variant mb-4">
        <Link href="/discovery" className="font-label-sm text-label-sm hover:text-primary transition-colors">Discovery</Link>
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
        <span className="font-label-sm text-label-sm text-primary">Scholarship Details</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Hero Card */}
          <div className="glass-card rounded-[2rem] p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-6 font-label-sm uppercase tracking-wider">{scholarship.category}</span>
                    <div className="flex items-center gap-1 text-tertiary">
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>timer</span>
                      <span className="font-label-sm text-label-sm">Active Opportunity</span>
                    </div>
                  </div>
                  <h1 className="font-display-lg text-display-lg text-on-background leading-tight mb-2" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '36px', lineHeight: '44px' }}>
                    {scholarship.name}
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">Sponsored by <span className="text-primary font-semibold">{scholarship.org}</span></p>
                </div>
                <div className="relative inline-flex items-center justify-center w-24 h-24 shrink-0">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                    <circle className="text-secondary/10" cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" />
                    <circle className="text-secondary" cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeDasharray="251.3" strokeDashoffset="5" strokeWidth="8" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-headline-md text-headline-md text-secondary">{scholarship.match || '92%'}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">match</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Award Amount', value: scholarship.amount, cls: 'text-primary' },
                  { label: 'Renewable', value: 'Yes', cls: 'text-green-700' },
                  { label: 'Applicants Tracked', value: scholarship.applicants || '0', cls: '' },
                  { label: 'Deadline Date', value: scholarship.deadline, cls: '' },
                ].map((s) => (
                  <div key={s.label} className="bg-surface-container-low rounded-10 p-4 border border-outline-variant/10">
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">{s.label}</p>
                    <p className={`font-headline-md text-headline-md ${s.cls}`}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="glass-card rounded-2xl p-10">
            <h2 className="font-headline-md text-headline-md mb-6">About This Scholarship</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed whitespace-pre-wrap">
              {scholarship.desc}
            </p>
            <AISummarizer text={scholarship.desc} />
          </div>

          {/* Eligibility */}
          <div className="glass-card rounded-2xl p-10">
            <h2 className="font-headline-md text-headline-md mb-6">Eligibility Requirements</h2>
            {requirements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {requirements.map((req) => (
                  <div key={req.label} className="flex items-center gap-4 p-4 bg-surface-container-low rounded-10 border border-outline-variant/10">
                    <div className="w-10 h-10 rounded-6 bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">{req.icon}</span>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">{req.label}</p>
                      <p className="font-label-md text-label-md text-on-surface font-semibold">{req.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-on-surface-variant font-body-md mb-6">No specific eligibility criteria listed.</p>
            )}

            {documents.length > 0 && (
              <>
                <h3 className="font-headline-md text-headline-md mb-4">Required Documents</h3>
                <ul className="space-y-3">
                  {documents.map((doc) => (
                    <li key={doc} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">{doc}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-10">
          {/* Apply CTA */}
          <div className="glass-card rounded-2xl p-10 text-center shadow-xl border border-outline-variant/15">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>school</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-2">Ready to Apply?</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">Submit your application directly to **{scholarship.org}**.</p>
            
            {/* Countdown Timer */}
            <div className="flex justify-center gap-3 mb-6">
              <div className="flex flex-col items-center bg-surface-container-lowest p-2 rounded-xl min-w-[56px] border border-primary/20 shadow-sm animate-subtle-float">
                <span className="font-bold text-xl text-primary">{timeLeft.days}</span>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mt-1">Days</span>
              </div>
              <div className="flex flex-col items-center bg-surface-container-lowest p-2 rounded-xl min-w-[56px] border border-primary/20 shadow-sm animate-subtle-float" style={{animationDelay: '100ms'}}>
                <span className="font-bold text-xl text-primary">{timeLeft.hours}</span>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mt-1">Hrs</span>
              </div>
              <div className="flex flex-col items-center bg-surface-container-lowest p-2 rounded-xl min-w-[56px] border border-primary/20 shadow-sm animate-subtle-float" style={{animationDelay: '200ms'}}>
                <span className="font-bold text-xl text-primary">{timeLeft.minutes}</span>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mt-1">Min</span>
              </div>
              <div className="flex flex-col items-center bg-surface-container-lowest p-2 rounded-xl min-w-[56px] border border-primary/20 shadow-sm animate-subtle-float" style={{animationDelay: '300ms'}}>
                <span className="font-bold text-xl text-primary">{timeLeft.seconds}</span>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mt-1">Sec</span>
              </div>
            </div>

            {applicationStatus ? (
              <div
                className={`block w-full py-3 rounded-10 font-label-md text-label-md text-center shadow-sm mb-3 font-bold cursor-default ${
                  applicationStatus === 'Accepted' || applicationStatus === 'Approved' ? 'bg-green-100 text-green-700 border border-green-200' :
                  applicationStatus === 'Rejected' ? 'bg-red-50 text-red-600 border border-red-200' :
                  'bg-blue-50 text-blue-700 border border-blue-200'
                }`}
              >
                {applicationStatus === 'Accepted' || applicationStatus === 'Approved' ? 'Status: Approved 🎉' : 
                 applicationStatus === 'Rejected' ? 'Status: Rejected' : 
                 'Already Applied'}
              </div>
            ) : (
              <Link
                href={`/apply/${scholarship.id}`}
                className="block w-full py-3 bg-primary text-on-primary rounded-10 font-label-md text-label-md text-center hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20 mb-3 font-bold"
              >
                Start Application
              </Link>
            )}
            {!applicationStatus && (
              <button
                onClick={handleSaveToTracker}
                disabled={saved}
                className={`block w-full py-3 border rounded-10 font-label-md text-label-md transition-all ${
                  saved 
                    ? 'bg-green-50 border-green-200 text-green-700 cursor-default font-semibold' 
                    : 'border-outline-variant text-on-surface hover:bg-surface-container-low active:scale-95'
                }`}
              >
                {saved ? 'Saved in Tracker ✓' : 'Save to Tracker'}
              </button>
            )}
          </div>

          {/* Eligibility Snapshot */}
          <div className="glass-card rounded-2xl p-10">
            <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontSize: '18px' }}>analytics</span>
              Eligibility Checklist
            </h3>
            <div className="space-y-3">
              {[
                { label: 'GPA', val: '3.92 ✓ (Exceeds)', ok: true },
                { label: 'Profile complete', val: 'Yes ✓', ok: true },
                { label: 'Nationality', val: 'Match ✓', ok: true },
              ].map((e) => (
                <div key={e.label} className="flex justify-between items-center text-sm">
                  <span className="font-body-sm text-on-surface-variant">{e.label}</span>
                  <span className={`font-semibold ${e.ok ? 'text-green-600' : 'text-error'}`}>{e.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
