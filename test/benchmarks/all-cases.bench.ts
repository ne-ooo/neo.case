import { bench, describe } from 'vitest'
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
} from '../../src/index.js'

describe('All Cases Performance - Common Input', () => {
  const input = 'foo-bar-baz-qux'

  bench('camelCase', () => {
    camelCase(input)
  })

  bench('pascalCase', () => {
    pascalCase(input)
  })

  bench('snakeCase', () => {
    snakeCase(input)
  })

  bench('kebabCase', () => {
    kebabCase(input)
  })

  bench('constantCase', () => {
    constantCase(input)
  })

  bench('dotCase', () => {
    dotCase(input)
  })

  bench('pathCase', () => {
    pathCase(input)
  })

  bench('sentenceCase', () => {
    sentenceCase(input)
  })

  bench('titleCase', () => {
    titleCase(input)
  })

  bench('trainCase', () => {
    trainCase(input)
  })
})

describe('All Cases Performance - camelCase Input', () => {
  const input = 'fooBarBazQux'

  bench('camelCase from camelCase', () => {
    camelCase(input)
  })

  bench('snakeCase from camelCase', () => {
    snakeCase(input)
  })

  bench('kebabCase from camelCase', () => {
    kebabCase(input)
  })

  bench('constantCase from camelCase', () => {
    constantCase(input)
  })
})
