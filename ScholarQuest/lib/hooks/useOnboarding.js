'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function useOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [userUid, setUserUid] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: '', nationality: '', state: '',
    institution: '', degreeLevel: '', majorArea: '', gradingSystem: 'CGPA', gpaScale: '10', gpa: '', graduation: '',
    careerGoals: '', extracurriculars: '', financialNeed: 'Low – Merit-based preferred',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUid(user.uid);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setFormData(prev => ({
            ...prev,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            institution: data.institution || '',
          }));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const set = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));
  const toggleField = (key, val) => set(key, formData[key] === val ? '' : val);

  const handleContinue = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      if (userUid) {
        await updateDoc(doc(db, 'users', userUid), {
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`,
          initials: `${(formData.firstName || 'A')[0]}${(formData.lastName || 'J')[0]}`.toUpperCase(),
          onboardingComplete: true,
        });
      }
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
