# @lpm.dev/neo.case

> Modern, comprehensive case conversion library - zero dependencies, TypeScript-first, tree-shakeable

Convert between camelCase, snake_case, kebab-case, and 7 more cases. **100% backward compatible** with the popular [camelcase](https://github.com/sindresorhus/camelcase) package (90M+ downloads/week).

## Features

✅ **10 case types** - camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, path/case, Sentence case, Title Case, Train-Case
✅ **Zero dependencies** - No external runtime dependencies
✅ **Tree-shakeable** - Import only what you need (~2.0 KB gzipped for all cases, ~1.0 KB for one case)
✅ **TypeScript-first** - Built with TypeScript, full type safety
✅ **100% backward compatible** - Drop-in replacement for `camelcase` package
✅ **Fast** - 4-6M ops/sec for common generalized conversions and up to 4.3M ops/sec for camelCase
✅ **Unicode support** - Handles international characters
✅ **Modern** - ESM + CJS, Node.js 18+, modern browsers

## Install

```bash
lpm install @lpm.dev/neo.case
```

## Usage

### Basic Usage

```typescript
import { camelCase, snakeCase, kebabCase } from "@lpm.dev/neo.case";

camelCase("foo-bar"); // 'fooBar'
snakeCase("fooBar"); // 'foo_bar'
kebabCase("FooBar"); // 'foo-bar'
```

### All Case Types

```typescript
import {
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
  constantCase,
  dotCase,
  pathCase,
  sentenceCase,
  titleCase,
  trainCase,
} from "@lpm.dev/neo.case";

const input = "foo-bar-baz";

camelCase(input); // 'fooBarBaz'
pascalCase(input); // 'FooBarBaz'
snakeCase(input); // 'foo_bar_baz'
kebabCase(input); // 'foo-bar-baz'
constantCase(input); // 'FOO_BAR_BAZ'
dotCase(input); // 'foo.bar.baz'
pathCase(input); // 'foo/bar/baz'
sentenceCase(input); // 'Foo bar baz'
titleCase(input); // 'Foo Bar Baz'
trainCase(input); // 'Foo-Bar-Baz'
```

### Backward Compatible with `camelcase`

```typescript
import { camelCase } from "@lpm.dev/neo.case";

// All camelcase package features work identically
camelCase("foo-bar"); // 'fooBar'
camelCase("foo_bar"); // 'fooBar'
camelCase(["foo", "bar"]); // 'fooBar'
camelCase("foo-bar", { pascalCase: true }); // 'FooBar'
camelCase("розовый_пушистый"); // 'розовыйПушистый'
```

### Tree-Shaking

Import only what you need for minimal bundle size:

```typescript
// Import single case (~1.0 KB gzipped)
import { camelCase } from "@lpm.dev/neo.case";

// Import camel + snake + kebab (~1.76 KB gzipped)
import { camelCase, snakeCase, kebabCase } from "@lpm.dev/neo.case";

// Import all cases (~2.0 KB gzipped)
import * as cases from "@lpm.dev/neo.case";
```

## API

### Case Conversion Functions

#### `camelCase(input, options?)`

Convert to camelCase

```typescript
camelCase("foo-bar"); // 'fooBar'
camelCase("foo_bar"); // 'fooBar'
camelCase("FooBar"); // 'fooBar'
camelCase(["foo", "bar"]); // 'fooBar'

// Options (backward compatible with camelcase package)
camelCase("foo-bar", { pascalCase: true }); // 'FooBar'
camelCase("foo-BAR", { preserveConsecutiveUppercase: true }); // 'fooBAR'
camelCase("lorem-ipsum", { locale: "tr-TR" }); // 'loremİpsum'
```

**Options:**

- `pascalCase?: boolean` - Uppercase the first character (default: `false`)
- `preserveConsecutiveUppercase?: boolean` - Preserve consecutive uppercase letters (default: `false`)
- `capitalizeAfterNumber?: boolean` - Capitalize letters after numbers (default: `true`)
- `locale?: string | string[] | false` - Locale for case conversion (default: host environment locale)

#### `pascalCase(input, options?)`

Convert to PascalCase. Alias for `camelCase` with `pascalCase: true`.

```typescript
pascalCase("foo-bar"); // 'FooBar'
pascalCase("fooBar"); // 'FooBar'
```

#### `snakeCase(input)`

Convert to snake_case

```typescript
snakeCase("fooBar"); // 'foo_bar'
snakeCase("FooBar"); // 'foo_bar'
```

#### `kebabCase(input)`

Convert to kebab-case

```typescript
kebabCase("fooBar"); // 'foo-bar'
kebabCase("FooBar"); // 'foo-bar'
```

#### `constantCase(input)`

Convert to CONSTANT_CASE

```typescript
constantCase("fooBar"); // 'FOO_BAR'
constantCase("foo-bar"); // 'FOO_BAR'
```

#### `dotCase(input)`

Convert to dot.case

```typescript
dotCase("fooBar"); // 'foo.bar'
dotCase("foo-bar"); // 'foo.bar'
```

#### `pathCase(input)`

Convert to path/case

```typescript
pathCase("fooBar"); // 'foo/bar'
pathCase("foo-bar"); // 'foo/bar'
```

> **Security:** `pathCase()` formats trusted identifiers; it does not sanitize or validate filesystem paths. Do not use its output as a security boundary for user-controlled paths. Backslashes, drive prefixes, UNC paths, and other platform-specific path syntax may be preserved.

#### `sentenceCase(input)`

Convert to Sentence case

```typescript
sentenceCase("fooBar"); // 'Foo bar'
sentenceCase("foo-bar"); // 'Foo bar'
```

#### `titleCase(input)`

Convert to Title Case

```typescript
titleCase("fooBar"); // 'Foo Bar'
titleCase("foo-bar"); // 'Foo Bar'
```

#### `trainCase(input)`

Convert to Train-Case

```typescript
trainCase("fooBar"); // 'Foo-Bar'
trainCase("foo-bar"); // 'Foo-Bar'
```

### Advanced API

#### `split(input: string): string[]`

Split a string into words

```typescript
import { split } from "@lpm.dev/neo.case";

split("fooBar"); // ['foo', 'Bar']
split("foo-bar"); // ['foo', 'bar']
split("FOO_BAR"); // ['FOO', 'BAR']
split("foo2Bar"); // ['foo', '2', 'Bar']
```

#### `transform(words: string[], options: TransformOptions): string`

Transform an array of words with custom options

```typescript
import { transform } from "@lpm.dev/neo.case";

transform(["foo", "bar"], {
  case: "lower",
  separator: "-",
}); // 'foo-bar'

transform(["foo", "bar"], {
  case: "capital",
  separator: " ",
}); // 'Foo Bar'
```

## Migration from `camelcase`

`@lpm.dev/neo.case` is 100% backward compatible with the `camelcase` package. Simply replace the import:

```diff
- import camelCase from 'camelcase'
+ import camelCase from '@lpm.dev/neo.case'

// All existing code works identically
camelCase('foo-bar')  // 'fooBar'
```

`camelCase` is also available as a named export alongside the additional case functions.

**Benefits of switching:**

- ✅ **Same API** - Zero code changes needed
- ✅ **More cases** - Get 9 additional case types for free
- ✅ **Tree-shakeable bundle** - Include only the case functions you use
- ✅ **TypeScript** - Native TypeScript types (no @types package needed)

## Performance

Benchmarks vs `camelcase` package (higher is better):

| Operation                              | neo.case    | camelcase@9 | Comparison          |
| -------------------------------------- | ----------- | ----------- | ------------------- |
| `camelCase('foo-bar')`                 | 4.31M ops/s | 3.26M ops/s | **1.32x faster** ✅ |
| `camelCase('FooBar')`                  | 2.07M ops/s | 1.83M ops/s | **1.13x faster** ✅ |
| Consecutive uppercase                  | 2.10M ops/s | 1.86M ops/s | **1.13x faster** ✅ |
| Numbers                                | 1.80M ops/s | 1.60M ops/s | **1.13x faster** ✅ |
| Array input                            | 2.72M ops/s | 2.28M ops/s | **1.19x faster** ✅ |

Common snake, kebab, dot, path, and related conversions run at approximately **4.3-6.2M ops/sec**. Run `npm run bench` to reproduce the full suite; see [BENCHMARKS.md](./BENCHMARKS.md) for methodology and long/Unicode workloads.

## Bundle Size

| Import                              | Size (gzipped) |
| ----------------------------------- | -------------- |
| Full package (all exports)          | ~1.98 KB       |
| Single case (camel or snake)        | ~0.98-1.02 KB  |
| Three cases (camel + snake + kebab) | ~1.76 KB       |

**Comparison:**

- `camelcase@9` camel-only bundle: ~0.91 KB gzipped
- `@lpm.dev/neo.case` camel-only bundle: ~0.98 KB gzipped
- `@lpm.dev/neo.case` full bundle: ~1.98 KB gzipped for all exports

Measured with esbuild 0.28.1 using browser ESM bundling, minification, tree-shaking, and gzip. Run `npm run size` to reproduce the table. Small changes in bundler or call-site code can change exact output.

## Requirements

- Node.js >= 18
- Modern browsers (ES2022+)

Contributors need Node.js >= 20 and npm 11.17.0 for the locked test/build toolchain. Published runtime support remains Node.js >= 18.

## TypeScript

Full TypeScript support with strict types:

```typescript
import { camelCase, type CaseOptions } from "@lpm.dev/neo.case";

const options: CaseOptions = {
  pascalCase: true,
  locale: "en-US",
};

const result: string = camelCase("foo-bar", options);
```

## License

MIT
