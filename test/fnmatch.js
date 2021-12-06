import { fnmatch } from '../match'
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
