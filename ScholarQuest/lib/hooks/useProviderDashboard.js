'use client';
import { useState, useEffect } from 'react';
import { getAdminApplications, getAdminScholarships, updateApplicationStatus, getProviderInfo } from '@/lib/store';

export default function useProviderDashboard() {
  const [applications, setApplications] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [toast, setToast] = useState('');
  const [providerInfo, setProviderInfo] = useState({ name: 'Sponsor', organization: 'Company or Institute' });

  const load = () => {
    setApplications(getAdminApplications());
    setScholarships(getAdminScholarships());
    const info = getProviderInfo();
    if (info) setProviderInfo(info);
  };

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

  const handleQuickAction = (id, status) => {
    const updated = updateApplicationStatus(id, status);
    setApplications(updated);
    showToast(`Application ${status.toLowerCase()} successfully!`);
  };

  const kpis = [
    { 
      icon: 'payments', 
      label: 'Allocated Funds', 
      value: '$1.2M', 
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
