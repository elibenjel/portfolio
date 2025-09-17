/**
 * Color palette for the application.
 *
 * This file defines a set of color token that can be used throughout the application,
 * for texts, backgrounds and borders, and icons.
 *
 * Each token is a tailwindcss color class.
 */
import { tw } from '../utils/styling'

export const colors = {
  // background colors
  background: {
    primary: {
      light: tw`bg-gray-300`,
      medium: tw`bg-gray-600`,
      dark: tw`bg-gray-900`,
    },
  },
  // text colors
  text: {
    onPrimaryLight: tw`text-gray-700`,
    onPrimaryMedium: tw`text-gray-100`,
    onPrimaryDark: tw`text-gray-50`,
  },
}
