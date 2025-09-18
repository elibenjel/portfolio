let language = 'fr'

export const useLanguage = () => {
  return {
    language: language as 'fr' | 'en',
    setLanguage: (lang: 'fr' | 'en') => {
      language = lang
    },
  }
}
