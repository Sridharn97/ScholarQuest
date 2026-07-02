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
    <div className="h-screen overflow-hidden flex bg-slate-50">

      {/* ===== RIGHT: LIGHT STATS & PREVIEW PANEL ===== */}
      <div className="hidden lg:flex w-1/2 flex-col relative overflow-hidden border-l border-purple-100/50 h-full bg-gradient-to-br from-[#faf5ff] via-[#fdf2f8] to-[#fffbeb] lg:order-2">
        {/* Colorful floating orbs to match illustrations */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-40 filter blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(216,180,254,0.5) 0%, rgba(216,180,254,0) 70%)' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-40 filter blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(249,168,212,0.5) 0%, rgba(249,168,212,0) 70%)' }} />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full opacity-30 filter blur-[60px]" style={{ background: 'radial-gradient(circle, rgba(253,186,116,0.3) 0%, rgba(253,186,116,0) 70%)' }} />

        <div className="relative z-10 flex flex-col h-full p-10 pb-16 justify-between">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-8">
              <img src="/logo_provider.png" alt="Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" />
              <div>
                <p className="font-extrabold text-slate-900 text-base tracking-tight leading-none">ScholarQuest</p>
                <p className="text-slate-500 text-[9px] tracking-widest uppercase mt-0.5 font-bold">Partner Onboarding</p>
              </div>
            </Link>

            <div className="mb-4">
              <h1 className="text-4xl font-extrabold text-slate-900 leading-[1.2] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Empower Students.<br />
                <span className="text-primary">Create Grants.</span>
              </h1>

            </div>
          </div>

          <div className="relative w-[520px] h-[520px] mx-auto my-4 rounded-3xl overflow-hidden border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white/40 backdrop-blur-md flex items-center justify-center">
            <Image
              src="/provider_signup_hero_v3.png"
              alt="Partner Onboarding Illustration"
              width={520}
              height={520}
              className="w-full h-full object-cover drop-shadow-md"
              unoptimized
              priority
              loading="eager"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            {[
              { text: 'Custom scholarships', icon: 'add_circle' },
              { text: 'Review applications', icon: 'description' },
              { text: 'Impact reports', icon: 'analytics' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-md shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '15px', fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>
                <span className="text-slate-700 text-[10px] font-bold leading-tight uppercase tracking-wider">{item.text}</span>
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
