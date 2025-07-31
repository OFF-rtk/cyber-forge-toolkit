"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useState, useRef, useEffect } from "react";

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TerminalTooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    placement?: TooltipPlacement;
    delay?: number;
    disabled?: boolean;
    variant?: 'default' | 'success' | 'warning' | 'error';
    className?: string;
    triggerClassName?: string;
}

export const TerminalTooltip = forwardRef<HTMLDivElement, TerminalTooltipProps>(
    ({
        children,
        content,
        placement = 'top',
        delay = 300,
        disabled = false,
        variant = 'default',
        className,
        triggerClassName,
        ...props
    }, ref) => {

        const [isVisible, setIsVisible] = useState(false);
        const [position, setPosition] = useState({ x: 0, y: 0 });

        const triggerRef = useRef<HTMLDivElement>(null);
        const tooltipRef = useRef<HTMLDivElement>(null);
        const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

        const getVariantStyles = () => {
            switch (variant) {
                case 'success':
                    return {
                        bg: 'bg-gentle-success/90',
                        text: 'text-current-bg',
                        border: 'border-gentle-success',
                        arrowColor: '#10b981', // green-500 equivalent
                    };
                case 'warning':
                    return {
                        bg: 'bg-gentle-warning/90',
                        text: 'text-current-bg',
                        border: 'border-gentle-warning',
                        arrowColor: '#f59e0b', // amber-500 equivalent
                    };
                case 'error':
                    return {
                        bg: 'bg-gentle-error/90',
                        text: 'text-current-bg',
                        border: 'border-gentle-error',
                        arrowColor: '#ef4444', // red-500 equivalent
                    };
                default:
                    return {
                        bg: 'bg-current-surface/95',
                        text: 'text-current',
                        border: 'border-current',
                        arrowColor: 'currentColor',
                    };
            }
        };

        const getPlacementStyles = () => {
            const offset = 8;

            switch (placement) {
                case 'top':
                    return {
                        transform: 'translate(-50%, -100%)',
                        marginTop: `-${offset}px`,
                        arrow: 'top-full left-1/2 -translate-x-1/2',
                        arrowBorder: 'border-l-transparent border-r-transparent border-b-transparent',
                    };
                case 'bottom':
                    return {
                        transform: 'translate(-50%, 0%)',
                        marginTop: `${offset}px`,
                        arrow: 'bottom-full left-1/2 -translate-x-1/2',
                        arrowBorder: 'border-l-transparent border-r-transparent border-t-transparent',
                    };
                case 'left':
                    return {
                        transform: 'translate(-100%, -50%)',
                        marginLeft: `-${offset}px`,
                        arrow: 'left-full top-1/2 -translate-y-1/2',
                        arrowBorder: 'border-t-transparent border-b-transparent border-r-transparent',
                    };
                case 'right':
                    return {
                        transform: 'translate(0%, -50%)',
                        marginLeft: `${offset}px`,
                        arrow: 'right-full top-1/2 -translate-y-1/2',
                        arrowBorder: 'border-t-transparent border-b-transparent border-l-transparent',
                    };
            }
        };

        const calculatePosition = () => {
            if (!triggerRef.current) return;

            const triggerRect = triggerRef.current.getBoundingClientRect();
            const scrollX = window.pageXOffset;
            const scrollY = window.pageYOffset;

            let x = 0;
            let y = 0;

            switch (placement) {
                case 'top':
                    x = triggerRect.left + scrollX + triggerRect.width / 2;
                    y = triggerRect.top + scrollY;
                    break;
                case 'bottom':
                    x = triggerRect.left + scrollX + triggerRect.width / 2;
                    y = triggerRect.bottom + scrollY;
                    break;
                case 'left':
                    x = triggerRect.left + scrollX;
                    y = triggerRect.top + scrollY + triggerRect.height / 2;
                    break;
                case 'right':
                    x = triggerRect.right + scrollX;
                    y = triggerRect.top + scrollY + triggerRect.height / 2;
                    break;
            }

            setPosition({ x, y });
        };

        const showTooltip = () => {
            if (disabled) return;

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                calculatePosition();
                setIsVisible(true);
            }, delay);
        };

        const hideTooltip = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            setIsVisible(false);
        };

        useEffect(() => {
            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
        }, []);

        useEffect(() => {
            if (!isVisible) return;

            const handleResize = () => calculatePosition();
            const handleScroll = () => calculatePosition();

            window.addEventListener('resize', handleResize);
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('scroll', handleScroll);
            };
        }, [isVisible, placement]);

        const variantStyles = getVariantStyles();
        const placementStyles = getPlacementStyles();

        return (
            <>
                {/* Trigger element */}
                <div
                    ref={triggerRef}
                    onMouseEnter={showTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={showTooltip}
                    onBlur={hideTooltip}
                    className={cn("inline-block", triggerClassName)}
                >
                    {children}
                </div>

                {/* Tooltip */}
                {isVisible && (
                    <div
                        ref={tooltipRef}
                        className={cn(
                            // Base tooltip styles
                            "fixed z-50 px-3 py-2 rounded-editor border backdrop-blur-sm",
                            "font-terminal-mono text-sm whitespace-nowrap",
                            // ✅ FIXED: Standard Tailwind animations
                            "transition-all duration-200 ease-out",
                            "animate-pulse", // Simple pulse to test visibility
                            // Variant styles
                            variantStyles.bg,
                            variantStyles.text,
                            variantStyles.border,
                            // Custom classes
                            className
                        )}
                        style={{
                            left: position.x,
                            top: position.y,
                            transform: placementStyles.transform,
                            marginTop: placementStyles.marginTop,
                            marginLeft: placementStyles.marginLeft,
                        }}
                        {...props}
                    >
                        {content}

                        {/* ✅ FIXED: Simplified arrow */}
                        <div
                            className={cn(
                                "absolute w-0 h-0 border-4",
                                placementStyles.arrow,
                                placementStyles.arrowBorder
                            )}
                            style={{
                                borderTopColor: placement === 'bottom' ? variantStyles.arrowColor : 'transparent',
                                borderBottomColor: placement === 'top' ? variantStyles.arrowColor : 'transparent',
                                borderLeftColor: placement === 'right' ? variantStyles.arrowColor : 'transparent',
                                borderRightColor: placement === 'left' ? variantStyles.arrowColor : 'transparent',
                            }}
                        />
                    </div>
                )}
            </>
        );
    }
);

TerminalTooltip.displayName = 'TerminalTooltip';
