'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function useProviderSignup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Basic redirect if already logged in (redirect logic handled better in login)
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const firstName = e.target.first_name.value.trim();
    const lastName = e.target.last_name.value.trim();
    const email = e.target.provider_email.value.trim();
    const password = e.target.provider_password.value;
    const organization = e.target.organization.value.trim();
    const entityType = e.target.entity_type.value;

    if (!firstName || !lastName || !email || !password || !organization) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const roleName = entityType === 'Institute' ? 'Academic Representative' : 'Corporate Sponsor';

      await setDoc(doc(db, 'users', user.uid), {
        role: 'provider',
        email: email,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        organization,
        entityType,
        providerRole: roleName,
        createdAt: Date.now(),
      });

      setSuccess(true);
      setTimeout(() => {
        router.push('/provider');
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create provider account.');
    } finally {
      setLoading(false);
    }
  };

  return {
    showPassword,
    setShowPassword,
    error,
    setError,
    loading,
    success,
    handleSubmit,
  };
}
