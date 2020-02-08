const webpack = require('webpack');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const Jarvis = require('webpack-jarvis');
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
    function errorPlugin() { // 构建过程异常和中断处理
      this.hooks.done.tap('done', (stats) => { // this为构建对象compiler
        if (
          stats.compilation.errors
            && stats.compilation.errors.length
            && process.argv.indexOf('--watch') === -1) {
          process.exit(1); // 处理构建结果: 0 为成功, 非0为执行失败
        }
      });
    },
  ],
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
        // styles: { // 将所有CSS提取到一个文件中
        //   name: 'cache/styles',
        //   test: /\.css$/,
        //   chunks: 'all',
        //   enforce: true,
        // },
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
});

// 添加source-map
const isSourceMap = false;
if (isSourceMap) {
  prodConfig = merge(prodConfig, {
    devtool: 'source-map',
  });
}

// 监听编译阶段, 分析编译过程
const isBundleAnalysis = false;
if (isBundleAnalysis) {
  prodConfig = merge(prodConfig, {
    plugins: [
      new Jarvis({
        watchOnly: false, // 仅仅监听编译阶段。默认为true,如果设为false，jarvis不仅仅运行在编译阶段，在编译完成后还保持运行状态。
        // port: 3001, // optional: set a port
      }),
    ],
  });
}

// 是否需要使用cdn
const isNeedCDN = true;
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

module.exports = prodConfig;
