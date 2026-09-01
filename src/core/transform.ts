import type { TransformOptions } from '../types.js'
import { getInitialCharacterSequence } from './unicode.js'

type Locale = string | string[] | false | undefined

function toLowerCase(input: string, locale: Locale): string {
  return locale === false
    ? input.toLowerCase()
    : input.toLocaleLowerCase(locale)
}

function toUpperCase(input: string, locale: Locale): string {
  return locale === false
    ? input.toUpperCase()
    : input.toLocaleUpperCase(locale)
}

function capitalize(input: string, locale: Locale, lowercaseRest: boolean): string {
  const initialSequence = getInitialCharacterSequence(input)
  let rest = input.slice(initialSequence.length)

  if (lowercaseRest) {
    const lowercased = toLowerCase(input, locale)
    const hasAsciiInitial = initialSequence.length === 1
      && initialSequence.charCodeAt(0) <= 0x7F

    if (hasAsciiInitial) {
      rest = lowercased.slice(1)
    } else {
      const lowercasedInitial = toLowerCase(initialSequence, locale)
      rest = lowercased.startsWith(lowercasedInitial)
        ? lowercased.slice(lowercasedInitial.length)
        : toLowerCase(rest, locale)
    }
  }

  return toUpperCase(initialSequence, locale)
    + rest
}

/**
 * Transform words according to the requested case and separator.
 */
export function transform(
  words: readonly string[],
  options: TransformOptions
): string {
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
  let result = ''

  for (let index = 0; index < words.length; index++) {
    const word = words[index]!
    let transformed = word

    if (word.length > 0) {
      switch (caseType) {
        case 'lower':
          transformed = toLowerCase(word, locale)
          break
        case 'upper':
          transformed = toUpperCase(word, locale)
          break
        case 'capital':
          transformed = capitalize(word, locale, true)
          break
        case 'preserve':
          break
      }

      if (index === 0 && capitalizeFirst) {
        transformed = capitalize(transformed, locale, false)
      } else if (index > 0 && capitalizeAll) {
        transformed = capitalize(transformed, locale, false)
      }
    }

    if (index > 0) {
      result += separator
    }
    result += transformed
  }

  return result
}
