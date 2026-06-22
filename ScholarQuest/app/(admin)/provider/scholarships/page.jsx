'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAdminScholarships, updateAdminScholarship, deleteAdminScholarship } from '@/lib/store';

const STATUS_CLS = {
  Active: 'bg-emerald-50 text-emerald-600',
  Draft: 'bg-slate-100 text-slate-600',
  Closed: 'bg-slate-200 text-slate-600',
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

  const getAvatars = (applicants) => {
    if (!applicants || applicants < 2) {
      return <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[9px] font-bold text-blue-700 border-2 border-white z-10">S</div>;
    }
    if (applicants > 100) {
      return (
        <>
          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[9px] font-bold text-blue-700 border-2 border-white z-10">JD</div>
          <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center text-[9px] font-bold text-pink-700 border-2 border-white z-20">ML</div>
          <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-[9px] font-bold text-emerald-700 border-2 border-white z-30">+{applicants - 2}</div>
        </>
      );
    }
    return (
      <>
        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-[9px] font-bold text-purple-700 border-2 border-white z-10">AK</div>
        <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-[9px] font-bold text-orange-700 border-2 border-white z-20">RB</div>
      </>
    );
  };

  return (
    <div className="max-w-[1100px] mx-auto py-8">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-medium text-sm">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          {toast}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-red-500 text-[48px] mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>delete_forever</span>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Scholarship?</h3>
            <p className="text-slate-500 text-sm mb-8">This will remove the program permanently. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">Posted Scholarships</h2>
          <p className="text-slate-500 mt-1.5 text-[14px]">Manage, track, and optimize your organization's funding opportunities.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors bg-white shadow-sm">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filters
          </button>
          <div className="relative shadow-sm">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-lg py-2 pl-4 pr-10 text-sm font-semibold text-slate-700 hover:bg-slate-50 outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
              <option value="Draft">Draft</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-[18px]">expand_more</span>
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#003B95] flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          </div>
          <div>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Active Programs</div>
            <div className="text-[22px] font-bold text-slate-900 leading-none">12</div>
          </div>
        </div>
        <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
          </div>
          <div>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Total Applicants</div>
            <div className="text-[22px] font-bold text-slate-900 leading-none">4,281</div>
          </div>
        </div>
        <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
          </div>
          <div>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Total Awarded</div>
            <div className="text-[22px] font-bold text-slate-900 leading-none">$125,000</div>
          </div>
        </div>
        <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
          </div>
          <div>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Pending Review</div>
            <div className="text-[22px] font-bold text-slate-900 leading-none">142</div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filtered.map((program) => (
          <div key={program.id} className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col h-[320px]">
            <div className="flex justify-between items-center mb-5">
              <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${STATUS_CLS[program.status] || STATUS_CLS.Draft}`}>
                {program.status}
              </span>
              <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">{program.category || 'STEM'}</span>
            </div>
            
            <h3 className="font-bold text-[18px] text-slate-800 mb-1 leading-snug line-clamp-2">{program.name}</h3>
            <div className="flex items-baseline gap-1.5 mb-5">
              <span className="font-bold text-[18px] text-[#003B95]">{program.amount}</span>
              <span className="text-[12px] text-slate-400 font-medium">Total Grant</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center mb-auto border border-slate-100/50">
              <div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Applicants</div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[20px] font-bold text-slate-800 leading-none">{program.applicants || 0}</span>
                  <span className={`text-[10px] font-semibold ${program.status === 'Closed' ? 'text-slate-400' : 'text-blue-500'}`}>
                    {program.status === 'Closed' ? 'Final Count' : '+0 today'}
                  </span>
                </div>
              </div>
              <div className="flex -space-x-1.5">
                {getAvatars(program.applicants)}
              </div>
            </div>

            <div className="flex items-center justify-between pt-5">
              {program.status === 'Closed' ? (
                <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2.5 px-5 rounded-xl text-[13px] transition-colors">
                  View Report
                </button>
              ) : (
                <button className="bg-[#003B95] hover:bg-blue-800 text-white font-bold py-2.5 px-5 rounded-xl text-[13px] transition-colors">
                  Manage Applicants
                </button>
              )}
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handleToggleStatus(program.id, program.status)} // Not optimal since pencil usually means edit, but keeping functionality same
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button 
                  onClick={() => setDeleteConfirm(program.id)}
                  className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Post New Scholarship Card */}
        <Link href="/provider/scholarships/new" className="bg-slate-50/50 rounded-[24px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center h-[320px] hover:bg-slate-50 hover:border-slate-300 transition-all group cursor-pointer p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#003B95] mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[24px]">add</span>
          </div>
          <h3 className="font-bold text-[16px] text-slate-800 mb-2">Post New Scholarship</h3>
          <p className="text-[13px] text-slate-500 max-w-[180px] leading-relaxed">Reach thousands of eligible students today.</p>
        </Link>
      </div>
    </div>
  );
}
