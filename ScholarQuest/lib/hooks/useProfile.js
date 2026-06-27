'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { convertToPercentage } from '@/lib/gpaConverter';

function calcProfileCompletion(u) {
  if (!u) return 40;
  let score = 0;
  if (u.firstName && u.lastName) score += 20;
  if (u.institution) score += 15;
  if (u.gpa) score += 15;
  if (u.bio && u.bio !== 'Tell us about yourself...') score += 10;
  if (u.skills && u.skills.length > 0) score += 15;
  if (u.interests && u.interests.length > 0) score += 15;
  if (u.phone) score += 10;
  return score;
}

export default function useProfile() {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [form, setForm] = useState({});
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [careerGoals, setCareerGoals] = useState({ shortTerm: '', longTerm: '', higherStudies: '', researchArea: '' });
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [academicExperience, setAcademicExperience] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [saved, setSaved] = useState(false);
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [showInterestInput, setShowInterestInput] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUserUid(u.uid);
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUser(data);
          let initialPhone = data.phone || '';
          if (initialPhone && !initialPhone.startsWith('+')) {
            initialPhone = (data.countryCode || '+1') + initialPhone;
          }
          initialPhone = initialPhone.replace(/[^\d+]/g, '');

          setForm({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            bio: data.bio || 'Tell us about yourself...',
            gpa: data.gpa || '',
            gradingSystem: data.gradingSystem || 'CGPA',
            gpaScale: data.gpaScale || '10',
            gpaPercentage: data.gpaPercentage || '',
            institution: data.institution || '',
            phone: initialPhone,
            linkedin: data.linkedin || '',
            nationality: data.nationality || '',
          });
          setSkills(Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'string' ? [data.skills] : ['Machine Learning', 'Python', 'Data Analysis']));
          setInterests(Array.isArray(data.interests) ? data.interests : (typeof data.interests === 'string' ? [data.interests] : ['Artificial Intelligence', 'Climate Tech', 'Biotech']));
          setAchievements(Array.isArray(data.achievements) ? data.achievements : []);
          setCareerGoals(data.careerGoals || { shortTerm: '', longTerm: '', higherStudies: '', researchArea: '' });
          setExtracurriculars(Array.isArray(data.extracurriculars) ? data.extracurriculars : []);
          setAcademicExperience(Array.isArray(data.academicExperience) ? data.academicExperience : []);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!userUid) return;
    const pct = convertToPercentage(form.gpa, form.gradingSystem, form.gpaScale);
    const updated = {
      ...form,
      gpaPercentage: pct,
      name: `${form.firstName} ${form.lastName}`,
      initials: `${(form.firstName || 'A')[0]}${(form.lastName || 'J')[0]}`.toUpperCase(),
      skills,
      interests,
      achievements,
      careerGoals,
      extracurriculars,
      academicExperience,
    };
    
    await updateDoc(doc(db, 'users', userUid), updated);
    setUser(prev => ({ ...prev, ...updated }));
    
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
    achievements,
    setAchievements,
    careerGoals,
    setCareerGoals,
    extracurriculars,
    setExtracurriculars,
    academicExperience,
    setAcademicExperience,
    completion,
    circumference,
    offset,
    tabs,
  };
}
