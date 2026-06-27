'use client';
import Link from 'next/link';
import useOnboarding from '@/lib/hooks/useOnboarding';

const steps = [
  { num: 1, label: 'Personal Info', icon: 'person' },
  { num: 2, label: 'Academic Background', icon: 'school' },
  { num: 3, label: 'Goals & Interests', icon: 'psychology' },
];

const degreeLevels = ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BBA', 'MBA', 'B.Sc', 'M.Sc', 'Other'];

export default function OnboardingPage() {
  const {
    currentStep,
    setCurrentStep,
    formData,
    set,
    toggleField,
    handleContinue,
  } = useOnboarding();

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
                <label className="font-label-md text-label-md">Degree Level</label>
                <select 
                  value={formData.degreeLevel} 
                  onChange={e => set('degreeLevel', e.target.value)} 
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all appearance-none"
                >
                  <option value="" disabled>Select Degree Level</option>
                  {degreeLevels.map((field) => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Major Area</label>
                <input value={formData.majorArea} onChange={e => set('majorArea', e.target.value)} type="text" placeholder="e.g. Computer Science, Marketing" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
              </div>
              <div className="space-y-4 p-4 border border-outline-variant/30 rounded-10 bg-surface-container-lowest">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">Grading System</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="gradingSystem" value="CGPA" checked={formData.gradingSystem === 'CGPA'} onChange={e => set('gradingSystem', e.target.value)} className="accent-primary" />
                      <span className="font-body-md">CGPA</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="gradingSystem" value="Percentage" checked={formData.gradingSystem === 'Percentage'} onChange={e => set('gradingSystem', e.target.value)} className="accent-primary" />
                      <span className="font-body-md">Percentage</span>
                    </label>
                  </div>
                </div>
                
                {formData.gradingSystem === 'CGPA' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-label-md text-label-md">Current CGPA</label>
                      <input value={formData.gpa} onChange={e => set('gpa', e.target.value)} type="number" step="0.01" placeholder="e.g. 8.5" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-md text-label-md">Out Of</label>
                      <select value={formData.gpaScale} onChange={e => set('gpaScale', e.target.value)} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all appearance-none">
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md">Current Percentage (%)</label>
                    <input value={formData.gpa} onChange={e => set('gpa', e.target.value)} type="number" step="0.1" min="0" max="100" placeholder="e.g. 85.5" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Expected Graduation</label>
                <input value={formData.graduation} onChange={e => set('graduation', e.target.value)} type="date" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
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
            className="flex items-center gap-2 px-8 py-3 bg-primary text-on-primary rounded-full font-label-md transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/20"
          >
            {currentStep === 3 ? 'Go to Dashboard' : 'Continue'}
            {currentStep < 3 && <span className="material-symbols-outlined">arrow_forward</span>}
          </button>
        </div>
      </div>

      {/* Progress indicator */}
      <p className="mt-6 font-label-sm text-label-sm text-on-surface-variant">Step {currentStep} of {steps.length}</p>
    </main>
  );
}
