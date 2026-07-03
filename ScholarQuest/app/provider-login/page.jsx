'use client';
import Link from 'next/link';
import Image from 'next/image';
import useProviderLogin from '@/lib/hooks/useProviderLogin';

export default function ProviderLoginPage() {
  const {
    showPassword,
    setShowPassword,
    error,
    loading,
    handleSubmit,
  } = useProviderLogin();

  return (
    <div className="theme-admin h-screen overflow-hidden flex">

      {/* ================================================================
          LEFT — FULL-HEIGHT FORM PANEL
      ================================================================ */}
      <div
        className="flex-1 h-full overflow-hidden flex items-center justify-center lg:order-1 relative px-8"
        style={{ background: 'linear-gradient(160deg, #f5f3ff 0%, #eef2ff 55%, #f0f9ff 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-[-60px] left-[-60px] w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-40px] right-[-40px] w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)' }} />

        {/* Centered content column */}
        <div className="relative z-10 w-full max-w-[420px] flex flex-col gap-6">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md">
              <img src="/logo_provider.png" alt="Logo" className="w-6 h-6 rounded-lg object-cover" />
            </div>
            <p className="font-extrabold text-slate-900 text-base tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>ScholarQuest</p>
          </div>

          {/* Header block */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.68rem] font-bold tracking-widest uppercase mb-4"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.12) 100%)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>verified</span>
              Partner Program
            </div>
            <h1 className="text-[2rem] font-extrabold leading-tight mb-2" style={{ fontFamily: 'Manrope, sans-serif', color: '#0f172a' }}>
              Welcome back,{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
                Partner
              </span>
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Sign in to access your scholarship management portal.
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div className="p-3 rounded-xl text-red-700 text-xs flex items-start gap-2"
              style={{ background: '#fff1f2', border: '1px solid #fecdd3' }}>
              <span className="material-symbols-outlined shrink-0" style={{ fontSize: '16px' }}>error</span>
              {error}
            </div>
          )}

          {/* FORM CARD */}
          <div
            className="rounded-3xl p-6"
            style={{
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(99,102,241,0.14)',
              boxShadow: '0 8px 40px rgba(99,102,241,0.1), 0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <form id="provider-login-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email */}
                <div>
                  <label htmlFor="provider_email" className="block text-[0.72rem] font-bold text-slate-500 mb-1.5 uppercase tracking-widest">Institutional Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" style={{ fontSize: '17px' }}>mail</span>
                    <input
                      id="provider_email"
                      name="provider_email"
                      type="email"
                      placeholder="name@company.com"
                      autoComplete="email"
                      required
                      className="w-full h-11 pl-10 pr-4 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                      style={{ background: '#f1f5f9', border: '1.5px solid #e2e8f0' }}
                      onFocus={e => { e.currentTarget.style.border = '1.5px solid #6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.currentTarget.style.background = '#fff'; }}
                      onBlur={e => { e.currentTarget.style.border = '1.5px solid #e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f1f5f9'; }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="provider_password" className="block text-[0.72rem] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                    <Link href="#" className="text-[0.72rem] font-semibold hover:underline transition-colors" style={{ color: '#6366f1' }}>Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" style={{ fontSize: '17px' }}>lock</span>
                    <input
                      id="provider_password"
                      name="provider_password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="w-full h-11 pl-10 pr-11 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                      style={{ background: '#f1f5f9', border: '1.5px solid #e2e8f0' }}
                      onFocus={e => { e.currentTarget.style.border = '1.5px solid #6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.currentTarget.style.background = '#fff'; }}
                      onBlur={e => { e.currentTarget.style.border = '1.5px solid #e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f1f5f9'; }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      <span className="material-symbols-outlined" style={{ fontSize: '19px' }}>
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember_me" className="w-4 h-4 rounded cursor-pointer accent-indigo-600" />
                <label htmlFor="remember_me" className="text-[0.8rem] text-slate-500 cursor-pointer select-none">Keep me signed in</label>
              </div>

              {/* Submit */}
              <button
                id="provider-signin-btn"
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  boxShadow: '0 6px 24px rgba(99,102,241,0.4)',
                }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)' }} />
                {loading ? (
                  <><span className="material-symbols-outlined animate-spin" style={{ fontSize: '19px' }}>progress_activity</span> Signing in…</>
                ) : (
                  <><span className="material-symbols-outlined" style={{ fontSize: '19px', fontVariationSettings: "'FILL' 1" }}>corporate_fare</span> Sign In to Partner Portal</>
                )}
              </button>
            </form>
          </div>

          {/* Bottom links */}
          <div className="text-center space-y-2">
            <p className="text-slate-500 text-sm">
              No partner account?{' '}
              <Link href="/provider-signup" className="font-bold hover:underline" style={{ color: '#6366f1' }}>Create account</Link>
            </p>
            <Link href="/" className="inline-flex items-center gap-1 text-slate-400 text-xs hover:text-indigo-600 transition-colors font-medium group">
              <span className="material-symbols-outlined group-hover:-translate-x-0.5 transition-transform" style={{ fontSize: '14px' }}>arrow_back</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* ================================================================
          RIGHT — FULL-COVER BRANDING PANEL (identical to signup)
      ================================================================ */}
      <div className="hidden lg:block w-[52%] relative overflow-hidden h-full lg:order-2">
        <Image src="/provider_login_hero.png" alt="ScholarQuest Partner Platform" fill className="object-cover object-center" unoptimized priority />

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
              <p className="text-sky-400 text-[0.62rem] tracking-[0.18em] uppercase mt-1 font-bold">Partner Portal</p>
            </div>
          </Link>

          {/* Hero headline */}
          <h2 className="text-[2.4rem] font-extrabold text-white leading-[1.18] max-w-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Invest in brilliance.<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #38bdf8 0%, #34d399 100%)' }}>
              Scale your impact.
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
              <p className="text-slate-300 text-[0.7rem] italic leading-snug mb-3">"ScholarQuest allowed us to effortlessly deploy our CSR funds to the most deserving candidates globally."</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">MK</div>
                <p className="text-white font-bold text-[0.65rem]">Maria K., <span className="font-normal text-slate-400">Global Tech</span></p>
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
    </div>
  );
}
