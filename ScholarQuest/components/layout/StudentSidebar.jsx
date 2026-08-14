'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import useNotifications from '@/lib/hooks/useNotifications';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'grid_view' },
  { href: '/discovery', label: 'Discovery', icon: 'explore' },
  { href: '/tracker', label: 'Applications', icon: 'description' },
  { href: '/ai-matcher', label: 'AI Matcher', icon: 'lightbulb' },
  { href: '/calculator', label: 'Calculator', icon: 'calculate' },
  { href: '/messages', label: 'Messages', icon: 'mail' },
  { href: '/application-status', label: 'Application Status', icon: 'rule_folder' },
];

export default function StudentSidebar({ onLogout, userName, userInitials, userPhoto }) {
  const pathname = usePathname();
  const router = useRouter();
  const { unreadCount } = useNotifications();

  const handleLogout = async () => {
    if (onLogout) { onLogout(); } else {
      await signOut(auth);
      router.push('/login');
    }
  };

  return (
    <aside className="hidden lg:flex flex-col h-screen sticky top-0 bg-[#FAFAFA] border-r border-outline-variant/30 w-[260px] shrink-0">
      {/* Logo */}
      <div className="pt-8 pb-6 px-6">
        <Link href="/" className="flex items-center gap-3 block">
          <img src="/scholarquest-logo.png" alt="ScholarQuest Logo" className="w-8 h-8 rounded-full object-cover border border-gray-200" />
          <div>
            <h1 className="font-bold text-xl text-gray-900 tracking-tight leading-none" style={{ fontFamily: 'Manrope, sans-serif' }}>ScholarQuest</h1>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1 font-semibold">Higher Ed Funding</p>
          </div>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1 mt-2 px-3 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${isActive
                ? 'bg-[#EAE4FF] text-[#4F39F6] font-semibold'
                : 'text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.href === '/application-status' && unreadCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className="mt-auto p-4 space-y-4 bg-white border-t border-gray-200 z-10 relative">
        <button 
          onClick={() => router.push('/discovery')}
          className="w-full py-2 bg-[#0A2540] text-white rounded-md font-medium text-sm hover:bg-[#0A2540]/90 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          Apply Now
        </button>

        <div className="flex items-center justify-between w-full px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">
          <button onClick={() => router.push('/profile')} className="flex items-center gap-3 overflow-hidden text-left outline-none rounded-md cursor-pointer flex-1">
            {userPhoto ? (
              <img src={userPhoto} alt="User Logo" className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-200" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 border border-gray-200 flex items-center justify-center font-semibold text-sm shrink-0">
                {userInitials || 'ST'}
              </div>
            )}
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-gray-900 leading-tight truncate">{userName || 'Student'}</span>
              <span className="text-xs text-gray-500 truncate">Student Account</span>
            </div>
          </button>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-md hover:bg-red-50 shrink-0"
            title="Logout"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
