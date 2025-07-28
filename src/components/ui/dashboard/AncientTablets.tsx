"use client";

import { ArrowUpIcon, ArrowDownIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { CinzelFont,CrimsonPro } from "../fonts";

type AncientTabletProps = {
    inscription: string;
    essence: string | number;
    omen: number;
    prophecy: string;
    echoes?: Array<number>;
    size?: 'default' | 'compact' | 'expanded';
    showSparkline?: boolean
    className?: string
}

export function AncientTablet({inscription, essence, omen, prophecy, echoes, size='default', showSparkline=true, className=""}: AncientTabletProps) {
    const isBlessed = omen >= 0;
    const spiritTrial = echoes?.map((v, i) => ({
        moment: i, power: v
    })) ?? []

    const sizeConfig = {
        default: {
            container: "p-5",
            title: "text-sm",
            essence: "text-3xl",
            sparkline: "h-8"
        },
        compact: {
            container: "p-4",
            title: "text-xs",
            essence: "text-2xl",
            sparkline: "h-6"
        },
        expanded: {
            container: "p-6",
            title: "text-base",
            essence: "text-4xl",
            sparkline: "h-10"
        }
    }

    const config = sizeConfig[size]
    
    return(
        <div className={clsx(`${CinzelFont.className} tracking-wide bg-ash hover:bg-ash-light transition-colors duration-200 relative group border border-ember-600/20 rounded-xl shadow-lg hover:shadow:xl`, config.container, className)}>
            {/* Ancient stone texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-ember-600/5 via-transparent to-ash-800/20 pointer-events-none rounded-xl" />
            
            {/* Mystical border glow on hover */}
            <div className="absolute inset-0 border border-ember-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
            
            <div className="flex items-center justify-between relative z-10 mb-3">
                {/* Sacred Inscription */}
                <h3 className={clsx(
                    "text-sm text-dust font-medium tracking-widest uppercase",
                    config.title
                    )}>
                    {inscription}
                </h3>
                
                {/* Omen Indicator */}
                <div className="flex items-center gap-1.5 relative">
                    {isBlessed ? (
                        <div className="flex items-center gap-1 text-tarnished">
                            <ArrowTrendingUpIcon className="h-4 w-4" />
                            <span className={clsx(
                                "text-sm font-semibold tracking-wide",
                                "text-tarnished"
                            )} 
                            aria-label={prophecy}>
                                {prophecy}
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 text-blood">
                            <ArrowTrendingDownIcon className="h-4 w-4" />
                            <span className={clsx(
                                "text-sm font-semibold tracking-wide",
                                "text-blood"
                            )} 
                            aria-label={prophecy}>
                                {prophecy}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Sacred Essence - Main Value */}
           <div className="relative z-10 mb-4">
                <p className={clsx(
                    "font-bold text-bone tracking-wider relative",
                    config.essence
                )}>
                    <span className="relative z-10">{essence}</span>
                    {/* More subtle glow effect */}
                    <span className="absolute inset-0 text-bone-100/50 blur-sm">{essence}</span>
                </p>
            </div>
            
            {/* Spirit Trail - Mystical Sparkline */}
            {showSparkline && echoes && echoes.length > 0 && (
                <div className={clsx(
                    "w-full mt-auto relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300",
                    config.sparkline
                )}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={spiritTrial} margin={{ top: 2, right: 0, left: 0, bottom: 2}}>
                            <Line
                                type="monotone"
                                dataKey="power"
                                stroke={isBlessed ? '#d4af37' : "#8b3a47"} // Updated blood color
                                strokeWidth={2.5}
                                dot={false}
                                isAnimationActive={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    
                    {/* Enhanced mystical underline */}
                    <div className={clsx(
                        "absolute -bottom-1 left-0 right-0 h-px opacity-50",
                        isBlessed
                            ? "bg-gradient-to-r from-transparent via-tarnished/40 to-transparent"
                            : "bg-gradient-to-r from-transparent via-blood/40 to-transparent"
                    )} />
                </div>
            )}

            {/* Weathering effect at corners */}
            <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-ember/20 rounded-tl-lg" />
            <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-ember/20 rounded-tr-lg" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-ember/20 rounded-bl-lg" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-ember/20 rounded-br-lg" />
        </div>
    )
}
