/**
 * Case conversion options (API-compatible with the camelcase package)
 */
export interface CaseOptions {
  /**
   * Convert to PascalCase instead of camelCase
   * @default false
   */
  readonly pascalCase?: boolean

  /**
   * Preserve consecutive uppercase letters
   * Example: 'fooBAR' instead of 'fooBar'
   * @default false
   */
  readonly preserveConsecutiveUppercase?: boolean

  /**
   * Capitalize letters after numbers
   * Example: 'foo2Bar' instead of 'foo2bar'
   * @default true
   */
  readonly capitalizeAfterNumber?: boolean

  /**
   * Locale for case conversion
   * @default Host environment locale
   */
  readonly locale?: string | readonly string[] | false
}

/**
 * camelcase-compatible name for {@link CaseOptions}
 */
export type Options = CaseOptions

/**
 * Transform options for custom cases
 */
export interface TransformOptions {
  /**
   * Case transformation for each word
   */
  case: 'lower' | 'upper' | 'capital' | 'preserve'

  /**
   * Separator between words
   */
  separator: string

  /**
   * Capitalize first word
   * @default false
   */
  capitalizeFirst?: boolean

  /**
   * Capitalize every word after the first
   * @default false
   */
  capitalizeAll?: boolean

  /**
   * Locale for case conversion
   */
  locale?: string | string[] | false
}

/**
 * Input type for case functions
 */
export type CaseInput = string | readonly string[]
