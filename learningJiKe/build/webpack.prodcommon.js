const webpack = require('webpack');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const common = require('./webpack.common.js');
let prodConfig = merge(common, {
  stats: 'errors-only', // 构建日志的输出形式
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:8].css',
      chunkFilename: 'css/[id]-[contenthash:8].css',
      options: {
        publicPath: '../', // css文件提取出来后, 需重新设置引入资源的基础目录
      },
    }),
    new ManifestPlugin({
      fileName: 'manifest/manifest.js',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new FriendlyErrorsWebpackPlugin() // 优化构建过程的日志内容
  ],
});

// 添加source-map
const isSourceMap = false;
if (isSourceMap) {
  prodConfig = merge(prodConfig, {
    devtool: 'source-map',
  });
}

module.exports = prodConfig;
