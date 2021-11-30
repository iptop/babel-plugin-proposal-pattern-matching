const { ast2code, referenceReName } = require('../util')

module.exports = function transformMatch (babel, referencePath) {
  function getMatching ($root) {
    return $root.get('callee.arguments.0')
  }

  function getPatterns ($root) {
    return $root.get('arguments')
  }

  function createReturnBlock ($pattern, $param) {
    const paramName = $param.get('name').node
    const $body = $pattern.get('body')
    const $$body = $body.node
    referenceReName($body, paramName, '__exp__')
    const $$block = babel.template(`
    return RET
    `)({ RET: $$body })
    return $$block
  }

  function createIFBlock ($pattern, $param) {
    const paramName = $param.get('left.name').node
    const $$paramValue = $param.get('right').node
    const $body = $pattern.get('body')
    const $$body = $body.node
    referenceReName($body, paramName, '__exp__')
    const $$block = babel.template(`
    if(__exp__ == VALUE ){
      return RET
    }
  `)({ VALUE: $$paramValue, RET: $$body })
    return $$block
  }

  function transformPatterns ($patterns) {
    return $patterns.map($pattern => {
      const $param = $pattern.get('params.0')
      const $$param = $param.node
      switch ($$param.type) {
        case 'AssignmentPattern':
          return createIFBlock($pattern, $param)
        case 'Identifier':
          return createReturnBlock($pattern, $param)
        case 'ArrayPattern':
          return createDeconstruction($pattern, $param)
        case 'ObjectPattern':
          return createDeconstruction($pattern, $param)
      }
      return null
    })
  }

  function transformDeconstructionLeaf ($param) {
    const $$IFBlocks = []
    const traverse = babel.traverse
    const $$param = $param.node
    traverse($$param, {
      AssignmentPattern (path) {
        const $$Assignment = path.node
        const $$IFBlock = babel.template(`
        if(VAR != VAL ){
          throw new Error("No matching pattern");
        }
        `)({ VAR: $$Assignment.left, VAL: $$Assignment.right })
        $$IFBlocks.push($$IFBlock)
        path.replaceWith($$Assignment.left)
      }
    }, $param.scope, $param.path)
    return $$IFBlocks
  }

  function createDeconstruction ($pattern, $param) {
    const $$param = $param.node
    const $body = $pattern.get('body')
    const $$body = $body.node

    const $$IFBlocks = transformDeconstructionLeaf($param)

    const $$deconstruction = babel.template(`
    try{
      let PATTERN = __exp__
      IFBLOCKS
      return RET
    }catch{
    }
    `)({ PATTERN: $$param, RET: $$body, IFBLOCKS: $$IFBlocks })
    return $$deconstruction
  }

  const $root = referencePath.parentPath.parentPath
  const $matching = getMatching($root)
  const $$matching = $matching.node
  const $patterns = getPatterns($root)
  const $$blocks = transformPatterns($patterns).filter(item => item)

  const $$IIFE = babel.template(`
    (v=> {
      const __exp__ = EXP
      BLOCKS
      throw new Error("No matching pattern");
    })()
    `)({
    EXP: $$matching,
    BLOCKS: $$blocks
  })
  $root.replaceWith($$IIFE)
}
