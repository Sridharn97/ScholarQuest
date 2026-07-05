'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function useGoogleLogin() {
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');

  const loginWithGoogle = async () => {
    setGoogleError('');
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user profile document already exists in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'provider') {
          router.replace('/provider');
        } else {
          router.replace('/dashboard');
        }
      } else {
        // Create new student profile in Firestore
        const nameParts = (user.displayName || '').split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'S';

        await setDoc(userDocRef, {
          role: 'student',
          email: user.email || '',
          firstName,
          lastName,
          name: user.displayName || 'Scholar',
          initials,
          institution: '',
          createdAt: Date.now(),
          onboardingComplete: false,
        });
        
        router.push('/onboarding');
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/popup-closed-by-user') {
        setGoogleError('Google sign-in popup was closed. Please try again.');
      } else {
        setGoogleError(err.message || 'Failed to sign in with Google.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return {
    loginWithGoogle,
    googleLoading,
    googleError,
  };
}
