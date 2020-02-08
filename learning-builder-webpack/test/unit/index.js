
const path = require('path')
process.chdir(path.join(__dirname, '..', 'template'))

describe('builder-webpack test case', () => {
  require('./webpack-prod-test.js')
  require('./webpack-ssr-test.js')
})