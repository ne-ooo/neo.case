# @lpm.dev/neo.case Benchmarks

**Date:** August 3, 2026

**Runtime:** Node.js 26.5.0, Vitest 4.1.10

**Platform:** Apple M5 Pro, Darwin 25.5.0 arm64

Run the benchmark suite with:

```bash
npm ci
npm run bench
```

Results are microbenchmarks, not application latency guarantees. Operations per second vary by CPU, runtime, thermal state, and surrounding code.

## Performance Optimization Result

The shared conversion pipeline now uses:

- a single-pass splitter with an ASCII fast path and Unicode fallback;
- source slices instead of four full-string regex replacements;
- a direct transformation loop without `map()` and intermediate output arrays;
- cached camelCase normalization and a lower-overhead PascalCase wrapper.

The before and after measurements below were taken in the same environment and process setup.

| Common input (`foo-bar-baz-qux`) | Before | After | Improvement |
|---|---:|---:|---:|
| camelCase | 2.37M | 2.62M | 1.11x |
| pascalCase | 2.13M | 2.34M | 1.10x |
| snakeCase | 2.23M | 6.14M | 2.76x |
| kebabCase | 2.15M | 6.07M | 2.83x |
| constantCase | 2.03M | 4.98M | 2.46x |
| dotCase | 2.12M | 6.04M | 2.84x |
| pathCase | 2.20M | 6.09M | 2.77x |
| sentenceCase | 2.13M | 5.50M | 2.58x |
| titleCase | 1.86M | 4.31M | 2.31x |
| trainCase | 1.86M | 4.29M | 2.31x |

Conversions from camelCase benefit particularly from eliminating the regex replacement pipeline:

| Input (`fooBarBazQux`) | Before | After | Improvement |
|---|---:|---:|---:|
| snakeCase | 1.78M | 5.98M | 3.35x |
| kebabCase | 1.81M | 6.22M | 3.44x |
| constantCase | 1.68M | 4.92M | 2.93x |

## camelcase@9 Comparison

neo.case preserves camelcase@9 behavior and types while keeping a dedicated compatibility hot path.

| Workload | neo.case | camelcase@9 | Comparison |
|---|---:|---:|---:|
| `foo-bar` | 4.31M | 3.26M | 1.32x faster |
| `foo_bar` | 4.26M | 3.27M | 1.30x faster |
| `FooBar` | 2.07M | 1.83M | 1.13x faster |
| `foo-bar-baz-qux` | 2.59M | 2.22M | 1.17x faster |
| Consecutive uppercase | 2.10M | 1.86M | 1.13x faster |
| Numbers | 1.80M | 1.60M | 1.13x faster |
| Array input | 2.72M | 2.28M | 1.19x faster |
| Unicode | 338K | 336K | parity |
| Preserve uppercase option | 1.03M | 1.03M | parity |
| 4 KiB uppercase | 7.42K | 8.74K | 0.85x |

The long-uppercase result is retained explicitly: the compatibility algorithm is linear for this workload but camelcase@9 remains about 18% faster at 4 KiB. The generalized `split()` security regression is separately protected by tests and benchmarks.

## Split Workloads

| Workload | Operations/sec |
|---|---:|
| camelCase ASCII | 8.59M |
| Separator-delimited ASCII | 8.58M |
| Acronyms and numbers | 5.71M |
| Unicode case boundaries | 509K |
| 4 KiB uppercase | 59.5K |
| 3 KiB mixed boundaries | 55.9K |

The long-input workloads make algorithmic-complexity regressions visible in the standard benchmark command.

## Bundle Measurements

Measured with esbuild 0.28.1, browser ESM output, minification, tree-shaking, and gzip. The tiny call-site used to retain imports is included consistently in every measurement.

Run `npm run size` to rebuild the package and reproduce these measurements.

| Import | Raw | Gzipped |
|---|---:|---:|
| camelCase only | 2,075 B | 983 B |
| snakeCase only | 2,101 B | 1,016 B |
| camel + snake + kebab | 4,145 B | 1,764 B |
| all exports | 5,328 B | 1,984 B |
| camelcase@9 only | 1,847 B | 907 B |

The optimized Unicode-aware scanner increases the full tree-shaken bundle by roughly 382 gzip bytes compared with the previous regex implementation, while improving common generalized conversion throughput by approximately 2.3-3.4x.

## Interpreting the Results

- Prefer direct conversion instead of chaining case functions.
- The generalized functions are fastest on ASCII identifiers and separators.
- Unicode conversion remains fully supported but requires Unicode category checks.
- Case conversion is rarely an application bottleneck; benchmark with representative production strings before designing caches or specialized wrappers.
