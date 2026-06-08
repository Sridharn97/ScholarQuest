'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, setSession, getUser } from '@/lib/store';

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
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const strength = getStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    const firstName = form.first_name.value.trim();
    const lastName = form.last_name.value.trim();
    const email = form.signup_email.value.trim();
    const institution = form.institution.value.trim();

    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    const user = registerUser({ firstName, lastName, email, password, institution });
    setSession(user);
    setTimeout(() => router.push('/onboarding'), 300);
  };

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

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-10 text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700">First Name</label>
                <input id="first_name" name="first_name" type="text" placeholder="Alex" className="w-full h-11 px-4 border border-gray-200 rounded-10 text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all" required />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700">Last Name</label>
                <input id="last_name" name="last_name" type="text" placeholder="Johnson" className="w-full h-11 px-4 border border-gray-200 rounded-10 text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all" required />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="signup_email" className="block text-sm font-semibold text-gray-700">University Email</label>
              <input id="signup_email" name="signup_email" type="email" placeholder="alex@university.edu" autoComplete="email" className="w-full h-11 px-4 border border-gray-200 rounded-10 text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all" required />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="signup_password" className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="signup_password"
                  name="signup_password"
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
              <input id="institution" name="institution" type="text" placeholder="e.g. Stanford University" className="w-full h-11 px-4 border border-gray-200 rounded-10 text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all" />
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

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full h-11 bg-primary text-white rounded-10 text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/20 mt-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>progress_activity</span>
              ) : (
                <>Create My Account <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span></>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ===== RIGHT: ILLUSTRATION PANEL ===== */}
      <div className="hidden lg:flex w-[48%] relative flex-col overflow-hidden order-last" style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #001e6b 40%, #1a0a2e 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #b4c5ff 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #d2bbff 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />

        <div className="relative z-10 flex-1 flex flex-col justify-between p-12">
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

          <div className="relative flex-1 my-8 rounded-3xl overflow-hidden border border-white/10">
            <Image src="/signup_illustration.png" alt="Students finding scholarships" fill sizes="48vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/70 via-transparent to-transparent" />
          </div>

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
