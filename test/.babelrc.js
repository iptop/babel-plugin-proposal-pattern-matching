module.exports = {
  presets: [['@babel/env', {
    targets: {node: 6},
    loose: true
  }]],
  "plugins":[
    "../src/index"
  ]
}
