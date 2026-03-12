import {
  SEPARATORS,
  UPPERCASE_LOWERCASE,
  LOWERCASE_UPPERCASE,
  LETTER_NUMBER,
  NUMBER_LETTER,
  LEADING_SPECIAL,
  TRAILING_SPECIAL,
} from '../utils/constants.js'

/**
 * Split string into words
 *
 * Handles all common case formats:
 * - camelCase → ['camel', 'Case']
 * - PascalCase → ['Pascal', 'Case']
 * - snake_case → ['snake', 'case']
 * - kebab-case → ['kebab', 'case']
 * - CONSTANT_CASE → ['CONSTANT', 'CASE']
 * - foo2Bar → ['foo', '2', 'Bar']
 *
 * @param input - String to split
 * @returns Array of words
 *
 * @example
 * split('fooBar')        // ['foo', 'Bar']
 * split('foo-bar')       // ['foo', 'bar']
 * split('FOO_BAR')       // ['FOO', 'BAR']
 * split('foo2Bar')       // ['foo', '2', 'Bar']
 */
export function split(input: string): string[] {
  if (!input || input.length === 0) {
    return []
  }

  // Preserve leading/trailing special characters (they have semantic meaning)
  const leadingMatch = input.match(LEADING_SPECIAL)
  const trailingMatch = input.match(TRAILING_SPECIAL)
  const leading = leadingMatch ? leadingMatch[0] : ''
  const trailing = trailingMatch ? trailingMatch[0] : ''

  // Handle edge case: input is only special characters
  if (leading && trailing && leading.length + trailing.length >= input.length) {
    return [input]
  }

  // Strip leading/trailing for processing
  let processed = input.slice(leading.length)
  if (trailing) {
    processed = processed.slice(0, -trailing.length)
  }

  // Insert hyphens at word boundaries
  processed = processed
    .replace(UPPERCASE_LOWERCASE, '$1-$2')  // FOOBar → FOO-Bar
    .replace(LOWERCASE_UPPERCASE, '$1-$2')  // fooBar → foo-Bar
    .replace(LETTER_NUMBER, '$1-$2')        // foo2Bar → foo-2Bar
    .replace(NUMBER_LETTER, '$1-$2')        // foo-2Bar → foo-2-Bar

  // Split on separators and filter empty strings
  const words = processed
    .split(SEPARATORS)
    .filter(word => word.length > 0)

  if (words.length === 0) {
    return leading || trailing ? [leading + trailing] : []
  }

  // Add back leading/trailing if present
  if (leading) {
    words[0] = leading + words[0]
  }
  if (trailing) {
    words[words.length - 1] = words[words.length - 1] + trailing
  }

  return words
}
