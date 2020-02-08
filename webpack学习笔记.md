##基础篇
###webpack的介绍
####2019 05-29
课程讲师: 程柳峰  腾讯直播类开发工作 feFlow作者
1. 为什么要深入掌握webpack
1) 与应用场景的开发方式息息相关 手机 移动平板和可穿戴设备的普及, web前端开发触角从传统的pc页面开发发展到多终端的开发, 我们需要兼顾pc/H5等多种不同分辨率的页面开发. 因此针对不同的应用场景, 做不同的打包就显得很重要,如pc端的中后台应用,我们需要针对支持单页应用的打包构建, H5页面对性能和可访问性有极高要求,因此需要构建来支持服务端渲染和PWA离线缓存
2) node.js自2019年发布以来, node.js社区异常繁荣,迄今为止有80多万第三方插件/组件,且还在每天快速增加. 而npm组件在浏览器端的js代码中不能直接使用,这需要借助webpack等构建工具来快速复用各种优秀成熟的组件,从而加速web的开发
3) 当下前端最为流行的三大框架React/Angular.js/Vue,里面的一些语法如JSX和Vue指令无法在浏览器中直接解析,需要借助构建工具进行转换
4) webpack是前端构建领域最耀眼的一颗星, 无论哪条路线, 都需要很强的webpack知识,熟悉webpack的知识和应用场景, 能拓宽前端技术栈,在发现页面打包的速度和资源体积问题时,能够知道如何排查问题和优化;同时熟悉webpack的原理,有助于其他跨端应用的开发,如对小程序Weex/React Native/Electron等框架的打包时,能快速上手

2. 初学者学习webpack的过程中会遇到哪些困哪
1) 一切皆为模块
    js文件/HTML CSS/图片/字体都可以成为模块
2) webpack的配置异常灵活,且具备强大的插件化拓展能力
3) 需要了解webpack里面众多新的概念
    entry / output / mode / loaders / plugins / 热更新 / code spliting / tree shaking等等
4) webpack有学习曲线
    webpack打包的速度/体积/页面加载时的性能优化等,需要具备比较全面的webpack专业知识,搞懂webpack内部的运行原理和插件机制才能升入掌握

3. 课程设计
1) 基础篇: webpack的核心概念和开发必备技巧
2) 进阶篇: 以工程化思维编写一份健壮/可维护的构建配置,并掌握webpack构建速度和体积的优化策略
3) 原理篇: 通过webpack源码,剖析内部运行原理并编写自定义的loader和插件
4) 实战篇: 通过webpack商城项目实战牢固掌握所学知识,并最大化地提升开发阶段和发布阶段的构建体验

####2019-05-30
1. 构架工具的作用,及必要性
1) 转换ES6语法
    在低版本的浏览器支持的不是很好,需要构建工具转化ES6语法
2) 转换JSX
    三大框架React/Angular.js/Vue,里面的一些语法如JSX和Vue指令无法在浏览器中直接解析,需要借助构建工具进行转换
3) CSS前缀补全 / 预处理器
    less / sass
4) 压缩混淆
5) 图片压缩
2. 前端构建工具的演变之路
    ant + YUI Tool ----> grunt ----> fis3 / glup -----> rollup / webpack / parcel
3. 为什么选择webpack
1) 配置文件
    webpack默认配置文件: webpack.config.js
    可在package.json中通过webpack --config 指定配置文件, 
    如 webpack --config  webpack.dev.config.js  // 开发环境
    webpack --config  webpack.product.config.js  // 生产环境
2) 配置组成
```js
    module.exports = {
        entry: './src/index.js',                // 打包的入口文件
        output: './dist/main.js',               // 打包的输出文件
        mode: 'production',                     // 环境 production和development和none
        module: {               
            rules: [                            // loader 配置     
                { test: /\.txt$,use:'raw-loader'}
            ]
        },
        plugins: [ 
            new HtmlwebpackPlugin({             // 插件配置
                template: './src/index.html'
            })
        ]
    }
```
###环境搭建
####2019-06-01
1. 安装Node.js 和NPM
以下操作均在终端运行: 
1.1 安装nvm(http://github.com/nvm-sh/nvm)
1) a/b二选一进行安装nvm
    a. 通过curl安装: 
    `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh|bash`
    b. 通过wget安装: 
    `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh|bash`
