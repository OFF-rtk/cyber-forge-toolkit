"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { Terminal } from "lucide-react";

interface TabItem {
    id: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
    badge?: string | number;
}

interface TerminalTabsProps {
    items: TabItem[];
    defaultTab?: string;
    variant?: 'default' | 'error' | 'success';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onTabChange?: (tabId: string) => void;
}

export const TerminalTabs = forwardRef<HTMLDivElement, TerminalTabsProps>(
    ({
        items = [],
        defaultTab,
        variant = "default",
        size = 'md',
        className,
        onTabChange,
        ...props
    }, ref) => {

        const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id || '');

        const getVariantStyles = () => {
            switch (variant) {
                case 'success':
                    return {
                        border: 'border-gentle-success',
                        activeTab: 'text-gentle-success border-gentle-success bg-gentle-success/10',
                    };
                case 'error':
                    return {
                        border: 'border-gentle-error',
                        activeTab: 'text-gentle-error border-gentle-error bg-gentle-error/10',
                    };
                default:
                    return {
                        border: 'border-current',
                        activeTab: 'text-warm-blue border-warm-blue bg-warm-blue/10',
                    };
            }
        }

        const getSizeStyles = () => {
            switch (size) {
                case 'sm':
                    return {
                        tab: 'px-3 py-1.5 text-xs',
                        content: 'p-3',
                    };
                case 'lg':
                    return {
                        tab: 'px-6 py-3 text-base',
                        content: 'p-6',
                    };
                default:
                    return {
                        tab: 'px-4 py-2 text-sm',
                        content: 'p-4',
                    };
            }
        }
        
        const variantStyles = getVariantStyles();
        const sizeStyles = getSizeStyles();

        const handleTabClick = (tabId: string) => {
            if (items.find(item => item.id === tabId)?.disabled) return;

            setActiveTab(tabId)
            onTabChange?.(tabId)
        }

        const activeTabContent = items.find(item => item.id === activeTab)?.content;

        return (
            <div
                ref={ref}
                className={cn(
                    "border rounded-editor bg-current-surface terminal-transition overflow-hidden",
                    variantStyles.border,
                    className
                )}
                {...props}
            >
                <div className="flex items-center border-b border-current bg-editor-sidebar overflow-x-auto">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleTabClick(item.id)}
                            disabled={item.disabled}
                            className={cn(
                                "flex items-center gap-2 font-terminal-mono font-code-medium border-b-2 border-transparent terminal-transition whitespace-nowrap flex-shrink-0",
                                sizeStyles.tab,
                                "hover:bg-editor-elevated focus:outline-none focus:ring-1 focus:ring-warm-blue/50",
                                activeTab === item.id
                                    ? variantStyles.activeTab
                                    : "text-current-secondary hover:text-current",
                                item.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
                            )}
                        >
                            <Terminal size={12} className="text-current" />
                            <span>{item.label}</span>
                            {item.badge && (
                                <span className="px-1.5 py-0.5 text-xs rounded-full bg-current-muted text-current-bg font-code-medium">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className={cn("bg-current-surface", sizeStyles.content)}>
                    <div className="font-terminal-mono text-sm text-current">
                        {activeTabContent}
                    </div>
                </div>
            </div>
        )
    }
)


TerminalTabs.displayName = 'TerminalTabs';