'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateLogin, setSession } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const email = e.target.login_email.value.trim();
    const password = e.target.login_password.value;

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    const user = validateLogin(email, password);
    if (!user) {
      setLoading(false);
      setError('Invalid email or password. Please try again.');
      return;
    }
    setSession(user);
    setTimeout(() => router.push('/dashboard'), 300);
  };

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

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-10 text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
              {error}
            </div>
          )}

          {/* Demo hint */}
          <div className="mb-6 p-3 bg-primary/5 border border-primary/20 rounded-10 text-sm text-primary flex items-start gap-2">
            <span className="material-symbols-outlined shrink-0" style={{ fontSize: '18px' }}>info</span>
            <span>Don&apos;t have an account? <Link href="/signup" className="font-bold underline">Sign up first</Link>, then log in with your credentials.</span>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label htmlFor="login_email" className="block text-sm font-semibold text-gray-700">Email address</label>
              <input
                id="login_email"
                name="login_email"
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
                  name="login_password"
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

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white rounded-10 text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/20 disabled:opacity-60"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>progress_activity</span>
              ) : (
                <>Sign In to ScholarQuest <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span></>
              )}
            </button>
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
