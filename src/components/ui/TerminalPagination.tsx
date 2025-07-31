"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface TerminalPaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    showInfo?: boolean;
    showSizeChanger?: boolean;
    pageSizeOptions?: number[];
    onPageSizeChange?: (pageSize: number) => void;
    maxVisiblePages?: number;
    variant?: 'default' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const TerminalPagination = forwardRef<HTMLDivElement, TerminalPaginationProps>(
    ({
        currentPage,
        totalItems,
        pageSize,
        onPageChange,
        showInfo = true,
        showSizeChanger = false,
        pageSizeOptions = [10, 20, 50, 100],
        onPageSizeChange,
        maxVisiblePages = 7,
        variant = 'default',
        size = 'md',
        className,
        ...props
    }, ref) => {

        const totalPages = Math.ceil(totalItems / pageSize);
        const startItem = (currentPage - 1) * pageSize + 1;
        const endItem = Math.min(currentPage * pageSize, totalItems);
        
        const hasPrevious = currentPage > 1;
        const hasNext = currentPage < totalPages;

        const getVariantStyles = () => {
            switch (variant) {
                case 'success':
                    return {
                        border: 'border-gentle-success',
                        active: 'bg-gentle-success text-current-bg',
                        hover: 'hover:bg-gentle-success/10 hover:text-gentle-success',
                    };
                case 'warning':
                    return {
                        border: 'border-gentle-warning',
                        active: 'bg-gentle-warning text-current-bg',
                        hover: 'hover:bg-gentle-warning/10 hover:text-gentle-warning',
                    };
                case 'error':
                    return {
                        border: 'border-gentle-error',
                        active: 'bg-gentle-error text-current-bg',
                        hover: 'hover:bg-gentle-error/10 hover:text-gentle-error',
                    };
                default:
                    return {
                        border: 'border-current',
                        active: 'bg-warm-blue text-current-bg',
                        hover: 'hover:bg-warm-blue/10 hover:text-warm-blue',
                    };
            }
        }

        const getSizeStyles = () => {
            switch (size) {
                case 'sm':
                    return {
                        button: 'px-2 py-1 text-xs', // Small padding and text
                        info: 'text-xs', // Small info text
                        gap: 'gap-1', // Small gaps between elements
                    };
                case 'lg':
                    return {
                        button: 'px-4 py-3 text-base', // Large padding and text
                        info: 'text-base', // Large info text
                        gap: 'gap-3', // Large gaps between elements
                    };
                default:
                    return {
                        button: 'px-3 py-2 text-sm', // Medium padding and text
                        info: 'text-sm', // Medium info text
                        gap: 'gap-2', // Medium gaps between elements
                    };
            }
        }

        const variantStyles = getVariantStyles();
        const sizeStyles = getSizeStyles();

        const getVisiblePages = () => {
            if (totalPages <= maxVisiblePages) {
                return Array.from({ length: totalPages }, (_, i) => i + 1);
            }

            const sidePages = Math.floor(maxVisiblePages / 2);
            let startPage = Math.max(1, currentPage - sidePages);
            let endPage = Math.min(totalPages, currentPage + sidePages);

            if (currentPage <= sidePages) {
                endPage = Math.min(totalPages, maxVisiblePages);
            } 
            if (currentPage > totalPages - sidePages) {
                startPage = Math.max(1, totalPages - maxVisiblePages + 1);
            }

            const pages = [];
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            return pages;
        }

        const handlePageClick = (page: number) => {
            if (page !== currentPage && page >= 1 && page <= totalPages) {
                onPageChange(page);
            }
        };

        const handlePageSizeChange = (newPageSize: number) => {
            if(onPageSizeChange) {
                onPageSizeChange(newPageSize);
                const newTotalPages = Math.ceil(totalItems / newPageSize);
                if(currentPage > newTotalPages) {
                    onPageChange(1);
                }
            }
        }

        const visiblePages = getVisiblePages();
        const showEllipsisStart = visiblePages[0] > 1;
        const showEllipsisEnd = visiblePages[visiblePages.length - 1] < totalPages;

        if (totalPages <= 1 || totalItems === 0) {
            return null;
        }
        
        return (
            <div 
                ref={ref}
                className={cn(
                    "flex items-center justify-between",
                    className
                )}
                {...props}
            >
                {showInfo && (
                    <div className={cn(
                        "font-terminal-mono text-current-muted",
                        sizeStyles.info
                    )}>
                        Showing {startItem}-{endItem} of {totalItems} results
                    </div>
                )}

                <div className={cn(
                    "flex items-center",
                    sizeStyles.gap
                )}>
                    <button
                        onClick={() => handlePageClick(currentPage - 1)}
                        disabled={!hasPrevious}
                        className={cn(
                            "flex items-center font-terminal-mono border rounded-editor terminal-transition",
                            sizeStyles.button,
                            variantStyles.border,
                            hasPrevious
                                ? `${variantStyles.hover} text-current-secondary`
                                : "opacity-50 cursor-not-allowed text-current-muted",
                            "focus:outline-none focus:ring-1 focus:ring-warm-blue/50"
                        )}
                    >
                        <ChevronLeft size={16} className="mr-1" />
                        Previous
                    </button>


                    <div className={cn("flex items-center", sizeStyles.gap)}>
                        {showEllipsisStart && (
                            <>
                                <button
                                    onClick={() => handlePageClick(1)}
                                    className={cn(
                                        "font-terminal-mono border rounded-editor terminal-transition",
                                        sizeStyles.button,
                                        variantStyles.border,
                                        `${variantStyles.hover} text-current-secondary`,
                                        "focus:outline-none focus:ring-1 focus:ring-warm-blue/50"
                                    )}
                                >
                                    1
                                </button>
                                <span className="flex items-center justify-center w-8 h-8">
                                    <MoreHorizontal size={16} className="text-current-muted" />
                                </span>
                            </>
                        )}

                        {visiblePages.map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageClick(page)}
                                className={cn(
                                    "font-terminal-mono border rounded-editor terminal-transition",
                                    sizeStyles.button,
                                    variantStyles.border,
                                    page == currentPage
                                        ? variantStyles.active
                                        : `${variantStyles.hover} text-current-secondary`,
                                    "focus:outline-none focus:ring-1 focus:ring-warm-blue/50"
                                )}
                            >
                                {page}
                            </button>
                        ))}

                        {showEllipsisEnd && (
                            <>
                                <span className="flex items-center justify-center w-8 h-8">
                                    <MoreHorizontal size={16} className="text-current-muted" />
                                </span>
                                <button
                                    onClick={() => handlePageClick(totalPages)}
                                    className={cn(
                                        "font-terminal-mono border rounded-editor terminal-transition",
                                        sizeStyles.button,
                                        variantStyles.border,
                                        `${variantStyles.hover} text-current-secondary`,
                                        "focus:outline-none focus:ring-1 focus:ring-warm-blue/50"
                                    )}
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => handlePageClick(currentPage + 1)}
                        disabled={!hasNext}
                        className={cn(
                            "flex items-center font-terminal-mono border rounded-editor terminal-transition",
                            sizeStyles.button,
                            variantStyles.border,
                            hasNext
                                ? `${variantStyles.hover} text-current-secondary`
                                : "opacity-50 cursor-not-allowed text-current-muted",
                            "focus:outline-none focus:ring-1 focus:ring-warm-blue/50"
                        )}
                    >
                        Next
                        <ChevronRight size={16} className="ml-1" />
                    </button>

                    {showSizeChanger && onPageSizeChange && (
                    <div className="flex items-center gap-2">
                        <span className={cn(
                            "font-terminal-mono text-current-muted",
                            sizeStyles.info
                            )}
                        >
                            Show:
                        </span>
                        <select
                            value={pageSize} // Current page size
                            onChange={(e) => handlePageSizeChange(Number(e.target.value))} // Handle size change
                            className={cn(
                                "font-terminal-mono border rounded-editor bg-current-surface text-current",
                                "focus:outline-none focus:ring-1 focus:ring-warm-blue/50",
                                sizeStyles.button,
                                variantStyles.border
                            )}
                        >
                        {/* Render page size options */}
                        {pageSizeOptions.map((option) => (
                            <option key={option} value={option} className="bg-current-surface">
                            {option}
                            </option>
                        ))}
                        </select>
                    </div>
                    )}
                </div>
            </div>
        )
    }
)

TerminalPagination.displayName = 'TerminalPagination';