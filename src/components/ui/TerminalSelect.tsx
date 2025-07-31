'use client';

import { cn } from '@/lib/utils'
import { forwardRef, useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, Terminal, X } from 'lucide-react'
import { useController, type Control, type FieldPath, type FieldValues } from 'react-hook-form'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface TerminalSelectProps<T extends FieldValues> extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'name'> {
  // Form integration
  name: FieldPath<T>
  control: Control<T>
  
  // Terminal styling
  label?: string
  prompt?: string
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  
  // Select-specific props
  options: SelectOption[]
  placeholder?: string
  searchable?: boolean
  
  // Validation enhancements
  customErrorMessage?: string
  className?: string
}

export const TerminalSelect = forwardRef<HTMLDivElement, TerminalSelectProps<any>>(
  ({ 
    name,
    control,
    label,
    prompt = "select:~$",
    variant = 'default',
    size = 'md',
    options = [],
    placeholder = "Select option...",
    searchable = false,
    customErrorMessage,
    className,
    ...props 
  }, ref) => {
    
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    // React Hook Form integration
    const {
      field: { value, onChange, onBlur },
      fieldState: { error, isDirty, isTouched },
      formState: { isSubmitting, isSubmitted }
    } = useController({
      name,
      control,
    })

    // Determine variant based on validation state
    const getActualVariant = () => {
      if (error && (isDirty || isTouched || isSubmitted)) return 'error'
      if (!error && (isTouched || isSubmitted) && isDirty && value) return 'success'
      return variant
    }

    const actualVariant = getActualVariant()

    // Filter options based on search term
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Find selected option
    const selectedOption = options.find(option => option.value === value)

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setSearchTerm('')
          setHighlightedIndex(-1)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, [isOpen, searchable])

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault()
          setIsOpen(true)
          setHighlightedIndex(0)
        }
        return
      }

      switch (e.key) {
        case 'Escape':
          setIsOpen(false)
          setSearchTerm('')
          setHighlightedIndex(-1)
          break
        
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          )
          break
        
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          )
          break
        
        case 'Enter':
          e.preventDefault()
          if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
            const selectedOption = filteredOptions[highlightedIndex]
            onChange(selectedOption.value)
            setIsOpen(false)
            setSearchTerm('')
            setHighlightedIndex(-1)
          }
          break
      }
    }

    const getVariantStyles = () => {
      switch (actualVariant) {
        case 'success':
          return {
            border: 'border-gentle-success focus-within:border-gentle-success',
            prompt: 'text-gentle-success bg-editor-elevated',
          }
        case 'error':
          return {
            border: 'border-gentle-error focus-within:border-gentle-error',
            prompt: 'text-gentle-error bg-editor-elevated',
          }
        default:
          return {
            border: 'border-current focus-within:border-warm-blue',
            prompt: 'text-warm-blue bg-editor-sidebar',
          }
      }
    }

    const getSizeStyles = () => {
      switch (size) {
        case 'sm':
          return { 
            padding: 'px-2 py-1', 
            text: 'text-xs', 
            prompt: 'text-xs px-2 py-1', 
            iconSize: 12 
          }
        case 'lg':
          return { 
            padding: 'px-4 py-3', 
            text: 'text-base', 
            prompt: 'text-base px-4 py-3', 
            iconSize: 16 
          }
        default:
          return { 
            padding: 'px-3 py-2', 
            text: 'text-sm', 
            prompt: 'text-sm px-3 py-2', 
            iconSize: 14 
          }
      }
    }

    const variantStyles = getVariantStyles()
    const sizeStyles = getSizeStyles()

    const handleOptionClick = (optionValue: string) => {
      onChange(optionValue)
      setIsOpen(false)
      setSearchTerm('')
      setHighlightedIndex(-1)
      onBlur()
    }

    const handleToggle = () => {
      if (!isSubmitting) {
        setIsOpen(!isOpen)
        if (!isOpen) {
          setHighlightedIndex(-1)
        }
      }
    }

    // Clear/unselect functionality
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange('')
      setIsOpen(false)
      onBlur()
    }

    // Terminal-style error message
    const getErrorMessage = () => {
      if (!error) return null
      if (customErrorMessage) return customErrorMessage
      if (error.message) return `bash: ${error.message.toLowerCase()}`
      return 'bash: invalid selection'
    }

    return (
      <div className={cn("space-y-2", className)} ref={ref}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-terminal-ui text-current">
            {label}
          </label>
        )}

        {/* Select Container */}
        <div className="relative" ref={dropdownRef}>
          <div className={cn(
            "flex items-center bg-current-surface border rounded-editor terminal-transition overflow-hidden cursor-pointer",
            variantStyles.border,
            isSubmitting && "opacity-50 cursor-wait"
          )}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          >
            {/* Terminal Prompt */}
            <div className={cn(
              "flex items-center gap-2 border-r border-current flex-shrink-0",
              sizeStyles.prompt,
              variantStyles.prompt
            )}>
              <Terminal size={sizeStyles.iconSize} className="text-current" />
              <span className="font-terminal-mono font-code-medium whitespace-nowrap">
                {prompt}
              </span>
            </div>

            {/* Selected Value Display with Clear Button */}
            <div className="flex-1 flex items-center justify-between">
              <span className={cn(
                "font-terminal-mono",
                sizeStyles.padding,
                sizeStyles.text,
                selectedOption ? "text-current" : "text-current-muted"
              )}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
              
              <div className="flex items-center gap-1 mr-3">
                {/* Clear button when option is selected */}
                {selectedOption && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 rounded hover:bg-editor-elevated transition-colors text-current-muted hover:text-current focus:outline-none"
                    title="Clear selection"
                  >
                    <X size={12} />
                  </button>
                )}
                
                <ChevronDown 
                  size={sizeStyles.iconSize} 
                  className={cn(
                    "transition-transform duration-150 text-current-muted",
                    isOpen && "rotate-180"
                  )}
                />
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-current-surface border border-current rounded-editor overflow-hidden max-h-60">
              {/* Search Input */}
              {searchable && (
                <div className="p-2 border-b border-current">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type to search..."
                    className="w-full px-2 py-1 bg-transparent text-sm font-terminal-mono text-current placeholder:text-current-muted focus:outline-none"
                  />
                </div>
              )}

              {/* Options List */}
              <div className="max-h-48 overflow-y-auto">
                {/* Clear option at the top when something is selected */}
                {selectedOption && (
                  <div
                    className="flex items-center justify-between px-3 py-2 cursor-pointer font-terminal-mono text-sm hover:bg-editor-elevated transition-colors border-b border-current"
                    onClick={() => handleOptionClick('')}
                  >
                    <span className="text-current-muted italic">Clear selection</span>
                    <X size={12} className="text-current-muted" />
                  </div>
                )}

                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-current-muted font-terminal-mono">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option, index) => (
                    <div
                      key={option.value}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 cursor-pointer font-terminal-mono text-sm hover:bg-editor-elevated transition-colors",
                        highlightedIndex === index && "bg-editor-elevated",
                        value === option.value && "bg-warm-blue/10 text-warm-blue",
                        option.disabled && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => !option.disabled && handleOptionClick(option.value)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <span>{option.label}</span>
                      {value === option.value && (
                        <Check size={14} className="text-warm-blue" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex justify-between text-xs font-terminal-mono">
          {/* Error Message */}
          <div className="flex items-center gap-1">
            {error && (isDirty || isTouched || isSubmitted) && (
              <span className="text-gentle-error">{getErrorMessage()}</span>
            )}
            {!error && (isTouched || isSubmitted) && isDirty && value && actualVariant === 'success' && (
              <span className="text-gentle-success">✓ option selected</span>
            )}
          </div>
        </div>
      </div>
    )
  }
)

TerminalSelect.displayName = 'TerminalSelect'
