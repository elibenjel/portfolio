import * as React from 'react'

let language = 'fr'

export default function useLanguage() {
  const [, setLanguageChangedAt] = React.useState(Date.now())
  return {
    language: language as 'fr' | 'en',
    setLanguage: (lang: 'fr' | 'en') => {
      language = lang
      setLanguageChangedAt(Date.now())
    },
  }
}
