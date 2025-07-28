"use client";

import { ComponentType, SVGProps, useState } from "react"
import { CinzelFont } from "../fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, Cog6ToothIcon as RuneOfSettingsIcon} from "@heroicons/react/24/outline"; 

type ShadowGrimoireProps = {
    codexTitle: string,
    chapters: {inscription: string, sigil: string, rune: ComponentType<SVGProps<SVGSVGElement>>, path: string}[]
}

export default function ShadowGrimoire({ chapters, codexTitle }: ShadowGrimoireProps) {
    const [isSealed, setIsSealed] = useState(false);
    const currentPath = usePathname()

    return(
        <nav className={clsx(
            "bg-void text-dust-400 min-h-screen flex flex-col border-r-2 border-ember shadow-void",
            "transition-soul",
            isSealed ? "w-16" : "w-60"
        )}>
            {/* The Codex Header */}
            <div className="flex justify-between items-center p-4 border-b-2 border-ash-800/60 h-20 relative">
                {/* Ancient binding pattern */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-ember-600/60 via-ember-600/80 to-ember-600/60" />
                
                <div className={clsx(
                    "transition-soul overflow-hidden",
                    isSealed 
                        ? "opacity-0 w-0 transform translate-x-[-10px]" 
                        : "opacity-100 w-auto delay-300 transform translate-x-0" 
                )}>
                    <h1 className={`text-xl font-semibold ${CinzelFont.className} tracking-widest text-bone-100 glow-bone whitespace-nowrap relative`}>
                        <span className="relative">
                            {codexTitle}
                            <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember-600/60 to-transparent" />
                        </span>
                    </h1>
                </div>
                
                {/* The Seal/Unseal Sigil */}
                <button
                    className={clsx(
                        "flex items-center p-2 rounded-sm transition-soul ml-auto group relative", 
                        "hover:bg-ash-800/60 hover:text-bone-100", 
                        "focus:outline-none focus:ring-2 focus:ring-ember-600/50", 
                        "before:absolute before:inset-0 before:bg-ember-600/10 before:opacity-0 before:transition-opacity before:duration-300",
                        "hover:before:opacity-100"
                    )}
                    onClick={() => setIsSealed((c) => !c)}
                    aria-label={isSealed ? "Unseal the grimoire" : "Seal the grimoire"}
                >
                    {isSealed ? (
                        <ChevronDoubleRightIcon className="h-5 w-5 transition-soul group-hover:scale-110 group-hover:glow-bone" />
                    ) : (
                        <ChevronDoubleLeftIcon className="h-6 w-6 transition-soul group-hover:scale-110 group-hover:glow-bone" />
                    )}
                </button>
            </div>
            
            {/* Chapter Scrolls - Main Navigation */}
            <ul className={clsx(
                "flex flex-col space-y-1 flex-grow py-4", 
                isSealed ? "px-2" : "px-4"
            )}>
                {chapters.map(chapter => {
                    const RuneIcon = chapter.rune;
                    const isCurrentPath = currentPath === chapter.path
                    
                    return (
                        <li key={chapter.sigil} className="relative">
                            {/* Active path mystical glow background */}
                            {isCurrentPath && (
                                <div className="absolute inset-0 bg-ember-600/20 rounded-sm animate-pulse" />
                            )}
                            
                            <Link 
                                href={chapter.path}
                                title={isSealed ? chapter.inscription : undefined}
                                className={clsx(
                                    `${CinzelFont.className} tracking-wide flex items-center rounded-sm transition-soul relative group`,
                                    isCurrentPath && "bg-ash-800/80 text-bone-100 font-semibold shadow-ember",
                                    !isCurrentPath && "hover:bg-ash-800/40 hover:text-bone-100 hover:shadow-fog",
                                    "px-3 py-3",
                                    isSealed
                                        ? "justify-center px-2 py-3"
                                        : "gap-3 px-3 py-3"
                                )}
                            >
                                {/* Rune Container */}
                                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 relative">
                                    <RuneIcon className={clsx(
                                        "h-5 w-5 transition-soul",
                                        isCurrentPath 
                                            ? "text-ember-600 glow-ember" 
                                            : "text-dust-400 group-hover:text-bone-100 group-hover:glow-bone"
                                    )} />
                                </div>

                                {/* Chapter Inscription */}
                                <div className={clsx(
                                    "whitespace-nowrap transition-soul overflow-hidden",
                                    isSealed 
                                        ? "opacity-0 w-0 transform -translate-x-6" 
                                        : "opacity-100 w-auto transform translate-x-0 delay-200"
                                )}>
                                    <span className={clsx(
                                        "whitespace-nowrap text-sm font-medium transition-soul",
                                        isCurrentPath && "text-bone-100 glow-bone"
                                    )}>
                                        {chapter.inscription}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            
            {/* Sacred Configurations - Settings at bottom */}
            <div className={clsx("mt-auto border-t-2 border-ash-800/40 pt-4", isSealed ? "px-2 pb-2" : "px-4 pb-4")}>
                <Link 
                    href="/sacred-configurations"
                    title={isSealed ? "Sacred Configurations" : undefined}
                    className={clsx(
                        `${CinzelFont.className} tracking-wide flex items-center rounded-sm transition-soul group relative`,
                        currentPath === "/sacred-configurations" && "bg-ash-800/80 text-bone-100 font-semibold shadow-ember",
                        currentPath !== "/sacred-configurations" && "hover:bg-ash-800/40 hover:text-bone-100 hover:shadow-fog",
                        "px-3 py-3",
                        isSealed
                            ? "justify-center px-2 py-3"
                            : "gap-3 px-3 py-3"
                    )}
                >
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <RuneOfSettingsIcon className={clsx(
                            "h-5 w-5 transition-soul",
                            currentPath === "/sacred-configurations"
                                ? "text-ember-600 glow-ember"
                                : "text-dust-400 group-hover:text-bone-100 group-hover:glow-bone"
                        )} />
                    </div>

                    <div className={clsx(
                        "whitespace-nowrap transition-soul overflow-hidden",
                        isSealed
                            ? "opacity-0 w-0 transform -translate-x-6" 
                            : "opacity-100 w-auto transform translate-x-0 delay-200"
                    )}>
                        <span className={clsx(
                            "whitespace-nowrap text-sm font-medium transition-soul",
                            currentPath === "/sacred-configurations" && "text-bone-100 glow-bone"
                        )}>
                            Sacred Configurations
                        </span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}
