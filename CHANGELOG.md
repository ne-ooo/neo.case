# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

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
