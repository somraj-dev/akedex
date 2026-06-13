'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Activity } from 'lucide-react';

interface NavbarProps {
  sticky?: boolean;
  onHomeClick?: () => void;
}

export default function Navbar({ sticky = true, onHomeClick }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Our Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path === '/' && onHomeClick) {
      onHomeClick();
    }
  };

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav 
      className="nav-header"
      style={{
        position: sticky ? 'sticky' : 'relative',
        top: sticky ? 0 : 'auto',
        zIndex: 1000,
      }}
      aria-label="Main Navigation"
    >
      {/* Logo Section */}
      <Link 
        href="/" 
        className="nav-logo" 
        onClick={() => handleLinkClick('/')}
        aria-label="Akedex Home"
      >
        <div style={{ 
          width: '28px', 
          height: '28px', 
          background: '#000000', 
          borderRadius: '50%', 
          color: '#ffffff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Activity size={14} />
        </div>
        <span>Akedex</span>
      </Link>

      {/* Desktop Menu */}
      <ul className="nav-desktop-menu" role="menubar">
        {navItems.map((item) => (
          <li key={item.label} role="none">
            <Link
              href={item.path}
              className={`nav-link ${isLinkActive(item.path) ? 'active' : ''}`}
              onClick={() => handleLinkClick(item.path)}
              role="menuitem"
              aria-current={isLinkActive(item.path) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Toggle Button */}
      <button
        className="nav-mobile-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
        aria-label={mobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
      >
        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Dropdown Drawer */}
      <ul 
        id="mobile-navigation"
        className={`nav-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
        role="menu"
      >
        {navItems.map((item) => (
          <li key={item.label} role="none">
            <Link
              href={item.path}
              className={`nav-mobile-link ${isLinkActive(item.path) ? 'active' : ''}`}
              onClick={() => handleLinkClick(item.path)}
              role="menuitem"
              aria-current={isLinkActive(item.path) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
