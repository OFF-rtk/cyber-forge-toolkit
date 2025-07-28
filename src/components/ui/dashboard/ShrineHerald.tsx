import { 
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
 } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon } from "@heroicons/react/24/outline";
import { CinzelFont } from "@/components/ui/fonts";
import { Fragment } from "react";

type ShrineHeraldProps = {
    pathScrolls?: Array<{
        inscription: string;
        passage: string;
    }>
    sacredAction?: {
        inscription: string;
        ritual: () => void;
        rune?: React.ComponentType<any>
    };
    showWhispers?: boolean;
    keeper?: {
        soulName: string;
        visage?: string;
        mark: string;
    };
}

export default function ShrineHerald({
    pathScrolls, 
    sacredAction, 
    showWhispers = true, 
    keeper = { soulName: "Anonymous Keeper", mark: "AK" }
}: ShrineHeraldProps) {
    return (
        <header className={`${CinzelFont.className} border-b-2 border-ember bg-void px-4 md:px-6 py-3 md:py-4 w-full min-h-[64px] md:h-20 shadow-void relative`}>
            {/* Ancient border pattern */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember-600/20 to-transparent" />
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 relative">
                {/* Path Scrolls - The Journey Traveled */}
                <div className="flex items-center order-1 md:order-1">
                    {pathScrolls && pathScrolls.length > 0 && (
                        <Breadcrumb>
                            <BreadcrumbList className="flex-wrap">
                                {pathScrolls.map((scroll, index) => (
                                    <Fragment key={scroll.passage}>
                                        <BreadcrumbItem>
                                            {index === pathScrolls.length - 1 ? (
                                                <BreadcrumbPage className="text-bone glow-bone tracking-wide md:tracking-widest font-medium text-sm md:text-sm relative">
                                                    <span className="truncate max-w-[120px] md:max-w-none">
                                                        {scroll.inscription}
                                                    </span>
                                                    {/* Current location mystical underline */}
                                                    <div className="absolute -bottom-px left-0 right-0 h-px bg-ember-600/60" />
                                                </BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink 
                                                    href={scroll.passage} 
                                                    className="text-dust hover:bg-ash-800/60 hover:text-bone hover:glow-bone p-1.5 sm:p-2 rounded-sm tracking-wide text-sm transition-soul relative group"
                                                >
                                                    <span className="truncate max-w-[120px] md:max-w-none">
                                                        {scroll.inscription}
                                                    </span>
                                                    {/* Hover glow effect */}
                                                    <div className="absolute inset-0 bg-ember-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" />
                                                </BreadcrumbLink>  
                                            )}
                                        </BreadcrumbItem>
                                        {index < pathScrolls.length - 1 && (
                                            <BreadcrumbSeparator 
                                                key={`sep-${index}`} 
                                                className="text-shadow mx-1 md:mx-2"
                                            />
                                        )}
                                    </Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    )}
                </div>

                {/* Sacred Controls - Actions and Whispers */}
                <div className="flex items-center gap-2 sm:gap-4 order-2 md:order-2 justify-end md:justify-start">
                    {/* Whispers Bell - Notifications from the Void */}
                    {showWhispers && (
                        <Button 
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 sm:h-9 sm:w-9 relative hover:bg-ash-800/60 text-dust hover:text-bone hover:glow-bone transition-soul group flex-shrink-0"
                            onClick={() => console.log("Whispers from the void...")}
                            aria-label="Listen to the whispers from the realm"
                        >
                            <BellIcon className="h-4 w-4 sm:h-5 sm:w-5 transition-soul group-hover:scale-110" />
                            {/* Mystical notification indicator */}
                            <span className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 h-2 sm:h-2.5 w-2 sm:w-2.5 bg-blood-700 rounded-full animate-pulse shadow-[0_0_8px_rgba(114,47,55,0.8)]" />
                            {/* Hover glow background */}
                            <div className="absolute inset-0 bg-ember-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" />
                        </Button>
                    )}

                    {/* Sacred Action - Primary Ritual */}
                    {sacredAction && (
                        <Button 
                            onClick={sacredAction.ritual} 
                            className="gap-1.5 sm:gap-2 bg-ember-600/90 text-bone hover:bg-ember-600 hover:glow-bone tracking-wide sm:tracking-wider text-xs sm:text-sm font-medium transition-soul shadow-ember hover:shadow-[0_6px_20px_rgba(139,105,20,0.5)] relative group px-2 sm:px-4 py-1.5 sm:py-2"
                        >
                            {/* Inner mystical glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ember-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />
                            
                            {sacredAction.rune && (
                                <sacredAction.rune className="h-3 sm:h-4 w-3 sm:w-4 relative z-10 flex-shrink-0" />
                            )}
                            <span className="relative z-10 truncate max-w-[80px] sm:max-w-none">
                                {sacredAction.inscription}
                            </span> 
                        </Button>
                    )}

                    {/* Keeper's Seal - User Avatar */}
                    <Button 
                        variant="ghost"
                        className="relative h-auto p-1.5 sm:p-2 hover:bg-ash-800/60 rounded-sm transition-soul group flex-shrink-0"
                        onClick={() => console.log("Keeper's sanctum revealed...")}
                        aria-label={`${keeper.soulName}'s sacred chamber`}
                    >
                        <div className="relative">
                            <Avatar className="h-7 sm:h-8 w-7 sm:w-8 ring-2 ring-ember-600/20 group-hover:ring-ember-600/50 group-hover:ring-ember transition-soul">
                                <AvatarImage src={keeper.visage} alt={keeper.soulName} />
                                <AvatarFallback className="text-xs sm:text-sm font-bold bg-ash text-bone border border-ember-600/30">
                                    {keeper.mark}
                                </AvatarFallback>
                            </Avatar>
                            
                            {/* Mystical glow on hover */}
                            <div className="absolute inset-0 rounded-full bg-ember-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                        </div>
                    </Button>
                </div>
            </div>
            
            {/* Weathering effect at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ash-700/40 to-transparent" />
        </header>
    )
}
