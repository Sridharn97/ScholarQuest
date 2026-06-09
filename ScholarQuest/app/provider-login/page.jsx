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
    <div className="min-h-screen flex bg-slate-50">

      {/* ===== LEFT: LIGHT STATS & PREVIEW PANEL ===== */}
      <div className="hidden lg:flex w-[52%] flex-col relative overflow-hidden border-r border-slate-200/60" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)' }}>
        <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(0,74,198,0.1)' }} />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(113,42,226,0.08)' }} />

        <div className="relative z-10 flex flex-col h-full p-12">
          <Link href="/" className="flex items-center gap-3 mb-14">
            <div className="w-10 h-10 rounded-10 flex items-center justify-center bg-primary shadow-md">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-lg tracking-tight leading-none">ScholarQuest</p>
              <p className="text-slate-400 text-[10px] tracking-widest uppercase mt-1 font-bold">Sponsor Portal</p>
            </div>
          </Link>

          <div className="mb-10">
            <h1 className="text-5xl font-extrabold text-slate-900 leading-[1.15] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Host Scholarships.<br />
              <span style={{ background: 'linear-gradient(90deg, #004ac6, #712ae2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fund Futures.</span>
            </h1>
            <p className="text-slate-600 text-base leading-relaxed max-w-sm font-medium">
              The dashboard for corporate and institutional partners to create scholarships, track applicant milestones, and fund the next generation of leaders.
            </p>
          </div>

          <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-slate-200/80 shadow-md mb-8 bg-white">
            <Image
              src="/provider_login_hero.png"
              alt="Sponsor Portal Illustration"
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-slate-200/50 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0 animate-pulse" />
                <p className="text-slate-800 text-xs font-bold">Sponsor Portal Active</p>
                <span className="ml-auto text-slate-500 text-[10px] font-semibold">Live</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '5,000+', label: 'Active Applications', icon: 'description', color: 'text-primary', bg: 'bg-primary/10' },
              { value: '$1.2M', label: 'Allocated Funds', icon: 'payments', color: 'text-green-600', bg: 'bg-green-100' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className={`w-10 h-10 rounded-10 ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-symbols-outlined ${stat.color}`} style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                </div>
                <div>
                  <p className="text-slate-900 font-extrabold text-lg leading-none" style={{ fontFamily: 'Manrope, sans-serif' }}>{stat.value}</p>
                  <p className="text-slate-500 text-xs mt-1 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT: FORM PANEL ===== */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-white">
        <div className="w-full max-w-[400px]">
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-10 flex items-center justify-center bg-primary">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
            </div>
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
            <div className="space-y-1.5">
              <label htmlFor="provider_email" className="block text-sm font-semibold text-slate-700">Institutional Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style={{ fontSize: '18px' }}>mail</span>
                <input
                  id="provider_email"
                  name="provider_email"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  className="w-full h-11 pl-10 pr-4 rounded-10 text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="provider_password" className="block text-sm font-semibold text-slate-700">Password</label>
                <Link href="#" className="text-sm text-primary font-medium hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style={{ fontSize: '18px' }}>lock</span>
                <input
                  id="provider_password"
                  name="provider_password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full h-11 pl-10 pr-12 rounded-10 text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full h-11 bg-primary text-white rounded-10 text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/20 disabled:opacity-60"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>progress_activity</span>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
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
