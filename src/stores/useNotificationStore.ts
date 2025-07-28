import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow' // Add this import

export interface Notification {
    id: string
    type: 'system' | 'archive' | 'scribe' | 'treasury'
    title: string
    description: string
    timestamp: Date
    read: boolean
    priority: 'low' | 'medium' | 'high'
    icon?: string
    actionUrl?: string 
}

export interface Toast {
    id: string
    type: 'success' | 'error' | 'warning' | 'info' | 'loading'
    title: string
    description?: string
    duration?: number
    dismissible?: boolean // ✅ FIXED: Typo from dismissable to dismissible
}

interface NotificationState {
    notifications: Notification[]
    unreadCount: number
    toasts: Toast[]
    isModalOpen: boolean
    preferences: {
        enableToasts: boolean
        enableSounds: boolean
        maxToasts: number
    }
}

interface NotificationActions {
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
    markAsRead: (id: string) => void
    markAllAsRead: () => void
    deleteNotification: (id: string) => void
    clearAll: () => void
    showToast: (toast: Omit<Toast, 'id'>) => string
    dismissToast: (id: string) => void
    clearToasts: () => void
    openModal: () => void
    closeModal: () => void
    toggleModal: () => void
    updatePreferences: (preferences: Partial<NotificationState['preferences']>) => void
}

type NotificationStore = NotificationState & NotificationActions

export const useNotificationStore = create<NotificationStore>()(
    persist(
        immer((set, get) => ({
            // Initial State
            notifications: [],
            unreadCount: 0,
            toasts: [],
            isModalOpen: false,
            preferences: {
                enableToasts: true,
                enableSounds: true,
                maxToasts: 3
            },

            addNotification: (notificationData) => {
                const notification: Notification = {
                    ...notificationData,
                    id: Math.random().toString(36).slice(2),
                    timestamp: new Date(),
                    read: false
                }

                set((state) => {
                    state.notifications.unshift(notification)
                    state.unreadCount += 1

                    if (state.notifications.length > 50) {
                        state.notifications = state.notifications.slice(0, 50)
                    }
                })
            },

            markAsRead: (id) => {
                set((state) => {
                    const notification = state.notifications.find(n => n.id === id)
                    if (notification && !notification.read) {
                        notification.read = true
                        state.unreadCount = Math.max(0, state.unreadCount - 1)
                    }
                })
            },

            markAllAsRead: () => {
                set((state) => {
                    state.notifications.forEach(n => n.read = true)
                    state.unreadCount = 0
                })
            },

            deleteNotification: (id) => {
                set((state) => {
                    if (id === '__all__') {            // 👈 add
                        state.notifications = []
                        state.unreadCount   = 0
                        return
                    }
                    const index = state.notifications.findIndex(n => n.id === id)
                    if (index !== -1) {
                        const wasUnread = !state.notifications[index].read
                        state.notifications.splice(index, 1)
                        // ✅ FIXED: Update unread count when deleting unread notification
                        if (wasUnread) {
                            state.unreadCount = Math.max(0, state.unreadCount - 1)
                        }
                    }
                })
            },

            clearAll: () => {
                set((state) => {
                    state.notifications = []
                    state.unreadCount = 0
                })
            },

            showToast: (toastData) => {
                const toast: Toast = {
                    ...toastData,
                    id: Math.random().toString(36).slice(2),
                    dismissible: toastData.dismissible ?? true, // ✅ FIXED: Typo
                    duration: toastData.duration ?? (toastData.type === 'loading' ? 0 : 5000) 
                }

                set((state) => {
                    const { maxToasts } = state.preferences

                    state.toasts.push(toast)

                    if (state.toasts.length > maxToasts) {
                        state.toasts = state.toasts.slice(-maxToasts)
                    }
                })

                // ✅ FIXED: Auto-dismiss logic
                if (toast.duration && toast.duration > 0) {
                    setTimeout(() => {
                        get().dismissToast(toast.id) // ✅ FIXED: Removed extra space
                    }, toast.duration)
                }

                return toast.id
            },

            dismissToast: (id) => {
                set((state) => {
                    state.toasts = state.toasts.filter(t => t.id !== id)
                })
            },

            clearToasts: () => {
                set((state) => {
                    state.toasts = []
                })
            },

            openModal: () => {
                set((state) => {
                    state.isModalOpen = true
                })
            },

            closeModal: () => {
                set((state) => {
                    state.isModalOpen = false
                })
            },

            toggleModal: () => {
                set((state) => {
                    state.isModalOpen = !state.isModalOpen
                })
            },

            updatePreferences: (newPreferences) => {
                set((state) => {
                    Object.assign(state.preferences, newPreferences)
                })
            }
        })),
        {
            name: 'whispers-from-the-void', // ✅ FIXED: Use kebab-case for localStorage key
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                preferences: state.preferences,
            }),
        }
    )
)

// ✅ FIXED: Updated convenience hooks with useShallow to prevent infinite loops
export const useNotifications = () =>
    useNotificationStore(
        useShallow(state => ({
            notifications: state.notifications,
            unreadCount: state.unreadCount,
            addNotification: state.addNotification,
            markAsRead: state.markAsRead,
            markAllAsRead: state.markAllAsRead,
            deleteNotification: state.deleteNotification,
            clearAll: state.clearAll
        }))
    )

export const useToasts = () =>
    useNotificationStore(
        useShallow(state => ({
            toasts: state.toasts,
            showToast: state.showToast,
            dismissToast: state.dismissToast,
            clearToasts: state.clearToasts
        }))
    )

export const useNotificationModal = () => 
    useNotificationStore(
        useShallow(state => ({
            isOpen: state.isModalOpen,
            openModal: state.openModal,
            closeModal: state.closeModal,
            toggleModal: state.toggleModal
        }))
    )
