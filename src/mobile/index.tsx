import * as React from 'react'

import { Icon } from '@/components/Icon'
import Footer from '@/desktop/Footer'
import LanguageSelect from '@/desktop/LanguageSelect'
import useScrollState from '@/hooks/useScrollState'
import type { Section } from '@/types'

import AboutLayout from './about'
import ContactLayout from './contact'
import Cover from './cover'
import EducationLayout from './education'
import JourneyLayout from './journey'

export default function MobileLayout({
  section,
  setSection,
}: {
  section: Section
  setSection: (section: Section) => void
}) {
  const [showCover, setShowCover] = React.useState(true)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const { canScrollUp, canScrollDown } = useScrollState(scrollContainerRef)
  React.useEffect(() => {
    if (section !== 'cover') {
      setShowCover(false)
    }
  }, [section])

  const scrollToNextSection = (direction = 'down') => {
    const container = scrollContainerRef.current
    if (!container) return

    const sections = Array.from(container.querySelectorAll<HTMLElement>('[data-section]'))
    if (!sections.length) return

    const containerRect = container.getBoundingClientRect()

    let target: HTMLElement = direction === 'down' ? sections[sections.length - 1] : sections[0]
    for (
      let i = direction === 'down' ? 0 : sections.length - 1;
      i >= 0 && i < sections.length;
      i += direction === 'down' ? 1 : -1
    ) {
      const rect = sections[i].getBoundingClientRect()
      if (
        (direction === 'up' && rect.top < containerRect.top - 1) ||
        (direction === 'down' && rect.top > containerRect.top + 1)
      ) {
        target = sections[i]
        break
      }
    }

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <>
      <div className="fixed top-2 right-2 z-50 rounded-full border-1 border-gray-800 bg-gray-200 px-2 py-1 text-gray-800 opacity-80 shadow-2xl">
        <LanguageSelect color="currentColor" />
      </div>
      <div
        className={`relative flex h-full min-h-0 w-full flex-col overflow-hidden px-16 py-8 ${canScrollUp && canScrollDown ? 'fade-vertical' : canScrollUp ? 'fade-up' : canScrollDown ? 'fade-down' : ''}`}
      >
        <div
          ref={scrollContainerRef}
          className={`flex h-full min-h-0 w-full flex-col items-center gap-y-16 opacity-0 ${showCover ? '' : 'animate-[grow_1.5s_ease-out_2.5s_forwards]'} scrollbar-none overflow-y-auto`}
        >
          <AboutLayout />
          <JourneyLayout />
          <EducationLayout />
          <ContactLayout />
          <Footer />
        </div>
        <div
          className={`fixed top-0 bottom-0 left-0 flex w-16 py-8 opacity-0 ${showCover ? '' : 'animate-[grow_1.5s_ease-out_2.5s_forwards]'} flex-col justify-between`}
        >
          <div className="flex flex-1 flex-col items-center gap-y-2">
            <Icon
              name="double-arrow-up"
              size={24}
              color="white"
              onPress={() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            <Icon
              name="arrow-up"
              size={24}
              color="white"
              onPress={() => scrollToNextSection('up')}
            />
          </div>
          <div className="flex flex-1 flex-col items-center justify-end gap-y-2">
            <Icon
              name="arrow-down"
              size={24}
              color="white"
              onPress={() => scrollToNextSection('down')}
            />
            <Icon
              name="double-arrow-down"
              size={24}
              color="white"
              onPress={() =>
                scrollContainerRef.current?.scrollTo({
                  top: scrollContainerRef.current.scrollHeight,
                  behavior: 'smooth',
                })
              }
            />
          </div>
        </div>
        <Cover visible={showCover} onPress={() => setSection('about')}></Cover>
      </div>
    </>
  )
}
