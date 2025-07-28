"use client";

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type CustomModalProps = {
    isOpen: boolean
    onClose: () => void
    title: string
    description?: string
    children: React.ReactNode
    showCloseButton?: boolean
    size?: 'sm' | 'md' | 'lg' | 'xl'
    footerActions?: React.ReactNode
}

export function CustomModal({
    isOpen,
    onClose,
    title,
    description,
    children,
    showCloseButton,
    size = 'md',
    footerActions
} : CustomModalProps) {
    const sizeClasses = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl'
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={`${sizeClasses[size]} bg-zinc-900`}></DialogContent>
        </Dialog>
    )
}