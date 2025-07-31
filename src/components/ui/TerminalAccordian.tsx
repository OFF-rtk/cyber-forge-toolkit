"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { ChevronDown, ChevronDownIcon, Terminal } from "lucide-react";

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
    disabled?: boolean;
}

interface TerminalAccordianProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    defaultOpen?: string[];
    variant?: 'default' | 'error' | 'success';
    className?: string;
}

export const TerminalAccordian = forwardRef<HTMLDivElement, TerminalAccordianProps>(
    ({
        items = [],
        allowMultiple = false,
        defaultOpen = [],
        variant = 'default',
        className,
        ...props
    }, ref) => {

        const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

        const getVariantStyles = () => {
            switch (variant) {
                case 'success':
                    return {
                        border: 'border-gentle-success',
                        header: 'text-gentle-success bg-editor-elevated',
                    };
                case 'error':
                    return {
                        border: 'border-gentle-error',
                        header: 'text-gentle-error bg-editor-elevated',
                    };
                default:
                    return {
                        border: 'border-current',
                        header: 'text-warm-blue bg-editor-sidebar',
                    };
            }
        }

        const variantStyles = getVariantStyles();

        const toggleItem = (itemId: string) => {
            if (allowMultiple) {
                setOpenItems(prev => 
                    prev.includes(itemId)
                        ? prev.filter(id => id !== itemId)
                        : [...prev, itemId]
                );
            } else {
                setOpenItems(prev => 
                    prev.includes(itemId) ? [] : [itemId]
                );
            }
        };

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
                {items.map((item, index) => {
                    const isOpen = openItems.includes(item.id);
                    const isLast = index === items.length - 1;

                    return (
                        <div key={item.id}>
                            <button
                                onClick={() => !item.disabled && toggleItem(item.id)}
                                disabled={item.disabled}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-3 text-left terminal-transition",
                                    "hover:bg-editor-elevated focus:outline-none focus:ring-warm-blue/50",
                                    variantStyles.header,
                                    item.disabled && "opacity-50 cursor-not-allowed",
                                    !isLast && "border-b border-current"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <Terminal size={14} className="text-current" />
                                    <span className="font-terminal-mono font-code-medium text-sm">
                                        {item.title}
                                    </span>
                                </div>

                                <ChevronDown
                                    size={14}
                                    className={cn(
                                        "transition-transform duration-150 text-current",
                                        isOpen && "rotate-180"
                                    )}
                                />
                            </button>

                            {isOpen && (
                                <div className="px-4 py-4 border-t border-current bg-current-surface">
                                    <div className="font-terminal-mono text-sm text-current">\
                                        {item.content}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
);


TerminalAccordian.displayName = 'TerminalAccordian'