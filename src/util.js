const babel_generator = require('@babel/generator').default
module.exports.ast2code = function ast2code (ast) {
  return babel_generator(ast).code
}

module.exports.referenceReName = function ($body, oldName, newName) {
  const $$bindings = $body.scope.bindings
  for (const key in $$bindings) {
    const $$binding = $$bindings[key]
    if ($$binding.identifier.name === oldName) {
      $$binding.referencePaths.forEach($refItem => {
        $refItem.node.name = newName
      })
    }
  }
}
