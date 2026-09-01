import type { CaseInput, CaseOptions } from '../types.js'
import { normalizeCaseInput } from '../core/normalize.js'
import { getInitialCharacterSequence } from '../core/unicode.js'

// Derived from camelcase@9 by Sindre Sorhus (MIT). See LICENSE.
// This compatibility implementation is intentionally separate from the
// general-purpose splitter: camelcase does not treat `/` as a separator and
// has specific rules for numbers and acronyms.
const UPPERCASE = /[\p{Lu}]/u
const LOWERCASE = /[\p{Ll}]/u
const LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/u
const SEPARATORS = /[_.\- ]+/
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u

const LEADING_SEPARATORS = new RegExp(`^${SEPARATORS.source}`)
const SEPARATORS_AND_IDENTIFIER = new RegExp(
  `${SEPARATORS.source}${IDENTIFIER.source}`,
  'gu'
)
const NUMBERS_AND_IDENTIFIER = new RegExp(
  String.raw`\d+${IDENTIFIER.source}`,
  'gu'
)

type ChangeCase = (input: string) => string

function preserveCamelCase(
  input: string,
  toLowerCase: ChangeCase,
  toUpperCase: ChangeCase,
  preserveConsecutiveUppercase: boolean
): string {
  let result: string[] | undefined
  let isLastCharLower = false
  let isLastCharUpper = false
  let isLastLastCharUpper = false
  let isLastLastCharPreserved = false

  for (let index = 0; index < input.length; index++) {
    const character = input[index]!

    // Was the character three positions back an inserted separator?
    const outputLength = result?.length ?? index
    isLastLastCharPreserved = outputLength > 2
      ? (result?.[outputLength - 3] ?? input[index - 3]) === '-'
      : true

    if (isLastCharLower && UPPERCASE.test(character)) {
      result ??= input.slice(0, index).split('')
      result.push('-')
      isLastCharLower = false
      isLastLastCharUpper = isLastCharUpper
      isLastCharUpper = true
    } else if (
      isLastCharUpper
      && isLastLastCharUpper
      && LOWERCASE.test(character)
      && (!isLastLastCharPreserved || preserveConsecutiveUppercase)
    ) {
      result ??= input.slice(0, index).split('')
      const previousCharacter = result.pop()!
      result.push('-', previousCharacter)
      isLastLastCharUpper = isLastCharUpper
      isLastCharUpper = false
      isLastCharLower = true
    } else {
      isLastCharLower = toLowerCase(character) === character
        && toUpperCase(character) !== character
      isLastLastCharUpper = isLastCharUpper
      isLastCharUpper = toUpperCase(character) === character
        && toLowerCase(character) !== character
    }

    result?.push(character)
  }

  return result?.join('') ?? input
}

function preserveLeadingConsecutiveUppercase(
  input: string,
  toLowerCase: ChangeCase
): string {
  return input.replace(LEADING_CAPITAL, match => toLowerCase(match))
}

function processWithCasePreservation(
  input: string,
  toLowerCase: ChangeCase,
  preserveConsecutiveUppercase: boolean
): string {
  let result = ''
  let previousWasNumber = false
  let previousWasUppercase = false
  const characters = [...input]

  for (let index = 0; index < characters.length; index++) {
    const character = characters[index]!
    const isUpperCase = UPPERCASE.test(character)
    const nextCharIsUpperCase = index + 1 < characters.length
      && UPPERCASE.test(characters[index + 1]!)

    if (previousWasNumber && /[\p{Alpha}]/u.test(character)) {
      result += character
      previousWasNumber = false
      previousWasUppercase = isUpperCase
    } else if (
      preserveConsecutiveUppercase
      && isUpperCase
      && (previousWasUppercase || nextCharIsUpperCase)
    ) {
      result += character
      previousWasUppercase = true
    } else if (/\d/.test(character)) {
      result += character
      previousWasNumber = true
      previousWasUppercase = false
    } else if (SEPARATORS.test(character)) {
      result += character
      previousWasUppercase = false
    } else {
      result += toLowerCase(character)
      previousWasNumber = false
      previousWasUppercase = false
    }
  }

  return result
}

