const UNICODE_MARK = /\p{M}/u

/** Return the first code point and all combining marks that follow it. */
export function getInitialCharacterSequence(input: string): string {
  const firstCodeUnit = input.charCodeAt(0)
  let end = firstCodeUnit >= 0xD800
    && firstCodeUnit <= 0xDBFF
    && input.charCodeAt(1) >= 0xDC00
    && input.charCodeAt(1) <= 0xDFFF
    ? 2
    : 1

  while (end < input.length) {
    if (input.charCodeAt(end) <= 0x7F) {
      break
    }

    const character = String.fromCodePoint(input.codePointAt(end)!)

    if (!UNICODE_MARK.test(character)) {
      break
    }

    end += character.length
  }

  return input.slice(0, end)
}
