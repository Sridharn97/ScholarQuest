'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { validateProviderLogin, setProviderSession, isProviderLoggedIn, ensureDefaults, isLoggedIn } from '@/lib/store';

export default function ProviderLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ensureDefaults();
    if (isProviderLoggedIn()) {
      window.location.href = '/provider';
    } else if (isLoggedIn()) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const email = e.target.provider_email.value.trim();
    const password = e.target.provider_password.value;

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    const provider = validateProviderLogin(email, password);
    if (!provider) {
      setLoading(false);
      setError('Invalid email or password. Please try again.');
      return;
    }
    setProviderSession(provider);
    window.location.href = '/provider';
  };

  return (
    <div className="h-screen overflow-hidden flex bg-slate-50">

      {/* ===== LEFT: LIGHT STATS & PREVIEW PANEL ===== */}
      <div className="hidden lg:flex w-[52%] flex-col relative overflow-hidden border-r border-purple-100/50 h-full bg-gradient-to-br from-[#faf5ff] via-[#fdf2f8] to-[#fffbeb]">
        {/* Colorful floating orbs to match illustrations */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-40 filter blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(216,180,254,0.5) 0%, rgba(216,180,254,0) 70%)' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-40 filter blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(249,168,212,0.5) 0%, rgba(249,168,212,0) 70%)' }} />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full opacity-30 filter blur-[60px]" style={{ background: 'radial-gradient(circle, rgba(253,186,116,0.3) 0%, rgba(253,186,116,0) 70%)' }} />

        <div className="relative z-10 flex flex-col h-full p-10 justify-between">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-8">
              <img src="/Logo.png.png" alt="Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" />
              <div>
                <p className="font-extrabold text-slate-900 text-base tracking-tight leading-none">ScholarQuest</p>
                <p className="text-slate-500 text-[9px] tracking-widest uppercase mt-0.5 font-bold">Sponsor Portal</p>
              </div>
            </Link>

            <div className="mb-4">
              <h1 className="text-4xl font-extrabold text-slate-900 leading-[1.2] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Host Scholarships.<br />
                <span className="text-primary">Fund Futures.</span>
              </h1>
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm font-medium">
                The dashboard for corporate and institutional partners to create scholarships, track applicant milestones, and fund the next generation of leaders.
              </p>
            </div>
          </div>

          <div className="relative w-[350px] h-[350px] mx-auto my-4 rounded-3xl overflow-hidden border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white/40 backdrop-blur-md flex items-center justify-center p-4">
            <Image
              src="/provider_login_hero_new.png"
              alt="Sponsor Portal Illustration"
              width={350}
              height={350}
              className="w-full h-full object-contain drop-shadow-md"
              unoptimized
            />
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 border border-slate-200/50 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 animate-pulse" />
                <p className="text-slate-800 text-[11px] font-bold">Sponsor Portal Active</p>
                <span className="ml-auto text-slate-500 text-[9px] font-semibold">Live</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            {[
              { value: '5,000+', label: 'Active Applications', icon: 'description', color: 'text-primary', bg: 'bg-primary/10' },
              { value: '$1.2M', label: 'Allocated Funds', icon: 'payments', color: 'text-green-600', bg: 'bg-green-100' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 p-3 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-md shadow-sm">
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-symbols-outlined ${stat.color}`} style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                </div>
                <div>
                  <p className="text-slate-900 font-extrabold text-base leading-none" style={{ fontFamily: 'Manrope, sans-serif' }}>{stat.value}</p>
                  <p className="text-slate-500 text-[10px] mt-0.5 font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT: FORM PANEL ===== */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-white h-full overflow-y-auto">
        <div className="w-full max-w-[400px] py-4">
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <img src="/Logo.png.png" alt="Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" />
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
