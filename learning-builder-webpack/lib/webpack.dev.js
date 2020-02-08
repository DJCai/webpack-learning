const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const utils = require('./utils.js');
const common = require('./webpack.common.js');

const { entry, htmlWebpackPlugins } = utils.setMPA();

// 放在内存中
module.exports = merge(common, {
  mode: 'development',
  entry,
  output: {
    filename: 'js/[name].bundle.js',
    path: utils.resolve(['prod', 'dist']), // webpack打包之后的文件路径，所有经过打包之后的文件都会在该路径下，且必须是绝对路径
    publicPath: '/', // dist目录之后的路径
    pathinfo: true,
  },
  devtool: 'cheap-module-eval-source-map',
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  devServer: {
    contentBase: utils.resolve(['prod', 'dist']),
    host: '127.0.0.1',
    port: 5000,
    hot: true,
    open: true,
    stats: 'errors-only'
  },
  plugins: htmlWebpackPlugins
    .concat([
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css',
        options: {
          publicPath: '../', // css文件提取出来后, 需重新设置引入资源的基础目录
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(), // 在热加载时直接返回更新文件名
    ]),
});
