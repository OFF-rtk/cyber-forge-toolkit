"use client";

import React, { forwardRef } from 'react';
import { Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  value?: string | number;
  description?: string;
  status?: 'success' | 'warning' | 'error' | 'info' | 'default';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  showHeader?: boolean;
  compact?: boolean;
}

const TerminalCard = forwardRef<HTMLDivElement, CardProps>(({
  title,
  value,
  description,
  status = 'default',
  icon,
  children,
  showHeader = true,
  compact = false,
  className,
  ...props
}, ref) => {
  // Status-based styling
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'success':
        return {
          text: 'text-gentle-success',
          hoverBorder: 'hover:border-gentle-success'
        };
      case 'warning':
        return {
          text: 'text-gentle-warning',
          hoverBorder: 'hover:border-gentle-warning'
        };
      case 'error':
        return {
          text: 'text-gentle-error',
          hoverBorder: 'hover:border-gentle-error'
        };
      case 'info':
        return {
          text: 'text-gentle-info',
          hoverBorder: 'hover:border-gentle-info'
        };
      default:
        return {
          text: 'text-current',
          hoverBorder: 'hover:border-current'
        };
    }
  };

  const statusClasses = getStatusClasses(status);
  const iconComponent = icon || <Terminal className="w-4 h-4" />;

  return (
    <div
      ref={ref}
      className={cn(
        // Base styles
        'bg-current-surface border border-current rounded-editor',
        // Transitions and hover effects
        'terminal-transition',
        'hover:shadow-lg hover:-translate-y-0.5',
        statusClasses.hoverBorder,
        // Spacing
        compact ? 'p-3' : 'p-editor',
        className
      )}
      {...props}
    >
      {/* Header */}
      {showHeader && (title || icon) && (
        <div className={cn(
          'flex items-center gap-3',
          compact ? 'mb-2' : 'mb-4'
        )}>
          {/* Icon */}
          <div className={cn(
            'flex items-center justify-center',
            statusClasses.text
          )}>
            {iconComponent}
          </div>
          
          {/* Title */}
          {title && (
            <h3 className={cn(
              'font-terminal-ui font-medium text-sm',
              statusClasses.text
            )}>
              {title}
            </h3>
          )}
        </div>
      )}

      {/* Content */}
      <div className="space-y-2">
        {/* Value */}
        {value !== undefined && (
          <div className={cn(
            'font-terminal-mono font-semibold',
            compact ? 'text-lg' : 'text-2xl',
            'text-current'
          )}>
            {value}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className={cn(
            'font-terminal-ui text-sm text-current-secondary',
            'leading-relaxed'
          )}>
            {description}
          </p>
        )}

        {/* Children for custom content */}
        {children && (
          <div className="font-terminal-ui text-current">
            {children}
          </div>
        )}
      </div>
    </div>
  );
});

TerminalCard.displayName = 'TerminalCard';

export default TerminalCard;
