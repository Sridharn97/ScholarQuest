'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function useProviderScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [toast, setToast] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    let unsubscribeSnapshot = () => {};
    
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, 'scholarships'), where('providerId', '==', user.uid));
        unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          setScholarships(data);
        });
      } else {
        setScholarships([]);
        unsubscribeSnapshot();
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Active' ? 'Closed' : 'Active';
    try {
      await updateDoc(doc(db, 'scholarships', id), { status: nextStatus });
      showToast(`Program set to ${nextStatus}!`);
    } catch (e) {
      console.error("Failed to toggle status", e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'scholarships', id));
      setDeleteConfirm(null);
      showToast('Scholarship deleted successfully.');
    } catch (e) {
      console.error("Failed to delete", e);
    }
  };

  const filtered = scholarships.filter(s => {
    const matchFilter = activeFilter === 'All' || s.status === activeFilter;
    const matchSearch = !search || s.name?.toLowerCase().includes(search.toLowerCase()) || s.org?.toLowerCase().includes(search.toLowerCase());
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
