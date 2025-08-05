'use client';

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '../firebase/firebaseAuthContext';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Converts a slug like "ode-to-sunrise" to "Ode To Sunrise"
function prettifySlug(slug) {
  if (!slug) return '';
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function getTitleByPathname(pathname) {
  if (pathname === '/' || pathname === '/home') {
    return 'PoemSite | A Beautiful Poetry Collection';
  }
  if (pathname.startsWith('/poem/')) {
    const slug = pathname.split('/poem/')[1]?.split('/')[0];
    return slug
      ? `${prettifySlug(slug)} | PoemSite`
      : 'PoemSite | Read Poem';
  }
  if (pathname === '/about') {
    return 'About | PoemSite';
  }
  if (pathname === '/contact') {
    return 'Contact | PoemSite';
  }
  if (pathname === '/poem') {
    return 'Poem | PoemSite';
  }
  if (pathname === '/login') {
    return 'Login | PoemSite';
  }
  if (pathname === '/signup') {
    return 'Signup | PoemSite';
  }
  // Add more routes as needed
  return 'PoemSite';
}

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [title, setTitle] = useState('PoemSite | A Beautiful Poetry Collection');

  useEffect(() => {
    setTitle(getTitleByPathname(pathname));
  }, [pathname]);

  // Dynamically update <title> and meta from the client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = title;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = 'A beautiful poetry collection.';
    }
  }, [title]);

  return (
    <html lang="en">
      <head>
        {/* Next.js Head will not work in client component so use native tags */}
        <meta name="description" content="A beautiful poetry collection." />
        <meta property="og:site_name" content="PoemSite Toshan Kanwar"/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://poems.toshankanwar.website" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Serif+4:wght@400;700&display=swap" rel="stylesheet"></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-xxxx"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="bg-white text-gray-900">
        <AuthProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}