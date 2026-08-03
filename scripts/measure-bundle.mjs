import { gzipSync } from 'node:zlib'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const entries = [
  {
    name: 'camelCase only',
    source: `
      import { camelCase } from './dist/index.js'
      console.log(camelCase('foo-bar'))
    `,
  },
  {
    name: 'snakeCase only',
    source: `
      import { snakeCase } from './dist/index.js'
      console.log(snakeCase('fooBar'))
    `,
  },
  {
    name: 'camel + snake + kebab',
    source: `
      import { camelCase, snakeCase, kebabCase } from './dist/index.js'
      console.log(camelCase('foo-bar'), snakeCase('fooBar'), kebabCase('fooBar'))
    `,
  },
  {
    name: 'all exports',
    source: `
      import * as neo from './dist/index.js'
      console.log(neo)
    `,
  },
  {
    name: 'camelcase@9 only',
    source: `
      import camelCase from 'camelcase'
      console.log(camelCase('foo-bar'))
    `,
  },
]

const measurements = []

for (const entry of entries) {
  const result = await build({
    stdin: {
      contents: entry.source,
      resolveDir: projectRoot,
      sourcefile: 'bundle-entry.mjs',
    },
    bundle: true,
    minify: true,
    format: 'esm',
    platform: 'browser',
    treeShaking: true,
    write: false,
    logLevel: 'silent',
  })
  const output = result.outputFiles[0]?.contents

  if (!output) {
    throw new Error(`esbuild produced no output for ${entry.name}`)
  }

  measurements.push({
    import: entry.name,
    rawBytes: output.byteLength,
    gzipBytes: gzipSync(output, { level: 9 }).byteLength,
  })
}

console.table(measurements)
