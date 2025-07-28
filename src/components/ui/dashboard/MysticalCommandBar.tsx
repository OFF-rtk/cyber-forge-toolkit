"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CinzelFont } from "@/components/ui/fonts";
import clsx from "clsx";
import { 
    HomeIcon,
    FolderOpenIcon,
    UsersIcon,
    CurrencyDollarIcon,
    BellIcon,
    PlusIcon,
    Bars3Icon,
    XMarkIcon 
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArchiveForgeModal } from "../modals/ArchiveForgeModal";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { NotificationModal } from "@/components/ui/modals/NotificationModal";
import { motion } from "framer-motion";

type MysticalCommandBarProps = {
    onSacredAction?: () => void
    keeper?: {
        soulName: string
        visage?: string
        mark: string
    }
}

const sacredChapters = [{ inscription: 'The Observatory', sigil: 'observatory', rune: HomeIcon, path: '/dashboard' },
    { inscription: 'The Archives', sigil: 'archives', rune: FolderOpenIcon, path: '/projects' },
    { inscription: 'The Scribes', sigil: 'scribes', rune: UsersIcon, path: '/users' },
    { inscription: 'The Treasury', sigil: 'treasury', rune: CurrencyDollarIcon, path: '/billing' }]

export default function MysticalCommandBar({onSacredAction, keeper = { soulName: "Anonymous Keeper", mark: "AK"}}: MysticalCommandBarProps) {
    const [isMobileMenuOpen , setIsMobileMenuOpen] = useState(false)
    const currentPath = usePathname()
    const [isArchiveForgeOpen, setIsArchiveForgeOpen] = useState(false)
    const unread = useNotificationStore(s => s.unreadCount)
    const toggle = useNotificationStore(s => s.toggleModal)

    const handleSacredAction = () => {
        onSacredAction?.()
    }

    return (
        <>
            <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-5x1 z-50">

                <div className="relative">
                    <div className="absolute inset-0 bg-void-950/20 blur-xl rounded-2xl transform translate-y-1" />

                    <div className="relative bg-void-950/85 backdrop-blur-xl border-2 border-ember-600/25 rounded-2xl shadow-2xl shadow-ash-950/60">
                        <div className="absolute inset-0 bg-gradient-to-r from-ember-600/5 via-transparent to-ember-600/5 rounded-2xl pointer-events-none" />

                        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-ember-600/40 to-transparent" />
                        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-ash-800/40 to-transparent" />

                        <div className="flex items-center justify-between px-6 py-4 relative z-10">

                            {/* Brand */}
                            <div className="flex items-center">
                                <Link href="/dashboard" className="flex items-center group">
                                    <div className={`${CinzelFont.className} text-xl font-bold text-bone tracking-widest group-hover:text-ember transition-colors duration-200 drop-shadow-sm`}>
                                        The Shrine
                                    </div>
                                </Link>
                            </div>

                            {/* Desktop Nav - Sacred Chapters */}
                            <nav className="hidden md:flex items-center space-x-2">
                                {sacredChapters.map((chapter)=>{
                                    const RuneIcon = chapter.rune
                                    const isActive = currentPath === chapter.path
                                    
                                    return(
                                        <Link 
                                            key={chapter.sigil} 
                                            href={chapter.path}
                                            className={clsx(
                                                "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors duration-200 text-sm font-medium group relative",
                                                isActive
                                                    ? "bg-ember-600/20 text-ember border border-ember-600/30 shadow-inner"
                                                    : "text-dust hover:text-bone hover:bg-ash-800/50 hover:border-ash-800/30 border border-transparent"
                                            )}
                                        >
                                            <RuneIcon className={clsx(
                                                "h-4 w-4 transiton-colors duration-200",
                                                isActive ? "text-ember" : "group-hover:text-bone"
                                            )} />
                                            <span className="hidden lg:block">{chapter.inscription}</span>
                                            {isActive && (
                                                <div className="absolute inset-0 bg-ember-600/10 rounded-xl blur-sm -z-10" />
                                            )}
                                        </Link>
                                    )
                                })}
                            </nav>

                            {/* Actions & Controls Section */}
                            <div className="flex items-center gap-3">
                                {/* Whispers Bell */}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 text-dust hover:text-bone hover:bg-ash-800/30 transition-colors duration-200 relative rounded-lg"
                                    onClick={toggle}
                                    aria-label="Listen to whispers from the realm"
                                >
                                    <BellIcon className="h-5 w-5 mx-auto" />
                                    
                                    {unread > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 h-5 w-5 bg-blood-700 text-bone text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
                                        >
                                            {unread > 9 ? '9+' : unread}
                                        </motion.span>
                                    )}
                                </Button>

                                <NotificationModal />

                                {/* Sacred Actions */}
                                <Button
                                    onClick={()=>setIsArchiveForgeOpen(true)}
                                    className="bg-ember-600/90 hover:bg-ember text-bone gap-2 transition-colors durationn-200 hidden sm:flex px-4 py-2 text-sm font-medium rounded-lg shadow-lg shadow-ember/20"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    <span className="hidden md:block">Forge Archive</span>
                                    <span className="block md:hidden">New</span>
                                </Button>

                                {/* Keeper's Avatar */}
                                <Button
                                    variant="ghost"
                                    className="h-auto p-2 hover:bg-ash-800/20 transition-colors duration-200 rounded-lg"
                                    onClick={() => console.log("Keeper's sanctum revealed...")}
                                    aria-label = {`${keeper.soulName}'s sacred chamber`}
                                >
                                    <Avatar className="h-8 w-8 ring-1 ring-ember-600/20 hover:ring-ember-600/40 transition-colors duration-200">
                                        <AvatarImage src={keeper.visage} alt={keeper.soulName} />
                                        <AvatarFallback className="bg-ash text-bone text-sm font-medium">
                                            {keeper.mark}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>

                                {/* Mobile Menu Toggle */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden h-10 w-10 text-dust hover:text-bone hover:bg-ash-800/20 transition-colors duration-200 rounded-lg"
                                    onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    aria-label="Toggle navigation menu"
                                >
                                    {isMobileMenuOpen 
                                        ? <XMarkIcon className="h-5 w-5" />
                                        : <Bars3Icon className="h-5 w-5" />
                                    }
                                </Button>
                            </div>
                        </div>

                        <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-ember-600/30 rounded-tl-lg" />
                        <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-ember-600/30 rounded-tr-lg" />
                        <div className="absolute bottom-1 left-1 w-4 h-4 border-r-2 border-t-2 border-ember-600/30 rounded-bl-lg" />
                        <div className="absolute bottom-1 right-1 w-4 h-4 border-l-2 border-b-2 border-ember-600/30 rounded-br-lg" />
                    </div>
                </div>
            </header>

            <ArchiveForgeModal 
                isOpen={isArchiveForgeOpen}
                onClose={()=>setIsArchiveForgeOpen(false)}
            />

            {/* Mobile Navigation Floating Scroll */}
            {isMobileMenuOpen && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-5xl z-40 md:hidden">
                <div className="relative">
                    {/* Mobile scroll shadow */}
                    <div className="absolute inset-0 bg-void/20 blur-xl rounded-xl transform translate-y-1" />
                    
                    {/* Mobile scroll surface */}
                    <div className="relative bg-void/90 backdrop-blur-xl border-2 border-ember/25 rounded-xl shadow-2xl shadow-black/60 p-5">
                    {/* Mystical glow lines */}
                    <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />
                    
                    <nav className="space-y-2">
                        {sacredChapters.map((chapter) => {
                        const RuneIcon = chapter.rune
                        const isActive = currentPath === chapter.path
                        
                        return (
                            <Link
                            key={chapter.sigil}
                            href={chapter.path}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium",
                                isActive 
                                ? "bg-ember/20 text-ember border border-ember/30" 
                                : "text-dust hover:text-bone hover:bg-ash/20"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                            >
                            <RuneIcon className={clsx(
                                "h-5 w-5",
                                isActive ? "text-ember" : ""
                            )} />
                            <span>{chapter.inscription}</span>
                            </Link>
                        )
                        })}
                        
                        {/* Mobile Sacred Action */}
                        <div className="pt-3 mt-3 border-t border-ash/20">
                        <Button 
                            onClick={() => {
                            onSacredAction?.()
                            setIsMobileMenuOpen(false)
                            }}
                            className="w-full bg-ember/90 hover:bg-ember text-bone gap-2 transition-colors duration-200 rounded-lg"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Forge Archive
                        </Button>
                        </div>
                    </nav>
                    </div>
                </div>
                </div>
            )}
        </>
    )
    
}