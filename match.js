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

module.exports = match
module.exports.match = match
module.exports.T = T
