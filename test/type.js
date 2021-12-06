import { match, T } from '../match'

const getType = item => match(item)(
  (v = T.number) => 'number',
  (v = T.string) => 'string',
  (v = T.nullish) => 'nullish',
  _ => `${_} undefined type`
)

console.log(getType('a'))
// -> string

console.log(getType(1))
// -> number

console.log(getType(undefined))
// -> nullish

console.log(getType(null))
// -> nullish
