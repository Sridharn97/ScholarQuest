'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { validateProviderLogin, setProviderSession, isProviderLoggedIn, ensureDefaults } from '@/lib/store';

export default function ProviderLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ensureDefaults();
    if (isProviderLoggedIn()) {
      window.location.href = '/provider';
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
      setError('Invalid credentials. Try: provider@scholarquest.io / provider123');
      return;
    }
    setProviderSession(provider);
    window.location.href = '/provider';
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #060d1f 0%, #0a1428 100%)' }}>

      {/* ===== LEFT: DARK STATS PANEL ===== */}
      <div className="hidden lg:flex w-[52%] flex-col relative overflow-hidden border-r border-white/5">
        <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(0,74,198,0.3)' }} />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(113,42,226,0.2)' }} />

        <div className="relative z-10 flex flex-col h-full p-12">
          <Link href="/" className="flex items-center gap-3 mb-14">
            <div className="w-10 h-10 rounded-10 flex items-center justify-center bg-primary">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
            </div>
            <div>
              <p className="font-extrabold text-white text-lg tracking-tight leading-none">ScholarQuest</p>
              <p className="text-white/40 text-xs tracking-widest uppercase mt-0.5">Sponsor Portal</p>
            </div>
          </Link>

          <div className="mb-12">
            <h1 className="text-5xl font-extrabold text-white leading-[1.1] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Host Scholarships.<br />
              <span style={{ background: 'linear-gradient(90deg, #7eb3ff, #c4b0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fund Futures.</span>
            </h1>
            <p className="text-white/50 text-base leading-relaxed max-w-sm">
              The dashboard for corporate and institutional partners to create scholarships, track applicant milestones, and fund the next generation of leaders.
            </p>
          </div>

          <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 mb-10 flex-1 min-h-[220px]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-white opacity-20" style={{ fontSize: '120px', fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #060d1f 0%, transparent 50%)' }} />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10">
                <div className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0" />
                <p className="text-white text-sm font-semibold">Sponsor services active</p>
                <span className="ml-auto text-white/50 text-xs">Live</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '5,000+', label: 'Active Applications', icon: 'description', color: 'text-violet-400', bg: 'bg-violet-400/10' },
              { value: '$1.2M', label: 'Allocated Funds', icon: 'payments', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 p-4 rounded-2xl border border-white/8" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className={`w-10 h-10 rounded-10 ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-symbols-outlined ${stat.color}`} style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                </div>
                <div>
                  <p className="text-white font-extrabold text-lg leading-none" style={{ fontFamily: 'Manrope, sans-serif' }}>{stat.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT: FORM PANEL ===== */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12">
        <div className="w-full max-w-[400px]">
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-10 flex items-center justify-center bg-primary">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
            </div>
            <p className="font-extrabold text-white text-lg tracking-tight">ScholarQuest Portal</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-white mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>Sponsor Sign In</h2>
            <p className="text-white/50 text-sm">Access your Company or Institute scholarship portal.</p>
          </div>

          {/* Demo Credentials hint */}
          <div className="flex items-start gap-3 rounded-10 px-4 py-3 mb-4 border border-blue-500/20" style={{ background: 'rgba(0,74,198,0.12)' }}>
            <span className="material-symbols-outlined text-blue-400 flex-shrink-0" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>info</span>
            <div>
              <p className="text-blue-300 text-xs font-bold mb-1">Demo Credentials</p>
              <p className="text-blue-200/70 text-xs">Email: <span className="font-mono text-blue-200">provider@scholarquest.io</span></p>
              <p className="text-blue-200/70 text-xs">Password: <span className="font-mono text-blue-200">provider123</span></p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-10 text-red-300 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined shrink-0" style={{ fontSize: '18px' }}>error</span>
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label htmlFor="provider_email" className="block text-sm font-semibold text-white/70">Institutional Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/30" style={{ fontSize: '18px' }}>mail</span>
                <input
                  id="provider_email"
                  name="provider_email"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  className="w-full h-11 pl-10 pr-4 rounded-10 text-sm text-white placeholder:text-white/25 border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label htmlFor="provider_password" className="block text-sm font-semibold text-white/70">Password</label>
                <Link href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/30" style={{ fontSize: '18px' }}>lock</span>
                <input
                  id="provider_password"
                  name="provider_password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full h-11 pl-10 pr-12 rounded-10 text-sm text-white placeholder:text-white/25 border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full h-11 rounded-10 text-sm font-bold text-white hover:opacity-90 active:scale-[0.98] transition-all shadow-lg disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #004ac6 0%, #712ae2 100%)', boxShadow: '0 8px 24px rgba(0,74,198,0.4)' }}
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
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-white/25 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <p className="text-center text-white/40 text-sm mb-2">
            No partner account?{' '}
            <Link href="/provider-signup" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Create account</Link>
          </p>

          <div className="mt-8 pt-6 border-t border-white/8 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 text-white/30 text-sm hover:text-white/60 transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
              Back to Student Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
