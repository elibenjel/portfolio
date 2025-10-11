import * as React from 'react'

import DesktopLayout from './desktop/Layout'
import { useIsMobile } from './hooks/useIsMobile'
import MobileLayout from './mobile/Layout'
import Sections from './shared/Sections'
import type { Section } from './types'

function App() {
  const isMobile = useIsMobile()
  const [section, setSection] = React.useState<Section>('cover')
  return (
    <div className="bg-primary text-gray-50">
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout
          section={section}
          setSection={setSection}
          renderSections={() => <Sections selected={section} onPress={setSection} />}
        />
      )}
    </div>
  )
}

export default App
