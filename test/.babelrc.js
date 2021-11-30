module.exports = {
  presets: [['@babel/env', {
    targets: {node: 14},
    loose: true
  }]],
  "plugins":[
    "../src/index"
  ]
}
