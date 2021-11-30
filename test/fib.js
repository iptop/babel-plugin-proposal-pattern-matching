import match from '../match'
const fib = n => match(n)(
  (v = 1) => 1,
  (v = 2) => 1,
  _ => fib(_ - 1) + fib(_ - 2)
)

console.log(fib(10))
