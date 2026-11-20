import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { AuthSession } from '../types';

interface NavbarProps {
  session: AuthSession | null;
  onNavigateLogin: () => void;
  onNavigateDashboard: () => void;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  session,
  onNavigateLogin,
  onNavigateDashboard,
  onNavigateHome,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Courses', href: '#courses' },
    { label: 'Free Resources', href: '#resources' },
    { label: 'Teachers', href: '#teachers' },
    { label: 'Reviews', href: '#reviews' },
  ];

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-indigo-500/20 bg-[#060919]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="font-display flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-md"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <defs>
              <linearGradient id="ictLogoGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <rect width="28" height="28" rx="7" fill="url(#ictLogoGrad)" />
            <path
              d="M8.5 18.5V9.5H10.7V18.5H8.5ZM13 18.5L16.8 9.5H19L15.2 18.5H13ZM18.4 15.8L20.3 18.5H18L16.7 16.5L18.4 15.8Z"
              fill="white"
            />
          </svg>
          <span>ICT From ABC</span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-indigo-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          {session ? (
            <button
              type="button"
              onClick={onNavigateDashboard}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-blue-500 hover:to-purple-500 transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <span>My Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onNavigateLogin}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-blue-500 hover:to-purple-500 transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <span>Portal Login</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border border-indigo-500/30 bg-[#0D132B] text-slate-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-indigo-500/20 bg-[#090E23] px-4 py-4">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-slate-200 hover:bg-indigo-500/10 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
