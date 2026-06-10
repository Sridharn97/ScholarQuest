'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearSession } from '@/lib/store';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/discovery', label: 'Discovery', icon: 'search' },
  { href: '/tracker', label: 'Applications', icon: 'assignment' },
  { href: '/ai-matcher', label: 'AI Matcher', icon: 'auto_awesome' },
  { href: '/profile', label: 'Profile', icon: 'account_circle' },
  { href: '/messages', label: 'Messages', icon: 'chat' },
  { href: '/settings', label: 'Settings', icon: 'settings' },
];

export default function StudentSidebar({ onLogout, userName, userInitials }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (onLogout) { onLogout(); } else {
      clearSession();
      router.push('/login');
    }
  };

  return (
    <aside className="hidden lg:flex flex-col h-screen sticky top-0 p-4 bg-surface border-r border-outline-variant/30 w-64 shrink-0">
      {/* Logo */}
      <div className="mb-12 px-2 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-3 w-full pl-2">
          <img src="/Logo.png.png" alt="Logo" className="w-10 h-10 rounded-full object-cover shadow-sm border border-outline-variant/20" />
          <span className="font-headline-md text-headline-md text-primary font-extrabold tracking-tight">
            ScholarQuest
          </span>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-outline-variant/30 scrollbar-track-transparent">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 rounded-12 px-4 py-3.5 font-label-md text-label-md transition-all duration-200 group ${
                isActive
                  ? 'bg-primary/10 text-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span
                className={`material-symbols-outlined transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className="mt-auto pt-6 space-y-4">
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
          <p className="font-label-sm text-label-sm text-primary mb-2">Need funding?</p>
          <Link
            href="/discovery"
            className="block w-full py-2 px-4 bg-primary text-white rounded-6 font-label-md text-center hover:bg-primary/90 transition-colors"
          >
            Find Scholarships
          </Link>
        </div>

        {/* User info + logout */}
        <div className="flex flex-col space-y-1 border-t border-outline-variant/20 pt-4">
          {userName && (
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {userInitials || 'AJ'}
              </div>
              <span className="font-label-sm text-on-surface truncate">{userName}</span>
            </div>
          )}
          <Link
            href="/help"
            className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-low px-4 py-2 rounded-6 transition-all"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-md text-label-md">Help Center</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-error hover:bg-surface-container-low px-4 py-2 rounded-6 transition-all w-full"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
