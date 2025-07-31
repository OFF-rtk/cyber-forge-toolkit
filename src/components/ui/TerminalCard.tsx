"use client";

import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";
import { Terminal } from "lucide-react";

interface TerminalCardProps {
    title?: string
    value?: string | number
    description?: string
    status?: 'success' | 'warning' | 'error' | 'info' | 'default';
    icon?: ReactNode
    children?: ReactNode
    className?: string
    showHeader?: boolean
    compact?: boolean
}

export const TerminalCard = forwardRef<HTMLDivElement, TerminalCardProps>(
    ({
        title,
        value,
        description,
        status = 'default',
        icon,
        children,
        className,
        showHeader = true,
        compact = false,
        ...props
    }, ref) => {

        const getStatusStyles = () => {
            switch (status) {
                case 'success':
                    return {
                        border: 'border-gentle-success',
                        header: 'text-gentle-success bg-editor-elevated',
                        indicator: 'bg-gentle-success'
                    };
                case 'warning':
                    return {
                        border: 'border-gentle-warning',
                        header: 'text-gentle-warning bg-editor-elevated',
                        indicator: 'bg-gentle-warning'
                    };
                case 'error':
                    return {
                        border: 'border-gentle-error',
                        header: 'text-gentle-error bg-editor-elevated',
                        indicator: 'bg-gentle-error'
                    };
                case 'info':
                    return {
                        border: 'border-warm-blue',
                        header: 'text-warm-blue bg-editor-elevated',
                        indicator: 'bg-warm-blue'
                    };
                default:
                    return {
                        border: 'border-current',
                        header: 'text-current-muted bg-editor-sidebar',
                        indicator: 'bg-current-muted'
                    };
            }
        }

        const statusStyles = getStatusStyles()

        return (
            <div
                ref={ref}
                className={cn(
                    "border rounded-editor bg-current-surface terminal-transition overflow-hidden",
                    statusStyles.border,
                    compact ? "p-3" : "p-0",
                    className
                )}
                {...props}
            >
                {showHeader && (
                    <div className={cn(
                        "flex items-center justify-between border-b border-current px-3 py-2",
                        statusStyles.header
                    )} >
                        <div className="flex items-center gap-2">
                            <div className={cn(
                                "w-2 h-2 rounded-full",
                                statusStyles.indicator
                            )} />

                            {icon || <Terminal size={14} className="text-current" />}

                            {title && (
                                <span className="font-terminal-mono font-code-medium text-sm">
                                    {title}
                                </span>
                            )}
                        </div>
                    </div>    
                )}

                <div className={cn(
                    "p-4",
                    compact && "p-3"
                )}>
                    {value && (
                        <div className="mb-2">
                            <span className="font-terminal-mono font-code-semibold text-2xl text-current">
                                {value}
                            </span>
                        </div>
                    )}

                    {description && (
                        <p className="font-terminal-mono text-sm text-current-muted mb-3">
                            {description}
                        </p>
                    )}

                    {children}
                </div>
            </div>
        )
    }
)

TerminalCard.displayName = 'TerminalCard'