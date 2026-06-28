'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function useRoleProtection(allowedRole) {
  const router = useRouter();
  // Keep a stable ref to the router so the effect never needs to re-run
  // just because Next.js returns a new router object reference.
  const routerRef = useRef(router);
  useEffect(() => { routerRef.current = router; });

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!mounted) return;

      if (!user) {
        if (allowedRole === 'provider') {
          routerRef.current.replace('/provider-login');
        } else {
          routerRef.current.replace('/login');
        }
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!mounted) return;

        if (userDoc.exists()) {
          const role = userDoc.data().role;
          if (allowedRole === 'student' && role === 'provider') {
            routerRef.current.replace('/provider');
          } else if (allowedRole === 'provider' && role === 'student') {
            routerRef.current.replace('/dashboard');
          } else {
            setAuthChecked(true);
          }
        } else {
          // No user doc found — allow access as a safe fallback
          setAuthChecked(true);
        }
      } catch (err) {
        // On Firestore error, don't block the page
        if (mounted) setAuthChecked(true);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  // allowedRole is the only real dependency; router is accessed via ref
  }, [allowedRole]);

  return authChecked;
}
