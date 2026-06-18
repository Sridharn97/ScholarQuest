import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SuccessStoriesSection from '@/components/sections/SuccessStoriesSection';

export const metadata = {
  title: 'ScholarQuest | Find Your Academic Future',
  description: 'AI-powered scholarship discovery and application management platform.',
};

const stats = [
  { value: '$250M+', label: 'Scholarship Funds' },
  { value: '50,000+', label: 'Opportunities' },
  { value: '12,000+', label: 'Scholars Funded' },
  { value: '88%', label: 'Success Rate' },
];

const features = [
  {
    icon: 'psychology',
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
    textColor: 'text-purple-600',
    title: 'AI-Powered Matching',
    desc: 'Our proprietary algorithm analyzes 40+ profile data points to surface the scholarships you actually qualify for — ranked by match score.',
  },
  {
    icon: 'rule',
    color: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50',
    textColor: 'text-violet-600',
    title: 'Eligibility Checker',
    desc: 'Instantly verify your qualification status for any scholarship. No more wasted applications on programs you don\'t qualify for.',
  },
  {
    icon: 'event_available',
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    title: 'Smart Deadline Tracker',
    desc: 'A unified Kanban board to manage every application — from discovery to accepted. Never miss a deadline again.',
  },
];

const steps = [
  { num: '01', color: 'bg-primary', title: 'Build Your Profile', desc: 'Enter your academic history, extracurriculars, and financial need to seed our AI engine.' },
  { num: '02', color: 'bg-secondary', title: 'Review AI Matches', desc: 'Browse curated opportunities ranked by match score, award amount, and deadline urgency.' },
  { num: '03', color: 'bg-on-background', title: 'Apply & Win', desc: 'Use our smart-fill tools and application tracker to submit winning applications with ease.' },
];

