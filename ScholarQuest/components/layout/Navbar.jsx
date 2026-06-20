'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/discovery', label: 'Discover' },
  { href: '/ai-matcher', label: 'AI Matcher' },
  { href: '/tracker', label: 'Tracker' },
  { href: '/help', label: 'Help' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 ease-in-out ${isScrolled ? 'pt-4 sm:pt-6 px-4 sm:px-6' : 'pt-0 px-0'}`}>
      <nav className={`w-full pointer-events-auto transition-all duration-500 ease-in-out relative ${isScrolled ? 'bg-white/80 backdrop-blur-xl max-w-5xl rounded-full border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)]' : 'bg-transparent max-w-7xl rounded-none border-transparent shadow-none'}`}>
        <div className={`flex justify-between items-center w-full transition-all duration-500 ease-in-out ${isScrolled ? 'h-16 px-4 lg:px-6' : 'h-24 px-6 lg:px-8'}`}>
          
          {/* Left: Brand */}
          <div className="flex justify-start items-center">
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="relative w-10 h-10 rounded-full shadow-sm bg-white overflow-hidden border border-slate-100 group-hover:shadow-md transition-all">
                 <img src="/Logo.png.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className={`font-extrabold text-xl tracking-tight transition-colors duration-300 ${isScrolled ? 'text-slate-800' : 'text-slate-900'}`}>
                Scholar<span className="text-primary">Quest</span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden lg:flex justify-center items-center gap-1 mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : `hover:bg-black/5 ${isScrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-700 hover:text-slate-900'}`
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Desktop Actions & Mobile Menu Toggle */}
          <div className="flex justify-end items-center gap-1 flex-shrink-0">
            {/* Desktop specific buttons */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/provider-login"
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition-all rounded-full hover:bg-black/5 ${isScrolled ? 'text-slate-600 hover:text-slate-800' : 'text-slate-700 hover:text-slate-900'}`}
              >
                <span className="material-symbols-outlined text-[16px]">corporate_fare</span>
                <span className="hidden xl:inline">Company / Institute</span>
                <span className="inline xl:hidden">Institute</span>
              </Link>

              <div className={`w-px h-5 mx-1.5 transition-colors duration-300 ${isScrolled ? 'bg-slate-200' : 'bg-slate-300/60'}`} />

              <Link
                href="/login"
                className={`px-4 py-2.5 text-sm font-bold transition-all rounded-full hover:bg-black/5 ${isScrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-700 hover:text-slate-900'}`}
              >
                Sign In
              </Link>
            </div>
            
            <Link
              href="/signup"
              className="hidden md:inline-flex px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm shadow-primary/25 ml-1 lg:ml-2"
            >
              Get Started
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className={`lg:hidden p-2 rounded-full transition-colors ml-2 hover:bg-black/5 ${isScrolled ? 'text-slate-600' : 'text-slate-800'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown (Floating Card) */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-[calc(100%+0.5rem)] bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-5 shadow-[0_10px_40px_rgb(0,0,0,0.1)] transition-all">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="h-px bg-slate-100 my-3" />
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-4 py-3 text-sm font-bold text-slate-700 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-4 py-3 bg-primary text-white text-sm font-bold rounded-2xl shadow-sm shadow-primary/25 active:scale-[0.98] transition-transform"
              >
                Get Started Free
              </Link>
              <Link
                href="/provider-login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 px-4 py-3 mt-2 text-xs font-bold text-slate-500 border border-slate-200 rounded-2xl bg-white hover:bg-slate-50"
              >
                <span className="material-symbols-outlined text-[16px]">corporate_fare</span>
                Company / Institute Portal
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
