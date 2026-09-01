# @lpm.dev/neo.case

`@lpm.dev/neo.case` converts text between ten naming conventions in Node.js and
modern browsers.

## Features

- **Case conversion:** Supports camel, Pascal, snake, kebab, constant, dot,
  path, sentence, title, and train cases.
- **Compatibility:** Supports the common `camelcase` inputs and options.
- **Unicode:** Converts international characters and locale-sensitive case
  mappings.
- **TypeScript support:** Includes strict type declarations.
- **Module formats:** Provides tree-shakeable ESM and CommonJS builds.
- **Dependency surface:** Has no runtime dependencies.

## Install

Install the package with LPM:

```bash
lpm install @lpm.dev/neo.case
```

## Quick start

### Basic conversion

```typescript
import { camelCase, kebabCase, snakeCase } from "@lpm.dev/neo.case";

camelCase("foo-bar"); // "fooBar"
snakeCase("fooBar"); // "foo_bar"
kebabCase("FooBar"); // "foo-bar"
```

### All case types

```typescript
import {
  camelCase,
  constantCase,
  dotCase,
  kebabCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
  titleCase,
  trainCase,
} from "@lpm.dev/neo.case";

const input = "foo-bar-baz";

camelCase(input); // "fooBarBaz"
pascalCase(input); // "FooBarBaz"
snakeCase(input); // "foo_bar_baz"
kebabCase(input); // "foo-bar-baz"
constantCase(input); // "FOO_BAR_BAZ"
dotCase(input); // "foo.bar.baz"
pathCase(input); // "foo/bar/baz"
sentenceCase(input); // "Foo bar baz"
titleCase(input); // "Foo Bar Baz"
trainCase(input); // "Foo-Bar-Baz"
```

### `camelcase`-compatible calls

```typescript
import { camelCase } from "@lpm.dev/neo.case";

// The camelcase package API works with the same inputs and options
camelCase("foo-bar"); // "fooBar"
camelCase("foo_bar"); // "fooBar"
camelCase(["foo", "bar"]); // "fooBar"
camelCase("foo-bar", { pascalCase: true }); // "FooBar"
camelCase("розовый_пушистый"); // "розовыйПушистый"
```

### Tree-shaking

Import only the functions that the application uses:

```typescript
// Import single case (~1.17 KB gzipped)
import { camelCase } from "@lpm.dev/neo.case";

// Import camel + snake + kebab (~2.02 KB gzipped)
import { camelCase, kebabCase, snakeCase } from "@lpm.dev/neo.case";

// Import all cases (~2.23 KB gzipped)
import * as cases from "@lpm.dev/neo.case";
```

## API

### Case conversion functions

#### `camelCase(input, options?)`

Converts the input to camel case.

```typescript
camelCase("foo-bar"); // "fooBar"
camelCase("foo_bar"); // "fooBar"
camelCase("FooBar"); // "fooBar"
camelCase(["foo", "bar"]); // "fooBar"

// Options (API-compatible with the camelcase package)
camelCase("foo-bar", { pascalCase: true }); // "FooBar"
camelCase("foo-BAR", { preserveConsecutiveUppercase: true }); // "fooBAR"
camelCase("lorem-ipsum", { locale: "tr-TR" }); // "loremİpsum"
```

**Options:**

- `pascalCase?: boolean` - Uppercase the first character (default: `false`)
- `preserveConsecutiveUppercase?: boolean` - Preserve consecutive uppercase
  letters (default: `false`)
- `capitalizeAfterNumber?: boolean` - Capitalize letters after numbers (default:
  `true`)
- `locale?: string | string[] | false` - Locale for case conversion (default:
  host environment locale)

#### `pascalCase(input, options?)`

Converts the input to Pascal case. This function calls `camelCase` with
`pascalCase: true`.

```typescript
pascalCase("foo-bar"); // "FooBar"
pascalCase("fooBar"); // "FooBar"
```

#### `snakeCase(input)`

Converts the input to snake case.

```typescript
snakeCase("fooBar"); // "foo_bar"
snakeCase("FooBar"); // "foo_bar"
```

#### `kebabCase(input)`

Converts the input to kebab case.

```typescript
kebabCase("fooBar"); // "foo-bar"
kebabCase("FooBar"); // "foo-bar"
```

#### `constantCase(input)`

Converts the input to constant case.

```typescript
constantCase("fooBar"); // "FOO_BAR"
constantCase("foo-bar"); // "FOO_BAR"
```

#### `dotCase(input)`

