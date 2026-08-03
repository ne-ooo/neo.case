---
name: anti-patterns
description: Common mistakes when using neo.case — chaining conversions, array input batch traps, number-boundary options, and pascalCase option confusion
version: "0.1.0"
globs:
  - "**/*.ts"
  - "**/*.js"
---

# Anti-Patterns for @lpm.dev/neo.case

### [CRITICAL] Using pathCase as a filesystem-path sanitizer

Wrong:

```typescript
const path = pathCase(userInput)
await readFile(path)
```

Correct:

```typescript
// Validate that the input is an allowed relative path and remains inside the
// intended root with a dedicated path-security check before filesystem use.
const path = pathCase(trustedIdentifier)
```

`pathCase()` formats words with `/`; it does not reject absolute paths, Windows drive prefixes, UNC paths, backslashes, traversal syntax, or control characters. Never treat case conversion as validation or containment.

Source: `src/cases/path.ts` — formatting only

### [HIGH] Chaining case conversions instead of converting directly

Wrong:

```typescript
const result = camelCase(snakeCase(input))
```

Correct:

```typescript
const result = camelCase(input)
```

Each function handles its documented input formats directly. The general splitter recognizes camelCase, PascalCase, snake_case, kebab-case, dot.case, path/case, CONSTANT_CASE, spaces, and mixed separators. `camelCase` follows `camelcase@9` exactly and therefore preserves `/`. Chaining does double work and can introduce subtle bugs with edge cases like acronyms or leading special characters.

Source: `src/core/split.ts` — unified splitter handles all formats

### [CRITICAL] Using array input expecting batch conversion

Wrong:

```typescript
// Expecting: ['fooBar', 'bazQux']
const results = camelCase(['foo_bar', 'baz_qux'])
// Actually gets: 'fooBarBazQux' (single string!)
```

Correct:

```typescript
const results = ['foo_bar', 'baz_qux'].map(s => camelCase(s))
// ['fooBar', 'bazQux']
```

Array input joins all elements with `-` then processes as a single string. `camelCase(['a', 'b'])` returns `'aB'`, not `['a', 'b']`. The return type is always `string`, never `string[]`. Use `.map()` for batch conversion.

Source: `src/cases/camel.ts:24-29` — array join behavior, maintainer interview

### [HIGH] Array elements with separators cause unexpected word counts

Wrong:

```typescript
camelCase(['foo_bar', 'baz'])
// Expects 2 words: 'fooBarBaz' with 'foo_bar' as one unit
// Gets 3 words: 'fooBarBaz' because '_' in 'foo_bar' is re-split
```

Correct:

```typescript
// If you want 'foo_bar' treated as a single unit, don't use array input
camelCase('foo_bar-baz')  // 'fooBarBaz' (3 words, explicit)

// Or pre-process to remove internal separators
const parts = ['fooBar', 'baz']  // already clean words
camelCase(parts)  // 'fooBarBaz'
```

Array elements are joined with `-`, then processed as one input. For `camelCase`, the compatible separators are `_`, `.`, `-`, and space; `/` is preserved to match `camelcase@9`. The other case functions also recognize `/` as a word boundary.

Source: `src/cases/camel.ts`, `src/core/split.ts`

### [HIGH] Assuming camelCase always capitalizes after numbers

Wrong:

```typescript
camelCase('user2factor', { capitalizeAfterNumber: false })
// Expecting: 'user2Factor'
```

Correct:

```typescript
camelCase('user2factor')
// 'user2Factor' — default behavior

camelCase('user2factor', { capitalizeAfterNumber: false })
// 'user2factor' — preserves the case after the number
```

The option follows `camelcase@9` semantics. It affects `camelCase` and `pascalCase`; the other case functions intentionally treat numbers as word boundaries.

Source: `src/cases/camel.ts` — camelcase@9-compatible number processing

### [HIGH] Expecting acronyms to be preserved without opting in

Wrong:

```typescript
camelCase('foo-BAR')
// Expecting: 'fooBAR'
// Actually: 'fooBar'
```

Correct:

```typescript
camelCase('foo-BAR', { preserveConsecutiveUppercase: true })
// 'fooBAR'
```

Use `preserveConsecutiveUppercase` when existing acronym casing is semantically important.

Source: `src/cases/camel.ts` — camelcase@9-compatible uppercase preservation

### [MEDIUM] Using camelCase with pascalCase option instead of pascalCase()

Wrong:

```typescript
camelCase('foo-bar', { pascalCase: true })
```

Correct:

```typescript
pascalCase('foo-bar')
```

Both produce `'FooBar'`, but `pascalCase()` is a dedicated function that wraps `camelCase` with the option. Using the option directly is confusing — readers have to mentally resolve what `camelCase` with `pascalCase: true` means. Use the named function for clarity.

Source: `src/cases/pascal.ts:18-23` — pascalCase wraps camelCase

### [MEDIUM] Importing all 10 functions when using only 1-2

Wrong:

```typescript
import { camelCase, pascalCase, snakeCase, kebabCase, constantCase,
         dotCase, pathCase, sentenceCase, titleCase, trainCase } from '@lpm.dev/neo.case'

const name = camelCase(input)
```

Correct:

```typescript
import { camelCase } from '@lpm.dev/neo.case'

const name = camelCase(input)
```

The package is tree-shakeable (`sideEffects: false`), so bundlers will eliminate unused imports. But importing everything adds code noise and signals the code wasn't written with intent. A single case function is approximately 1 KB gzipped with the shared Unicode-aware core; import only what you use.

Source: `package.json` — sideEffects: false, maintainer interview