2) 修改环境变量 
    `source ~/.bash_profile`
3) 检查是否安装成功nvm
    `nvm list`
    显示安装的所有node版本
1.2 安装node.js和npm
    `nvm install v10.15.3`   安装最新版本node
    检查是否安装成功: `node -v`, `npm -v`

2. 安装webpack和webpack-cli
在随便的一个文件夹中,如桌面的终端上执行以下操作: 
2.1 创建空目录和package.json
    `mkdir my-project`
    `cd my-project`
    `npm init -y`
2.2 安装webpack和webpack-cli
    `npm install webpack webpack-cli --save-dev`
    或 `npm i webpack webpack-cli -D`
    检查是否安装成功: 
    `./node_modules/.bin/webpack -v`

2.3 package.json中scripts中的常见用法
```json
    "scripts": {
        "build": "webpack --config webpack.config.js",
        "dev": "webpack-dev-serve"
    }
```
### 基本概念
1.1 entry
    告诉webpack如何需要编译的原始原件, 路径及文件名------源代码
    1) 单入口: entry 是一个字符串
```js
    module.exports = {
        entry: "./src/main.js"
    }
```
    2) 多入口: entry是一个对象
```js
    module.exports = {
        entry: {
            app: './src/app.js',
            adimnApp: './src/adminApp.js'
        }
    }
```
1.2 output 
    告诉webpack如何将编译后的文件输出到磁盘,指定编译后文件的目录及文件名-----结果代码
    1) 单入口,直接指定path和filename
```js
    module.exports = {
        entry: "./src/main.js",
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        }
    }
```
    2) 多入口, 通过占位符name确保文件名称的唯一
    name指定打包后文件的名称, 对应entry中的key值
```js
    module.exports = {
        entry: {
            main: './src/main.js',
            app: './src/app.js',
        },
        output: {
            path: path.resolve(__dirname,'dist'),
            filename: '[name].js'
        }
    }
```
####20190609
1.3 loaders
1.3.1 介绍
    webpack原生只支持JS和JSON两种文件类型;
    通过loaders可以将webpack原生不支持的其他文件类型转化为有效的模块,且可以添加到依赖图中;
    本身是一个函数, 接收源文件作为参数, 返回转换的结果
1.3.2 常用loaders
    babel-loader: 转换ES6/ES7等JS新特性语法
    css-loader: 支持.css文件的加载和解析
    less-loader: 将less文件转化成css
    ts-loader: 将TS转化为JS
    file-loader: 进行图片/字体等的打包
    raw-loader: 将文件与字符串的形式导入
    thread-loader: 多进程打包JS和CSS
1.3.3 用法介绍
```js
    const path = require('path')
    module.exports = {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [                           
                {
                    test: /\.txt$/,            //  test 指定匹配规则
                    use: 'raw-loader'          //  use  指定使用的loader名称
                }
            ]
        }
    }
```
1.4 plugins
1.4.1 介绍
    插件, 作用于整个构建过程
    用于bundle文件(打包文件)的优化/资源管理/环境变量注入
    做loader做不了的事
1.4.2 常用plugins有哪些
    CommonsChunkPlugin: 将chunks相同的模块代码提取成公共的js, 多应用于多页面打包
    CleanWebpackPlugin: 清理构建目录
    ExtractTextWebpackPlugin: 将CSS从bundle文件里提取成一个独立的css文件
    CopyWebpackPlugin: 将文件或者文件夹拷贝到构建的输出目录
    HtmlWebpackPlugin: 创建html文件去承载输出的bundle,不需打包后手动创建html文件
    UglifyjsWebpackPlugin: 压缩JS
    ZipWebpackPlugin: 将打包出的资源生成一个zip包
1.4.3 用法介绍
```js
    const path = require('path')
    module.exports = {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        plugins: [                           //    需要用到的插件放到plugins数组里
            new HtmlWebpackPlugin({ 
                template: './src/index.html'
            })
        ]
    }
```
####20190610
1.5 mode
1.5.1 介绍
    mode用于指定当前的构建环境是: `production` / `development` / `none`
