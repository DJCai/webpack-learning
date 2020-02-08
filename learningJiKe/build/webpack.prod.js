process.env.NODE_ENV = 'production';
const merge = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Jarvis = require('webpack-jarvis');
const WorkboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const utils = require('./utils.js')
const common = require('./webpack.prodcommon.js');

const { entry, htmlWebpackPlugins } = utils.setMPA('index');

let prodConfig = merge({
  mode: 'production',
  entry,
  output: {
    filename: 'js/[name]-[chunkhash:8].bundle.js',
    chunkFilename: 'js/[name]-[contenthash:8].chunk.js',
    path: utils.resolve(['prod', 'dist']), // webpack打包之后的文件路径，所有经过打包之后的文件都会在该路径下，且必须是绝对路径
    publicPath: '/'
  },
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new TerserJSPlugin({}), // 压缩js
      new OptimizeCSSAssetsPlugin({}), // 压缩css
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        styles: { // 将所有CSS提取到一个文件中
          name: 'cache/styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        // vendor: {
        //   test: /(react|react-dom)/,
        //   name: 'vendor',
        //   chunks: 'all',
        //   priority: 0,
        // },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: -10,
        },
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true, // 如果一个模块已经被打包过了,那么再打包时就忽略这个模块
        },
      },
    },
  },
  plugins: htmlWebpackPlugins.concat([
    new HTMLInlineCSSWebpackPlugin(), // css文件内联进打包文件中,HTML 加载完成 CSS 就可以直接渲染出来，避免页面闪动的情况
  ])
}, common);

// 监听编译阶段, 分析编译过程
const isBundleAnalysis = false;
if (isBundleAnalysis) {
  prodConfig = merge(prodConfig, {
    plugins: [
      new Jarvis({
        watchOnly: false, // 仅仅监听编译阶段。默认为true,如果设为false，jarvis不仅仅运行在编译阶段，在编译完成后还保持运行状态。
        port: 3001, // optional: set a port
      }),
    ],
  });
}

// 是否需要使用cdn
const isNeedCDN = false;
if (isNeedCDN) {
  prodConfig = merge(prodConfig, {
    plugins: [
      new HtmlWebpackExternalsPlugin({ // 引用的基础包通过cdn引入, 而不打包进压缩文件中
        externals: [
          {
            module: 'react',
            entry: 'https://cdn.bootcss.com/react/16.10.2/cjs/react.production.min.js', // 本地文件/  线上cdn文件
            global: 'React',
          },
          {
            module: 'react-dom',
            entry: 'https://cdn.bootcss.com/react-dom/16.10.2/cjs/react-dom-server.browser.production.min.js',
            global: 'ReactDom',
          },
        ],
      }),
    ],
  });
}

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
