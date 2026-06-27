'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function useProviderSettings() {
  const [providerInfo, setProviderInfo] = useState({
    name: 'Sponsor Coordinator',
    initials: 'SC',
    role: 'Coordinator',
    organization: 'Company or Institute'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const d = await getDoc(doc(db, 'users', user.uid));
        if (d.exists()) {
          setProviderInfo(d.data());
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    providerInfo,
    setProviderInfo,
  };
}
