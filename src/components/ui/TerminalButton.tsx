
import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2, Trash2, X, Play, Save, Edit3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2',
    'font-terminal-ui font-medium',
    'rounded-editor',
    'border',
    'terminal-transition',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'hover:shadow-sm'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-current-surface border-current text-current',
          'hover:bg-editor-elevated hover:border-current-secondary'
        ],
        success: [
          'bg-gentle-success/10 border-gentle-success text-gentle-success',
          'hover:bg-gentle-success/20 hover:border-gentle-success'
        ],
        warning: [
          'bg-gentle-warning/10 border-gentle-warning text-gentle-warning',
          'hover:bg-gentle-warning/20 hover:border-gentle-warning'
        ],
        danger: [
          'bg-gentle-error/10 border-gentle-error text-gentle-error',
          'hover:bg-gentle-error/20 hover:border-gentle-error'
        ],
        ghost: [
          'bg-transparent border-transparent text-current-secondary',
          'hover:bg-current-surface hover:text-current'
        ]
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base'
      }
    },
    compoundVariants: [
      {
        variant: 'default',
        size: 'sm',
        class: 'font-medium'
      },
      {
        variant: 'default',
        size: 'lg',
        class: 'font-semibold'
      }
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

interface TerminalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  command?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

const TerminalButton = forwardRef<HTMLButtonElement, TerminalButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    loading = false, 
    command, 
    icon: Icon, 
    children, 
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading State */}
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="font-terminal-ui">Loading...</span>
          </>
        ) : (
          <>
            {/* Icon */}
            {Icon && !command && (
              <Icon className="h-4 w-4" />
            )}
            
            {/* Command Format */}
            {command ? (
              <span className="font-terminal-mono tracking-wide">
                <span className="text-current-muted">$</span> {children}
              </span>
            ) : (
              /* Regular Content */
              children
            )}
          </>
        )}
      </button>
    );
  }
);

TerminalButton.displayName = 'TerminalButton';

// Factory Button Props Interface
interface FactoryButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  size?: VariantProps<typeof buttonVariants>['size'];
  loading?: boolean;
  className?: string;
}

// 5 Most Common Factory Buttons

// Delete Button
export const DeleteButton: React.FC<FactoryButtonProps> = ({ 
  size = 'md', 
  loading, 
  className, 
  ...props 
}) => (
  <TerminalButton
    variant="danger"
    size={size}
    icon={Trash2}
    loading={loading}
    className={className}
    {...props}
  >
    Delete
  </TerminalButton>
);

// Cancel Button
export const CancelButton: React.FC<FactoryButtonProps> = ({ 
  size = 'md', 
  loading, 
  className, 
  ...props 
}) => (
  <TerminalButton
    variant="ghost"
    size={size}
    icon={X}
    loading={loading}
    className={className}
    {...props}
  >
    Cancel
  </TerminalButton>
);

// Execute Button
export const ExecuteButton: React.FC<FactoryButtonProps> = ({ 
  size = 'md', 
  loading, 
  className, 
  ...props 
}) => (
  <TerminalButton
    variant="success"
    size={size}
    icon={Play}
    loading={loading}
    className={className}
    {...props}
  >
    Execute
  </TerminalButton>
);

// Save Button
export const SaveButton: React.FC<FactoryButtonProps> = ({ 
  size = 'md', 
  loading, 
  className, 
  ...props 
}) => (
  <TerminalButton
    variant="success"
    size={size}
    icon={Save}
    loading={loading}
    className={className}
    {...props}
  >
    Save
  </TerminalButton>
);

// Edit Button
export const EditButton: React.FC<FactoryButtonProps> = ({ 
  size = 'md', 
  loading, 
  className, 
  ...props 
}) => (
  <TerminalButton
    variant="default"
    size={size}
    icon={Edit3}
    loading={loading}
    className={className}
    {...props}
  >
    Edit
  </TerminalButton>
);

export default TerminalButton;
export { 
  DeleteButton,
  CancelButton, 
  ExecuteButton,
  SaveButton,
  EditButton
};

