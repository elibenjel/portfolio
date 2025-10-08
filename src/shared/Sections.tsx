import { useLanguage } from '@/hooks/useLanguage'
import type { Section } from '@/types'

export type SectionProps = {
  onPress: (section: Section) => void
}

const sections = {
  cover: {
    fr: 'Accueil',
    en: 'Cover',
  },
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

export default function Sections({ onPress }: SectionProps) {
  const { language } = useLanguage()
  return (
    <>
      {Object.entries(sections).map(([section, value]) => (
        <button key={section} className="link-normal" onClick={() => onPress(section as Section)}>
          {value[language]}
        </button>
      ))}
    </>
  )
}
