import { CheckIcon } from "@heroicons/react/24/outline";
import { CinzelFont, CrimsonPro } from "@/components/ui/fonts";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

type PricingCardProps = {
    tierName: string;
    description: string;
    price: string;
    pricePeriod: string;
    features: string[];
    isFeatured?: boolean;
    ctaText?: string;
}

export function PricingCard({
    tierName,
    description,
    price,
    pricePeriod,
    features,
    isFeatured = false,
    ctaText = "Choose Plan",
}: PricingCardProps) {
    return (
        <div className={clsx(
            "relative rounded-2xl p-8 border transition-shadow duration-300 h-full flex flex-col",
            isFeatured
                ? "bg-ash-800/40 border-ember-600 shadow-ember"
                : "bg-ash-800/20 border-ash-700/20 hover:shadow-2xl"
        )}>
            {isFeatured && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <div className={`${CinzelFont.className} text-xs uppercase tracking-widest bg-ember-600 text-bone px-3 py-1 rounded-full`}>
                        Most Popular
                    </div>
                </div>
            )}

            <div className="flex-grow">
                <h3 className={`${CinzelFont.className} text-2xl font-bold text-bone tracking-wider`}>
                    {tierName}
                </h3>
                <p className={`${CinzelFont.className} text-dust mt-2 mb-6`}>
                    {description}
                </p>

                <div className="my-4">
                    <span className={`${CinzelFont.className} text-5xl font-bold text-bone`}>
                        {price}
                    </span>
                    <span className={`${CinzelFont.className} text-dust ml-2`}>
                        {pricePeriod}
                    </span>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-ember-600/20 to-transparent my-8" />

                <ul className="space-y-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-ember-bright flex-shrink-0 mr-3 mt-1" />
                            <span className={`${CrimsonPro.className} text-dust`}>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-10">
                <Button 
                    className={clsx(
                        "w-full text-lg py-6",
                        isFeatured
                            ? "bg-ember-600 hover:bg-ember-bright text-bone"
                            : "bg-ash-700/30 text-dust hover:bg-ash-700/50 hover:text-bone"
                    )}
                >
                    {ctaText}
                </Button>
            </div>
        </div>
    );
}