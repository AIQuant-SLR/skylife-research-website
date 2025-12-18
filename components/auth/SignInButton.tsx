'use client';

import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/auth/firebase';
import { useState } from 'react';
import { LogIn } from 'lucide-react';

export default function SignInButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogIn className="w-5 h-5" />
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
}
