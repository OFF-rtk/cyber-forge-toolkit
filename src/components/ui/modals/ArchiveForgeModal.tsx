"use client";

import { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form" // ✅ Added FormProvider
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { SoulslikeModal } from "@/components/ui/Ambiance/SoulslikeModal";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { MysticalInput, SacredTextarea, RunicSelect, AllyInviter } from "@/components/ui/form/index";
import { useToasts, useNotifications } from "@/stores/useNotificationStore";

const archiveSchema = z.object({
    name: z.string().min(1, "Archive name is required").max(50, "Name must be 50 characters or less"), // ✅ Fixed typo
    description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be 500 characters or less'),
    template: z.string().min(1, 'Please select a template'),
    allies: z.array(z.object({
        id: z.string(),
        email: z.email('Please enter a valid email address'),
        role: z.enum(['scribe', 'guardian', 'oracle'])
    }))
})

type ArchiveFormData = z.infer<typeof archiveSchema>

interface ArchiveForgeModalProps {
    isOpen: boolean
    onClose: () => void
}

const templateOptions = [
    { value: 'blank', label: 'Blank Scroll - Start from nothing' },
    { value: 'kanban', label: 'Arcane Kanban Board - Task management' },
    { value: 'documentation', label: 'Sacred Documentation - Knowledge repository' },
    { value: 'dashboard', label: 'Mystical Dashboard - Data visualization' },
    { value: 'ecommerce', label: 'Digital Marketplace - Commerce platform' },
    { value: 'portfolio', label: 'Creative Showcase - Portfolio site' }
];

export function ArchiveForgeModal({
    isOpen,
    onClose
}: ArchiveForgeModalProps) {

    const { showToast, dismissToast } = useToasts()
    const { addNotification } = useNotifications()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<ArchiveFormData>({
        resolver: zodResolver(archiveSchema),
        defaultValues: {
            name: '',
            description: '',
            template: '',
            allies: []
        }
    })

    const handleSubmit = async (data: ArchiveFormData) => {
        setIsSubmitting(true)

        const loadingToastId = showToast({
            type: 'loading',
            title: 'Forging Archive...',
            description: 'The ancient servers craft your sacred project.',
            dismissible: false
        })

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            console.log('Archive forged:', data)

            dismissToast(loadingToastId)
            showToast({
                type: 'success',
                title: 'Archive Forged Successfully!',
                description: `"${data.name}" has been created with ${data.allies.length} allies summoned.`
            })

            addNotification({
                type: 'archive',
                title: 'Sacred Archive Created',
                description: `Your archive "${data.name}" has been successfully forged and is ready for development.`,
                priority: 'medium',
                actionUrl: `/projects/${generateProjectId(data.name)}`
            })

            if(data.allies.length > 0) {
                addNotification({
                    type: 'scribe',
                    title: `${data.allies.length} Allies Summoned`,
                    description: `${data.allies.length} collaborator${data.allies.length > 1 ? 's have' : 'has'} been invited to join "${data.name}"`,
                    priority: 'low',
                    actionUrl: `/projects/${generateProjectId(data.name)}/team`
                })
            }

            onClose()
            form.reset()
        } catch(error) {
            console.error('Failed to forge archive:', error)

            dismissToast(loadingToastId)
            showToast({
                type: 'error',
                title: 'The Digital Void Rejected This Offering...',
                description: 'Please check your inscription and try the ritual again.'
            })

            addNotification({
                type: 'system',
                title: 'Archive Creation Failed',
                description: `Failed to create "${data.name}". The mystical servers encountered an error during the forging process.`,
                priority: 'high'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SoulslikeModal
            isOpen={isOpen}
            onClose={onClose}
            title="Forge Sacred Archive"
            size="lg"
        >
            <div className="space-y-6">
                {/* ✅ CRITICAL FIX: Wrap form with FormProvider */}
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <Controller 
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <MysticalInput
                                    label="Archive Name"
                                    placeholder="Enter your sacred project name..."
                                    error={form.formState.errors.name?.message}
                                    showRequired
                                    {...field}
                                />  
                            )}
                        />

                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <SacredTextarea
                                    label="Sacred Description"
                                    placeholder="Describe the mystical purpose and divine mission of your archive..."
                                    error={form.formState.errors.description?.message}
                                    showRequired
                                    {...field}
                                />
                            )}
                        />

                        <Controller 
                            name="template"
                            control={form.control}
                            render={({ field }) => (
                                <RunicSelect
                                    label="Sacred Template"
                                    options={templateOptions}
                                    placeholder="Choose your foundation..."
                                    error={form.formState.errors.template?.message}
                                    showRequired
                                    {...field}  
                                />
                            )}
                        />

                        <Controller
                            name="allies"
                            control={form.control}
                            render={({ field }) => (
                                <AllyInviter 
                                    allies={field.value}
                                    onChange={field.onChange}
                                    error={form.formState.errors.allies?.message}  
                                />
                            )}
                        />

                        <div className="flex gap-4 pt-6 border-t border-ember-600/20">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="flex-1 border-ember-600/30 text-dust hover:text-bone hover:bg-ash-800/50"
                            >
                                Abandon Ritual
                            </Button>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-ember-600 hover:bg-ember-bright text-bone"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Forging Archive...
                                    </>
                                ) : (
                                    'Forge Archive'
                                )}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </SoulslikeModal>
    )
}

function generateProjectId(name: string): string {
    return name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + 
        '-' + Math.random().toString(36).slice(2, 8)
}