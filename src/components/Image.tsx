import * as React from 'react'

export default function Image({ src, alt, className, ...props }: React.ComponentProps<'img'>) {
  const imgRef = React.useRef<HTMLImageElement | null>(null)

  const toggleFullscreen = () => {
    const el = imgRef.current
    if (!el) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      el.requestFullscreen().catch(err => {
        console.error('Failed to enter fullscreen:', err)
      })
    }
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`cursor-zoom-in transition-transform hover:scale-105 ${className ?? ''}`}
      onClick={toggleFullscreen}
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '0.5rem',
        ...props.style,
      }}
      {...props}
    />
  )
}
