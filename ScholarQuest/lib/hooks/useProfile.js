'use client';
import { useState, useEffect } from 'react';
import { getUser, saveUser, calcProfileCompletion, addActivity } from '@/lib/store';

export default function useProfile() {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [saved, setSaved] = useState(false);
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [showInterestInput, setShowInterestInput] = useState(false);

  const load = () => {
    const u = getUser();
    if (u) {
      setUser(u);
      let initialPhone = u.phone || '';
      if (initialPhone && !initialPhone.startsWith('+')) {
        initialPhone = (u.countryCode || '+1') + initialPhone;
      }
      initialPhone = initialPhone.replace(/[^\d+]/g, '');

      setForm({
        firstName: u.firstName || '',
        lastName: u.lastName || '',
        bio: u.bio || 'Tell us about yourself...',
        gpa: u.gpa || '',
        institution: u.institution || '',
        phone: initialPhone,
        linkedin: u.linkedin || '',
        nationality: u.nationality || '',
      });
      setSkills(u.skills || ['Machine Learning', 'Python', 'Data Analysis']);
      setInterests(u.interests || ['Artificial Intelligence', 'Climate Tech', 'Biotech']);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      load();
    });
    window.addEventListener('sq_update', load);
    return () => window.removeEventListener('sq_update', load);
  }, []);

  const handleSave = () => {
    const updated = {
      ...form,
      name: `${form.firstName} ${form.lastName}`,
      initials: `${(form.firstName || 'A')[0]}${(form.lastName || 'J')[0]}`.toUpperCase(),
      skills,
      interests,
    };
    saveUser(updated);
    addActivity({ 
      icon: 'task_alt', 
      iconColor: 'text-primary', 
      title: 'Profile Updated', 
      sub: 'Your profile information was saved', 
      time: 'Just now' 
    });
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const removeSkill = (s) => setSkills(skills.filter(x => x !== s));
  
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
      setShowSkillInput(false);
    }
  };

  const removeInterest = (i) => setInterests(interests.filter(x => x !== i));
  
  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
      setShowInterestInput(false);
    }
  };

  const completion = user ? calcProfileCompletion({ ...user, skills, interests }) : 40;
  const circumference = 263.9;
  const offset = circumference * (1 - completion / 100);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'person' },
    { id: 'academic', label: 'Academic', icon: 'school' },
    { id: 'documents', label: 'Documents', icon: 'description' },
    { id: 'activity', label: 'Activity', icon: 'history' },
  ];

  return {
    editMode,
    setEditMode,
    activeTab,
    setActiveTab,
    user,
    form,
    setForm,
    skills,
    interests,
    newSkill,
    setNewSkill,
    newInterest,
    setNewInterest,
    saved,
    showSkillInput,
    setShowSkillInput,
    showInterestInput,
    setShowInterestInput,
    handleSave,
    removeSkill,
    addSkill,
    removeInterest,
    addInterest,
    completion,
    circumference,
    offset,
    tabs,
  };
}
