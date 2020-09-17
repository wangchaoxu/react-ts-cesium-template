const { override, addLessLoader, fixBabelImports, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// webpack打包速度分析插件
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
// 开启gzip
const productionGzipExtensions = ['js', 'css', 'json', 'txt'];
const CompressionWebpackPlugin = require('compression-webpack-plugin'); //gzip压缩
// cesium路径映射
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const rewiredMap = () => (config) => {
	console.log('=======>' + config.mode + '===========');
	// config为所有的webpack配置
	config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false; // 生产环境关闭sourcemap关闭
	// if(process.env.NODE_ENV!=="development") config.plugins = [...config.plugins,...myPlugin]
	config.plugins.push(
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.join(cesiumSource, cesiumWorkers),
					to: 'Workers',
				},
				{
					from: path.join(cesiumSource, 'Assets'),
					to: 'Assets',
				},
				{
					from: path.join(cesiumSource, 'Widgets'),
					to: 'Widgets',
				},
			],
		}),
		new webpack.DefinePlugin({
			CESIUM_BASE_URL: JSON.stringify('./'),
		}),
		new CompressionWebpackPlugin({
			test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
			threshold: 10240, // 对超过10k的数据压缩
			deleteOriginalAssets: false, // 不删除源文件
		})
	);
	return config;
};
module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: 'css',
	}),
	addWebpackAlias({
		'@': './src',
		cesium$: 'cesium/Cesium',
		cesium: 'cesium/Source',
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {},
	}),
	addDecoratorsLegacy(),

	rewiredMap()
);