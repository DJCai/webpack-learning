process.env.NODE_ENV = 'development';
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

function resolve(dir) {
    if (typeof dir === 'string') {
        return  path.resolve(__dirname, '..', dir)
    }
    if (Array.isArray(dir)) {
        return  path.resolve(__dirname, '..', ...dir)
    }   
}
module.exports = merge(common, {
    mode: 'development',
    output: {
        pathinfo: true
    },
    watch: true,
    watchOptions: {
        ignored: resolve('node_modules')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin() // 在热加载时直接返回更新文件名 
    ]
})