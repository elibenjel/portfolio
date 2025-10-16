import React from 'react'
import { createPortal } from 'react-dom'

interface DialogProps {
  children: React.ReactNode
  visible: boolean
  onDismiss: () => void
}

export const Dialog: React.FC<DialogProps> = ({ children, visible, onDismiss }) => {
  if (!visible) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onDismiss()
    }
  }

  const dialog = (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-55 blur-2xl"
        onClick={handleBackdropClick}
      />
      <div className="animate-grow">{children}</div>
    </div>
  )

  return createPortal(dialog, document.body)
}
