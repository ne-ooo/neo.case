import { bench, describe } from 'vitest'
import { camelCase as neoCamelCase } from '../../src/cases/camel.js'
import originalCamelCase from 'camelcase'

describe('camelCase Performance - Common Cases', () => {
  const inputs = [
    'foo-bar',
    'foo_bar',
    'FooBar',
    'foo-bar-baz-qux',
    'foo_bar_baz_qux',
  ]

  for (const input of inputs) {
    bench(`neo.case camelCase('${input}')`, () => {
      neoCamelCase(input)
    })

    bench(`original camelCase('${input}')`, () => {
      originalCamelCase(input)
    })
  }
})

describe('camelCase Performance - Edge Cases', () => {
  bench('neo.case camelCase - consecutive uppercase', () => {
    neoCamelCase('FOOBar')
  })

  bench('original camelCase - consecutive uppercase', () => {
    originalCamelCase('FOOBar')
  })

  bench('neo.case camelCase - with numbers', () => {
    neoCamelCase('foo2Bar')
  })

  bench('original camelCase - with numbers', () => {
    originalCamelCase('foo2Bar')
  })
})

describe('camelCase Performance - Array Input', () => {
  const arrayInput = ['foo', 'bar', 'baz']

  bench('neo.case camelCase - array', () => {
    neoCamelCase(arrayInput)
  })

  bench('original camelCase - array', () => {
    originalCamelCase(arrayInput)
  })
})

describe('camelCase Performance - Unicode and Options', () => {
  const unicodeInput = 'БыстрыйТестÜberAllesΑλφαΒήτα'
  const uppercaseInput = 'foo-XML-HTTP-API'

  bench('neo.case camelCase - Unicode', () => {
    neoCamelCase(unicodeInput)
  })

  bench('original camelCase - Unicode', () => {
    originalCamelCase(unicodeInput)
  })

  bench('neo.case camelCase - preserve uppercase', () => {
    neoCamelCase(uppercaseInput, { preserveConsecutiveUppercase: true })
  })

  bench('original camelCase - preserve uppercase', () => {
    originalCamelCase(uppercaseInput, { preserveConsecutiveUppercase: true })
  })
})

describe('camelCase Performance - Long Input', () => {
  const uppercaseInput = 'A'.repeat(4096)
  const alternatingCaseInput = 'aA'.repeat(2048)

  bench('neo.case camelCase - 4 KiB uppercase', () => {
    neoCamelCase(uppercaseInput)
  })

  bench('original camelCase - 4 KiB uppercase', () => {
    originalCamelCase(uppercaseInput)
  })

  bench('neo.case camelCase - 4 KiB alternating case', () => {
    neoCamelCase(alternatingCaseInput)
  })

  bench('original camelCase - 4 KiB alternating case', () => {
    originalCamelCase(alternatingCaseInput)
  })
})
