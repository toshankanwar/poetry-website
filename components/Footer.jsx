'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10 px-4 sm:px-8 lg:px-20 border-t border-gray-300">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* Section 1: Site Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">PoemSite</h2>
          <p className="text-sm text-gray-600">
            Discover, share, and enjoy beautiful poetry from creators around the world.
          </p>
        </div>

        {/* Section 2: Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-black transition">Home</Link></li>
            <li><Link href="/poem" className="hover:text-black transition">Poems</Link></li>
            <li><Link href="/about" className="hover:text-black transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-black transition">Contact</Link></li>
          </ul>
        </div>

        {/* Section 3: Developed By */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Developed By</h3>
          <p className="text-sm text-gray-600">
            Designed & developed with ❤️ by{' '}
            <a
              href="https://toshankanwar.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              Toshan Kanwar
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            &copy; {new Date().getFullYear()} PoemSite. All rights reserved.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        Built with <span className="text-pink-500">Next.js</span> & <span className="text-yellow-500">Firebase</span> | Mobile-first & Responsive
      </div>
    </footer>
  );
}
