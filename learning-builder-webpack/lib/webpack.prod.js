process.env.NODE_ENV = 'production';
const merge = require('webpack-merge');
const WorkboxPlugin = require('workbox-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const utils = require('./utils.js');
const prodcommon = require('./webpack.prodcommon.js');

const { entry, htmlWebpackPlugins } = utils.setMPA();

let prodConfig = merge({
  mode: 'production',
  entry,
  output: {
    filename: 'js/[name]-[chunkhash:8].bundle.js',
    chunkFilename: 'js/[name]-[contenthash:8].chunk.js',
    path: utils.resolve(['prod', 'dist']), // webpack打包之后的文件路径，所有经过打包之后的文件都会在该路径下，且必须是绝对路径
    publicPath: '/',
  },
  plugins: htmlWebpackPlugins,
}, prodcommon, {
  plugins: [
    new HTMLInlineCSSWebpackPlugin(), // css文件内联进打包文件中,HTML 加载完成 CSS 就可以直接渲染出来，避免页面闪动的情况
  ],
});

// 是否要开启PWA, 通过Service Worker离线运行
process.env.WORKBOX = false;
if (process.env.WORKBOX) {
  prodConfig = merge(prodConfig, {
    plugins: [
      new WorkboxPlugin.GenerateSW({ // 离线运行
        clientsClaim: true,
        skipWaiting: true,
        swDest: 'service-wroker.js',
      }),
    ],
  });
}

module.exports = prodConfig;
