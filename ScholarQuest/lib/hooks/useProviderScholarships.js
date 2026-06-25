'use client';
import { useState, useEffect } from 'react';
import { getAdminScholarships, updateAdminScholarship, deleteAdminScholarship } from '@/lib/store';

export default function useProviderScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [toast, setToast] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = () => setScholarships(getAdminScholarships());

  useEffect(() => {
    Promise.resolve().then(() => {
      load();
    });
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

  return {
    scholarships,
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    toast,
    deleteConfirm,
    setDeleteConfirm,
    handleToggleStatus,
    handleDelete,
    filtered,
  };
}
