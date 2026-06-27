'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function useRoleProtection(allowedRole) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        if (allowedRole === 'provider') {
          router.replace('/provider-login');
        } else {
          router.replace('/login');
        }
      } else {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          if (allowedRole === 'student' && role === 'provider') {
            router.replace('/provider');
          } else if (allowedRole === 'provider' && role === 'student') {
            router.replace('/dashboard');
          } else {
            setAuthChecked(true);
          }
        } else {
          setAuthChecked(true); // default fallback
        }
      }
    });

    return () => unsubscribe();
  }, [router, allowedRole]);

  return authChecked;
}
