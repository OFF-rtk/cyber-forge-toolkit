"use client";

import { ScribesLedger, ColumnDef } from "@/components/ui/DataTable/ScribeLedger";
import { CinzelFont } from "@/components/ui/fonts";
import { Button } from "@/components/ui/button";
import { SacredSectionTitle } from "@/components/ui/dashboard/SacredSectionTitle";

type User = {
    id: number;
    soulName: string;
    email: string;
    role: 'Scribe' | 'Guardian' | 'Oracle';
    status: 'Active' | 'Pending';
}


const mockUsers: User[] = [
    { id: 1, soulName: 'John Elden Ring', email: 'keeper@realm.com', role: 'Guardian', status: 'Active' },
    { id: 2, soulName: 'Malenia, Blade of Miquella', email: 'maiden@haligtree.com', role: 'Scribe', status: 'Active' },
    { id: 3, soulName: 'Starscourge Radahn', email: 'general@redmane.com', role: 'Scribe', status: 'Pending' },
    { id: 4, soulName: 'Rennala, Queen of the Full Moon', email: 'queen@raya-lucaria.com', role: 'Oracle', status: 'Active' },
    { id: 5, soulName: 'Godrick the Grafted', email: 'lord@stormveil.com', role: 'Scribe', status: 'Pending' },
    { id: 6, soulName: 'Rykard, Lord of Blasphemy', email: 'lord@volcano-manor.com', role: 'Oracle', status: 'Active' },
    { id: 7, soulName: 'Mohg, Lord of Blood', email: 'lord@mohgwyn-palace.com', role: 'Guardian', status: 'Active' },
    { id: 8, soulName: 'Sir Gideon Ofnir', email: 'all-knowing@roundtable.com', role: 'Scribe', status: 'Active' },
];

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'soulName',
        header: 'Soul Name',
    },
    {
        accessorKey: 'email',
        header: 'Email Address',
    },
    {
        accessorKey: 'role',
        header: 'Role',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({row}) => (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                row.status === 'Active' ? 'bg-ember-600/20 text-ember-bright' : 'bg-dust-400/20 text-dust'
            }`}>
                {row.status}
            </span>
        ),
    },
    {
        accessorKey: 'id',
        header: 'Actions',
        enableSorting: false,
        cell: ({row}) => (
            <Button variant="ghost" size="sm" className="text-dust hover:text-bone ml-5">
                Manage
            </Button>
        )
    }
]


export default function Page() {
    return(
        <div className="min-h-screen bg-void px-6 py-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-ember-600/3 via-transparent to-phantom-800/2 pointer-events-none" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-ember-600/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-ember-600/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <SacredSectionTitle
                    title="The Scribes"
                />
                
                <ScribesLedger 
                    columns={columns} 
                    data={mockUsers} 
                    filterableColumn="soulName" 
                    pageSize={5}
                />

            </div>
            
        </div>
    )
}