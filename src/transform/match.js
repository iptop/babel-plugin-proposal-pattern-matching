const { ast2code } = require('../util')

function getMatching ($root) {
  return $root.get('callee.arguments.0')
}

function getPatterns ($root) {
  return $root.get('arguments')
}

function resolveBody (babel, $$body) {
  const type = $$body.type
  if (type == 'BlockStatement') {
    return babel.template(`
    (()=>{
    RET
    })()
    `)(
      { RET: $$body.body }
    ).expression
  }
  return $$body
}

function createReturnBlock (babel, $pattern, $param, $$uid) {
  const paramName = $param.get('name').node
  const $body = $pattern.get('body')
  const $$body = $body.node
  $body.scope.rename(paramName, $$uid.name)
  const $$block = babel.template(`
    return RET
    `)({
    RET: resolveBody(babel, $$body)
  })
  return $$block
}

function createIFBlock (babel, $pattern, $param, $$uid) {
  const paramName = $param.get('left.name').node
  const $paramValue = $param.get('right')
  const $$paramValue = $paramValue.node
  const isOp = isOperation($paramValue)
  const $body = $pattern.get('body')
  const $$body = $body.node
  $body.scope.rename(paramName, $$uid.name)
  if (isOp) {
    const $$block = babel.template(`
    if(OP(UID) ){
      return RET
    }
  `)({
      UID: $$uid,
      OP: $$paramValue,
      RET: resolveBody(babel, $$body)
    })
    return $$block
  } else {
    const $$block = babel.template(`
    if(UID === VALUE ){
      return RET
    }
  `)({
      UID: $$uid,
      VALUE: $$paramValue,
      RET: resolveBody(babel, $$body)
    })
    return $$block
  }
}

function transformPatterns (babel, $patterns, $$uid) {
  return $patterns.map($pattern => {
    const $param = $pattern.get('params.0')
    const $$param = $param.node
    switch ($$param.type) {
      case 'AssignmentPattern':
        return createIFBlock(babel, $pattern, $param, $$uid)
      case 'Identifier':
        return createReturnBlock(babel, $pattern, $param, $$uid)
      case 'ArrayPattern':
        return createDeconstruction(babel, $pattern, $param, $$uid)
      case 'ObjectPattern':
        return createDeconstruction(babel, $pattern, $param, $$uid)
    }
  })
}

function isOperation ($paramValue) {
  if ($paramValue.get('object').getData('pattern-matching') == 'T') {
    return true
  }

  if ($paramValue.get('callee').getData('pattern-matching') == 'or') {
    return true
  }

  return false
}

function transformDeconstructionLeaf (babel, $param) {
  const $$IFBlocks = []
  const traverse = babel.traverse
  const $$param = $param.node
  traverse($$param, {
    AssignmentPattern (path) {
      const $paramValue = path.get('right')
      const isOp = isOperation($paramValue)
      const $$Assignment = path.node
      if (isOp) {
        const $$IFBlock = babel.template(`
        if(!OP(VAR) ){
          throw new Error("No matching pattern");
        }
        `)({ VAR: $$Assignment.left, OP: $$Assignment.right })
        $$IFBlocks.push($$IFBlock)
      } else {
        const $$IFBlock = babel.template(`
        if(VAR !== VAL ){
          throw new Error("No matching pattern");
        }
        `)({ VAR: $$Assignment.left, VAL: $$Assignment.right })
        $$IFBlocks.push($$IFBlock)
      }
      path.replaceWith($$Assignment.left)
    }
  }, $param.scope, $param.path)
  return $$IFBlocks
}

function createDeconstruction (babel, $pattern, $param, $$UID) {
  const $$param = $param.node
  const $body = $pattern.get('body')
  const $$body = $body.node

  const $$IFBlocks = transformDeconstructionLeaf(babel, $param)
  const $$deconstruction = babel.template(`
    try{
      let PATTERN = UID
      IFBLOCKS
      return RET
    }catch{
    }
    `)({
    UID: $$UID,
    PATTERN: $$param,
    RET: resolveBody(babel, $$body),
    IFBLOCKS: $$IFBlocks
  })
  return $$deconstruction
}

module.exports = function transformMatch (babel, referencePath) {
  const $root = referencePath.parentPath.parentPath
  const $$uid = $root.scope.generateUidIdentifier('uid')
  const $matching = getMatching($root)
  const $$matching = $matching.node
  const $patterns = getPatterns($root)
  const $$blocks = transformPatterns(babel, $patterns, $$uid).filter(item => item)

  const $$IIFE = babel.template(`
    (v=> {
      const UID = EXP
      BLOCKS
      throw new Error("No matching pattern");
    })()
    `)({
    UID: $$uid,
    EXP: $$matching,
    BLOCKS: $$blocks
  })
  $root.replaceWith($$IIFE)
}
