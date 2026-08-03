---
name: migrate-from-camelcase
description: Step-by-step guide for migrating from the camelcase npm package to neo.case — 100% compatible API, additional case functions, tree-shaking benefits, and gotchas
version: "0.1.0"
globs:
  - "**/*.ts"
  - "**/*.js"
---

# Migrate from camelcase to @lpm.dev/neo.case

## Why Migrate?

| Aspect | camelcase | neo.case |
|--------|-----------|----------|
| Case functions | 2 (camelCase, pascalCase) | 10 (+ snakeCase, kebabCase, constantCase, dotCase, pathCase, sentenceCase, titleCase, trainCase) |
| Full available API | ~0.91KB for camelCase | ~1.98KB for 10 cases plus utilities |
| Bundle (camel only) | ~0.91KB gzipped | ~0.98KB gzipped |
| Dependencies | Zero | Zero |
| API compatibility | — | 100% backward compatible |
| TypeScript | Native | Native |
| Extra utilities | None | `split()`, `transform()` for custom cases |

## Step 1: Replace the Import

```typescript
// Before
import camelCase from 'camelcase'

// After
import camelCase from '@lpm.dev/neo.case'
```

The default export is compatible with `camelcase`. A named `camelCase` export is also available.

## Step 2: All Existing Code Works As-Is

neo.case is 100% backward compatible with camelcase@9. No code changes needed for:

### Basic conversion

```typescript
camelCase('foo-bar')        // 'fooBar' ✓
camelCase('foo_bar')        // 'fooBar' ✓
camelCase('Foo-Bar')        // 'fooBar' ✓
camelCase('foo bar')        // 'fooBar' ✓
```

### pascalCase option

```typescript
// Before (camelcase)
camelCase('foo-bar', { pascalCase: true })  // 'FooBar'

// After (neo.case) — both work
camelCase('foo-bar', { pascalCase: true })  // 'FooBar' ✓
pascalCase('foo-bar')                       // 'FooBar' ✓ (cleaner)
```

### Array input

```typescript
camelCase(['foo', 'bar'])           // 'fooBar' ✓
camelCase(['  foo  ', '', 'bar'])   // 'fooBar' ✓ (trims, filters empties)
```

### Locale option

```typescript
camelCase('foo-bar', { locale: 'tr' })     // Turkish locale ✓
camelCase('foo-bar', { locale: false })     // Disable locale ✓
camelCase('foo-bar', { locale: ['tr'] })    // Array of locales ✓
```

### Special character preservation

```typescript
camelCase('_foo-bar')     // '_fooBar' ✓
camelCase('__foo-bar')    // '__fooBar' ✓
```

## Step 3: Use the New Functions (Optional)

After migrating, you get 8 additional case functions for free:

```typescript
import { snakeCase, kebabCase, constantCase } from '@lpm.dev/neo.case'

// Previously needed separate packages or manual implementation
snakeCase('fooBar')       // 'foo_bar'
kebabCase('fooBar')       // 'foo-bar'
constantCase('fooBar')    // 'FOO_BAR'
```

### Replace `pascalCase: true` with `pascalCase()`

```typescript
// Before
import camelCase from 'camelcase'
const name = camelCase('foo-bar', { pascalCase: true })

// After — cleaner
import { pascalCase } from '@lpm.dev/neo.case'
const name = pascalCase('foo-bar')
```

## Option Compatibility

All `camelcase@9` options are implemented with matching behavior:

```typescript
camelCase('foo-BAR', { preserveConsecutiveUppercase: true })
// 'fooBAR'

camelCase('foo2bar', { capitalizeAfterNumber: false })
// 'foo2bar'
```

### Number boundary behavior

Both `camelcase` and neo.case treat numbers as word boundaries:

```typescript
camelCase('foo2bar')      // 'foo2Bar' (same in both)
camelCase('sha256hash')   // 'sha256Hash' (same in both)
```

Set `capitalizeAfterNumber: false` when letters after numbers should preserve their original case.

## Migration Checklist

- [ ] Replace the package specifier in `import camelCase from 'camelcase'` with `@lpm.dev/neo.case`
- [ ] Replace `camelCase(x, { pascalCase: true })` with `pascalCase(x)` (optional, cleaner)
- [ ] Keep existing `preserveConsecutiveUppercase` and `capitalizeAfterNumber` options unchanged
- [ ] Remove `camelcase` from dependencies
- [ ] Add `@lpm.dev/neo.case` to dependencies
- [ ] Consider using additional case functions (`snakeCase`, `kebabCase`, etc.) where you had manual implementations
