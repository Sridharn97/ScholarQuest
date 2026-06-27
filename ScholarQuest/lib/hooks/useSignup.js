'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColors = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];

function getStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export default function useSignup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const strength = getStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    const firstName = form.first_name.value.trim();
    const lastName = form.last_name.value.trim();
    const email = form.signup_email.value.trim();
    const institution = form.institution.value.trim();

    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Save profile to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        role: 'student',
        email: email,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        initials: `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase(),
        institution,
        createdAt: Date.now(),
        // Mock onboarding fields for new users
        onboardingComplete: false,
      });

      router.push('/onboarding');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  return {
    showPassword,
    setShowPassword,
    password,
    setPassword,
    error,
    setError,
    loading,
    strength,
    strengthLabels,
    strengthColors,
    handleSubmit,
  };
}
