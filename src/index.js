const resolveImportDeclaration = require('./visitor/import-declaration')
const resolveCallExpression = require('./visitor/call-expression')
module.exports = (babel) => {
  return {
    visitor: {
      ImportDeclaration (path, state) {
        resolveImportDeclaration(babel, path, state)
      },
      CallExpression (path, state) {
        resolveCallExpression(babel, path, state)
      }
    }
  }
}
