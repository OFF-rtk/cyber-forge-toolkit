"use client"

import { cn } from "@/lib/utils"
import { forwardRef, ReactNode } from "react"
import { Minus, Square, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

const containerVariants = cva(
  "border-rounded overflow-hidden terminal-transition",
  {
    variants: {
      layout: {
        full: 'w-full',
        centered: 'mx-auto',
      },
    },
    defaultVariants: {
      layout: "full"
    }
  }
)

interface TerminalContainerProps {
    title?: string;
    children: ReactNode;
    className?: string;
    showTrafficLights?: boolean;
    variant?: 'default' | 'elevated' | 'panel';
    size?: 'sm' | 'md' | 'lg';
    layout?: 'full' | 'centered';
}

export const TerminalContainer = forwardRef<HTMLDivElement, TerminalContainerProps>(
    ({
        title = "Terminal Dashboard",
        children,
        className,
        showTrafficLights = true,
        variant = 'default',
        size = 'md',
        layout,
        ...props
    }, ref) => {

        const getVariantStyles = () => {
            switch (variant) {
                case 'elevated':
                    return 'bg-editor-elevated border-editor-border shadow-lg';
                case 'panel':
                    return 'bg-editor-sidebar border-current';
                default:
                    return 'bg-current-surface border-current';
            }
        };

        const getSizeStyles = () => {
            switch (size) {
                case 'sm':
                    return 'max-w-2xl';
                case 'lg':
                    return 'max-w-7xl';
                default:
                    return 'max-w-4xl';
            }
        }

        return (
            <div
                ref={ref}
                className={cn(
                    containerVariants({ layout }),
                    getVariantStyles(),
                    getSizeStyles(),
                    className
                )}
                {...props}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-current bg-editor-sidebar">
                    {showTrafficLights && (
                        <div className="flex items-center gap-2">
                            <button className="w-3 h-3 rounded-full bg-gentle-error hover:opacity-80 transition-opacity" />
                            <button className="w-3 h-3 rounded-full bg-gentle-warning hover:opacity-80 transition-opacity" />
                            <button className="w-3 h-3 rounded-full bg-gentle-success hover:opacity-80 transition-opacity" />
                        </div>
                    )}

                    <div className="flex-1 text-center">
                        <span className="font-terminal-ui font-code-medium text-sm text-current">
                            {title}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 opacity-60">
                        <button className="p-1 rounded hover:bg-editor-elevated transition-colors">
                            <Minus size={12} className="text-current-muted" />
                        </button>

                        <button className="p-1 rounded hover:bg-editor-elevated transition-colors">
                            <Square size={10} className="text-current-muted" />
                        </button>

                        <button className="p-1 rounded hover:bg-editor-elevated transition-colors">
                            <X size={12} className="text-current-muted" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {children}
                </div>
            </div>
        );
    }
);

TerminalContainer.displayName = 'TerminalContainer'
