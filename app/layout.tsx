'use client';
import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <nav className="nav">
            <a className="logo" href="/">Anthony</a>
            <ul className="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} Anthony. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}


