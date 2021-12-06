function match () {

}

function fnmatch () {

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

const and = createRuntimeFunction(function () {
  const args = arguments
  return createRuntimeFunction(function (val) {
    for (let i = 0; i < args.length; i++) {
      const test = args[i]
      if (typeof test === 'function' && test.isPatternMatchingRuntimeFunction) {
        if (!test(val)) {
          return false
        }
      } else {
        if (val !== test) {
          return false
        }
      }
    }
    return true
  })
})

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

const not = createRuntimeFunction(function (test) {
  return createRuntimeFunction(function (val) {
    if (typeof test === 'function' && test.isPatternMatchingRuntimeFunction) {
      return !test(val)
    }
    return test !== val
  })
})

const instanceOf = createRuntimeFunction(function (constructor) {
  return createRuntimeFunction(function (val) {
    return val instanceof constructor
  })
})

module.exports = match
module.exports.match = match
module.exports.fnmatch = fnmatch
module.exports.T = T
module.exports.and = and
module.exports.or = or
module.exports.not = not
module.exports.instanceOf = instanceOf
