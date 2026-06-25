'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, saveUser, ensureDefaults } from '@/lib/store';

export default function useOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: '', nationality: '', state: '',
    institution: '', studyField: '', gpa: '', graduation: '',
    careerGoals: '', extracurriculars: '', financialNeed: 'Low – Merit-based preferred',
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      Promise.resolve().then(() => {
        setFormData(prev => ({
          ...prev,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          institution: user.institution || '',
        }));
      });
    }
    ensureDefaults();
  }, []);

  const set = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));
  const toggleField = (key, val) => set(key, formData[key] === val ? '' : val);

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      saveUser({
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
        initials: `${(formData.firstName || 'A')[0]}${(formData.lastName || 'J')[0]}`.toUpperCase(),
        onboardingComplete: true,
      });
      router.push('/dashboard');
    }
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    set,
    toggleField,
    handleContinue,
  };
}
