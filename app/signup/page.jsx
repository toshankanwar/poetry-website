// app/signup/page.jsx
"use client";
import { useState, useEffect } from "react";
import { auth, db, googleProvider } from "../../firebase/firebase"; // your Firebase config
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";

async function sendWelcomeEmail({ email, name }) {
  try {
    await fetch("/api/send-welcome-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
  } catch (err) {
    // Silently fail
  }
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/");
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        email,
        name,
        role: "user",
        createdAt: new Date(),
      });
      await sendWelcomeEmail({ email, name });
      router.push("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please login instead.");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
      } else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else {
        alert("Signup failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(
        doc(db, "users", user.uid),
        { email: user.email, name: user.displayName, role: "user", createdAt: new Date() },
        { merge: true }
      );
      await sendWelcomeEmail({ email: user.email, name: user.displayName });
      router.push("/");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        alert("Sign-in cancelled. Please try again.");
      } else if (error.code === "auth/account-exists-with-different-credential") {
        alert("An account already exists with the same email. Please use a different sign-in method.");
      } else {
        alert("Google sign-in failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-xl shadow-lg min-h-[70vh]">
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">Join Us 🎉</h1>
          <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">Create your account to get started</p>
          <form onSubmit={handleSignup} className="space-y-4">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required disabled={loading} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required disabled={loading} />
            <div className="relative">
              <input type={showPassword ? "text" : "password"}
                placeholder="Password (min 6 characters)" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black pr-10"
                required minLength={6} disabled={loading} />
              <button type="button" onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                tabIndex={-1} disabled={loading}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">Or sign up using</p>
            <button onClick={handleGoogleSignup}
              className="mt-3 w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loading}>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? "Signing in..." : "Sign up with Google"}
            </button>
            <p className="mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <button onClick={() => router.push("/login")}
                className="text-blue-600 hover:underline"
                disabled={loading}>
                Login here
              </button>
            </p>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100 p-6">
          <img src="/assets/signup.svg" alt="Signup Illustration" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
