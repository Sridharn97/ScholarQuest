'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* ===== LEFT: ILLUSTRATION PANEL ===== */}
      <div className="hidden lg:flex w-[52%] relative flex-col overflow-hidden" style={{ background: 'linear-gradient(135deg, #001e6b 0%, #004ac6 50%, #712ae2 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #b4c5ff 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

        {/* Top brand */}
        <div className="relative z-10 p-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-10 flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">ScholarQuest</span>
          </Link>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-12">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Welcome back.<br />
            Your opportunities<br />
            are waiting.
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-10 max-w-sm">
            Thousands of new scholarships are added every week. Sign in to see your latest AI-powered matches.
          </p>

          {/* Feature chips */}
          <div className="space-y-3 mb-10">
            {[
              { icon: 'auto_awesome', text: '98% match accuracy with AI profiling' },
              { icon: 'schedule', text: 'Smart deadline reminders sent automatically' },
              { icon: 'trending_up', text: 'Track every application in one dashboard' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 bg-white/10 rounded-10 px-4 py-3 backdrop-blur-sm">
                <span className="material-symbols-outlined text-white/90 flex-shrink-0" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                <span className="text-white/90 text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-white/10">
            <Image src="/student_success.png" alt="Scholar success" fill sizes="52vw" className="object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-white font-bold text-sm">Jordan M. — Berkeley &apos;25</p>
              <p className="text-white/70 text-xs">Won $45,000 Full-Ride Scholarship</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== RIGHT: FORM PANEL ===== */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-white">
        <div className="w-full max-w-[420px]">
          {/* Mobile brand */}
          <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <span className="text-primary font-extrabold text-2xl tracking-tight">ScholarQuest</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Sign in</h1>
            <p className="text-gray-500 text-base">New to ScholarQuest?{' '}
              <Link href="/signup" className="text-primary font-semibold hover:underline">Create an account</Link>
            </p>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 h-11 border border-gray-200 rounded-10 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 h-11 border border-gray-200 rounded-10 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or continue with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label htmlFor="login_email" className="block text-sm font-semibold text-gray-700">Email address</label>
              <input
                id="login_email"
                type="email"
                placeholder="alex@university.edu"
                autoComplete="email"
                className="w-full h-11 px-4 border border-gray-200 rounded-10 text-sm text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="login_password" className="block text-sm font-semibold text-gray-700">Password</label>
                <Link href="#" className="text-sm text-primary font-medium hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  id="login_password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-11 px-4 pr-12 border border-gray-200 rounded-10 text-sm text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <input type="checkbox" id="remember_me" className="w-4 h-4 rounded border-gray-300 text-primary accent-primary cursor-pointer" />
              <label htmlFor="remember_me" className="text-sm text-gray-600 cursor-pointer">Remember me for 30 days</label>
            </div>

            <Link
              href="/dashboard"
              className="flex flex-col items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white rounded-10 text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/20"
            >
              <div className="flex items-center gap-2">
                Sign In to ScholarQuest
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
              </div>
              <span className="text-[10px] opacity-80 font-normal text-center">
                Join a community of 12,000+ scholars who&apos;ve secured funding through ScholarQuest.
              </span>
            </Link>
          </form>

          {/* Admin link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link href="/admin-login" className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-primary transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>shield</span>
              Administrator? Access Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
