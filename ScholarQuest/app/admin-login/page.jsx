'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #060d1f 0%, #0a1428 100%)' }}>

      {/* ===== LEFT: DARK STATS PANEL ===== */}
      <div className="hidden lg:flex w-[52%] flex-col relative overflow-hidden border-r border-white/5">
        {/* Ambient glows */}
        <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(0,74,198,0.3)' }} />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(113,42,226,0.2)' }} />

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 mb-14">
            <div className="w-10 h-10 rounded-10 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #004ac6, #712ae2)' }}>
              <span className="material-symbols-outlined text-white" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>shield</span>
            </div>
            <div>
              <p className="font-extrabold text-white text-lg tracking-tight leading-none">ScholarQuest</p>
              <p className="text-white/40 text-xs tracking-widest uppercase">Admin Portal</p>
            </div>
          </Link>

          {/* Heading */}
          <div className="mb-12">
            <h1 className="text-5xl font-extrabold text-white leading-[1.1] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Manage with<br />
              <span style={{ background: 'linear-gradient(90deg, #7eb3ff, #c4b0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Precision.</span>
            </h1>
            <p className="text-white/50 text-base leading-relaxed max-w-sm">
              The administrative command center for oversight, student management, and scholarship lifecycle operations.
            </p>
          </div>

          {/* Admin dashboard image */}
          <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 mb-10 flex-1 min-h-[220px]">
            <Image src="/admin_dashboard.png" alt="Admin Dashboard" fill className="object-cover object-center" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #060d1f 0%, transparent 50%)' }} />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10">
                <div className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0" />
                <p className="text-white text-sm font-semibold">All systems operational</p>
                <span className="ml-auto text-white/50 text-xs">Live</span>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '24,500', label: 'Active Students', icon: 'group', color: 'text-blue-400', bg: 'bg-blue-400/10' },
              { value: '3,240', label: 'Applications', icon: 'description', color: 'text-violet-400', bg: 'bg-violet-400/10' },
              { value: '$1.2M', label: 'Funds Managed', icon: 'payments', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              { value: '88%', label: 'Success Rate', icon: 'verified', color: 'text-amber-400', bg: 'bg-amber-400/10' },
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
          {/* Mobile brand */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-10 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #004ac6, #712ae2)' }}>
              <span className="material-symbols-outlined text-white" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>shield</span>
            </div>
            <p className="font-extrabold text-white text-lg tracking-tight">ScholarQuest Admin</p>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-white mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>Administrator Sign In</h2>
            <p className="text-white/50 text-sm">Restricted access. Authorized personnel only.</p>
          </div>

          {/* Security banner */}
          <div className="flex items-center gap-3 rounded-10 px-4 py-3 mb-6 border border-blue-500/20" style={{ background: 'rgba(0,74,198,0.12)' }}>
            <span className="material-symbols-outlined text-blue-400 flex-shrink-0" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>lock</span>
            <p className="text-blue-300 text-sm">Secured with 256-bit encryption</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label htmlFor="admin_email" className="block text-sm font-semibold text-white/70">Admin Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" style={{ fontSize: '18px' }}>mail</span>
                <input
                  id="admin_email"
                  type="email"
                  placeholder="admin@scholarquest.io"
                  autoComplete="email"
                  className="w-full h-11 pl-10 pr-4 rounded-10 text-sm text-white placeholder:text-white/25 border border-white/10 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label htmlFor="admin_password" className="block text-sm font-semibold text-white/70">Password</label>
                <Link href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" style={{ fontSize: '18px' }}>lock</span>
                <input
                  id="admin_password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-11 pl-10 pr-12 rounded-10 text-sm text-white placeholder:text-white/25 border border-white/10 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <input type="checkbox" id="admin_remember" className="w-4 h-4 rounded border-white/20 text-blue-500 accent-blue-500 cursor-pointer" />
              <label htmlFor="admin_remember" className="text-sm text-white/50 cursor-pointer">Keep me signed in for 8 hours</label>
            </div>

            <Link
              href="/admin"
              className="flex items-center justify-center gap-2 w-full h-11 rounded-10 text-sm font-bold text-white hover:opacity-90 active:scale-[0.98] transition-all shadow-lg"
              style={{ background: 'linear-gradient(135deg, #004ac6 0%, #712ae2 100%)', boxShadow: '0 8px 24px rgba(0,74,198,0.4)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>shield</span>
              Sign In to Admin Panel
            </Link>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-white/25 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <p className="text-center text-white/40 text-sm mb-2">
            Need an admin account?{' '}
            <Link href="/admin-signup" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Request Access</Link>
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
