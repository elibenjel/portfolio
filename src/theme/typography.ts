/**
 * Typography theme settings for the application.
 *
 * This file defines a set of typography tokens that can be used throughout the application,
 * for texts, headings and paragraphs.
 *
 * Each token is a tailwindcss utility class, or a combination of classes.
 */
import { tw } from '../utils/styling'

export const typography = {
  // Headings
  heading: {
    h1: tw`text-5xl font-bold`,
    h2: tw`text-4xl font-bold`,
    h3: tw`text-2xl font-semibold`,
  },
  // Paragraphs
  paragraph: {
    normal: tw`text-base`,
    small: tw`text-sm`,
  },

  // Links
  link: {
    normal: tw`text-blue-400 hover:text-blue-600 underline`,
  },
}
