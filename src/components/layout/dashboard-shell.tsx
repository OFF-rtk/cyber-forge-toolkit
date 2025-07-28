"use client";

import MysticalCommandBar from "../ui/dashboard/MysticalCommandBar";

type DashboardShellProps = {
    children: React.ReactNode
    onSacredAction?: ()=>void
    keeper?: {
        soulName: string
        visage?: string
        mark: string
    }
}

export default function DashboardShell({
    children,
    onSacredAction,
    keeper = { soulName: "Anonymous Keeper", mark: "AK"}
}: DashboardShellProps ) {
    return(
        <div className="min-h-screen bg-void relative">
            {/* Command Bar */}
            <MysticalCommandBar
                onSacredAction={onSacredAction}
                keeper={keeper}
            />

            <main className="pt-30 relative z-10">
                {children}
            </main>

            {/* Ambiance */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-ember-600/1 via-transparent to-phantom-800/2 opacity-60" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-ember-600/3 to-transparent" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-ember-600/3 to-transparent" />
            </div>
        </div>
    )
}