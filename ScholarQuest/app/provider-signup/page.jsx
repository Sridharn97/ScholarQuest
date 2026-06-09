'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { registerProvider, setProviderSession, isLoggedIn } from '@/lib/store';

export default function ProviderSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const firstName = e.target.first_name.value.trim();
    const lastName = e.target.last_name.value.trim();
    const email = e.target.provider_email.value.trim();
    const password = e.target.provider_password.value;
    const organization = e.target.organization.value.trim();
    const entityType = e.target.entity_type.value;

    if (!firstName || !lastName || !email || !password || !organization) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setLoading(false);
      return;
    }

    const provider = registerProvider({
      firstName,
      lastName,
      email,
      password,
      organization,
      role: entityType === 'Institute' ? 'Academic Representative' : 'Corporate Sponsor',
    });

    if (!provider) {
      setError('An account with this email already exists.');
      setLoading(false);
      return;
    }

    setProviderSession(provider);
    setSuccess(true);
    setTimeout(() => {
      window.location.href = '/provider';
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(0,74,198,0.06)' }} />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(113,42,226,0.06)' }} />

      <div className="w-full max-w-[960px] grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[32px] overflow-hidden shadow-xl border border-slate-200 bg-white relative z-10">

        {/* ===== LEFT PANEL: INFO GRID ===== */}
        <div className="hidden lg:flex lg:col-span-5 flex-col bg-slate-50/80 p-10 justify-between border-r border-slate-200/60">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-9 h-9 rounded-10 bg-primary flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-white" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-base tracking-tight leading-none">ScholarQuest</p>
                <p className="text-slate-400 text-[10px] tracking-widest uppercase mt-1 font-bold">Partner Onboarding</p>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Empower Students,<br />Create Grants.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Post your scholarship programs on ScholarQuest to directly match with high-performing students. Create, track, and review grant submissions in one integrated pipeline.
            </p>

            <ul className="space-y-3">
              {[
                { icon: 'add_circle', text: 'Create & publish custom scholarships' },
                { icon: 'description', text: 'Track and review student applications' },
                { icon: 'analytics', text: 'Monitor grant analytics & impact reports' },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 bg-white rounded-12 p-3 border border-slate-200/60 shadow-sm">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  <span className="text-slate-700 text-xs font-semibold">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="relative w-full aspect-square mt-6 rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-white">
              <Image
                src="/provider_signup_hero.png"
                alt="Partner Onboarding Illustration"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          </div>

          <div className="text-slate-400 text-xs font-medium mt-6">
            © 2026 ScholarQuest. All rights reserved.
          </div>
        </div>

        {/* ===== RIGHT PANEL: REGISTRATION FORM ===== */}
        <div className="lg:col-span-7 bg-white p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Partner Registration</h2>
            <p className="text-slate-500 text-sm mt-1">Directly create an account for your Company or Educational Institute.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-10 text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined shrink-0" style={{ fontSize: '18px' }}>error</span>
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-10 text-green-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined shrink-0 animate-bounce" style={{ fontSize: '18px' }}>check_circle</span>
              Account created successfully! Redirecting...
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="first_name" className="text-slate-700 text-xs font-semibold block">First Name</label>
                <input
                  id="first_name"
                  type="text"
                  placeholder="Jane"
                  className="w-full bg-slate-50 border border-slate-200 rounded-10 py-2 px-4 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm h-11"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="last_name" className="text-slate-700 text-xs font-semibold block">Last Name</label>
                <input
                  id="last_name"
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-10 py-2 px-4 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="organization" className="text-slate-700 text-xs font-semibold block">Company or Institute Name</label>
              <input
                id="organization"
                type="text"
                placeholder="e.g. Stanford University or Google Inc."
                className="w-full bg-slate-50 border border-slate-200 rounded-10 py-2 px-4 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm h-11"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="entity_type" className="text-slate-700 text-xs font-semibold block">Entity Type</label>
                <div className="relative">
                  <select
                    id="entity_type"
                    className="w-full bg-slate-50 border border-slate-200 rounded-10 py-2 px-4 text-slate-900 outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm h-11 appearance-none"
                  >
                    <option>Company</option>
                    <option>Institute</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" style={{ fontSize: '18px' }}>keyboard_arrow_down</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="provider_email" className="text-slate-700 text-xs font-semibold block">Work Email</label>
                <input
                  id="provider_email"
                  type="email"
                  placeholder="jane@organization.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-10 py-2 px-4 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="provider_password" className="text-slate-700 text-xs font-semibold block">Password</label>
              <div className="relative">
                <input
                  id="provider_password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  className="w-full bg-slate-50 border border-slate-200 rounded-10 py-2.5 pl-4 pr-12 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm h-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2">
              <input type="checkbox" id="provider_terms" className="w-4 h-4 mt-0.5 rounded border-slate-300 bg-slate-50 text-primary accent-primary cursor-pointer" required />
              <label htmlFor="provider_terms" className="text-slate-500 text-[11px] leading-relaxed cursor-pointer">
                I represent that I am an authorized agent of this organization and agree to the{' '}
                <Link href="#" className="text-primary hover:underline font-semibold">Terms of Use</Link>
                {' '}and{' '}
                <Link href="#" className="text-primary hover:underline font-semibold">Data Policy</Link>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-primary text-white py-3 rounded-10 font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>progress_activity</span>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
                  Create Sponsor Account
                </>
              )}
            </button>
          </form>

          {/* Bottom Login Link */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              Already registered?{' '}
              <Link href="/provider-login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 text-xs hover:text-primary mt-4 font-semibold transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_back</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
