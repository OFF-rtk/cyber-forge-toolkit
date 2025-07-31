'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TerminalFormInput } from '@/components/ui/TerminalFormInput'
import { TerminalButton } from '../ui/TerminalButton'
import { terminalSchemas } from '@/lib/validation/terminalSchemas'


const deploymentSchema = z.object({
    repository: terminalSchemas.repository,
    branch: terminalSchemas.branch,
    buildCommand: terminalSchemas.command.optional(),
    environment: terminalSchemas.environment,
})

type DeploymentForm = z.infer<typeof deploymentSchema>

export function DeploymentForm() {
    const { control, handleSubmit, watch, formState: { errors, isSubmitting }} = useForm<DeploymentForm>({
        resolver: zodResolver(deploymentSchema),
        defaultValues: {
            repository: '',
            branch: 'main',
            buildCommand: 'npm run build',
            environment: 'development' as const
        }
    })


    const onSubmit = async (data: DeploymentForm) => {
        await new Promise(resolve => setTimeout(resolve, 2000))
    }

    return (
        <div className='bg-current-surface border border-current rounded-editor p-6 max-w-lg mx-auto w-7xl'>
            <h2 className='text-lg font-code-ui font-code-semibold mb-6 text-warm-green text-center'>
                Deploy Application
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <TerminalFormInput
                    name="repository"
                    control={control}
                    label="Repository URL"
                    prompt="git:~$"
                    placeholder='https://github.com/user/repo.git'
                />

                <TerminalFormInput 
                    name="branch"
                    control={control}
                    label="Branch"
                    prompt="branch:~$"
                    placeholder="main"
                />

                <TerminalFormInput 
                    name="buildCommand"
                    control={control}
                    label="Build command (Optional)"
                    prompt="build:~$"
                    placeholder="npm run build"
                    onCommandSubmit={(cmd) => console.log('Execute:', cmd)}
                />

                <div className='flex justify-end gap-3'>
                    <TerminalButton
                        type="button"
                        variant="ghost"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </TerminalButton>

                    <TerminalButton
                        type="submit"
                        variant="success"
                        command="deploy"
                        loading={isSubmitting}
                    >
                        Deploy to {watch('environment')}
                    </TerminalButton>
                </div>
            </form>
        </div>
    )
}