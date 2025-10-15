import * as React from 'react'

import useLanguage from '@/hooks/useLanguage'
import useScrollState from '@/hooks/useScrollState'
import type { Section } from '@/types'

import AboutLayout from './about'
import Cover from './cover'

export default function MobileLayout({
  section,
  setSection,
}: {
  section: Section
  setSection: (section: Section) => void
}) {
  const [showCover, setShowCover] = React.useState(true)
  const { language, setLanguage } = useLanguage()
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const { canScrollUp, canScrollDown } = useScrollState(scrollContainerRef)
  React.useEffect(() => {
    if (section !== 'cover') {
      setShowCover(false)
    }
  }, [section])
  return (
    <div
      className={`relative flex h-full min-h-0 w-full flex-col overflow-hidden px-8 py-8 sm:px-16 md:px-16 lg:px-24 xl:px-32 ${canScrollUp && canScrollDown ? 'fade-vertical' : canScrollUp ? 'fade-up' : canScrollDown ? 'fade-down' : ''}`}
    >
      <div
        ref={scrollContainerRef}
        className={`flex h-full min-h-0 w-full flex-col items-center opacity-0 ${showCover ? '' : 'animate-[grow_1.5s_ease-out_2.5s_forwards]'} scrollbar-none overflow-y-auto`}
      >
        <AboutLayout />
      </div>
      <Cover visible={showCover} onPress={() => setSection('about')}></Cover>
    </div>
  )
}
