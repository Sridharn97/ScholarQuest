import Link from 'next/link';

export const metadata = { title: 'Scholarship Details | ScholarQuest' };

const requirements = [
  { icon: 'school', label: 'GPA Requirement', value: '3.5 minimum' },
  { icon: 'work', label: 'Experience', value: '2+ years internship' },
  { icon: 'public', label: 'Nationality', value: 'US Citizens & PR' },
  { icon: 'event', label: 'Year', value: 'Junior or Senior' },
];

const documents = ['Official academic transcript (sealed)', 'Two letters of recommendation', 'Personal statement (800–1200 words)', 'FAFSA or financial aid award letter (if applicable)'];

export default function ScholarshipDetailsPage({ params }) {
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
                    <span className="bg-secondary-container/10 text-secondary px-3 py-1 rounded-6 font-label-sm uppercase tracking-wider">STEM</span>
                    <div className="flex items-center gap-1 text-tertiary">
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>timer</span>
                      <span className="font-label-sm text-label-sm">7 days left</span>
                    </div>
                  </div>
                  <h1 className="font-display-lg text-display-lg text-on-background leading-tight mb-2" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '36px', lineHeight: '44px' }}>
                    Global Tech Innovators Excellence Award
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">Sponsored by the <span className="text-primary font-semibold">World Future Foundation</span></p>
                </div>
                <div className="relative inline-flex items-center justify-center w-24 h-24 shrink-0">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                    <circle className="text-secondary/10" cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" />
                    <circle className="text-secondary" cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeDasharray="251.3" strokeDashoffset="5" strokeWidth="8" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-headline-md text-headline-md text-secondary">98%</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">match</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Award Amount', value: '$45,000', cls: 'text-primary' },
                  { label: 'Duration', value: '4 Years', cls: '' },
                  { label: 'Renewable', value: 'Yes', cls: 'text-green-700' },
                  { label: 'Application Deadline', value: 'Oct 15, 2024', cls: '' },
                ].map((s) => (
                  <div key={s.label} className="bg-surface-container-low rounded-10 p-4">
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
            <p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
              The Global Tech Innovators Excellence Award is a prestigious, merit-based scholarship designed to identify and support the next generation of technology leaders. Founded by the World Future Foundation, this award celebrates students who demonstrate exceptional intellectual curiosity, a commitment to ethical innovation, and the drive to solve complex global challenges.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Recipients will gain not just financial support, but also access to a curated network of mentors, industry leaders, and exclusive internship pipelines within our partner organizations across Silicon Valley, London, and Singapore.
            </p>
          </div>

          {/* Eligibility */}
          <div className="glass-card rounded-2xl p-10">
            <h2 className="font-headline-md text-headline-md mb-6">Eligibility Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {requirements.map((req) => (
                <div key={req.label} className="flex items-center gap-4 p-4 bg-surface-container-low rounded-10">
                  <div className="w-10 h-10 rounded-6 bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">{req.icon}</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">{req.label}</p>
                    <p className="font-label-md text-label-md text-on-surface">{req.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-headline-md text-headline-md mb-4">Required Documents</h3>
            <ul className="space-y-3">
              {documents.map((doc) => (
                <li key={doc} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface-variant">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-10">
          {/* Apply CTA */}
          <div className="glass-card rounded-2xl p-10 text-center shadow-xl">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>school</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-2">Ready to Apply?</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">Your profile matches 98% of the requirements. Don&apos;t miss this opportunity!</p>
            <Link
              href="/apply/1"
              className="block w-full py-3 bg-primary text-on-primary rounded-10 font-label-md text-label-md text-center hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20 mb-3"
            >
              Start Application
            </Link>
            <button className="block w-full py-3 border border-outline-variant rounded-10 font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-all">
              Save to Tracker
            </button>
          </div>

          {/* Eligibility Snapshot */}
          <div className="glass-card rounded-2xl p-10">
            <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontSize: '18px' }}>analytics</span>
              Eligibility Snapshot
            </h3>
            <div className="space-y-3">
              {[
                { label: 'GPA', val: '3.92 ✓', ok: true },
                { label: 'Year', val: 'Senior ✓', ok: true },
                { label: 'Nationality', val: 'US Citizen ✓', ok: true },
                { label: 'Publication', val: '1 paper ✓', ok: true },
              ].map((e) => (
                <div key={e.label} className="flex justify-between items-center">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{e.label}</span>
                  <span className={`font-label-sm text-label-sm font-semibold ${e.ok ? 'text-green-600' : 'text-error'}`}>{e.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-label-md text-label-md text-on-surface-variant mb-4">Have Questions?</h3>
            <a href="mailto:info@worldfuture.org" className="flex items-center gap-3 text-primary hover:underline">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mail</span>
              <span className="font-body-sm">info@worldfuture.org</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
