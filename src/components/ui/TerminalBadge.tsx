"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface TerminalBadgeProps {
    children?: React.ReactNode; // ✅ FIXED: Made children optional
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
    dot?: boolean;
    className?: string;
}

export const TerminalBadge = forwardRef<HTMLSpanElement, TerminalBadgeProps>(
    ({
        children,
        variant = 'default',
        size = 'md',
        dot = false,
        className,
        ...props
    }, ref) => {

        const getVariantStyles = () => {
            switch (variant) {
                case 'success':
                    return {
                        bg: 'bg-gentle-success/20',
                        text: 'text-gentle-success',
                        border: 'border-gentle-success/50',
                    };
                case 'warning':
                    return {
                        bg: 'bg-gentle-warning/20',
                        text: 'text-gentle-warning',
                        border: 'border-gentle-warning/50',
                    };
                case 'error':
                    return {
                        bg: 'bg-gentle-error/20',
                        text: 'text-gentle-error',
                        border: 'border-gentle-error/50',
                    };
                case 'info':
                    return {
                        bg: 'bg-warm-blue/20',
                        text: 'text-warm-blue',
                        border: 'border-warm-blue/50',
                    };
                default:
                    return {
                        bg: 'bg-current-muted/20',
                        text: 'text-current-secondary',
                        border: 'border-current-muted/50',
                    };
            }
        };

        const getSizeStyles = () => {
            switch (size) {
                case 'sm':
                    return {
                        padding: dot ? 'w-2 h-2' : 'px-1.5 py-0.5',
                        text: 'text-xs',
                    };
                case 'lg':
                    return {
                        padding: dot ? 'w-3 h-3' : 'px-3 py-1.5',
                        text: 'text-sm',
                    };
                default:
                    return {
                        padding: dot ? 'w-2.5 h-2.5' : 'px-2 py-1',
                        text: 'text-xs',
                    };
            }
        };

        const variantStyles = getVariantStyles();
        const sizeStyles = getSizeStyles();

        // ✅ FIXED: Dot badges don't need children
        if (dot) {
            return (
                <span
                    ref={ref}
                    className={cn(
                        "inline-block rounded-full border",
                        sizeStyles.padding,
                        variantStyles.bg,
                        variantStyles.border,
                        className
                    )}
                    {...props}
                />
            );
        }

        // ✅ FIXED: Regular badges need children content
        return (
            <span
                ref={ref}
                className={cn(
                    "inline-flex items-center font-terminal-mono font-code-medium rounded-editor border terminal-transition",
                    sizeStyles.padding,
                    sizeStyles.text,
                    variantStyles.bg,
                    variantStyles.text,
                    variantStyles.border,
                    className
                )}
                {...props}
            >
                {children}
            </span>
        );
    }
);

TerminalBadge.displayName = 'TerminalBadge';
