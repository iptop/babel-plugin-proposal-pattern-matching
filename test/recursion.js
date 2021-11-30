import { match } from '../match'
function f () {
  return match([1, 2, 3, 4, 5, 6])(
    ([a, ...b]) => match(a)(
      (v = 1) => b
    )
  )
}
console.log(f.toString())

console.log(f())
