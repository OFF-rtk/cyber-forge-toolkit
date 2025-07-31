import { cn } from '@/lib/utils'
import { X, Minimize2, Square } from 'lucide-react'
import { useModalStore, type Modal } from '@/stores/useModalStore'
import { useEffect, useState } from 'react'
import { TerminalButton } from './TerminalButton'

interface ModalProps {
  modal: Modal     
  className?: string 
}

export function Modal({ modal, className }: ModalProps) {
  const { closeModal } = useModalStore()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.closable) {
        closeModal(modal.id)
      }
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [modal.id, modal.closable, closeModal])

  const getSizeClasses = (size: Modal['size']) => {
    switch (size) {
      case 'sm': return 'max-w-md'      
      case 'md': return 'max-w-lg' 
      case 'lg': return 'max-w-2xl'   
      case 'xl': return 'max-w-4xl'     
      case 'full': return 'max-w-6xl' 
      default: return 'max-w-lg'       
    }
  }

  const getVariantStyles = (variant: Modal['variant']) => {
    switch (variant) {
      case 'warning':
        return { 
          border: 'border-gentle-warning',
          titleBar: 'bg-editor-elevated text-gentle-warning'
        }
      case 'danger':
        return { 
          border: 'border-gentle-error',
          titleBar: 'bg-editor-elevated text-gentle-error'
        }
      case 'success':
        return { 
          border: 'border-gentle-success',
          titleBar: 'bg-editor-elevated text-gentle-success'
        }
      case 'info':
        return { 
          border: 'border-warm-blue',
          titleBar: 'bg-editor-elevated text-warm-blue'
        }
      default:
        return { 
          border: 'border-current',
          titleBar: 'bg-editor-sidebar text-warm-blue'
        }
    }
  }

  const getButtonVariant = (modalVariant: Modal['variant']): "default" | "warning" | "danger" | "success" | "ghost" => {
    switch (modalVariant) {
      case 'danger':
        return 'danger'
      case 'warning':
        return 'warning'
      case 'success':
        return 'success'
      default:
        return 'default'
    }
  }

  const variantStyles = getVariantStyles(modal.variant)

  return (
    <div
      className={cn(
        "relative bg-current-surface border rounded-editor overflow-hidden terminal-transition",
        "shadow-lg w-full mx-4",
        getSizeClasses(modal.size),
        variantStyles.border,
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Terminal Title Bar */}
      <div className={cn(
        "border-b border-current px-4 py-3 flex items-center justify-between",
        variantStyles.titleBar
      )}>
        {/* Traffic Light Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => closeModal(modal.id)}
              className="w-3 h-3 rounded-full bg-gentle-error hover:opacity-80 transition-opacity"
              title="Close"
            />
            <button 
              className="w-3 h-3 rounded-full bg-gentle-warning hover:opacity-80 transition-opacity"
              title="Minimize"
            />
            <button 
              className="w-3 h-3 rounded-full bg-gentle-success hover:opacity-80 transition-opacity"
              title="Maximize"
            />
          </div>
        </div>

        {/* Clean Title */}
        <div className="flex-1 text-center">
          <span className="font-terminal-mono font-code-medium text-sm text-current">
            {modal.title || 'Terminal Dialog'}
          </span>
        </div>

        <div className="w-16"></div>
      </div>

      {/* Clean Content Area */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Description */}
          {modal.description && (
            <p className="font-terminal-mono text-sm text-current-muted">
              {modal.description}
            </p>
          )}

          {/* Custom Content */}
          {modal.content && (
            <div className="text-current">
              {modal.content}
            </div>
          )}
        </div>

        {(modal.onConfirm || modal.onCancel) && (
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-current">
            {modal.onCancel && (
              <TerminalButton
                variant="default"
                onClick={() => {
                  modal.onCancel?.()
                  closeModal(modal.id)
                }}
              >
                Cancel
              </TerminalButton>
            )}

            {modal.onConfirm && (
              <TerminalButton
                variant={getButtonVariant(modal.variant)}
                onClick={() => {
                  modal.onConfirm?.()
                  closeModal(modal.id)
                }}
              >
                {modal.confirmText || 'Confirm'}
              </TerminalButton>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
