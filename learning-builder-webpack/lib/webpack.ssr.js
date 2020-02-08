process.env.NODE_ENV = 'none';
process.env.SSR = true; // 是否是服务端渲染

const merge = require('webpack-merge');
const utils = require('./utils.js');
const prodcommon = require('./webpack.prodcommon.js');

const { entry, htmlWebpackPlugins } = utils.setMPA('index-server', 'index-server.html');

const ssrConfig = merge({
  mode: 'none',
  entry,
  output: {
    filename: '[name]-server.js',
    path: utils.resolve(['prod/ssrdist']), // webpack打包之后的文件路径，所有经过打包之后的文件都会在该路径下，且必须是绝对路径
    libraryTarget: 'umd',
  },
  plugins: htmlWebpackPlugins,
}, prodcommon, {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [utils.resolve('src')],
        use: 'ignore-loader',
      },
      {
        test: /\.s(a|c)ss$/,
        include: [utils.resolve('src')],
        use: 'ignore-loader',
      },
      {
        test: /\.less$/,
        include: [utils.resolve('src')],
        use: 'ignore-loader',
      },
    ],
  },
});

module.exports = ssrConfig;
