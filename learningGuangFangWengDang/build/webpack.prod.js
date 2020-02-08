process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Jarvis = require("webpack-jarvis");
const WorkboxPlugin = require('workbox-webpack-plugin');

let prodConfig = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/', //dist目录之后的路径
  },
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      // new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {  // 将所有CSS提取到一个文件中
          name: 'cache/styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'cache/modules',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ]
});

// 添加source-map
const isSourceMap = false
if (isSourceMap) {
  prodConfig = merge(prodConfig,{
    devtool: 'source-map'
  })
}

// 监听编译阶段, 分析编译过程
const isBundleAnalysis = false
if (isBundleAnalysis) {
  prodConfig = merge(prodConfig, {
    plugins: [
      new Jarvis({
        watchOnly: false, // 仅仅监听编译阶段。默认为true,如果设为false，jarvis不仅仅运行在编译阶段，在编译完成后还保持运行状态。
        port: 3001 // optional: set a port
      })
    ]
  })
}

// 是否要开启PWA, 通过Service Worker离线运行
process.env.WORKBOX = true
if (process.env.WORKBOX) {
  prodConfig = merge(prodConfig, {
    plugins: [
      new WorkboxPlugin.GenerateSW({  // 离线运行
        clientsClaim: true,
        skipWaiting: true,
        swDest: 'service-wroker.js'
      })
    ]
  })
}

module.exports = prodConfig