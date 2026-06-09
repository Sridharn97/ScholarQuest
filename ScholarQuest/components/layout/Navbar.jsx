'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/discovery', label: 'Discover' },
  { href: '/ai-matcher', label: 'AI Matcher' },
  { href: '/tracker', label: 'Tracker' },
  { href: '/help', label: 'Help' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6 lg:px-8">
        
        {/* Left: Brand + Desktop Nav Links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img src="/Logo.png.png" alt="Logo" className="w-8 h-8 rounded-full object-cover shadow-sm" />
            <span className="font-extrabold text-gray-900 text-lg tracking-tight">
              Scholar<span className="text-primary">Quest</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-6 text-sm font-semibold transition-all ${
                  pathname === link.href
                    ? 'text-primary bg-primary/8'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Desktop Actions & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          {/* Desktop specific buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/provider-login"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors rounded-6 hover:bg-gray-100/80"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>corporate_fare</span>
              Company / Institute
            </Link>

            <div className="w-px h-5 bg-gray-200 mx-1" />

            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-6 transition-all"
            >
              Sign In
            </Link>
          </div>
          
          <Link
            href="/signup"
            className="hidden md:inline-flex px-5 py-2 bg-primary text-white text-sm font-bold rounded-10 hover:bg-primary/90 active:scale-[0.97] transition-all shadow-sm shadow-primary/25"
          >
            Get Started
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-6 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-10 text-sm font-semibold transition-all ${
                  pathname === link.href
                    ? 'text-primary bg-primary/8'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="h-px bg-gray-100 my-2" />
          <div className="flex flex-col gap-3 pb-2">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center px-4 py-3 text-sm font-bold text-gray-700 bg-gray-50 rounded-10 hover:bg-gray-100 transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center px-4 py-3 bg-primary text-white text-sm font-bold rounded-10 shadow-sm shadow-primary/25 active:scale-[0.98] transition-transform"
            >
              Get Started Free
            </Link>
            <Link
              href="/provider-login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 px-4 py-3 mt-2 text-xs font-semibold text-gray-500 border border-gray-200 rounded-10"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>corporate_fare</span>
              Company / Institute Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
