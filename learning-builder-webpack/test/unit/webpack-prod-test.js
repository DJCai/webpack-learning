const assert = require('assert')

describe('webpack.prod.js test case', () => {
  const prodConfig = require('../../lib/webpack.prod.js')
  it('entry', () => {
    assert.equal(prodConfig.entry.index, 'h:/BAT进阶/webpack/webpack-learning/learning-builder-webpack/test/template/src/index/index.js')
  })
})