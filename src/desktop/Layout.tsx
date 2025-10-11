import * as React from 'react'

import { Icon } from '@/components/Icon'
import type { Section } from '@/types'
import { colors } from '@/utils/styling'

import About from './about/Layout'
import Contact from './contact/Layout'
import Cover from './cover/Layout'
import Education from './education/Layout'
import Journey from './journey/Layout'

export default function Layout({
  section,
  renderSections,
  setSection,
}: {
  section: Section
  renderSections: () => React.ReactNode
  setSection: (section: Section) => void
}) {
  const startColor = 'rgba(255, 255, 255, 0.2)'
  const endColor = colors.background.primary
  const [showCover, setShowCover] = React.useState(true)
  React.useEffect(() => {
    if (section !== 'cover') {
      setShowCover(false)
    }
  }, [section])

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="pointer-events-none absolute inset-0 h-full w-full">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={startColor} stopOpacity="1" />
              <stop offset="100%" stopColor={endColor} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={startColor} stopOpacity="1" />
              <stop offset="100%" stopColor={endColor} stopOpacity="0" />
            </radialGradient>

            <filter id="blur">
              <feGaussianBlur stdDeviation="80" />
            </filter>
          </defs>

          {/* Top-left halo */}
          <circle cx="0" cy="100" r="300" fill="url(#grad1)" />

          {/* Bottom-right halo */}
          <circle cx="600" cy="500" r="300" fill="url(#grad2)" />
        </svg>
      </div>

      <div className="animate-fade animate-duration-2000 flex h-[100px] w-full flex-row items-center">
        <div className="h-0.5 flex-4 bg-white opacity-50" />
        <div className="flex-3" />
        <div className="flex flex-4 flex-row justify-between gap-4 text-xs sm:text-sm md:text-base lg:text-lg">
          {renderSections()}
        </div>
        <div className="flex-1" />
      </div>
      <div className="relative min-h-0 w-full flex-1 px-8 sm:px-16 md:px-16 lg:px-24 xl:px-32">
        {
          <div
            className={`flex h-full min-h-0 w-full flex-col items-center transition-all delay-500 duration-1500 ease-in-out ${showCover ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}
          >
            {section === 'about' && <About />}
            {section === 'journey' && <Journey />}
            {section === 'education' && <Education />}
            {section === 'contact' && <Contact />}
          </div>
        }
        <Cover visible={showCover} onPress={() => setSection('about')}></Cover>
      </div>
      <div className="animate-fade animate-duration-2000 flex h-[100px] w-full flex-row items-center">
        <div className="flex flex-6 space-x-4 pl-8">
          <Icon name="linkedin" size={24} onPress={() => console.log('linkedin')} />
          <Icon name="github" size={24} onPress={() => console.log('github')} />
          <Icon name="link" size={24} onPress={() => console.log('link')} />
        </div>
        <div className="h-0.5 flex-4 bg-white opacity-50" />
      </div>
    </div>
  )
}
