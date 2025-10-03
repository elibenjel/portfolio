import * as React from 'react'

import { colors } from '@/theme/colors'
import { mergeClassNames } from '@/utils/styling'

import DesktopLayout from './desktop/Layout'
import { useIsMobile } from './hooks/useIsMobile'
import MobileLayout from './mobile/Layout'
import Sections from './shared/Sections'
import type { Section } from './types'

function App() {
  const isMobile = useIsMobile()
  const [section, setSection] = React.useState<Section>('journey')
  return (
    <div className={mergeClassNames(colors.background.primary, colors.text.primary)}>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout section={section} renderSections={() => <Sections onPress={setSection} />} />
      )}
    </div>
  )
}

export default App
