import originalCamelCase, { type Options as OriginalOptions } from 'camelcase'
import neoCamelCase, {
  camelCase,
  transform,
  type CaseOptions,
  type Options as NeoOptions,
} from '../../src/index.js'

const input = ['foo', 'bar'] as const
const locales = ['en-US', 'en-GB'] as const
const originalOptions: OriginalOptions = { locale: locales }
const neoOptions: CaseOptions = originalOptions
const compatibleOptions: NeoOptions = originalOptions

const originalResult: string = originalCamelCase(input, originalOptions)
const defaultResult: string = neoCamelCase(input, neoOptions)
const namedResult: string = camelCase(input, originalOptions)
const compatibleResult: string = camelCase(input, compatibleOptions)
const transformed: string = transform(input, {
  case: 'lower',
  separator: '-',
})

void originalResult
void defaultResult
void namedResult
void compatibleResult
void transformed
