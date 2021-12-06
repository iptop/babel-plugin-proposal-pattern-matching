import { fnmatch, or } from '../match'
const fib = fnmatch(
  (v = or(1, 2)) => 1,
  _ => fib(_ - 1) + fib(_ - 2)
)

console.log(fib(10))
