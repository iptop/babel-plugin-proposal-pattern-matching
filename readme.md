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

### fnmatch
```js
import match from 'babel-plugin-proposal-pattern-matching/match'
const fib = fnmatch(
  (v = 1) => 1,
  (v = 2) => 1,
  _ => fib(_ - 1) + fib(_ - 2)
)

console.log(fib(10))

// -> 55

const arr = [1, 2, 3]

console.log(
  arr.map(
    fnmatch(
      (v = 1) => 'one',
      (v = 2) => 'two',
      (v = 3) => 'three'
    )
  )
)

// -> [ 'one', 'two', 'three' ]

```

### type
```js
import { match , T} from 'babel-plugin-proposal-pattern-matching/match'

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


```

### instanceOf
```js
import { match, instanceOf } from 'babel-plugin-proposal-pattern-matching/match'

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


for (let i = 1; i <= 15; i++) {
  console.log(
    match({a: i % 3, b: i % 5})(
      ({a = 0, b = 0}) => 'FizzBuzz',
      ({a = 0, b}) => 'Fizz',
      ({a, b = 0}) => 'Buzz',
      _ => i
    )
  )
}
// ->
// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
// 7
// 8
// Fizz
// Buzz
// 11
// Fizz
// 13
// 14
// FizzBuzz

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
