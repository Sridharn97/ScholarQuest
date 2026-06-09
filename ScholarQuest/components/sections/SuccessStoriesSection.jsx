'use client';

import { useState } from 'react';

const testimonials = [
  {
    quote: "ScholarQuest found me a full-ride to Berkeley that I didn't even know existed. The AI Matcher is genuinely life-changing for first-gen students like me.",
    name: "Jordan Mitchell",
    role: "UC Berkeley, '25",
    initials: "JM",
    stars: 5,
    category: "First-Gen",
    badge: "Full-Ride Scholar",
    tag: "UC BERKELEY",
    award: "$120,000 Awarded",
    matchDetails: "Matched on: 3.8 GPA, Community Service, STEM"
  },
  {
    quote: "I applied to 12 scholarships in one weekend using the tracker and won 3 of them. The auto-fill feature alone saved me 20+ hours.",
    name: "Elena Rodriguez",
    role: "STEM Grant Recipient",
    initials: "ER",
    stars: 5,
    category: "STEM",
    badge: "STEM Grant Winner",
    tag: "MIT SCHOLAR",
    award: "$45,000 / Year",
    matchDetails: "Matched on: Math Olympiad, Robotics"
  },
  {
    quote: "The Eligibility Checker translates complex requirements into simple checklists. As a first-gen student, that clarity was everything.",
    name: "Marcus Chen",
    role: "Columbia University",
    initials: "MC",
    stars: 5,
    category: "Ivy League",
    badge: "Ivy League Recipient",
    tag: "COLUMBIA UNIV",
    award: "Full Tuition",
    matchDetails: "Matched on: Creative Writing, 3.9 GPA"
  },
  {
    quote: "Navigating international fees was daunting until I matched with the Global Excellence Fund. I am now pursuing my Master's at Oxford completely debt-free.",
    name: "Amina Yusuf",
    role: "Oxford Scholar, '26",
    initials: "AY",
    stars: 5,
    category: "International",
    badge: "Global Leader Award",
    tag: "OXFORD UNIV",
    award: "£52,000 Grant",
    matchDetails: "Matched on: Leadership, Economics"
  },
  {
    quote: "The personalized essay reviews and match score updates kept me focused on the highest-probability wins. It paid off in my final semester!",
    name: "Tyler Vance",
    role: "Merit Scholarship Winner",
    initials: "TV",
    stars: 5,
    category: "STEM",
    badge: "National Merit Winner",
    tag: "HARVARD UNIV",
    award: "$30,000 Award",
    matchDetails: "Matched on: 4.0 GPA, Varsity Track"
  },
  {
    quote: "As a first-generation college student, I had no guide. ScholarQuest was my mentor, pointing me to community grants that changed my trajectory.",
    name: "Sofia Patel",
    role: "Stanford undergrad, '24",
    initials: "SP",
    stars: 5,
    category: "First-Gen",
    badge: "Community Leader Fund",
    tag: "STANFORD UNIV",
    award: "Full Ride",
    matchDetails: "Matched on: First-Gen, Social Justice"
  }
];

