> react-app-rewired customize-cra babel-plugin-import -D

> yarn add --dev less less-loader
```json
"start": "react-app-rewired start",
"build": "react-app-rewired build",
"test": "react-app-rewired test",
"eject": "react-app-rewired eject"
```
+ config.overrides.js

```js
const { override, addLessLoader, fixBabelImports, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra');
const path = require('path');
module.exports = override(
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {},
	}),
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addWebpackAlias({
		['@']: path.resolve(__dirname, './src'),
	}),
	addDecoratorsLegacy()
);
```
