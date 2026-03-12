import { split } from '../core/split.js'
import { transform } from '../core/transform.js'
import type { CaseInput, CaseOptions } from '../types.js'

/**
 * Convert to camelCase
 *
 * 100% backward compatible with the camelcase package by Sindre Sorhus.
 *
 * @param input - String or array to convert
 * @param options - Conversion options
 * @returns camelCase string
 *
 * @example
 * camelCase('foo-bar')                     // 'fooBar'
 * camelCase('foo_bar')                     // 'fooBar'
 * camelCase('Foo-Bar')                     // 'fooBar'
 * camelCase(['foo', 'bar'])                // 'fooBar'
 * camelCase('foo-bar', { pascalCase: true }) // 'FooBar'
 * camelCase('розовый_пушистый')            // 'розовыйПушистый' (Unicode support)
 */
export function camelCase(input: CaseInput, options: CaseOptions = {}): string {
  // Handle array input (backward compatible)
  const str = Array.isArray(input)
    ? input
        .map(element => element.trim())
        .filter(element => element.length > 0)
        .join('-')
    : input.trim()

  // Handle empty string
  if (str.length === 0) {
    return ''
  }

  // Split into words
  const words = split(str)

  if (words.length === 0) {
    return ''
  }

  // Remove leading special characters for processing (but remember them)
  const firstWord = words[0]
  const leadingSpecial = firstWord?.match(/^[_$]+/)
  const leading = leadingSpecial ? leadingSpecial[0] : ''

  // Clean up words by removing leading/trailing special characters
  const cleanWords = words.map(word => word.replace(/^[_$]+|[_$]+$/g, ''))
    .filter(word => word.length > 0)

  if (cleanWords.length === 0) {
    return leading
  }

  // Transform words to camelCase
  // First word lowercase, rest capitalize first letter
  const result = cleanWords.map((word, index) => {
    const toLowerCase = options.locale === false
      ? (s: string) => s.toLowerCase()
      : (s: string) => s.toLocaleLowerCase(options.locale as string | string[] | undefined)

    const toUpperCase = options.locale === false
      ? (s: string) => s.toUpperCase()
      : (s: string) => s.toLocaleUpperCase(options.locale as string | string[] | undefined)

    if (index === 0 && !options.pascalCase) {
      // First word: lowercase
      return toLowerCase(word)
    } else {
      // Rest: capitalize first letter, lowercase rest
      return toUpperCase(word.charAt(0)) + toLowerCase(word.slice(1))
    }
  }).join('')

  return leading + result
}
