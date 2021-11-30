const babel_generator = require('@babel/generator').default
module.exports.ast2code = function ast2code (ast) {
  return babel_generator(ast).code
}
