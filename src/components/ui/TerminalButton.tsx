import { cn } from "@/lib/utils";
import { Loader2, Terminal, CheckCircle, AlertTriangle, XCircle, Play } from "lucide-react";
import { forwardRef } from "react";

interface TerminalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    command?: string
    icon?: React.ComponentType<{ size?: number; className?: string}>
    children: React.ReactNode
    className?: string
}


export const TerminalButton = forwardRef<HTMLButtonElement, TerminalButtonProps>(
    ({
        variant='default',
        size='md',
        loading=false,
        command,
        icon: Icon,
        children,
        className,
        disabled,
        ...props
    }, ref) => {

        const getVariantStyles = (variant: TerminalButtonProps['variant']) => {
            switch(variant) {
                case 'success': 
                    return {
                        bg: 'bg-gentle-success',
                        text: 'text-editor-bg',
                        border: 'border-gentle-success',
                        hover: 'hover:bg-gentle-sucess/90 hover:glow-terminal-green',
                        focus: 'focus:ring-gentle-sucess/50',
                        icon: 'text-editor-bg'
                    }
                case 'warning':
                    return {
                        bg: 'bg-gentle-warning',
                        text: 'text-editor-bg',
                        border: 'border-gentle-warning',
                        hover: 'hover:bg-gentle-warning/90 hover:glow-terminal-yellow',
                        focus: 'focus:ring-gentle-warning/50',
                        icon: 'text-editor-bg'
                    }
                case 'danger':
                    return {
                        bg: 'bg-gentle-error',
                        text: 'text-current',
                        border: 'border-gentle-error',
                        hover: 'hover:bg-gentle-error/90 hover:glow-terminal-red',
                        focus: 'focus:ring-gentle-error/50',
                        icon: 'text-current'
                    }
                case 'ghost':
                    return {
                        bg: 'bg-transparent',
                        text: 'text-current-secondary',
                        border: 'border-editor-border',
                        hover: 'hover:bg-editor-elevated hover:text-current',
                        focus: 'focus:ring-warm-blue/50',
                        icon: 'text-current-secondary'
                    }
                case 'default':
                default:
                    return {
                        bg: 'bg-warm-blue',
                        text: 'text-editor-bg',
                        border: 'border-warm-blue',
                        hover: 'hover:bg-warm-blue/90 hover:glow-terminal-cyan',
                        focus: 'focus:ring-warm-blue/50',
                        icon: 'text-editor-bg'
                    }
            }
        }

        const getSizeStyles = (size: TerminalButtonProps['size']) => {
            switch (size) {
                case 'sm':
                    return {
                        padding: 'px-3 py-1.5',
                        text: 'text-xs',
                        icon: 12
                    }
                case 'lg':
                    return {
                        padding: 'px-6 py-3',
                        text: 'text-base',
                        icon: 18
                    }
                case 'md':
                default:
                    return {
                        padding: 'px-4 py-2',
                        text: 'text-sm',
                        icon: 14
                    }
            }
        }

        const variantStyles = getVariantStyles(variant)
        const sizeStyles = getSizeStyles(size)

        const renderContent = () => {
            if (loading) {
                return (
                    <div className="flex items-center gap-2">
                        <Loader2 size={sizeStyles.icon} className={cn("animate-spin", variantStyles.icon)} />
                        <span className="font-terminal-mono">
                            {command ? `${command}...` : 'Processing...'}
                        </span>
                    </div>
                )
            }
            if (command) {
                return (
                    <div className="flex items-center gap-2">
                        {Icon && <Icon size={sizeStyles.icon} className={variantStyles.icon} />}
                        <span className="font-terminal-mono">
                            ./{command}
                        </span>
                    </div>
                )
            }

            return (
                <div className="flex items-center gap-2">
                    {Icon && <Icon size={sizeStyles.icon} className={variantStyles.icon} />}
                    <span className="font-terminal-ui">
                        {children}
                    </span>
                </div>
            )
        }

        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(
                    "relative border rounded-editor font-code-medium terminal-transition",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-editor-bg",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    sizeStyles.padding,
                    sizeStyles.text,

                    variantStyles.bg,
                    variantStyles.text,
                    variantStyles.border,

                    !disabled && !loading && variantStyles.hover,
                    !disabled && variantStyles.focus,

                    className
                )}
                {...props}
            >
                {renderContent()}
            </button>
        )
    }
)

TerminalButton.displayName = 'TerminalButton'

export const TerminalExecuteButton = (props: Omit<TerminalButtonProps, 'variant' | 'command' | 'icon'>) => (
  <TerminalButton variant="default" command="execute" icon={Play} {...props} />
)

export const TerminalBuildButton = (props: Omit<TerminalButtonProps, 'variant' | 'command' | 'icon'>) => (
  <TerminalButton variant="success" command="build" icon={CheckCircle} {...props} />
)

export const TerminalDeployButton = (props: Omit<TerminalButtonProps, 'variant' | 'command' | 'icon'>) => (
  <TerminalButton variant="warning" command="deploy" icon={AlertTriangle} {...props} />
)

export const TerminalDeleteButton = (props: Omit<TerminalButtonProps, 'variant' | 'command' | 'icon'>) => (
  <TerminalButton variant="danger" command="delete" icon={XCircle} {...props} />
)

export const TerminalCancelButton = (props: Omit<TerminalButtonProps, 'variant' | 'command' | 'icon'>) => (
  <TerminalButton variant="ghost" command="cancel" {...props} />
)