const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')

const mocha = new Mocha({
  timeout: '20000ms' // 设置超时时间
})

process.chdir(path.join(__dirname, '..', 'template'))

rimraf('./prod/dist', () => {
  const prodConfig = require('../../lib/webpack.prod.js')

  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.log(err)
      process.exit(2)
    }
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false
    }))
    console.log('Webpack build success begin run test.')

    mocha.addFile(path.join(__dirname, 'html-test.js'))
    mocha.addFile(path.join(__dirname, 'css-js-test.js'))
    mocha.run()
  })
})