const assert = require('assert')

describe('webpack.ssr.js test case', () => {
  const ssrConfig = require('../../lib/webpack.ssr.js')
  it('entry', () => {
    assert.equal(ssrConfig.entry.search, 'h:/BAT进阶/webpack/webpack-learning/learning-builder-webpack/test/template/src/search/index-server.js')
  })
})