1.5.2 用法
    使用webpack内置的函数进行设置, 默认值为`production`
1.5.3 内置函数的内置功能
    1) development
    设置`process.env.NODE_ENV`的值为`development`, 
    开启`NamedChunksPlugin`和`NamedModulesPlugin`,
    在代码热更新阶段,可以在控制台上打印哪一个模块发生的热更新,并打印出热更新模块路径
    2) production
    设置`process.env.NODE_ENV`的值为`production`,
    开启`FlagDependencyUsagePlugin`/`FlagIncludedChunksPlugin`/`ModuleConcatenationPlugin` / `NoEmitOnErrorsPlugin` / `OccurenceOrderPlugin` / `SideEffectsFlagPlugin` / `TerserPlugin`,
    代码压缩,识别代码是否存在副作用等
    3) node
    设置`process.env.NODE_ENV`的值为`none`
    不开启任何优化项

###常见用法
1. 解析ES6 和 解析React JSX
1.1 介绍
    使用`babel-loader`,配置文件为`.babelrc`
1.2 .babelrc介绍
1.2.1 两块内容
    plugin:一个plugin对应一个功能
    preset: 一系列plugin的集合
1.2.2 解析ES6的安装
    1) 解析ES6
    `npm i @babel/core @babel/preset-env babel-loader -D` 
    2) 解析React JSX
    `npm i react react-dom @babel/preset-react -D`  
1.2.3 解析
1.2 用法
```js
    // webpack.config.js 中
    const path = require('path')
    module.exports = {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        modules: {
            rules: [
                 {
                    test: /\.m?js$/,
                    include: [resolve('src')], // 指定解析的文件目录
                    exclude: [resolve('node_modules')],//排除node_modules目录下的文 件
                    use: ['babel-loader']
                }
            ]
        }
    }
    // .babelrc中
    {
        "presets": [
            [
                "@babel/preset-env", // 使用该规则进行文件处理
                {
                    "targets": { // 定义适用环境
                        "node": "current",
                        "browsers": [ "ie >= 8", "chrome >= 62" ]
                    }
                }
            ],
            "@babel/preset-react" // 使用该规则进行文件处理jsx文件
        ],
        "plugins": ["@babel/plugin-transform-runtime"] // .
    }
```
####20190614
2. 解析CSS 和 解析less / sass
2.1 介绍
    使用`css-loader`,用于加载`.css`文件,并且转化为`commonjs`对象
    使用`style-loader`, 将样式通过`<style>`标签插入到`head`中,
    loader调用是链式调用, 解析也是链式解析, 解析顺序是从右到左, 所以需要先写css-loader,再写style-loader
2.2 安装
    1) 解析css
    `npm i style-loader css-loader -D`
    2) 解析less
    `npm i less less-loader -D`
2.3 使用
```js
    // webpack.config.js 中
    const path = require('path')
    module.exports = {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [                       // 解析css的配置, 解析顺序从后到前
                        'style-loader',
                        'css-loader'             
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                }
            ]
        }
    }
```

####20190616
3. 解析图片和字体
3.1 介绍
    两种方式,均可以处理图片和字体
    1) 使用file-loader
    2) 使用url-loader
    url-loader还可以设置较小资源,如小图片和小字体文件,自动base64,底层也是使用file-loader
3.2 安装
    1) 解析file-loader
    `npm i file-loader -D`
    2) 解析url-loader
    `npm i url-loader -D`
3.3 使用
    1) 使用file-loader解析
```js
    // webpack.config.js 中
    const path = require('path')
    module.exports = {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpg|svg|gif|jpeg)$/,   // 解析图片的配置
                    use: 'file-loader'
                },
                {
                    test: /\.(woff|woff2|eot|ttf)$/,    // 解析字体的配置
                    use: 'file-loader'
                }
            ]
        }
    }
```
    2) 使用url-loader解析
