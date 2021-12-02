## Installation

With npm:
```sh
npm install --save-dev babel-plugin-proposal-pattern-matching
```

## Setup

### .babelrc

```json
{
  "plugins": ["babel-plugin-proposal-pattern-matching"]
}
```

## Example

### easy
```js
import match from 'babel-plugin-proposal-pattern-matching/match'
const fib = n=>match(n)(
        (v=1)=>1,
        (v=2)=>1,
        _=>fib(_-1)+fib(_-2)
)

console.log(fib(10))
// -> 55
```

### type
```js
import { match , T} from 'babel-plugin-proposal-pattern-matching/match'

console.log(
  ['a',
    1,
    null,
    undefined,
    0,
    [1,2,3]
  ].map(item=>match(item)(
    (v=T.number)=>`${v} is number`,
    (v=T.string)=>`${v} is string`,
    (v=T.nullish)=>`${v} is nullish`,
    _=>`${_} undefined type`
  ))
)
// ->
//[
//  'a is string',
//  '1 is number',
//  'null is nullish',
//  'undefined is nullish',
//  '0 is number',
//  '1,2,3 undefined type'
//]

```

### instanceOf
```js
import { match, instanceOf, } from 'babel-plugin-proposal-pattern-matching/match'

const getType = val => match(val)(
  (v=instanceOf(RegExp))=>'RegExp',
  (v=instanceOf(Array))=>'Array',
  (v=instanceOf(Object))=>'Object',
)

console.log(getType(/111/))
// -> RegExp
console.log(getType([1,2,3]))
// -> Array
console.log(getType({a:1}))
// -> Object
```

### deconstruction
```js
import { match } from 'babel-plugin-proposal-pattern-matching/match'
const sum = x => match(x)(
  ([x, ...xs]) => x + sum(xs),
  ([]) => 0
)

console.log(sum([1, 2, 3]))
// -> 6
```

### not
```js
import { match, not, or, T } from 'babel-plugin-proposal-pattern-matching/match'

const toNumber = n => match(n)(
  (v = not(T.boolean)) => v,
  (v = true) => 1,
  (v = false) => 0
)

console.log(
  [true, false, 0, 1, 2, 3].map(toNumber)
)
// -> [ 1, 0, 0, 1, 2, 3 ]
```

### or
```js
import { match, or } from 'babel-plugin-proposal-pattern-matching/match'
const fib = n => match(n)(
  (v = or(1, 2)) => 1,
  _ => fib(_ - 1) + fib(_ - 2)
)

console.log(fib(10))
// -> 55
```

### and
```js
import { match, and, not } from 'babel-plugin-proposal-pattern-matching/match'
const fib = n => match(n)(
  (_ = and(not(1), not(2))) => fib(_ - 1) + fib(_ - 2),
  _ => 1
)

console.log(fib(10))
// -> 55
```

## LICENSE

MIT
