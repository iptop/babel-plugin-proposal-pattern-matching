const matchRegex = /[./]match(\.c?js)?$/
module.exports = (babel, path, state) => {
  const source = path.node.source.value
  if (!matchRegex.test(source)) {
    return
  }

  // 查找引用在NodePath上设置AST标志
  for (let i = 0; i < path.node.specifiers.length; i++) {
    const $$import = path.node.specifiers[i]
    const localName = $$import.local.name
    const importedName = $$import.type === 'ImportDefaultSpecifier' ? 'default' : $$import.imported.name

    const binding = path.scope.getBinding(localName)
    const $referencePaths = binding.referencePaths

    for (let j = 0; j < $referencePaths.length; j++) {
      const $referencePath = $referencePaths[j]

      if (importedName == 'default' || importedName == 'match') {
        $referencePath.setData('pattern-matching', 'match')
      }

      if (importedName == 'fnmatch') {
        $referencePath.setData('pattern-matching', 'fnmatch')
      }

      if (importedName == 'T') {
        $referencePath.setData('pattern-matching', 'T')
      }

      if (importedName == 'and') {
        $referencePath.setData('pattern-matching', 'and')
      }

      if (importedName == 'or') {
        $referencePath.setData('pattern-matching', 'or')
      }

      if (importedName == 'not') {
        $referencePath.setData('pattern-matching', 'not')
      }

      if (importedName == 'instanceOf') {
        $referencePath.setData('pattern-matching', 'instanceOf')
      }
    }
  }
}
