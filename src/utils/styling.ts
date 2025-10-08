/**
 * Get CSS custom property value from the document root
 * @param propertyName The CSS custom property name (without --)
 * @returns The computed value of the CSS custom property
 */
export const getCSSVariable = (propertyName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${propertyName}`).trim()
}

/**
 * Color tokens accessible in JavaScript
 * These correspond to the CSS custom properties defined in style.css
 * Only use these when you need the actual color values (e.g., for SVG styling)
 */
export const colors = {
  background: {
    primary: getCSSVariable('color-bg-primary'),
    secondary: getCSSVariable('color-bg-secondary'),
  },
  accent: {
    cyan: getCSSVariable('color-accent-cyan'),
    magenta: getCSSVariable('color-accent-magenta'),
    purple: getCSSVariable('color-accent-purple'),
  },
} as const

/**
 * Typography tokens accessible in JavaScript
 * These correspond to the CSS custom properties defined in style.css
 * Only use these when you need the actual typography values (e.g., for canvas, SVG text, or dynamic styling)
 */
export const typography = {
  fontFamily: {
    serif: getCSSVariable('font-family-serif'),
    sans: getCSSVariable('font-family-sans'),
  },
  fontSize: {
    h1: getCSSVariable('font-size-h1'),
    h2: getCSSVariable('font-size-h2'),
    h3: getCSSVariable('font-size-h3'),
    normal: getCSSVariable('font-size-normal'),
    small: getCSSVariable('font-size-small'),
  },
  fontWeight: {
    normal: getCSSVariable('font-weight-normal'),
    semibold: getCSSVariable('font-weight-semibold'),
    bold: getCSSVariable('font-weight-bold'),
  },
} as const
