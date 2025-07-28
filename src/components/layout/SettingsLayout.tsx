"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    UserCircleIcon,
    CreditCardIcon,
    KeyIcon,
    PaintBrushIcon,
    ArrowLeftIcon 
} from "@heroicons/react/24/outline";
import { CinzelFont, CrimsonPro } from "@/components/ui/fonts";
import clsx from "clsx"
import { useRouter } from "next/navigation";

const settingNavLinks = [
    {name: 'Profile', href: '/settings/profile', icon: UserCircleIcon},
    {name: 'Billing', href: '/settings/billing', icon: CreditCardIcon},
    {name: 'API Keys', href: '/settings/api-keys', icon: KeyIcon},
    {name: 'Appearance', href: '/settings/appearance', icon: PaintBrushIcon}
];

type SettingsLayoutProps = {
    children: React.ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
    const pathname = usePathname()

    return (
        <div className="bg-void min-h-screen text-bone p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link href="/dashboard" className="flex items-center text-dust hover:text-bone transition-colors mb-4 group">
                        <ArrowLeftIcon className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        <span className={`${CrimsonPro.className} text-sm`}>Back to Dashboard</span>
                    </Link>
                    <h1 className={`${CinzelFont.className} text-4xl font-bold text-bone tracking-wider`}>
                        Sacred Configurations
                    </h1>
                    <p className={`${CinzelFont.className} text-dust mt-2`}>
                        Manage your realm's settings and preferences.
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <aside className="lg:col-span-3 xl:col-span-2 mb-6 lg:mb-0">
                        <nav className="space-y-2">
                            {settingNavLinks.map(link => {
                                const isActive = pathname === link.href;
                                
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={clsx(
                                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium tracking-wide transition-colors group",
                                            `${CrimsonPro.className}`,
                                            isActive
                                                ? "bg-ember-600/10 text-ember-bright border border-ember-600/20"
                                                : "text-dust hover:bg-ash-light hover:text-bone border border-transparent"
                                        )}
                                    >
                                        <link.icon className={clsx("h-5 w-5 flex-shrink-0", isActive ? 'text-ember-bright' : 'text-dust group-hover:text-bone')} />
                                        <span className="truncate">{link.name}</span>
                                    </Link>
                                )
                            })}
                        </nav>
                    </aside>

                    <main className="lg:col-span-9 xl:col-span-10">
                        <div className="bg-ash-800/30 border border-ash-700/20 rounded-xl shadow-lg p-6 sm:p-8">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}