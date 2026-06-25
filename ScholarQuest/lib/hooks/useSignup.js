'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, setSession } from '@/lib/store';

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColors = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];

function getStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export default function useSignup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const strength = getStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    const firstName = form.first_name.value.trim();
    const lastName = form.last_name.value.trim();
    const email = form.signup_email.value.trim();
    const institution = form.institution.value.trim();

    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    const user = registerUser({ firstName, lastName, email, password, institution });
    setSession(user);
    setTimeout(() => router.push('/onboarding'), 300);
  };

  return {
    showPassword,
    setShowPassword,
    password,
    setPassword,
    error,
    setError,
    loading,
    strength,
    strengthLabels,
    strengthColors,
    handleSubmit,
  };
}
