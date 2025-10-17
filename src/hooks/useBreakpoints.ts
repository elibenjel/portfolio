import * as React from 'react'

export type Size = 'large' | 'medium' | 'small'

const getSize = (width: number, height: number) =>
  width < 600 ? 'small' : width < 1000 || height < 680 ? 'medium' : 'large'

export default function useBreakpoints(breakpoint = { width: 1000, height: 680 }) {
  const [size, setSize] = React.useState<Size>(
    typeof window !== 'undefined' ? getSize(window.innerWidth, window.innerHeight) : 'small'
  )

  React.useEffect(() => {
    const handler = () => {
      // 🔒 Ignore resize events when fullscreen is active
      if (document.fullscreenElement) return

      setSize(getSize(window.innerWidth, window.innerHeight))
    }

    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])

  return size
}
