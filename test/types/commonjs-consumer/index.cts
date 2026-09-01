import camelCase, { snakeCase } from '@lpm.dev/neo.case'

const camelResult: string = camelCase('foo-bar')
const snakeResult: string = snakeCase('fooBar')

void camelResult
void snakeResult
