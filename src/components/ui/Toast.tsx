import { cn } from '@/lib/utils'
import { X, Terminal, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { useToastStore, type Toast } from '@/stores/useToastStore'
import { useEffect, useState } from 'react'

interface ToastProps {
  toast: Toast
  className?: string
}

export function Toast({ toast, className }: ToastProps) {
  const { removeToast } = useToastStore()
  const [isVisible, setIsVisible] = useState(false)

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // ✅ REFINED: Simplified variant styling without terminal simulation
  const getVariantStyles = (variant: Toast['variant']) => {
    switch (variant) {
      case 'success':
        return {
          borderColor: 'border-l-gentle-success',
          iconColor: 'text-gentle-success',
          icon: CheckCircle
        }
      case 'warning':
        return {
          borderColor: 'border-l-gentle-warning',
          iconColor: 'text-gentle-warning',
          icon: AlertTriangle
        }
      case 'error':
        return {
          borderColor: 'border-l-gentle-error',
          iconColor: 'text-gentle-error',
          icon: XCircle
        }
      case 'default':
      default:
        return {
          borderColor: 'border-l-warm-blue',
          iconColor: 'text-warm-blue',
          icon: Terminal
        }
    }
  }

  const variantStyles = getVariantStyles(toast.variant)
  const Icon = variantStyles.icon

  return (
    <div
      className={cn(
        // ✅ REFINED: Clean terminal styling consistent with your theme
        "relative bg-current-surface border border-current rounded-editor",
        "shadow-lg backdrop-blur-sm p-4",
        "min-w-[320px] max-w-[400px]",
        
        // ✅ REFINED: Clean accent border
        "border-l-4",
        variantStyles.borderColor,
        
        // ✅ REFINED: Smooth animation
        "transition-all duration-300 ease-out terminal-transition",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        
        className
      )}
    >
      {/* ✅ REFINED: Clean content layout */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* ✅ REFINED: Simple content with icon */}
          <div className="flex items-start gap-3">
            <Icon size={16} className={cn("mt-0.5 flex-shrink-0", variantStyles.iconColor)} />
            
            <div className="flex-1 min-w-0">
              {/* Title */}
              {toast.title && (
                <div className="font-terminal-mono font-code-medium text-sm text-current mb-1">
                  {toast.title}
                </div>
              )}
              
              {/* Description */}
              {toast.description && (
                <div className="font-terminal-mono text-sm text-current-muted leading-relaxed">
                  {toast.description}
                </div>
              )}
            </div>
          </div>

          {/* ✅ REFINED: Clean action button */}
          {toast.action && (
            <div className="mt-3 pt-3 border-t border-current">
              <button
                onClick={toast.action.onClick}
                className={cn(
                  "font-terminal-mono text-xs px-3 py-1.5 rounded-editor border border-current",
                  "hover:bg-editor-elevated terminal-transition",
                  "text-current-secondary hover:text-current"
                )}
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>
        
        {/* ✅ REFINED: Clean close button */}
        <button
          onClick={() => removeToast(toast.id)}
          className="ml-3 p-1 rounded text-current-muted hover:text-current hover:bg-editor-elevated terminal-transition flex-shrink-0"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
