'use client';
import AdminSidebar from '@/components/layout/AdminSidebar';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen flex relative">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <main className="lg:ml-64 flex-1 flex flex-col min-h-screen min-w-0 w-full transition-all duration-300">
        {/* Fixed Admin Topbar */}
        <header className="sticky top-0 z-10 flex justify-between items-center px-4 lg:px-lg h-16 bg-surface/90 backdrop-blur-md shadow-sm border-b border-outline-variant/20">
          
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Hamburger */}
            <button 
              className="lg:hidden p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-6 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            <div className="relative w-full max-w-md hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input
                type="text"
                placeholder="Search applications..."
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-10 py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/25 transition-all text-body-md"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-all text-on-surface-variant relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
            </button>
            <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-surface-container-low transition-all text-on-surface-variant">
              <span className="material-symbols-outlined">help</span>
            </button>
            <div className="h-8 w-[1px] bg-outline-variant/30 mx-1 lg:mx-2" />
            <Link href="/" className="bg-primary-container text-on-primary-container px-3 lg:px-4 py-2 rounded-10 font-label-md text-label-sm lg:text-label-md hover:opacity-90 transition-opacity whitespace-nowrap">
              Student App
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-xl flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
