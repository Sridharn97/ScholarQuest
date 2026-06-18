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
    <div className="h-screen overflow-hidden flex bg-white">
      {/* ===== LEFT: FORM PANEL ===== */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 bg-white h-full overflow-hidden order-1 lg:order-2">
        <div className="w-full max-w-[440px] py-4">
          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <img src="/Logo.png.png" alt="Logo" className="w-9 h-9 rounded-full object-cover" />
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" style={{ fontFamily: 'Manrope, sans-serif' }}>ScholarQuest</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Sign in</h1>
            <p className="text-gray-500 text-base">New to ScholarQuest?{' '}
              <Link href="/signup" className="text-primary font-semibold hover:underline">Create an account</Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-10 text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="login_email" className="block text-sm font-bold text-gray-700">Email address</label>
              <input
                id="login_email"
                name="login_email"
                type="email"
                placeholder="alex@university.edu"
                autoComplete="email"
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm hover:border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="login_password" className="block text-sm font-bold text-gray-700">Password</label>
                <Link href="#" className="text-sm text-primary font-bold hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  id="login_password"
                  name="login_password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-12 px-4 pr-12 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm hover:border-gray-300"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <input type="checkbox" id="remember_me" className="w-4 h-4 rounded border-gray-300 text-primary accent-primary cursor-pointer shadow-sm" />
              <label htmlFor="remember_me" className="text-sm text-gray-600 cursor-pointer font-medium">Remember me for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full h-12 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/25 disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: '20px' }}>progress_activity</span>
              ) : (
                <>Sign In to ScholarQuest <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link href="/provider-login" className="inline-flex items-center justify-center gap-2 text-gray-600 text-sm hover:text-primary hover:bg-primary/5 px-4 py-2.5 rounded-xl transition-all font-semibold w-full">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>corporate_fare</span>
              Company or Institute? Access Partner Portal
            </Link>
          </div>
        </div>
      </div>

      {/* ===== RIGHT: ILLUSTRATION PANEL ===== */}
      <div className="hidden lg:flex w-[48%] relative flex-col overflow-hidden h-full bg-gradient-to-br from-[#faf5ff] via-[#fdf2f8] to-[#fffbeb] border-r border-purple-100/50 order-last lg:order-1">
        {/* Colorful floating orbs to match illustrations */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-40 filter blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(216,180,254,0.5) 0%, rgba(216,180,254,0) 70%)' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-40 filter blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(249,168,212,0.5) 0%, rgba(249,168,212,0) 70%)' }} />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full opacity-30 filter blur-[60px]" style={{ background: 'radial-gradient(circle, rgba(253,186,116,0.3) 0%, rgba(253,186,116,0) 70%)' }} />

        <div className="relative z-10 flex flex-col justify-between p-10 h-full">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-sm">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className="material-symbols-outlined text-amber-400" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <p className="text-gray-700 text-base font-semibold leading-relaxed mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              &ldquo;ScholarQuest has completely changed my life. I log in every day to find new opportunities, and the matches are spot on.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs">AJ</div>
              <div>
                <p className="text-gray-900 font-semibold text-xs">Alex Johnson</p>
                <p className="text-gray-500 text-[10px]">Computer Science, Stanford</p>
              </div>
            </div>
          </div>

          <div className="relative w-[340px] h-[340px] mx-auto my-4 rounded-3xl overflow-hidden border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white/40 backdrop-blur-md flex items-center justify-center p-4">
            <Image 
              src="/student_login_hero_new_2.png" 
              alt="Student Success Illustration" 
              width={340}
              height={340}
              className="w-full h-full object-contain drop-shadow-md" 
              unoptimized
              priority
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { value: '98%', label: 'Match Accuracy' },
              { value: '24/7', label: 'Smart Reminders' },
              { value: '1-Click', label: 'Applications' },
            ].map((s) => (
              <div key={s.label} className="text-center bg-white/70 backdrop-blur-md rounded-xl py-2.5 border border-white/80 shadow-sm hover:bg-white/90 transition-colors">
                <p className="text-xl font-extrabold text-primary" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.value}</p>
                <p className="text-gray-500 text-[9px] mt-0.5 font-medium uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
