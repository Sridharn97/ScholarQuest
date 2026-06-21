'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAdminScholarships, updateAdminScholarship, deleteAdminScholarship } from '@/lib/store';

const STATUS_CLS = {
  Active: 'bg-green-100 text-green-700',
  Draft: 'bg-gray-100 text-gray-700',
  Closed: 'bg-red-100 text-red-700',
};

export default function ProviderScholarshipsPage() {
  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [toast, setToast] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = () => setScholarships(getAdminScholarships());

  useEffect(() => {
    load();
    window.addEventListener('sq_update', load);
    return () => window.removeEventListener('sq_update', load);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleToggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Active' ? 'Closed' : 'Active';
    const updated = updateAdminScholarship(id, { status: nextStatus });
    setScholarships(updated);
    showToast(`Program set to ${nextStatus}!`);
  };

  const handleDelete = (id) => {
    const updated = deleteAdminScholarship(id);
    setScholarships(updated);
    setDeleteConfirm(null);
    showToast('Scholarship deleted successfully.');
  };

  const filtered = scholarships.filter(s => {
    const matchFilter = activeFilter === 'All' || s.status === activeFilter;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.org.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div>
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-label-md">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
          {toast}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-error" style={{ fontSize: '48px', fontVariationSettings: "'FILL' 1" }}>delete_forever</span>
            <h3 className="font-headline-md text-headline-md mt-4 mb-2">Delete Scholarship?</h3>
            <p className="font-body-md text-on-surface-variant mb-6">This will remove the program permanently. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 border border-outline-variant rounded-10 font-label-md text-on-surface hover:bg-surface-container-low">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-3 bg-error text-on-error rounded-10 font-label-md hover:opacity-90">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Posted Scholarships</h2>
          <p className="text-body-lg text-on-surface-variant mt-2">Manage and track your organization&apos;s scholarship opportunities</p>
        </div>
        <Link href="/provider/scholarships/new" className="bg-primary text-on-primary px-8 py-3.5 rounded-xl font-bold text-label-md hover:bg-primary-container transition-all flex items-center gap-2 shadow-md">
          <span className="material-symbols-outlined">add</span>
          Post Scholarship
        </Link>
      </div>

      {/* Filter Options */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative w-full max-w-sm">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" style={{ fontSize: '20px' }}>search</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search programs..."
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm transition-all"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="w-full sm:w-48 bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-10 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm transition-all appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {['All', 'Active', 'Draft', 'Closed'].map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" style={{ fontSize: '20px' }}>expand_more</span>
          </div>
        </div>
      </div>

      {/* Grid of Scholarship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 text-center py-24 text-on-surface-variant">
            No scholarships found matching criteria.
          </div>
        ) : filtered.map((program) => (
          <div key={program.id} className="clean-card rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between h-[320px]">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 rounded-6 text-label-sm font-label-md uppercase tracking-wider ${STATUS_CLS[program.status]}`}>
                  {program.status}
                </span>
                <span className="text-label-sm text-on-surface-variant font-semibold">{program.category}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface line-clamp-2 hover:text-primary transition-colors cursor-pointer">{program.name}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Award: <span className="font-bold text-primary">{program.amount}</span></p>
            </div>

            <div className="pt-4 border-t border-outline-variant/15 flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Applicants</span>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">{program.applicants || 0}</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleStatus(program.id, program.status)}
                  className="w-9 h-9 rounded-6 bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant"
                  title={program.status === 'Active' ? 'Close Program' : 'Activate Program'}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    {program.status === 'Active' ? 'block' : 'check'}
                  </span>
                </button>
                <button
                  onClick={() => setDeleteConfirm(program.id)}
                  className="w-9 h-9 rounded-6 bg-error/10 hover:bg-error/20 flex items-center justify-center text-error"
                  title="Delete Program"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
