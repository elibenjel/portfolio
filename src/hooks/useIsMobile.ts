import * as React from 'react'

export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )

  React.useEffect(() => {
    const handler = () => {
      // 🔒 Ignore resize events when fullscreen is active
      if (document.fullscreenElement) return

      setIsMobile(window.innerWidth < breakpoint)
    }

    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])

  return isMobile
}
