process.env.NODE_ENV = 'development';
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const utils = require('./utils.js')
const common = require('./webpack.devcommon.js');

// 放在构建磁盘中
module.exports = merge(common, {
  stats: 'errors-only',
  watch: true,
  watchOptions: {
    ignored: utils.resolve('node_modules'),
  },
  plugins: [
      // 复制静态文件
      new CopyWebpackPlugin([
        {
          from: utils.resolve(['src', 'static', 'images']),
          to: 'static/images',
        },
      ])
    ],
});
