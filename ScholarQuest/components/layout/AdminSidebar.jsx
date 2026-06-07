'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Overview', icon: 'dashboard' },
  { href: '/admin/scholarships', label: 'Scholarships', icon: 'school' },
  { href: '/admin/students', label: 'Students', icon: 'group' },
  { href: '/admin/applications', label: 'Applications', icon: 'description' },
  { href: '/admin/reports', label: 'Reports', icon: 'analytics' },
  { href: '/admin/settings', label: 'Settings', icon: 'settings' },
];

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

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
        <div className="px-6 mb-8">
          <h1 className="font-headline-md text-headline-md text-primary font-bold">Scholar Admin</h1>
          <p className="text-on-surface-variant font-label-sm text-label-sm">Management Portal</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-10 font-label-md text-label-md transition-all ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container scale-95'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Admin User Card */}
        <div className="px-6 mt-auto pt-4 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-10">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              AS
            </div>
            <div className="overflow-hidden flex-1">
              <p className="font-label-md text-label-md truncate">Alex Sterling</p>
              <p className="text-label-sm text-on-surface-variant truncate">Lead Admin</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Link
              href="/login"
              className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-low px-3 py-2 rounded-6 transition-all text-sm"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person</span>
              <span className="font-label-md text-label-md">Student Portal</span>
            </Link>
            <Link
              href="/admin-login"
              className="flex items-center gap-3 text-error hover:bg-error-container/20 px-3 py-2 rounded-6 transition-all"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
              <span className="font-label-md text-label-md">Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
