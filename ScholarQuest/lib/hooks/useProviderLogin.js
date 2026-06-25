'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validateProviderLogin, setProviderSession, isProviderLoggedIn, ensureDefaults, isLoggedIn } from '@/lib/store';

export default function useProviderLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ensureDefaults();
    if (isProviderLoggedIn()) {
      router.push('/provider');
    } else if (isLoggedIn()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const email = e.target.provider_email.value.trim();
    const password = e.target.provider_password.value;

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    const provider = validateProviderLogin(email, password);
    if (!provider) {
      setLoading(false);
      setError('Invalid email or password. Please try again.');
      return;
    }
    setProviderSession(provider);
    router.push('/provider');
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
