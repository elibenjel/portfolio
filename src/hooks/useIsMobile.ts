import * as React from 'react'

export default function useIsMobile(breakpoint = { width: 1000, height: 680 }) {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined'
      ? window.innerWidth < breakpoint.width || window.innerHeight < breakpoint.height
      : false
  )

  React.useEffect(() => {
    const handler = () => {
      // 🔒 Ignore resize events when fullscreen is active
      if (document.fullscreenElement) return

      setIsMobile(window.innerWidth < breakpoint.width || window.innerHeight < breakpoint.height)
    }

    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])

  return isMobile
}
