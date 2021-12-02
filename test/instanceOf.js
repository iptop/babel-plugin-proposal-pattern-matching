import { match, instanceOf } from '../match'

const getType = val => match(val)(
  (v = instanceOf(RegExp)) => 'RegExp',
  (v = instanceOf(Array)) => 'Array',
  (v = instanceOf(Object)) => 'Object'
)

console.log(getType(/111/))

console.log(getType([1, 2, 3]))

console.log(getType({ a: 1 }))