Converts the input to dot case.

```typescript
dotCase("fooBar"); // "foo.bar"
dotCase("foo-bar"); // "foo.bar"
```

#### `pathCase(input)`

Converts the input to path case.

```typescript
pathCase("fooBar"); // "foo/bar"
pathCase("foo-bar"); // "foo/bar"
```

`pathCase()` formats trusted identifiers. It does not sanitize or validate
file-system paths.

Do not use its output as a security boundary for user-controlled paths. The
output can preserve platform-specific path syntax.

#### `sentenceCase(input)`

Converts the input to sentence case.

```typescript
sentenceCase("fooBar"); // "Foo bar"
sentenceCase("foo-bar"); // "Foo bar"
```

#### `titleCase(input)`

Converts the input to title case.

```typescript
titleCase("fooBar"); // "Foo Bar"
titleCase("foo-bar"); // "Foo Bar"
```

#### `trainCase(input)`

Converts the input to train case.

```typescript
trainCase("fooBar"); // "Foo-Bar"
trainCase("foo-bar"); // "Foo-Bar"
```

### Advanced API

#### `split(input: string): string[]`

Splits a string into words.

```typescript
import { split } from "@lpm.dev/neo.case";

split("fooBar"); // ["foo", "Bar"]
split("foo-bar"); // ["foo", "bar"]
split("FOO_BAR"); // ["FOO", "BAR"]
split("foo2Bar"); // ["foo", "2", "Bar"]
```

#### `transform(words: string[], options: TransformOptions): string`

Transforms an array of words with the specified options.

```typescript
import { transform } from "@lpm.dev/neo.case";

transform(["foo", "bar"], {
  case: "lower",
  separator: "-",
}); // "foo-bar"

transform(["foo", "bar"], {
  case: "capital",
  separator: " ",
}); // "Foo Bar"
```

`capitalizeAll` capitalizes every word after the first. Use `capitalizeFirst` to
capitalize the first word.

## Migration from `camelcase`

`@lpm.dev/neo.case` supports the common `camelcase` API. It also provides nine
additional case functions.

```diff
- import camelCase from 'camelcase'
+ import camelCase from '@lpm.dev/neo.case'

// Existing code uses the same API
camelCase('foo-bar')  // 'fooBar'
```

PascalCase has two Unicode corrections from `camelcase@9`. It capitalizes
supplementary-plane letters and initial combining sequences correctly.

`camelCase` is also available as a named export alongside the additional case
functions.

Run the application tests after the migration. Pascal case has two Unicode
behavior differences from `camelcase@9`.

## Performance

The repository contains reproducible benchmarks for case conversion.

| Operation              | neo.case    | camelcase@9 | Comparison   |
| ---------------------- | ----------- | ----------- | ------------ |
| `camelCase("foo-bar")` | 4.05M ops/s | 3.19M ops/s | 1.27x faster |
| `camelCase('FooBar')`  | 1.74M ops/s | 1.73M ops/s | Parity       |
| Consecutive uppercase  | 1.96M ops/s | 1.71M ops/s | 1.15x faster |
| Numbers                | 1.47M ops/s | 1.46M ops/s | Parity       |
| Array input            | 2.60M ops/s | 2.17M ops/s | 1.20x faster |

Common snake, kebab, dot, path, and related conversions run at approximately
**4.0-6.3M ops/sec**. Run `lpm run bench` to reproduce the full suite. See
[BENCHMARKS.md](./BENCHMARKS.md) for the method and long-input workloads.

### Bundle size

| Import                              | Size (gzipped) |
| ----------------------------------- | -------------- |
| Full package (all exports)          | ~2.23 KB       |
| Single case (camel or snake)        | ~1.17-1.25 KB  |
| Three cases (camel + snake + kebab) | ~2.02 KB       |

**Comparison:**

- `camelcase@9` camel-only bundle: ~0.91 KB gzipped
- `@lpm.dev/neo.case` camel-only bundle: ~1.17 KB gzipped
- `@lpm.dev/neo.case` full bundle: ~2.23 KB gzipped for all exports

Measured with esbuild 0.28.1 using browser ESM bundling, minification,
tree-shaking, and gzip. Run `lpm run size` to reproduce the table. Bundler and
call-site changes can change the output.

## Runtime support

- **Node.js:** 18 or later
- **Browsers:** Modern browsers with ES2022 support
- **Module formats:** ESM and CommonJS
- **TypeScript:** Declaration files included

### TypeScript example

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

MIT. See [LICENSE](./LICENSE).
