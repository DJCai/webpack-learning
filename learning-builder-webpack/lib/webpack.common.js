const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const utils = require('./utils.js');

const devMode = process.env.NODE_ENV === 'development';
console.log('NODE_ENV:', process.env.NODE_ENV); // eslint-disable-line

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: [utils.resolve('src')],
        exclude: [utils.resolve('node_modules')], // 排除node_modules目录下的文件
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.json$/,
        include: [utils.resolve('src')],
        use: 'json-loader',
      },
      {
        test: /\.css$/,
        include: [utils.resolve('src')],
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        include: [utils.resolve('src')],
        use: [
          {
            loader: 'thread-loader',
            options: {
              workerParallelJobs: 2,
            },
          },
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        include: [utils.resolve('src')],
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        include: [utils.resolve('src')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 字节
              name: 'assets/images/[name][hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/, // 针对网页优化的是woff/woff2
        include: [utils.resolve('src')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: 'assets/fonts/[name][hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(cvs|tsv)$/,
        include: [utils.resolve('src')],
        use: ['csv.loader'],
      },
      {
        test: /\.xml$/,
        include: [utils.resolve('src')],
        use: [
          {
            loader: 'xml-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        utils.resolve(['prod', process.env.SSR ? 'ssrdist' : 'dist']),
      ],
    }),
    new LodashModuleReplacementPlugin(), // 按需打包LOADSH
    new FriendlyErrorsWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.json'],
    // modules: [utils.resolve('node_modules')], // 指定模块搜索目录
    alias: {
      // 各类非 js 直接引用（import require）静态资源，依赖相对路径加载问题，key值前添加前缀 ~
      '@': utils.resolve('src'),
    },
  },
};
