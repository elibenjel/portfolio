import React from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface DialogProps {
  children: React.ReactNode
  visible: boolean
  onDismiss: () => void
}

type DialogEntry = {
  id: string
  onDismiss: () => void
}

const dialogStack: DialogEntry[] = []
let ignoreNextPopState = false

function handlePopState() {
  if (ignoreNextPopState) {
    ignoreNextPopState = false
    return
  }
  if (dialogStack.length === 0) return
  const top = dialogStack.pop()
  top?.onDismiss()
}

// Install listener once
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', handlePopState)
}

function pushDialog(id: string, onDismiss: () => void) {
  dialogStack.push({ id, onDismiss })
  window.history.pushState({ dialog: true }, '')
}

function removeDialog(id: string) {
  const index = dialogStack.findIndex(entry => entry.id === id)
  if (index !== -1) {
    dialogStack.splice(index, 1)
    if (window.history.state?.dialog) {
      ignoreNextPopState = true
      window.history.back()
    }
  }
}

function useDialogBackHandler(visible: boolean, id: string, onDismiss: () => void) {
  useEffect(() => {
    if (!visible) return

    pushDialog(id, onDismiss)

    return () => {
      removeDialog(id)
    }
  }, [visible, id, onDismiss])
}

export const Dialog: React.FC<DialogProps> = ({ children, visible, onDismiss }) => {
  const id = React.useRef(Math.random().toString(36).substring(2, 15)).current
  useDialogBackHandler(visible, id, onDismiss)

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
