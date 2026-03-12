/**
 * Case conversion options (backward compatible with camelcase package)
 */
export interface CaseOptions {
  /**
   * Convert to PascalCase instead of camelCase
   * @default false
   */
  pascalCase?: boolean

  /**
   * Preserve consecutive uppercase letters
   * Example: 'fooBAR' instead of 'fooBar'
   * @default false
   */
  preserveConsecutiveUppercase?: boolean

  /**
   * Capitalize letters after numbers
   * Example: 'foo2Bar' instead of 'foo2bar'
   * @default true
   */
  capitalizeAfterNumber?: boolean

  /**
   * Locale for case conversion
   * @default Host environment locale
   */
  locale?: string | string[] | false
}

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
   * Capitalize all words
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
export type CaseInput = string | string[]
