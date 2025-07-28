"use client";

import DashboardShell from "@/components/layout/dashboard-shell";
import { MysticalFloorPattern } from "@/components/ui/Ambiance/MysticalFloorPattern";

export default function MainAppLayout({ children }: { children: React.ReactNode}) {
    const keeper = {
        soulName: "John Elden Ring",
        mark: "J"
    };

    const handleSacredAction = () => {
        console.log("Open Archive Forge Modal from layout...");
    };

    return (
        <DashboardShell keeper={keeper} onSacredAction={handleSacredAction}>
            {children}
            <MysticalFloorPattern />
        </DashboardShell>
    )
}