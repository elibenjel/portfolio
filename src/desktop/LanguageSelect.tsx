import { Icon } from '@/components/Icon'
import useLocalization from '@/providers/localization/hook'

const languages = {
  fr: 'Français',
  en: 'English',
}

export default function LanguageSelect({ color = 'white' }: { color?: string }) {
  const { language, setLanguage } = useLocalization()
  return (
    <div className="flex flex-row items-center space-x-1">
      <Icon
        name="language"
        size={24}
        color={color}
        onPress={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
      />
      <p className="text-sm" style={{ color }}>
        {'-'}
      </p>
      <p className="text-sm" style={{ color }}>
        {languages[language]}
      </p>
    </div>
  )
}
