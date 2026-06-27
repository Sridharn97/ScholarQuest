'use client';
import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function useProviderApplications() {
  const [applications, setApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ msg: '', type: '' });
  const [viewApp, setViewApp] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [userUid, setUserUid] = useState(null);

  const filters = ['All', 'Pending', 'Under Review', 'Approved', 'Rejected'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserUid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let unsubscribeSnapshot = () => {};
    
    if (userUid) {
      const q = query(collection(db, 'applications'), where('providerId', '==', userUid));
      unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => {
          const d = doc.data();
          return { 
            id: doc.id,
            student: d.studentName || d.student || 'Unknown Applicant',
            email: d.studentEmail || d.email || '',
            scholarship: d.scholarshipName || d.scholarship || 'Unknown Program',
            submitted: d.appliedAt ? new Date(d.appliedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            score: d.score || 0,
            status: d.status || 'Pending',
            ...d
          };
        });
        setApplications(data);
      });
    } else {
      setApplications([]);
    }
    
    return () => unsubscribeSnapshot();
  }, [userUid]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3000);
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'applications', id), { status });
      showToast(`Application ${status.toLowerCase()} successfully!`, status === 'Rejected' ? 'error' : 'success');
      if (viewApp?.id === id) setViewApp(prev => ({ ...prev, status }));
    } catch (e) {
      console.error(e);
      showToast('Error updating status', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'applications', id));
      setDeleteConfirm(null);
      setViewApp(null);
      showToast('Application removed.', 'error');
    } catch (e) {
      console.error(e);
      showToast('Error deleting application', 'error');
    }
  };

  const filtered = applications.filter(a => {
    const matchFilter = activeFilter === 'All' || a.status === activeFilter;
    const matchSearch = !search || a.student?.toLowerCase().includes(search.toLowerCase()) || a.scholarship?.toLowerCase().includes(search.toLowerCase());
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
