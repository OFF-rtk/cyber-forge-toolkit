"use client"

import { CinzelFont, CrimsonPro } from "@/components/ui/fonts"
import { Button } from "@/components/ui/button"
import { ScribesLedger, ColumnDef } from "@/components/ui/DataTable/ScribeLedger"
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"


// Mock Data

const currentPlan = {
    name: "Guardian Plan",
    price: "$49/month",
    status: "Active",
    nextBillingDate: "August 24, 2025",
}

type Invoice = {
    id: string
    date: string
    amount: string
    status: 'Paid' | 'Due' | 'Failed';
};

const mockInvoices: Invoice[] = [
    { id: 'INV-2025-07', date: 'July 24, 2025', amount: '$49.00', status: 'Paid'},
    { id: 'INV-2025-06', date: 'June 24, 2025', amount: '$49.00', status: 'Paid'},
    { id: 'INV-2025-05', date: 'May 24, 2024', amount: '$49.00', status: 'Due'}
];

const invoiceColumns: ColumnDef<Invoice>[] = [
    { accessorKey: 'id', header: 'Invoice ID' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'amount', header: 'Amount'},
    { 
        accessorKey: 'status', 
        header: 'Status',
        cell: ({ row })=>(
            <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                ${row.status === 'Paid' ? 'bg-tarnished-500/20 text-tarnished-500 ' : 'bg-blood-700/20 text-blood' }`}>
                    {row.status}
            </span>
        )
    },
    {
        accessorKey: 'id',
        header: '',
        enableSorting: false,
        cell: ({ row }) => (
            <div className="text-right">
                <Button variant="ghost" size="icon" title="Download Invoice">
                    <ArrowDownTrayIcon className="h-5 w-5 text-dust hover:text-bone" />
                </Button>
            </div>
        )
    }
]

export default function Page() {
    return(
        <div className="space-y-12">
            <div>
                <h3 className={`${CinzelFont.className} text-2xl font-semibold text-bone tracking-wide`} >
                    Current Plan
                </h3>
                <div className="mt-6 bg-ash-800/30 border border-ash-700/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className={`${CinzelFont.className} text-xl font-bold text-bone`}>
                            {currentPlan.name}
                        </h4>
                        <p className={`${CrimsonPro.className} text-dust mt-1`}>
                            Your subscription is currently <span className="text-tarnished-500 font-semibold">{currentPlan.status}</span>
                        </p>
                        <p className={`${CrimsonPro.className} text-dust mt-1`}>
                            Next payment of {currentPlan.price} is on {currentPlan.nextBillingDate}.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="border-ember-600/30 text-dust hover:text-bone hover:bg-ash-800/50 w-full sm:w-auto"
                    >
                        Manage Subscription
                    </Button>
                </div>
            </div>

            <div className="h-[2px] bg-gradient-to-r from-transparent via-ember-600/20 to-transparent" />
            <div>
                <h3 className={`${CinzelFont.className} text-2xl font-semibold text-bone tracking-wide`}>
                    Payment History
                </h3>
                <p className={`${CrimsonPro.className} text-dust mt-1`}>
                    View and download your past invoices
                </p>
                <div className="mt-6">
                    <ScribesLedger
                        columns={invoiceColumns}
                        data={mockInvoices}
                        pageSize={5}
                    />
                </div>
            </div>

            <div className="h-[2px] bg-gradient-to-r from-transparent via-ember-600/20 to-transparent" />
        </div>
    )
}