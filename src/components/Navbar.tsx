import React, { useState, useEffect } from 'react';
import { Mail, Menu, X, Code2 } from 'lucide-react';

interface NavbarProps {
  onOpenInvitation: () => void;
  onOpenRsvp: () => void;
  onOpenNextJsGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInvitation,
  onOpenRsvp,
  onOpenNextJsGuide
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Invitation', href: '#invitation', onClick: onOpenInvitation },
    { label: 'Our Story', href: '#story' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Venue & Details', href: '#venue' },
    { label: 'Gift Registry', href: '#registry' },
    { label: 'Guestbook', href: '#guestbook' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-xs py-3'
          : 'bg-white/70 backdrop-blur-xs border-b border-sky-100/60 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display serif) */}
        <a
          href="#"
          className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 hover:text-sky-700 transition-colors whitespace-nowrap shrink-0"
        >
          Celeste &amp; Liam
        </a>

        {/* Zone 2: 4–5 single-line clean nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                }
              }}
              className="hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenNextJsGuide}
            className="px-3 py-2 text-xs font-medium text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
            title="Next.js Source & Export Guide"
          >
            <Code2 className="w-3.5 h-3.5 text-sky-500" />
            <span>Next.js Code</span>
          </button>

          <button
            onClick={onOpenInvitation}
            className="px-4 py-2 text-xs font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Open Invitation</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenInvitation}
            className="px-3 py-1.5 text-xs font-medium text-white bg-sky-500 rounded-lg whitespace-nowrap shrink-0"
          >
            Invitation
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-sky-100 px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                }
                setMobileMenuOpen(false);
              }}
              className="block py-1 text-sm font-medium text-slate-700 hover:text-sky-600"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-sky-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRsvp();
              }}
              className="w-full py-2 bg-slate-900 text-white text-xs font-medium rounded-lg text-center"
            >
              RSVP to Celebration
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenNextJsGuide();
              }}
              className="w-full py-2 border border-sky-200 text-sky-700 text-xs font-medium rounded-lg text-center"
            >
              View Next.js App Code
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
