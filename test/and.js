import { match, and, not } from '../match'
const fib = n => match(n)(
  (_ = and(not(1), not(2))) => fib(_ - 1) + fib(_ - 2),
  _ => 1
)

console.log(fib(10))
