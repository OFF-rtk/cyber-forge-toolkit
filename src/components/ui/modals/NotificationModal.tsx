// components/ui/modals/NotificationModal.tsx - UPDATED with action links
"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { SoulslikeModal } from '@/components/ui/Ambiance/SoulslikeModal'
import { Button } from '@/components/ui/button'
import { useNotifications, useNotificationModal, useToasts } from '@/stores/useNotificationStore'
import { 
  SparklesIcon, 
  TrashIcon, 
  ArchiveBoxIcon, 
  UserGroupIcon, 
  ExclamationTriangleIcon,
  CogIcon,
  ArrowTopRightOnSquareIcon 
} from '@heroicons/react/24/outline'
import { CinzelFont, CrimsonPro } from '@/components/ui/fonts'

// ✅ NEW: Icon mapping for different notification types
const getNotificationIcon = (type: string) => {
  const iconMap = {
    archive: ArchiveBoxIcon,
    scribe: UserGroupIcon,
    system: CogIcon,
    treasury: SparklesIcon,
  }
  const IconComponent = iconMap[type as keyof typeof iconMap] || SparklesIcon
  return <IconComponent className="h-5 w-5 text-ember-600 flex-shrink-0 mt-0.5" />
}

export function NotificationModal() {
  const { isOpen, closeModal } = useNotificationModal()
  const { 
    notifications, 
    unreadCount,
    markAsRead, 
    markAllAsRead,
    deleteNotification,
    clearAll 
  } = useNotifications()

  const { showToast } = useToasts()

  return (
    <SoulslikeModal
      isOpen={isOpen}
      onClose={closeModal}
      title="Whispers from the Void"
      size="lg"
    >
      <div className="space-y-6">
        {/* Top actions */}
        <div className="flex items-center justify-between">
          <p className={`${CinzelFont.className} text-sm text-dust`}>
            {notifications.length === 0
              ? 'The void is silent...'
              : `${notifications.length} whisper${notifications.length > 1 ? 's' : ''} from the digital realm`}
          </p>

          {notifications.length > 0 && (
            <div className="flex gap-3">
              {unreadCount > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={markAllAsRead}
                  className="text-ember-600 hover:text-bone text-xs"
                >
                  Mark all read
                </Button>
              )}

              <Button
                size="sm"
                variant="ghost"
                onClick={clearAll}
                className="text-blood hover:text-bone text-xs"
              >
                <TrashIcon className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Notification list */}
        <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-2">
          <AnimatePresence mode="popLayout">
            {notifications.map(notification => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                className="relative bg-ash-800/30 border border-ash-800/50 rounded-lg p-4 hover:bg-ash-800/40 transition-colors duration-200"
              >
                {/* Unread indicator */}
                {!notification.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-ember-600 rounded-l-lg" />
                )}

                <div className="flex gap-3">
                  {/* Icon */}
                  {getNotificationIcon(notification.type)}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className={`${CinzelFont.className} text-sm text-bone font-semibold ${!notification.read ? 'font-bold' : ''}`}>
                        {notification.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        notification.priority === 'high' ? 'bg-blood/20 text-blood' :
                        notification.priority === 'medium' ? 'bg-ember-600/20 text-ember-600' :
                        'bg-dust/20 text-dust'
                      }`}>
                        {notification.priority}
                      </span>
                    </div>
                    
                    <p className="text-dust/80 text-sm mt-1 leading-relaxed">
                      {notification.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-dust/40 text-xs">
                        {notification.timestamp.toLocaleString()}
                      </span>

                      <div className="flex items-center gap-2">
                        {/* ✅ NEW: Action link button */}
                        {notification.actionUrl && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              // TODO: Navigate to the URL when routing is implemented
                              console.log('Navigate to:', notification.actionUrl)
                              showToast({
                                type: 'info',
                                title: 'Navigation Ready',
                                description: `Link prepared: ${notification.actionUrl}`
                              })
                            }}
                            className="text-ember-600 hover:text-bone text-xs"
                          >
                            <ArrowTopRightOnSquareIcon className="h-3 w-3 mr-1" />
                            View Project
                          </Button>
                        )}

                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            className="text-ember-600 hover:text-bone text-xs"
                          >
                            Mark read
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-blood hover:text-bone"
                        >
                          <TrashIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {notifications.length === 0 && (
            <div className="text-center py-12">
              <SparklesIcon className="h-12 w-12 text-dust-400/40 mx-auto mb-4" />
              <p className={`${CrimsonPro.className} text-dust-400/60 text-md`}>
                No whispers from the void yet...
              </p>
              <p className={`${CrimsonPro.className} text-dust-400/40 text-sm mt-1`}>
                Your notifications will appear here when actions are performed.
              </p>
            </div>
          )}
        </div>
      </div>
    </SoulslikeModal>
  )
}
