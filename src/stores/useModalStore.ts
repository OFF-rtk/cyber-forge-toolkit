import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Modal {
    id: string;
    title?: string;
    description?: string;
    content?: React.ReactNode;
    variant?: 'default' | 'warning' | 'danger' | 'success' | 'info'
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    closable?: boolean
    onConfirm?: () => void
    onCancel?: () => void
    confirmText?: string
    cancelText?: string
}


interface ModalStore {
    modals: Modal[]
    openModal: (modal: Omit<Modal, 'id'>) => string
    closeModal: (id: string) => void
    closeAll: () => void
    updateModal: (id: string, updates: Partial<Modal>) => void
}


export const useModalStore = create<ModalStore>()(
    devtools(
        (set, get) => ({
            modals: [],

            openModal: (modal) => {
                const id = `modal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

                const newModal: Modal = {
                    id,
                    size: 'md',
                    closable: true,
                    variant: 'default',
                    ...modal,
                }

                set((state) => ({
                    modals: [...state.modals, newModal]
                }))

                if(get().modals.length === 1) {
                    document.body.style.overflow = 'hidden'
                }
            },

            closeModal: (id) => {
                set((state)=>({modals: state.modals.filter(modal => modal.id !== id)}))
                
                if(get().modals.length === 0) {
                    document.body.style.overflow = 'unset'
                }
            },

            updateModal: (id, updates) => {
                set((state) => ({
                    modals: state.modals.map((modal) => 
                        modal.id === id
                            ? {...modal, ...updates}
                            : modal
                    )
                }))
            },
        }),
        { name: 'modal-store' }
    )
)
