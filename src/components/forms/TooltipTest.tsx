'use client';

import { useState } from 'react';
import { TerminalTooltip } from '../ui/TerminalTooltip';

export function TooltipTest() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="p-8 text-center">
      <h3 className="text-xl mb-4">Simple Tooltip Test</h3>
      
      {/* Manual tooltip toggle */}
      <div className="relative inline-block">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          Hover for tooltip
        </button>
        
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded border z-50">
            Simple tooltip working!
          </div>
        )}
      </div>
      
      {/* Test your TerminalTooltip */}
      <div className="mt-8">
        <TerminalTooltip content="Terminal tooltip test">
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            Terminal Tooltip Test
          </button>
        </TerminalTooltip>
      </div>
    </div>
  );
}
