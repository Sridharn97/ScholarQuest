'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';

export default function useProviderDashboard() {
  const [applications, setApplications] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [toast, setToast] = useState('');
  const [providerInfo, setProviderInfo] = useState({ name: 'Sponsor', organization: 'Company or Institute' });
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUid(user.uid);
        const uDoc = await getDoc(doc(db, 'users', user.uid));
        if (uDoc.exists()) {
          const data = uDoc.data();
          setProviderInfo({ name: data.name || 'Sponsor', organization: data.organization || 'Company or Institute' });
        }
      } else {
        setUserUid(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userUid) return;

    const unsubApps = onSnapshot(query(collection(db, 'applications'), where('providerId', '==', userUid)), (snap) => {
      setApplications(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubSchols = onSnapshot(query(collection(db, 'scholarships'), where('providerId', '==', userUid)), (snap) => {
      setScholarships(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubApps();
      unsubSchols();
    };
  }, [userUid]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleQuickAction = async (id, status) => {
    try {
      await updateDoc(doc(db, 'applications', id), { status });
      showToast(`Application ${status.toLowerCase()} successfully!`);
    } catch (e) {
      console.error(e);
      showToast('Error updating application');
    }
  };

  const totalFunds = scholarships.reduce((acc, curr) => acc + (Number(curr.amount?.toString().replace(/[^0-9.-]+/g,"")) || 0), 0);

  const kpis = [
    { 
      icon: 'payments', 
      label: 'Allocated Funds', 
      value: `$${totalFunds.toLocaleString()}`, 
      badge: `${scholarships.filter(s => s.status === 'Active').length} active programs`, 
      badgeCls: 'bg-primary/10 text-primary', 
      iconCls: 'bg-primary/10 text-primary' 
    },
    { 
      icon: 'school', 
      label: 'Scholarships Posted', 
      value: scholarships.length.toString(), 
      badge: `${scholarships.filter(s => s.status === 'Active').length} active`, 
      badgeCls: 'bg-green-100 text-green-700', 
      iconCls: 'bg-secondary/10 text-secondary' 
    },
    { 
      icon: 'history_edu', 
      label: 'Active Submissions', 
      value: applications.filter(a => a.status !== 'Approved' && a.status !== 'Rejected').length.toString(), 
      badge: `${applications.filter(a => a.status === 'Pending').length} pending review`, 
      badgeCls: 'bg-orange-100 text-orange-700', 
      iconCls: 'bg-tertiary-container/10 text-tertiary' 
    },
    { 
      icon: 'verified', 
      label: 'Approval Rate', 
      value: applications.length ? `${Math.round((applications.filter(a => a.status === 'Approved').length / applications.length) * 100)}%` : '0%', 
      badge: 'Of total reviewed', 
      badgeCls: 'bg-blue-100 text-blue-700', 
      iconCls: 'bg-primary-container/10 text-primary-container' 
    },
  ];

  const recentApplications = [...applications].slice(0, 5);

  const STATUS_CLS = {
    'Approved': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-100 text-red-700',
    'Under Review': 'bg-blue-100 text-blue-700',
    'Pending': 'bg-orange-100 text-orange-700',
  };

  return {
    applications,
    scholarships,
    toast,
    providerInfo,
    kpis,
    recentApplications,
    STATUS_CLS,
    handleQuickAction,
    showToast,
  };
}
