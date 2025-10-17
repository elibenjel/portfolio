import * as React from 'react'

export type Language = 'fr' | 'en'

export type LocalizationContextType = {
  language: Language
  setLanguage: (language: Language) => void
}

const LocalizationContext = React.createContext<LocalizationContextType>({
  language: 'fr' as Language,
  setLanguage: () => {},
})

export default LocalizationContext
