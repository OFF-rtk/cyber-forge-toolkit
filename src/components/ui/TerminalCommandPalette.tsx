'use client';

import { cn } from '@/lib/utils';
import { forwardRef, useState, useEffect, useRef } from 'react';
import { Search, Terminal, ArrowUp, ArrowDown, CornerDownLeft } from 'lucide-react';

interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  keywords?: string[];
  category?: string;
  action: () => void; 
  shortcut?: string;
}

interface TerminalCommandPaletteProps {
  commands: Command[];
  isOpen: boolean;
  onClose: () => void;
  placeholder?: string;
  maxResults?: number;
  showCategories?: boolean;
  className?: string;
}

export const TerminalCommandPalette = forwardRef<HTMLDivElement, TerminalCommandPaletteProps>(
  ({ 
    commands = [],
    isOpen,
    onClose, 
    placeholder = "Type a command or search...",
    maxResults = 10, 
    showCategories = true, 
    className,
    ...props
  }, ref) => {
    
   
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0); 
    const [recentCommands, setRecentCommands] = useState<string[]>([]); 
  
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const filteredCommands = commands.filter(command => {
      if (!query.trim()) return true; 
      
      const searchText = query.toLowerCase();
      return (
        command.label.toLowerCase().includes(searchText) ||
        command.description?.toLowerCase().includes(searchText) ||
        command.keywords?.some(keyword => keyword.toLowerCase().includes(searchText))
      );
    }).slice(0, maxResults); 

    const groupedCommands = showCategories 
      ? filteredCommands.reduce((groups, command) => {
          const category = command.category || 'Other';
          if (!groups[category]) groups[category] = [];
          groups[category].push(command);
          return groups;
        }, {} as Record<string, Command[]>)
      : { 'Commands': filteredCommands };

    useEffect(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
        setQuery('');
        setSelectedIndex(0);
      }
    }, [isOpen]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
          case 'Escape':
            e.preventDefault();
            onClose();
            break;
          
          case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex(prev => 
              prev < filteredCommands.length - 1 ? prev + 1 : 0
            );
            break;
          
          case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex(prev => 
              prev > 0 ? prev - 1 : filteredCommands.length - 1
            );
            break;
          
          case 'Enter':
            e.preventDefault();
            const selectedCommand = filteredCommands[selectedIndex];
            if (selectedCommand) {
              executeCommand(selectedCommand);
            }
            break;
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, filteredCommands, selectedIndex, onClose]);

    const executeCommand = (command: Command) => {
      setRecentCommands(prev => {
        const updated = [command.id, ...prev.filter(id => id !== command.id)];
        return updated.slice(0, 5); // Keep only last 5
      });

      command.action();

      onClose();
    };

    const handleCommandClick = (command: Command, index: number) => {
      setSelectedIndex(index);
      executeCommand(command);
    };

    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop overlay */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        />

        {/* Command palette container */}
        <div 
          ref={ref}
          className={cn(
            "fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50",
            "w-full max-w-6xl mx-4",
            "bg-current-surface border border-current rounded-editor shadow-2xl",
            "terminal-transition",
            className
          )}
          {...props}
        >
          {/* Search input header */}
          <div className="flex items-center gap-3 p-4 border-b border-current bg-editor-sidebar">
            <Search size={18} className="text-warm-blue flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-current font-terminal-mono text-sm placeholder:text-current-muted focus:outline-none"
            />
            <div className="flex items-center gap-2 text-xs text-current-muted font-terminal-mono">
              <span className="flex items-center gap-1">
                <ArrowUp size={12} />
                <ArrowDown size={12} />
                navigate
              </span>
              <span className="flex items-center gap-1">
                <CornerDownLeft size={12} />
                select
              </span>
            </div>
          </div>

          {/* Results list */}
          <div 
            ref={listRef}
            className="max-h-96 overflow-y-auto"
          >
            {filteredCommands.length === 0 ? (
              // No results state
              <div className="p-8 text-center">
                <Terminal size={32} className="mx-auto mb-3 text-current-muted" />
                <p className="font-terminal-mono text-sm text-current-muted">
                  No commands found for "{query}"
                </p>
              </div>
            ) : (
              // Render grouped commands
              Object.entries(groupedCommands).map(([category, categoryCommands]) => (
                <div key={category}>
                  {/* Category header (if showing categories and more than one category) */}
                  {showCategories && Object.keys(groupedCommands).length > 1 && (
                    <div className="px-4 py-2 bg-editor-elevated border-b border-current">
                      <h3 className="font-terminal-mono font-code-medium text-xs text-current-muted uppercase tracking-wider">
                        {category}
                      </h3>
                    </div>
                  )}

                  {/* Command items */}
                  {categoryCommands.map((command, categoryIndex) => {
                    // Calculate global index for selection
                    const globalIndex = filteredCommands.indexOf(command);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <button
                        key={command.id}
                        onClick={() => handleCommandClick(command, globalIndex)}
                        className={cn(
                          "w-full flex items-center gap-3 p-4 text-left terminal-transition",
                          "hover:bg-editor-elevated focus:outline-none",
                          isSelected && "bg-warm-blue/10 border-l-2 border-l-warm-blue"
                        )}
                      >
                        {/* Command icon */}
                        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                          {command.icon || <Terminal size={16} className="text-current-muted" />}
                        </div>

                        {/* Command content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-terminal-mono font-code-medium text-sm text-current">
                              {command.label}
                            </span>
                            {/* Keyboard shortcut */}
                            {command.shortcut && (
                              <span className="font-terminal-mono text-xs text-current-muted bg-editor-elevated px-1.5 py-0.5 rounded">
                                {command.shortcut}
                              </span>
                            )}
                          </div>
                          {/* Command description */}
                          {command.description && (
                            <p className="font-terminal-mono text-xs text-current-muted mt-1">
                              {command.description}
                            </p>
                          )}
                        </div>

                        {/* Recent indicator */}
                        {recentCommands.includes(command.id) && (
                          <div className="flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-warm-blue" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer with tips */}
          <div className="px-4 py-3 border-t border-current bg-editor-elevated">
            <div className="flex items-center justify-between text-xs text-current-muted font-terminal-mono">
              <span>
                {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''} available
              </span>
              <span>
                Press <kbd className="px-1 bg-editor-sidebar rounded">ESC</kbd> to close
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
);

TerminalCommandPalette.displayName = 'TerminalCommandPalette';
