import SignInButton from '@/components/auth/SignInButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Skylife Research',
  description: 'Sign in to access portfolio analysis and network visualization tools',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
            Welcome to Skylife Research
          </h1>
          <p className="text-slate-400 text-lg">
            Sign in to access advanced portfolio analysis and network visualization tools
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Get Started</h2>
            <p className="text-slate-400 text-sm">
              Sign in with your Google account to unlock:
            </p>
          </div>

          <ul className="space-y-3 mb-8 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span>
              <span className="text-slate-300">AI-powered portfolio analysis with risk metrics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span>
              <span className="text-slate-300">Interactive stock correlation network graphs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span>
              <span className="text-slate-300">Real-time momentum stock analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span>
              <span className="text-slate-300">Personalized investment recommendations</span>
            </li>
          </ul>

          <div className="flex justify-center">
            <SignInButton />
          </div>

          <p className="text-xs text-slate-500 text-center mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
