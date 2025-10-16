import * as React from 'react'

import { Dialog } from './Dialog'

export default function Image({ src, alt, className, ...props }: React.ComponentProps<'img'>) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const openDialog = () => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in transition-transform hover:scale-105 ${className ?? ''}`}
        onClick={openDialog}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: '0.5rem',
          ...props.style,
        }}
        {...props}
      />
      <Dialog visible={isDialogOpen} onDismiss={closeDialog}>
        <div
          className="bg-primary flex h-screen w-screen cursor-zoom-out items-center justify-center"
          onClick={closeDialog}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-full max-w-full object-contain"
            onClick={closeDialog}
          />
        </div>
      </Dialog>
    </>
  )
}
