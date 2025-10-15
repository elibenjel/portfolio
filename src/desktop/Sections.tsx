import { sections } from '@/constants'
import useLanguage from '@/hooks/useLanguage'
import type { Section } from '@/types'

export type SectionProps = {
  selected: Section
  onPress: (section: Section) => void
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
