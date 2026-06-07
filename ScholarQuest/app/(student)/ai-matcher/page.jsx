'use client';
import { useState } from 'react';

const suggestions = [
  '"Find STEM full-ride scholarships"',
  '"I\'m interested in AI research grants"',
  '"Need funding for Stanford Graduate School"',
];

const matchCards = [
  { match: 92, color: 'secondary', borderColor: 'border-secondary', tags: ['AI Ethics', 'Full-Ride'], title: 'The Turing-Lovelace Graduate Fellowship', award: '$45,000 + Living Stipend', urgency: '6 days left', urgencyColor: 'text-error' },
  { match: 88, color: 'primary', borderColor: 'border-primary', tags: ['Research', 'Global'], title: 'Next-Gen Innovators Grant', award: '$25,000 Research Budget', urgency: 'Deadline: Dec 15', urgencyColor: 'text-on-surface-variant' },
];

const eligibility = [
  { icon: 'check_circle', color: 'text-green-600 bg-green-50', label: 'Academic Status', value: 'Senior (Met)' },
  { icon: 'check_circle', color: 'text-green-600 bg-green-50', label: 'GPA Threshold', value: '3.8 / 3.5 Req' },
  { icon: 'info', color: 'text-amber-500 bg-amber-50', label: 'Publication', value: 'Required (Met)' },
];

export default function AiMatcherPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col bg-surface-container-lowest relative">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-gutter space-y-10 pb-32">
        <div className="max-w-4xl mx-auto space-y-4">

          {/* AI Welcome */}
          <div className="flex gap-6 items-start">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20 animate-subtle-float">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
            </div>
            <div className="space-y-4 flex-1">
              <div className="glass-panel p-6 rounded-2xl rounded-tl-none shadow-sm">
                <p className="font-body-lg text-body-lg text-on-surface">
                  Hello Alex! I&apos;ve analyzed your profile as a{' '}
                  <span className="text-primary font-semibold">Computer Science Senior</span>{' '}
                  with a <span className="text-secondary font-semibold">3.8 GPA</span>. I&apos;m ready to help you find your perfect academic funding match.
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Tell me more about your grad school aspirations or any specific extracurricular achievements you&apos;d like me to consider today.
                </p>
              </div>
              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setMessage(s.replace(/"/g, ''))}
                    className="px-4 py-2 bg-white border border-outline-variant/30 rounded-full font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-all shadow-sm"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-6 items-start justify-end">
            <div className="space-y-2 flex-1 max-w-[80%] flex flex-col items-end">
              <div className="bg-primary text-white p-6 rounded-2xl rounded-tr-none shadow-md">
                <p className="font-body-md text-body-md">
                  I am focusing on Machine Learning and Ethics for my Master&apos;s degree. I have a published paper and 2 years of internship experience at a tech startup. Looking for merit-based opportunities.
                </p>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant px-2">Read 2:14 PM</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
              AJ
            </div>
          </div>

          {/* AI Results */}
          <div className="flex gap-6 items-start">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div className="flex-1 space-y-6">
              <div className="glass-panel p-6 rounded-2xl rounded-tl-none shadow-sm">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-1">Perfect Matches Found</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Based on your specific focus on ML Ethics and published research, I&apos;ve identified 3 high-probability opportunities.
                </p>
              </div>

              {/* Match Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchCards.map((card) => (
                  <div key={card.title} className={`glass-panel p-6 rounded-10 border-l-4 ${card.borderColor} flex flex-col justify-between group hover:scale-[1.01] transition-transform cursor-pointer relative overflow-hidden`}>
                    {/* Match Circle */}
                    <div className="absolute top-0 right-0 p-4">
                      <div className="flex flex-col items-center">
                        <div className="relative w-12 h-12">
                          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                            <circle className="text-surface-container-highest" cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" />
                            <circle className={card.color === 'secondary' ? 'text-secondary' : 'text-primary'} cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset={125.6 * (1 - card.match / 100)} strokeWidth="4" />
                          </svg>
                          <span className={`absolute inset-0 flex items-center justify-center font-label-sm text-label-sm font-bold ${card.color === 'secondary' ? 'text-secondary' : 'text-primary'}`}>{card.match}%</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-on-surface-variant mt-1">Match</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex gap-2 mb-2 flex-wrap">
                        {card.tags.map((t) => (
                          <span key={t} className={`px-2 py-0.5 ${card.color === 'secondary' ? 'bg-secondary-container/10 text-secondary' : 'bg-primary-container/10 text-primary'} text-[10px] font-bold rounded uppercase tracking-wider`}>{t}</span>
                        ))}
                      </div>
                      <h4 className="font-headline-md text-[18px] font-bold text-on-surface leading-tight mb-1 pr-16">{card.title}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Award: {card.award}</p>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                      <span className={`font-label-sm text-label-sm font-semibold flex items-center gap-1 ${card.urgencyColor}`}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>
                        {card.urgency}
                      </span>
                      <button className="text-primary font-bold font-label-md flex items-center gap-1">
                        View Details <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Eligibility Analysis */}
              <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20">
                <h5 className="font-label-md text-label-md text-on-surface-variant mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" style={{ fontSize: '18px' }}>analytics</span>
                  Eligibility Analysis
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {eligibility.map((e) => (
                    <div key={e.label} className="flex items-center gap-3">
                      <span className={`material-symbols-outlined p-1.5 rounded-full ${e.color}`} style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>{e.icon}</span>
                      <div>
                        <p className="font-label-sm text-[11px] text-on-surface-variant uppercase font-bold">{e.label}</p>
                        <p className="font-body-sm text-body-sm font-semibold">{e.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Input Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
        <div className="max-w-4xl mx-auto w-full glass-panel rounded-2xl shadow-xl shadow-primary/5 p-2 flex items-center gap-2 border border-primary/20 pointer-events-auto">
          <button className="p-3 text-on-surface-variant hover:bg-surface-container-high rounded-10 transition-all">
            <span className="material-symbols-outlined">attach_file</span>
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask ScholarQuest AI about your future..."
            className="flex-1 bg-transparent border-none outline-none font-body-md text-on-surface placeholder:text-outline-variant py-4 px-2"
          />
          <button className="w-12 h-12 bg-primary text-white rounded-10 flex items-center justify-center shadow-md hover:scale-95 transition-all active:scale-90">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
