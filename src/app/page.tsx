"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TerminalCard from '../components/ui/TerminalCard.tsx'
import {TrendingUp, Terminal} from 'lucide-react'

export default function HomePage() {
  const router = useRouter();

  // Auto-redirect to dashboard after component mounts
  /*useEffect(() => {
    router.push('/dashboard');
  }, [router]);*/
  

  const handleSystemCheck = () => {
    setTimeout(() => {
      console.log('Helloo')
    }, 2000);
  }
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center mx-auto">
      <TerminalCard
        title="Revenue Growth"
        value="$2.4M"
        description="23% increase from last quarter"
        status="success"
        icon={<TrendingUp className="w-4 h-4" />}
        showHeader={true}
        compact={false}
      />  
      <TerminalCard
        title="Database Connection"
        value="3/5 nodes"
        description="2 nodes experiencing connectivity issues. Auto-recovery in progress."
        status="warning"
        showHeader={true}
        compact={true}
        onClick={() => handleSystemCheck()}
      /> 
      <TerminalCard
        title="Terminal Session"
        status="info"
        icon={<Terminal className="w-4 h-4" />}
        showHeader={true}
        compact={false}
      >
        <div className="space-y-2">
          <div className="font-terminal-mono text-xs text-current-muted">
            Last command: npm run build
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gentle-success rounded-full"></div>
              <span className="text-sm">Build completed successfully</span>
          </div>
        </div>
      </TerminalCard>
    </div>
  );
}
