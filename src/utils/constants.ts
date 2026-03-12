/**
 * Regex patterns for word splitting and case detection
 */

/**
 * Separators: underscore, dot, hyphen, space, forward slash
 */
export const SEPARATORS = /[_.\-\/ ]+/

/**
 * Consecutive uppercase followed by uppercase + lowercase
 * Example: FOOBar → FOO-Bar
 */
export const UPPERCASE_LOWERCASE = /([A-Z]+)([A-Z][a-z])/g

/**
 * Lowercase/digit followed by uppercase
 * Example: fooBar → foo-Bar, foo2Bar → foo2-Bar
 */
export const LOWERCASE_UPPERCASE = /([a-z\d])([A-Z])/g

/**
 * Letter followed by digit
 * Example: foo2Bar → foo-2Bar
 */
export const LETTER_NUMBER = /([A-Za-z])(\d)/g

/**
 * Digit followed by letter
 * Example: foo2Bar → foo2-Bar
 */
export const NUMBER_LETTER = /(\d)([A-Za-z])/g

/**
 * Leading special characters (preserve these)
 */
export const LEADING_SPECIAL = /^[_$]+/

/**
 * Trailing special characters (preserve these)
 */
export const TRAILING_SPECIAL = /[_$]+$/

/**
 * Unicode uppercase letter
 */
export const UPPERCASE = /[\p{Lu}]/u

/**
 * Unicode lowercase letter
 */
export const LOWERCASE = /[\p{Ll}]/u
