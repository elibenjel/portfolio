import { useLanguage } from '@/hooks/useLanguage'
import { typography } from '@/theme/typography'
import type { Section } from '@/types'

export type SectionProps = {
  onPress: (section: Section) => void
}

const sections = {
  about: {
    fr: 'À propos',
    en: 'About',
  },
  journey: {
    fr: 'Expériences',
    en: 'Work',
  },
  contact: {
    fr: 'Contact',
    en: 'Contact',
  },
}

export default function Sections({ onPress }: SectionProps) {
  const { language } = useLanguage()
  return (
    <nav className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2 items-start">
        {Object.entries(sections).map(([section, value]) => (
          <button className={typography.link.normal} onClick={() => onPress(section as Section)}>
            {value[language]}
          </button>
        ))}
      </div>
    </nav>
  )
}
