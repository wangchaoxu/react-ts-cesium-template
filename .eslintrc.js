/*
 * @Author: your name
 * @Date: 2020-03-26 08:59:56
 * @LastEditTime: 2020-09-18 14:04:16
 * @LastEditors: wangchaoxu
 * @Description: In User Settings Edit
 * @FilePath: \weidun\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "react-app", "plugin:prettier/recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    endOfLine: 0,
    "no-unused-vars": 0,
    "no-useless-escape": 0, //忽略转义字符验证
  },
  plugins: ["@typescript-eslint", "react"],
  globals: {
    AMap: true,
    AMapUI: true,
    _: true,
    $: true,
    Vue: true,
    cyberplayer: true,
  },
};
