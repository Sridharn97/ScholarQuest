'use client';
import ProviderSidebar from '@/components/layout/ProviderSidebar';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isProviderLoggedIn, getProviderInfo, clearProviderSession, ensureDefaults } from '@/lib/store';

export default function ProviderLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [providerInfo, setProviderInfo] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    ensureDefaults();
    if (!isProviderLoggedIn()) {
      window.location.href = '/provider-login';
      return;
    }
    setProviderInfo(getProviderInfo());
    setAuthChecked(true);

    const handler = () => {
      setProviderInfo(getProviderInfo());
    };
    window.addEventListener('sq_update', handler);
    return () => window.removeEventListener('sq_update', handler);
  }, []);

  const handleLogout = () => {
    clearProviderSession();
    window.location.href = '/provider-login';
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-primary animate-spin" style={{ fontSize: '40px' }}>progress_activity</span>
          <p className="text-on-surface-variant font-label-md">Loading Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen flex relative">
      <ProviderSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={handleLogout} />
      
      <main className="lg:ml-64 flex-1 flex flex-col min-h-screen min-w-0 w-full transition-all duration-300">
        {/* Fixed Provider Topbar */}
        <header className="sticky top-0 z-10 flex justify-between items-center px-4 lg:px-lg h-16 bg-white/80 backdrop-blur-md shadow-sm border-b border-outline-variant/20">
          
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="lg:hidden p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-6 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            <div className="relative w-full max-w-md hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input
                type="text"
                placeholder="Search portal..."
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-10 py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/25 transition-all text-body-md"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-all text-on-surface-variant relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-white" />
            </button>
            <div className="h-8 w-[1px] bg-outline-variant/30 mx-1 lg:mx-2" />
            
            {/* Provider info */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="font-label-md text-on-surface leading-tight font-bold">{providerInfo?.name || 'Sponsor'}</p>
                <p className="font-label-sm text-on-surface-variant text-xs">{providerInfo?.organization || 'Company or Institute'}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                {providerInfo?.initials || 'GC'}
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-error/10 text-error px-3 lg:px-4 py-2 rounded-10 font-label-md text-label-sm lg:text-label-md hover:bg-error/20 transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>logout</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-xl flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
