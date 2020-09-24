module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser", // 指定ESLint解析器
  extends: [
    "plugin:react/recommended", // 使用来自 @eslint-plugin-react 的推荐规则
    "plugin:@typescript-eslint/recommended", // 使用来自@typescript-eslint/eslint-plugin的推荐规则
    "prettier/@typescript-eslint", // 使用 ESLint -config-prettier 禁用来自@typescript-eslint/ ESLint 与 prettier 冲突的 ESLint 规则
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018, // 允许解析最新的 ECMAScript 特性
    sourceType: "module", // 允许使用 import
    ecmaFeatures: {
      jsx: true, // 允许对JSX进行解析
    },
  },
  rules: {
    // 自定义规则
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    endOfLine: 0,
    "no-unused-vars": 0,
    "no-useless-escape": 0, //忽略转义字符验证
    "import/no-unresolved": [2, { ignore: ["^@/"] }],
  },
  settings: {
    react: {
      version: "detect", // 告诉 eslint-plugin-react 自动检测 React 的版本
    },
  },
  globals: {
    AMap: true,
    Cesium: true,
  },
};
