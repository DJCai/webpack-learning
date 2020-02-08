module.exports = {
  presets: [
    [
      '@babel/preset-env', // 使用该规则进行文件处理
    ],
  ],
  plugins: [
    process.env.SSR ? null : '@babel/plugin-transform-runtime', // ssr时, 不执行
    '@babel/plugin-syntax-dynamic-import', // 识别异步import
    'lodash',
  ],
};
