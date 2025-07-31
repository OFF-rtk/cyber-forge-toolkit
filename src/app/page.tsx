'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  // Auto-redirect to dashboard after component mounts
  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Loading state while redirecting */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-warm-blue animate-pulse"></div>
          <span className="font-terminal-ui font-code-medium text-current">
            Terminal UI
          </span>
        </div>
        
        <p className="font-terminal-mono text-sm text-current-muted">
          Redirecting to dashboard...
        </p>

        {/* Fallback manual link */}
        <div className="pt-4">
          <Link 
            href="/dashboard"
            className="font-terminal-mono text-xs text-warm-blue hover:text-warm-green transition-colors underline"
          >
            Click here if redirect doesn't work
          </Link>
        </div>

        {/* Terminal-style loading animation */}
        <div className="flex justify-center">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-warm-blue rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-warm-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-1 bg-warm-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
