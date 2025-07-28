"use client";

import { CrimsonPro } from "../fonts";

type SacredActivityFeedProps = {
    activities: string[]
    title?: string
    className?: string
}

export function SacredActivityFeed({
    activities,
    title = "Recent Sacred Activity",
    className = ""
} : SacredActivityFeedProps) {
    return (
        <div className={`${CrimsonPro.className} bg-ash-800/30 backdrop-blur-sm border border-ember-600/20 rounded-xl p-6 ${className}`}>
            <h3 className="text-2xl font-semibold text-bone mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-ember-600 rounded-full" />
                {title}
            </h3>
            <div className="space-y-3">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 text-lg">
                        <div className="w-2 h-2 bg-dust-400 rounded-full" />
                        <span className="text-dust">{activity}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}