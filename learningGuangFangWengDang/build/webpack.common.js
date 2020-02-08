const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'
console.log('NODE_ENV:', process.env.NODE_ENV)

function resolve(dir) {
    if (typeof dir === 'string') {
        return  path.resolve(__dirname, '..', dir)
    }
    if (Array.isArray(dir)) {
        return  path.resolve(__dirname, '..', ...dir)
    }   
}
module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: devMode ? 'js/[name].bundle.js' : 'js/[name]-[hash:8].bundle.js',
        chunkFilename: devMode ? 'js/[id].chunk.js' : 'js/[id]-[contenthash:8].chunk.js',
        path: resolve(['prod', 'dist']) // webpack打包之后的文件路径，所有经过打包之后的文件都会在该路径下，且必须是绝对路径
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                include: [resolve('src')],
                exclude: [resolve('node_modules')],//排除node_modules目录下的文件
                use: ['babel-loader']
            },
            {
                test: /\.json$/,
                include: [resolve('src')],
                use: 'json-loader'
            },
            {
                test: /\.css$/,
                include: [resolve('src')],
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.s(a|c)ss$/,
                include: [resolve('src')],
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workerParallelJobs: 2
                        }
                    },
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                include: [resolve('src')],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'assets/images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                include: [resolve('src')],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'assets/fonts/[name].[ext]'
                        }
                    }
                ]
            },
            // {
            //     test: /\.(cvs|tsv)$/,
            //     include: [resolve('src')],
            //     use: ['csv.loader']
            // },
            {
                test: /\.xml$/,
                include: [resolve('src')],
                use: [
                    {
                        loader: 'xml-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                resolve(['prod', 'dist'])
            ]
        }),
        new HtmlWebpackPlugin({
            title: '管理输出',
            filename: 'index.html',
            inject: true,
            favicon: resolve(['src', 'static', 'favicon', 'favicon-chinessFlag.ico']),
            template: resolve(['src', 'index.html'])
        }),
        new ManifestPlugin({
            fileName: 'manifest/manifest.js'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].css' : 'css/[name]-[contenthash:8].css',
            chunkFilename: devMode ? 'css/[id].css' : 'css/[id]-[contenthash:8].css',
            options: {
                publicPath: '../'   // css文件提取出来后, 需重新设置引入资源的基础目录
            }
        }),
        new LodashModuleReplacementPlugin(), // 按需打包 LOADSH
        new CopyWebpackPlugin([
            {
                from: resolve(['src', 'static', 'images']),
                to: 'static/images'
            }
        ]),
        // new webpack.ProvidePlugin({ // // shim 预置全局变量
        //    _: 'lodash'
        // }),
    ],
    resolve: {
        extensions: ['.js', '.json', '.ts'],
        modules: [resolve('node_modules')], // 指定模块搜索目录
        alias: {
            // 各类非 js 直接引用（import require）静态资源，依赖相对路径加载问题，key值前添加前缀 ~ 
            '@':　resolve('src')
        }
    }
}