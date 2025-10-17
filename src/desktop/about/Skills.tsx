import { Icon } from '@/components/Icon'
import type { SkillDomain } from '@/hooks/useData'
import useLocalization from '@/providers/localization/hook'

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

export default function Skills({
  domain,
  skills,
  variant = 'on-dark',
}: {
  domain: SkillDomain
  skills: string[]
  variant?: 'on-dark' | 'on-light'
}) {
  const { language } = useLocalization()
  const colors =
    variant === 'on-dark'
      ? {
          text: 'text-gray-400',
          icon: 'white',
          border: 'border-gray-700',
        }
      : {
          text: 'text-gray-800',
          icon: 'black',
          border: 'border-gray-400',
        }
  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`mb-8 flex w-full flex-row items-center justify-center gap-x-4 border-b ${colors.border}`}
      >
        <Icon name={iconNames[domain]} size={24} color={colors.icon} />
        <h3 className={`heading-h3 text-center text-nowrap ${colors.text}`}>
          {domains[language][domain]}
        </h3>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-4">
        {skills.map(skill => (
          <h4 key={skill} className={`${colors.text}`}>
            {skill}
          </h4>
        ))}
      </div>
    </div>
  )
}
