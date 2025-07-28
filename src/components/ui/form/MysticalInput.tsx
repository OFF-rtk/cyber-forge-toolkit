"use client"

import { forwardRef } from "react"
import { CinzelFont, CrimsonPro } from "@/components/ui/fonts"
import clsx from "clsx"

interface MysticalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    helperText?: string
    variant?: 'default' | 'compact'
    showRequired?: boolean
}

export const MysticalInput = forwardRef<HTMLInputElement, MysticalInputProps>(
    ({
        label,
        error,
        helperText,
        className,
        variant='default',
        showRequired = false,
        ...props
    }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label className={clsx(
                        `${CinzelFont.className} text-xl font-medium tracking-wide`,
                        error ? 'text-blood' : 'text-dust'
                    )}>
                        {label}
                        {showRequired && <span className="text-blood ml-1">*</span>}
                    </label>
                )}

                <div className="relative mt-2">
                    <input
                        ref={ref}
                        className={clsx(
                            "w-full px-4 py-3 rounded-lg font-medium transition-all duration-200",
                            "bg-void-950/60 border-2 text-bone placeholder-dust-400/60",
                            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ash-800",
                            `${CrimsonPro.className}`,
                            //States
                            error
                                ? 'border-blood-700/50 focus:border-blood-700 focus:ring-blood-700/30'
                                : 'border-ash-800/40 focus:border-ember focus:ring-ember/30 hover:border-ash-800/60',
                            
                            //Variant Sizing

                            variant === 'compact' ? 'py-2 text-sm' : 'py-3',

                            className
                        )}
                        {...props}
                    />

                    <div className="absolute inset-0 rounded-lg opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className={clsx(
                            'absolute inset-0 rounded-lg blur-sm',
                            error ? 'bg-blood-700/5' : 'bg-ember-600/5'
                        )} />
                    </div>
                </div>

                {(error || helperText) && (
                    <p className={clsx(
                        'text-xs font-medium tracking-wide',
                        error ? 'text-blood' : 'text-dust-400/80'
                    )}>
                        {error || helperText}
                    </p>
                )}
            </div>
        )
    }
)

MysticalInput.displayName = "MysticalInput"