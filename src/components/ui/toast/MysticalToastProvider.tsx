"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CinzelFont } from "@/components/ui/fonts";
import { useToasts } from "@/stores/useNotificationStore";
import { 
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const ToastIcon = ({ type }: { type: string }) => {
    const iconClasses = "w-5 h-5"

    switch (type) {
        case 'success':
            return <CheckCircleIcon className={clsx(iconClasses, 'text-tarnished')} />
        case 'error':
            return <XCircleIcon className={clsx(iconClasses, 'text-blood')} />
        case 'warning':
            return <ExclamationTriangleIcon className={clsx(iconClasses, 'text-ember-600')} />
        case 'loading':
            return <div className={clsx(iconClasses, 'border-2 border-ember-600 border-t-transparent rounded-full animate-spin')} />
        default:
            return <InformationCircleIcon className={clsx(iconClasses, 'text-dust')} />
    }
}

function MysticalToast({ toast }: { toast:any }) {
    const { dismissToast } = useToasts()

    const toastConfig = {
        success: 'bg-tarnished-500/10 border-tarnished-500/30',
        error: 'bg-blood-700/10 border-blood-700/30',
        warning: 'bg-ember-600/10 border-ember-600/30',
        loading: 'bg-ash-800/40 border-ember-600/20',
        info: 'bg-ash-800/30 border-ash-800/40'
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity:1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
            className={clsx(
                'backdrop-blur-xl border rounded-xl p-4 shadow-2xl shadow-black/50 relative max-w-sm w-full',
                toastConfig[toast.type as keyof typeof toastConfig]
            )}
        >
            <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-ember-600/20 rounded-tl-lg" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-ember-600/20 rounded-br-lg" />
            
            <div className="flex items-start gap-3">
                <div className="flex shrink-0 mt-0.5">
                    <ToastIcon type={toast.type} />
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className={clsx(
                        `${CinzelFont.className} text-sm font-semibold tracking-wide text-bone`
                    )}>
                        {toast.title}
                    </h4>

                    {toast.description && (
                        <p className="text-dust text-sm mt-1 leading-relaxed">
                            {toast.description}
                        </p>
                    )}
                </div>

                {toast.dismissible && toast.type !== 'loading' && (
                    <button
                        onClick={() => dismissToast(toast.id)}
                        className="flex-shrink-0 text-dust hover:text-bone transition-colors duration-200 p-1 rounded hover:bg-ash-800/20"
                    >
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                )}
            </div>
        </motion.div>
    )
}

export function MysticalToastProvider() {
    const { toasts } = useToasts()

    return (
        <div className="fixed top-20 right-6 z-[9999] flex flex-col gap-3">
            <AnimatePresence>
                {toasts.map(toast => (
                    <MysticalToast key={toast.id} toast={toast} />
                ))}
            </AnimatePresence>
        </div>
    )
}