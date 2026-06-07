'use client';
import Link from 'next/link';
import { useState } from 'react';

const roles = [
  { value: 'super_admin', label: 'Super Admin', desc: 'Full platform access', icon: 'shield' },
  { value: 'scholarship_manager', label: 'Scholarship Manager', desc: 'Manage programs only', icon: 'school' },
  { value: 'reviewer', label: 'Application Reviewer', desc: 'Review submissions', icon: 'rate_review' },
  { value: 'analyst', label: 'Data Analyst', desc: 'Reports & analytics only', icon: 'analytics' },
];

export default function AdminSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('scholarship_manager');
  const [step, setStep] = useState(1);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0d1633] to-[#1a0a2e] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-[32px] overflow-hidden shadow-2xl shadow-black/50 relative z-10">

        {/* ===== LEFT NARROW: STEPS PANEL ===== */}
        <div className="hidden lg:flex lg:col-span-2 flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="relative z-10 flex-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-10 bg-secondary flex items-center justify-center shadow-lg shadow-secondary/30">
                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
              </div>
              <div>
                <p className="font-extrabold text-white text-lg tracking-tight leading-none">ScholarQuest</p>
                <p className="text-white/50 text-xs tracking-widest uppercase">Admin Portal</p>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Request Admin Access</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-10">
              Fill in your details and select your administrative role. Your request will be reviewed within 24 hours.
            </p>

            {/* Progress Steps */}
            <div className="space-y-6 relative">
              <div className="absolute left-[18px] top-8 bottom-8 w-[2px] bg-white/10" />
              {[
                { num: 1, label: 'Account Details', sub: 'Name, email & password' },
                { num: 2, label: 'Role Selection', sub: 'Choose your admin role' },
                { num: 3, label: 'Verification', sub: 'Organization access code' },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-4 relative z-10">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                    step > s.num ? 'bg-primary text-white shadow-lg shadow-primary/30' :
                    step === s.num ? 'bg-white/10 border-2 border-primary text-white' :
                    'bg-white/5 border border-white/20 text-white/30'
                  }`}>
                    {step > s.num
                      ? <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check</span>
                      : s.num
                    }
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${step >= s.num ? 'text-white' : 'text-white/30'}`}>{s.label}</p>
                    <p className={`text-xs ${step >= s.num ? 'text-white/50' : 'text-white/20'}`}>{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom note */}
          <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-4 mt-8">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#d2bbff]" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <p className="text-white/60 text-xs leading-relaxed">
                All admin accounts are manually verified. Access is granted only to authorized personnel of partner institutions.
              </p>
            </div>
          </div>
        </div>

        {/* ===== RIGHT: FORM PANEL ===== */}
        <div className="lg:col-span-3 bg-[#0d1633]/90 backdrop-blur-xl border border-white/10 p-10 flex flex-col justify-center">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-6 lg:hidden">
            <div className="w-8 h-8 rounded-6 bg-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
            </div>
            <p className="font-extrabold text-white tracking-tight">Request Admin Access</p>
          </div>

          {/* Step 1: Account Details */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Step 1 of 3</p>
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Create Your Account</h2>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="admin_first" className="text-white/70 text-sm font-medium block">First Name</label>
                    <input
                      id="admin_first"
                      type="text"
                      placeholder="Alex"
                      className="w-full bg-white/5 border border-white/10 rounded-10 py-3 px-4 text-white placeholder:text-white/20 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="admin_last" className="text-white/70 text-sm font-medium block">Last Name</label>
                    <input
                      id="admin_last"
                      type="text"
                      placeholder="Sterling"
                      className="w-full bg-white/5 border border-white/10 rounded-10 py-3 px-4 text-white placeholder:text-white/20 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="admin_org_email" className="text-white/70 text-sm font-medium block">Institutional Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/30" style={{ fontSize: '18px' }}>mail</span>
                    <input
                      id="admin_org_email"
                      type="email"
                      placeholder="alex@institution.edu"
                      className="w-full bg-white/5 border border-white/10 rounded-10 py-3 pl-10 pr-4 text-white placeholder:text-white/20 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      required
                    />
                  </div>
                  <p className="text-white/30 text-xs">Use your official institutional email address.</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="admin_new_password" className="text-white/70 text-sm font-medium block">Create Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/30" style={{ fontSize: '18px' }}>lock</span>
                    <input
                      id="admin_new_password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      className="w-full bg-white/5 border border-white/10 rounded-10 py-3 pl-10 pr-12 text-white placeholder:text-white/20 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Password Strength */}
                <div className="space-y-2">
                  <p className="text-white/40 text-xs">Password strength</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full ${i <= 2 ? 'bg-orange-400' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-10 font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 mt-2"
                >
                  Continue
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Role Selection */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Step 2 of 3</p>
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Select Your Role</h2>
                <p className="text-white/50 text-sm mt-1">Choose the role that best matches your responsibilities.</p>
              </div>

              <div className="space-y-3 mb-6">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                      selectedRole === role.value
                        ? 'bg-primary/20 border-primary/60 shadow-lg shadow-primary/10'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-10 flex items-center justify-center shrink-0 ${selectedRole === role.value ? 'bg-primary text-white' : 'bg-white/10 text-white/50'}`}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>{role.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${selectedRole === role.value ? 'text-white' : 'text-white/70'}`}>{role.label}</p>
                      <p className="text-white/40 text-xs mt-0.5">{role.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedRole === role.value ? 'border-primary bg-primary' : 'border-white/20'}`}>
                      {selectedRole === role.value && (
                        <span className="material-symbols-outlined text-white" style={{ fontSize: '12px' }}>check</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-5 py-3 border border-white/10 text-white/60 rounded-10 text-sm hover:bg-white/5 transition-all"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-10 font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                >
                  Continue
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Access Code Verification */}
          {step === 3 && (
            <div>
              <div className="mb-6">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Step 3 of 3</p>
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Verify Your Access</h2>
                <p className="text-white/50 text-sm mt-1">Enter the organization access code provided by your institution.</p>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label htmlFor="org_name" className="text-white/70 text-sm font-medium block">Organization Name</label>
                  <input
                    id="org_name"
                    type="text"
                    placeholder="e.g. Stanford University"
                    className="w-full bg-white/5 border border-white/10 rounded-10 py-3 px-4 text-white placeholder:text-white/20 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="access_code" className="text-white/70 text-sm font-medium block">Access Code</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/30" style={{ fontSize: '18px' }}>vpn_key</span>
                    <input
                      id="access_code"
                      type="text"
                      placeholder="XXXX-XXXX-XXXX"
                      className="w-full bg-white/5 border border-white/10 rounded-10 py-3 pl-10 pr-4 text-white placeholder:text-white/20 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-mono tracking-widest"
                      required
                    />
                  </div>
                  <p className="text-white/30 text-xs">Contact your institution&apos;s IT department for your access code.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <h4 className="text-white/70 text-sm font-semibold mb-3">Registration Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Role Selected</span>
                      <span className="text-white font-medium">{roles.find(r => r.value === selectedRole)?.label}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Access Level</span>
                      <span className="text-[#b4c5ff] font-medium">Pending Approval</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="admin_terms" className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-primary" required />
                  <label htmlFor="admin_terms" className="text-white/50 text-xs leading-relaxed">
                    I confirm that I am an authorized representative and agree to the{' '}
                    <Link href="#" className="text-[#b4c5ff] hover:underline">Admin Terms of Use</Link>
                    {' '}and{' '}
                    <Link href="#" className="text-[#b4c5ff] hover:underline">Data Governance Policy</Link>.
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-5 py-3 border border-white/10 text-white/60 rounded-10 text-sm hover:bg-white/5 transition-all"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                    Back
                  </button>
                  <Link
                    href="/admin"
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-10 font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
                    Submit Request
                  </Link>
                </div>
              </form>
            </div>
          )}

          {/* Sign In Link */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-3">
            <p className="text-white/40 text-sm">
              Already have an admin account?{' '}
              <Link href="/admin-login" className="text-[#b4c5ff] font-semibold hover:underline">
                Sign In
              </Link>
            </p>
            <Link href="/login" className="inline-flex items-center gap-2 text-white/25 text-xs hover:text-white/50 transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_back</span>
              Back to Student Portal
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
