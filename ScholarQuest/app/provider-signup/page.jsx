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
    <div className="theme-admin h-screen overflow-hidden flex">

      {/* ================================================================
          LEFT — FULL-COVER BRANDING PANEL
      ================================================================ */}
      <div className="hidden lg:block w-[52%] relative overflow-hidden h-full">
        <Image src="/sponsor_signup_hero.png" alt="ScholarQuest Partner Platform" fill className="object-cover object-center" unoptimized priority />

        {/* Gradient overlays */}
        <div className="absolute inset-x-0 top-0 h-[45%] pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, rgba(9,14,40,0.96) 0%, rgba(9,14,40,0.82) 40%, transparent 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-[32%] pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, rgba(9,14,40,0.97) 0%, rgba(9,14,40,0.75) 55%, transparent 100%)' }} />
        <div className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(9,14,40,0.4) 100%)' }} />
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none z-10"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[380px] h-[380px] rounded-full pointer-events-none z-10"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', filter: 'blur(50px)' }} />

        {/* Content layer */}
        <div className="absolute inset-0 z-20 flex flex-col h-full p-10 pb-9 text-white">
          {/* Brand header */}
          <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <img src="/logo_provider.png" alt="ScholarQuest Logo" className="w-8 h-8 rounded-lg object-cover" />
            </div>
            <div>
              <p className="font-extrabold text-white text-[1.05rem] tracking-tight leading-none" style={{ fontFamily: 'Manrope, sans-serif' }}>ScholarQuest</p>
              <p className="text-sky-400 text-[0.62rem] tracking-[0.18em] uppercase mt-1 font-bold">Partner Onboarding</p>
            </div>
          </Link>

          {/* Hero headline */}
          <h2 className="text-[2.4rem] font-extrabold text-white leading-[1.18] max-w-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Build the future.<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #38bdf8 0%, #34d399 100%)' }}>
              One grant at a time.
            </span>
          </h2>

          {/* Floating badge: Global Reach */}
          <div className="absolute left-7 top-[42%] z-30" style={{ animation: 'providerFloat 4s ease-in-out infinite' }}>
            <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl shadow-2xl"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.25)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)' }}>
                <span className="material-symbols-outlined text-white" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>school</span>
              </div>
              <div>
                <p className="text-white font-bold text-[0.75rem] leading-none">Global Reach</p>
                <p className="text-sky-300 text-[0.58rem] uppercase font-bold tracking-wider mt-0.5">Top Institutions</p>
              </div>
            </div>
          </div>

          {/* Floating badge: $50M+ */}
          <div className="absolute right-7 top-[36%] z-30" style={{ animation: 'providerFloat 5s ease-in-out infinite', animationDelay: '0.8s' }}>
            <div className="px-4 py-3 rounded-2xl shadow-2xl"
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <p className="text-emerald-400 font-extrabold text-xl leading-none" style={{ fontFamily: 'Manrope, sans-serif' }}>$50M+</p>
              <p className="text-slate-300 text-[0.58rem] uppercase font-bold tracking-wider mt-1">Funds Distributed</p>
            </div>
          </div>

          {/* Testimonial card */}
          <div className="absolute right-5 bottom-[22%] z-30" style={{ animation: 'providerFloat 6s ease-in-out infinite', animationDelay: '1.5s' }}>
            <div className="p-4 rounded-2xl shadow-2xl max-w-[200px]"
              style={{ background: 'rgba(9,14,40,0.82)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-amber-400" style={{ fontSize: '11px', fontVariationSettings: "'FILL' 1" }}>star</span>)}
              </div>
              <p className="text-slate-300 text-[0.7rem] italic leading-snug mb-3">"Our company's outreach has never been more impactful and streamlined."</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">DR</div>
                <p className="text-white font-bold text-[0.65rem]">David R., <span className="font-normal text-slate-400">Innovate Inc.</span></p>
              </div>
            </div>
          </div>

          <div className="flex-1" />

          {/* Feature pills */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Custom\nScholarships', icon: 'add_circle', gradient: 'linear-gradient(135deg,#3b82f6,#4f46e5)' },
              { label: 'Review\nApplications', icon: 'description', gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' },
              { label: 'Impact\nReports', icon: 'analytics', gradient: 'linear-gradient(135deg,#10b981,#0d9488)' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center gap-2.5 py-4 rounded-2xl text-center transition-all duration-200 hover:scale-[1.04] cursor-default"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ background: item.gradient }}>
                  <span className="material-symbols-outlined text-white" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>
                <span className="text-slate-200 text-[0.62rem] font-bold uppercase tracking-wider leading-tight whitespace-pre-line">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes providerFloat {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-10px); }
          }
        `}</style>
      </div>

      {/* ================================================================
          RIGHT — FULL-HEIGHT FORM PANEL
      ================================================================ */}
      <div
        className="flex-1 h-full overflow-hidden flex flex-col relative px-10 py-7"
        style={{ background: 'linear-gradient(160deg, #f5f3ff 0%, #eef2ff 55%, #f0f9ff 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-[-60px] left-[-60px] w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-40px] right-[-40px] w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }} />

        {/* Inner column — fills full height, max-width centred */}
        <div className="relative z-10 flex flex-col h-full w-full max-w-[500px] mx-auto">

          {/* ── Mobile logo ── */}
          <div className="flex items-center gap-3 mb-5 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md">
              <img src="/logo_provider.png" alt="Logo" className="w-6 h-6 rounded-lg object-cover" />
            </div>
            <p className="font-extrabold text-slate-900 text-base tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>ScholarQuest</p>
          </div>

          {/* ── Badge + Heading (fixed top section) ── */}
          <div className="flex-shrink-0 mb-4">
            {/* Partner badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.68rem] font-bold tracking-wide uppercase mb-3"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.12) 100%)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}>verified</span>
              Partner Program
            </div>

            {/* Heading */}
            <h1 className="text-[1.7rem] font-extrabold leading-tight mb-1" style={{ fontFamily: 'Manrope, sans-serif', color: '#0f172a' }}>
              Partner{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
                Registration
              </span>
            </h1>
            <p className="text-slate-500 text-[0.82rem] leading-relaxed">
              Create an account for your Company or Educational Institute and start funding talent.
            </p>
          </div>

          {/* ── Error / Success alerts ── */}
          {error && (
            <div className="flex-shrink-0 mb-3 p-3 rounded-xl text-red-700 text-xs flex items-start gap-2"
              style={{ background: '#fff1f2', border: '1px solid #fecdd3' }}>
              <span className="material-symbols-outlined shrink-0" style={{ fontSize: '16px' }}>error</span>
              {error}
            </div>
          )}
          {success && (
            <div className="flex-shrink-0 mb-3 p-3 rounded-xl text-emerald-700 text-xs flex items-start gap-2"
              style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <span className="material-symbols-outlined shrink-0 animate-bounce" style={{ fontSize: '16px' }}>check_circle</span>
              Account created! Redirecting to your portal…
            </div>
          )}

          {/* ================================================================
              FORM CARD — flex-1 so it grows to fill remaining height
          ================================================================ */}
          <div
            className="flex-1 min-h-0 rounded-2xl p-5 flex flex-col"
            style={{
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(99,102,241,0.13)',
              boxShadow: '0 4px 30px rgba(99,102,241,0.09), 0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <form
              id="provider-signup-form"
              onSubmit={handleSubmit}
              className="flex flex-col h-full"
            >
              {/* Fields area — grows to fill the card */}
              <div className="flex-1 flex flex-col justify-evenly">

                {/* First + Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="first_name" className="block text-[0.7rem] font-semibold text-slate-500 mb-1 uppercase tracking-wide">First Name</label>
                    <div className="relative">
                      <input id="first_name" name="first_name" type="text" placeholder="Jane" autoComplete="given-name" required
                        className="w-full h-9 px-3 rounded-lg text-[0.83rem] text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                        style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                        onFocus={e => { e.currentTarget.style.border = '1.5px solid #6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.currentTarget.style.background = '#fff'; }}
                        onBlur={e => { e.currentTarget.style.border = '1.5px solid #e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f8fafc'; }}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-[0.7rem] font-semibold text-slate-500 mb-1 uppercase tracking-wide">Last Name</label>
                    <input id="last_name" name="last_name" type="text" placeholder="Doe" autoComplete="family-name" required
                      className="w-full h-9 px-3 rounded-lg text-[0.83rem] text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                      style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                      onFocus={e => { e.currentTarget.style.border = '1.5px solid #6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.currentTarget.style.background = '#fff'; }}
                      onBlur={e => { e.currentTarget.style.border = '1.5px solid #e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f8fafc'; }}
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="organization" className="block text-[0.7rem] font-semibold text-slate-500 mb-1 uppercase tracking-wide">Company or Institute Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" style={{ fontSize: '16px' }}>business</span>
                    <input id="organization" name="organization" type="text" placeholder="e.g., Stanford University or Google Inc." required
                      className="w-full h-9 pl-8 pr-3 rounded-lg text-[0.83rem] text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                      style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                      onFocus={e => { e.currentTarget.style.border = '1.5px solid #6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.currentTarget.style.background = '#fff'; }}
                      onBlur={e => { e.currentTarget.style.border = '1.5px solid #e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f8fafc'; }}
                    />
                  </div>
                </div>

                {/* Entity Type + Work Email */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="entity_type" className="block text-[0.7rem] font-semibold text-slate-500 mb-1 uppercase tracking-wide">Entity Type</label>
                    <div className="relative">
                      <select id="entity_type" name="entity_type"
                        className="w-full h-9 pl-3 pr-8 rounded-lg text-[0.83rem] text-slate-800 outline-none appearance-none transition-all cursor-pointer"
                        style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                        onFocus={e => { e.currentTarget.style.border = '1.5px solid #6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.currentTarget.style.background = '#fff'; }}
                        onBlur={e => { e.currentTarget.style.border = '1.5px solid #e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f8fafc'; }}
                      >
                        <option value="Company">Company</option>
                        <option value="Institute">Institute</option>
                        <option value="NGO">NGO / Non-Profit</option>
                        <option value="Government">Government</option>
                        <option value="Foundation">Foundation</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" style={{ fontSize: '17px' }}>keyboard_arrow_down</span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="provider_email" className="block text-[0.7rem] font-semibold text-slate-500 mb-1 uppercase tracking-wide">Work Email</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" style={{ fontSize: '16px' }}>mail</span>
                      <input id="provider_email" name="provider_email" type="email" placeholder="jane@org.com" autoComplete="email" required
                        className="w-full h-9 pl-8 pr-3 rounded-lg text-[0.83rem] text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                        style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                        onFocus={e => { e.currentTarget.style.border = '1.5px solid #6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.currentTarget.style.background = '#fff'; }}
                        onBlur={e => { e.currentTarget.style.border = '1.5px solid #e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f8fafc'; }}
                      />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="provider_password" className="block text-[0.7rem] font-semibold text-slate-500 mb-1 uppercase tracking-wide">Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" style={{ fontSize: '16px' }}>lock</span>
                    <input id="provider_password" name="provider_password" type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" autoComplete="new-password" required
                      className="w-full h-9 pl-8 pr-10 rounded-lg text-[0.83rem] text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                      style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                      onFocus={e => { e.currentTarget.style.border = '1.5px solid #6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.currentTarget.style.background = '#fff'; }}
                      onBlur={e => { e.currentTarget.style.border = '1.5px solid #e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f8fafc'; }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2.5">
                  <input type="checkbox" id="provider_terms" required className="w-3.5 h-3.5 mt-0.5 rounded cursor-pointer accent-indigo-600 flex-shrink-0" />
                  <label htmlFor="provider_terms" className="text-[0.73rem] leading-snug cursor-pointer text-slate-500">
                    I represent that I am an authorized agent of this organization and agree to the{' '}
                    <Link href="#" className="font-semibold hover:underline" style={{ color: '#6366f1' }}>Terms of Use</Link>
                    {' '}and{' '}
                    <Link href="#" className="font-semibold hover:underline" style={{ color: '#6366f1' }}>Data Policy</Link>.
                  </label>
                </div>
              </div>

              {/* ── Submit button — pinned to bottom of card ── */}
              <button
                id="create-sponsor-account-btn"
                type="submit"
                disabled={loading || success}
                className="w-full h-11 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 mt-4 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  boxShadow: '0 4px 20px rgba(99,102,241,0.38)',
                }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)' }} />
                {loading ? (
                  <><span className="material-symbols-outlined animate-spin" style={{ fontSize: '19px' }}>progress_activity</span> Creating your account…</>
                ) : success ? (
                  <><span className="material-symbols-outlined" style={{ fontSize: '19px', fontVariationSettings: "'FILL' 1" }}>check_circle</span> Account Created!</>
                ) : (
                  <><span className="material-symbols-outlined" style={{ fontSize: '19px', fontVariationSettings: "'FILL' 1" }}>corporate_fare</span> Create Sponsor Account</>
                )}
              </button>
            </form>
          </div>
          {/* END FORM CARD */}

          {/* ── Trust indicators + links — pinned to bottom ── */}
          <div className="flex-shrink-0 pt-4 text-center space-y-2">
            <p className="text-slate-500 text-[0.83rem]">
              Already registered?{' '}
              <Link href="/provider-login" className="font-bold hover:underline" style={{ color: '#6366f1' }}>Sign In</Link>
            </p>
            <Link href="/" className="inline-flex items-center gap-1 text-slate-400 text-[0.72rem] hover:text-indigo-600 transition-colors font-medium group">
              <span className="material-symbols-outlined group-hover:-translate-x-0.5 transition-transform" style={{ fontSize: '13px' }}>arrow_back</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
