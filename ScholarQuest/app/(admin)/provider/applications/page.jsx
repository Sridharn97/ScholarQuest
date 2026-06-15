'use client';
import { useState, useEffect } from 'react';
import { getAdminApplications, updateApplicationStatus, deleteApplication } from '@/lib/store';

const STATUS_CONFIG = {
  'Approved': { cls: 'bg-green-100 text-green-700', icon: 'check_circle' },
  'Rejected': { cls: 'bg-red-100 text-red-700', icon: 'cancel' },
  'Under Review': { cls: 'bg-blue-100 text-blue-700', icon: 'pending' },
  'Pending': { cls: 'bg-orange-100 text-orange-700', icon: 'hourglass_empty' },
};

export default function ProviderApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ msg: '', type: '' });
  const [viewApp, setViewApp] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filters = ['All', 'Pending', 'Under Review', 'Approved', 'Rejected'];

  const load = () => setApplications(getAdminApplications());

  useEffect(() => {
    load();
    window.addEventListener('sq_update', load);
    return () => window.removeEventListener('sq_update', load);
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3000);
  };

  const handleUpdateStatus = (id, status) => {
    const updated = updateApplicationStatus(id, status);
    setApplications(updated);
    showToast(`Application ${status.toLowerCase()} successfully!`, status === 'Rejected' ? 'error' : 'success');
    if (viewApp?.id === id) setViewApp(prev => ({ ...prev, status }));
  };

  const handleDelete = (id) => {
    const updated = deleteApplication(id);
    setApplications(updated);
    setDeleteConfirm(null);
    setViewApp(null);
    showToast('Application removed.', 'error');
  };

  const filtered = applications.filter(a => {
    const matchFilter = activeFilter === 'All' || a.status === activeFilter;
    const matchSearch = !search || a.student.toLowerCase().includes(search.toLowerCase()) || a.scholarship.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    total: applications.length,
    review: applications.filter(a => a.status === 'Under Review').length,
    approved: applications.filter(a => a.status === 'Approved').length,
    pending: applications.filter(a => a.status === 'Pending').length,
  };

  const handleExport = () => {
    const csv = ['Student,Scholarship,Submitted,Score,Status', ...filtered.map(a => `${a.student},${a.scholarship},${a.submitted},${a.score}%,${a.status}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const el = document.createElement('a');
    el.href = url; el.download = 'applications.csv'; el.click();
    URL.revokeObjectURL(url);
    showToast('CSV exported!');
  };

  return (
    <div>
      {/* Toast */}
      {toast.msg && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-label-md text-white ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{toast.type === 'error' ? 'cancel' : 'check_circle'}</span>
          {toast.msg}
        </div>
      )}

      {/* View Application Slide-Over Panel */}
      {viewApp && (
        <>
          <div className="fixed inset-0 z-40 bg-on-surface/20 backdrop-blur-sm transition-opacity" onClick={() => setViewApp(null)} />
          <div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-outline-variant/20 animate-in slide-in-from-right"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-6 border-b border-outline-variant/20 flex items-start justify-between bg-surface-container-lowest">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner ${viewApp.color}`}>
                  {viewApp.initials}
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">{viewApp.student}</h3>
                  <p className="font-body-md text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>mail</span>
                    {viewApp.email}
                  </p>
                </div>
              </div>
              <button onClick={() => setViewApp(null)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Match Score Section */}
              <div className="p-5 bg-gradient-to-br from-surface-container-low to-surface-container rounded-2xl border border-outline-variant/10 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-label-md text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">psychiatry</span>
                    AI Alignment Score
                  </h4>
                  <span className="font-headline-md text-primary font-bold">{viewApp.score}%</span>
                </div>
                <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000" style={{ width: `${viewApp.score}%` }} />
                </div>
                <p className="text-body-sm text-on-surface-variant mt-3 leading-relaxed">
                  This candidate strongly matches the requirements for {viewApp.scholarship}.
                </p>
              </div>

              {/* Application Details */}
              <div>
                <h4 className="font-label-md text-on-surface mb-3 uppercase tracking-wider text-xs">Application Details</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Program', value: viewApp.scholarship, icon: 'school' },
                    { label: 'Submitted', value: viewApp.submitted, icon: 'calendar_today' },
                    { label: 'Status', value: viewApp.status, icon: 'info' },
                  ].map(item => (
                    <div key={item.label} className="flex flex-col p-4 bg-white rounded-xl border border-outline-variant/20 shadow-sm hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '16px' }}>{item.icon}</span>
                        <span className="font-label-sm text-on-surface-variant">{item.label}</span>
                      </div>
                      {item.label === 'Status' ? (
                        <div className="mt-1">
                          <span className={`px-3 py-1 rounded-full font-label-sm inline-flex items-center gap-1 ${STATUS_CONFIG[viewApp.status]?.cls}`}>
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{STATUS_CONFIG[viewApp.status]?.icon}</span>
                            {viewApp.status}
                          </span>
                        </div>
                      ) : (
                        <span className="font-label-md text-on-surface ml-6">{item.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Form Responses */}
              {viewApp.customResponses && viewApp.customResponses.length > 0 && (
                <div>
                  <h4 className="font-label-md text-on-surface mb-3 mt-6 uppercase tracking-wider text-xs">Custom Form Responses</h4>
                  <div className="space-y-3">
                    {viewApp.customResponses.map((resp, idx) => (
                      <div key={idx} className="flex flex-col p-4 bg-white rounded-xl border border-outline-variant/20 shadow-sm hover:border-primary/30 transition-colors">
                        <span className="font-label-sm text-on-surface-variant mb-1">{resp.question}</span>
                        {resp.type === 'text' ? (
                          <span className="font-label-md text-on-surface">{resp.answer}</span>
                        ) : (
                          <a href="#" className="font-label-md text-primary hover:underline flex items-center gap-1">
                            <span className="material-symbols-outlined" style={{fontSize: '16px'}}>attach_file</span>
                            {resp.answer}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Footer Actions */}
            <div className="p-6 border-t border-outline-variant/20 bg-surface-container-lowest">
              <div className="flex gap-3 mb-4">
                {viewApp.status !== 'Approved' && (
                  <button
                    onClick={() => handleUpdateStatus(viewApp.id, 'Approved')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl font-label-md shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
                    title="Approve this application"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
                    Approve
                  </button>
                )}
                {viewApp.status !== 'Under Review' && (
                  <button
                    onClick={() => handleUpdateStatus(viewApp.id, 'Under Review')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-label-md shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
                    title="Mark as Under Review"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>pending</span>
                    Review
                  </button>
                )}
                {viewApp.status !== 'Rejected' && (
                  <button
                    onClick={() => handleUpdateStatus(viewApp.id, 'Rejected')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-error text-error rounded-xl font-label-md hover:bg-error/5 transition-all active:scale-95"
                    title="Reject this application"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>cancel</span>
                    Reject
                  </button>
                )}
              </div>
              <button
                onClick={() => setDeleteConfirm(viewApp.id)}
                className="w-full py-2 flex items-center justify-center gap-2 text-on-surface-variant hover:text-error transition-colors font-label-sm"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                Remove Application Record
              </button>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-error" style={{ fontSize: '48px', fontVariationSettings: "'FILL' 1" }}>delete_forever</span>
            <h3 className="font-headline-md text-headline-md mt-4 mb-2">Delete Record?</h3>
            <p className="font-body-md text-on-surface-variant mb-6">This will remove this application entry from your view permanently.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 border border-outline-variant rounded-10 font-label-md text-on-surface hover:bg-surface-container-low">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-3 bg-error text-on-error rounded-10 font-label-md hover:opacity-90">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Application Submissions</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Track and review applications submitted to your programs</p>
        </div>
        <button onClick={handleExport} className="bg-primary text-on-primary px-6 py-3 rounded-10 font-label-md text-label-md hover:opacity-90 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">download</span>
          Export CSV
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Applications', value: counts.total, icon: 'description', cls: 'bg-primary/10 text-primary', trend: '+12% this week', trendUp: true },
          { label: 'Under Review', value: counts.review, icon: 'pending', cls: 'bg-blue-100 text-blue-700', trend: 'Steady', trendUp: true },
          { label: 'Approved / Funded', value: counts.approved, icon: 'check_circle', cls: 'bg-green-100 text-green-700', trend: '+2 this month', trendUp: true },
          { label: 'Pending Review', value: counts.pending, icon: 'hourglass_empty', cls: 'bg-orange-100 text-orange-700', trend: 'Needs action', trendUp: false },
        ].map((stat) => (
          <div key={stat.label} className="relative overflow-hidden bg-white p-4 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.cls} shadow-inner`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>{stat.icon}</span>
              </div>
              <div className={`flex items-center gap-1 font-label-sm text-[11px] px-2 py-0.5 rounded-full ${stat.trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>{stat.trendUp ? 'trending_up' : 'priority_high'}</span>
                {stat.trend}
              </div>
            </div>
            <p className="font-label-sm text-on-surface-variant mb-0.5">{stat.label}</p>
            <h4 className="font-headline-md text-2xl text-on-surface">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card rounded-10 border border-outline-variant/30 overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-outline-variant/30">
          <div className="relative w-full max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: '18px' }}>search</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by student or program..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-6 py-2 pl-9 pr-4 text-body-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="bg-surface-container-low border border-outline-variant rounded-6 py-2 px-4 text-body-sm outline-none focus:ring-2 focus:ring-primary/20 font-label-md"
            >
              {filters.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
              <tr>
                {['Student Applicant', 'Scholarship Program', 'Submission Date', 'Match Alignment', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 bg-white">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center opacity-60">
                      <span className="material-symbols-outlined mb-4" style={{ fontSize: '64px' }}>folder_open</span>
                      <h4 className="font-headline-md text-on-surface mb-2">No Applications Found</h4>
                      <p className="font-body-md text-on-surface-variant max-w-sm">Try adjusting your search terms or filters to find what you're looking for.</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low hover:shadow-sm transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm group-hover:scale-105 transition-transform ${row.color}`}>
                        {row.initials}
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface whitespace-nowrap group-hover:text-primary transition-colors">{row.student}</p>
                        <p className="font-body-sm text-xs text-on-surface-variant">{row.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-on-surface whitespace-nowrap font-body-md">{row.scholarship}</td>
                  <td className="px-6 py-5 text-on-surface-variant whitespace-nowrap font-body-sm">{row.submitted}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-outline-variant/20 rounded-full overflow-hidden shadow-inner">
                        <div className="bg-secondary h-full rounded-full group-hover:shadow-[0_0_8px_rgba(236,72,153,0.6)] transition-all" style={{ width: `${row.score}%` }} />
                      </div>
                      <span className="font-label-sm font-bold whitespace-nowrap text-secondary">{row.score}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm whitespace-nowrap ${STATUS_CONFIG[row.status]?.cls}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setViewApp(row)}
                        className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-6 transition-colors"
                        title="View Details"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>open_in_new</span>
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(row.id, 'Approved')}
                        className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 rounded-6 transition-colors"
                        title="Approve"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(row.id, 'Rejected')}
                        className="w-8 h-8 flex items-center justify-center text-error hover:bg-error/10 rounded-6 transition-colors"
                        title="Reject"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>cancel</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(row.id)}
                        className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 rounded-6 transition-colors"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
