import { camelCase } from './camel.js'
import type { CaseInput, CaseOptions } from '../types.js'

/**
 * Convert to PascalCase
 *
 * Alias for camelCase with pascalCase option set to true.
 *
 * @param input - String or array to convert
 * @param options - Conversion options (pascalCase option is ignored)
 * @returns PascalCase string
 *
 * @example
 * pascalCase('foo-bar')       // 'FooBar'
 * pascalCase('foo_bar')       // 'FooBar'
 * pascalCase(['foo', 'bar'])  // 'FooBar'
 */
export function pascalCase(
  input: CaseInput,
  options: Omit<CaseOptions, 'pascalCase'> = {}
): string {
  return camelCase(input, { ...options, pascalCase: true })
}