export default function SuccessStoriesSection() {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'First-Gen', 'STEM', 'Ivy League', 'International'];

  const filteredTestimonials = activeTab === 'All'
    ? testimonials
    : testimonials.filter(t => t.category === activeTab);

  const featured = filteredTestimonials[0];
  const remaining = filteredTestimonials.slice(1);

  return (
    <section className="py-28 px-6 bg-gradient-to-b from-transparent via-slate-50/30 to-transparent relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/3 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/8 rounded-full border border-secondary/15 mb-4 shadow-sm">
            <span className="material-symbols-outlined text-secondary" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">Success Stories</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Empowering Future Leaders
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto font-medium">
            Our scholars are winning life-changing funding and studying at the world's most prestigious institutions.
          </p>
        </div>

        {/* Partner University Logo Badges */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12 max-w-3xl mx-auto">
          {['Stanford', 'MIT', 'Oxford', 'Harvard', 'Berkeley', 'Columbia'].map((uni) => (
            <div
              key={uni}
              className="px-4 py-2 rounded-2xl border border-slate-200/60 bg-white shadow-xs font-bold text-xs text-slate-400 tracking-wider hover:border-primary/20 hover:text-primary transition-all duration-300 cursor-default"
            >
              {uni.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Categories Tab Selector */}
        <div className="flex justify-center items-center gap-2 mb-16 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50 shadow-inner">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-primary shadow-sm scale-102 font-black border border-slate-200/30'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/30'
                }`}
              >
                {tab === 'All' ? 'All Stories' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Dynamic Grid */}
        {featured ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Featured Card */}
            <div className={`transition-all duration-500 ${
              remaining.length === 0 ? 'lg:col-span-3' : 'lg:col-span-2'
            }`}>
              <div className="bg-gradient-to-br from-[#0a46b1] via-[#1b5bd8] to-[#6324cc] rounded-3xl p-8 lg:p-10 text-white flex flex-col justify-between h-full relative overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                {/* Visual Accent Overlay */}
                <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute top-0 right-0 p-8 opacity-8 pointer-events-none select-none">
                  <span className="material-symbols-outlined" style={{ fontSize: '160px', fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                </div>

                <div className="relative z-10">
                  {/* Card Header Info */}
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div className="flex gap-2">
                      <span className="px-3.5 py-1.5 bg-white/12 text-white border border-white/20 rounded-full text-xs font-extrabold flex items-center gap-1.5 backdrop-blur-md">
                        <span className="material-symbols-outlined text-green-400" style={{ fontSize: '15px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                        {featured.badge}
                      </span>
                      <span className="px-3.5 py-1.5 bg-amber-400/20 text-amber-200 border border-amber-400/30 rounded-full text-xs font-extrabold flex items-center gap-1 backdrop-blur-md">
                        <span className="material-symbols-outlined text-amber-300" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>payments</span>
                        {featured.award}
                      </span>
                    </div>
                    
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className="material-symbols-outlined text-amber-300" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                  </div>

                  {/* Main Quote */}
                  <p className="text-2xl lg:text-3xl font-extrabold leading-relaxed mb-10 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    &ldquo;{featured.quote}&rdquo;
                  </p>
                </div>

                {/* Match criteria explanation & Author Profile */}
                <div className="relative z-10 pt-6 border-t border-white/10 mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-xl text-white shadow-inner group-hover:scale-105 transition-transform">
                      {featured.initials}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-lg leading-snug">{featured.name}</h4>
                      <p className="text-white/70 text-xs font-semibold">{featured.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <span className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-xl text-xs font-extrabold tracking-wide uppercase">
                      {featured.tag}
                    </span>
                    <span className="text-[10px] text-white/50 font-bold tracking-wide">
                      {featured.matchDetails}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Remaining Cards List (Sidebar Layout) */}
            {remaining.length > 0 && (
              <div className="flex flex-col gap-6 justify-between lg:col-span-1">
                {remaining.map((t, idx) => (
                  <div
                    key={t.name}
                    className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between flex-1 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Background Quote Mark Decal */}
                    <div className="absolute top-4 right-4 opacity-3 pointer-events-none select-none text-slate-400 group-hover:scale-110 transition-transform duration-500">
                      <span className="material-symbols-outlined" style={{ fontSize: '72px', fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                    </div>

                    <div className="relative z-10">
                      {/* Badge / Award Row */}
                      <div className="flex items-center justify-between gap-3 mb-6">
                        <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-2xs">
                          <span className="material-symbols-outlined text-primary" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                          {t.badge}
                        </span>
                        <span className="text-[11px] font-extrabold text-primary bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                          {t.award}
                        </span>
                      </div>

                      {/* Quote */}
                      <p className="text-sm lg:text-base text-slate-600 italic leading-relaxed mb-6 font-medium group-hover:text-slate-800 transition-colors">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    {/* Footer Info */}
                    <div className="relative z-10 flex flex-col gap-3 pt-5 border-t border-slate-100">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary font-black text-xs shadow-2xs group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            {t.initials}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-900 leading-tight">{t.name}</h4>
                            <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">{t.role}</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[9px] font-black text-slate-500 tracking-wider group-hover:bg-primary/5 group-hover:border-primary/10 group-hover:text-primary transition-colors">
                          {t.tag}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold tracking-wide mt-1">
                        {t.matchDetails}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
            <span className="material-symbols-outlined text-slate-300" style={{ fontSize: '48px' }}>find_in_page</span>
            <p className="text-slate-500 font-medium mt-2">No success stories found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
