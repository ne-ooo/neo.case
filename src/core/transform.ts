import type { TransformOptions } from '../types.js'

/**
 * Transform words according to options
 *
 * @param words - Array of words
 * @param options - Transformation options
 * @returns Transformed string
 *
 * @example
 * transform(['foo', 'bar'], { case: 'lower', separator: '-' })  // 'foo-bar'
 * transform(['foo', 'bar'], { case: 'upper', separator: '_' })  // 'FOO_BAR'
 * transform(['foo', 'bar'], { case: 'capital', separator: ' ' }) // 'Foo Bar'
 */
export function transform(words: string[], options: TransformOptions): string {
  if (words.length === 0) {
    return ''
  }

  const {
    case: caseType,
    separator,
    capitalizeFirst = false,
    capitalizeAll = false,
    locale,
  } = options

  // Create locale-aware case conversion functions
  const toLowerCase = locale === false
    ? (str: string) => str.toLowerCase()
    : (str: string) => str.toLocaleLowerCase(locale)

  const toUpperCase = locale === false
    ? (str: string) => str.toUpperCase()
    : (str: string) => str.toLocaleUpperCase(locale)

  const transformedWords = words.map((word, index) => {
    if (word.length === 0) {
      return word
    }

    // Apply case transformation
    let transformed = word

    switch (caseType) {
      case 'lower':
        transformed = toLowerCase(word)
        break
      case 'upper':
        transformed = toUpperCase(word)
        break
      case 'capital':
        // Capitalize first letter, lowercase rest
        transformed = toUpperCase(word.charAt(0)) + toLowerCase(word.slice(1))
        break
      case 'preserve':
        // Keep original case
        transformed = word
        break
    }

    // Handle first word capitalization
    if (index === 0 && capitalizeFirst && transformed.length > 0) {
      transformed = toUpperCase(transformed.charAt(0)) + transformed.slice(1)
    }

    // Handle all words capitalization (except first if it was already handled)
    if (index > 0 && capitalizeAll && transformed.length > 0) {
      transformed = toUpperCase(transformed.charAt(0)) + transformed.slice(1)
    }

    return transformed
  })

  return transformedWords.join(separator)
}
