import type { TransformOptions } from '../types.js'

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
          transformed = toUpperCase(word.charAt(0), locale)
            + toLowerCase(word.slice(1), locale)
          break
        case 'preserve':
          break
      }

      if (index === 0 && capitalizeFirst) {
        transformed = toUpperCase(transformed.charAt(0), locale)
          + transformed.slice(1)
      } else if (index > 0 && capitalizeAll) {
        transformed = toUpperCase(transformed.charAt(0), locale)
          + transformed.slice(1)
      }
    }

    if (index > 0) {
      result += separator
    }
    result += transformed
  }

  return result
}
