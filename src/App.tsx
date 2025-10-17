import * as React from 'react'

import DesktopLayout from './desktop'
import useBreakpoints from './hooks/useBreakpoints'
import MobileLayout from './mobile'
import LocalizationProvider from './providers/localization/provider'
import type { Section } from './types'
import { colors } from './utils/styling'

function App() {
  const size = useBreakpoints()
  const [section, setSection] = React.useState<Section>('cover')
  const startColor = 'rgba(255, 255, 255, 0.2)'
  const endColor = colors.background.primary
  return (
    <div className={`bg-primary h-screen w-screen text-gray-50`}>
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
      <LocalizationProvider>
        {size === 'large' ? (
          <DesktopLayout section={section} setSection={setSection} />
        ) : (
          <MobileLayout section={section} setSection={setSection} />
        )}
      </LocalizationProvider>
    </div>
  )
}

export default App
