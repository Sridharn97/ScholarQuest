'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUser, saveUser, ensureDefaults } from '@/lib/store';

const steps = [
  { num: 1, label: 'Personal Info', icon: 'person' },
  { num: 2, label: 'Academic Background', icon: 'school' },
  { num: 3, label: 'Goals & Interests', icon: 'psychology' },
  { num: 4, label: 'Documents', icon: 'upload_file' },
];

const studyFields = ['Computer Science', 'Engineering', 'Biology', 'Arts & Humanities', 'Business', 'Social Sciences', 'Law', 'Medicine'];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: '', nationality: '', state: '',
    institution: '', studyField: '', gpa: '', graduation: '',
    careerGoals: '', extracurriculars: '', financialNeed: 'Low – Merit-based preferred',
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        institution: user.institution || '',
      }));
    }
    ensureDefaults();
  }, []);

  const set = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));
  const toggleField = (key, val) => set(key, formData[key] === val ? '' : val);

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save all onboarding data
      saveUser({
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
        initials: `${(formData.firstName || 'A')[0]}${(formData.lastName || 'J')[0]}`.toUpperCase(),
        onboardingComplete: true,
      });
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-gutter py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <Link href="/" className="font-headline-lg text-headline-lg text-primary font-extrabold tracking-tight block mb-4">
          ScholarQuest
        </Link>
        <p className="font-body-md text-body-md text-on-surface-variant">Let&apos;s personalize your scholarship experience</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {steps.map((step, i) => (
          <div key={step.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step.num < currentStep ? 'bg-primary text-on-primary shadow-md' :
                step.num === currentStep ? 'border-2 border-primary text-primary bg-primary-fixed/30' :
                'border-2 border-outline-variant/30 text-outline'
              }`}>
                {step.num < currentStep
                  ? <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check</span>
                  : <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{step.icon}</span>
                }
              </div>
              <span className={`text-[10px] mt-1 font-medium hidden md:block ${step.num === currentStep ? 'text-primary' : 'text-on-surface-variant'}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 md:w-24 h-[2px] mx-2 ${step.num < currentStep ? 'bg-primary' : 'bg-outline-variant/30'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="w-full max-w-2xl glass-card rounded-[2rem] p-10 shadow-xl">
        {/* ── STEP 1: Personal Info ── */}
        {currentStep === 1 && (
          <div>
            <h2 className="font-headline-lg text-headline-lg mb-2">Tell us about yourself</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10">This helps us create a profile that attracts the right opportunities.</p>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">First Name</label>
                  <input value={formData.firstName} onChange={e => set('firstName', e.target.value)} type="text" placeholder="Alex" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">Last Name</label>
                  <input value={formData.lastName} onChange={e => set('lastName', e.target.value)} type="text" placeholder="Johnson" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Date of Birth</label>
                <input value={formData.dob} onChange={e => set('dob', e.target.value)} type="date" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">Nationality</label>
                  <input value={formData.nationality} onChange={e => set('nationality', e.target.value)} type="text" placeholder="American" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">State / Province</label>
                  <input value={formData.state} onChange={e => set('state', e.target.value)} type="text" placeholder="California" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Academic ── */}
        {currentStep === 2 && (
          <div>
            <h2 className="font-headline-lg text-headline-lg mb-2">Academic Background</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10">Your academic history helps match you with merit-based scholarships.</p>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Current Institution</label>
                <input value={formData.institution} onChange={e => set('institution', e.target.value)} type="text" placeholder="Stanford University" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Field of Study</label>
                <div className="flex flex-wrap gap-2">
                  {studyFields.map((field) => (
                    <button
                      key={field}
                      type="button"
                      onClick={() => toggleField('studyField', field)}
                      className={`px-4 py-2 border rounded-full text-label-sm transition-all ${formData.studyField === field ? 'border-primary text-primary bg-primary/5 font-bold' : 'border-outline-variant hover:border-primary hover:text-primary'}`}
                    >
                      {field}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">Current GPA</label>
                  <input value={formData.gpa} onChange={e => set('gpa', e.target.value)} type="number" step="0.01" min="0" max="4" placeholder="3.92" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">Expected Graduation</label>
                  <input value={formData.graduation} onChange={e => set('graduation', e.target.value)} type="date" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Goals ── */}
        {currentStep === 3 && (
          <div>
            <h2 className="font-headline-lg text-headline-lg mb-2">Goals &amp; Interests</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10">Help our AI understand what drives you.</p>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Career Goals</label>
                <textarea value={formData.careerGoals} onChange={e => set('careerGoals', e.target.value)} rows={3} placeholder="Describe your career aspirations..." className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-none" />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Extracurricular Activities</label>
                <textarea value={formData.extracurriculars} onChange={e => set('extracurriculars', e.target.value)} rows={3} placeholder="List clubs, volunteering, sports, etc." className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-none" />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Financial Need Level</label>
                <select value={formData.financialNeed} onChange={e => set('financialNeed', e.target.value)} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all appearance-none">
                  <option>High – Require full funding</option>
                  <option>Medium – Partial funding needed</option>
                  <option>Low – Merit-based preferred</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: Documents ── */}
        {currentStep === 4 && (
          <div>
            <h2 className="font-headline-lg text-headline-lg mb-2">Upload Documents</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10">Optional — you can upload these later from your profile.</p>
            <div className="space-y-4">
              {['Official Transcripts', 'Letters of Recommendation', 'Resume / CV'].map((doc) => (
                <div key={doc} className="flex items-center justify-between p-4 bg-surface-container-low border border-outline-variant/30 rounded-10 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">description</span>
                    <div>
                      <p className="font-label-md text-label-md">{doc}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">PDF or DOC, max 5MB</p>
                    </div>
                  </div>
                  <label className="px-4 py-2 text-primary border border-primary/30 rounded-6 font-label-sm hover:bg-primary/5 transition-colors cursor-pointer">
                    Upload
                    <input type="file" className="hidden" onChange={() => {}} />
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="font-body-sm text-body-sm text-primary">
                <span className="material-symbols-outlined align-text-bottom mr-1" style={{ fontSize: '16px' }}>info</span>
                You&apos;re all set! Click &quot;Go to Dashboard&quot; to start exploring scholarships. You can upload documents anytime from your Profile.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10 pt-10 border-t border-outline-variant/20">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            className={`flex items-center gap-2 text-on-surface-variant font-label-md transition-all hover:text-on-surface ${currentStep === 1 ? 'invisible' : ''}`}
          >
            <span className="material-symbols-outlined">arrow_back</span> Back
          </button>
          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-primary text-on-primary rounded-10 font-label-md hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            {currentStep < 4 ? (
              <>Continue <span className="material-symbols-outlined">arrow_forward</span></>
            ) : (
              <>Go to Dashboard <span className="material-symbols-outlined">dashboard</span></>
            )}
          </button>
        </div>
      </div>

      {/* Progress indicator */}
      <p className="mt-6 font-label-sm text-label-sm text-on-surface-variant">Step {currentStep} of {steps.length}</p>
    </main>
  );
}
