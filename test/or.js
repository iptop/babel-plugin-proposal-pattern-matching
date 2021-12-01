import { match, or, T } from '../match'
console.log(
  match(null)(
    (v = or(T.boolean, T.number, null)) => v,
    (_) => ''
  )
)
