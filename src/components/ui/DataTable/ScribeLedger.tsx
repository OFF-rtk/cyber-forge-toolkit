"use client";


import { useState, useMemo } from "react";
import { CinzelFont, CrimsonPro } from "@/components/ui/fonts";
import { 
    ChevronUpIcon, 
    ChevronDownIcon,
    ArrowLeftIcon,
    ArrowRightIcon
} from "@heroicons/react/24/outline";
import { MysticalInput } from "@/components/ui/form/MysticalInput";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export type ColumnDef<TData> = {
    accessorKey: keyof TData

    header: string;

    cell?: ({ row }: {row: TData}) => React.ReactNode;

    enableSorting?: boolean
};

type ScribesLedgerProps<TData> = {
    data: TData[]
    columns: ColumnDef<TData>[];
    filterableColumn?: keyof TData;
    pageSize?: number;
};

type SortConfig<TData> = {
    key: keyof TData;
    direction: 'ascending' | 'descending';
} | null;

export function ScribesLedger<TData>({ data, columns, filterableColumn, pageSize = 10}: ScribesLedgerProps<TData>) {

    const [sortConfig, setSortConfig] = useState<SortConfig<TData>>(null);
    const [filterQuery, setFilterQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const processedData = useMemo(() => {
        let processed = [...data];

        if(filterableColumn && filterQuery) {
            processed = processed.filter(item=>
                String(item[filterableColumn]).toLowerCase().includes(filterQuery.toLowerCase())
            );
        }

        if(sortConfig !== null) {
            processed.sort((a, b) => {
                if(a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if(a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : 1;
                }
                return 0;
            })
        }

        return processed;
    }, [data, sortConfig, filterQuery, filterableColumn])

    const totalPages = Math.ceil(processedData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = processedData.slice(startIndex, endIndex)

    const requestSort = (key: keyof TData) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction})
        setCurrentPage(1)
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterQuery(e.target.value);
        setCurrentPage(1);
    }
    return (
        <div className="space-y-6 mx-auto">
            {filterableColumn && (
                <div>
                    <MysticalInput
                        variant="compact"
                        placeholder={`Filter by ${String(filterableColumn)}...`}
                        value={filterQuery}
                        onChange={handleFilterChange}
                    />
                </div>
            )}
            <div className="bg-ash-800/30 border border-ash-700/20 rounded-xl shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className={`${CinzelFont.className} border-b-2 border-ember-600/20`}>
                            <tr>
                                {columns.map((column, index)=>(
                                    <th
                                        key={index}
                                        className="px-6 py-4 text-center text-xl font-bold text-dust uppercase tracking-wider"
                                    >
                                        {column.enableSorting !== false ? (
                                            <button onClick={() => requestSort(column.accessorKey)} className="flex items-center gap-2 group transition-colors hover:text-bone">
                                                {column.header}
                                                <span className="opacity-0 group-hover:opacity-50">
                                                    {sortConfig?.key === column.accessorKey ? (
                                                        sortConfig.direction === 'ascending' ? (
                                                            <ChevronUpIcon className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronDownIcon className="h-4 w-4" />
                                                        )
                                                    ) : (
                                                        <ChevronUpIcon className="h-4 w-4" />
                                                    )}
                                                </span>
                                            </button>
                                        ) : ( column.header )}
                                    </th>
                                ))}
                            </tr>
                        </thead>


                        <tbody className={`${CrimsonPro.className}`}>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className="border-b border-ash-700/20 hover:bg-ash-700/10 transition-colors duration-200 text-md"
                                    >
                                        {columns.map((column, colIndex) => {
                                            const value = row[column.accessorKey];
                                            
                                            return (
                                                <td
                                                    key={colIndex}
                                                    className="px-6 py-4 whitespace-nowrap text-bone"
                                                >
                                                    {column.cell ? (
                                                        column.cell({ row })
                                                    ) : (
                                                        String(value)
                                                    )}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="text-center py-12 text-dust">
                                        The ledger is empty.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center justify-between p-4 border-t border-ash-700/20">
                        <span className="text-sm text-dust">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="space-x-4 flex ">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="border-ember-600/30 text-dust hover:text-bone hover:bg-ash-800/50"
                            >
                                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="border-ember-30 text-dust hover:text-bone hover:bg-ash-800/50"
                            >
                                Next
                                <ArrowRightIcon className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        
    )
}