import { useLanguage } from '@/hooks/useLanguage'
import type { Section } from '@/types'

export type SectionProps = {
  selected: Section
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
  education: {
    fr: 'Formation',
    en: 'Education',
  },
  contact: {
    fr: 'Contact',
    en: 'Contact',
  },
}

export default function Sections({ selected, onPress }: SectionProps) {
  const { language } = useLanguage()
  return (
    <>
      {Object.entries(sections).map(([section, value]) => (
        <button
          key={section}
          className={`link-normal text-nowrap ${selected === section ? 'selected' : ''}`}
          onClick={() => onPress(section as Section)}
        >
          {value[language]}
        </button>
      ))}
    </>
  )
}
