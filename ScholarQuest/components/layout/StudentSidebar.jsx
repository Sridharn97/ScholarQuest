'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearSession } from '@/lib/store';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'grid_view' },
  { href: '/discovery', label: 'Discovery', icon: 'explore' },
  { href: '/tracker', label: 'Applications', icon: 'description' },
  { href: '/ai-matcher', label: 'AI Matcher', icon: 'lightbulb' },
  { href: '/profile', label: 'Profile', icon: 'person_outline' },
  { href: '/messages', label: 'Messages', icon: 'mail' },
  { href: '/help', label: 'Help Center', icon: 'help' },
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
    <aside className="hidden lg:flex flex-col h-screen sticky top-0 bg-[#FAFAFA] border-r border-outline-variant/30 w-[260px] shrink-0">
      {/* Logo */}
      <div className="pt-10 pb-8 px-8">
        <Link href="/" className="block">
          <h1 className="text-[#0A2540] font-bold text-2xl tracking-tight leading-tight">ScholarQuest</h1>
          <p className="text-sm text-gray-500 mt-1">Higher Ed Funding</p>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-2 mt-4 px-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                  ? 'bg-[#EAE4FF] text-[#4F39F6]'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              <span className="material-symbols-outlined text-[20px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className="mt-auto p-6 space-y-6 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <button className="w-full py-3 bg-[#0A2540] text-white rounded-xl font-medium text-sm hover:bg-[#0A2540]/90 transition-colors">
          Apply Now
        </button>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-[#0A2540] flex items-center justify-center text-white font-bold shrink-0">
              {userInitials || 'ST'}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-gray-900 leading-tight truncate">{userName || 'Student'}</span>
              <span className="text-xs text-gray-500 truncate">Student</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 shrink-0 ml-2"
            title="Logout"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

