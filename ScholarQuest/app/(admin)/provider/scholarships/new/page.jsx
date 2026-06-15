'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addAdminScholarship, getProviderInfo } from '@/lib/store';

export default function PostScholarshipPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [sections, setSections] = useState([
    {
      id: Date.now(),
      title: 'General Information',
      questions: [{ id: Date.now() + 1, text: '', type: 'text' }]
    }
  ]);

  const addSection = () => {
    setSections([...sections, { id: Date.now(), title: '', questions: [] }]);
  };

  const removeSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const updateSectionTitle = (id, title) => {
    setSections(sections.map(s => s.id === id ? { ...s, title } : s));
  };

  const addQuestion = (sectionId) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, questions: [...s.questions, { id: Date.now(), text: '', type: 'text' }] };
      }
      return s;
    }));
  };

  const removeQuestion = (sectionId, questionId) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, questions: s.questions.filter(q => q.id !== questionId) };
      }
      return s;
    }));
  };

  const updateQuestion = (sectionId, questionId, field, value) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          questions: s.questions.map(q => q.id === questionId ? { ...q, [field]: value } : q)
        };
      }
      return s;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const name = e.target.program_name.value.trim();
    const category = e.target.category.value;
    const amount = e.target.amount.value.trim();
    const deadline = e.target.deadline.value;
    const desc = e.target.description.value.trim();
    const eligibility = e.target.eligibility.value.trim();

    if (!name || !amount || !deadline || !desc) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const providerInfo = getProviderInfo() || { organization: 'Sponsor Organization' };

    addAdminScholarship({
      name,
      category,
      amount,
      deadline,
      desc,
      org: providerInfo.organization,
      status: 'Active',
      icon: category === 'STEM' ? 'science' : category === 'Creative' ? 'draw' : category === 'International' ? 'public' : 'school',
      formSections: sections
    });

    setLoading(false);
    router.push('/provider/scholarships');
  };

  return (
    <div className="max-w-[90rem] mx-auto py-8 px-4 sm:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-on-surface-variant mb-6">
        <Link href="/provider/scholarships" className="font-label-sm text-label-sm hover:text-primary transition-colors">Scholarships</Link>
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
        <span className="font-label-sm text-label-sm text-primary">Post Scholarship</span>
      </nav>

      <div className="glass-card rounded-[2rem] p-8 sm:p-10 border border-outline-variant/30 shadow-sm">
        <div className="mb-10">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Post New Scholarship</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Publish a funding opportunity to match with eligible students.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-10 font-body-sm flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
            {error}
          </div>
        )}

        <form className="grid grid-cols-1 lg:grid-cols-12 gap-8" onSubmit={handleSubmit}>
          {/* Left Column: Basic Details */}
          <div className="lg:col-span-5 space-y-6 bg-surface-container-lowest/50 p-6 rounded-2xl border border-outline-variant/30 shadow-sm h-fit">
            <div className="mb-4">
              <h3 className="font-title-lg text-title-lg text-on-surface">Basic Details</h3>
              <p className="text-body-sm text-on-surface-variant mt-1">Core information about the scholarship program.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="program_name" className="font-label-md text-label-md text-on-surface">Scholarship Program Name *</label>
              <input
                id="program_name"
                name="program_name"
                type="text"
                placeholder="e.g. STEM Breakthrough Excellence Award"
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="category" className="font-label-md text-label-md text-on-surface">Category</label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all appearance-none"
                >
                  <option>STEM</option>
                  <option>Leadership</option>
                  <option>Creative</option>
                  <option>International</option>
                  <option>Community</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="amount" className="font-label-md text-label-md text-on-surface">Award Amount *</label>
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  placeholder="e.g. $15,000"
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="deadline" className="font-label-md text-label-md text-on-surface">Application Deadline *</label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="font-label-md text-label-md text-on-surface">Program Description *</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe the background, funding details, and objective of this grant..."
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="eligibility" className="font-label-md text-label-md text-on-surface">Eligibility Criteria Summary</label>
              <textarea
                id="eligibility"
                name="eligibility"
                rows={3}
                placeholder="e.g. GPA 3.5 minimum, senior year, CS or Engineering major"
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-none"
              />
            </div>
          </div>

          {/* Right Column: Application Form Builder */}
          <div className="lg:col-span-7 bg-surface-container-lowest/50 p-6 rounded-2xl border border-outline-variant/30 shadow-sm h-fit">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface">Application Form Builder</h3>
                <p className="text-body-sm text-on-surface-variant mt-1">Design the custom application sections for students.</p>
              </div>
              <button
                type="button"
                onClick={addSection}
                className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-lg font-label-md hover:opacity-90 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                Add Section
              </button>
            </div>

            <div className="space-y-6">
              {sections.map((section, sIdx) => (
                <div key={section.id} className="p-6 bg-surface border border-outline-variant rounded-2xl space-y-4 shadow-sm">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">Section Title</label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                        placeholder="e.g. Personal Information"
                        className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md outline-none focus:border-primary transition-all"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSection(section.id)}
                      className="mt-6 text-error hover:bg-error/10 p-2 rounded-full transition-all"
                      title="Remove Section"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>

                  <div className="space-y-3 pl-4 border-l-2 border-outline-variant/30">
                    {section.questions.map((q, qIdx) => (
                      <div key={q.id} className="flex flex-col xl:flex-row gap-3 items-start xl:items-center">
                        <div className="flex-1 w-full">
                          <input
                            type="text"
                            value={q.text}
                            onChange={(e) => updateQuestion(section.id, q.id, 'text', e.target.value)}
                            placeholder="Question or Requirement"
                            className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm outline-none focus:border-primary transition-all"
                            required
                          />
                        </div>
                        <div className="w-full xl:w-48 flex items-center gap-2">
                          <select
                            value={q.type}
                            onChange={(e) => updateQuestion(section.id, q.id, 'type', e.target.value)}
                            className="flex-1 px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm outline-none focus:border-primary transition-all appearance-none"
                          >
                            <option value="text">Text Response</option>
                            <option value=".pdf">PDF Document</option>
                            <option value=".png">PNG Image</option>
                            <option value=".jpg">JPG Image</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => removeQuestion(section.id, q.id)}
                            className="text-on-surface-variant hover:text-error transition-colors p-1"
                            title="Remove Question"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={() => addQuestion(section.id)}
                      className="text-primary font-label-sm flex items-center gap-1 hover:underline pt-2"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add_circle</span>
                      Add Question
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="lg:col-span-12 pt-8 mt-2 flex justify-between items-center border-t border-outline-variant/10">
            <Link href="/provider/scholarships" className="flex items-center gap-2 text-on-surface-variant font-label-md hover:text-on-surface transition-all">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-primary text-on-primary rounded-10 font-label-md hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>progress_activity</span>
              ) : (
                <>
                  <span className="material-symbols-outlined">publish</span>
                  Publish Scholarship
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
