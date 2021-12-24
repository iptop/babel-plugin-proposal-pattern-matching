![avatar](../../doc/img/logo.png)
## 关于本项目

本项目是一个实验性质的项目，从Python、Scala、Rust、Clojure等语言中获得灵感，通过Babel插件的方式在JavaScript中支持`模式匹配`技术，创建该项目的原则
* 新的`模式匹配`语法必须完全符合现有ES规范，要做的只是在旧的语法上扩展全新的语义（这样做的目的是为了避免太过激进的语法改造使得编辑器、代码格式化工具等工具链无法适配）
* 最简洁的书写语法
* 最低限度的运行时性能开销

## 安装

从 npm:
```sh
npm install --save-dev babel-plugin-proposal-pattern-matching
```

## 配置

### .babelrc

```json
{
  "plugins": ["babel-plugin-proposal-pattern-matching"]
}
```

## 例子

### 一个简单的例子
```js
import match from 'babel-plugin-proposal-pattern-matching/match'
const fib = n=>match(n)(
        (v=1)=>1,
        (v=2)=>1,
        _=>fib(_-1)+fib(_-2)
)

console.log(fib(10))
// -> 55
```

### fnmatch
有的时候我们希望match先接收patterns再直接返回一个接收待匹配值的函数，这样有助于简化我们的代码
```js
import match from 'babel-plugin-proposal-pattern-matching/match'
const fib = fnmatch(
  (v = 1) => 1,
  (v = 2) => 1,
  _ => fib(_ - 1) + fib(_ - 2)
)

console.log(fib(10))

// -> 55

const arr = [1, 2, 3]

console.log(
  arr.map(
    fnmatch(
      (v = 1) => 'one',
      (v = 2) => 'two',
      (v = 3) => 'three'
    )
  )
)

// -> [ 'one', 'two', 'three' ]

```

### type
类型判断，这里的类型指的是使用JavaScript中的 typeof所能获得的类型
```js
import { match , T} from 'babel-plugin-proposal-pattern-matching/match'

const getType = item => match(item)(
  (v = T.number) => 'number',
  (v = T.string) => 'string',
  (v = T.nullish) => 'nullish',
  _ => `${_} undefined type`
)

console.log(getType('a'))
// -> string

console.log(getType(1))
// -> number

console.log(getType(undefined))
// -> nullish

console.log(getType(null))
// -> nullish


```

### instanceOf
类型判断，这里的类型判断主要针对Object类型，和JavaScript中的instanceof也是等价的
```js
import { match, instanceOf } from 'babel-plugin-proposal-pattern-matching/match'

const getType = val => match(val)(
  (v=instanceOf(RegExp))=>'RegExp',
  (v=instanceOf(Array))=>'Array',
  (v=instanceOf(Object))=>'Object',
)

console.log(getType(/111/))
// -> RegExp
console.log(getType([1,2,3]))
// -> Array
console.log(getType({a:1}))
// -> Object
```

### deconstruction
解构，这个是模式匹配技术常用的一个姿势，也是模式匹配技术的一个强大之处，支持递归
```js
import { match } from 'babel-plugin-proposal-pattern-matching/match'
const sum = x => match(x)(
  ([x, ...xs]) => x + sum(xs),
  ([]) => 0
)

console.log(sum([1, 2, 3]))
// -> 6


for (let i = 1; i <= 15; i++) {
  console.log(
    match({a: i % 3, b: i % 5})(
      ({a = 0, b = 0}) => 'FizzBuzz',
      ({a = 0, b}) => 'Fizz',
      ({a, b = 0}) => 'Buzz',
      _ => i
    )
  )
}
// ->
// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
// 7
// 8
// Fizz
// Buzz
// 11
// Fizz
// 13
// 14
// FizzBuzz

```

### not
内置逻辑操作，表示不满足某个条件
```js
import { match, not, or, T } from 'babel-plugin-proposal-pattern-matching/match'

const toNumber = n => match(n)(
  (v = not(T.boolean)) => v,
  (v = true) => 1,
  (v = false) => 0
)

console.log(
  [true, false, 0, 1, 2, 3].map(toNumber)
)
// -> [ 1, 0, 0, 1, 2, 3 ]
```

### or
内置逻辑操作，表示至少满足多个条件中的任意一个
```js
import { match, or } from 'babel-plugin-proposal-pattern-matching/match'
const fib = n => match(n)(
  (v = or(1, 2)) => 1,
  _ => fib(_ - 1) + fib(_ - 2)
)

console.log(fib(10))
// -> 55
```

### and
内置逻辑操作，表示同时满足多个条件
```js
import { match, and, not } from 'babel-plugin-proposal-pattern-matching/match'
const fib = n => match(n)(
  (_ = and(not(1), not(2))) => fib(_ - 1) + fib(_ - 2),
  _ => 1
)

console.log(fib(10))
// -> 55
```

## LICENSE

MIT
