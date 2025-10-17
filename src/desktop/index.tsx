import * as React from 'react'

import type { Section } from '@/types'

import Footer from './Footer'
import LanguageSelect from './LanguageSelect'
import Sections from './Sections'
import AboutLayout from './about'
import ContactLayout from './contact'
import Cover from './cover'
import EducationLayout from './education'
import JourneyLayout from './journey'

export default function DesktopLayout({
  section,
  setSection,
}: {
  section: Section
  setSection: (section: Section) => void
}) {
  const [showCover, setShowCover] = React.useState(true)
  React.useEffect(() => {
    if (section !== 'cover') {
      setShowCover(false)
    }
  }, [section])

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="animate-fade animate-duration-2000 flex h-[100px] w-full flex-row items-center">
        <div className="h-0.5 flex-4 bg-white opacity-50" />
        <div className="flex-3" />
        <div className="flex flex-4 flex-row justify-between gap-4 text-xs sm:text-sm md:text-base lg:text-lg">
          <Sections selected={section} onPress={setSection} />
        </div>
        <div className="flex-1" />
      </div>
      <div className="relative min-h-0 w-full flex-1 px-8 sm:px-16 md:px-16 lg:px-24 xl:px-32">
        <div
          className={`flex h-full min-h-0 w-full flex-col items-center ${showCover ? '' : 'animate-[grow_1.5s_ease-out_2.5s_forwards] opacity-0'}`}
        >
          {section === 'about' && <AboutLayout />}
          {section === 'journey' && <JourneyLayout />}
          {section === 'education' && <EducationLayout />}
          {section === 'contact' && <ContactLayout />}
        </div>
        <Cover visible={showCover} onPress={() => setSection('about')}></Cover>
      </div>
      <div className="animate-fade animate-duration-2000 flex h-[100px] w-full flex-row items-center">
        <div className="flex flex-6 items-center space-x-4 pl-8">
          <LanguageSelect />
          <Footer />
        </div>
        <div className="h-0.5 flex-4 bg-white opacity-50" />
      </div>
    </div>
  )
}
