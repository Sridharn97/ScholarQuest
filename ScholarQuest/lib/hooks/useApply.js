'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminScholarships, getUser, addApplication, addCardToColumn, ensureDefaults, getAdminApplications } from '@/lib/store';

export default function useApply(params) {
  const router = useRouter();
  const [scholarship, setScholarship] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gpa, setGpa] = useState('3.92');
  const [institution, setInstitution] = useState('Stanford University');
  const [studyField, setStudyField] = useState('Computer Science');
  const [gradDate, setGradDate] = useState('2026-06-15');
  const [honors, setHonors] = useState('');
  const [toast, setToast] = useState('');
  const [customResponses, setCustomResponses] = useState({});
  const [hasApplied, setHasApplied] = useState(false);
  const [resolvedParams, setResolvedParams] = useState(null);

  useEffect(() => {
    ensureDefaults();
    Promise.resolve(params).then(res => {
      Promise.resolve().then(() => {
        setResolvedParams(res);
        const id = Number(res?.id);
        const list = getAdminScholarships();
        const found = list.find(s => s.id === id) || list[0];
        setScholarship(found);

        const currentUser = getUser();
        if (currentUser) {
          setUser(currentUser);
          setGpa(currentUser.gpa || '3.92');
          setInstitution(currentUser.institution || 'Stanford University');
          setStudyField(currentUser.studyField || 'Computer Science');

          const apps = getAdminApplications();
          const alreadyApplied = apps.some(a => a.email === currentUser.email && a.scholarship === found.name);
          setHasApplied(alreadyApplied);
        }
        setLoading(false);
      });
    });
  }, [params]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!scholarship || !user || hasApplied) return;

    addApplication({
      studentName: user.name || 'Alex Johnson',
      studentEmail: user.email || 'student@student.com',
      scholarshipId: scholarship.id,
      scholarshipName: scholarship.name,
      gpa: gpa,
      institution: institution,
      studyField: studyField,
      gradDate: gradDate,
      honors: honors,
      customResponses: Object.values(customResponses)
    });

    showToast('Application Submitted Successfully!');
    setTimeout(() => {
      router.push('/tracker');
    }, 1200);
  };

  const handleSaveForLater = () => {
    if (!scholarship) return;
    addCardToColumn('col_interested', {
      title: scholarship.name,
      desc: scholarship.desc || 'Saved during application',
      type: scholarship.category || 'Scholarship',
      date: scholarship.deadline
    });

    showToast('Application Saved to Tracker!');
    setTimeout(() => {
      router.push('/tracker');
    }, 1200);
  };

  return {
    scholarship,
    user,
    loading,
    gpa,
    setGpa,
    institution,
    setInstitution,
    studyField,
    setStudyField,
    gradDate,
    setGradDate,
    honors,
    setHonors,
    toast,
    customResponses,
    setCustomResponses,
    hasApplied,
    resolvedParams,
    handleSubmit,
    handleSaveForLater,
  };
}
