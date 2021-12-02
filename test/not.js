import { match, not, or, T } from '../match'

const toNumber = n => match(n)(
  (v = not(T.boolean)) => v,
  (v = true) => 1,
  (v = false) => 0
)

console.log(
  [true, false, 0, 1, 2, 3].map(toNumber)
)
