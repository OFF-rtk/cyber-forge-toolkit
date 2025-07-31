"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Terminal } from "lucide-react";

interface TableColumn<T = any> {
    key: string;
    header: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode
    width?: string;
}

interface TerminalTableProps<T = any> {
    data: T[];
    columns: TableColumn<T>[];
    loading?: boolean;
    sortable?: boolean;
    variant?: 'default' | 'success' | 'warning' | 'error'
    size?: 'sm' | 'md' | 'lg';
    className?: string
    onRowClick?: (row: T) => void
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
    key: string | null;
    direction: SortDirection;
}

export const TerminalTable = forwardRef<HTMLDivElement, TerminalTableProps>(
    ({
        data = [],
        columns = [],
        loading = false,
        sortable = true,
        variant = 'default',
        size = 'md',
        className,
        onRowClick,
        ...props
    }, ref) => {

        const [sortState, setSortState] = useState<SortState>({
            key: null,
            direction: null
        });

        const getVariantStyles = () => {
            switch (variant) {
                case 'success':
                    return {
                        border: 'border-gentle-success',
                        header: 'bg-gentle-success/10 text-gentle-success',
                    };
                case 'warning':
                    return {
                        border: 'border-gentle-warning',
                        header: 'bg-gentle-warning/10 text-gentle-warning',
                    };
                case 'error':
                    return {
                        border: 'border-gentle-error',
                        header: 'bg-gentle-error/10 text-gentle-error',
                    };
                default:
                    return {
                        border: 'border-current',
                        header: 'bg-editor-sidebar text-warm-blue',
                    };
            }
        }

        const getSizeStyles = () => {
            switch (size) {
                case 'sm':
                    return {
                        padding: 'px-2 py-1',
                        text: 'text-xs',
                        header: 'px-2 py-2',
                    };
                case 'lg':
                    return {
                        padding: 'px-6 py-4',
                        text: 'text-base',
                        header: 'px-6 py-4',
                    };
                default:
                    return {
                        padding: 'px-4 py-3',
                        text: 'text-sm',
                        header: 'px-4 py-3',
                    };
            }
        }

        const variantStyles = getVariantStyles();
        const sizeStyles = getSizeStyles();

        const sortedData = useMemo(() => {
            
            if (!sortState.key || !sortState.direction) return data;

            return [...data].sort((a,b) => {
                const aValue = a[sortState.key!];
                const bValue = b[sortState.key!];

                if (aValue === bValue) return 0;

                let comparison = 0;

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
    
                } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                    comparison = aValue - bValue;
                } else {
                    comparison = String(aValue).localeCompare(String(bValue));
                }

                return sortState.direction === 'asc' ? comparison : -comparison;
            })
        }, [data, sortState]);

        const handleSort = (columnKey: string) => {

            if(!sortable) return;

            const column = columns.find(col => col.key === columnKey);

            if(!column?.sortable) return;

            setSortState(prev => {
                if(prev.key === columnKey) {
                    const newDirection = prev.direction === 'asc' ? 'desc' : prev.direction === 'desc' ? null : 'asc';
                
                    return {
                        key: newDirection ? columnKey : null,
                        direction: newDirection
                    };
                } else {
                    return { key: columnKey, direction: 'asc'};
                }
            });
        };

        const getSortIcon = (columnKey: string) => {
            
            if(sortState.key !== columnKey) return null;

            return sortState.direction === 'asc' ?
                <ChevronUp size={14} className="text-current" /> :
                <ChevronDown size={14} className="text-current" />;
        };

        if (loading) {
            return(
                <div
                    ref={ref}
                    className={cn(
                        "border rounded-editor bg-current-surface overflow-hidden",
                        variantStyles.border,
                        className
                    )}
                    {...props}
                >
                    <div className={cn(
                        "flex items-center justify-center py-12",
                        sizeStyles.text
                    )}>
                        <div className="flex items-center gap-3 text-current-muted">
                            <Terminal size={16} className="animate-pulse" />
                            <span className="font-terminal-mono">Loading data...</span>
                        </div>
                    </div>
                </div>
            )
        }

        return(
            <div
                ref={ref}
                className={cn(
                    "border rounded-editor bg-current-surface overflow-hidden",
                    variantStyles.border,
                    className
                )}
                {...props}
            >
                <div className={cn(
                    "border-b border-current",
                    variantStyles.header
                )}>
                    <div
                        className="grid gap-0"
                        style = {{
                            gridTemplateColumns: columns.map(col => col.width || '1fr').join(' ')
                        }}
                    >
                        {columns.map((column) => (
                            <button
                                key={column.key}
                                onClick={() => handleSort(column.key)}
                                disabled={!sortable || !column.sortable}
                                className={cn(
                                    "flex items-center justify-between text-left font-terminal-mono font-code-medium border border-r border-current last:border-r-0 terminal-transition",
                                    sizeStyles.header,
                                    sizeStyles.text,
                                    sortable && column.sortable && "hover:bg-editor-elevated cursor-pointer",
                                    !sortable || !column.sortable ? "cursor-default" : ""
                                )}
                            >
                                <span>{column.header}</span>

                                {sortable && column.sortable && (
                                    <span className="ml-2">
                                        {getSortIcon(column.key) || <div className="w-3.5 h-3.5" />}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {sortedData.length === 0 ? (
                        <div className={cn(
                            "flex items-center justify-center py-8 text-current-muted",
                            sizeStyles.text
                        )}>
                            <span className="font-terminal-mono">No data available</span>
                        </div>
                    ) : (
                        sortedData.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                onClick={() => onRowClick?.(row)}
                                className={cn(
                                    "grid gap-0 border-b border-current last:border-b-0 terminal-transition",
                                    "hover:bg-editor-elevated",
                                    onRowClick && "cursor-pointer"
                                )}
                                style = {{
                                    gridTemplateColumns: columns.map(col => col.width || '1fr').join(' ')
                                }}
                            >
                                {columns.map((column) => (
                                    <div
                                        key={column.key}
                                        className={cn(
                                            "font-terminal-mono border-r border-current last:border-r-0",
                                            sizeStyles.padding,
                                            sizeStyles.text,
                                            "text-current"
                                        )}
                                    >
                                        {column.render ?
                                            column.render(row[column.key], row) :
                                            String(row[column.key] || '')    
                                        }
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    }
)

TerminalTable.displayName = 'TerminalTable';