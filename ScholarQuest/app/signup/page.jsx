'use client';
import Link from 'next/link';
import Image from 'next/image';
import useSignup from '@/lib/hooks/useSignup';

export default function SignupPage() {
  const {
    showPassword,
    setShowPassword,
    password,
    setPassword,
    error,
    loading,
    strength,
    strengthLabels,
    strengthColors,
    handleSubmit,
  } = useSignup();

  return (
    <div className="h-screen overflow-hidden flex">

      {/* ================================================================
          LEFT — CENTERED FORM PANEL
      ================================================================ */}
      <div
        className="flex-1 h-full flex flex-col items-center justify-center relative px-10 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #eff6ff 55%, #f0fdf4 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-[-100px] w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)' }} />

        {/* Centered content column */}
        <div className="relative z-10 w-full max-w-[460px] flex flex-col" style={{ gap: 'clamp(12px, 2vh, 20px)' }}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl shadow-md overflow-hidden flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #9333ea, #3b82f6)' }}>
              <img src="/Logo.png.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: 'Manrope, sans-serif' }}>ScholarQuest</span>
          </Link>

          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.66rem] font-bold tracking-widest uppercase mb-3"
              style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.13) 0%, rgba(59,130,246,0.13) 100%)', color: '#9333ea', border: '1px solid rgba(168,85,247,0.25)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>school</span>
              Student Portal · Free Forever
            </div>
            <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Manrope, sans-serif', color: '#0f172a', fontSize: 'clamp(1.4rem, 2.2vw, 1.75rem)' }}>
              Start your{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)' }}>scholarship journey</span>
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Join <strong className="text-slate-700">50,000+</strong> students already matched with scholarships.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-xl text-red-700 text-xs flex items-start gap-2"
              style={{ background: '#fff1f2', border: '1px solid #fecdd3' }}>
              <span className="material-symbols-outlined shrink-0" style={{ fontSize: '16px' }}>error</span>
              {error}
            </div>
          )}

          {/* FORM CARD */}
          <div
            className="rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.94)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(168,85,247,0.15)',
              boxShadow: '0 12px 48px rgba(147,51,234,0.1), 0 4px 12px rgba(0,0,0,0.04)',
              padding: 'clamp(16px, 2.5vh, 24px)',
            }}
          >
            <form id="student-signup-form" onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 'clamp(10px, 1.6vh, 16px)' }}>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="first_name" className="block text-[0.7rem] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">First Name</label>
                  <input
                    id="first_name" name="first_name" type="text" placeholder="Alex"
                    autoComplete="given-name" required
                    className="w-full h-10 px-3.5 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 outline-none transition-all font-medium"
                    style={{ background: '#faf8ff', border: '1.5px solid #e9d5ff' }}
                    onFocus={e => { e.currentTarget.style.border = '1.5px solid #9333ea'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.12)'; e.currentTarget.style.background = '#fff'; }}
                    onBlur={e => { e.currentTarget.style.border = '1.5px solid #e9d5ff'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#faf8ff'; }}
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-[0.7rem] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Last Name</label>
                  <input
                    id="last_name" name="last_name" type="text" placeholder="Johnson"
                    autoComplete="family-name" required
                    className="w-full h-10 px-3.5 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 outline-none transition-all font-medium"
                    style={{ background: '#faf8ff', border: '1.5px solid #e9d5ff' }}
                    onFocus={e => { e.currentTarget.style.border = '1.5px solid #9333ea'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.12)'; e.currentTarget.style.background = '#fff'; }}
                    onBlur={e => { e.currentTarget.style.border = '1.5px solid #e9d5ff'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#faf8ff'; }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="signup_email" className="block text-[0.7rem] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">University Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" style={{ fontSize: '17px' }}>mail</span>
                  <input
                    id="signup_email" name="signup_email" type="email"
                    placeholder="alex@university.edu" autoComplete="email" required
                    className="w-full h-10 pl-10 pr-4 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 outline-none transition-all font-medium"
                    style={{ background: '#faf8ff', border: '1.5px solid #e9d5ff' }}
                    onFocus={e => { e.currentTarget.style.border = '1.5px solid #9333ea'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.12)'; e.currentTarget.style.background = '#fff'; }}
                    onBlur={e => { e.currentTarget.style.border = '1.5px solid #e9d5ff'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#faf8ff'; }}
                  />
                </div>
              </div>

              {/* Institution */}
              <div>
                <label htmlFor="institution" className="block text-[0.7rem] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Institution</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" style={{ fontSize: '17px' }}>school</span>
                  <input
                    id="institution" name="institution" type="text"
                    placeholder="e.g. Stanford University"
                    className="w-full h-10 pl-10 pr-4 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 outline-none transition-all font-medium"
                    style={{ background: '#faf8ff', border: '1.5px solid #e9d5ff' }}
                    onFocus={e => { e.currentTarget.style.border = '1.5px solid #9333ea'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.12)'; e.currentTarget.style.background = '#fff'; }}
                    onBlur={e => { e.currentTarget.style.border = '1.5px solid #e9d5ff'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#faf8ff'; }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="signup_password" className="block text-[0.7rem] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" style={{ fontSize: '17px' }}>lock</span>
                  <input
                    id="signup_password" name="signup_password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password" required
                    className="w-full h-10 pl-10 pr-11 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 outline-none transition-all font-medium"
                    style={{ background: '#faf8ff', border: '1.5px solid #e9d5ff' }}
                    onFocus={e => { e.currentTarget.style.border = '1.5px solid #9333ea'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.12)'; e.currentTarget.style.background = '#fff'; }}
                    onBlur={e => { e.currentTarget.style.border = '1.5px solid #e9d5ff'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#faf8ff'; }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-purple-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1.5 mb-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : 'bg-slate-100'}`} />
                      ))}
                    </div>
                    <p className={`text-[0.68rem] font-bold ${strength >= 3 ? 'text-green-600' : strength >= 2 ? 'text-orange-500' : 'text-red-500'}`}>
                      {strengthLabels[strength] || 'Too short'}
                    </p>
                  </div>
                )}
              </div>

              {/* Terms + Submit */}
              <div className="flex items-center gap-2 pt-1">
                <input type="checkbox" id="terms" required className="w-4 h-4 rounded cursor-pointer flex-shrink-0" style={{ accentColor: '#9333ea' }} />
                <label htmlFor="terms" className="text-xs text-slate-500 cursor-pointer leading-snug">
                  I agree to the{' '}
                  <Link href="#" className="font-bold hover:underline" style={{ color: '#9333ea' }}>Terms</Link>{' '}
                  &{' '}
                  <Link href="#" className="font-bold hover:underline" style={{ color: '#9333ea' }}>Privacy Policy</Link>
                </label>
              </div>

              <button
                id="student-signup-btn"
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)',
                  boxShadow: '0 6px 24px rgba(147,51,234,0.35)',
                }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)' }} />
                {loading ? (
                  <><span className="material-symbols-outlined animate-spin" style={{ fontSize: '19px' }}>progress_activity</span> Creating account…</>
                ) : (
                  <>Create My Free Account <span className="material-symbols-outlined" style={{ fontSize: '19px' }}>arrow_forward</span></>
                )}
              </button>
            </form>
          </div>

          {/* Bottom links */}
          <div className="text-center" style={{ paddingTop: 'clamp(4px, 1vh, 12px)' }}>
            <p className="text-slate-500 text-sm mb-1.5">
              Already have an account?{' '}
              <Link href="/login" className="font-bold hover:underline" style={{ color: '#9333ea' }}>Sign in</Link>
            </p>
            <Link href="/provider-login" className="inline-flex items-center gap-1.5 text-slate-400 text-xs hover:text-purple-600 transition-colors font-medium">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>corporate_fare</span>
              Company or Institute? Partner Portal
            </Link>
          </div>
        </div>
      </div>

      {/* ================================================================
          RIGHT — FULL-COVER BRANDING PANEL
      ================================================================ */}
      <div className="hidden lg:block w-[52%] relative overflow-hidden h-full">
        <Image src="/student_signup_hero.png" alt="Students studying together" fill className="object-cover object-center" unoptimized priority />

        {/* Gradient overlays */}
        <div className="absolute inset-x-0 top-0 h-[45%] pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, rgba(9,5,30,0.95) 0%, rgba(9,5,30,0.78) 40%, transparent 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-[35%] pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, rgba(9,5,30,0.97) 0%, rgba(9,5,30,0.7) 55%, transparent 100%)' }} />
        <div className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(9,5,30,0.35) 100%)' }} />
        <div className="absolute top-[-10%] right-[-10%] w-[420px] h-[420px] rounded-full pointer-events-none z-10"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[380px] h-[380px] rounded-full pointer-events-none z-10"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', filter: 'blur(50px)' }} />

        {/* Content layer */}
        <div className="absolute inset-0 z-20 flex flex-col h-full p-10 pb-9 text-white">
          {/* Brand header */}
          <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <img src="/Logo.png.png" alt="ScholarQuest Logo" className="w-8 h-8 rounded-lg object-cover" />
            </div>
            <div>
              <p className="font-extrabold text-white text-[1.05rem] tracking-tight leading-none" style={{ fontFamily: 'Manrope, sans-serif' }}>ScholarQuest</p>
              <p className="text-purple-300 text-[0.62rem] tracking-[0.18em] uppercase mt-1 font-bold">Student Platform</p>
            </div>
          </Link>

          {/* Hero headline */}
          <h2 className="text-[2.4rem] font-extrabold text-white leading-[1.18] max-w-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Find scholarships.<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #c084fc 0%, #60a5fa 100%)' }}>
              Fund your future.
            </span>
          </h2>

          {/* Floating badge: Scholars */}
          <div className="absolute left-7 top-[40%] z-30" style={{ animation: 'studentFloat 4s ease-in-out infinite' }}>
            <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl shadow-2xl"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.25)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)' }}>
                <span className="material-symbols-outlined text-white" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>groups</span>
              </div>
              <div>
                <p className="text-white font-bold text-[0.75rem] leading-none">12,000+ Scholars</p>
                <p className="text-purple-300 text-[0.58rem] uppercase font-bold tracking-wider mt-0.5">Funded This Year</p>
              </div>
            </div>
          </div>

          {/* Floating badge: Funding */}
          <div className="absolute right-7 top-[35%] z-30" style={{ animation: 'studentFloat 5s ease-in-out infinite', animationDelay: '0.8s' }}>
            <div className="px-4 py-3 rounded-2xl shadow-2xl"
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <p className="text-emerald-400 font-extrabold text-xl leading-none" style={{ fontFamily: 'Manrope, sans-serif' }}>₹2,500 Cr</p>
              <p className="text-slate-300 text-[0.58rem] uppercase font-bold tracking-wider mt-1">Funds Available</p>
            </div>
          </div>

          {/* Testimonial card */}
          <div className="absolute right-5 bottom-[22%] z-30" style={{ animation: 'studentFloat 6s ease-in-out infinite', animationDelay: '1.5s' }}>
            <div className="p-4 rounded-2xl shadow-2xl max-w-[210px]"
              style={{ background: 'rgba(9,5,30,0.82)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-amber-400" style={{ fontSize: '11px', fontVariationSettings: "'FILL' 1" }}>star</span>)}
              </div>
              <p className="text-slate-300 text-[0.7rem] italic leading-snug mb-3">"Within 2 weeks I matched with 34 scholarships I was eligible for. I won 3!"</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #9333ea, #3b82f6)' }}>PR</div>
                <p className="text-white font-bold text-[0.65rem]">Priya R., <span className="font-normal text-slate-400">UC Berkeley</span></p>
              </div>
            </div>
          </div>

          <div className="flex-1" />

          {/* Feature pills */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'AI\nMatching', icon: 'psychology', gradient: 'linear-gradient(135deg,#9333ea,#7c3aed)' },
              { label: 'Track\nDeadlines', icon: 'event_available', gradient: 'linear-gradient(135deg,#3b82f6,#0ea5e9)' },
              { label: 'Always\nFree', icon: 'volunteer_activism', gradient: 'linear-gradient(135deg,#10b981,#059669)' },
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
          @keyframes studentFloat {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-10px); }
          }
        `}</style>
      </div>
    </div>
  );
}
