'use client';
import { useState } from 'react';
import Link from 'next/link';

const steps = [
  { num: '01', label: 'Personal Info', sub: 'Completed', done: true },
  { num: '02', label: 'Academic Background', sub: 'In Progress', active: true },
  { num: '03', label: 'Statement of Purpose', sub: 'Pending', pending: true },
  { num: '04', label: 'Document Uploads', sub: 'Pending', pending: true },
];

export default function ApplyPage({ params }) {
  const [gpa, setGpa] = useState('3.92');

  return (
    <div className="max-w-container-max mx-auto px-gutter py-10">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="font-label-sm text-label-sm">Applications</span>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
            <span className="font-label-sm text-label-sm text-primary">Active Application</span>
          </nav>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Global Leadership & Innovation Fellowship</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Offered by the <span className="font-semibold text-primary">Meridian Academic Foundation</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 border border-outline-variant rounded-2xl font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-all active:scale-95">
            Save for Later
          </button>
          <button className="px-6 py-3 bg-primary-container text-on-primary-container rounded-2xl font-label-md text-label-md font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary-container/20">
            Submit Application
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Steps */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 space-y-8">
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.num} className={`flex items-center gap-4 cursor-pointer ${step.pending ? 'opacity-40' : ''}`}>
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-primary text-white shadow-md' : step.active ? 'border-2 border-primary text-primary bg-primary-fixed/30' : 'border-2 border-outline text-outline'}`}>
                    {step.done ? <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check</span> : <span className="font-bold">{step.num}</span>}
                  </div>
                  <div>
                    <p className={`font-label-md text-label-md ${step.done || step.active ? 'text-primary' : ''}`}>{step.label}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Match Score */}
            <div className="p-6 bg-secondary-container/10 border border-secondary-container/20 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-md text-label-md text-secondary">Match Score</span>
                <span className="text-headline-md font-headline-md text-secondary">94%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                <div className="bg-secondary h-full" style={{ width: '94%' }} />
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-4">You exceed the GPA requirements for this fellowship.</p>
            </div>
          </div>
        </aside>

        {/* Main Form */}
        <div className="lg:col-span-9">
          <section className="glass-panel p-10 rounded-2xl shadow-sm border border-outline-variant/20">
            <div className="mb-10">
              <h2 className="font-headline-md text-headline-md text-on-surface">Academic Background</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">Please provide details regarding your current and previous education.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">Current University</label>
                  <input
                    type="text"
                    defaultValue="Stanford University"
                    placeholder="Enter university name"
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">Field of Study</label>
                  <select className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all appearance-none">
                    <option>Computer Science</option>
                    <option>Biotechnology</option>
                    <option>International Relations</option>
                    <option>Economics</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">Current GPA (4.0 Scale)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">Expected Graduation Date</label>
                  <input
                    type="date"
                    defaultValue="2025-06-15"
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <label className="font-label-md text-label-md text-on-surface">Academic Honors & Awards</label>
                <textarea
                  rows={4}
                  placeholder="List your notable achievements..."
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-none"
                />
              </div>

              <div className="pt-8 flex justify-between items-center border-t border-outline-variant/10">
                <button type="button" className="flex items-center gap-2 text-primary font-label-md text-label-md hover:opacity-80 transition-opacity">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                  Previous Step
                </button>
                <button type="button" className="px-8 py-3 bg-primary-container text-on-primary-container rounded-2xl font-label-md text-label-md font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary-container/20">
                  Save & Continue
                </button>
              </div>
            </form>
          </section>

          {/* Locked Next Section */}
          <section className="mt-10 opacity-60">
            <div className="p-10 bg-surface-container-lowest rounded-2xl border-2 border-dashed border-outline-variant/40 flex flex-col items-center justify-center text-center py-20">
              <div className="h-16 w-16 bg-surface-container-high rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '32px' }}>cloud_upload</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Document Repository</h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-2">
                Section locked. Complete Academic Background to enable document uploads for transcripts and letters of recommendation.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
