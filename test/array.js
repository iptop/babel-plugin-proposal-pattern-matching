import { match } from '../match'
const sum = x => match(x)(
  ([x, ...xs]) => x + sum(xs),
  ([]) => 0
)

console.log(sum([1, 2, 3]))
