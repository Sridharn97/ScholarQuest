'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addAdminScholarship, getProviderInfo } from '@/lib/store';

export default function PostScholarshipPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      icon: category === 'STEM' ? 'science' : category === 'Creative' ? 'draw' : category === 'International' ? 'public' : 'school'
    });

    setLoading(false);
    router.push('/provider/scholarships');
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-on-surface-variant mb-6">
        <Link href="/provider/scholarships" className="font-label-sm text-label-sm hover:text-primary transition-colors">Scholarships</Link>
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
        <span className="font-label-sm text-label-sm text-primary">Post Scholarship</span>
      </nav>

      <div className="glass-card rounded-[2rem] p-10 border border-outline-variant/30 shadow-sm">
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

        <form className="space-y-6" onSubmit={handleSubmit}>
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

          <div className="pt-6 flex justify-between items-center border-t border-outline-variant/10">
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
