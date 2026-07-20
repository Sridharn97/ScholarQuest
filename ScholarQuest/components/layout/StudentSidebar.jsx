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
  { href: '/profile', label: 'Profile', icon: 'person_outline' },
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
      <div className="pt-10 pb-8 px-6">
        <Link href="/" className="flex items-center gap-3 block">
          <img src="/Logo.png.png" alt="ScholarQuest Logo" className="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-200" />
          <div>
            <h1 className="font-extrabold text-2xl tracking-tight leading-none bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" style={{ fontFamily: 'Manrope, sans-serif' }}>ScholarQuest</h1>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mt-1 font-bold">Higher Ed Funding</p>
          </div>
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
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                ? 'bg-[#EAE4FF] text-[#4F39F6]'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[20px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.href === '/application-status' && unreadCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className="mt-auto p-5 space-y-5 bg-white border-t border-slate-100 z-10 relative">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <button 
          onClick={() => router.push('/discovery')}
          className="w-full py-3 bg-[#0A2540] text-white rounded-xl font-bold text-sm hover:bg-[#0A2540]/90 transition-all shadow-md flex items-center justify-center gap-2"
        >
          Apply Now
        </button>

        <div className="flex items-center justify-between w-full bg-slate-50 p-2.5 rounded-2xl border border-slate-200/60 shadow-sm transition-colors hover:border-slate-300">
          <div className="flex items-center gap-3 overflow-hidden">
            {userPhoto ? (
              <img src={userPhoto} alt="User Logo" className="w-10 h-10 rounded-full object-cover shrink-0 border-2 border-white shadow-sm" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                {userInitials || 'ST'}
              </div>
            )}
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-slate-900 leading-tight truncate">{userName || 'Student'}</span>
              <span className="text-[11px] font-semibold text-slate-500 truncate">Student Account</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-xl hover:bg-red-50 shrink-0 ml-1"
            title="Logout"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
