'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerProvider, setProviderSession, isLoggedIn } from '@/lib/store';

export default function useProviderSignup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e) => {
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

    const provider = registerProvider({
      firstName,
      lastName,
      email,
      password,
      organization,
      role: entityType === 'Institute' ? 'Academic Representative' : 'Corporate Sponsor',
    });

    if (!provider) {
      setError('An account with this email already exists.');
      setLoading(false);
      return;
    }

    setProviderSession(provider);
    setSuccess(true);
    setTimeout(() => {
      router.push('/provider');
    }, 1000);
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
