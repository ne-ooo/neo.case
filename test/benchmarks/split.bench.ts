import { bench, describe } from 'vitest'
import { split } from '../../src/core/split.js'

describe('split Performance - Representative Inputs', () => {
  bench('separator-delimited ASCII', () => {
    split('foo-bar-baz-qux')
  })

  bench('camelCase ASCII', () => {
    split('fooBarBazQux')
  })

  bench('acronyms and numbers', () => {
    split('XMLHttpRequest2JSONParser')
  })

  bench('Unicode case boundaries', () => {
    split('БыстрыйТестÜberAllesΑλφαΒήτα')
  })
})

describe('split Performance - Long Inputs', () => {
  const uppercase = 'A'.repeat(4096)
  const mixed = 'fooBar2XMLHttpRequest-'.repeat(128)

  bench('4 KiB uppercase', () => {
    split(uppercase)
  })

  bench('3 KiB mixed boundaries', () => {
    split(mixed)
  })
})
