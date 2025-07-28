"use client";

import { PricingCard } from "@/components/ui/Pricing/PricingCard";
import { SacredSectionTitle } from "@/components/ui/dashboard/SacredSectionTitle";

const pricingTiers = [
    {
        tierName: "Scribe",
        description: "For the lone artisan, forging their first creations in the digital realm.",
        price: "$19",
        pricePeriod: "/ month",
        features: [
            "Access to all core tools",
            "Up to 3 active projects",
            "Community support",
            "Basic analytics",
        ],
        isFeatured: false,
    },
    {
        tierName: "Guardian",
        description: "For the growing guild, protecting and scaling their digital fortress.",
        price: "$49",
        pricePeriod: "/ month",
        features: [
            "All features in Scribe",
            "Up to 10 active projects",
            "Invite up to 5 team members",
            "Priority email support",
            "Advanced analytics & reporting",
        ],
        isFeatured: true,
    },
    {
        tierName: "Oracle",
        description: "For the grand masters, overseeing a vast empire of digital assets.",
        price: "Contact Us",
        pricePeriod: "",
        features: [
            "All features in Guardian",
            "Unlimited projects & users",
            "Dedicated support channel",
            "Custom integrations (API)",
            "Onboarding & training",
        ],
        isFeatured: false,
        ctaText: "Book a Demo." 
    }
]

export default function PricingPage() {
    return(
        <div className="min-h-screen bg-void px-6 py-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-ember-600/3 via-transparent to-phantom-800/2 pointer-events-none" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-ember-600/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-ember-600/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <SacredSectionTitle
                    title="The Treasury"
                    subtitle="Choose the sacred pact that aligns with your realm's destiny. Simple, transparent pricing for all keepers."
                />

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
                    {pricingTiers.map((tier)=>(
                        <PricingCard
                            key={tier.tierName}
                            tierName={tier.tierName}
                            description={tier.description}
                            price={tier.price}
                            pricePeriod={tier.pricePeriod}
                            features={tier.features}
                            isFeatured = {tier.isFeatured}
                            ctaText={tier.ctaText}
                        />
                    ))}
                </div>


            </div>
        </div>
    )
}