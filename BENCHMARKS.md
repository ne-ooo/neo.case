# @lpm.dev/neo.case Benchmarks

**Date:** August 31, 2026

**Runtime:** Node.js 26.5.0, Vitest 4.1.10

**Platform:** Apple M5 Pro, Darwin 25.5.0 arm64

Run the benchmark suite with:

```bash
lpm install
lpm run bench
```

Results are microbenchmarks, not application latency guarantees. Operations per second vary by CPU, runtime, thermal state, and surrounding code.

## Current Performance Result

The shared conversion pipeline now uses:

- a single-pass splitter with an ASCII fast path and Unicode fallback;
- source slices instead of four full-string regex replacements;
- a direct transformation loop without `map()` and intermediate output arrays;
- cached camelCase normalization and a lower-overhead PascalCase wrapper.

The before and after measurements below were taken in the same environment and process setup.

| Common input (`foo-bar-baz-qux`) | Before | After | Improvement |
|---|---:|---:|---:|
| camelCase | 2.37M | 2.16M | 0.91x |
| pascalCase | 2.13M | 2.21M | 1.04x |
| snakeCase | 2.23M | 5.90M | 2.65x |
| kebabCase | 2.15M | 6.50M | 3.02x |
| constantCase | 2.03M | 4.72M | 2.33x |
| dotCase | 2.12M | 5.78M | 2.73x |
| pathCase | 2.20M | 6.10M | 2.77x |
| sentenceCase | 2.13M | 5.27M | 2.47x |
| titleCase | 1.86M | 3.90M | 2.10x |
| trainCase | 1.86M | 3.87M | 2.08x |

Conversions from camelCase benefit particularly from eliminating the regex replacement pipeline:

| Input (`fooBarBazQux`) | Before | After | Improvement |
|---|---:|---:|---:|
| snakeCase | 1.78M | 6.32M | 3.55x |
| kebabCase | 1.81M | 6.19M | 3.42x |
| constantCase | 1.68M | 5.08M | 3.02x |

## camelcase@9 Comparison

neo.case preserves the `camelcase@9` API, types, and common behavior. PascalCase includes the two documented Unicode capitalization corrections.

| Workload | neo.case | camelcase@9 | Comparison |
|---|---:|---:|---:|
| `foo-bar` | 4.05M | 3.19M | 1.27x faster |
| `foo_bar` | 4.01M | 3.12M | 1.29x faster |
| `FooBar` | 1.74M | 1.73M | parity |
| `foo-bar-baz-qux` | 2.43M | 1.92M | 1.27x faster |
| Consecutive uppercase | 1.96M | 1.71M | 1.15x faster |
| Numbers | 1.47M | 1.46M | parity |
| Array input | 2.60M | 2.17M | 1.20x faster |
| Unicode | 309K | 314K | parity |
| Preserve uppercase option | 879K | 984K | 0.89x |
| 4 KiB uppercase | 6.54K | 8.09K | 0.81x |
| 4 KiB alternating case | 3.26K | 1.73K | 1.88x faster |

The long-uppercase result stays in the table. The compatibility algorithm is linear, but `camelcase@9` is about 24% faster at 4 KiB.

The alternating-case row covers the former quadratic path. The generalized `split()` regressions have separate tests and benchmarks.

## Split Workloads

| Workload | Operations/sec |
|---|---:|
| camelCase ASCII | 11.17M |
| Separator-delimited ASCII | 10.07M |
| Acronyms and numbers | 6.72M |
| Unicode case boundaries | 1.24M |
| 4 KiB uppercase | 61.9K |
| 3 KiB mixed boundaries | 52.3K |
| 3.5 KiB Unicode boundaries | 8.84K |
| 4 KiB combining-mark run | 4.66K |

The long-input workloads make algorithmic-complexity regressions visible in the standard benchmark command.

## Bundle Measurements

Measured with esbuild 0.28.1, browser ESM output, minification, tree-shaking, and gzip. The tiny call-site used to retain imports is included consistently in every measurement.

Run `lpm run size` to rebuild the package and reproduce these measurements.

| Import | Raw | Gzipped |
|---|---:|---:|
| camelCase only | 2,461 B | 1,173 B |
| snakeCase only | 2,720 B | 1,249 B |
| camel + snake + kebab | 4,769 B | 2,019 B |
| all exports | 5,797 B | 2,232 B |
| camelcase@9 only | 1,847 B | 907 B |

The Unicode fixes add 248 gzip bytes to the full 1.1.0 bundle. Common generalized conversion throughput remains approximately 2.2-3.6x faster than the baseline.

## Interpreting the Results

- Prefer direct conversion instead of chaining case functions.
- The generalized functions are fastest on ASCII identifiers and separators.
- Unicode conversion remains fully supported but requires Unicode category checks.
- Case conversion is rarely an application bottleneck; benchmark with representative production strings before designing caches or specialized wrappers.
