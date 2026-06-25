'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validateLogin, setSession, isLoggedIn, isProviderLoggedIn } from '@/lib/store';

export default function useLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace('/dashboard');
    } else if (isProviderLoggedIn()) {
      router.replace('/provider');
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const email = e.target.login_email.value.trim();
    const password = e.target.login_password.value;

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    const user = validateLogin(email, password);
    if (!user) {
      setLoading(false);
      setError('Invalid email or password. Please try again.');
      return;
    }
    setSession(user);
    router.push('/dashboard');
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
