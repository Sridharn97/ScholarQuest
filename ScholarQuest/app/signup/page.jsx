'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColors = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];

function getStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const strength = getStrength(password);

  return (
    <div className="min-h-screen bg-background flex">
      {/* ===== LEFT: FORM PANEL ===== */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-white order-1 lg:order-none">
        <div className="w-full max-w-[440px]">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 mb-10">
            <span className="text-primary font-extrabold text-2xl tracking-tight">ScholarQuest</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Create your account</h1>
            <p className="text-gray-500 text-base">Already have an account?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
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

          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700">First Name</label>
                <input id="first_name" type="text" placeholder="Alex" className="w-full h-11 px-4 border border-gray-200 rounded-10 text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all" required />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700">Last Name</label>
                <input id="last_name" type="text" placeholder="Johnson" className="w-full h-11 px-4 border border-gray-200 rounded-10 text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all" required />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="signup_email" className="block text-sm font-semibold text-gray-700">University Email</label>
              <input id="signup_email" type="email" placeholder="alex@university.edu" autoComplete="email" className="w-full h-11 px-4 border border-gray-200 rounded-10 text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all" required />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="signup_password" className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="signup_password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  className="w-full h-11 px-4 pr-12 border border-gray-200 rounded-10 text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              {password.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${strength >= 3 ? 'text-green-600' : strength >= 2 ? 'text-orange-500' : 'text-red-500'}`}>
                    {strengthLabels[strength] || 'Too short'}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="institution" className="block text-sm font-semibold text-gray-700">Institution</label>
              <input id="institution" type="text" placeholder="e.g. Stanford University" className="w-full h-11 px-4 border border-gray-200 rounded-10 text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all" />
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input type="checkbox" id="terms" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary accent-primary cursor-pointer" required />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-snug">
                I agree to the{' '}
                <Link href="#" className="text-primary font-medium hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link href="#" className="text-primary font-medium hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <Link
              href="/onboarding"
              className="flex items-center justify-center gap-2 w-full h-11 bg-primary text-white rounded-10 text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/20 mt-2"
            >
              Create My Account
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </Link>
          </form>
        </div>
      </div>

      {/* ===== RIGHT: ILLUSTRATION PANEL ===== */}
      <div className="hidden lg:flex w-[48%] relative flex-col overflow-hidden order-last" style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #001e6b 40%, #1a0a2e 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #b4c5ff 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #d2bbff 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />

        <div className="relative z-10 flex-1 flex flex-col justify-between p-12">
          {/* Quote */}
          <div className="bg-white/8 backdrop-blur-sm rounded-3xl p-7 border border-white/10">
            <div className="flex gap-1 mb-4">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="material-symbols-outlined text-amber-400" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <p className="text-white/90 text-lg font-semibold leading-relaxed mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              &ldquo;Within 2 weeks of creating my profile, I had matched with 34 scholarships I was eligible for. I won 3 of them.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-10 bg-white/15 border border-white/20 flex items-center justify-center font-bold text-white">PR</div>
              <div>
                <p className="text-white font-semibold text-sm">Priya Rao</p>
                <p className="text-white/50 text-xs">Data Science, UC Berkeley</p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex-1 my-8 rounded-3xl overflow-hidden border border-white/10">
            <Image src="/signup_illustration.png" alt="Students finding scholarships" fill sizes="48vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/70 via-transparent to-transparent" />
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '50K+', label: 'Scholarships' },
              { value: '$250M', label: 'Total Funding' },
              { value: 'Free', label: 'Always' },
            ].map((s) => (
              <div key={s.label} className="text-center bg-white/8 rounded-2xl py-4 border border-white/10">
                <p className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.value}</p>
                <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
