import { match, not ,or } from '../match'

console.log(
  match(1)(
    (v = not( or(1,456) )) => v,
    _=>''
  )
)

console.log(
  match(1)(
    (v = not( or(2,3) )) => v,
    _=>''
  )
)

console.log(
  match(2)(
    (v = or(not(2),not(3))) => v,
    _=>''
  )
)


console.log(
  match(2)(
    (v = or(not(2),not(2))) => v,
    _=>''
  )
)

console.log(
  match(2)(
    (v = not(not(2))) => v,
    _=>''
  )
)

console.log(
  match(2)(
    (v = not(not(3))) => v,
    _=>''
  )
)
