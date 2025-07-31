"use client";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TerminalSelect } from '../ui/TerminalSelect';
import { TerminalButton } from '../ui/TerminalButton';

const selectSchema = z.object({
    technology: z.string().min(1, "technology selected required"),
    experience: z.string().min(1, "experience level required"),
    country: z.string().min(1, "country selection required")
})

type SelectForm = z.infer<typeof selectSchema>


export function ExampleSelectForm() {
    const { control, handleSubmit, formState: {isSubmitting}} = useForm<SelectForm>({
        resolver: zodResolver(selectSchema),
        defaultValues: {
            technology: '',
            experience: '',
            country: ''
        }
    })

    const onSubmit = async (data: SelectForm) => {
        console.log('Form submitted:', data)
        await new Promise(resolve => setTimeout(resolve, 2000))
    }

    return (
        <div className='bg-current-surface border border-current rounded-editor p-6 max-w-lg mx-auto w-7xl'>
            <h2 className='text-lg font-code-ui font-code-semibold mb-6 text-warm-green text-center'>
                Select Demo
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <TerminalSelect
                    name="technology"
                    control={control}
                    label="Preferred Technology"
                    prompt="tech:~$"
                    searchable
                    options={[
                        { value: 'react', label: 'React' },
                        { value: 'vue', label: 'Vue.js' },
                        { value: 'angular', label: 'Angular' },
                        { value: 'svelte', label: 'Svelte' },
                        { value: 'nextjs', label: 'Next.js' }
                    ]}
                    placeholder="Select technology..."
                />

                <TerminalSelect
                    name="experience"
                    control={control}
                    label="Experience Level"
                    prompt="level:~$"
                    options={[
                        { value: 'beginner', label: 'Beginner (0-1 years)' },
                        { value: 'intermediate', label: 'Intermediate (2-4 years)' },
                        { value: 'advanced', label: 'Advanced (5+ years)' }
                    ]}
                    placeholder="Select experience level..."
                />

                <TerminalSelect
                    name="country"
                    control={control}
                    label="Country"
                    prompt="country:~$"
                    searchable
                    options={[
                        { value: 'us', label: 'United States' },
                        { value: 'ca', label: 'Canada' },
                        { value: 'uk', label: 'United Kingdom' },
                        { value: 'de', label: 'Germany' },
                        { value: 'fr', label: 'France' },
                        { value: 'in', label: 'India' },
                        { value: 'jp', label: 'Japan' }
                    ]}
                    placeholder="Select country..."
                />
                    
                <div className="flex justify-end gap-3">
                    <TerminalButton
                        type="submit"
                        variant="success"
                        command="submit"
                        loading={isSubmitting}
                    >
                        Submit Form
                    </TerminalButton>
                </div>
            </form>
        </div>
    )
}