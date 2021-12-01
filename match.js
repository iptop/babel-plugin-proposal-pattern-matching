function match () {

}

const T = {
  string: function (val){
    return typeof val === 'string'
  },
  number: function (val){
    return typeof val === 'number'
  },
  boolean: function (val){
    return typeof val === 'boolean'
  },
  nullish: function (val){
    return val===undefined || val===null
  },
  NaN: isNaN
}

function or () {
  const args = arguments
  return function (val){
    for (let i=0;i<args.length;i++){
      if(val === args[i]){
        return true
      }
    }
    return false
  }
}

module.exports = match
module.exports.match = match
module.exports.T = T
module.exports.or = or
