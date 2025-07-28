// components/ui/modals/SoulslikeModal.tsx - FULLY UPDATED
'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { CinzelFont } from '@/components/ui/fonts'
import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface SoulslikeModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function SoulslikeModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md' 
}: SoulslikeModalProps) {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg', 
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            {/* Overlay */}
            <DialogPrimitive.Overlay forceMount asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-void-950/80 backdrop-blur-sm"
              />
            </DialogPrimitive.Overlay>

            {/* Content */}
            <DialogPrimitive.Content forceMount asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={clsx(
                  "fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 mx-4",
                  "max-h-[85vh] my-auto", 
                  "bg-ash-800/95 backdrop-blur-xl border-2 border-ember-600/25 rounded-2xl shadow-2xl shadow-void-950/60",
                  "focus:outline-none overflow-hidden",
                  sizeClasses[size]
                )}
              >
                {/* Corner decorations - positioned at modal edges */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-ember-600/30 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-ember-600/30 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-ember-600/30 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-ember-600/30 rounded-br-lg" />

                {/* Bottom mystical glow line only */}
                <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-ash-800/40 to-transparent" />

                {/* Content area with proper scroll structure */}
                <div className="flex flex-col h-full max-h-[85vh]">
                  
                  {/* Fixed Header */}
                  <div className='flex-shrink-0 p-8 pb-0'>
                    <div className="flex items-start justify-between mb-6">
                      
                      {/* Clean title structure */}
                      <div className="pr-10">
                        <DialogPrimitive.Title 
                          className={`${CinzelFont.className} text-3xl font-bold text-bone tracking-wider`}
                        >
                          {title}
                        </DialogPrimitive.Title>
                      </div>

                      {/* Close button - properly spaced from edges */}
                      <DialogPrimitive.Close asChild>
                        <button 
                          className="flex-shrink-0 rounded-lg p-2 opacity-70 transition-all duration-200 hover:opacity-100 hover:bg-ash-800/30 focus:outline-none focus:ring-2 focus:ring-ember-600/50 focus:ring-offset-2 text-dust hover:text-bone"
                          onClick={onClose}
                        >
                          <XMarkIcon className="h-5 w-5" />
                          <span className="sr-only">Close</span>
                        </button>
                      </DialogPrimitive.Close>
                    </div>
                    
                    {/* Full-width glow line below header */}
                    <div className="h-px bg-gradient-to-r from-transparent via-ember-600/40 to-transparent mb-6" />
                  </div>

                  {/* Scrollable Content Area */}
                  <div className="flex-1 overflow-y-auto px-8 pb-8 min-h-0">
                    <div className='space-y-6'>
                      {children}
                    </div>
                  </div>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}
