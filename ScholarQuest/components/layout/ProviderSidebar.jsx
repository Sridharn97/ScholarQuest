'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/provider', label: 'Overview', icon: 'dashboard' },
  { href: '/provider/scholarships', label: 'Scholarships', icon: 'school' },
  { href: '/provider/applications', label: 'Applications', icon: 'description' },
  { href: '/provider/messages', label: 'Messages', icon: 'forum' },
  { href: '/provider/reports', label: 'Reports', icon: 'analytics' },
  { href: '/provider/settings', label: 'Settings', icon: 'settings' },
  { href: '/help', label: 'Help Center', icon: 'help' },
];

export default function ProviderSidebar({ isOpen, setIsOpen, onLogout }) {
  const pathname = usePathname();
  const [providerInfo, setProviderInfo] = useState({ name: 'Provider', initials: 'GC', role: 'Coordinator', organization: 'Company or Institute' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const d = await getDoc(doc(db, 'users', user.uid));
        if (d.exists()) {
          const data = d.data();
          setProviderInfo({
            name: data.name || 'Provider',
            initials: data.initials || 'P',
            role: data.role || 'Coordinator',
            organization: data.organization || 'Company or Institute'
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`fixed left-0 top-0 bottom-0 flex flex-col py-6 h-screen w-64 border-r border-outline-variant bg-surface z-30 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Mobile close button */}
        <div className="absolute top-4 right-4 lg:hidden">
          <button onClick={() => setIsOpen(false)} className="p-2 bg-surface-container rounded-6 text-on-surface-variant">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Brand */}
        <div className="px-6 mb-8 flex items-center gap-2.5">
          <img src="/logo_provider.png" alt="Logo" className="w-8 h-8 rounded-full object-cover shadow-sm" />
          <div>
            <h1 className="font-extrabold text-gray-900 text-base tracking-tight leading-none">ScholarQuest</h1>
            <p className="text-on-surface-variant font-label-sm text-[10px] uppercase tracking-widest mt-0.5 font-bold">Sponsor Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/provider' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-10 font-label-md text-label-md transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Provider User Card */}
        <div className="px-6 mt-auto pt-4 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-10 border border-outline-variant/20">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
              {providerInfo.initials}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="font-label-md text-label-md truncate text-on-surface">{providerInfo.name}</p>
              <p className="text-label-sm text-on-surface-variant text-xs truncate">{providerInfo.organization}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-low px-3 py-2 rounded-6 transition-all text-sm"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>public</span>
              <span className="font-label-md text-label-md">Public Home</span>
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-3 text-error hover:bg-error-container/20 px-3 py-2 rounded-6 transition-all w-full text-left"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
              <span className="font-label-md text-label-md">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
