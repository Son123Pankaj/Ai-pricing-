import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ArrowUpRight, Menu, X, Moon, Sun } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';

const SANDBOX_URL = 'https://ai.avyukta.in/';

const LINKS = [
  { label: 'Pricing & voices', href: '/#pricing', id: 'pricing', aliases: ['plans-section'] },
  { label: 'Platform', href: '/#platform-showcase', id: 'platform-showcase', aliases: ['product', 'platform'] },
  { label: 'Why Us', href: '/#why-avyukta', id: 'why-avyukta', aliases: ['why-us'] },
  { label: 'Automation', href: '/#automation-showcase', id: 'automation-showcase', aliases: ['automation', 'features'] },
  { label: 'Industries', href: '/#industries', id: 'industries', aliases: [] },
  { label: 'Voice Samples', href: '/#voice-samples', id: 'voice-samples', aliases: ['samples'] },
  { label: 'FAQs', href: '/#faq', id: 'faq', aliases: [] },
];

const ALL_SECTIONS = [
  { id: 'hero', navId: 'hero' },
  { id: 'pricing', navId: 'pricing' },
  { id: 'plans-section', navId: 'pricing' },
  { id: 'why-avyukta', navId: 'why-avyukta' },
  { id: 'why-us', navId: 'why-avyukta' },
  { id: 'platform-showcase', navId: 'platform-showcase' },
  { id: 'product', navId: 'platform-showcase' },
  { id: 'clients-and-affiliates', navId: 'platform-showcase' },
  { id: 'automation-showcase', navId: 'automation-showcase' },
  { id: 'automation', navId: 'automation-showcase' },
  { id: 'industries', navId: 'industries' },
  { id: 'voice-samples', navId: 'voice-samples' },
  { id: 'faq', navId: 'faq' }
];

function resolveElement(targetId) {
  if (!targetId) return null;
  const direct = document.getElementById(targetId);
  if (direct) return direct;

  const item = LINKS.find(l => l.id === targetId || l.aliases.includes(targetId));
  if (item) {
    const mainEl = document.getElementById(item.id);
    if (mainEl) return mainEl;
    for (const a of item.aliases) {
      const aliasEl = document.getElementById(a);
      if (aliasEl) return aliasEl;
    }
  }
  return null;
}

export default function Navbar({ currentPath, navigateTo, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const isClickScrolling = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Track scrolled state for navbar elevation
  useEffect(() => {
    const checkScroll = () => setScrolled(window.scrollY > 12);
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!menuOpen) return undefined;
    const esc = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [menuOpen]);

  // Automatic high-precision Scroll-Spy active tracking
  useEffect(() => {
    if (currentPath !== '/') {
      setActiveId('');
      return undefined;
    }

    const handleScrollSpy = () => {
      if (isClickScrolling.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Scrolled to very top (hero is active)
      if (scrollY < 120) {
        setActiveId('hero');
        return;
      }

      // Reached near bottom of the page (FAQs or last section active)
      if (scrollY + viewportHeight >= docHeight - 60) {
        setActiveId('faq');
        return;
      }

      // Find which section encompasses the active viewport reading line (approx 120px from top)
      const offsetLine = 140;
      let matchedNavId = null;

      for (const sec of ALL_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offsetLine && rect.bottom > offsetLine) {
          matchedNavId = sec.navId;
          break;
        }
      }

      if (matchedNavId) {
        setActiveId(matchedNavId);
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [currentPath]);

  // Synchronize initial hash on mount or hash change
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace(/^#/, '');
      if (!rawHash) {
        if (window.scrollY < 120) setActiveId('hero');
        return;
      }

      const matchedLink = LINKS.find(l => l.id === rawHash || l.aliases.includes(rawHash));
      if (matchedLink) {
        setActiveId(matchedLink.id);
        const target = resolveElement(rawHash);
        if (target) {
          isClickScrolling.current = true;
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            isClickScrolling.current = false;
          }, 800);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavClick = useCallback((e, item) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setMenuOpen(false);

    if (currentPath !== '/') {
      if (navigateTo) {
        navigateTo(item.href);
      } else {
        window.location.href = item.href;
      }
      return;
    }

    const target = resolveElement(item.id);
    if (target) {
      isClickScrolling.current = true;
      setActiveId(item.id);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      window.history.replaceState(null, '', `#${item.id}`);

      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 700);
    } else if (navigateTo) {
      navigateTo(item.href);
    } else {
      window.location.href = item.href;
    }
  }, [currentPath, navigateTo]);

  const handleLogoClick = useCallback((e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (currentPath !== '/') {
      if (navigateTo) navigateTo('/');
      else window.location.href = '/';
      return;
    }

    isClickScrolling.current = true;
    setActiveId('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', '/');

    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  }, [currentPath, navigateTo]);

  return (
    <header className={`landing-header studio-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="landing-wrap landing-nav studio-nav-shell">
        
        {/* Brand Logo */}
        <a 
          href="/" 
          className="landing-brand studio-brand" 
          onClick={handleLogoClick} 
          aria-label="Avyukta IntelliCall – Home"
        >
          <img 
            src={getAssetUrl(theme === 'dark' ? '/avyukta-intellicall-logo-dark.png' : '/avyukta-intellicall-logo-light.png')} 
            alt="Avyukta IntelliCall" 
            width={210}
            height={44}
            style={{ objectFit: 'contain' }}
          />
        </a>

        {/* Center Desktop Navigation */}
        <nav className="landing-desktop-nav studio-desktop-nav" aria-label="Primary navigation">
          {LINKS.map(item => {
            const isActive = currentPath === '/' && activeId === item.id;
            return (
              <a 
                key={item.id} 
                href={item.href} 
                onClick={e => handleNavClick(e, item)} 
                className={`landing-nav-link ${isActive ? 'active' : ''}`} 
                aria-current={isActive ? 'location' : undefined}
              >
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="landing-actions studio-nav-actions">
          {/* Light / Dark Theme Toggle */}
          <button 
            type="button" 
            className="landing-icon studio-theme-btn" 
            onClick={toggleTheme} 
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} 
            title="Change color theme"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Sandbox CTA Button */}
          <a 
            className="landing-button compact studio-nav-contact" 
            href={SANDBOX_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Sandbox (opens in new tab)"
          >
            <span>Sandbox</span>
            <ArrowUpRight size={15} />
          </a>

          {/* Mobile Hamburger Button */}
          <button 
            type="button" 
            className="landing-menu-btn studio-menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-expanded={menuOpen} 
            aria-controls="studio-mobile-menu" 
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={`studio-mobile-menu ${menuOpen ? 'open' : ''}`} 
        id="studio-mobile-menu" 
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {LINKS.map(item => {
            const isActive = currentPath === '/' && activeId === item.id;
            return (
              <a 
                key={item.id} 
                href={item.href} 
                className={`landing-nav-link ${isActive ? 'active' : ''}`} 
                aria-current={isActive ? 'location' : undefined}
                onClick={e => handleNavClick(e, item)}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={17} />
              </a>
            );
          })}
        </nav>
        <div className="mobile-menu-cta-wrap">
          <a 
            className="landing-button studio-btn studio-btn-primary" 
            href={SANDBOX_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Sandbox</span>
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </header>
  );
}
