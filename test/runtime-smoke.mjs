import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import camelCaseDefault, { camelCase } from '../dist/index.js'

assert.equal(camelCaseDefault, camelCase)
assert.equal(camelCaseDefault('foo-BAR', {
  preserveConsecutiveUppercase: true,
}), 'fooBAR')

const require = createRequire(import.meta.url)
const commonJs = require('../dist/index.cjs')

assert.equal(commonJs.default, commonJs.camelCase)
assert.equal(commonJs.default('foo2bar', {
  capitalizeAfterNumber: false,
}), 'foo2bar')

console.log('Node.js runtime smoke test passed')
