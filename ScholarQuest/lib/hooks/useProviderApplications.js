'use client';
import { useState, useEffect } from 'react';
import { getAdminApplications, updateApplicationStatus, deleteApplication } from '@/lib/store';

export default function useProviderApplications() {
  const [applications, setApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ msg: '', type: '' });
  const [viewApp, setViewApp] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filters = ['All', 'Pending', 'Under Review', 'Approved', 'Rejected'];

  const load = () => {
    const data = getAdminApplications();
    setApplications(data);
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      load();
    });
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

  return {
    applications,
    activeFilter,
    setActiveFilter,
    search,
    setSearch,
    toast,
    setToast,
    viewApp,
    setViewApp,
    deleteConfirm,
    setDeleteConfirm,
    filters,
    filtered,
    counts,
    handleUpdateStatus,
    handleDelete,
    handleExport,
  };
}
