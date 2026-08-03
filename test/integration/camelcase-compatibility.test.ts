import { describe, expect, it } from 'vitest'
import originalCamelCase from 'camelcase'
import neoCamelCaseDefault, { camelCase } from '../../src/index.js'
import type { CaseInput, CaseOptions } from '../../src/types.js'

const inputs: CaseInput[] = [
  'foo-bar',
  'FOOBar',
  'foo-BAR',
  'foo2bar',
  'Textures_3D',
  'foo_2_bar',
  'foo/bar',
  'foo$',
  '__foo__--bar',
  'fooÄBar',
  'БыстрыйТест',
  'αΒeta',
  'XMLHttpRequest',
  'IDs',
  ['__foo__', '--bar'],
]

const options: Array<CaseOptions | undefined> = [
  undefined,
  { pascalCase: true },
  { preserveConsecutiveUppercase: true },
  { capitalizeAfterNumber: false },
  {
    preserveConsecutiveUppercase: true,
    capitalizeAfterNumber: false,
  },
  { locale: false },
  { locale: 'tr-TR' },
]

describe('camelcase@9 compatibility', () => {
  it('provides camelCase as the default and named export', () => {
    expect(neoCamelCaseDefault).toBe(camelCase)
  })

  for (const input of inputs) {
    for (const option of options) {
      it(`matches camelcase for ${JSON.stringify(input)} with ${JSON.stringify(option ?? {})}`, () => {
        expect(camelCase(input, option)).toBe(originalCamelCase(input, option))
      })
    }
  }

  it.each([null, 42, {}])('matches invalid-input errors for %j', input => {
    const callNeo = () => camelCase(input as never)
    const callOriginal = () => originalCamelCase(input as never)

    expect(callNeo).toThrow(TypeError)
    expect(callNeo).toThrow('Expected the input to be `string | string[]`')
    expect(callOriginal).toThrow('Expected the input to be `string | string[]`')
  })
})
