"use client";

import { CrimsonPro } from "../fonts";

type StatusItem = {
    label: string
    status: string
    statusType: 'operational' | 'warning' | 'error'
}

type RealmStatusPanelProps = {
    statusItems: StatusItem[]
    title?: string
    className?: string
}

export function RealmStatusPanel({
    statusItems,
    title="Realm Status",
    className = ""
} : RealmStatusPanelProps) {
    const getStatusColor = (statusType: StatusItem['statusType']) => {
        switch (statusType) {
            case 'operational': return 'text-tarnished'
            case 'warning' : return 'text-ember'
            case 'error' : return 'text-blood'
            default: return 'text-dust'
        }
    }

    return (
        <div className={`${CrimsonPro.className} bg-ash-800/30 backdrop-blur-sm border border-ember-600/20 rounded-xl p-6 ${className}`}>
            <h3 className="text-2xl font-semibold text-bone mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-tarnished-500 rounded-full animate-pulse" />
                {title}
            </h3>
            <div className="space-y-4">
                {statusItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <span className="text-dust text-lg">{item.label}</span>
                        <span className={`text-md ${getStatusColor(item.statusType)}`}>
                            {item.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}