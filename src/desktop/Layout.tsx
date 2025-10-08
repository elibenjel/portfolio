import GithubIcon from '@/components/icons/GithubIcon'
import LinkIcon from '@/components/icons/LinkIcon'
import LinkedinIcon from '@/components/icons/LinkedinIcon'
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
}: {
  section: Section
  renderSections: () => React.ReactNode
}) {
  const startColor = 'rgba(255, 255, 255, 0.2)'
  const endColor = colors.background.primary
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

      <div
        className="flex h-[100px] w-full flex-row items-center"
        onClick={() => console.log('clicked')}
      >
        <div className="h-0.5 flex-4 bg-white opacity-50" />
        <div className="flex-3" />
        <div className="flex flex-4 flex-row justify-between gap-4 text-xs sm:text-sm md:text-base lg:text-lg">
          {renderSections()}
        </div>
        <div className="flex-1" />
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col items-center px-8 sm:px-16 md:px-16 lg:px-24 xl:px-32">
        {section === 'cover' && <Cover />}
        {section === 'about' && <About />}
        {section === 'journey' && <Journey />}
        {section === 'education' && <Education />}
        {section === 'contact' && <Contact />}
      </div>
      <div className="flex h-[100px] w-full flex-row items-center">
        <div className="flex flex-6 space-x-4 pl-8">
          <a href="#" aria-label="LinkedIn">
            <LinkedinIcon className="h-6 w-6 text-gray-400 hover:text-white" />
          </a>
          <a href="#" aria-label="GitHub">
            <GithubIcon className="h-6 w-6 text-gray-400 hover:text-white" />
          </a>
          <a href="#" aria-label="Personal Website">
            <LinkIcon className="h-6 w-6 text-gray-400 hover:text-white" />
          </a>
        </div>
        <div className="h-0.5 flex-4 bg-white opacity-50" />
      </div>
    </div>
  )
}
