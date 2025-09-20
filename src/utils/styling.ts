export const mergeClassNames = (...classes: (string | false | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

/**
 * Tagged template function to define tailwindcss classes in a type-safe way.
 * @param s Template string containing tailwindcss classes.
 * @returns
 */
export const tw = (s: TemplateStringsArray) => s[0]