```js
    // webpack.config.js 中
    const path = require('path')
    module.exports = {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpg|svg|gif|jpeg)$/,   // 解析图片的配置
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10240      // limit单位: 字节, 10240为10k, 文件大小小于改值, 自动进行base64
                        }
                    }]
                },
                {
                    test: /\.(woff|woff2|eot|ttf)$/,    // 解析字体的配置
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }]
                }
            ]
        }
    }
```
3.4 字体文件的引入
    1) 字体文件,如 `FontAwesome.otf`,复制到指定文件夹中,
    2) webpack.config.js中设置解析字体的配置
    3) 样式文件引入字体族
```less
    // 定义字体
    @font-face {
        font-family: 'FontAwesome',
        src: url('./learnRoad/20190611-simple_demo/src/static/FontAwesome.otf') format('truetype');
    }
    // ttf -> truetype
    // woff -> woff 针对网页进行特殊优化，是Web字体中最佳格式
    // 使用
    div {
        font-size: 30px;
        color: 'red';
        font-family: 'FontAwesome'
    }
```

####20190617 
4. 文件监听
4.1 介绍
    文件监听是在发现源码发生变化时, 自动重新创建出新的输出文件,文件保存在本地磁盘
4.2 开启方式
    介绍: 启动webpack命令时, 带上--watch参数
    方法: package.json中的scripts增加 `"watch": "webpack --watch"`, 编译时使用`npm run watch`
    缺点: 每次内容保存后,需要手动刷新浏览器
4.3 文件监听的原理分析
    介绍: 轮询判断文件的最后编译时间是否变化
        某个文件发生变化, 先缓存起来,等待aggregateTimeout时间,再告诉监听者
    方法: 在配置webpack.config.js中设置watch:true, 并配置watchOption, 运行`npm run build`也可启动文件监听
```js
    module.exports={
        // 默认false, 不开启文件监听
        watch: true,
        // watch: true时, watchOptions才有意义
        watchOptions: {
            // 默认为空, 不监听的文件或文件夹, 支持正则匹配
            ignored: /node_modules/,
            // 监听到变化后,等待300ms再去执行,默认300
            aggregateTimeout: 300,
            // 判断文件是否发生变化是通过不断轮询系统指定文件有没变化实现变化的, 默认每1秒问1次
            poll: 1000
        }
    }
```
####20190619
5. 热更新
5.0 热更新分析
    多听几次
5.1 介绍
    1) 使用 `webpack-dev-serve`
    2) 使用 `webpack-dev-middleware`

    WDS/WDM 不刷新浏览器
    不输出文件, 而是放到内存中
    配合使用webpack内置的HotModuleReplacementPlugin插件
5.2 安装
    1) `npm i webpack-dev-server -D`
    2) `npm i webpack-dev-middleware-D`
5.3 使用
5.3.1 使用`webpack-dev-sever`
    1) package.json中的scripts增加 `"dev": "webpack-dev-server --open"`, 编译时使用`npm run dev`
       open的意思为构建完成后自动开启浏览器
    2) webpack.config.js中的mode属性, 改为`development` 
    3) webpack.config.js中引入webpack, plugins中引入使用HotModuleReplacementPlugin插件,并配置devServer,设置基础目录
```js
    // webpack.config.js 中
    const path = require('path')
    const webpack = requre('webpack')
    module.exports = {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        plugins: [ 
            new webpack.HotModuleRelacementPlugin()      // 热更新插件
        ],
        devServer: {  
            contentBase: './dist',                       // 配置热更新基础文件
            hot: true
        }
    }
```
5.3.2 使用`webpack-dev-middleware`
    **任务: 认真学习项目中的这一块的配置, 并懂得如何配置
    1) 介绍
    WDM将webpack输出的文件输给服务器, 适用于灵活的定制场景
    2) 使用方法
    创建node_server
```js
    const express = require('express')
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')

    const app = express()
    const config = require('./learnRoad/webpack.config.js')
    const compiler = webpack(config)

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    app.listen(3000, function() {
        console.log("example app listening on port 3000")
    })
```

6. 文件指纹
6.1 介绍
    含义: 打包输出的文件名的后缀
    作用: 用于版本管理, 修改的文件通过新文件指纹表示新文件, 没修改的文件其文件指纹仍然没变, 页面加载时仍然可从浏览器缓存中获取
