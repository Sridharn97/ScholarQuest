'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, setSession } from '@/lib/store';

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
    <div className="h-screen overflow-hidden flex bg-background">
      {/* ===== LEFT: FORM PANEL ===== */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 bg-white h-full overflow-hidden order-1 lg:order-none">
        <div className="w-full max-w-[440px] py-2">
          <Link href="/" className="flex items-center gap-2.5 mb-6">
            <img src="/Logo.png.png" alt="Logo" className="w-9 h-9 rounded-full object-cover" />
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" style={{ fontFamily: 'Manrope, sans-serif' }}>ScholarQuest</span>
          </Link>

          <div className="mb-5">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Create your account</h1>
            <p className="text-gray-500 text-sm">Already have an account?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </div>

          {error && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
              {error}
            </div>
          )}

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="first_name" className="block text-sm font-bold text-gray-700">First Name</label>
                <input id="first_name" name="first_name" type="text" placeholder="Alex" className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm hover:border-gray-300" required />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="last_name" className="block text-sm font-bold text-gray-700">Last Name</label>
                <input id="last_name" name="last_name" type="text" placeholder="Johnson" className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm hover:border-gray-300" required />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="signup_email" className="block text-sm font-bold text-gray-700">University Email</label>
              <input id="signup_email" name="signup_email" type="email" placeholder="alex@university.edu" autoComplete="email" className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm hover:border-gray-300" required />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="signup_password" className="block text-sm font-bold text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="signup_password"
                  name="signup_password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  className="w-full h-11 px-4 pr-12 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm hover:border-gray-300"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              {password.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <p className={`text-xs font-bold ${strength >= 3 ? 'text-green-600' : strength >= 2 ? 'text-orange-500' : 'text-red-500'}`}>
                    {strengthLabels[strength] || 'Too short'}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="institution" className="block text-sm font-bold text-gray-700">Institution</label>
              <input id="institution" name="institution" type="text" placeholder="e.g. Stanford University" className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm hover:border-gray-300" />
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input type="checkbox" id="terms" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary accent-primary cursor-pointer shadow-sm" required />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-snug font-medium">
                I agree to the{' '}
                <Link href="#" className="text-primary font-bold hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link href="#" className="text-primary font-bold hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full h-11 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/25 disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: '20px' }}>progress_activity</span>
              ) : (
                <>Create My Account <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span></>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ===== RIGHT: ILLUSTRATION PANEL ===== */}
      <div className="hidden lg:flex w-[48%] relative flex-col overflow-hidden h-full bg-gradient-to-br from-[#faf5ff] via-[#fdf2f8] to-[#fffbeb] border-l border-purple-100/50 order-last">
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
              &ldquo;Within 2 weeks of creating my profile, I had matched with 34 scholarships I was eligible for. I won 3 of them.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs">PR</div>
              <div>
                <p className="text-gray-900 font-semibold text-xs">Priya Rao</p>
                <p className="text-gray-500 text-[10px]">Data Science, UC Berkeley</p>
              </div>
            </div>
          </div>

          <div className="relative w-[340px] h-[340px] mx-auto my-4 rounded-3xl overflow-hidden border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white/40 backdrop-blur-md flex items-center justify-center p-4">
            <Image 
              src="/student_success.png" 
              alt="Students finding scholarships" 
              width={340}
              height={340}
              className="w-full h-full object-contain drop-shadow-md" 
              unoptimized
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { value: '50K+', label: 'Scholarships' },
              { value: '$250M', label: 'Total Funding' },
              { value: 'Free', label: 'Always' },
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
