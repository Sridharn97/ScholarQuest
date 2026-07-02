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
    <div className="theme-admin h-screen overflow-hidden flex bg-slate-50">

      {/* ===== LEFT: PREMIUM CORPORATE PANEL ===== */}
      <div className="hidden lg:flex w-1/2 flex-col relative overflow-hidden h-full bg-[#0B132B] text-white">
        {/* Deep, rich background gradients and orbs for a premium tech feel */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-30 filter blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.5) 0%, rgba(56,189,248,0) 70%)' }} />
        <div className="absolute bottom-[-10%] left-[-20%] w-[500px] h-[500px] rounded-full opacity-30 filter blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 70%)' }} />

        <div className="relative z-10 flex flex-col h-full p-10 pb-12 justify-between">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-8 group w-fit">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <img src="/logo_provider.png" alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
              </div>
              <div>
                <p className="font-extrabold text-white text-lg tracking-tight leading-none">ScholarQuest</p>
                <p className="text-blue-300 text-[10px] tracking-widest uppercase mt-1 font-bold">Partner Portal</p>
              </div>
            </Link>

            <div className="mb-4 max-w-md">
              <h1 className="text-4xl font-extrabold text-white leading-[1.2] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Invest in brilliance.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Scale your impact.</span>
              </h1>
            </div>
          </div>

          <div className="relative w-full max-w-[380px] mx-auto my-auto shrink-0">
            {/* The Hero Image Container */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white/5 backdrop-blur-xl flex items-center justify-center z-10">
              <Image
                src="/sponsor_login_hero.png"
                alt="Sponsor Portal Illustration"
                width={1000}
                height={1000}
                className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
                unoptimized
                priority
                loading="eager"
              />
            </div>

            {/* Floating Glassmorphism Elements */}
            <div className="absolute -right-6 top-[20%] z-20 animate-[float_4s_ease-in-out_infinite]">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex items-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>check_circle</span>
                </div>
                <div>
                  <p className="text-white font-bold text-xs">99% Placement</p>
                  <p className="text-green-300 text-[9px] uppercase font-bold tracking-wider">Verified Match</p>
                </div>
              </div>
            </div>

            <div className="absolute -left-8 bottom-[15%] z-20 animate-[float_5s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
              <div className="bg-[#0B132B]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl max-w-[200px]">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="material-symbols-outlined text-yellow-400" style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-slate-300 text-xs italic leading-snug mb-3">
                  "ScholarQuest allowed us to effortlessly deploy our CSR funds to the most deserving candidates globally."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[9px] font-bold text-white">MK</div>
                  <p className="text-white font-bold text-[10px]">Maria K., <span className="font-normal text-slate-400">Global Tech</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '500+', label: 'Corporate Partners', icon: 'handshake', color: 'text-blue-400', border: 'border-blue-400/30' },
              { value: '$50M+', label: 'Funds Distributed', icon: 'account_balance', color: 'text-purple-400', border: 'border-purple-400/30' },
            ].map((stat) => (
              <div key={stat.label} className={`flex items-center gap-3 p-4 rounded-2xl border ${stat.border} bg-white/5 backdrop-blur-md shadow-lg hover:bg-white/10 transition-colors`}>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className={`material-symbols-outlined ${stat.color}`} style={{ fontSize: '22px', fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                </div>
                <div>
                  <p className="text-white font-extrabold text-lg leading-none" style={{ fontFamily: 'Manrope, sans-serif' }}>{stat.value}</p>
                  <p className="text-slate-400 text-[10px] mt-1 font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT: FORM PANEL ===== */}
      <div className="flex-1 bg-white h-full overflow-hidden flex flex-col justify-center items-center px-8">
        <div className="w-full max-w-[480px]">
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <img src="/logo_provider.png" alt="Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" />
            <p className="font-extrabold text-slate-900 text-lg tracking-tight">ScholarQuest Portal</p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>Sponsor Sign In</h2>
            <p className="text-slate-500 text-base">Access your Company or Institute scholarship portal.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-10 text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined shrink-0" style={{ fontSize: '18px' }}>error</span>
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="provider_email" className="block text-sm font-bold text-slate-700">Institutional Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style={{ fontSize: '20px' }}>mail</span>
                <input
                  id="provider_email"
                  name="provider_email"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  className="w-full h-12 pl-10 pr-4 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm hover:border-slate-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="provider_password" className="block text-sm font-bold text-slate-700">Password</label>
                <Link href="#" className="text-sm text-primary font-bold hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style={{ fontSize: '20px' }}>lock</span>
                <input
                  id="provider_password"
                  name="provider_password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full h-12 pl-10 pr-12 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm hover:border-slate-300"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full h-12 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/25 disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: '20px' }}>progress_activity</span>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
                  Sign In to Partner Portal
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-200/80" />
            <span className="text-xs text-slate-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-slate-200/80" />
          </div>

          <p className="text-center text-slate-500 text-sm mb-2">
            No partner account?{' '}
            <Link href="/provider-signup" className="text-primary font-semibold hover:underline">Create account</Link>
          </p>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 text-slate-500 text-sm hover:text-primary transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
              Back to Student Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
