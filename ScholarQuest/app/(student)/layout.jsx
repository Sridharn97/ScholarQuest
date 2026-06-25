'use client';
import StudentSidebar from '@/components/layout/StudentSidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getUserName, getUserInitials, clearSession } from '@/lib/store';
import useRoleProtection from '@/lib/hooks/useRoleProtection';

const mobileMenuLinks = [
  { href: '/messages', label: 'Messages', icon: 'chat' },
  { href: '/help', label: 'Help Center', icon: 'help' },
];

export default function StudentLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('Alex');
  const [userInitials, setUserInitials] = useState('AJ');
  const pathname = usePathname();
  const router = useRouter();
  const authChecked = useRoleProtection('student');

  useEffect(() => {
    if (!authChecked) return;

    Promise.resolve().then(() => {
      setUserName(getUserName());
      setUserInitials(getUserInitials());
    });

    // Listen for store updates
    const handler = () => {
      setUserName(getUserName());
      setUserInitials(getUserInitials());
    };
    window.addEventListener('sq_update', handler);
    return () => window.removeEventListener('sq_update', handler);
  }, [authChecked]);

  const handleLogout = () => {
    clearSession();
    router.push('/login');
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-primary animate-spin" style={{ fontSize: '40px' }}>progress_activity</span>
          <p className="text-on-surface-variant font-label-md">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar onLogout={handleLogout} userName={userName} userInitials={userInitials} />

      <main className="flex-1 min-w-0 overflow-y-auto relative bg-[#F8F9FB]">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex justify-between items-center w-full px-10 py-5 bg-[#F8F9FB]">
          {/* Mobile Menu Toggle & Logo */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              className="p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" style={{ fontFamily: 'Manrope, sans-serif' }}>ScholarQuest</span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block relative w-full max-w-[480px]">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
            <input
              type="text"
              placeholder="Search scholarships, grants, or institutions..."
              className="w-full bg-[#F3F4F6] rounded-full py-3 pl-12 pr-4 text-sm font-medium text-gray-700 outline-none border-none focus:ring-2 focus:ring-[#4F39F6]/20 placeholder-gray-400"
            />
          </div>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Removed as requested */}
          </div>
        </header>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute inset-0 z-20 top-16 bg-surface border-t border-outline-variant/20 p-4 min-h-[calc(100vh-64px)]">
            <div className="space-y-2">
              <p className="font-label-sm text-on-surface-variant uppercase tracking-widest px-4 mb-4">More Options</p>
              {mobileMenuLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-10 transition-all ${isActive ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'
                      }`}
                  >
                    <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{link.icon}</span>
                    <span className="font-label-md">{link.label}</span>
                  </Link>
                );
              })}

              <div className="h-px bg-outline-variant/20 my-4" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container/30 rounded-10 transition-all w-full"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="font-label-md">Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="pb-20 md:pb-0">
          {children}
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
}
