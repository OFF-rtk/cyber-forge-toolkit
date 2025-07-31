import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Toast {
  id: string
  title?: string
  description?: string
  variant: 'default' | 'success' | 'warning' | 'error'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearAllToasts: () => void
}

export const useToastStore = create<ToastStore>()(
  devtools(
    (set, get) => ({
      toasts: [],
      
      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
        const newToast: Toast = {
          id,
          duration: 5000, // Default 5 seconds
          ...toast,
        }
        
        set((state) => ({
          toasts: [...state.toasts, newToast]
        }))
        
        // Auto-remove after duration
        if (newToast.duration && newToast.duration > 0) {
          setTimeout(() => {
            const currentToasts = get().toasts
            if (currentToasts.find(t => t.id === id)) {
              get().removeToast(id)
            }
          }, newToast.duration)
        }
      },
      
      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id)
        }))
      },
      
      clearAllToasts: () => {
        set({ toasts: [] })
      },
    }),
    { name: 'toast-store' }
  )
)
