'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { useToastStore } from '@/stores/useToastStore'
import { Toast } from './Toast'

export function ToastContainer() {
  const { toasts } = useToastStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast 
          key={toast.id} 
          toast={toast}
          className="animate-in slide-in-from-right duration-300"
        />
      ))}
    </div>,
    document.body
  )
}
