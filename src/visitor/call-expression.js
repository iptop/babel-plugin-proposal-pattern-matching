const transformMatch = require('../transform/match')
module.exports = (babel, path, state) => {
  const $callee = path.get('callee')
  const $$callee = $callee.node
  if ($$callee.type == 'Identifier') {
    /* 从NodePath上抽取AST标记 */
    const astTag = $callee.getData('pattern-matching')
    if (astTag == 'match') {
      transformMatch(babel, $callee)
    }
  }
}
