/**
 * @lpm.dev/neo.case - Modern, comprehensive case conversion library
 *
 * Zero dependencies, TypeScript-first, tree-shakeable
 * 100% backward compatible with camelcase package
 *
 * @example
 * ```typescript
 * import { camelCase, snakeCase, kebabCase } from '@lpm.dev/neo.case'
 *
 * camelCase('foo-bar')   // 'fooBar'
 * snakeCase('fooBar')    // 'foo_bar'
 * kebabCase('FooBar')    // 'foo-bar'
 * ```
 */

// Re-export types
export type { CaseInput, CaseOptions, TransformOptions } from './types.js'

// Re-export core utilities (for advanced usage)
export { split } from './core/split.js'
export { transform } from './core/transform.js'

// Re-export all case conversion functions (tree-shakeable)
export { camelCase } from './cases/camel.js'
export { pascalCase } from './cases/pascal.js'
export { snakeCase } from './cases/snake.js'
export { kebabCase } from './cases/kebab.js'
export { constantCase } from './cases/constant.js'
export { dotCase } from './cases/dot.js'
export { pathCase } from './cases/path.js'
export { sentenceCase } from './cases/sentence.js'
export { titleCase } from './cases/title.js'
export { trainCase } from './cases/train.js'
