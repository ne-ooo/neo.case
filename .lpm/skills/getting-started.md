---
name: getting-started
description: How to import and use neo.case — 10 case conversion functions, split/transform utilities, CaseInput types, tree-shaking, and choosing the right case
version: "0.1.0"
globs:
  - "**/*.ts"
  - "**/*.js"
  - "**/*.tsx"
  - "**/*.jsx"
---

# Getting Started with @lpm.dev/neo.case

## Import Only What You Need

The package is tree-shakeable (`sideEffects: false`). Import only the functions you use:

```typescript
// Good — tree-shakeable, ~300-400 bytes per function
import { camelCase, snakeCase } from '@lpm.dev/neo.case'

// Avoid — imports all 10 functions unnecessarily
import { camelCase, pascalCase, snakeCase, kebabCase, constantCase,
         dotCase, pathCase, sentenceCase, titleCase, trainCase } from '@lpm.dev/neo.case'
```

## Case Functions

All 10 functions accept any case format as input — the splitter handles camelCase, PascalCase, snake_case, kebab-case, dot.case, path/case, CONSTANT_CASE, spaces, and mixed separators automatically.

### Code identifiers

```typescript
import { camelCase, pascalCase, snakeCase, constantCase } from '@lpm.dev/neo.case'

camelCase('foo-bar')        // 'fooBar'
pascalCase('foo-bar')       // 'FooBar'
snakeCase('fooBar')         // 'foo_bar'
constantCase('fooBar')      // 'FOO_BAR'
```

### URL/path/config strings

```typescript
import { kebabCase, dotCase, pathCase } from '@lpm.dev/neo.case'

kebabCase('fooBar')         // 'foo-bar'
dotCase('fooBar')           // 'foo.bar'
pathCase('fooBar')          // 'foo/bar'
```

### Human-readable text

```typescript
import { sentenceCase, titleCase, trainCase } from '@lpm.dev/neo.case'

sentenceCase('fooBar')      // 'Foo bar'
titleCase('fooBar')         // 'Foo Bar'
trainCase('fooBar')         // 'Foo-Bar'
```

## Input Types

Every case function accepts `CaseInput` — either a string or an array of strings:

### String input (most common)

```typescript
camelCase('foo-bar')          // 'fooBar'
camelCase('foo_bar')          // 'fooBar'
camelCase('FOO_BAR')          // 'fooBar'
camelCase('foo bar')          // 'fooBar'
camelCase('foo.bar.baz')      // 'fooBarBaz'
```

### Array input (building identifiers from parts)

```typescript
// Useful for composing names from separate words
camelCase(['get', 'user', 'profile'])     // 'getUserProfile'
constantCase(['max', 'retry', 'count'])   // 'MAX_RETRY_COUNT'
kebabCase(['my', 'component'])            // 'my-component'
```

Array elements are trimmed, filtered (empties removed), joined with `-`, then processed. The result is always a single string, not an array.

## CaseOptions (camelCase only)

```typescript
import { camelCase } from '@lpm.dev/neo.case'

// Default behavior
camelCase('foo-bar')  // 'fooBar'

// With locale-aware conversion
camelCase('foo-bar', { locale: 'tr' })  // Turkish locale rules
camelCase('foo-bar', { locale: false }) // Disable locale (ASCII only)
```

## Special Character Preservation

Leading `_` and `$` characters are preserved:

```typescript
camelCase('_foo-bar')     // '_fooBar'
camelCase('__foo-bar')    // '__fooBar'
snakeCase('$fooBar')      // '$foo_bar'
```

## Split and Transform (Advanced)

For custom case logic, use the low-level utilities:

```typescript
import { split, transform } from '@lpm.dev/neo.case'

// Split any string into words
split('fooBar')           // ['foo', 'Bar']
split('foo_bar-baz')      // ['foo', 'bar', 'baz']
split('XMLHttpRequest')   // ['XML', 'Http', 'Request']

// Transform with custom options
transform(['foo', 'bar'], {
  case: 'upper',
  separator: '.',
})  // 'FOO.BAR'

transform(['foo', 'bar'], {
  case: 'capital',
  separator: ' ',
})  // 'Foo Bar'
```

### TransformOptions

| Option | Values | Description |
|--------|--------|-------------|
| `case` | `'lower'`, `'upper'`, `'capital'`, `'preserve'` | Case applied to each word |
| `separator` | Any string | Character(s) between words |
| `capitalizeFirst` | `boolean` | Capitalize first word only |
| `capitalizeAll` | `boolean` | Capitalize all words |
| `locale` | `string`, `string[]`, `false` | Locale for case conversion |

## Number Handling

Numbers are treated as word boundaries in all case functions:

```typescript
camelCase('foo2bar')        // 'foo2Bar'
snakeCase('foo2bar')        // 'foo_2_bar'
kebabCase('sha256hash')     // 'sha-256-hash'
constantCase('v2api')       // 'V_2_API'
```

This is hardcoded in the splitter — numbers always create word boundaries. Keep this in mind when converting identifiers that embed numbers (like `user2factor` or `sha256hash`).

## Choosing the Right Case

| Use Case | Function | Example |
|----------|----------|---------|
| JavaScript variables | `camelCase` | `myVariable` |
| React components, classes | `pascalCase` | `MyComponent` |
| Database columns, Python | `snakeCase` | `my_column` |
| URLs, CSS classes, CLI args | `kebabCase` | `my-class` |
| Environment variables | `constantCase` | `MY_CONSTANT` |
| Package names, config keys | `dotCase` | `my.config` |
| File paths | `pathCase` | `my/path` |
| UI labels | `sentenceCase` | `My label` |
| Headings, titles | `titleCase` | `My Title` |
| HTTP headers | `trainCase` | `My-Header` |
