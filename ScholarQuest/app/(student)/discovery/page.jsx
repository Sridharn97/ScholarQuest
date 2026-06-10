'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAdminScholarships, ensureDefaults } from '@/lib/store';

const filterTags = ['STEM', 'Full-Ride', 'Minority', 'Art', 'Leadership', 'Research'];

export default function DiscoveryPage() {
  const [scholarships, setScholarships] = useState([]);
  const [selectedTags, setSelectedTags] = useState(['Full-Ride']);

  useEffect(() => {
    ensureDefaults();
    const list = getAdminScholarships().filter(s => s.status === 'Active');
    setScholarships(list);
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const featured = scholarships[0] || { id: 1, name: 'Global Tech Innovators Fund', category: 'STEM', amount: '$25,000', deadline: '2026-10-15', org: 'Global Tech Foundation', match: '98%' };
  const regularScholarships = scholarships.length > 1 ? scholarships.slice(1) : [];

  return (
    <div className="flex max-w-container-max mx-auto px-gutter py-10 gap-8">
      {/* ===== FILTERS SIDEBAR ===== */}
      <aside className="hidden xl:block w-72 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-10 border border-outline-variant/30 p-6 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface">Filters</h2>
            <button className="text-primary font-label-sm text-label-sm hover:underline" onClick={() => setSelectedTags([])}>Reset All</button>
          </div>

          {/* Country */}
          <div className="space-y-4">
            <label className="font-label-md text-label-md text-on-surface">Country</label>
            <select className="w-full bg-surface-container-low border border-outline-variant rounded-6 py-2 px-3 font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary/20">
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
            </select>
          </div>

          {/* Degree Type */}
          <div className="space-y-4">
            <label className="font-label-md text-label-md text-on-surface">Degree Type</label>
            <select className="w-full bg-surface-container-low border border-outline-variant rounded-6 py-2 px-3 font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary/20">
              <option>Undergraduate</option>
              <option>Master&apos;s</option>
              <option>PhD / Doctoral</option>
            </select>
          </div>

          {/* Amount Range */}
          <div className="space-y-4">
            <label className="font-label-md text-label-md text-on-surface">Amount Range</label>
            <select className="w-full bg-surface-container-low border border-outline-variant rounded-6 py-2 px-3 font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary/20">
              <option>Any Amount</option>
              <option>$5k - $10k</option>
              <option>$10k - $25k</option>
              <option>$25k - $50k+</option>
            </select>
          </div>

          {/* Deadline */}
          <div className="space-y-4">
            <label className="font-label-md text-label-md text-on-surface">Deadline</label>
            <select className="w-full bg-surface-container-low border border-outline-variant rounded-6 py-2 px-3 font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary/20">
              <option>Any Time</option>
              <option>Next 30 Days</option>
              <option>Next 90 Days</option>
            </select>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <label className="font-label-md text-label-md text-on-surface">Eligibility Tags</label>
            <select 
              className="w-full bg-surface-container-low border border-outline-variant rounded-6 py-2 px-3 font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary/20"
              value={selectedTags.length > 0 ? selectedTags[0] : ''}
              onChange={(e) => setSelectedTags(e.target.value ? [e.target.value] : [])}
            >
              <option value="">All Tags</option>
              {filterTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      {/* ===== SCHOLARSHIP GRID ===== */}
      <main className="flex-1 min-w-0">
        {/* Mobile Filter + Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Showing <span className="font-bold text-on-surface">{scholarships.length} scholarships</span> matching your profile
          </p>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Sort by:</span>
            <button className="font-label-sm text-label-sm flex items-center gap-1">
              Match Score <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_drop_down</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured Card */}
          <div className="glass-card md:col-span-2 p-6 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-6 text-label-sm font-label-sm uppercase tracking-wider">Featured Match</span>
                  <div className="flex items-center gap-1 text-tertiary">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>stars</span>
                    <span className="font-label-sm text-label-sm">Top Recommendation</span>
                  </div>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-background mb-1">{featured.name}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">{featured.org}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[['Funding', featured.amount, 'text-primary'], ['Deadline', featured.deadline, 'text-on-surface'], ['Duration', '4 Years', 'text-on-surface'], ['Location', 'USA', 'text-on-surface']].map(([l, v, cls]) => (
                    <div key={l}>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">{l}</p>
                      <p className={`font-headline-md text-headline-md ${cls}`}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex md:flex-col justify-between items-center md:items-end w-full md:w-auto">
                <div className="text-right">
                  <p className="font-label-sm text-label-sm text-on-surface-variant mb-2">Match Score</p>
                  <div className="relative inline-flex items-center justify-center w-20 h-20">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                      <circle className="text-secondary/10" cx="40" cy="40" r="34" fill="transparent" stroke="currentColor" strokeWidth="6" />
                      <circle className="text-secondary" cx="40" cy="40" r="34" fill="transparent" stroke="currentColor" strokeDasharray="213.6" strokeDashoffset="21.36" strokeWidth="6" />
                    </svg>
                    <span className="absolute font-headline-md text-headline-md text-secondary">{featured.match || '95%'}</span>
                  </div>
                </div>
                <Link href={`/scholarships/${featured.id}`} className="bg-primary text-on-primary px-8 py-3 rounded-10 font-label-md text-label-md hover:bg-primary/90 active:scale-95 transition-all shadow-md">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          {/* Regular Cards */}
          {regularScholarships.map((s) => (
            <div key={s.id} className="bg-white border border-outline-variant/30 p-6 rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-10 bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">{s.icon || 'school'}</span>
                  </div>
                  <span className="bg-surface-container-low px-2 py-1 rounded text-[10px] font-bold text-on-surface-variant border border-outline-variant/20 uppercase tracking-tighter">{s.category}</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-1">{s.name}</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">{s.org}</p>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Amount</p>
                    <p className="font-headline-md text-headline-md text-primary">{s.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Match</p>
                    <p className="font-headline-md text-headline-md text-secondary">{s.match || '90%'}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>
                  {s.deadline}
                </span>
                <Link href={`/scholarships/${s.id}`} className="text-primary font-label-md text-label-md hover:underline underline-offset-4 flex items-center gap-1">
                  View & Apply <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-6 border border-outline-variant/30 hover:border-primary transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          {[1].map((p) => (
            <button key={p} className={`w-10 h-10 flex items-center justify-center rounded-6 font-bold ${p === 1 ? 'bg-primary text-on-primary' : 'border border-outline-variant/30 hover:border-primary transition-colors'}`}>
              {p}
            </button>
          ))}
          <button className="w-10 h-10 flex items-center justify-center rounded-6 border border-outline-variant/30 hover:border-primary transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </main>
    </div>
  );
}
