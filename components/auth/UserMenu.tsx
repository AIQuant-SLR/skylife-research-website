'use client';

import { useAuth } from '@/lib/auth/context';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/auth/firebase';
import SignInButton from './SignInButton';
import { LogOut, User } from 'lucide-react';
import { useState } from 'react';

export default function UserMenu() {
  const { user, loading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return <SignInButton />;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 transition-colors"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <User className="w-5 h-5 text-cyan-400" />
          </div>
        )}
        <span className="text-sm font-medium hidden md:block">
          {user.displayName || user.email}
        </span>
      </button>

      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-20 overflow-hidden">
            <div className="p-4 border-b border-slate-800">
              <p className="font-semibold text-sm">{user.displayName}</p>
              <p className="text-xs text-slate-400 mt-1">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-slate-800 text-left text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