export default function LandingPage() {
  return (
    <div className="bg-background text-on-background">
      <Navbar />

      {/* ======================== HERO ======================== */}
      <section className="relative overflow-hidden pt-16 pb-24 px-6" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(168,85,247,0.08), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(236,72,153,0.07), transparent)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[580px]">

            {/* Left — Copy */}
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 w-fit">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse flex-shrink-0" />
                <span className="text-sm font-semibold text-secondary tracking-wide">Powered by Advanced AI Matching</span>
              </div>

              {/* Headline */}
              <h1 className="font-extrabold leading-[1.1] tracking-tight text-on-background" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(36px, 5vw, 60px)' }}>
                Find Scholarships<br />
                <span className="text-primary">Tailored</span>{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">For You</span>
              </h1>

              {/* Sub */}
              <p className="text-lg text-on-surface-variant leading-relaxed max-w-lg">
                Skip the endless searching. Our intelligent engine matches your unique profile with thousands of institutional, private, and merit-based funding opportunities.
              </p>

              {/* Search bar */}
              <div className="flex flex-col sm:flex-row gap-2 bg-surface-bright border border-outline-variant/40 rounded-full p-2 shadow-lg shadow-black/5 max-w-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
                <div className="flex items-center gap-3 flex-1 px-4">
                  <span className="material-symbols-outlined text-primary flex-shrink-0">search</span>
                  <input
                    type="text"
                    placeholder="Major, state, or scholarship name..."
                    className="flex-1 bg-transparent border-none outline-none text-base text-on-surface placeholder:text-outline py-2"
                  />
                </div>
                <Link
                  href="/signup"
                  className="bg-primary text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-primary/90 active:scale-[0.97] transition-all shadow-md shadow-primary/25 text-center whitespace-nowrap flex items-center justify-center"
                >
                  Get Started Free
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-3">
                  {['AK','BL','CM','DR'].map((init) => (
                    <div key={init} className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {init}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="material-symbols-outlined text-amber-400" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-sm text-outline">Trusted by <span className="font-semibold text-on-surface">12,000+</span> scholars this month</p>
                </div>
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="relative hidden lg:flex items-center justify-center">
              {/* Colorful floating orbs behind hero image */}
              <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-40 filter blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(216,180,254,0.6) 0%, rgba(216,180,254,0) 70%)' }} />
              <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-40 filter blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(249,168,212,0.6) 0%, rgba(249,168,212,0) 70%)' }} />

              <div className="relative w-full aspect-square max-w-[520px] rounded-3xl overflow-hidden border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white/40 backdrop-blur-md flex items-center justify-center p-4">
                <Image
                  src="/hero_students_new.png"
                  alt="Students finding scholarships with ScholarQuest"
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-contain p-6 drop-shadow-md"
                  priority
                  unoptimized
                />
              </div>

              {/* Floating badge — top left */}
              <div className="absolute top-8 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-outline-variant/20 animate-subtle-float">
                <div className="w-10 h-10 rounded-10 bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-green-600" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">Scholarship Found</p>
                  <p className="text-sm font-bold text-on-surface">$45,000 Award 🎉</p>
                </div>
              </div>

              {/* Floating badge — bottom right */}
              <div className="absolute bottom-8 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-outline-variant/20 animate-subtle-float" style={{ animationDelay: '2s' }}>
                <div className="w-10 h-10 rounded-10 bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-secondary" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">AI Match Score</p>
                  <p className="text-sm font-bold text-secondary">98% Match ✨</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="max-w-7xl mx-auto mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-white rounded-2xl border border-outline-variant/20 shadow-sm hover:-translate-y-1 transition-transform">
                <p className="text-3xl font-extrabold text-primary mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{stat.value}</p>
                <p className="text-sm text-on-surface-variant">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== FEATURES ======================== */}
      <section className="py-28 px-6 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-sm font-bold text-secondary uppercase tracking-widest mb-3">Why ScholarQuest?</p>
            <h2 className="text-4xl font-extrabold text-on-background mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              The Smartest Way to Fund Your Education
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Built with advanced algorithms and designed by financial aid experts to ensure you never miss an opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-3xl p-8 border border-outline-variant/20 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
                <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <span className={`material-symbols-outlined ${f.textColor}`} style={{ fontSize: '28px', fontVariationSettings: "'FILL' 1" }}>{f.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-on-background mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>{f.title}</h3>
                <p className="text-base text-on-surface-variant leading-relaxed flex-1">{f.desc}</p>
                <div className="mt-6 pt-6 border-t border-outline-variant/15">
                  <Link href="/signup" className={`${f.textColor} font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all`}>
                    Learn more <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Feature highlight with image */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden">
            <div className="p-10 lg:p-14 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/10 rounded-full w-fit">
                <span className="material-symbols-outlined text-secondary" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="text-sm font-semibold text-secondary">AI Discovery Engine</span>
              </div>
              <h3 className="text-3xl font-extrabold text-on-background leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                10x More Relevant Matches Than Traditional Search
              </h3>
              <p className="text-base text-on-surface-variant leading-relaxed">
                While other platforms show you a raw list, our AI scores every scholarship against your complete profile — GPA, field of study, nationality, extracurriculars, financial need — to give you a personalized ranked list.
              </p>
              <ul className="space-y-3">
                {['Analyzes 40+ profile attributes', 'Updates matches in real-time', 'Explains why each scholarship fits you'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="text-sm text-on-surface">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="w-fit bg-primary text-white px-7 py-3 rounded-10 text-sm font-bold hover:bg-primary/90 active:scale-[0.97] transition-all shadow-md shadow-primary/25">
                Try AI Matching Free
              </Link>
            </div>
            <div className="relative h-72 lg:h-full min-h-[360px] flex items-center justify-center p-8 bg-gradient-to-br from-[#faf5ff] via-[#fdf2f8] to-[#fffbeb]">
              <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full opacity-40 filter blur-[60px]" style={{ background: 'radial-gradient(circle, rgba(216,180,254,0.5) 0%, rgba(216,180,254,0) 70%)' }} />
              <Image src="/ai_matcher_new.png" alt="AI Scholarship Matching" fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-contain z-10 p-12 drop-shadow-md" unoptimized />
            </div>
          </div>
        </div>
      </section>

      {/* ======================== HOW IT WORKS ======================== */}
      <section className="py-28 px-6" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(168,85,247,0.04), transparent)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-xl mx-auto">
            <p className="text-sm font-bold text-secondary uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-4xl font-extrabold text-on-background mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Three Steps to Funding</h2>
            <p className="text-lg text-on-surface-variant">We&apos;ve simplified the complex world of financial aid into a streamlined, 3-step experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[17%] right-[17%] h-0.5 bg-gradient-to-r from-primary via-secondary to-transparent z-0" />

            {steps.map((step, i) => (
              <div key={step.num} className="relative z-10 bg-white rounded-3xl p-8 border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center gap-5">
                <div className={`w-14 h-14 ${step.color} text-white font-extrabold text-lg flex items-center justify-center rounded-full ring-8 ring-primary/8 shadow-lg`}>
                  {step.num}
                </div>
                <h4 className="text-xl font-bold text-on-background" style={{ fontFamily: 'Manrope, sans-serif' }}>{step.title}</h4>
                <p className="text-base text-on-surface-variant leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/signup" className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-2xl text-base font-bold hover:bg-primary/90 active:scale-[0.97] transition-all shadow-lg shadow-primary/25">
              Start Your Journey
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================== DISCOVERY PREVIEW ======================== */}
      <section className="py-28 px-6 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] aspect-square bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#faf5ff] via-[#fdf2f8] to-[#fffbeb] -z-10" />
              <Image src="/scholarship_discovery_new.png" alt="Scholarship discovery" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain drop-shadow-md p-10 z-10" unoptimized />
            </div>
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/8 rounded-full w-fit">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>search</span>
                <span className="text-sm font-semibold text-primary">Scholarship Discovery</span>
              </div>
              <h2 className="text-4xl font-extrabold text-on-background leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                50,000+ Scholarships.<br />
                <span className="text-primary">All in One Place.</span>
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Browse institutional, private, merit-based, and need-based scholarships. Filter by amount, deadline, category, or location. Every listing is verified and kept up-to-date.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: 'school', label: 'Institutional Grants' },
                  { icon: 'volunteer_activism', label: 'Need-Based Aid' },
                  { icon: 'emoji_events', label: 'Merit Awards' },
                  { icon: 'public', label: 'International Funds' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-white rounded-10 border border-outline-variant/20">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                    <span className="text-sm font-medium text-on-surface">{item.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/signup" className="w-fit flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                Browse All Scholarships <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS ======================== */}
      <SuccessStoriesSection />

      {/* ======================== CTA BANNER ======================== */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Your Scholarship Journey Starts Today
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            Join 12,000+ students who have already found their perfect academic funding match. It&apos;s free to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-primary px-10 py-4 rounded-2xl text-base font-bold hover:bg-white/90 active:scale-[0.97] transition-all shadow-xl">
              Create Free Account
            </Link>
            <Link href="/login" className="bg-white/10 text-white border border-white/30 px-10 py-4 rounded-2xl text-base font-bold hover:bg-white/20 active:scale-[0.97] transition-all backdrop-blur-sm">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
