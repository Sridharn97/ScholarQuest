'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn, isProviderLoggedIn, ensureDefaults } from '@/lib/store';

export default function useRoleProtection(allowedRole) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    ensureDefaults();
    if (allowedRole === 'student') {
      if (!isLoggedIn()) {
        if (isProviderLoggedIn()) {
          router.replace('/provider');
        } else {
          router.replace('/login');
        }
      } else {
        Promise.resolve().then(() => {
          setAuthChecked(true);
        });
      }
    } else if (allowedRole === 'provider') {
      if (!isProviderLoggedIn()) {
        if (isLoggedIn()) {
          router.replace('/dashboard');
        } else {
          router.replace('/provider-login');
        }
      } else {
        Promise.resolve().then(() => {
          setAuthChecked(true);
        });
      }
    }
  }, [router, allowedRole]);

  return authChecked;
}
