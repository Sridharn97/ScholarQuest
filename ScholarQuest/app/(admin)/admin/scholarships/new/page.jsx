'use client';
import { useState } from 'react';

const fields = [
  { id: 'name', label: 'Scholarship Name', type: 'text', placeholder: 'e.g. Global Tech Innovators Fund', span: 2 },
  { id: 'organization', label: 'Sponsoring Organization', type: 'text', placeholder: 'Organization name', span: 1 },
  { id: 'amount', label: 'Award Amount ($)', type: 'number', placeholder: '25000', span: 1 },
  { id: 'deadline', label: 'Application Deadline', type: 'date', span: 1 },
  { id: 'category', label: 'Category', type: 'select', options: ['STEM', 'Leadership', 'Arts', 'Community', 'International', 'Research'], span: 1 },
  { id: 'gpa', label: 'Minimum GPA', type: 'number', placeholder: '3.0', span: 1 },
  { id: 'degree', label: 'Degree Level', type: 'select', options: ['High School', 'Undergraduate', "Master's", 'PhD', 'Any'], span: 1 },
];

export default function AddScholarship() {
  const [formData, setFormData] = useState({});

  return (
    <div>
      <div className="flex items-center gap-3 mb-10">
        <a href="/admin/scholarships" className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </a>
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Add New Scholarship</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Create a new scholarship listing for the platform</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="glass-card p-10 rounded-2xl border border-outline-variant/20 shadow-sm">
            <h3 className="font-headline-md text-headline-md mb-10">Scholarship Details</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                  <div key={field.id} className={`space-y-2 ${field.span === 2 ? 'md:col-span-2' : ''}`}>
                    <label className="font-label-md text-label-md text-on-surface">{field.label}</label>
                    {field.type === 'select' ? (
                      <select className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all appearance-none">
                        {field.options.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">Description</label>
                <textarea rows={5} placeholder="Describe the scholarship, eligibility requirements, and selection criteria..." className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-none" />
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">Tags</label>
                <div className="flex flex-wrap gap-2 p-3 bg-surface-container-low border border-outline-variant rounded-10">
                  {['STEM', 'Full-Ride', 'Merit-Based'].map((tag) => (
                    <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1">
                      {tag}
                      <button type="button" className="hover:text-error transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                      </button>
                    </span>
                  ))}
                  <input type="text" placeholder="Add tag..." className="bg-transparent outline-none font-body-sm text-body-sm flex-1 min-w-[100px]" />
                </div>
              </div>

              <div className="pt-4 flex gap-4 border-t border-outline-variant/20">
                <button type="submit" className="px-8 py-3 bg-primary text-on-primary rounded-10 font-label-md text-label-md hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20">
                  Publish Scholarship
                </button>
                <button type="button" className="px-8 py-3 border border-outline-variant rounded-10 font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-all">
                  Save as Draft
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Preview Card */}
        <div className="space-y-10">
          <div className="glass-card p-6 rounded-10 border border-outline-variant/20">
            <h4 className="font-label-md text-label-md text-on-surface-variant mb-6">Preview</h4>
            <div className="bg-white border border-outline-variant/30 p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-10 bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">school</span>
                </div>
                <span className="bg-surface-container-low px-2 py-1 rounded text-[10px] font-bold text-on-surface-variant border border-outline-variant/20 uppercase">STEM</span>
              </div>
              <h4 className="font-headline-md text-headline-md text-on-surface mb-1">Scholarship Name</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Organization Name</p>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Amount</p>
                  <p className="font-headline-md text-headline-md text-primary">$0</p>
                </div>
                <div className="text-right">
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Match</p>
                  <p className="font-headline-md text-headline-md text-secondary">—</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>
                  No deadline set
                </span>
                <button className="text-primary font-label-md text-label-md">Apply</button>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-primary/5 border border-primary/10 rounded-10 p-6">
            <h4 className="font-label-md text-label-md text-primary mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>tips_and_updates</span>
              Quick Tips
            </h4>
            <ul className="space-y-2">
              {['Be specific about eligibility requirements', 'Include all required documents list', 'Set realistic GPA thresholds to maximize applicants'].map((tip) => (
                <li key={tip} className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-2">
                  <span className="text-primary">•</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
