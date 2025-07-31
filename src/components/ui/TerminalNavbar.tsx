"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Terminal, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ✅ UPDATED: NavItem interface to support React elements and button functionality
interface NavItem {
    label: string | React.ReactNode; // ✅ CHANGED: Allow both string and React elements
    href: string;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void; // ✅ ADD: Optional click handler
    isButton?: boolean; // ✅ ADD: Flag for button-style items
    tooltip?: string; // ✅ ADD: Optional tooltip
}

interface TerminalNavbarProps {
    brand?: string;
    items: NavItem[];
    className?: string;
    showBrandIcon?: boolean;
    onItemClick?: (item: NavItem) => void;
    floating?: boolean;
}

export const TerminalNavbar = forwardRef<HTMLElement, TerminalNavbarProps>(
    ({
        brand = "Terminal UI",
        items = [],
        className,
        showBrandIcon = true,
        onItemClick,
        floating = false,
        ...props
    }, ref) => {

        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
        const pathname = usePathname();

        const handleItemClick = (item: NavItem, e?: React.MouseEvent) => {
            if (!item.disabled) {
                // Handle custom onClick for buttons
                if (item.onClick && e) {
                    item.onClick(e);
                }
                onItemClick?.(item);
                setIsMobileMenuOpen(false);
            }
        }

        const isActiveRoute = (href: string) => {
            if (href === '/') return pathname === '/';
            return pathname.startsWith(href);
        }

        // ✅ UPDATED: Render item helper function
        const renderNavItem = (item: NavItem, index: number, isMobile: boolean = false) => {
            const isActive = !item.isButton && isActiveRoute(item.href);
            
            const baseClasses = cn(
                "font-terminal-mono transition-all duration-200",
                isMobile 
                    ? "block w-full text-left text-xs px-3 py-1.5 rounded-full"
                    : "text-xs px-3 py-1.5 rounded-full",
                "hover:bg-warm-blue/10 hover:text-warm-blue",
                isActive
                    ? "text-warm-blue bg-warm-blue/10"
                    : "text-current-secondary",
                item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
            );

            // ✅ UPDATED: Handle button items
            if (item.isButton) {
                return (
                    <button
                        key={index}
                        onClick={(e) => handleItemClick(item, e)}
                        className={cn(baseClasses, "focus:outline-none focus:ring-1 focus:ring-warm-blue/50")}
                        title={item.tooltip}
                        disabled={item.disabled}
                    >
                        {item.label}
                    </button>
                );
            }

            // Regular link items
            return (
                <Link
                    key={index}
                    href={item.href}
                    onClick={(e) => handleItemClick(item, e)}
                    className={baseClasses}
                >
                    {item.label}
                </Link>
            );
        };

        // ✅ Floating navbar style
        if (floating) {
            return (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
                    <div className={cn(
                        "bg-current-surface/95 backdrop-blur-md border border-current rounded-full px-6 py-3 shadow-2xl w-auto min-w-96 lg:min-w-7xl",
                        className
                    )}>
                        <div className="flex items-center justify-between gap-8">
                            {/* Brand */}
                            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                {showBrandIcon && (
                                    <div className="w-2 h-2 rounded-full bg-warm-blue animate-pulse"></div>
                                )}
                                <span className="font-terminal-ui font-code-semibold text-sm text-current">
                                    {brand}
                                </span>
                            </Link>

                            {/* Navigation Items */}
                            <nav className="hidden md:flex items-center gap-4">
                                {items.map((item, index) => renderNavItem(item, index, false))}
                            </nav>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-1.5 rounded-full text-current-muted hover:text-current hover:bg-warm-blue/10 transition-colors"
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                            </button>
                        </div>

                        {/* Mobile Menu for Floating */}
                        {isMobileMenuOpen && (
                            <div className="md:hidden mt-4 pt-4 border-t border-current space-y-2">
                                {items.map((item, index) => renderNavItem(item, index, true))}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // ✅ UPDATED: Standard navbar style with button support
        return (
            <nav
                ref={ref}
                className={cn(
                    "bg-current-surface border-b border-current px-4 py-3 terminal-transition",
                    className
                )}
                {...props}
            >
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        {showBrandIcon && (
                            <Terminal size={20} className="text-warm-blue" />
                        )}
                        <span className="font-terminal-ui font-code-semibold text-lg text-current">
                            {brand}
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        {items.map((item, index) => {
                            const isActive = !item.isButton && isActiveRoute(item.href);

                            const standardClasses = cn(
                                "font-terminal-mono text-sm px-3 py-2 rounded-editor terminal-transition",
                                "hover:bg-editor-elevated focus:outline-none focus:ring-1 focus:ring-warm-blue/50",
                                isActive
                                    ? "text-warm-blue bg-warm-blue/10 border border-warm-blue/20"
                                    : "text-current-secondary hover:text-current",
                                item.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent pointer-events-none"
                            );

                            // ✅ UPDATED: Handle button items in standard navbar
                            if (item.isButton) {
                                return (
                                    <button
                                        key={index}
                                        onClick={(e) => handleItemClick(item, e)}
                                        className={standardClasses}
                                        title={item.tooltip}
                                        disabled={item.disabled}
                                    >
                                        {item.label}
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    onClick={(e) => handleItemClick(item, e)}
                                    className={standardClasses}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-editor text-current-muted hover:text-current hover:bg-editor-elevated transition-colors focus:outline-none focus:ring-1 focus:ring-warm-blue/50"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>        
                </div>

                {/* ✅ UPDATED: Mobile menu with button support */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-current space-y-2">
                        {items.map((item, index) => {
                            const isActive = !item.isButton && isActiveRoute(item.href);

                            const mobileClasses = cn(
                                "block w-full text-left font-terminal-mono text-sm px-3 py-2 rounded-editor terminal-transition",
                                "hover:bg-editor-elevated focus:outline-none focus:ring-1 focus:ring-warm-blue/50",
                                isActive
                                    ? "text-warm-blue bg-warm-blue/10 border border-warm-blue/20"
                                    : "text-current-secondary hover:text-current",
                                item.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent pointer-events-none"
                            );

                            // Handle button items in mobile menu
                            if (item.isButton) {
                                return (
                                    <button
                                        key={index}
                                        onClick={(e) => handleItemClick(item, e)}
                                        className={mobileClasses}
                                        title={item.tooltip}
                                        disabled={item.disabled}
                                    >
                                        {item.label}
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    onClick={(e) => handleItemClick(item, e)}
                                    className={mobileClasses}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </nav>
        );
    }
);

TerminalNavbar.displayName = 'TerminalNavbar';
