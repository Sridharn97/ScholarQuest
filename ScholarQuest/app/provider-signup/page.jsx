'use client';
import Link from 'next/link';
import Image from 'next/image';
import useProviderSignup from '@/lib/hooks/useProviderSignup';

export default function ProviderSignupPage() {
  const {
    showPassword,
    setShowPassword,
    error,
    loading,
    success,
    handleSubmit,
  } = useProviderSignup();

  return (
    <div className="theme-admin h-screen overflow-hidden flex bg-slate-50">

      {/* ===== RIGHT: PREMIUM CORPORATE PANEL ===== */}
      <div className="hidden lg:flex w-1/2 flex-col relative overflow-hidden border-l border-white/10 h-full bg-[#0B132B] text-white lg:order-2">
        {/* Deep, rich background gradients and orbs for a premium tech feel */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-30 filter blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.5) 0%, rgba(56,189,248,0) 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] rounded-full opacity-30 filter blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 70%)' }} />

        <div className="relative z-10 flex flex-col h-full p-10 pb-12 justify-between">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-8 group w-fit">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <img src="/logo_provider.png" alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
              </div>
              <div>
                <p className="font-extrabold text-white text-lg tracking-tight leading-none">ScholarQuest</p>
                <p className="text-blue-300 text-[10px] tracking-widest uppercase mt-1 font-bold">Partner Onboarding</p>
              </div>
            </Link>

            <div className="mb-4 max-w-md">
              <h1 className="text-4xl font-extrabold text-white leading-[1.2] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Build the future.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">One grant at a time.</span>
              </h1>
            </div>
          </div>

          <div className="relative w-full max-w-[380px] mx-auto my-auto shrink-0">
            {/* The Hero Image Container */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white/5 backdrop-blur-xl flex items-center justify-center z-10">
              <Image
                src="/sponsor_signup_hero.png"
                alt="Partner Onboarding Illustration"
                width={1000}
                height={1000}
                className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
                unoptimized
                priority
                loading="eager"
              />
            </div>

            {/* Floating Glassmorphism Elements */}
            <div className="absolute -left-6 top-[30%] z-20 animate-[float_4s_ease-in-out_infinite]">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex items-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>school</span>
                </div>
                <div>
                  <p className="text-white font-bold text-xs">Global Reach</p>
                  <p className="text-blue-300 text-[9px] uppercase font-bold tracking-wider">Top Institutions</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-8 bottom-[20%] z-20 animate-[float_5s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }}>
              <div className="bg-[#0B132B]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl max-w-[200px]">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="material-symbols-outlined text-emerald-400" style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-slate-300 text-xs italic leading-snug mb-3">
                  "Our company's educational outreach has never been more impactful and streamlined."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[9px] font-bold text-white">DR</div>
                  <p className="text-white font-bold text-[10px]">David R., <span className="font-normal text-slate-400">Innovate Inc.</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {[
              { text: 'Custom scholarships', icon: 'add_circle' },
              { text: 'Review applications', icon: 'description' },
              { text: 'Impact reports', icon: 'analytics' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg hover:bg-white/10 transition-colors text-center">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-emerald-400" style={{ fontSize: '22px', fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>
                <span className="text-slate-300 text-[10px] font-bold leading-tight uppercase tracking-wider">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== LEFT: FORM PANEL ===== */}
      <div className="flex-1 bg-white h-full overflow-hidden flex flex-col justify-center items-center px-8 lg:order-1">
        <div className="w-full max-w-[540px]">
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <img src="/logo_provider.png" alt="Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" />
            <p className="font-extrabold text-slate-900 text-lg tracking-tight">ScholarQuest Portal</p>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>Partner Registration</h2>
            <p className="text-slate-500 text-base">Directly create an account for your Company or Educational Institute.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-10 text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined shrink-0" style={{ fontSize: '18px' }}>error</span>
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-10 text-green-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined shrink-0 animate-bounce" style={{ fontSize: '18px' }}>check_circle</span>
              Account created successfully! Redirecting...
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first_name" className="text-slate-700 text-sm font-bold block">First Name</label>
                <input
                  id="first_name"
                  type="text"
                  placeholder="Jane"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm h-12 shadow-sm hover:border-slate-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="last_name" className="text-slate-700 text-sm font-bold block">Last Name</label>
                <input
                  id="last_name"
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm h-12 shadow-sm hover:border-slate-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="organization" className="text-slate-700 text-sm font-bold block">Company or Institute Name</label>
              <input
                id="organization"
                type="text"
                placeholder="e.g. Stanford University or Google Inc."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm h-12 shadow-sm hover:border-slate-300"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="entity_type" className="text-slate-700 text-sm font-bold block">Entity Type</label>
                <div className="relative">
                  <select
                    id="entity_type"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 text-slate-900 outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm h-12 appearance-none shadow-sm hover:border-slate-300"
                  >
                    <option>Company</option>
                    <option>Institute</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" style={{ fontSize: '20px' }}>keyboard_arrow_down</span>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="provider_email" className="text-slate-700 text-sm font-bold block">Work Email</label>
                <input
                  id="provider_email"
                  type="email"
                  placeholder="jane@organization.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm h-12 shadow-sm hover:border-slate-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="provider_password" className="text-slate-700 text-sm font-bold block">Password</label>
              <div className="relative">
                <input
                  id="provider_password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-4 pr-12 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm h-12 shadow-sm hover:border-slate-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2">
              <input type="checkbox" id="provider_terms" className="w-4 h-4 mt-0.5 rounded border-slate-300 bg-slate-50 text-primary accent-primary cursor-pointer shadow-sm" required />
              <label htmlFor="provider_terms" className="text-slate-500 text-[11px] leading-relaxed cursor-pointer font-medium">
                I represent that I am an authorized agent of this organization and agree to the{' '}
                <Link href="#" className="text-primary hover:underline font-bold">Terms of Use</Link>
                {' '}and{' '}
                <Link href="#" className="text-primary hover:underline font-bold">Data Policy</Link>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-primary text-white h-12 rounded-xl font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/25 flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: '20px' }}>progress_activity</span>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
                  Create Sponsor Account
                </>
              )}
            </button>
          </form>

          {/* Bottom Login Link */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              Already registered?{' '}
              <Link href="/provider-login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 text-xs hover:text-primary mt-4 font-semibold transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_back</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
