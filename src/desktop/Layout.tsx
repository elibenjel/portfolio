import type { Section } from '@/types'

import Sidebar from './Sections'
import About from './about/Layout'
import Contact from './contact/Layout'
import Journey from './journey/Layout'

export default function Layout({
  section,
  renderSections,
}: {
  section: Section
  renderSections: () => React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar>{renderSections()}</Sidebar>
      {section === 'about' && <About />}
      {section === 'journey' && <Journey />}
      {section === 'contact' && <Contact />}
    </div>
  )
}
