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
  const [providerInfo, setProviderInfo] = useState({ name: 'Provider', initials: 'P', role: 'Coordinator', organization: 'Company or Institute', photoURL: null });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const d = await getDoc(doc(db, 'users', user.uid));
        if (d.exists()) {
          const data = d.data();
          const name = data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Provider';
          let initials = data.initials;
          if (!initials || !initials.trim()) {
            initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'P';
          }
          setProviderInfo({
            name: name,
            initials: initials,
            role: data.role || 'Coordinator',
            organization: data.organization || user.email || 'Company or Institute',
            photoURL: user.photoURL || data.photoURL || null
          });
        } else {
          // Fallback if user document doesn't exist yet but user is authenticated
          const name = user.displayName || 'Provider';
          setProviderInfo({
            name: name,
            initials: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'P',
            role: 'Coordinator',
            organization: user.email || 'Company or Institute',
            photoURL: user.photoURL || null
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
      
      <aside className={`fixed left-0 top-0 bottom-0 flex flex-col py-6 h-screen w-64 border-r border-gray-200 bg-white z-30 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Mobile close button */}
        <div className="absolute top-4 right-4 lg:hidden">
          <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-md text-gray-500">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Brand */}
        <div className="px-5 mb-8 flex items-center gap-3">
          <img src="/scholarquest-logo.png" alt="Logo" className="w-8 h-8 rounded-full object-cover border border-gray-200" />
          <div>
            <h1 className="font-bold text-gray-900 text-lg tracking-tight leading-none">ScholarQuest</h1>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-0.5 font-semibold">Sponsor Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/provider' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Provider User Card */}
        <div className="px-4 mt-auto pt-4 space-y-2">
          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors border border-transparent">
            {providerInfo.photoURL ? (
              <img src={providerInfo.photoURL} alt="User Logo" className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-200 bg-white" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0 border border-primary/20">
                {providerInfo.initials}
              </div>
            )}
            <div className="overflow-hidden flex-1">
              <p className="font-semibold text-sm truncate text-gray-900">{providerInfo.name}</p>
              <p className="text-gray-500 text-xs truncate">{providerInfo.organization}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 px-2">
            <Link
              href="/"
              className="flex items-center gap-3 text-gray-500 hover:text-gray-900 px-2 py-1.5 rounded-md transition-colors text-sm font-medium"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>public</span>
              <span>Public Home</span>
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-3 text-gray-500 hover:text-red-600 px-2 py-1.5 rounded-md transition-colors w-full text-left font-medium text-sm"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
