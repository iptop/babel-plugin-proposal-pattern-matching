import { match, instanceOf , or, not} from '../match'

console.log(
  match([])(
    (v=instanceOf(Array))=>v
  )
)

console.log(
  match([])(
    (v=instanceOf(Object))=>v
  )
)

console.log(
  match([])(
    (v=instanceOf(Number))=>v,
    v=>''
  )
)

console.log(
  match([])(
    (v=or(instanceOf(Number),instanceOf(Object)))=>v,
    v=>''
  )
)

console.log(
  match([])(
    (v=or(instanceOf(Number),instanceOf(String)))=>v,
    v=>'no match'
  )
)


console.log(
  match([])(
    (v=not(instanceOf(Array)))=>v,
    v=>'no match'
  )
)
