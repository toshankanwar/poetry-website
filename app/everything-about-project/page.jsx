'use client';

import { useRef } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  // Smooth scroll handler for Table of Contents links
  const sectionRefs = {
    techstack: useRef(null),
    pages: useRef(null),
    mainfeatures: useRef(null),
    code: useRef(null),
    security: useRef(null),
    data: useRef(null),
    admin: useRef(null),
    mailserver: useRef(null),
    deployment: useRef(null),
  };

  // Helper to scroll smoothly to a section
  const handleTocClick = (id, e) => {
    e.preventDefault();
    const ref = sectionRefs[id];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Optionally update hash in the URL
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-8 sm:py-12 font-sans text-gray-800">
      {/* Hero */}
      <div className="flex flex-col items-center mb-10 sm:mb-14">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 mb-3 sm:mb-4 tracking-tight drop-shadow-lg animate-fadein text-center">
          About <span className="underline decoration-pink-400 decoration-3">PoemSite</span>
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-center max-w-2xl mb-5 sm:mb-6 text-gray-700 animate-fadein">
          <span className="font-bold text-blue-700">PoemSite</span> is a modern, full-stack poetry platform for reading, sharing, and discussing poems — with an elegant user interface, robust admin dashboard, and secure backend.
        </p>
        <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 mt-2 sm:mt-3 items-center justify-center w-full">
          <a href="https://github.com/toshankanwar/poetry-website" target="_blank" rel="noopener" className="w-full xs:w-auto bg-white border-2 border-blue-500 text-blue-700 px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-50 hover:scale-105 active:scale-100 transition-all duration-200 flex items-center gap-2 justify-center animate-popin">
            <span>PoemSite GitHub</span>
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20" className="inline"><path stroke="currentColor" strokeWidth="2" d="M7 13l5-5m0 0V7a2 2 0 00-2-2H5.5A2.5 2.5 0 003 7.5v5A2.5 2.5 0 005.5 15h5a2 2 0 002-2v-1z"/></svg>
          </a>
          <a href="https://admin.poems.toshankanwar.website/" target="_blank" rel="noopener" className="w-full xs:w-auto bg-white border-2 border-pink-500 text-pink-700 px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-pink-50 hover:scale-105 active:scale-100 transition-all duration-200 flex items-center gap-2 justify-center animate-popin">
            <span>Admin Dashboard</span>
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20" className="inline"><path stroke="currentColor" strokeWidth="2" d="M7 13l5-5m0 0V7a2 2 0 00-2-2H5.5A2.5 2.5 0 003 7.5v5A2.5 2.5 0 005.5 15h5a2 2 0 002-2v-1z"/></svg>
          </a>
          <a href="https://github.com/toshankanwar/admin-poetry-website" target="_blank" rel="noopener" className="w-full xs:w-auto bg-white border-2 border-purple-500 text-purple-700 px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-purple-50 hover:scale-105 active:scale-100 transition-all duration-200 flex items-center gap-2 justify-center animate-popin">
            <span>Admin Dashboard GitHub</span>
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20" className="inline"><path stroke="currentColor" strokeWidth="2" d="M7 13l5-5m0 0V7a2 2 0 00-2-2H5.5A2.5 2.5 0 003 7.5v5A2.5 2.5 0 005.5 15h5a2 2 0 002-2v-1z"/></svg>
          </a>
          <a href="https://github.com/toshankanwar/Mail-Server-Poetry-Website" target="_blank" rel="noopener" className="w-full xs:w-auto bg-white border-2 border-yellow-400 text-yellow-700 px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-50 hover:scale-105 active:scale-100 transition-all duration-200 flex items-center gap-2 justify-center animate-popin">
            <span>Mail Server</span>
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20" className="inline"><path stroke="currentColor" strokeWidth="2" d="M7 13l5-5m0 0V7a2 2 0 00-2-2H5.5A2.5 2.5 0 003 7.5v5A2.5 2.5 0 005.5 15h5a2 2 0 002-2v-1z"/></svg>
          </a>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="mb-8 sm:mb-12 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-l-4 border-blue-400 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-fadein-up">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-2 text-blue-700">Table of Contents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-blue-900">
          {[
            { label: "Tech Stack", id: "techstack" },
            { label: "Pages & Navigation", id: "pages" },
            { label: "Main Functionalities", id: "mainfeatures" },
            { label: "Code Explanations", id: "code" },
            { label: "Security & Auth", id: "security" },
            { label: "Collections & Data Models", id: "data" },
            { label: "Admin Dashboard", id: "admin" },
            { label: "Mail Server", id: "mailserver" },
            { label: "Deployment & Hosting", id: "deployment" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={e => handleTocClick(item.id, e)}
              className="hover:scale-105 hover:bg-blue-100 rounded px-2 py-1 transition font-semibold block sm:inline text-left w-full sm:w-auto focus:outline-none focus:bg-blue-200"
              style={{ cursor: 'pointer' }}
              tabIndex={0}
              aria-label={`Jump to ${item.label}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <section id="techstack" ref={sectionRefs.techstack} className="mb-8 sm:mb-12 animate-fadein-up scroll-mt-16" tabIndex={-1}>
        <div className="rounded-2xl border-2 border-blue-100 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 p-5 sm:p-8 group hover:-translate-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3 text-blue-800 group-hover:text-blue-600 transition">Tech Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <ul className="list-disc pl-6">
              <li><b>Frontend:</b> Next.js 15, React, Tailwind CSS, HTML5, CSS3</li>
              <li><b>Backend:</b> Firebase Firestore, Firebase Auth, Node.js Express (mail server)</li>
              <li><b>Admin Panel:</b> Next.js (separate app), Tailwind CSS</li>
              <li><b>Mail Server:</b> Node.js, Express, Nodemailer, Firebase Admin SDK</li>
            </ul>
            <ul className="list-disc pl-6">
              <li><b>Deployment:</b> Vercel (main), Firebase Hosting (admin), Render (mail server)</li>
              <li><b>Other:</b> GitHub Actions (CI/CD), ESLint/Prettier, dotenv</li>
              <li><b>APIs:</b> Custom API for mailing, Firebase Functions (optional)</li>
              <li><b>Open Source:</b> <a href="https://github.com/toshankanwar/poetry-website" className="underline text-blue-700 hover:text-pink-500">GitHub</a></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pages & Navigation */}
      <section id="pages" ref={sectionRefs.pages} className="mb-8 sm:mb-12 animate-fadein-up scroll-mt-16" tabIndex={-1}>
        <div className="rounded-2xl border-2 border-purple-100 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 p-5 sm:p-8 group hover:-translate-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3 text-purple-800 group-hover:text-pink-700 transition">Pages & Navigation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Main User Site</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li><b>Home:</b> Highlights, featured poems, CTAs.</li>
                <li><b>/poem:</b> Browse/search all poems, filters, pagination.</li>
                <li><b>/poem/[slug]:</b> Poem detail with comments, replies, admin replies, sharing.</li>
                <li><b>/about:</b> About the admin and main poet of Poemsite community.</li>
                <li><b>/login, /register:</b> Auth pages.</li>
                <li><b>/profile:</b>  User info.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Admin Dashboard</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li><b>Dashboard Home:</b> Stats, activity, analytics.</li>
                <li><b>Poems:</b> Add, edit, delete, approve poems.</li>
                <li><b>Users:</b> List, search, manage roles, ban/delete users.</li>
                <li><b>Comments:</b> Moderate, delete, admin reply.</li>
                <li><b>Mailing List:</b> Export, send announcements.</li>
                <li><b>Poem Requests:</b> View/respond to user requests.</li>
              </ul>
              <a href="https://admin.poems.toshankanwar.website/" target="_blank" className="text-pink-600 underline hover:text-purple-700 text-sm mt-1 inline-block">Visit Admin Dashboard ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Functionalities */}
      <section id="mainfeatures" ref={sectionRefs.mainfeatures} className="mb-8 sm:mb-12 animate-fadein-up scroll-mt-16" tabIndex={-1}>
        <div className="rounded-2xl border-2 border-pink-100 shadow-xl bg-white hover:shadow-2xl p-5 sm:p-8 group hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3 text-pink-700 group-hover:text-blue-700 transition">Main Features & UX</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="list-disc pl-6 text-gray-700">
              <li>Read, search, and share poems with beautiful, responsive UI</li>
              <li>Nested comments & replies, admin replies highlighted</li>
              <li>Animated "Show Replies", "Share", and interactive buttons</li>
              <li>Role-based actions, only admins can manage poems/users</li>
              <li>Mailing list join, email notifications (custom API)</li>
              <li>Poem request & approval workflow</li>
            </ul>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Admin dashboard for moderation, analytics, management</li>
              <li>Live statistics, user tracking, audit logs (admin)</li>
              <li>Fast, secure authentication (Firebase Auth)</li>
              <li>All data is real-time via Firestore</li>
              <li>Animated page transitions and smooth modals</li>
              <li>Public, mobile-friendly, accessible</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Code Explanations */}
      <section id="code" ref={sectionRefs.code} className="mb-8 sm:mb-12 animate-fadein-up scroll-mt-16" tabIndex={-1}>
        {/* Responsive: stack code blocks on mobile, grid on md+ */}
        <div className="rounded-2xl border-2 border-yellow-200 shadow-xl bg-white hover:shadow-2xl p-5 sm:p-8 group hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3 text-yellow-700 group-hover:text-blue-700 transition">Key Code Explanations</h2>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-7 w-full overflow-x-auto">
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-700 mb-2">Fetching a Poem</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm mb-2 max-w-full break-words">{`
const poemQuery = query(
  collection(db, 'poems'),
  where('slug', '==', decodedSlug)
);
const snapshot = await getDocs(poemQuery);
if (snapshot.empty) return notFound();
const poemData = snapshot.docs[0].data();
setPoem(poemData);
              `.trim()}</pre>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-700 mb-2">Posting a Comment</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm mb-2 max-w-full break-words">{`
await addDoc(collection(db, 'comments'), {
  poemSlug: decodedSlug,
  content: newComment.trim(),
  author: authorName,
  timestamp: Timestamp.now(),
  userId: user.uid,
  parentId: null
});
              `.trim()}</pre>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-700 mb-2">On-demand Replies</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm mb-2 max-w-full break-words">{`
const repliesQuery = query(
  collection(db, 'comments'),
  where('poemSlug', '==', decodedSlug),
  where('parentId', '==', parentId),
  orderBy('timestamp', 'asc')
);
const repliesSnapshot = await getDocs(repliesQuery);
const replyData = repliesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
              `.trim()}</pre>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-700 mb-2">Role-based Actions Example</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm mb-2 max-w-full break-words">{`
{user?.uid === comment.userId && (
  <button onClick={() => handleDeleteComment(comment.id)}>
    Delete
  </button>
)}
              `.trim()}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Security Rules & Authentication */}
      <section id="security" ref={sectionRefs.security} className="mb-8 sm:mb-12 animate-fadein-up scroll-mt-16" tabIndex={-1}>
        <div className="rounded-2xl border-2 border-blue-200 shadow-xl bg-white hover:shadow-2xl p-5 sm:p-8 group hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3 text-blue-800 group-hover:text-pink-700 transition">Security & Authentication</h2>
          <p className="mb-2">
            <span className="font-bold text-blue-700">Strict Firestore rules</span> and authentication for both user and admin flows:
          </p>
          <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs mb-2">{`
match /comments/{commentId} {
  allow read: if true;
  allow create: if request.auth != null;
  allow update: if request.auth.uid == resource.data.userId
    && !(request.resource.data.keys().hasAny(['adminReply']));
  allow update: if request.auth != null
    && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
    && request.resource.data.diff(resource.data).changedKeys().hasOnly(['adminReply']);
  allow delete: if request.auth.uid == resource.data.userId;
  allow delete: if request.auth != null
    && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
          `.trim()}</pre>
          <ul className="list-disc pl-6">
            <li>All reads public for poems/comments; writes are restricted.</li>
            <li>Only authenticated users can comment/reply.</li>
            <li>Only comment owners/admins can delete/edit.</li>
            <li>Only admins can manage poems and users.</li>
            <li>Roles are securely managed in <code>users</code> collection.</li>
          </ul>
        </div>
      </section>

      {/* Data & Collections */}
      <section id="data" ref={sectionRefs.data} className="mb-8 sm:mb-12 animate-fadein-up scroll-mt-16" tabIndex={-1}>
        <div className="rounded-2xl border-2 border-purple-200 shadow-xl bg-white hover:shadow-2xl p-5 sm:p-8 group hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3 text-purple-800 group-hover:text-blue-700 transition">Collections & Data Models</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-1 text-gray-600">poems</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>title: String</li>
                <li>author: String</li>
                <li>content: String</li>
                <li>slug: String (unique, URL-friendly)</li>
                <li>datePosted: Timestamp</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-gray-600">comments</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>poemSlug: String</li>
                <li>content: String</li>
                <li>author: String</li>
                <li>timestamp: Timestamp</li>
                <li>userId: String</li>
                <li>parentId: String/null</li>
                <li>adminReply: String (admin-only, optional)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-gray-600">users</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>uid: String</li>
                <li>name: String</li>
                <li>role: "user" | "admin"</li>
                <li>email: String</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-gray-600">poemRequests</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>requestedBy: uid</li>
                <li>poemTitle: String</li>
                <li>reason: String</li>
                <li>timestamp: Timestamp</li>
              </ul>
              <h3 className="font-semibold mt-4 mb-1 text-gray-600">mailingList</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>uid: String</li>
                <li>email: String</li>
                <li>subscribedOn: Timestamp</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Dashboard */}
      <section id="admin" ref={sectionRefs.admin} className="mb-8 sm:mb-12 animate-fadein-up scroll-mt-16" tabIndex={-1}>
        <div className="rounded-2xl border-2 border-pink-200 shadow-xl bg-white hover:shadow-2xl p-5 sm:p-8 group hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3 text-pink-800 group-hover:text-purple-800 transition">Admin Dashboard <span className="text-xs font-normal ml-2">(separate app)</span></h2>
          <p className="mb-4 text-gray-700">
            The admin dashboard is a <b>dedicated Next.js app</b> built for moderators and admins, deployed at <a className="underline text-blue-700 hover:text-pink-600" href="https://admin.poems.toshankanwar.website/" target="_blank">admin.poems.toshankanwar.website</a>
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="list-disc pl-6 text-gray-700">
              <li>Poem CRUD: Add, approve, edit, delete, feature poems</li>
              <li>User Management: List, search, ban, change roles</li>
              <li>Comment Moderation: Delete, reply as admin, audit logs</li>
              <li>Mailing List management: export, emails, stats</li>
              <li>Poem Requests: View/respond, one-click publish</li>
            </ul>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Analytics dashboard: charts, stats, live activity</li>
              <li>Authentication: <span className="font-mono text-sm">admin</span> role required (checked via Firestore + UI)</li>
              <li>Seamless connection to main Firestore DB</li>
              <li>Responsive, animated, professional UI (Tailwind, modals)</li>
              <li>Open source: <a className="underline text-pink-700 hover:text-purple-700" href="https://github.com/toshankanwar/admin-poetry-website" target="_blank">GitHub Repo</a></li>
            </ul>
          </div>
          <div className="mt-3">
            <a href="https://admin.poems.toshankanwar.website/" target="_blank" className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-200 inline-block mt-2 text-center">
              Visit Admin Dashboard ↗
            </a>
          </div>
        </div>
      </section>

      {/* Mail Server */}
      <section id="mailserver" ref={sectionRefs.mailserver} className="mb-8 sm:mb-12 animate-fadein-up scroll-mt-16" tabIndex={-1}>
        <div className="rounded-2xl border-2 border-yellow-300 shadow-xl bg-white hover:shadow-2xl p-5 sm:p-8 group hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3 text-yellow-700 group-hover:text-blue-700 transition">Mail Server & API</h2>
          <p className="mb-3 text-gray-700">A dedicated backend service (Node.js + Express + Nodemailer) powers:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-3">
            <li>Sending welcome emails, admin approval/announcement notifications</li>
            <li>Mailing list subscription, opt-in/out, bulk notifications</li>
            <li>Fully integrated with Firestore and Firebase Admin SDK</li>
            <li>Endpoints: <code>/api/send-welcome-email</code>, <code>/api/send-aproval-email</code>, <code>/api/send-poem-announcement</code>, <code>/api/unsubscribe</code></li>
            <li>Open source: <a href="https://github.com/toshankanwar/Mail-Server-Poetry-Website" target="_blank" className="underline text-yellow-700 hover:text-blue-600">Mail Server GitHub</a></li>
          </ul>
          <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs">{`
app.post('/api/send-welcome-email', ... );
app.post('/api/send-aproval-email', ... );
app.post('/api/send-poem-announcement', ... );
app.post('/api/unsubscribe', ... );
          `.trim()}</pre>
        </div>
      </section>

      {/* Deployment & Hosting */}
      <section id="deployment" ref={sectionRefs.deployment} className="mb-8 sm:mb-12 animate-fadein-up scroll-mt-16" tabIndex={-1}>
        <div className="rounded-2xl border-2 border-blue-300 shadow-xl bg-white hover:shadow-2xl p-5 sm:p-8 group hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3 text-blue-700 group-hover:text-pink-700 transition">Deployment & Hosting</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-3">
            <li>
              <b>Main Site:</b> Deployed on <span className="font-bold text-blue-700">Vercel</span> with auto CI/CD from GitHub.
            </li>
            <li>
              <b>Admin Dashboard:</b> Hosted as a <b>separate app</b> at <a href="https://admin.poems.toshankanwar.website/" className="underline text-pink-600 hover:text-purple-700">admin.poems.toshankanwar.website</a> (Firebase Hosting or Vercel).
            </li>
            <li>
              <b>Firestore:</b> Central data store, rules-enforced, real-time.
            </li>
            <li>
              <b>GitHub:</b> All code open source. See <a href="https://github.com/toshankanwar/poetry-website" className="underline text-blue-700 hover:text-pink-600">main repo</a> and <a href="https://github.com/toshankanwar/admin-poetry-website" className="underline text-pink-700 hover:text-purple-700">admin repo</a>.
            </li>
          </ul>
          <div className="text-xs text-gray-400 mt-4">
            All sensitive keys are securely stored in environment files. Never commit secrets to source!
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-12 sm:mt-16 text-center text-base text-gray-400 animate-fadein">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-blue-800">PoemSite Project</span> &mdash; Built with Next.js, Firebase, Node.js, and <span className="text-pink-500">💜</span> by <a href="https://toshankanwar.website" target="_blank" className="underline text-blue-700 hover:text-pink-600">Toshan Kanwar</a>.
      </div>

      {/* Animations (can be extended via Tailwind plugin or CSS) */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .animate-fadein { animation: fadein 1.2s cubic-bezier(.47,1.64,.41,.8) both; }
        .animate-fadein-up { animation: fadeinup 1.1s cubic-bezier(.47,1.64,.41,.8) both; }
        .animate-popin { animation: popin 0.7s cubic-bezier(.47,1.64,.41,.8) both; }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeinup { from { opacity: 0; transform: translateY(32px);} to { opacity: 1; transform: none; } }
        @keyframes popin { 0%{transform:scale(.7);opacity:0} 70%{transform:scale(1.07);opacity:1} 100%{transform:scale(1);opacity:1} }
        @media (max-width: 640px) {
          .max-w-5xl { max-width: 98vw !important; }
          .overflow-x-auto { overflow-x: auto !important; }
          .md\\:grid-cols-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}