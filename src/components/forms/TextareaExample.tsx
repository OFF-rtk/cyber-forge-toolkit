'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TerminalTextarea } from '@/components/ui/TerminalTextarea';
import { TerminalButton } from '@/components/ui/TerminalButton';

const textareaSchema = z.object({
  feedback: z.string().min(10, 'feedback must be at least 10 characters'),
  script: z.string().min(1, 'script content required'),
  description: z.string().optional(),
});

type TextareaForm = z.infer<typeof textareaSchema>;

export function TextareaExample() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<TextareaForm>({
    resolver: zodResolver(textareaSchema)
  });

  const onSubmit = (data: TextareaForm) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="bg-current-surface border border-current rounded-editor p-6 mx-auto max-w-4xl w-7xl">
      <h2 className="text-lg font-terminal-ui font-code-semibold mb-6 text-warm-green text-center">
        TextArea Showcase
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TerminalTextarea
          name="feedback"
          control={control}
          label="Project Feedback"
          prompt="feedback:~$"
          placeholder="Share your thoughts on this fascinating terminal UI..."
          minRows={5}
          maxRows={7}
          showCharCount
          maxLength={500}
        />

        <TerminalTextarea
          name="script"
          control={control}
          label="Deployment Script"
          prompt="script:~$"
          minRows={7}
          maxRows={12}
          showCharCount
          maxLength={1000}
          autoResize
          placeholder="#!/bin/bash"
        />

        <TerminalTextarea
          name="description"
          control={control}
          label="Additional Notes (Optional)"
          prompt="notes:~$"
          placeholder="Jot down any extra information or secret thoughts..."
          minRows={4}
          maxRows={6}
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
  );
}
