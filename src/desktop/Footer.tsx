import { useLanguage } from '@/hooks/useLanguage'

export default function Footer() {
  const { language } = useLanguage()
  switch (language) {
    case 'fr':
      return (
        <p className="text-sm text-gray-500">
          Fait avec ❤️ en React - Crédits à Entypo, AntDesign, FontAwesome et MaterialCommunityIcons
          pour les icones
        </p>
      )
    case 'en':
      return (
        <p className="text-sm text-gray-500">
          Made with ❤️ using React - Icons taken from Entypo, AntDesign, FontAwesome and
          MaterialCommunityIcons
        </p>
      )
  }
}
