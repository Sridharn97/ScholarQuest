'use client';

const testimonials = [
  {
    quote: "ScholarQuest found me a full-ride to Berkeley that I didn't even know existed. The AI Matcher is genuinely life-changing for first-gen students like me.",
    name: "Jordan Mitchell",
    role: "First-Gen Scholar",
    initials: "JM",
    university: "UC Berkeley",
    uniColor: "bg-blue-50 text-blue-800 border-blue-100",
    avatarGrad: "from-[#004ac6] to-[#1d4ed8]",
    award: "$120,000 Full-Ride",
    matchDetails: "Match Score: 98% • GPA & Extracurriculars"
  },
  {
    quote: "I applied to 12 scholarships in one weekend using the tracker and won 3 of them. The auto-fill feature alone saved me 20+ hours.",
    name: "Elena Rodriguez",
    role: "STEM Grant Recipient",
    initials: "ER",
    university: "MIT",
    uniColor: "bg-rose-50 text-rose-800 border-rose-100",
    avatarGrad: "from-[#712ae2] to-[#8a4cfc]",
    award: "$45,000 / Year",
    matchDetails: "Match Score: 96% • STEM Major & Projects"
  },
  {
    quote: "The Eligibility Checker translates complex requirements into simple checklists. As a first-gen student, that clarity was everything.",
    name: "Marcus Chen",
    role: "Ivy League Recipient",
    initials: "MC",
    university: "Columbia University",
    uniColor: "bg-cyan-50 text-cyan-800 border-cyan-100",
    avatarGrad: "from-[#008080] to-[#20b2aa]",
    award: "Full Tuition",
    matchDetails: "Match Score: 95% • Merit & Needs-Based"
  },
  {
    quote: "Navigating international fees was daunting until I matched with the Global Excellence Fund. I am now pursuing my Master's at Oxford completely debt-free.",
    name: "Amina Yusuf",
    role: "Oxford Scholar, '26",
    initials: "AY",
    university: "Oxford University",
    uniColor: "bg-indigo-50 text-indigo-800 border-indigo-100",
    avatarGrad: "from-[#ff8c00] to-[#ffa500]",
    award: "£52,000 Grant",
    matchDetails: "Match Score: 97% • International Studies"
  },
  {
    quote: "The personalized essay reviews and match score updates kept me focused on the highest-probability wins. It paid off in my final semester!",
    name: "Tyler Vance",
    role: "Merit Scholarship Winner",
    initials: "TV",
    university: "Harvard University",
    uniColor: "bg-red-50 text-red-800 border-red-100",
    avatarGrad: "from-[#c71585] to-[#db7093]",
    award: "$30,000 Award",
    matchDetails: "Match Score: 94% • Academic Excellence"
  },
  {
    quote: "As a first-generation college student, I had no guide. ScholarQuest was my mentor, pointing me to community grants that changed my trajectory.",
    name: "Sofia Patel",
    role: "Stanford undergrad, '24",
    initials: "SP",
    university: "Stanford University",
    uniColor: "bg-amber-50 text-amber-800 border-amber-100",
    avatarGrad: "from-[#4b0082] to-[#8a2be2]",
    award: "Full Ride",
    matchDetails: "Match Score: 99% • Community Leadership"
  }
];

export default function SuccessStoriesSection() {
  return (
    <section className="py-24 px-6 bg-slate-50/40 border-t border-slate-100 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/2 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/2 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/8 rounded-full border border-secondary/15 mb-4 shadow-sm">
            <span className="material-symbols-outlined text-secondary" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">Success Stories</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Empowering Future Leaders
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            {"Our scholars are winning life-changing funding and studying at the world's most prestigious institutions."}
          </p>
        </div>

        {/* Institution Marquee (Clean Logo representation) */}
        <div className="border-t border-b border-slate-200/50 bg-white/50 py-6 mb-16 rounded-2xl shadow-2xs">
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Our Scholars Study at World-Class Institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3 px-4">
            {['Stanford', 'MIT', 'Oxford', 'Harvard', 'Berkeley', 'Columbia'].map((uni) => (
              <span key={uni} className="text-xs font-black text-slate-400 hover:text-primary tracking-widest uppercase transition-colors duration-300 cursor-default">
                {uni}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Card Accent Quote Mark */}
              <div className="absolute top-6 right-6 opacity-3 pointer-events-none select-none text-slate-400 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined" style={{ fontSize: '64px', fontVariationSettings: "'FILL' 1" }}>format_quote</span>
              </div>

              <div>
                {/* University and Award Row */}
                <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide border ${t.uniColor}`}>
                    {t.university.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[11px] font-black tracking-wide shadow-2xs">
                    {t.award}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="material-symbols-outlined text-amber-400" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-600 italic leading-relaxed text-sm lg:text-base font-medium group-hover:text-slate-800 transition-colors my-2">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Scholar profile card footer */}
              <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col gap-2 relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {/* Avatar Initials with Unique Gradients */}
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.avatarGrad} flex items-center justify-center text-white font-black text-xs shadow-2xs group-hover:scale-105 transition-transform duration-300`}>
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 leading-snug flex items-center gap-1">
                        {t.name}
                        <span className="material-symbols-outlined text-emerald-500" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 font-semibold leading-none mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>

                {/* AI Matching Attributes */}
                <div className="text-[10px] text-slate-400 font-bold tracking-wide mt-1">
                  {t.matchDetails}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
