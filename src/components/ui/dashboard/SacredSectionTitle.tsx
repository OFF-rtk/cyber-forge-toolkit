"use client";

import { CinzelFont, CrimsonPro } from "@/components/ui/fonts";

type SacredSectionTitleProps = {
    title: string
    subtitle?: string
    className?: string
}

export function SacredSectionTitle({
    title,
    subtitle,
    className="mb-8"
} : SacredSectionTitleProps) {
    return (
        <div className={className}>
            <div className={`${CinzelFont.className} text-4xl font-bold text-bone tracking-wide mb-2`}>
                {title}
            </div>
            {subtitle && (
                <div className={`${CrimsonPro.className} text dust text-md mb-3`}>
                    {subtitle}
                </div>    
            )}
            <div className="w-20 h-px bg-gradient-to-4 from-ember-600/60 to-transparent" />
        </div>
    )
}