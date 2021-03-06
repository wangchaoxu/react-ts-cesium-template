const { override, addLessLoader, fixBabelImports, addWebpackAlias, addDecoratorsLegacy } = require("customize-cra");
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
// 打包进度条
const WebpackBar = require("webpackbar");
// 生产环境去除注释
const TerserPlugin = require("terser-webpack-plugin");
// webpack 打包分析
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); //分析插件，打包后在build/static/report.html中展示各模块所占的大小
const analyze = process.env.REACT_APP_ANALYZE; //是否分析打包数据
// webpack打包速度分析插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
// 开启gzip
const productionGzipExtensions = ["js", "css", "json", "txt"];
const CompressionWebpackPlugin = require("compression-webpack-plugin"); //gzip压缩
// cesium路径映射
const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";
const webpackConfig = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    cesium$: "cesium/Cesium",
    cesium: "cesium/Source",
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {},
  }),
  (config) => {
    console.log("=======>" + config.mode + "===========");
    console.log(process.env.NODE_ENV);
    // config为所有的webpack配置
    config.devtool = config.mode === "development" ? "cheap-module-source-map" : false; // 生产环境关闭sourcemap关闭
    config.plugins.push(
      new WebpackBar(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(cesiumSource, cesiumWorkers),
            to: "Workers",
          },
          {
            from: path.join(cesiumSource, "Assets"),
            to: "Assets",
          },
          {
            from: path.join(cesiumSource, "Widgets"),
            to: "Widgets",
          },
        ],
      }),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("./"),
      })
    );
    const loaders = config.module.rules.find((rule) => Array.isArray(rule.oneOf)).oneOf;
    // console.log(loaders); //可以打印 一下是第几项目
    loaders[7].use.push({
      loader: "style-resources-loader",
      options: {
        patterns: path.resolve(__dirname, "./src/assets/styles/mixin.less"), //全局引入公共的scss 文件
      },
    });
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static", //输出静态报告文件report.html，而不是启动一个web服务
        }),
        new CompressionWebpackPlugin({
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
        }),
        new TerserPlugin({
          extractComments: true,
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            extractComments: "all",
            compress: {
              drop_console: true,
            },
          },
        }),
        new webpack.optimize.SplitChunksPlugin({
          chunks: "all",
          minSize: 20000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          name: true,
        })
      );
    } else {
      config.devtool = false; //去掉map文件
      config.plugins.push(
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require("./public/vendor/vendor-manifest.json"),
        }),
        // 将 dll 注入到 生成的 html 模板中
        new AddAssetHtmlPlugin({
          // dll文件位置
          filepath: path.resolve(__dirname, "./public/vendor/*.js"),
          // dll 引用路径
          publicPath: "./vendor",
          // dll最终输出的目录
          outputPath: "./vendor",
        })
      );
    }
    return config;
  },
  addDecoratorsLegacy()
);
module.exports = webpackConfig;
