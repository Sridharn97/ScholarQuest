'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validateLogin, setSession, isLoggedIn, isProviderLoggedIn } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect immediately
  useEffect(() => {
    if (isLoggedIn()) {
      router.replace('/dashboard');
    } else if (isProviderLoggedIn()) {
      router.replace('/provider');
    }
  }, [router]);

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
    // Use window.location for a hard navigation to guarantee the redirect works
    window.location.href = '/dashboard';
  };

  return (
    <div className="h-screen overflow-hidden flex bg-background">
      {/* ===== LEFT: ILLUSTRATION PANEL ===== */}
      <div className="hidden lg:flex w-[52%] relative flex-col overflow-hidden h-full border-r border-white/5" style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #001e6b 50%, #1a0a2e 100%)' }}>
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #b4c5ff 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

        <div className="relative z-10 flex flex-col h-full p-6 lg:p-8 2xl:p-10 justify-between">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <img src="/Logo.png.png" alt="Logo" className="w-9 h-9 rounded-full object-cover border-2 border-white/20" />
              <span className="text-white font-extrabold text-xl tracking-tight">ScholarQuest</span>
            </Link>
          </div>

          <div className="my-auto py-2">
            <div className="mb-4 max-w-xl 2xl:max-w-2xl">
              <h2 className="text-3xl xl:text-[38px] 2xl:text-[42px] font-extrabold text-white leading-[1.15] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Welcome back.<br />Your opportunities are waiting.
              </h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-md font-medium">
                Thousands of new scholarships are added every week. Sign in to see your latest AI-powered matches.
              </p>
            </div>

            <div className="relative w-full max-w-[420px] xl:max-w-[500px] 2xl:max-w-[560px] aspect-square max-h-[40vh] xl:max-h-[44vh] 2xl:max-h-[46vh] mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-lg bg-white/5 backdrop-blur-md mb-4">
              <Image
                src="/student_login_hero.png"
                alt="Student Success Illustration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: 'auto_awesome', text: '98% Match accuracy' },
                { icon: 'schedule', text: 'Smart reminders' },
                { icon: 'trending_up', text: 'Track applications' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 p-2.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white/90" style={{ fontSize: '15px', fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  </div>
                  <span className="text-white/90 text-[10px] font-semibold leading-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== RIGHT: FORM PANEL ===== */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-white h-full overflow-y-auto">
        <div className="w-full max-w-[420px] py-4">
          <Link href="/" className="flex items-center gap-2.5 mb-10 lg:hidden">
            <img src="/Logo.png.png" alt="Logo" className="w-9 h-9 rounded-full object-cover" />
            <span className="text-primary font-extrabold text-2xl tracking-tight">ScholarQuest</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Sign in</h1>
            <p className="text-gray-500 text-base">New to ScholarQuest?{' '}
              <Link href="/signup" className="text-primary font-semibold hover:underline">Create an account</Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-10 text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined shrink-0" style={{ fontSize: '18px' }}>error</span>
              {error}
            </div>
          )}

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
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
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

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link href="/provider-login" className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-primary transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>corporate_fare</span>
              Company or Institute? Access Partner Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
