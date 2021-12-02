import { match, T } from '../match'

console.log(
  ['a',
    1,
    null,
    undefined,
    0,
    [1, 2, 3]
  ].map(item => match(item)(
    (v = T.number) => `${v} is number`,
    (v = T.string) => `${v} is string`,
    (v = T.nullish) => `${v} is nullish`,
    _ => `${_} undefined type`
  ))
)
