"use client"

import { forwardRef } from "react"
import { CinzelFont, CrimsonPro } from "@/components/ui/fonts"
import clsx from "clsx"

interface SacredTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
    helperText?: string
    showRequired?: boolean
}

export const SacredTextarea = forwardRef<HTMLTextAreaElement, SacredTextAreaProps>(
    ({
        label,
        error,
        helperText,
        className,
        showRequired = false,
        ...props
    }, ref) => {
        return(
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
                    <textarea
                        ref={ref}
                        className={clsx(
                            'w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 resize-none',
                            'bg-void-950/60 border-2 text-bone placeholder-dust-400/60',
                            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ash-800',
                            `${CrimsonPro.className}`,
                            //States
                            error
                                ? 'border-blood-700/50 focus:border-blood focus:ring-blood-700/30'
                                : 'border-ash-800/40 focus:border-ember focus:ring-ember-600/30 hover:border-ash-800/60',

                                className
                        )}
                        rows={4}
                        {...props}
                    />

                    <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-ember-600/20 rounded-tl" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-ember-600/20 rounded-tr" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-ember-600/20 rounded-bl" />
                    <div className="absolute bottom-3 right-2 w-2 h-2 border-r border-b border-ember-600/20 rounded-br" />

                    <div className="absolute inset-0 rounded-lg opacity-0 focus-within:opacity-100 transiton-opacity duration-200 pointer-events-none">
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

SacredTextarea.displayName = 'SacredTextarea'