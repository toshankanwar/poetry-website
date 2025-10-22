# 🌟 PoemSite — Modern Poetry Platform

[![Vercel Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel&logoColor=white)](https://poems.toshankanwar.website/)
[![Admin Dashboard](https://img.shields.io/badge/Admin%20Dashboard-Live-8B5CF6?logo=next.js&logoColor=white)](https://admin.poems.toshankanwar.website/)
[![Mail Server API](https://img.shields.io/badge/Mail%20Server-API-blueviolet?logo=node.js&logoColor=white)](https://mail-server-poetry-website.onrender.com)
[![License](https://img.shields.io/github/license/toshankanwar/poetry-website)](LICENSE)

> **PoemSite** is a comprehensive poetry web platform designed for reading, sharing, and discussing poems. It features a user-centric interface, real-time comments, robust admin controls, mailing list, and a secure scalable backend. Built with Next.js 15, Firebase, and a custom Node.js mail server.

---

## 🚀 Live Links

- **Main Website:** [https://poems.toshankanwar.website/](https://poems.toshankanwar.website/)
- **Admin Dashboard:** [https://admin.poems.toshankanwar.website/](https://admin.poems.toshankanwar.website/)
- **Everything About Project (Docs):** [https://poems.toshankanwar.website/everything-about-project](https://poems.toshankanwar.website/everything-about-project)

---

## 🏗️ Monorepo Structure

```text
poetry-website/                # Main Next.js (App router) frontend
admin-poetry-website/          # Admin dashboard (Next.js)
Mail-Server-Poetry-Website/    # Node.js Express mail server API
```

---

## ✨ Features

- **Beautiful UI:** Animated, modern, accessible design built with Tailwind CSS.
- **Poem Hub:** Read, search, filter, and share poems with metadata.
- **Comment System:** Nested comments and replies, admin replies, real-time updates.
- **Authentication:** Firebase Auth (Google, Email/Password).
- **User Profiles:** Manage display name, email, role.
- **Admin Dashboard:** Full CRUD for poems, comment moderation, user management, requests review.
- **Poem Requests:** Users can request/suggest new poems.
- **Mailing List:** Subscribe, receive announcements, manage via admin.
- **API Server:** Node.js mail server for transactional emails and announcements.
- **Pro-level Security:** Firestore rules, role-based access, environment variable secrets.
- **Deployment:** Vercel & Firebase Hosting (CI/CD via GitHub Actions).
- **Mobile-First:** Fully responsive, touch-friendly interactions.

---

## 🛠️ Tech Stack

| Layer         | Tech                                                     |
| ------------- | -------------------------------------------------------- |
| Frontend      | [Next.js 15](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/) |
| Backend       | [Firebase Firestore](https://firebase.google.com/docs/firestore), [Firebase Auth](https://firebase.google.com/docs/auth), [Node.js](https://nodejs.org/), [Express](https://expressjs.com/) |
| Admin Panel   | Next.js (separate app), Tailwind CSS                     |
| Mail Server   | Node.js, Express, Nodemailer, Firebase Admin SDK         |
| Deployment    | [Vercel](https://vercel.com/), [Firebase Hosting](https://firebase.google.com/docs/hosting), [Render](https://render.com/) |
| DevOps        | GitHub Actions (CI/CD), dotenv, ESLint/Prettier          |

---

## 📄 Pages & Navigation

| Path                      | Description                                                |
|---------------------------|-----------------------------------------------------------|
| `/`                       | Home: Highlights, featured poems, intro                   |
| `/poem`                   | Browse all poems, filter, search                          |
| `/poem/[slug]`            | Poem detail: content, comments, replies, sharing          |
| `/about`                  | Project & team info                                       |
| `/login` `/register`      | Auth pages                                                |
| `/profile`                | User profile dashboard                                    |
| `/dashboard`              | **Admin**: stats, users, poems, comments, requests        |
| `/everything-about-project` | Technical documentation, deep-dive info                  |

---

## 🗃️ Data Models (Firestore)

### `poems`
| Field       | Type       | Description         |
|-------------|------------|--------------------|
| title       | `string`   | Poem title         |
| author      | `string`   | Author name        |
| content     | `string`   | Poem text          |
| slug        | `string`   | URL-friendly ID    |
| datePosted  | `timestamp`| Posted date        |

### `comments`
| Field      | Type      | Description              |
|------------|-----------|-------------------------|
| poemSlug   | `string`  | Linked poem slug        |
| content    | `string`  | Comment/reply content   |
| author     | `string`  | Display name            |
| timestamp  | `timestamp`| When posted            |
| userId     | `string`  | Firebase user UID       |
| parentId   | `string?` | Parent comment ID (for replies) |
| adminReply | `string?` | Admin's reply           |

### `users`
| Field      | Type      | Description             |
|------------|-----------|------------------------|
| uid        | `string`  | Firebase user ID       |
| name       | `string`  | Display name           |
| role       | `string`  | "user" or "admin"      |
| email      | `string`  | Email address          |

### `poemRequests`
| Field        | Type      | Description           |
|--------------|-----------|----------------------|
| requestedBy  | `string`  | UID of requester     |
| poemTitle    | `string`  | Requested poem title |
| reason       | `string`  | Reason/description   |
| timestamp    | `timestamp` | When requested     |

### `mailingList`
| Field        | Type      | Description           |
|--------------|-----------|----------------------|
| uid          | `string`  | User ID (if available)|
| email        | `string`  | Email address        |
| subscribedOn | `timestamp` | Date subscribed    |

---

## 🔐 Security

- **Firestore Rules:**  
  - Only authenticated users can write comments.
  - Only the comment's owner or an admin can update/delete.
  - Only admins can manage poems and users.
- **Authentication:**  
  - Firebase Auth for login/register, with email verification.
  - Role-based access (`role` field in `users` collection).
- **Environment Variables:**  
  - All sensitive keys (Firebase, Node.js mail server, etc.) are stored as environment variables.
- **API Protection:**  
  - Mail API endpoints validated for payload and sanitized.

---

## ⚡️ Example Code Snippets

**Fetching a Poem**
```js
const poemQuery = query(
  collection(db, 'poems'),
  where('slug', '==', decodedSlug)
);
const snapshot = await getDocs(poemQuery);
if (snapshot.empty) return notFound();
const poemData = snapshot.docs[0].data();
setPoem(poemData);
```

**Posting a Comment**
```js
await addDoc(collection(db, 'comments'), {
  poemSlug: decodedSlug,
  content: newComment.trim(),
  author: authorName,
  timestamp: Timestamp.now(),
  userId: user.uid,
  parentId: null
});
```

**Mail Server API (Node.js/Express)**
```js
app.post('/api/send-welcome-email', async (req, res) => { ... });
app.post('/api/send-poem-announcement', async (req, res) => { ... });
```

---

## 🖥️ Local Development

```bash
# 1. Clone this repository and (optionally) the admin and mail-server repos
git clone https://github.com/toshankanwar/poetry-website.git
# (admin dashboard) git clone https://github.com/toshankanwar/admin-poetry-website.git
# (mail server) git clone https://github.com/toshankanwar/Mail-Server-Poetry-Website.git

# 2. Install dependencies
cd poetry-website
npm install

# 3. Configure .env.local (see .env.example for required variables)
cp .env.example .env.local
# Fill in your Firebase and environment secrets

# 4. Run the development server
npm run dev

# 5. Visit http://localhost:3000
```

---

## 🧑‍💻 Contributing

1. Fork this repo and create your feature branch (`git checkout -b feature/your-feature`)
2. Make your changes (code, docs, tests)
3. Commit and push (`git commit -am 'Add feature' && git push origin feature/your-feature`)
4. Open a PR — contributions and suggestions are welcome!

---

## 📫 Contact

- **Creator:** [Toshan Kanwar](https://toshankanwar.website)
- **Email:** contact@toshankanwar.website

---

## 📜 License

This project is [MIT licensed](LICENSE).

---

> **PoemSite** — Built with ❤️ for poetry lovers, creators, and the open source community.