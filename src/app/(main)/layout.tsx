'use client';

import { TerminalNavbar } from '@/components/ui/TerminalNavbar';
import { Terminal } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Components', href: '/components' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Examples', href: '/examples' },
    // ✅ ADD: Terminal button as nav item
    { 
      label: <Terminal size={18} className="text-warm-blue hover:text-warm-green transition-colors" />, 
      href: '#',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        // Trigger command palette
        if (typeof window !== 'undefined' && (window as any).openCommandPalette) {
          (window as any).openCommandPalette();
        }
      },  
      isButton: true, // Flag to identify this as a button
      tooltip: 'Open Command Palette (⌘K)'
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Shared Floating Navigation */}
      <TerminalNavbar 
        items={navItems}
        brand="Terminal UI"
        floating={true}
      />

      {/* Divider after nav */}
      <div className="bg-black pt-20">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent max-w-4xl mx-auto"></div>
      </div>

      {/* Page Content */}
      <main className="bg-black pt-8 max-w-xl mx-auto md:max-w-7xl pb-8">
        {children}
      </main>
    </div>
  );
}
