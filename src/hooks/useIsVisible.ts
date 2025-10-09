import * as React from 'react'

export default function useIsVisible<T extends HTMLElement = HTMLElement>(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = React.useState(false)
  const ref = React.useRef<T>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  return { ref, isVisible }
}
