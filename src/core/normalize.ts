import type { CaseInput } from '../types.js'

/** Normalize case-function input while preserving string input as-is. */
export function normalizeCaseInput(input: CaseInput): string {
  return typeof input === 'string'
    ? input
    : input
        .map(element => element.trim())
        .filter(element => element.length > 0)
        .join('-')
}
