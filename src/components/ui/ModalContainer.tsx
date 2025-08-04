"use client"

import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { useModalStore } from "@/stores/useModalStore"
import { Modal } from "./modal"

export function ModalContainer() {
    const { modals } = useModalStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null
    if (modals.length === 0) return null

    return createPortal(
        <>
            {modals.map((modal, index) => (
                <div key={modal.id}>
                    {/* Clean terminal backdrop */}
                    <div
                        className="fixed inset-0 bg-editor-bg/85 backdrop-blur-md animate-in fade-in duration-200"
                        style={{
                            zIndex: 1000 + index * 2
                        }}
                        onClick={()=>{
                            if(modal.closable) {
                                useModalStore.getState().closeModal(modal.id)
                            }
                        }}
                    />

                    {/* Terminal positioning with gentle animation */}
                    <div
                        className="fixed inset-0 flex items-center justify-center p-4"
                        style={{
                            zIndex: 1001 + index * 2
                        }}
                    >
                        <div className="animate-in zoom-in-95 fade-in duration-200">
                            <Modal modal={modal} />
                        </div>
                    </div>
                </div>
            ))}
        </>,
        document.body
    )
}
