"use client"

import { useState } from "react"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import { CinzelFont, CrimsonPro } from "../fonts"
import { Button } from "../button"
import { MysticalInput } from "./MysticalInput"
import { RunicSelect } from "./RunicSelect"
import { useFormContext, Controller } from "react-hook-form"
import clsx from 'clsx'

interface Ally {
    id: string
    email: string
    role: 'scribe' | 'guardian' | 'oracle'
}

interface AllyInviterProps {
    allies: Ally[]
    onChange: (allies: Ally[]) => void
    error?: string
}

const roleOptions = [
    { value: 'scribe', label: 'Scribe - Read & Write' },
    { value: 'guardian', label: 'Guardian - Admin Access' },
    { value: 'oracle', label: 'Oracle - View Only' }
]

export function AllyInviter({
    allies,
    onChange,
    error
}: AllyInviterProps) {
    const { control } = useFormContext()

    const addAlly = () => {
        const newAlly: Ally = {
            id: Math.random().toString(36).slice(2),
            email: '',
            role: 'scribe'
        }
        onChange([...allies, newAlly])
    }

    const removeAlly = (id: string) => {
        onChange(allies.filter(ally => ally.id !== id))
    }

    const updateAlly = (id: string, updates: Partial<Ally>) => {
        onChange(allies.map(ally => ally.id === id ? { ...ally, ...updates } : ally))
    }

    return (
        <div className="space-y-4">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <label className={`${CinzelFont.className} text-xl font-medium tracking-wide text-dust`}>
                        Allies to the Archive
                    </label>
                    <p className={`${CrimsonPro.className} text-md text-dust/60 mt-1`}>
                        Invite collaborators to join your sacred project
                    </p>
                </div>
                <Button
                    type="button"
                    onClick={addAlly}
                    variant="outline"
                    size="sm"
                    className="border-ember-600/30 text-ember hover:bg-ember-600/10 hover:border-ember-600"
                >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Ally
                </Button>
            </div>

            {/* Ally Cards */}
            {allies.length > 0 && (
                <div className="space-y-3">
                    {allies.map((ally, index) => (
                        <div
                            key={ally.id}
                            className="bg-ash-800/20 border border-ash-800/40 rounded-lg p-4 relative"
                        >
                            {/* Corner decorations */}
                            <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-ember-600/20 rounded-tl" />
                            <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-ember-600/20 rounded-tr" />

                            {/* Content layout */}
                            <div className="grid grid-cols-1 gap-4">
                                {/* ✅ FIXED: Email input with proper Controller */}
                                <Controller
                                    name={`allies.${index}.email`}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <MysticalInput
                                            variant="compact"
                                            placeholder="ally@sacred-realm.com"
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.value)
                                                updateAlly(ally.id, { email: e.target.value })
                                            }}
                                            error={fieldState.error?.message}
                                        />
                                    )}
                                />

                                {/* Role select and delete button */}
                                <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                        {/* ✅ FIXED: Role select with proper Controller */}
                                        <Controller
                                            name={`allies.${index}.role`}
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <RunicSelect
                                                    options={roleOptions}
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value)
                                                        updateAlly(ally.id, { role: e.target.value as Ally['role'] })
                                                    }}
                                                    error={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    </div>

                                    {/* Delete button */}
                                    <Button
                                        type="button"
                                        onClick={() => removeAlly(ally.id)}
                                        variant="ghost"
                                        size="icon"
                                        className="my-auto text-blood hover:text-blood hover:bg-blood-700/10 flex-shrink-0 h-[42px] w-[42px]"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Ally number indicator */}
                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-ember-600 rounded-full flex items-center justify-center text-bone text-xs font-bold shadow-lg">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {allies.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-ash-800/40 rounded-lg">
                    <p className="text-dust/60 text-sm">
                        No allies summoned yet. Click "Add Ally" to invite collaborators.
                    </p>
                </div>
            )}

            {/* General Error Message */}
            {error && (
                <p className="text-xs font-medium tracking-wide text-blood">
                    {error}
                </p>
            )}
        </div>
    )
}
