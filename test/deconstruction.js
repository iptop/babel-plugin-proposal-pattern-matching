import { match } from '../match'
for (let i = 1; i <= 15; i++) {
  console.log(
    match({ a: i % 3, b: i % 5 })(
      ({ a = 0, b = 0 }) => 'FizzBuzz',
      ({ a = 0, b }) => 'Fizz',
      ({ a, b = 0 }) => 'Buzz',
      _ => i
    )
  )
}
