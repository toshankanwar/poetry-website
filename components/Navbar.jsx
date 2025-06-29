'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/firebase/firebaseAuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [closingMenu, setClosingMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef();
  const { user } = useAuth();
  const router = useRouter();
  const db = getFirestore(app);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setClosingMenu(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setClosingMenu(false);
      }, 300);
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const toggleSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setShowMenu(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const searchQuery = value.trim().toLowerCase();

    if (searchQuery.length > 0) {
      const snapshot = await getDocs(collection(db, 'poems'));
      const results = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const combined = `${data.title} ${data.content}`.toLowerCase();
        const match = combined.includes(searchQuery);
        if (match) {
          results.push({ id: doc.id, ...data });
        }
      });
      setSearchResults(results.length > 0 ? results : [{ noResults: true }]);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(e.target)) {
        closeSearch();
      }
      if (!e.target.closest('.profile-dropdown')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-gray-900 border-b border-gray-200 h-[70px]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-10">
            <Link href="/" className="flex items-center">
  <Image
    src="/assets/poemsite-logo.png"
    alt="PoemSite Logo"
    width={150}
    height={150}
    className="object-contain"
    priority
  />
</Link>
<div className="hidden md:flex space-x-8 text-[16.5px] font-medium">
  <Link href="/" className="group relative text-gray-800 hover:text-blue-600 transition-colors duration-200">
    <span>Home</span>
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </Link>
  <Link href="/poem" className="group relative text-gray-800 hover:text-blue-600 transition-colors duration-200">
    <span>Poems</span>
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </Link>
  <Link href="/everything-about-project" className="group relative text-gray-800 hover:text-blue-600 transition-colors duration-200">
    <span>About</span>
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </Link>
  <Link href="/contact" className="group relative text-gray-800 hover:text-blue-600 transition-colors duration-200">
    <span>Contact</span>
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </Link>
  
</div>




            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleSearch}
                className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 transition flex items-center gap-1 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4-4m0 0A7.5 7.5 0 1116.65 5.65a7.5 7.5 0 010 10.6z" />
                </svg>
                <span>Search</span>
              </button>

              {user ? (
                <div className="relative profile-dropdown">
                  <button onClick={() => setShowMenu((prev) => !prev)} className="focus:outline-none">
                    <img
                      src={user.photoURL || '/assets/profile-f.png'}
                      alt="Profile"
                      className="w-9 h-9 rounded-full border border-gray-300"
                      title={user.displayName || user.email}
                    />
                  </button>
                  {showMenu && (
               <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
               <div className="px-4 py-2 text-sm text-gray-700 font-semibold border-b">
                 {user.displayName || user.email}
               </div>
               <button
        onClick={() => router.push('/edit-profile')}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5h2m-1 1v2m3.6 2.4L14 10l-7 7-3 1 1-3 7-7 1.4 1.4z" />
        </svg>
        Edit Profile
      </button>
               <button
                 onClick={() => router.push('/reset-password')}
                 className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z" />
                 </svg>
                 Reset Password
               </button>
             
               <button
                 onClick={handleLogout}
                 className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                 </svg>
                 Logout
               </button>
             </div>
             
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3 text-[15.5px] font-medium">
                  <Link href="/login" className="px-4 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100">Login</Link>
                  <Link href="/signup" className="px-4 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100">Sign Up</Link>
                </div>
              )}

              <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-black focus:outline-none">
                  {isMobileMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`md:hidden bg-white shadow-md border-t border-gray-200 px-6 py-6 flex flex-col items-center space-y-5 text-base font-medium transition-all duration-300 ${
            closingMenu ? 'animate-slideOutRight' : 'animate-slideInRight'
          }`}>
            <Link href="/" onClick={toggleMobileMenu}>Home</Link>
            <Link href="/poem" onClick={toggleMobileMenu}>Poems</Link>
            <Link href="/everything-about-project" onClick={toggleMobileMenu}>About</Link>
            <Link href="/contact" onClick={toggleMobileMenu}>Contact</Link>
            
            {user ? (
              <div className="w-full text-center text-gray-600">Welcome, {user.displayName || user.email}</div>
            ) : (
              <>
                <Link href="/login" onClick={toggleMobileMenu}>Login</Link>
                <Link href="/signup" onClick={toggleMobileMenu}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </nav>

      {isSearchOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div ref={searchRef} className="bg-white w-full max-w-2xl mx-4 p-6 rounded-lg shadow-lg relative animate-fadeIn">
            <button
              onClick={closeSearch}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Search Poems</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Enter at least two words..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <div className="mt-4 max-h-64 overflow-y-auto space-y-3">
              {searchResults.length > 0 ? (
                searchResults[0].noResults ? (
                  <div className="text-sm text-gray-500">No results found.</div>
                ) : (
                  searchResults.map((poem) => (
                    <Link
                      key={poem.id}
                      href={`/poem/${poem.slug}`}
                      onClick={closeSearch}
                      className="block border p-3 rounded hover:bg-gray-50 transition"
                    >
                      <h3 className="font-semibold">{poem.title}</h3>
                      <p className="text-sm text-gray-500 truncate">{poem.content.slice(0, 100)}...</p>
                    </Link>
                  ))
                )
              ) : (
                <div className="text-sm text-gray-500">Type something to search...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
