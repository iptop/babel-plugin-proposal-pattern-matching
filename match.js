function match () {

}

function createRuntimeFunction (f) {
  f.isPatternMatchingRuntimeFunction = true
  return f
}

const T = {
  string: createRuntimeFunction(function (val) {
    return typeof val === 'string'
  }),
  number: createRuntimeFunction(function (val) {
    return typeof val === 'number'
  }),
  boolean: createRuntimeFunction(function (val) {
    return typeof val === 'boolean'
  }),
  nullish: createRuntimeFunction(function (val) {
    return val === undefined || val === null
  }),
  NaN: createRuntimeFunction(function (val) {
    return isNaN(val)
  })
}
const or = createRuntimeFunction(function () {
  const args = arguments
  return createRuntimeFunction(function (val) {
    for (let i = 0; i < args.length; i++) {
      const test = args[i]
      if (typeof test === 'function' && test.isPatternMatchingRuntimeFunction) {
        if (test(val)) {
          return true
        }
      } else {
        if (val === test) {
          return true
        }
      }
    }
    return false
  })
})

const not = createRuntimeFunction(function (test){
  return createRuntimeFunction(function (val){
    if (typeof test === 'function' && test.isPatternMatchingRuntimeFunction) {
      return !test(val)
    }
    return test!==val
  })
})

module.exports = match
module.exports.match = match
module.exports.T = T
module.exports.or = or
module.exports.not = not
