import { match, T } from '../match'
const sum = x => match(x)(
  ([x = T.number, ...xs]) => x + sum(xs),
  ([]) => 0
)

console.log(sum([1, 2, 3]))
