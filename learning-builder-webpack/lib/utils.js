const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// __dirname: 当前模块的目录名
// process.cwd():　当前Node.js进程执行时的工作目录 
const projectRoot = process.cwd();
// 路径拼接
const resolve = (dir) => {
  if (typeof dir === 'string') {
    return path.resolve(projectRoot, dir);
  }
  if (Array.isArray(dir)) {
    return path.resolve(projectRoot, ...dir);
  }
  return path.resolve(projectRoot);
};

// 多页面应用(MPA)打包
const setMPA = (fileKey = 'index', htmlTemplate = 'index.html') => {
  const devMode = process.env.NODE_ENV !== 'production';

  const entry = {};
  const htmlWebpackPlugins = [];
  const entryJsFiles = glob.sync(resolve(`src/*/${fileKey}.js`)) || [];
  // const entryJsxFiles = glob.sync(resolve(`src/*/${fileKey}.jsx`)) || [];
  const entryFiles = [].concat(entryJsFiles);

  entryFiles.length
    && entryFiles
      .forEach((entryFile) => {
        const regexp = new RegExp(`src/(.*)/${fileKey}.js`);
        const match = entryFile.match(regexp);
        const pageName = match && match[1];

        if (pageName) {
          entry[pageName] = entryFile;
          htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
              title: pageName,
              template: resolve(['src', pageName, htmlTemplate]), // 模板路径
              filename: `${pageName}.html`, // 打包出来的html名称
              favicon: resolve(['src', 'static', 'favicon',
                'favicon-chinessFlag.ico']),
              chunks: devMode ? [pageName] : ['vendor', 'common', pageName],
              inject: true, // 生成的chunk是否插入到html中
              minify: { // 压缩html
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCss: true,
                minifyJS: true,
                removeComments: false,
              },
            }),
          );
        }
      });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

module.exports = {
  resolve,
  setMPA,
};
