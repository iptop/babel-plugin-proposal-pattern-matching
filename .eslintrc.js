module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
    commonjs: true,
    amd: true
  },
  extends: ['eslint:recommended', 'standard'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'off',
    camelcase: 'off',
    eqeqeq: 'off',
    'array-callback-return': 'off',
    'no-empty-pattern': 'off'
  }
}
