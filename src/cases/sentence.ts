import { split } from '../core/split.js'
import { transform } from '../core/transform.js'
import type { CaseInput } from '../types.js'

/**
 * Convert to Sentence case
 *
 * @param input - String or array to convert
 * @returns Sentence case string
 *
 * @example
 * sentenceCase('fooBar')         // 'Foo bar'
 * sentenceCase('foo-bar')        // 'Foo bar'
 * sentenceCase(['foo', 'bar'])   // 'Foo bar'
 */
export function sentenceCase(input: CaseInput): string {
  const str = Array.isArray(input) ? input.join('-') : input

  if (!str || str.length === 0) {
    return ''
  }

  const words = split(str)

  return transform(words, {
    case: 'lower',
    separator: ' ',
    capitalizeFirst: true,
  })
}
