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
    h1: tw`text-5xl font-bold font-['var(--font-family-serif)']`,
    h2: tw`text-4xl font-bold font-['var(--font-family-serif)']`,
    h3: tw`text-2xl font-semibold font-['var(--font-family-serif)']`,
  },
  // Paragraphs
  paragraph: {
    normal: tw`text-base font-['var(--font-family-sans)']`,
    small: tw`text-sm font-['var(--font-family-sans)']`,
  },

  // Links
  link: {
    normal: tw`text-gray-400 hover:text-white font-['var(--font-family-sans)']`,
  },
}
