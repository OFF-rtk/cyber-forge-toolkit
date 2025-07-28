"use client";

import { forwardRef, useState, useEffect, useRef } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { CinzelFont, CrimsonPro } from "@/components/ui/fonts";
import clsx from "clsx";

interface SelectOption {
    value: string
    label: string
    disabled?: boolean
}

interface RunicSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    helperText?: string
    options: SelectOption[]
    placeholder?: string
    showRequired?: boolean
}

export const RunicSelect = forwardRef<HTMLSelectElement, RunicSelectProps>(
    ({
        label,
        error,
        helperText,
        options,
        placeholder = "Choose an Option...",
        className,
        showRequired = false,
        value,
        onChange,
        ...props
    }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState(value || '');
        const dropdownRef = useRef<HTMLDivElement>(null);

        // Find selected option label
        const selectedOption = options.find(option => option.value === selectedValue);
        const displayText = selectedOption ? selectedOption.label : placeholder;

        // Close dropdown when clicking outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        // Handle option selection
        const handleOptionSelect = (optionValue: string) => {
            setSelectedValue(optionValue);
            setIsOpen(false);
            
            // Create synthetic event for compatibility
            if (onChange) {
                const syntheticEvent = {
                    target: { value: optionValue },
                    currentTarget: { value: optionValue }
                } as React.ChangeEvent<HTMLSelectElement>;
                onChange(syntheticEvent);
            }
        };

        return (
            <div className="space-y-2">
                {/* Hidden select for form compatibility */}
                <select
                    ref={ref}
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    className="sr-only"
                    tabIndex={-1}
                    {...props}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Label */}
                {label && (
                    <label className={clsx(
                        `${CinzelFont.className} text-xl font-medium tracking-wide`,
                        error ? 'text-blood' : 'text-dust'
                    )}>
                        {label}
                        {showRequired && <span className="text-blood ml-1">*</span>}
                    </label>
                )}

                {/* Custom Dropdown */}
                <div className="relative mt-2" ref={dropdownRef}>
                    {/* Trigger Button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={clsx(
                            'w-full px-4 py-3 pr-10 rounded-lg font-medium transition-all duration-200 text-left',
                            'bg-void-950/60 border-2 backdrop-blur-sm',
                            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ash-800',
                            `${CrimsonPro.className}`,
                            
                            // Text color based on selection
                            selectedValue ? 'text-bone' : 'text-dust/60',
                            
                            // Border states
                            error
                                ? 'border-blood-700/50 focus:border-blood-700 focus:ring-blood-700/30'
                                : 'border-ash-800/40 focus:border-ember-600 focus:ring-ember-600/30 hover:border-ash-800/60',
                            
                            className
                        )}
                    >
                        <span className="block truncate">{displayText}</span>
                    </button>

                    {/* Dropdown Arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon 
                            className={clsx(
                                'h-5 w-5 transition-all duration-200',
                                isOpen && 'rotate-180',
                                error ? 'text-blood' : 'text-dust'
                            )} 
                        />
                    </div>

                    {/* Mystical glow effect */}
                    <div className="absolute inset-0 rounded-lg opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className={clsx(
                            'absolute inset-0 rounded-lg blur-sm',
                            error ? 'bg-blood-700/5' : 'bg-ember-600/5'
                        )} />
                    </div>

                    {/* Custom Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute z-50 w-full mt-2 bg-ash-800/95 backdrop-blur-xl border-2 border-ember-600/25 rounded-xl shadow-2xl shadow-void-950/60 max-h-60 overflow-y-auto">
                            {/* Ancient corner decorations on dropdown */}
                            <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-ember-600/30 rounded-tl" />
                            <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-ember-600/30 rounded-tr" />
                            
                            {/* Mystical glow line at top of dropdown */}
                            <div className="h-px bg-gradient-to-r from-transparent via-ember-600/40 to-transparent mx-4 mt-2" />
                            
                            <div className="py-2">
                                {options.map((option, index) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => !option.disabled && handleOptionSelect(option.value)}
                                        disabled={option.disabled}
                                        className={clsx(
                                            'w-full text-left px-4 py-3 text-lg transition-all duration-150',
                                            `${CrimsonPro.className} font-medium tracking-wide`,
                                            
                                            // Selection states
                                            selectedValue === option.value
                                                ? 'bg-ember-600/20 text-ember-600 border-l-2 border-ember-600'
                                                : 'text-bone hover:bg-ash-700/40 hover:text-bone border-l-2 border-transparent',
                                            
                                            // Disabled state
                                            option.disabled
                                                ? 'opacity-40 cursor-not-allowed'
                                                : 'cursor-pointer hover:border-l-ember-600/50',
                                            
                                            // First and last item spacing
                                            index === 0 && 'mt-1',
                                            index === options.length - 1 && 'mb-1'
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="truncate">{option.label}</span>
                                            {selectedValue === option.value && (
                                                <CheckIcon className="h-4 w-4 text-ember-600 ml-2 flex-shrink-0" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            
                            {/* Mystical glow line at bottom */}
                            <div className="h-px bg-gradient-to-r from-transparent via-ash-800/40 to-transparent mx-4 mb-2" />
                        </div>
                    )}
                </div>

                {/* Helper Text / Error Message */}
                {(error || helperText) && (
                    <p className={clsx(
                        'text-xs font-medium tracking-wide',
                        error ? 'text-blood' : 'text-dust/80'
                    )}>
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

RunicSelect.displayName = 'RunicSelect';