function postProcess(
  input: string,
  toUpperCase: ChangeCase,
  capitalizeAfterNumber: boolean
): string {
  const transformNumericIdentifier = capitalizeAfterNumber
    ? (match: string, identifier: string, offset: number, string: string) => {
        const nextCharacter = string.charAt(offset + match.length)

        if (SEPARATORS.test(nextCharacter)) {
          return match
        }

        return identifier
          ? match.slice(0, -identifier.length) + toUpperCase(identifier)
          : match
      }
    : (match: string) => match

  return input
    .replaceAll(NUMBERS_AND_IDENTIFIER, transformNumericIdentifier)
    .replaceAll(
      SEPARATORS_AND_IDENTIFIER,
      (_match, identifier: string) => toUpperCase(identifier)
    )
}

/**
 * Convert a string or array of strings to camelCase.
 *
 * Behavior and options are compatible with camelcase@9, except that PascalCase
 * output corrects supplementary-plane and combining-sequence capitalization.
 */
export function camelCase(input: CaseInput, options: CaseOptions = {}): string {
  return convertCamelCase(input, options, false)
}

/** @internal Used by pascalCase to avoid creating a second options object. */
export function convertToPascalCase(
  input: CaseInput,
  options: Omit<CaseOptions, 'pascalCase'> = {}
): string {
  return convertCamelCase(input, options, true)
}

function convertCamelCase(
  input: CaseInput,
  options: CaseOptions | Omit<CaseOptions, 'pascalCase'>,
  forcePascalCase: boolean
): string {
  if (!(typeof input === 'string' || Array.isArray(input))) {
    throw new TypeError('Expected the input to be `string | string[]`')
  }

  const normalizedOptions = {
    pascalCase: false,
    preserveConsecutiveUppercase: false,
    capitalizeAfterNumber: true,
    ...options,
  }

  if (forcePascalCase) {
    normalizedOptions.pascalCase = true
  }

  let value = normalizeCaseInput(input).trim()

  if (value.length === 0) {
    return ''
  }

  let leadingPrefixLength = 0

  while (
    value.charCodeAt(leadingPrefixLength) === 0x5F
    || value.charCodeAt(leadingPrefixLength) === 0x24
  ) {
    leadingPrefixLength++
  }

  const leadingPrefix = value.slice(0, leadingPrefixLength)
  value = value.slice(leadingPrefixLength)

  if (value.length === 0) {
    return leadingPrefix
  }

  const locale = normalizedOptions.locale as string | string[] | undefined
  const toLowerCase = normalizedOptions.locale === false
    ? (string: string) => string.toLowerCase()
    : (string: string) => string.toLocaleLowerCase(locale)
  const toUpperCase = normalizedOptions.locale === false
    ? (string: string) => string.toUpperCase()
    : (string: string) => string.toLocaleUpperCase(locale)

  if (value.length === 1) {
    if (SEPARATORS.test(value)) {
      return leadingPrefix
    }

    return leadingPrefix + (normalizedOptions.pascalCase
      ? toUpperCase(value)
      : toLowerCase(value))
  }

  const lowercaseValue = toLowerCase(value)
  const hasUppercase = value !== lowercaseValue

  if (hasUppercase) {
    value = preserveCamelCase(
      value,
      toLowerCase,
      toUpperCase,
      normalizedOptions.preserveConsecutiveUppercase
    )
  }

  const lengthBeforeLeadingSeparators = value.length
  value = value.replace(LEADING_SEPARATORS, '')
  const lowercaseWithoutLeadingSeparators = hasUppercase
    ? ''
    : lowercaseValue.slice(lengthBeforeLeadingSeparators - value.length)

  if (normalizedOptions.capitalizeAfterNumber) {
    value = normalizedOptions.preserveConsecutiveUppercase
      ? preserveLeadingConsecutiveUppercase(value, toLowerCase)
      : hasUppercase
        ? toLowerCase(value)
        : lowercaseWithoutLeadingSeparators
  } else {
    value = processWithCasePreservation(
      value,
      toLowerCase,
      normalizedOptions.preserveConsecutiveUppercase
    )
  }

  if (normalizedOptions.pascalCase && value.length > 0) {
    const initialSequence = getInitialCharacterSequence(value)
    value = toUpperCase(initialSequence) + value.slice(initialSequence.length)
  }

  return leadingPrefix + postProcess(
    value,
    toUpperCase,
    normalizedOptions.capitalizeAfterNumber
  )
}
