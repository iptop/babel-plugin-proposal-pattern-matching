import { match } from '../match'

function f (data) {
  return match(data)(
    ([a, b, c]) => a + b + c,
    _ => 'string'
  )
}

console.log(
  f([1, 2, 3])
)

console.log(
  f('123')
)
