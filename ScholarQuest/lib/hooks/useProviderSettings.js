'use client';
import { useState, useEffect } from 'react';
import { getProviderInfo } from '@/lib/store';

export default function useProviderSettings() {
  const [providerInfo, setProviderInfo] = useState({
    name: 'Sponsor Coordinator',
    initials: 'SC',
    role: 'Coordinator',
    organization: 'Company or Institute'
  });

  useEffect(() => {
    const info = getProviderInfo();
    if (info) {
      Promise.resolve().then(() => {
        setProviderInfo(info);
      });
    }
  }, []);

  return {
    providerInfo,
    setProviderInfo,
  };
}
