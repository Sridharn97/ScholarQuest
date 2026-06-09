'use client';
import StudentSidebar from '@/components/layout/StudentSidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isLoggedIn, getUserName, getUserInitials, clearSession, ensureDefaults, isProviderLoggedIn } from '@/lib/store';

const mobileMenuLinks = [
  { href: '/messages', label: 'Messages', icon: 'chat' },
  { href: '/settings', label: 'Settings', icon: 'settings' },
  { href: '/help', label: 'Help Center', icon: 'help' },
];

export default function StudentLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('Alex');
  const [userInitials, setUserInitials] = useState('AJ');
  const [authChecked, setAuthChecked] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      if (isProviderLoggedIn()) {
        router.replace('/provider');
      } else {
        router.replace('/login');
      }
      return;
    }
    ensureDefaults();
    setUserName(getUserName());
    setUserInitials(getUserInitials());
    setAuthChecked(true);

    // Listen for store updates
    const handler = () => {
      setUserName(getUserName());
      setUserInitials(getUserInitials());
    };
    window.addEventListener('sq_update', handler);
    return () => window.removeEventListener('sq_update', handler);
  }, [router]);

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

      <main className="flex-1 min-w-0 overflow-y-auto relative">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex justify-between items-center w-full px-gutter bg-white/80 backdrop-blur-md border-b border-outline-variant/20 h-16 shadow-sm">
          {/* Mobile Menu Toggle & Logo */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              className="p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-6 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
            <Link href="/" className="flex items-center gap-2">
              <img src="/Logo.png.png" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-headline-md text-headline-md text-primary font-extrabold tracking-tight">SQ</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">search</span>
              <input
                type="text"
                placeholder="Search scholarships..."
                className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-full w-64 focus:ring-2 focus:ring-primary/20 text-body-sm transition-all outline-none"
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
              <div className="text-right hidden sm:block">
                <p className="font-label-md text-on-surface leading-tight">Welcome, {userName.split(' ')[0]}</p>
                <p className="font-label-sm text-on-surface-variant">Senior Scholar</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center text-primary font-bold cursor-pointer hover:bg-primary/20 transition-colors">
                {userInitials}
              </div>
            </div>
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-10 transition-all ${
                      isActive ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'
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
