'use client';
import { useState } from 'react';
import Link from 'next/link';

const steps = [
  { num: 1, label: 'Personal Info', icon: 'person' },
  { num: 2, label: 'Academic Background', icon: 'school' },
  { num: 3, label: 'Goals & Interests', icon: 'psychology' },
  { num: 4, label: 'Documents', icon: 'upload_file' },
];

const studyFields = ['Computer Science', 'Engineering', 'Biology', 'Arts & Humanities', 'Business', 'Social Sciences', 'Law', 'Medicine'];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);

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
            <div className={`flex flex-col items-center`}>
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
        {currentStep === 1 && (
          <div>
            <h2 className="font-headline-lg text-headline-lg mb-2">Tell us about yourself</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10">This helps us create a profile that attracts the right opportunities.</p>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">First Name</label>
                  <input type="text" placeholder="Alex" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">Last Name</label>
                  <input type="text" placeholder="Johnson" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Date of Birth</label>
                <input type="date" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">Nationality</label>
                  <input type="text" placeholder="American" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">State / Province</label>
                  <input type="text" placeholder="California" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="font-headline-lg text-headline-lg mb-2">Academic Background</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10">Your academic history helps match you with merit-based scholarships.</p>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Current Institution</label>
                <input type="text" placeholder="Stanford University" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Field of Study</label>
                <div className="flex flex-wrap gap-2">
                  {studyFields.map((field) => (
                    <button key={field} className="px-4 py-2 border border-outline-variant rounded-full text-label-sm hover:border-primary hover:text-primary transition-all">
                      {field}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">Current GPA</label>
                  <input type="number" step="0.01" placeholder="3.92" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">Expected Graduation</label>
                  <input type="date" className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="font-headline-lg text-headline-lg mb-2">Goals & Interests</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10">Help our AI understand what drives you.</p>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Career Goals</label>
                <textarea rows={3} placeholder="Describe your career aspirations..." className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-none" />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Extracurricular Activities</label>
                <textarea rows={3} placeholder="List clubs, volunteering, sports, etc." className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-none" />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md">Financial Need Level</label>
                <select className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all appearance-none">
                  <option>High – Require full funding</option>
                  <option>Medium – Partial funding needed</option>
                  <option>Low – Merit-based preferred</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="font-headline-lg text-headline-lg mb-2">Upload Documents</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10">Optional — you can upload these later from your dashboard.</p>
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
                  <button className="px-4 py-2 text-primary border border-primary/30 rounded-6 font-label-sm hover:bg-primary/5 transition-colors">
                    Upload
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10 pt-10 border-t border-outline-variant/20">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            className={`flex items-center gap-2 text-on-surface-variant font-label-md ${currentStep === 1 ? 'invisible' : ''}`}
          >
            <span className="material-symbols-outlined">arrow_back</span> Back
          </button>
          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-8 py-3 bg-primary text-on-primary rounded-10 font-label-md hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              Continue <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          ) : (
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-primary text-on-primary rounded-10 font-label-md hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              Go to Dashboard <span className="material-symbols-outlined">dashboard</span>
            </Link>
          )}
        </div>
      </div>

      {/* Progress indicator */}
      <p className="mt-6 font-label-sm text-label-sm text-on-surface-variant">Step {currentStep} of {steps.length}</p>
    </main>
  );
}
