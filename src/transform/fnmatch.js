const { transformPatterns } = require('./match')
const { getPatterns } = require('./match')
const { ast2code } = require('../util')

module.exports = function transformMatch (babel, referencePath) {
  const $root = referencePath.parentPath
  const $$uid = $root.scope.generateUidIdentifier('uid')
  const $patterns = getPatterns($root)
  const $$blocks = transformPatterns(babel, $patterns, $$uid).filter(item => item)

  const $$IIFE = babel.template(`
    UID=> {
      BLOCKS
      throw new Error("No matching pattern");
    }
    `)({
    UID: $$uid,
    BLOCKS: $$blocks
  })
  $root.replaceWith($$IIFE)
}
