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
    primary: tw`bg-[#242020]`,
    secondary: tw`bg-[#1f1f1f]`,
    accent: {
      cyan: tw`bg-[#00c7b4]`,
      magenta: tw`bg-[#ff00a0]`,
      purple: tw`bg-[#a700ff]`,
    },
  },
  // text colors
  text: {
    primary: tw`text-gray-50`,
    secondary: tw`text-gray-400`,
    accent: {
      cyan: tw`text-[#00c7b4]`,
      magenta: tw`text-[#ff00a0]`,
      purple: tw`text-[#a700ff]`,
    },
  },
  // border colors
  border: {
    primary: tw`border-gray-700`,
  },
}
