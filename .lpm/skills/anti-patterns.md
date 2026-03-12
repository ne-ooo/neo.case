---
name: anti-patterns
description: Common mistakes when using neo.case — chaining conversions, array input batch trap, number boundary splitting, unimplemented options, and pascalCase option confusion
version: "0.1.0"
globs:
  - "**/*.ts"
  - "**/*.js"
---

# Anti-Patterns for @lpm.dev/neo.case

### [HIGH] Chaining case conversions instead of converting directly

Wrong:

```typescript
const result = camelCase(snakeCase(input))
```

Correct:

```typescript
const result = camelCase(input)
```

Every case function already handles every input format. The splitter recognizes camelCase, PascalCase, snake_case, kebab-case, dot.case, path/case, CONSTANT_CASE, spaces, and mixed separators — all in one pass. Chaining does double work and can introduce subtle bugs with edge cases like acronyms or leading special characters.

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

Array elements are joined with `-`, then the splitter recognizes ALL separators (`_`, `.`, `-`, `/`, ` `) in the resulting string. Separators inside array elements create additional word boundaries.

Source: `src/core/split.ts` — splitter treats all separators equivalently, maintainer interview

### [HIGH] Expecting number-boundary options to work

Wrong:

```typescript
// Trying to prevent capitalization after numbers
camelCase('user2factor', { capitalizeAfterNumber: false })
// Still returns 'user2Factor' — option is silently ignored
```

Correct:

```typescript
// Accept that numbers always create word boundaries
camelCase('user2factor')    // 'user2Factor' — this is the only behavior
snakeCase('sha256hash')     // 'sha_256_hash'
kebabCase('v2api')          // 'v-2-api'

// If you need 'user2factor' unchanged, handle it outside the library
```

The `capitalizeAfterNumber` option exists in the TypeScript types but is never read by the implementation. Number boundaries are hardcoded in the regex splitter and cannot be disabled. This affects all 10 case functions.

Source: `src/core/split.ts:54-58` — LETTER_NUMBER and NUMBER_LETTER regexes, maintainer interview

### [HIGH] Expecting preserveConsecutiveUppercase to work

Wrong:

```typescript
camelCase('foo-BAR', { preserveConsecutiveUppercase: true })
// Returns 'fooBar' — BAR is lowercased regardless
```

Correct:

```typescript
// The option is accepted by TypeScript but silently ignored at runtime
camelCase('foo-BAR')  // 'fooBar' — always lowercases consecutive uppercase

// For acronym preservation, handle it yourself
const ACRONYMS = new Set(['URL', 'XML', 'HTTP', 'API'])
// Custom post-processing needed
```

The `preserveConsecutiveUppercase` option appears in the type definition but the implementation never reads it. All consecutive uppercase letters are lowercased. If you need to preserve acronyms like `URL` or `XML`, implement a post-processing allowlist.

Source: `src/types.ts:12` — option defined, `src/cases/camel.ts` — never read, maintainer interview

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

The package is tree-shakeable (`sideEffects: false`), so bundlers will eliminate unused imports. But importing everything adds code noise and signals the code wasn't written with intent. Each function is ~300-400 bytes — import only what you use.

Source: `package.json` — sideEffects: false, maintainer interview
