import { Icon } from '@/components/Icon'
import type { SkillDomain } from '@/hooks/useData'
import { useLanguage } from '@/hooks/useLanguage'

const domains = {
  fr: {
    web: 'Web',
    mobile: 'Mobile',
    'backend&api': 'Backend - API',
    databases: 'Bases de données',
    devops: 'Devops',
    soft: 'Qualités humaines',
  },
  en: {
    web: 'Web',
    mobile: 'Mobile',
    'backend&api': 'Backend - API',
    databases: 'Databases',
    devops: 'Devops',
    soft: 'Soft skills',
  },
}

const iconNames = {
  web: 'web',
  mobile: 'mobile',
  'backend&api': 'api',
  databases: 'database',
  devops: 'devops',
  soft: 'handshake',
} as const

export default function Skills({ domain, skills }: { domain: SkillDomain; skills: string[] }) {
  const { language } = useLanguage()
  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-8 flex w-full flex-row items-center justify-center gap-x-4 border-b border-gray-700">
        <Icon name={iconNames[domain]} size={24} color="white" />
        <h3 className="heading-h3 text-center">{domains[language][domain]}</h3>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-4">
        {skills.map(skill => (
          <h4 className="heading-h4 text-gray-400">{skill}</h4>
        ))}
      </div>
    </div>
  )
}
