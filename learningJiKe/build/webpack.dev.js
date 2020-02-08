process.env.NODE_ENV = 'development';

const merge = require('webpack-merge');
const common = require('./webpack.devcommon.js');

// 放在内存中
module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map',
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  }
});
