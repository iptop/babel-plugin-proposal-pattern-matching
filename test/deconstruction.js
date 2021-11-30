import { match as myMatch } from '../match'
for (let i = 1; i <= 100; i++) {
  console.log(
    myMatch([i % 3, i % 5])(
      ([a = 0, b = 0]) => 'FizzBuzz',
      ([a = 0, b]) => 'Fizz',
      ([a, b = 0]) => 'Buzz',
      _ => i
    )
  )
}
