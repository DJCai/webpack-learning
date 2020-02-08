const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: "none",
  entry: {
    'large-number': './src/index.js',
    'large-number.min': './src/index.js',
  },
  output: {
    filename: '[name].js',
    library: 'largeNumber',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ // mode为prduction时默认开启, 但未none时需主动添加设置
        include: /\.min\.js$/
      })
    ]
  }
}