import * as React from 'react'

export default function useScrollState(ref: React.RefObject<HTMLDivElement | null>) {
  const [, setScrolledAt] = React.useState(Date.now())
  React.useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('scroll', () => {
        setScrolledAt(Date.now())
      })
    }
  }, [ref])

  if (ref.current) {
    return {
      ref,
      canScrollLeft: ref.current.scrollLeft > 0,
      canScrollRight: ref.current.scrollLeft < ref.current.scrollWidth - ref.current.clientWidth,
      canScrollUp: ref.current.scrollTop > 0,
      canScrollDown: ref.current.scrollTop < ref.current.scrollHeight - ref.current.clientHeight,
    }
  }

  return { ref, canScrollLeft: false, canScrollRight: false }
}
