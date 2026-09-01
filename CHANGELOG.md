# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Fixed

- Added separate TypeScript declarations for ESM and CommonJS package resolution
- Corrected supplementary-plane and combining-sequence capitalization, combining-mark boundaries, titlecase boundaries, and contextual Unicode casing
- Made every case function trim array elements and remove empty array elements
- Corrected the public description of `capitalizeAll`

### Security

- Removed quadratic boundary insertion from alternating-case `camelCase` and `pascalCase` inputs
- Added checksum verification for the LPM installer in the OIDC publish job
- Limited published LPM files to the three package skills

### Performance

- Classified each Unicode code point once in the common `split()` path
- Added alternating-case and long-Unicode benchmark coverage

## [1.1.0] - 2026-08-12

### Fixed

- Implemented `preserveConsecutiveUppercase` and `capitalizeAfterNumber` with `camelcase@9` behavior
- Added the compatible default export and readonly array/locale types
- Matched `camelcase@9` handling for Unicode boundaries, slashes, dollar signs, acronyms, and invalid inputs
- Replaced the polynomial uppercase-boundary regex with a linear, Unicode-aware pattern

### Security

- Prevented algorithmic-complexity denial of service on long all-uppercase input
- Upgraded and locked the development toolchain with zero known audit findings
- Blocked dependency install scripts by default and added automated dependency audits
- Documented that `pathCase()` is not a filesystem-path sanitizer

### Tooling

- Added enforced V8 coverage thresholds and a `test:coverage` command
- Added CI for clean installs, audits, typechecking, coverage, builds, and Node.js 18 runtime smoke tests
- Added Dependabot updates for GitHub Actions dependencies

### Performance

- Replaced the four-pass regex splitter with a single-pass scanner using an ASCII fast path and Unicode fallback
- Reworked word transformation to avoid callback and intermediate-array allocations
- Cached camelCase normalization and removed redundant PascalCase options copying
- Added representative ASCII, Unicode, acronym, number, and long-input benchmarks
- Added a reproducible `lpm run size` bundle-measurement command
- Updated benchmark and bundle-size documentation with reproducible current measurements

## [0.1.0] - 2026-03-09

### Added

- `camelCase(input, options?)` — Convert to camelCase with full backward compatibility with the `camelcase` package
- `pascalCase(input, options?)` — Convert to PascalCase
- `snakeCase(input)` — Convert to snake_case
- `kebabCase(input)` — Convert to kebab-case
- `constantCase(input)` — Convert to CONSTANT_CASE
- `dotCase(input)` — Convert to dot.case
- `pathCase(input)` — Convert to path/case
- `sentenceCase(input)` — Convert to Sentence case
- `titleCase(input)` — Convert to Title Case
- `trainCase(input)` — Convert to Train-Case
- `split(input)` — Split a string into words (handles camelCase, snake_case, kebab-case, and more)
- `transform(words, options)` — Low-level word transformation with custom separator and casing
- `CaseOptions` — Full TypeScript types for all options
- Array input support for `camelCase` (backward compatible with `camelcase` package)
- `preserveConsecutiveUppercase`, `locale`, `capitalizeAfterNumber` options for `camelCase`/`pascalCase`
- Unicode support for international characters
- Zero runtime dependencies
- ESM + CJS dual output with source maps
- Tree-shakeable — each case function is independently importable
