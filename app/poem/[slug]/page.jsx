'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '@/firebase/firebase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const formatDate = (timestampMs) => {
  const date = new Date(timestampMs);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  hours = hours.toString().padStart(2, '0');
  return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
};
export const runtime = 'edge';
export default function PoemSlugPage({ params }) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const auth = getAuth();
  const user = auth.currentUser;

  const [poem, setPoem] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  // reply state
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState({}); // { parentCommentId: [reply, ...] }
  const [showReplies, setShowReplies] = useState({}); // { commentId: boolean }
  const [repliesCount, setRepliesCount] = useState({}); // { commentId: count }

  // For share button
  const [shareCopied, setShareCopied] = useState(false);

  // Get current url for sharing
  const baseUrl = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : '';
  const shareUrl = `${baseUrl}/poem/${encodeURIComponent(slug)}`;

  useEffect(() => {
    const fetchPoem = async () => {
      const poemQuery = query(
        collection(db, 'poems'),
        where('slug', '==', decodedSlug)
      );
      const snapshot = await getDocs(poemQuery);
      if (snapshot.empty) return notFound();
      const poemData = snapshot.docs[0].data();
      setPoem(poemData);
    };
    fetchPoem();
  }, [decodedSlug]);

  useEffect(() => {
    loadInitialComments();
    // eslint-disable-next-line
  }, [decodedSlug]);

  // Load only top-level comments (parentId is missing or null), support both undefined and null
  const loadInitialComments = async () => {
    setLoading(true);
    const commentQuery = query(
      collection(db, 'comments'),
      where('poemSlug', '==', decodedSlug),
      orderBy('timestamp', 'desc'),
      limit(50)
    );
    const snapshot = await getDocs(commentQuery);
    const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const topLevel = all.filter((c) => !('parentId' in c) || c.parentId === null);
    setComments(topLevel);
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    setHasMore(snapshot.docs.length === 50);
    setLoading(false);

    // Reset replies/showReplies/repliesCount
    setReplies({});
    setShowReplies({});
    // For each top-level comment, fetch the number of replies (to decide if we should show "Show Replies" button)
    const fetchAllRepliesCount = async () => {
      const counts = {};
      await Promise.all(
        topLevel.map(async (comment) => {
          const repliesQuery = query(
            collection(db, 'comments'),
            where('poemSlug', '==', decodedSlug),
            where('parentId', '==', comment.id)
          );
          const repliesSnapshot = await getDocs(repliesQuery);
          counts[comment.id] = repliesSnapshot.size;
        })
      );
      setRepliesCount(counts);
    };
    fetchAllRepliesCount();
  };

  // When loading more, also filter for top-level comments
  const loadMoreComments = async () => {
    if (!lastVisible) return;
    const nextQuery = query(
      collection(db, 'comments'),
      where('poemSlug', '==', decodedSlug),
      orderBy('timestamp', 'desc'),
      startAfter(lastVisible),
      limit(50)
    );
    const snapshot = await getDocs(nextQuery);
    const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const newComments = all.filter((c) => !('parentId' in c) || c.parentId === null);
    setComments((prev) => [...prev, ...newComments]);
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    setHasMore(snapshot.docs.length === 50);

    // Fetch replies count for new comments
    const fetchNewRepliesCount = async () => {
      const counts = {};
      await Promise.all(
        newComments.map(async (comment) => {
          const repliesQuery = query(
            collection(db, 'comments'),
            where('poemSlug', '==', decodedSlug),
            where('parentId', '==', comment.id)
          );
          const repliesSnapshot = await getDocs(repliesQuery);
          counts[comment.id] = repliesSnapshot.size;
        })
      );
      setRepliesCount((prev) => ({ ...prev, ...counts }));
    };
    fetchNewRepliesCount();
  };

  // Fetch replies for a specific comment
  const loadRepliesForComment = async (parentId) => {
    // Only load if not already loaded
    if (replies[parentId]) {
      setShowReplies((prev) => ({ ...prev, [parentId]: !prev[parentId] }));
      return;
    }
    const repliesQuery = query(
      collection(db, 'comments'),
      where('poemSlug', '==', decodedSlug),
      where('parentId', '==', parentId),
      orderBy('timestamp', 'asc')
    );
    const repliesSnapshot = await getDocs(repliesQuery);
    const replyData = repliesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setReplies((prev) => ({
      ...prev,
      [parentId]: replyData,
    }));
    setShowReplies((prev) => ({
      ...prev,
      [parentId]: true,
    }));
  };

  const handleDeleteComment = async (commentId) => {
    const confirm = window.confirm('Are you sure you want to delete this comment?');
    if (!confirm) return;
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setReplies((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach(parentId => {
          updated[parentId] = updated[parentId].filter((c) => c.id !== commentId);
        });
        return updated;
      });
      setRepliesCount((prev) => {
        const updated = { ...prev };
        delete updated[commentId];
        return updated;
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !user) return;

    let authorName = user.displayName || 'Anonymous';

    if (user) {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();

          if (userData.name && userData.name.trim() !== '') {
            authorName = userData.name;
          } else if (user.displayName && user.displayName.trim() !== '') {
            authorName = user.displayName;
          } else {
            authorName = 'Anonymous';
          }
        }
      } catch (error) {
        console.error('Error fetching user data from Firestore:', error);
      }
    }

    await addDoc(collection(db, 'comments'), {
      poemSlug: decodedSlug,
      content: newComment.trim(),
      author: authorName,
      timestamp: Timestamp.now(),
      userId: user.uid,
      parentId: null
    });

    setNewComment('');
    loadInitialComments();
  };

  // Submit a reply to a comment
  const handleReplySubmit = async (parentId) => {
    if (!replyText.trim() || !user) return;

    let authorName = user.displayName || 'Anonymous';

    if (user) {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();

          if (userData.name && userData.name.trim() !== '') {
            authorName = userData.name;
          } else if (user.displayName && user.displayName.trim() !== '') {
            authorName = user.displayName;
          } else {
            authorName = 'Anonymous';
          }
        }
      } catch (error) {
        console.error('Error fetching user data from Firestore:', error);
      }
    }

    await addDoc(collection(db, 'comments'), {
      poemSlug: decodedSlug,
      content: replyText.trim(),
      author: authorName,
      timestamp: Timestamp.now(),
      userId: user.uid,
      parentId: parentId,
    });

    setReplyText('');
    setReplyingTo(null);
    // Refresh replies for the parent comment and update replies count
    await loadRepliesForComment(parentId);
    setShowReplies((prev) => ({ ...prev, [parentId]: true }));
    setRepliesCount((prev) => ({
      ...prev,
      [parentId]: prev[parentId] ? prev[parentId] + 1 : 1,
    }));
  };

  // Find admin reply for a comment (if available)
  const getAdminReply = (comment) => {
    if ('adminReply' in comment && comment.adminReply && typeof comment.adminReply === 'string' && comment.adminReply.trim() !== '') {
      return comment.adminReply.trim();
    }
    return null;
  };

  // Share poem handler (copy to clipboard)
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 1600);
    } catch (err) {
      setShareCopied(false);
      alert(
        "Could not copy the poem URL. Please copy it manually:\n" + shareUrl
      );
    }
  };

  if (!poem) return <p className="pt-20 px-4">Loading...</p>;

  return (
    <div className="pt-0 px-4 sm:px-6 lg:px-8 w-full font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <Link
          href="/poem"
          className="text-blue-700 hover:text-blue-900 transition-all duration-300 
                   text-sm inline-flex items-center gap-2 
                   hover:shadow-[0_0_35px_rgba(29,78,216,0.65)] 
                   bg-white/50 backdrop-blur-sm
                   rounded-md px-4 py-2 font-medium
                   hover:bg-white/80"
        >
          <span className="transform transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to All Poems
        </Link>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 mt-3 sm:mt-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-12 4.5V15a3 3 0 0 0 3 3h12m-6-4.5V8.25m0 0 3 3m-3-3-3 3" />
          </svg>
          {shareCopied ? "Copied!" : "Share Poem"}
        </button>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] mb-6 w-full 
                    hover:shadow-[0_8px_40px_rgba(29,78,216,0.45),0_0_80px_rgba(29,78,216,0.25)] 
                    transition-all duration-500 ease-out
                    hover:translate-y-[-2px]">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 font-sans">{poem.title}</h1>
        <p className="text-sm text-gray-600 mb-2 font-medium">by {poem.author}</p>
        {poem.datePosted && (
          <p className="text-xs text-gray-500 mb-6">
            Posted on {formatDate(poem.datePosted.seconds * 1000)}
          </p>
        )}
        <pre className="whitespace-pre-wrap text-lg text-gray-800 mb-4 font-sans leading-relaxed">
          {poem.content}
        </pre>
      </div>

      <div className="mt-8 bg-white p-8 rounded-xl 
                    shadow-[0_4px_12px_rgba(0,0,0,0.1)] w-full 
                    hover:shadow-[0_8px_40px_rgba(29,78,216,0.45),0_0_80px_rgba(29,78,216,0.25)] 
                    transition-all duration-500 ease-out
                    hover:translate-y-[-2px]">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">Add a Comment</h2>
        {user ? (
          <>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-600 
                         focus:shadow-[0_0_35px_rgba(29,78,216,0.4)]
                         hover:shadow-[0_4px_20px_rgba(29,78,216,0.25)]
                         transition-all duration-300 text-gray-700 font-medium font-sans"
              rows={4}
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-3 px-8 py-3 bg-blue-600 text-white rounded-lg
                         font-semibold tracking-wide
                         hover:bg-blue-700 
                         hover:shadow-[0_0_40px_rgba(29,78,216,0.8),0_0_120px_rgba(29,78,216,0.4)] 
                         active:shadow-[0_0_20px_rgba(29,78,216,0.9)]
                         transform hover:-translate-y-1 active:translate-y-0
                         transition-all duration-300 ease-out
                         focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newComment.trim()}
            >
              Post Comment
            </button>
          </>
        ) : (
          <p className="text-gray-600 font-medium">Please log in to leave a comment.</p>
        )}
      </div>

      <div className="mt-8 bg-white p-8 rounded-xl 
                    shadow-[0_4px_12px_rgba(0,0,0,0.1)] w-full 
                    hover:shadow-[0_8px_40px_rgba(29,78,216,0.45),0_0_80px_rgba(29,78,216,0.25)] 
                    transition-all duration-500 ease-out
                    hover:translate-y-[-2px]">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-sans">All Comments</h2>
        {loading ? (
          <p className="text-gray-600 font-medium">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-600 font-medium">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => {
              const adminReply = getAdminReply(comment);
              const replyCount = repliesCount[comment.id] || 0;
              return (
                <div 
                  key={comment.id} 
                  className="bg-gray-50 p-6 rounded-lg
                             shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                             hover:shadow-[0_8px_25px_rgba(29,78,216,0.25)]
                             transform hover:-translate-y-1
                             transition-all duration-300 ease-out font-sans"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">{comment.author}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(comment.timestamp.seconds * 1000)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800
                          px-4 py-2 rounded-lg font-medium
                          hover:bg-blue-50
                          hover:shadow-[0_0_20px_rgba(29,78,216,0.16)]
                          transform hover:-translate-y-0.5
                          transition-all duration-300 ease-out"
                        onClick={() => {
                          setReplyingTo(comment.id);
                          setReplyText('');
                        }}
                      >
                        Reply
                      </button>
                      {user?.uid === comment.userId && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-600 hover:text-red-800
                                     px-4 py-2 rounded-lg font-medium
                                     hover:bg-red-50
                                     hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]
                                     transform hover:-translate-y-0.5
                                     transition-all duration-300 ease-out"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700 leading-relaxed">{comment.content}</p>
                  {adminReply && (
                    <div className="mt-4 ml-2 pl-4 border-l-4 border-blue-400">
                      <div className="font-semibold text-blue-700 mb-1">Admin Reply</div>
                      <div className="text-gray-800">{adminReply}</div>
                    </div>
                  )}

                  {/* Replies dropdown button: only show if there are replies */}
                  {replyCount > 0 && (
                    <div className="mt-4">
                      <button
                        className="text-blue-600 hover:text-blue-900 underline text-sm font-medium"
                        onClick={async () => {
                          await loadRepliesForComment(comment.id);
                        }}
                      >
                        {showReplies[comment.id]
                          ? 'Hide Replies'
                          : `Show Replies (${replyCount})`}
                      </button>
                    </div>
                  )}
                  {/* List replies for this comment (dropdown) */}
                  {showReplies[comment.id] && replies[comment.id] && replies[comment.id].length > 0 && (
                    <div className="mt-5 pl-4 border-l-2 border-blue-100 space-y-3">
                      {replies[comment.id].map((reply) => (
                        <div key={reply.id} className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-900">{reply.author}</span>
                            {user?.uid === reply.userId && (
                              <button
                                onClick={() => handleDeleteComment(reply.id)}
                                className="text-red-600 hover:text-red-800 px-3 py-1 rounded-lg font-medium hover:bg-red-50 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] ml-2"
                                style={{ fontSize: "0.96rem" }}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                          <div className="text-gray-700 mt-2">{reply.content}</div>
                          <div className="text-xs text-gray-500 mt-1">{formatDate(reply.timestamp.seconds * 1000)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Reply Box */}
                  {replyingTo === comment.id && user && (
                    <div className="mt-4 pl-4">
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mt-2"
                        rows={2}
                        placeholder={`Reply to ${comment.author}...`}
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleReplySubmit(comment.id)}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                          disabled={!replyText.trim()}
                        >
                          Post Reply
                        </button>
                        <button
                          onClick={() => { setReplyingTo(null); setReplyText(''); }}
                          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {hasMore && (
              <button
                onClick={loadMoreComments}
                className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg
                           font-semibold tracking-wide w-full sm:w-auto
                           hover:bg-blue-700 
                           hover:shadow-[0_0_40px_rgba(29,78,216,0.8),0_0_120px_rgba(29,78,216,0.4)]
                           active:shadow-[0_0_20px_rgba(29,78,216,0.9)]
                           transform hover:-translate-y-1 active:translate-y-0
                           transition-all duration-300 ease-out
                           focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                Load More Comments
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}