module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",
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
    "no-console": "off",
    "prefer-rest-params": "off",
    "no-unused-vars": "off",
    "react/jsx-filename-extension": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off"
  }
};
