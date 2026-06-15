'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAdminScholarships, getUser, addApplication, addCardToColumn, ensureDefaults } from '@/lib/store';

const initialSteps = [
  { num: '01', label: 'Personal Info', sub: 'Completed', done: true },
  { num: '02', label: 'Academic Background', sub: 'In Progress', active: true },
  { num: '03', label: 'Statement of Purpose', sub: 'Pending', pending: true },
  { num: '04', label: 'Document Uploads', sub: 'Pending', pending: true },
];

export default function ApplyPage({ params }) {
  const router = useRouter();
  const [scholarship, setScholarship] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gpa, setGpa] = useState('3.92');
  const [institution, setInstitution] = useState('Stanford University');
  const [studyField, setStudyField] = useState('Computer Science');
  const [gradDate, setGradDate] = useState('2026-06-15');
  const [honors, setHonors] = useState('');
  const [toast, setToast] = useState('');
  const [customResponses, setCustomResponses] = useState({});

  // Safe param unwrapping
  const [resolvedParams, setResolvedParams] = useState(null);

  useEffect(() => {
    ensureDefaults();
    Promise.resolve(params).then(res => {
      setResolvedParams(res);
      const id = Number(res?.id);
      const list = getAdminScholarships();
      const found = list.find(s => s.id === id) || list[0];
      setScholarship(found);

      const currentUser = getUser();
      if (currentUser) {
        setUser(currentUser);
        setGpa(currentUser.gpa || '3.92');
        setInstitution(currentUser.institution || 'Stanford University');
        setStudyField(currentUser.studyField || 'Computer Science');
      }
      setLoading(false);
    });
  }, [params]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!scholarship || !user) return;

    // Submit the application to the central data store
    addApplication({
      studentName: user.name || 'Alex Johnson',
      studentEmail: user.email || 'student@student.com',
      scholarshipId: scholarship.id,
      scholarshipName: scholarship.name,
      gpa: gpa,
      institution: institution,
      studyField: studyField,
      gradDate: gradDate,
      honors: honors,
      customResponses: Object.values(customResponses)
    });

    showToast('Application Submitted Successfully!');
    setTimeout(() => {
      router.push('/tracker');
    }, 1200);
  };

  const handleSaveForLater = () => {
    if (!scholarship) return;
    addCardToColumn('col_preparing', {
      title: scholarship.name,
      desc: scholarship.desc || 'Saved during application',
      type: scholarship.category || 'Scholarship',
      date: scholarship.deadline
    });

    showToast('Application Saved to Tracker!');
    setTimeout(() => {
      router.push('/tracker');
    }, 1200);
  };

  if (loading || !scholarship || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="material-symbols-outlined text-primary animate-spin" style={{ fontSize: '36px' }}>progress_activity</span>
      </div>
    );
  }

  // Derive steps dynamically based on formSections
  const currentSteps = (() => {
    const baseSteps = [
      { num: '01', label: 'Personal Info', sub: 'Completed', done: true },
      { num: '02', label: 'Academic Background', sub: 'In Progress', active: true },
    ];

    if (scholarship.formSections?.length > 0) {
      scholarship.formSections.forEach((sec, idx) => {
        baseSteps.push({
          num: String(idx + 3).padStart(2, '0'),
          label: sec.title || 'Custom Section',
          sub: 'Pending',
          pending: true
        });
      });
    } else {
      baseSteps.push(
        { num: '03', label: 'Statement of Purpose', sub: 'Pending', pending: true },
        { num: '04', label: 'Document Uploads', sub: 'Pending', pending: true }
      );
    }
    return baseSteps;
  })();

  return (
    <div className="max-w-container-max mx-auto px-gutter py-10">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-label-md">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="font-label-sm text-label-sm">Applications</span>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
            <span className="font-label-sm text-label-sm text-primary">Active Application</span>
          </nav>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">{scholarship.name}</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Offered by <span className="font-semibold text-primary">{scholarship.org}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSaveForLater}
            className="px-6 py-3 border border-outline-variant rounded-2xl font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-all active:scale-95"
          >
            Save for Later
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-primary text-white rounded-2xl font-label-md text-label-md font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            Submit Application
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Steps */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 space-y-8">
            <div className="space-y-6">
              {currentSteps.map((step) => (
                <div key={step.num} className={`flex items-center gap-4 cursor-pointer ${step.pending ? 'opacity-40' : ''}`}>
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-primary text-white shadow-md' : step.active ? 'border-2 border-primary text-primary bg-primary-fixed/30' : 'border-2 border-outline text-outline'}`}>
                    {step.done ? <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check</span> : <span className="font-bold">{step.num}</span>}
                  </div>
                  <div>
                    <p className={`font-label-md text-label-md ${step.done || step.active ? 'text-primary' : ''}`}>{step.label}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Match Score */}
            <div className="p-6 bg-secondary-container/10 border border-secondary-container/20 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-md text-label-md text-secondary">Match Score</span>
                <span className="text-headline-md font-headline-md text-secondary">{scholarship.match || '92%'}</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                <div className="bg-secondary h-full" style={{ width: scholarship.match || '92%' }} />
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-4">You match the target requirements for this grant.</p>
            </div>
          </div>
        </aside>

        {/* Main Form */}
        <div className="lg:col-span-9">
          <section className="glass-panel p-10 rounded-2xl shadow-sm border border-outline-variant/20 bg-white">
            <div className="mb-10">
              <h2 className="font-headline-md text-headline-md text-on-surface">Academic Verification</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">Please verify your academic status before submitting.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">Current University / Institution</label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Enter university name"
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">Field of Study</label>
                  <input
                    type="text"
                    value={studyField}
                    onChange={(e) => setStudyField(e.target.value)}
                    placeholder="Enter field of study"
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">Current Cumulative GPA</label>
                  <input
                    type="number"
                    step="0.01"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">Expected Graduation Date</label>
                  <input
                    type="date"
                    value={gradDate}
                    onChange={(e) => setGradDate(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <label className="font-label-md text-label-md text-on-surface">Academic Honors, Research, or Publications</label>
                <textarea
                  rows={4}
                  value={honors}
                  onChange={(e) => setHonors(e.target.value)}
                  placeholder="Describe your research work, awards, or papers..."
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-none"
                />
              </div>

              {/* Dynamic Application Sections */}
              {scholarship.formSections && scholarship.formSections.map((section) => (
                <div key={section.id} className="pt-8 space-y-6">
                  <div className="border-t border-outline-variant/30 pt-6">
                    <h3 className="font-title-lg text-title-lg text-on-surface">{section.title}</h3>
                  </div>
                  {section.questions.map((q) => (
                    <div key={q.id} className="space-y-2">
                      <label className="font-label-md text-label-md text-on-surface">{q.text} *</label>
                      {q.type === 'text' ? (
                        <textarea
                          rows={3}
                          value={customResponses[q.id]?.answer || ''}
                          onChange={(e) => setCustomResponses({ ...customResponses, [q.id]: { question: q.text, answer: e.target.value, type: q.type } })}
                          placeholder="Enter your response here..."
                          className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-none"
                          required
                        />
                      ) : (
                        <div className="mt-2 flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-outline-variant border-dashed rounded-10 cursor-pointer bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                              <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: '28px' }}>upload_file</span>
                              <p className="mb-2 font-body-sm text-body-sm text-on-surface-variant max-w-[200px] truncate">
                                {customResponses[q.id] ? <span className="text-primary font-bold">{customResponses[q.id].answer}</span> : <><span className="font-semibold text-primary">Click to upload</span> or drag and drop</>}
                              </p>
                              <p className="font-label-sm text-label-sm text-on-surface-variant">Expected format: {q.type.toUpperCase()}</p>
                            </div>
                            <input type="file" className="hidden" accept={q.type} onChange={(e) => {
                              if (e.target.files[0]) {
                                setCustomResponses({ ...customResponses, [q.id]: { question: q.text, answer: e.target.files[0].name, type: q.type } });
                              }
                            }} required />
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              <div className="pt-8 flex justify-between items-center border-t border-outline-variant/10">
                <Link href={`/scholarships/${scholarship.id}`} className="flex items-center gap-2 text-primary font-label-md text-label-md hover:opacity-80 transition-opacity">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                  Cancel & Exit
                </Link>
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary text-white rounded-2xl font-label-md text-label-md font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </section>

          {/* Locked Next Section */}
          <section className="mt-10 opacity-60">
            <div className="p-10 bg-surface-container-lowest rounded-2xl border-2 border-dashed border-outline-variant/40 flex flex-col items-center justify-center text-center py-20">
              <div className="h-16 w-16 bg-surface-container-high rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '32px' }}>cloud_upload</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Document Repository</h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-2">
                Section locked. Auto-validation complete. Your uploaded profile documents will be attached automatically upon submission.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
