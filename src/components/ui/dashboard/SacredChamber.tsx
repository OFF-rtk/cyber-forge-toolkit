"use client";

import { AncientTablet } from "@/components/ui/dashboard/AncientTablets";
import { SacredActivityFeed } from "@/components/ui/dashboard/SacredActivityFeed";
import { RealmStatusPanel } from "@/components/ui/dashboard/RealmStatusPanel";
import { SacredSectionTitle } from "@/components/ui/dashboard/SacredSectionTitle";

const sacredTablets = [
    { 
        inscription: 'Souls in the Realm', 
        essence: 2847, 
        omen: 23, 
        prophecy: '+23% vs last moon', 
        echoes: [2100, 2200, 2150, 2300, 2400, 2500, 2650, 2847] 
    },
    { 
        inscription: 'Treasury of Gold', 
        essence: '$12,450', 
        omen: 18, 
        prophecy: '+18% vs last moon', 
        echoes: [8400, 9200, 8800, 10100, 11200, 11800, 12100, 12450] 
    },
    { 
        inscription: 'Active Rituals', 
        essence: 127, 
        omen: 5, 
        prophecy: '+5 this week' 
    },
    { 
        inscription: 'Response Swiftness', 
        essence: '2.3h', 
        omen: -12, 
        prophecy: '-12% avg' 
    },
];

const recentActivities = [
    "New archive 'Project Nexus' was forged",
    "Scribe invitation sent to keeper@realm.com",
    "Treasury confirmation updated",
    "Sacred metrics refreshed"
]

const systemStatus = [
    { label: "Sacred Servers", status: "All systems operational", statusType: 'operational' as const },
    { label: "Ancient Database", status: "Connected and synchronized", statusType: 'operational' as const },
    { label: "Mystical API", status: "Responding slow", statusType: 'warning' as const },
    { label: "Guardian Services", status: "Not-Active", statusType: 'error' as const }
];

export default function SacredChamber() {
    return(
        <div className="min-h-screen bg-void px-6 py-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-ember-600/3 via-transparent to-phantom-800/2 pointer-events-none" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-ember-600/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-ember-600/5 to-transparent pointer-events-none" />


            <div className="max-w-7xl mx-auto relative z-10">

                <SacredSectionTitle
                    title="Sacred Metrics"
                    subtitle="Current status of your digital realm"
                />

                <div className="grid grid-cols-1 sm-grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sacredTablets.map((tablet)=>(
                        <AncientTablet
                            key={tablet.inscription}
                            inscription={tablet.inscription}
                            essence={tablet.essence}
                            omen={tablet.omen}
                            prophecy={tablet.prophecy}
                            {...(tablet.echoes ? { echoes: tablet.echoes } : {})}
                        />
                    ))}
                </div>

                <div className="mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <SacredActivityFeed activities={recentActivities} />
                        <RealmStatusPanel statusItems={systemStatus} />
                    </div>
                </div>

            </div>
        </div>
    )
}
