"use client"

import { cn } from '@/lib/utils'
import { forwardRef, useState, useRef, useEffect } from 'react'
import { Terminal } from 'lucide-react'
import { useController, type Control, type FieldPath, type FieldValues } from 'react-hook-form'

interface TerminalFormInputProps<T extends FieldValues> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'name'> {
  name: FieldPath<T>
  control: Control<T>
  
  label?: string
  prompt?: string
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  onCommandSubmit?: (value: string) => void

  customErrorMessage?: string
  className?: string
}

export const TerminalFormInput = forwardRef<HTMLInputElement, TerminalFormInputProps<any>>(
  ({ 
    name,
    control,
    label,
    prompt = "user@localhost:~$",
    variant = 'default',
    size = 'md',
    onCommandSubmit,
    customErrorMessage,
    className,
    onKeyDown,
    ...props 
  }, ref) => {
    
    const [isFocused, setIsFocused] = useState(false)
    const [cursorPosition, setCursorPosition] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const measureRef = useRef<HTMLSpanElement>(null)

    const {
      field: { value, onChange, onBlur },
      fieldState: { error, isDirty, isTouched },
      formState: { isSubmitting, isSubmitted }
    } = useController({
      name,
      control
    })

    // Fixed validation state logic
    const getActualVariant = () => {
      // Error state: validation failed and user has interacted
      if (error && (isDirty || isTouched || isSubmitted)) return 'error'
      
      // Success state: validation passed, user interacted, and value exists
      if (!error && (isTouched || isSubmitted) && isDirty && value && value.trim()) {
        return 'success'
      }
      
      // Default state
      return variant
    }

    const actualVariant = getActualVariant()

    // Update cursor position based on text content and caret position
    useEffect(() => {
      if (isFocused && inputRef.current && measureRef.current) {
        const input = inputRef.current
        const selectionStart = input.selectionStart || 0
        const textBeforeCursor = (value as string).substring(0, selectionStart)
        
        // Measure the width of text before cursor
        measureRef.current.textContent = textBeforeCursor
        const textWidth = measureRef.current.offsetWidth
        setCursorPosition(textWidth)
      }
    }, [value, isFocused])

    // Handle cursor position updates when user clicks or moves cursor
    const handleSelectionChange = () => {
      if (isFocused && inputRef.current && measureRef.current) {
        const input = inputRef.current
        const selectionStart = input.selectionStart || 0
        const textBeforeCursor = (value as string).substring(0, selectionStart)
        
        measureRef.current.textContent = textBeforeCursor
        const textWidth = measureRef.current.offsetWidth
        setCursorPosition(textWidth)
      }
    }

    const getVariantStyles = () => {
      switch (actualVariant) {
        case 'success':
          return {
            border: 'border-gentle-success focus-within:border-gentle-success',
          }
        case 'error':
          return {
            border: 'border-gentle-error focus-within:border-gentle-error',
          }
        default:
          return {
            border: 'border-current focus-within:border-warm-blue',
          }
      }
    }

    const getSizeStyles = () => {
      switch (size) {
        case 'sm':
          return {
            padding: 'px-2 py-1',
            text: 'text-xs',
            iconSize: 12
          }
        case 'lg':
          return {
            padding: 'px-4 py-3',
            text: 'text-base',
            iconSize: 16
          }
        default:
          return {
            padding: 'px-3 py-2',
            text: 'text-sm',
            iconSize: 14
          }
      }
    }

    const variantStyles = getVariantStyles()
    const sizeStyles = getSizeStyles()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onCommandSubmit) {
        const inputValue = (e.target as HTMLInputElement).value
        if (inputValue.trim()) {
          onCommandSubmit(inputValue.trim())
        }
      }
      onKeyDown?.(e)
    }

    const handleFocus = () => {
      setIsFocused(true)
      setTimeout(handleSelectionChange, 0)
    }

    const handleBlur = () => {
      setIsFocused(false)
      onBlur()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
      setTimeout(handleSelectionChange, 0)
    }

    const getErrorMessage = () => {
      if (!error) return null
      if (customErrorMessage) return customErrorMessage
      if (error.message) return `bash: ${error.message.toLowerCase()}`
      return `bash: invalid input format`
    }

    return (
      <div className={cn("space-y-2", className)}>
        {/* Hidden measurement element */}
        <span 
          ref={measureRef}
          className={cn(
            "absolute invisible whitespace-pre font-terminal-mono",
            sizeStyles.text
          )}
          style={{ left: '-9999px' }}
        />

        {/* Label */}
        {label && (
          <label className="block text-sm font-terminal-ui text-current">
            {label}
          </label>
        )}

        {/* ✅ CONNECTED Terminal Command Line - No Visual Separation */}
        <div className="relative">
          <div className={cn(
            "flex items-center bg-current-surface border rounded-editor terminal-transition overflow-hidden",
            variantStyles.border,
            isSubmitting && "opacity-50 cursor-wait"
          )}>
            {/* ✅ SEAMLESS: Prompt flows directly into input - no borders or separation */}
            <div className={cn(
              "flex items-center gap-2 flex-shrink-0",
              sizeStyles.padding
            )}>
              <Terminal size={sizeStyles.iconSize} className="text-warm-blue" />
              <span className="font-terminal-mono font-code-medium text-warm-blue whitespace-nowrap">
                {prompt}
              </span>
            </div>

            {/* ✅ CONNECTED: Input starts immediately after prompt */}
            <div className="flex-1 relative">
              <input
                ref={(node) => {
                  inputRef.current = node
                  if (typeof ref === 'function') {
                    ref(node)
                  } else if (ref) {
                    ref.current = node
                  }
                }}
                className={cn(
                  "w-full bg-transparent text-current font-terminal-mono placeholder:text-current-muted focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
                  "pl-1 pr-3 py-2", // ✅ Minimal left padding - connects to prompt
                  sizeStyles.text
                )}
                value={value || ''}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onKeyUp={handleSelectionChange}
                onClick={() => setTimeout(handleSelectionChange, 0)}
                disabled={isSubmitting}
                {...props}
              />
              
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex justify-between text-xs font-terminal-mono">
          {/* Error Message */}
          <div className="flex items-center gap-1">
            {error && (isDirty || isTouched || isSubmitted) && (
              <span className="text-gentle-error">{getErrorMessage()}</span>
            )}
            {!error && (isDirty || isSubmitted) && value && value.trim() && actualVariant === 'success' && (
              <span className="text-gentle-success">✓ input validated</span>
            )}
          </div>
        </div>
      </div>
    )
  }
)

TerminalFormInput.displayName = 'TerminalFormInput'

export const TerminalSearchInput = (props: Omit<TerminalFormInputProps<any>, 'variant' | 'prompt'>) => (
  <TerminalFormInput 
    prompt="search:~$"
    placeholder="Type to search..."
    {...props} 
  />
)

export const TerminalCommandInput = (props: Omit<TerminalFormInputProps<any>, 'variant' | 'prompt'>) => (
  <TerminalFormInput 
    prompt="user@localhost:~$"
    placeholder="Enter command..."
    {...props} 
  />
)

export const TerminalUrlInput = (props: Omit<TerminalFormInputProps<any>, 'variant' | 'prompt'>) => (
  <TerminalFormInput 
    prompt="git:~$"
    placeholder="https://github.com/user/repo.git"
    {...props} 
  />
)

export const TerminalPasswordInput = (props: Omit<TerminalFormInputProps<any>, 'variant' | 'prompt' | 'type'>) => (
  <TerminalFormInput 
    prompt="auth:~$"
    type="password"
    placeholder="Enter password..."
    {...props} 
  />
)