6.2 如何生成
    1) Hash: 和整个项目的构建相关, 只要项目文件有修改, 整个项目构建的hash值就会更改
        缺点: 只要有一个文件更改, 整个项目的文件的hash就会改
    2) Chunkhash: 和webpack打包的chunk有关, 不同的entry会生成不同的chunk,
        chunk指模块, 不同模块需要保持相对独立, 适用于多个页面打包隔离,适用js文件
    3) Contenthash: 根据文件内容来定义hash, 文件内容不变, 则Contenthash不变, 适用于css使用
6.3 JS文件指纹设置
    通过output的filename, 使用`[Chunkhash]`
```js
    // webpack.prod.js 中
    const path = require('path')
    module.exports = {
        entry: {
            main: './src/main.js',
            app: './src/app.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name][chunkhash:8].js'
        }
    }
```
6.4 css文件指纹设置
    安装插件MiniCssExtracPlugin : `npm i MiniCssExtracPlugin -D`
    使用[Contenthash], 将css样式抽离成一个独立文件
    注意:将loader中解析css的`style-loader`去掉, 因为其将css合入后html中的header中
```js
    // webpack.prod.js 中
    const path = require('path')
    const MiniCssExtracPlugin = require('mini-css-extract-plugin')
    module.exports = {
        entry: {
            main: './src/main.js',
            app: './src/app.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name][chunkhash:8].js'
        },
        plugins: [
            new MiniCssExtracPlugin({
                path: path.join(__dirname, 'dist')   // 指定目录
                filename: `css/[name][contenthash:8].css`           
            })
        ]
    }
```
####20190626
6.5 图片的文件指纹设置
    设置file-loader的name, 使用`[hash]`

6.5.1 常见占位符的含义
    `[ext]` : 资源后缀名
    `[name]` : 文件名称
    `[path]` : 文件的相对路径
    `[folder]` : 文件所在的文件夹
    `[contenthash]` : 文件内容的hash, 默认是md5生成
    `[hash]` : 文件内容的hash, 默认实md5生成
    `[emoji]` : 一个随机的指定文件内容的emoji

```js
    // webpack.prod.js 中
    const path = require('path')
    module.exports = {
        entry: {
            main: './src/main.js',
            app: './src/app.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name][chunkhash:8].js'
        },
        module: {
            rules:[
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,  // file-loader没有limit属性
                            path: path.join(__dirname, 'dist')   // 指定目录
                            name: 'img/[name][hash:8].[ext]'     // 放在img文件夹下, 带md5的前8位值
                        }
                    }
                }
            ]
        }
    }
```

7. 代码压缩
7.1 js文件的压缩
    内置了 uglifyjs-webpack-plugin, 编译出来就会自动压缩
7.2 css文件的压缩
    使用 `optimize-css-assets-webpack-plugin`,
    同时使用`cssnano`这个处理器
    安装 `npm i optimize-css-assets-webpack-plugin -D`
```js
    // webpack.prod.js 中
    const path = require('path')
    const OptimizeCssAssetsPlugin = require('optimize-css-assets-plugin')
    module.exports = {
        entry: {
            main: './src/main.js',
            app: './src/app.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name][chunkhash:8].js'
        },
        plugins: [
            new OptimizeCssAssetsPlugin({
                assetNameRegExp:/\.css$/,
                cssProcessor: require('cssnano')
            })
        ]
    }
```
7.3 html文件的压缩
    修改`html-webpack-plugin`, 设置压缩参数
    安装`npm i html-webpack-plugin`
```js
    // webpack.prod.js 中
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
        entry: {
            main: './src/main.js',
            app: './src/app.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name][chunkhash:8].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'dist/search.html'),  // html文件的模板,要与入口文件名字一致
                path: path.join(__dirname, 'dist'),             
                filename: 'search.html',                        // 指定打包出来的文件的名称,要与入口文件名字一致
                chunks: ['search'],                             // 生成的html文件的chunk,要与入口文件名字一致
                inject: true,                                   // 打包出来的chunk会主动注入到html页面中 
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCss: true,
                    minifyJS: true,
                    removeComments: false
                }
            })
        ]
    }
```

### 深入用法

1. 自动清理构建目录产物
1.1 当前构建时遇到的问题
    每次构建的时候不会自动清理目录, 造成构建的输出目录output文件越来越多
