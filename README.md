> react-app-rewired customize-cra babel-plugin-import -D

> yarn add --dev less less-loader

```json
"start": "react-app-rewired start",
"build": "react-app-rewired build",
"test": "react-app-rewired test",
"eject": "react-app-rewired eject"
```

- config.overrides.js

```js
const { override, addLessLoader, fixBabelImports, addWebpackAlias, addDecoratorsLegacy } = require("customize-cra");
const path = require("path");
module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {},
  }),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "./src"),
  }),
  addDecoratorsLegacy()
);
```

## 环境变量设置

`.env.local`

```text
    REACT_APP_CESIUM_TOKEN= cesium token
    REACT_APP_TIANDITU_KAY=天地图key

```
