"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { ChevronRight, Home } from 'lucide-react'
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
    label: string,
    href: string,
}

interface TerminalBreadcrumbProps {
    items?: BreadcrumbItem[];
    separator?: React.ReactNode;
    showHome?: boolean;
    className?: string;
    onItemClick?: (item: BreadcrumbItem) => void
}

export const TerminalBreadcrumb = forwardRef<HTMLElement, TerminalBreadcrumbProps>(
    ({
        items=[],
        separator = <ChevronRight size={12} />,
        showHome = true,
        className,
        onItemClick,
        ...props
    }, ref) => {

        const pathname = usePathname();

        const BreadcrumbItems = items.length > 0 ? items: generateBreadcrumbsFromPath(pathname);
        
        const handleItemClick = (item: BreadcrumbItem) => {
            onItemClick?.(item);
        };

        return (
            <nav 
                ref={ref}
                className={cn(
                    "flex items-center gap-1 text-sm font-terminal-mono",
                    className
                )}
            >
                {showHome && (
                    <>
                        <Link
                            href="/"
                            onClick={() => handleItemClick({ label: 'Home', href: '/' })}
                            className="p-1 rounded text-current-muted hover:text-current hover:bg-editor-elevated transition-colors focus:outline-none focus:ring-1 focus:ring-warm-blue/50"
                            aria-label="Home"
                        >
                            <Home size={14} />
                        </Link>
                        {BreadcrumbItems.length > 0 && (
                            <span className="text-current-muted mx-1">
                                {separator}
                            </span>
                        )}
                    </>
                )}

                {BreadcrumbItems.map((item, index) => {
                    const isLast = index === BreadcrumbItems.length - 1;
                    const isActive = pathname === item.href

                    return (
                        <div key={index} className="flex items-center gap-1">
                            {isLast || isActive ? (
                                <span
                                    className="px-2 py-1 text-current font-code-medium"
                                    aria-current="page"
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    onClick={() => handleItemClick(item)}
                                    className="px-2 py-1 rounded-editor text-current-secondary hover:text-current hover:bg-editor-elevated transition-colors focus:outline-none focus:ring-1 focus:ring-warm-blue/50"
                                >
                                    {item.label}
                                </Link>
                            )}

                            {!isLast && (
                                <span className="text-current-muted mx-1">
                                    {separator}
                                </span>
                            )}
                        </div>
                    );
                })}
            </nav>
        )
    }
)

function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
    const paths = pathname.split('/').filter(Boolean);

    return paths.map((path,index) => {
        const href = '/' + paths.slice(0, index+1).join('/');
        const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');

        return { label, href };
    })
}

TerminalBreadcrumb.displayName = 'TerminalBreadcrumb';