1.2 手动删除dist
    运行编译前, 先执行前置命令行
```js
    // package.json的scripts中,给build命令的添加前置命令
    `"build": "rm -rf ./dist && webpack --config webpack.prod.js `  // 或
    `"build": "rimraf ./dist && webpack --config webpack.prod.js `
```
1.3 自动清理构建目录
    使用`clean-webpack-plugin`
    安装 `npm i clean-webpack-plugin -D`
```js
    // webpack.prod.js 中
    const path = require('path')
    const {CleanWebpackPlugin} = require('clean-webpack-plugin')
    module.exports = {
        entry: {
            main: './src/main.js',
            app: './src/app.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name][chunkhash:8].js'
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    resolve(['prod', 'dist'])
                ]
            })
        ]
    }
```
####20190630
2. PostCSS 和 autoprefixer
2.1 介绍
    1) 配合插件`autoprefixer`, 根据Can I Use 规则(https://caniuse.com/), 自动补齐CSS3前缀
    2) 支持styleLint
    3) 支持css-module
2.2 autoprefixer与less/sass区别
    less/sass为css预处理器, 在编译代码前置处理
    autoprefixer为css后置处理器,就是在代码编译后,补齐CSS3前缀
2.3 使用方式
    0) 准备
        `npm i -D postcss-loader postcss-preset-env`
    1) package.json中
    添加属性`browserslist`, 与`scripts`同级
```js
    "browserslist": [
        "last 2 version",
        "> 1%",
        "IOS >=7",
        "Firefox > 20"
    ]
```
    2) 在webpack.prod.js中module中rules中解析`less`的后面添加内容
```js
    module: {
        rules: [
             {
                test: /\.less$/,
                include: [resolve('src')],
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader', // less处理后在加前缀处理
                    'less-loader'
                ]
            }
        ]
    }
```
    3) postcss.config.js中添加配置
```js
    module.exports = {
        plugins: {
           'postcss-preset-env': {}
        }
    }
```
####20200203
3. 资源内联
3.1 意义
    代码层面: 
        1) 页面框架的初始化脚本
        2) 上报相关打点
        3) css 内联避免页面闪动
    请求层面:
        1) 减少http网络请求数
            -- 小图片或字体内联
3.2 html和js内联
    1) 使用raw-loader@0.5.1
```js
    // html 在html-webpack-plugin中, 可是使用mjs语法
    ${require('raw-loader!./meta.html')}
    // js
    <script>${require('raw-loader!babel-loader!./static/js/inline.js')} </script>
```
    2) 使用html-inline-loader
```js
    // html文件
    <link href="./meta.html?__inline"/>>
    // js文件
    <script type="text/javascript" src="./static/js/inline.js?__inline"></script>
