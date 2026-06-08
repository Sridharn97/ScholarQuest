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

      {/* View Application Modal */}
      {viewApp && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4" onClick={() => setViewApp(null)}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg ${viewApp.color}`}>{viewApp.initials}</div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">{viewApp.student}</h3>
                  <p className="font-body-sm text-on-surface-variant">{viewApp.email}</p>
                </div>
              </div>
              <button onClick={() => setViewApp(null)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { label: 'Scholarship Program', value: viewApp.scholarship },
                { label: 'Submitted Date', value: viewApp.submitted },
                { label: 'Calculated Match Score', value: `${viewApp.score}%` },
                { label: 'Status', value: viewApp.status },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-surface-container-low rounded-10 border border-outline-variant/10">
                  <span className="font-label-sm text-on-surface-variant">{item.label}</span>
                  {item.label === 'Status' ? (
                    <span className={`px-3 py-1 rounded-full font-label-sm ${STATUS_CONFIG[viewApp.status]?.cls}`}>{viewApp.status}</span>
                  ) : (
                    <span className="font-label-md text-on-surface font-bold">{item.value}</span>
                  )}
                </div>
              ))}
              <div className="p-3 bg-surface-container-low rounded-10 border border-outline-variant/10">
                <div className="flex justify-between mb-2">
                  <span className="font-label-sm text-on-surface-variant">AI Alignment Score</span>
                  <span className="font-label-md text-on-surface font-bold">{viewApp.score}%</span>
                </div>
                <div className="w-full h-3 bg-outline-variant/20 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all" style={{ width: `${viewApp.score}%` }} />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 flex-wrap">
              {viewApp.status !== 'Approved' && (
                <button
                  onClick={() => handleUpdateStatus(viewApp.id, 'Approved')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-10 font-label-md hover:opacity-90 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
                  Approve
                </button>
              )}
              {viewApp.status !== 'Under Review' && (
                <button
                  onClick={() => handleUpdateStatus(viewApp.id, 'Under Review')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-10 font-label-md hover:opacity-90 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>pending</span>
                  Review
                </button>
              )}
              {viewApp.status !== 'Rejected' && (
                <button
                  onClick={() => handleUpdateStatus(viewApp.id, 'Rejected')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-error text-on-error rounded-10 font-label-md hover:opacity-90 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>cancel</span>
                  Reject
                </button>
              )}
            </div>
            <button onClick={() => setDeleteConfirm(viewApp.id)} className="mt-3 w-full py-2 text-error font-label-sm hover:underline">
              Remove Submission log
            </button>
          </div>
        </div>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-10">
        {[
          { label: 'Total Applications', value: counts.total, icon: 'description', cls: 'bg-primary/10 text-primary' },
          { label: 'Under Review', value: counts.review, icon: 'pending', cls: 'bg-blue-100 text-blue-700' },
          { label: 'Approved / Funded', value: counts.approved, icon: 'check_circle', cls: 'bg-green-100 text-green-700' },
          { label: 'Pending Review', value: counts.pending, icon: 'hourglass_empty', cls: 'bg-orange-100 text-orange-700' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-6 rounded-10 border border-outline-variant/20">
            <div className={`w-10 h-10 rounded-6 flex items-center justify-center mb-3 ${stat.cls}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">{stat.label}</p>
            <h4 className="font-headline-md text-headline-md">{stat.value}</h4>
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
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-2 rounded-6 text-label-sm font-label-md transition-all ${activeFilter === f ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'}`}
              >
                {f}
              </button>
            ))}
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
            <tbody className="divide-y divide-outline-variant/30">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">No applications found.</td></tr>
              ) : filtered.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${row.color}`}>{row.initials}</div>
                      <div>
                        <p className="font-semibold text-on-surface whitespace-nowrap">{row.student}</p>
                        <p className="font-body-sm text-xs text-on-surface-variant">{row.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface whitespace-nowrap">{row.scholarship}</td>
                  <td className="px-6 py-4 text-on-surface-variant whitespace-nowrap">{row.submitted}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-outline-variant/20 rounded-full overflow-hidden">
                        <div className="bg-secondary h-full rounded-full" style={{ width: `${row.score}%` }} />
                      </div>
                      <span className="text-label-sm font-semibold whitespace-nowrap">{row.score}%</span>
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
