const LETTER = 1 << 0
const UPPERCASE = 1 << 1
const LOWERCASE = 1 << 2
const NUMBER = 1 << 3
const SEPARATOR = 1 << 4
const MARK = 1 << 5

const UNICODE_LETTER = /\p{L}/u
const UNICODE_UPPERCASE = /[\p{Lu}\p{Lt}]/u
const UNICODE_LOWERCASE = /\p{Ll}/u
const UNICODE_NUMBER = /\p{N}/u
const UNICODE_MARK = /\p{M}/u

function getCharacterWidth(input: string, index: number): number {
  const codeUnit = input.charCodeAt(index)

  return codeUnit >= 0xD800
    && codeUnit <= 0xDBFF
    && index + 1 < input.length
    && input.charCodeAt(index + 1) >= 0xDC00
    && input.charCodeAt(index + 1) <= 0xDFFF
    ? 2
    : 1
}

function getCharacterType(input: string, index: number): number {
  if (index >= input.length) {
    return 0
  }

  const codeUnit = input.charCodeAt(index)

  // ASCII fast path covers identifiers and every supported separator.
  if (codeUnit <= 0x7F) {
    if (
      codeUnit === 0x20 // space
      || codeUnit === 0x2D // -
      || codeUnit === 0x2E // .
      || codeUnit === 0x2F // /
      || codeUnit === 0x5F // _
    ) {
      return SEPARATOR
    }

    if (codeUnit >= 0x41 && codeUnit <= 0x5A) {
      return LETTER | UPPERCASE
    }

    if (codeUnit >= 0x61 && codeUnit <= 0x7A) {
      return LETTER | LOWERCASE
    }

    if (codeUnit >= 0x30 && codeUnit <= 0x39) {
      return NUMBER
    }

    return 0
  }

  const character = String.fromCodePoint(input.codePointAt(index)!)

  if (UNICODE_LETTER.test(character)) {
    if (UNICODE_UPPERCASE.test(character)) {
      return LETTER | UPPERCASE
    }
    if (UNICODE_LOWERCASE.test(character)) {
      return LETTER | LOWERCASE
    }

    return LETTER
  }

  if (UNICODE_NUMBER.test(character)) {
    return NUMBER
  }

  return UNICODE_MARK.test(character) ? MARK : 0
}

function getNextBoundaryType(input: string, index: number, type: number): number {
  while ((type & MARK) !== 0) {
    index += getCharacterWidth(input, index)
    type = getCharacterType(input, index)
  }

  return type
}

function isWordBoundary(
  previousType: number,
  currentType: number,
  nextType: number
): boolean {
  return (
    ((previousType & (LOWERCASE | NUMBER)) !== 0
      && (currentType & UPPERCASE) !== 0)
    || ((previousType & UPPERCASE) !== 0
      && (currentType & UPPERCASE) !== 0
      && (nextType & LOWERCASE) !== 0)
    || ((previousType & LETTER) !== 0
      && (currentType & NUMBER) !== 0)
    || ((previousType & NUMBER) !== 0
      && (currentType & LETTER) !== 0)
  )
}

/**
 * Split a string into words in one pass.
 *
 * Handles camelCase, PascalCase, acronyms, separators, Unicode case
 * boundaries, and letter/number boundaries without allocating intermediate
 * replacement strings.
 */
export function split(input: string): string[] {
  if (input.length === 0) {
    return []
  }

  let leadingEnd = 0

  while (
    input.charCodeAt(leadingEnd) === 0x5F
    || input.charCodeAt(leadingEnd) === 0x24
  ) {
    leadingEnd++
  }

  let trailingStart = input.length

  while (
    input.charCodeAt(trailingStart - 1) === 0x5F
    || input.charCodeAt(trailingStart - 1) === 0x24
  ) {
    trailingStart--
  }

  const leadingLength = leadingEnd
  const trailingLength = input.length - trailingStart

  if (
    leadingLength > 0
    && trailingLength > 0
    && leadingLength + trailingLength >= input.length
  ) {
    return [input]
  }

  const leading = leadingLength > 0 ? input.slice(0, leadingEnd) : ''
  const trailing = trailingLength > 0 ? input.slice(trailingStart) : ''
  const processed = input.slice(leadingEnd, trailingStart)
  const words: string[] = []
  let wordStart = 0
  let previousType = 0
  let currentType = getCharacterType(processed, 0)

  for (let index = 0; index < processed.length;) {
    const width = getCharacterWidth(processed, index)
    const nextIndex = index + width

    if ((currentType & SEPARATOR) !== 0) {
      if (wordStart < index) {
        words.push(processed.slice(wordStart, index))
      }

      wordStart = nextIndex
      previousType = 0
      index = nextIndex
      currentType = getCharacterType(processed, index)
      continue
    }

    const nextType = getCharacterType(processed, nextIndex)
    const needsBoundaryLookahead = (previousType & UPPERCASE) !== 0
      && (currentType & UPPERCASE) !== 0
    const nextBoundaryType = needsBoundaryLookahead
      ? getNextBoundaryType(processed, nextIndex, nextType)
      : nextType

    if (
      wordStart < index
      && isWordBoundary(previousType, currentType, nextBoundaryType)
    ) {
      words.push(processed.slice(wordStart, index))
      wordStart = index
    }

    if ((currentType & MARK) === 0) {
      previousType = currentType
    }
    index = nextIndex
    currentType = nextType
  }

  if (wordStart < processed.length) {
    words.push(processed.slice(wordStart))
  }

  if (words.length === 0) {
    return leading || trailing ? [leading + trailing] : []
  }

  if (leading) {
    words[0] = leading + words[0]!
  }
  if (trailing) {
    const lastIndex = words.length - 1
    words[lastIndex] = words[lastIndex]! + trailing
  }

  return words
}
