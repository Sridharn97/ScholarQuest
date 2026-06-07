'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/discovery', label: 'Discovery', icon: 'search' },
  { href: '/tracker', label: 'Applications', icon: 'assignment' },
  { href: '/ai-matcher', label: 'AI Matcher', icon: 'auto_awesome' },
  { href: '/profile', label: 'Profile', icon: 'account_circle' },
  { href: '/messages', label: 'Messages', icon: 'chat' },
  { href: '/settings', label: 'Settings', icon: 'settings' },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col h-screen sticky top-0 p-4 bg-surface border-r border-outline-variant/30 w-64 shrink-0">
      {/* Logo */}
      <div className="mb-10 px-4">
        <Link href="/" className="font-headline-md text-headline-md text-primary font-extrabold tracking-tight">
          ScholarQuest
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-10 px-4 py-3 font-label-md text-label-md transition-all ${
                isActive
                  ? 'bg-secondary-container/10 text-secondary font-bold border-r-4 border-secondary translate-x-1'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:opacity-80'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
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
        <div className="flex flex-col space-y-1 border-t border-outline-variant/20 pt-4">
          <Link
            href="/help"
            className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-low px-4 py-2 rounded-6 transition-all"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-md text-label-md">Help Center</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 text-error hover:bg-surface-container-low px-4 py-2 rounded-6 transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
