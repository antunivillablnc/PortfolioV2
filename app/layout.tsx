'use client';
import './globals.css';
import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navbar />
        {children}
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} Anthony. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}


