'use client';
import { useState, useEffect } from 'react';
import { getAdminScholarships, addCardToColumn, ensureDefaults, getTracker, getUser, getAdminApplications } from '@/lib/store';

export default function useScholarshipDetail(params) {
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [resolvedParams, setResolvedParams] = useState(null);

  useEffect(() => {
    ensureDefaults();
    Promise.resolve(params).then(res => {
      setResolvedParams(res);
      const id = Number(res?.id);
      const list = getAdminScholarships();
      const found = list.find(s => s.id === id);
      
      const selectedSch = found || list[0];
      if (selectedSch) {
        setScholarship(selectedSch);
      }
      
      // Check if already saved in tracker
      const tracker = getTracker();
      const isSaved = tracker.some(col => col.cards.some(c => c.title === selectedSch.name));
      setSaved(isSaved);
      
      // Check if already applied
      const currentUser = getUser();
      if (currentUser) {
        const apps = getAdminApplications();
        const myApp = apps.find(a => a.email === currentUser.email && a.scholarship === selectedSch.name);
        if (myApp) {
          setApplicationStatus(myApp.status);
        }
      }

      setLoading(false);
    });
  }, [params]);

  const handleSaveToTracker = () => {
    if (!scholarship || saved) return;
    addCardToColumn('col_interested', {
      title: scholarship.name,
      desc: scholarship.desc || 'Saved from Discovery',
      type: scholarship.category || 'Scholarship',
      date: scholarship.deadline
    });
    setSaved(true);
  };

  return {
    scholarship,
    loading,
    saved,
    applicationStatus,
    resolvedParams,
    handleSaveToTracker,
  };
}
