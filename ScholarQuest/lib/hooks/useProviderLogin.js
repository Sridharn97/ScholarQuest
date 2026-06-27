'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function useProviderLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch role to redirect correctly
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          if (userDoc.data().role === 'provider') {
            router.replace('/provider');
          } else {
            router.replace('/dashboard');
          }
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const email = e.target.provider_email.value.trim();
    const password = e.target.provider_password.value;

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Note: onAuthStateChanged will handle the redirect
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  return {
    showPassword,
    setShowPassword,
    error,
    setError,
    loading,
    handleSubmit,
  };
}
