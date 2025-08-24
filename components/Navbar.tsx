'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [hash, setHash] = useState<string>('');
  const pathname = usePathname();

  // Mount effect: resolve theme from storage/system and apply to <html>
  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const stored = window.localStorage.getItem('theme');
    let initial: 'light' | 'dark' = 'dark';
    if (stored === 'dark' || stored === 'light') initial = stored;
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) initial = 'dark';
    setTheme(initial);
    if (initial === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, []);

  // Persist theme changes
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    window.localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track hash for active section links
  useEffect(() => {
    const syncHash = () => setHash(window.location.hash || '');
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return hash === href;
    }
    return pathname === href;
  };

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <nav className="nav">
        <Link className="logo" href="/">Anthony</Link>

        <div className="nav-center">
          <ul className={`nav-links${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
            <li><Link className={isActive('/') ? 'active' : ''} href="/">Home</Link></li>
            <li><Link className={isActive('#projects') ? 'active' : ''} href="/#projects">Projects</Link></li>
            <li><Link className={isActive('#contact') ? 'active' : ''} href="/#contact">Contact</Link></li>
          </ul>
        </div>

        <div className="nav-right">
          <button
            className="theme-toggle"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            <span aria-hidden suppressHydrationWarning>{mounted ? (theme === 'dark' ? '🌙' : '☀️') : '☀️'}</span>
          </button>
          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </nav>
    </header>
  );
}