```
```js
    // html-inline-loader源代码
    const fs = require('fs');
    const path = require('path');

    const getContent = (matched, reg, resourcePath) => {
        const result = matched.match(reg);
        const relativePath = result && result[1];
        const absolutePath = path.join(path.dirname(resourcePath), relativePath);
        return fs.readFileSync(absolutePath, 'utf-8');
    };

    module.exports = function(content) {
      const htmlReg = /<link.*?href=".*?\__inline">/gmi;
      const jsReg = /<script.*?src=".*?\?__inline".*?>.*?<\/script>/gmi;

      content = content.replace(jsReg, (matched) => {
        const jsContent = getContent(matched, /src="(.*)\?__inline/, this.resourcePath);
        return `<script type="text/javascript">${jsContent}</script>`;
      }).replace(htmlReg, (matched) => {
        const htmlContent = getContent(matched, /href="(.*)\?__inline/, this.resourcePath);
        return htmlContent;
      });

      return `module.exports = ${JSON.stringify(content)}`;
    }
```
3.3 css内联
    1) 使用style-loader
    2) 使用 html-inline-css-webpack-plugin
```js
    const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default
    ...
    plugins: [
        new MiniCssExtractPlugin({
            // 相关配置
        }),
        new HtmlWebpackPlugin({
            // 相关配置
        }),
        new HTMLInlineCSSWebpackPlugin() // css文件内联进打包文件中,HTML 加载完成 CSS 就可以直接渲染出来，避免页面闪动的情况, 需放在 html-webpack-plugin 后面
    ]
```

### 4 tree-shaking
4.0 原理
    1) 没用的代码(dce): 
        a) 代码不会被执行, 不可执行
        b) 代码执行的结果不会被用到
        c) 代码只会影响死变量(只写不读)
    2) 利用es6模块特点
        a) 只能作为模块顶层语句出现
        b) import的模块只能是字符串常量, 只支持静态分析,不支持动态分析
        c) import binding是immutable的
    3) 代码擦除
        ugify阶段删除没用的代码
4.1 使用
    默认开启, 在 .babelrc里设置modules: false即可
    ---production mode的情况下默认开启
4.2 要求
    必须使用es6, 不能使用cjs

### 5. 集合ESLint
5.1 规范
    1) 基于eslint:recommend配置及改进
    2) 全部开启有助于帮助发现错误的规则
    3) 保持团队的代码风格统一, 不限制开发体验
5.2 落地方案
    1) webpack与CI/CD系统集成
    2) webpack与eslint集成, 推荐在新项目
5.3 成熟的eslint
    1) Aribnb: eslint-config-airbnb(针对react), eslint-config-airbnb-base
    2) 腾讯: 
        a) alloyteam团队eslint-config-alloy (https://github.com/AlloyTeam/eslint-config-alloy)
        b) ivweb团队 eslint-config-ivweb (https://github.com/feflow/eslint-config-ivweb)
5.4 webpack与eslint集成
    1) 依赖
    `npm i -D eslint eslint-loader babel-eslint eslint-import-resolver-alias eslint-plugin-import `
    若是react项目, 还需 `npm i -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y`
    再安装eslint配置`npm i -D eslint-config-airbnb`
    2) 使用
```js
    // webpack.common.js, loader添加eslint-loader
    module.exports = {
        module: {
            rules: [
                {
                  test: /\.m?js$/,
                  include: [resolve('src')],
                  exclude: [resolve('node_modules')], // 排除node_modules目录下的文件
                  use: ['babel-loader', 'eslint-loader'],
                },
            ]
        } 
    }  
    // .eslintrc.js
    module.exports = {
        parser: "babel-eslint", // 解析器
        extends: "airbnb", // 添加扩展基础
        env: {
            browser: true,
            node: true
        },
        settings: {
            // eslint对webpack的alias不识别, 需借助eslint-import-resolver-alias解决
            'import/resolver': {
              alias: {
                map: [
                  ['@', './src/']
                ]
              }
            }
        },  
        rules: {
            "no-console": "off"
        }
    }
    // package.json, script中添加命令行
    "scripts": {
        "lint:js_src": "eslint ./src/**/*.js --fix", // 指定文件类型
        "lint": "eslint src --fix" // 指定文件夹
    }
```
### 6. SSR服务端渲染
6.1 优点
    减少请求
    减少白屏时间
    对于SEO友好
6.2 思路
    1) 服务端
    使用react-dom/server的renderToString方法将React组件渲染成字符串
    服务端路由返回对应的模板
    2) 服务端
    打包出针对服务端的组件

### 7. 优化构建时命令行的显示日志
7.1 问题
    构建过程默认展示构建过程的日志, 可对于开发人员,只想关注发生错误或与警告的日志, 
7.2 统计信息stats
| Ppreset | Alternative | Description |
| ------- | ----------- | ----------- |
| errors-only |    none     | 只在发生错误时输出 |
| minimal |    none     | 只在发生错误或有新的编译时输出 |
|  none   |    false    | 没有输出 |
| normal  |    true     | 标准输出 |
| verbose |    none     | 全部输出 |

7.3 使用
    1) 安装
    `npm i -D friendly-errors-webpack-plugin`
    2) stats使用`errors-only`
```js
    const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
    // 开发环境
    module.exports = {
        ...
        devServer: {
            ...
            stats: 'errors-only'
        }
        plugins: [
            new FriendlyErrorsWebpackPlugin()
        ]
    }

    // 生产环境
    module.exports = {
        ...
        stats: 'errors-only'
        plugins: [
            new FriendlyErrorsWebpackPlugin()
        ]
    }
```