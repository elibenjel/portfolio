import * as React from 'react'

export type Size = 'large' | 'medium' | 'small'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isSmall = (width: number, height: number) => width < 600
const isMedium = (width: number, height: number) => width < 1000 || height < 680
const getSize = (width: number, height: number) =>
  isSmall(width, height) ? 'small' : isMedium(width, height) ? 'medium' : 'large'

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
