import * as React from 'react'

import LocalizationContext, { type Language } from './context'

export default function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>('fr')
  return (
    <LocalizationContext.Provider value={{ language, setLanguage }}>
      {children}
    </LocalizationContext.Provider>
  )
}
