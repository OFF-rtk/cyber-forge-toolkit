import { useModalStore } from "@/stores/useModalStore";

export function useModal() {
    const { openModal, closeModal, closeAll, updateModal } = useModalStore()

    const modal = {
        confirm: (
            title: string,
            description: string,
            onConfirm: () => void,
            onCancel?: () => void
        ) => {
            return openModal({
                title,
                description,
                variant: 'default',
                onConfirm,
                onCancel,
                confirmText: 'Confirm',
                cancelText: 'Cancel',
            })
        },

        warning: (
            title: string,
            description: string,
            onConfirm: () => void,
            onCancel?: () => void,
        ) => {
            return openModal({
                title,
                description,
                variant: 'warning',
                onConfirm,
                onCancel,
                confirmText: 'Proceed',
                cancelText: 'Cancel',
            })
        },

        danger: (
            title: string,
            description: string,
            onConfirm: () => void,
            onCancel?: () => void
        ) => {
            return openModal({
                title,
                description,
                variant: 'danger',
                onConfirm,
                onCancel,
                confirmText: 'Delete',
                cancelText: 'Cancel'
            })
        },

        success: (title: string, description?: string) => {
            return openModal({
                title,
                description,
                variant: 'success',
                confirmText: 'OK',
                onConfirm: () => {}
            })
        },

        info: (title: string, description?: string) => {
            return openModal({
                title,
                description,
                variant: 'info',
                confirmText: 'Got it',
            })
        },

        custom: (
            content: React.ReactNode,
            options?: {
                title?: string
                size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
                closable?: boolean
                confirmText?: string
                cancelText?: string
                variant?: 'default' | 'warning' | 'danger' | 'success' | 'info'
                onConfirm?: () => void
                onCancel?: () => void
            }
        ) => {
            return openModal({
                content,
                ...options,
            })
        },

        open: openModal,

        close: closeModal,
        closeAll: closeAll,
        update: updateModal,
    }

    return { modal }
}