module.exports = {
  parser: "babel-eslint",
  extends: "airbnb-base",
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
    'no-unused-expressions': 0 // 允许短路求值和三目运算
  }
};
