'use client';
import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc, getDoc, getDocs, addDoc } from 'firebase/firestore';
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
          const student = d.studentName || d.student || 'Unknown Applicant';
          const initials = d.studentInitials || student.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'ST';
          const colorClasses = ['bg-pink-100 text-pink-700', 'bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700', 'bg-emerald-100 text-emerald-700', 'bg-amber-100 text-amber-700'];
          const color = d.color || colorClasses[student.length % colorClasses.length];

          return { 
            id: doc.id,
            student: student,
            initials: initials,
            color: color,
            photoURL: d.photoURL || null,
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
      const appDoc = await getDoc(doc(db, 'applications', id));
      if (appDoc.exists()) {
        const appData = appDoc.data();
        const { studentId, scholarshipId } = appData;

        await updateDoc(doc(db, 'applications', id), { status });
        
        // --- 1. In-App Notification (Firestore) ---
        if (studentId) {
          try {
            await addDoc(collection(db, 'notifications'), {
              userId: studentId,
              scholarshipId: scholarshipId || null,
              scholarshipName: appData.scholarshipName || appData.scholarship || 'a scholarship',
              type: 'status_update',
              status: status,
              message: `Your application for ${appData.scholarshipName || appData.scholarship || 'a scholarship'} was ${status}!`,
              createdAt: new Date().toISOString(),
              read: false
            });
            
            // --- 2. Email Notification (Next.js API) ---
            fetch('/api/notify-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                to: appData.studentEmail || appData.email || 'student@example.com',
                subject: `ScholarQuest Update: Application ${status}`,
                message: `We wanted to let you know that your application status has been updated to ${status}.`,
                scholarshipName: appData.scholarshipName || appData.scholarship || 'a scholarship',
                status: status
              })
            }).catch(err => console.error("Email API Error:", err));
          } catch(err) {
            console.error("Error creating notification:", err);
          }
        }

        showToast(`Application ${status.toLowerCase()} successfully!`, status === 'Rejected' ? 'error' : 'success');
        if (viewApp?.id === id) setViewApp(prev => ({ ...prev, status }));

        if (studentId && scholarshipId) {
          const trackerQ = query(
            collection(db, 'tracker'),
            where('userId', '==', studentId),
            where('scholarshipId', '==', scholarshipId)
          );
          const trackerSnap = await getDocs(trackerQ);
          if (!trackerSnap.empty) {
            let targetCol = 'col_applied';
            let acceptedVal = false;
            if (status === 'Approved') {
              targetCol = 'col_accepted';
              acceptedVal = true;
            } else if (status === 'Rejected') {
              targetCol = 'col_rejected';
            }

            await updateDoc(doc(db, 'tracker', trackerSnap.docs[0].id), {
              columnId: targetCol,
              accepted: acceptedVal,
              amount: appData.amount || null
            });

            // Clean up any remaining duplicates immediately
            for (let i = 1; i < trackerSnap.docs.length; i++) {
              await deleteDoc(doc(db, 'tracker', trackerSnap.docs[i].id));
            }
          }
        }
      }
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
