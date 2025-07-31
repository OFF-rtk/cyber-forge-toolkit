import { useToastStore } from '@/stores/useToastStore'

export function useToast() {
  const { addToast, removeToast, clearAllToasts } = useToastStore()

  const toast = {
    success: (title: string, description?: string, duration?: number) => {
      addToast({
        variant: 'success',
        title,
        description,
        duration: duration || 5000,
      })
    },
    
    error: (title: string, description?: string, duration?: number) => {
      addToast({
        variant: 'error',
        title,
        description,
        duration: duration || 7000, // Errors stay longer
      })
    },
    
    warning: (title: string, description?: string, duration?: number) => {
      addToast({
        variant: 'warning',
        title,
        description,
        duration: duration || 6000,
      })
    },
    
    info: (title: string, description?: string, duration?: number) => {
      addToast({
        variant: 'default',
        title,
        description,
        duration: duration || 5000,
      })
    },
    
    custom: (toast: Parameters<typeof addToast>[0]) => {
      addToast(toast)
    },

    // Utility functions
    dismiss: (id: string) => {
      removeToast(id)
    },

    dismissAll: () => {
      clearAllToasts()
    }
  }

  return { toast }
}
