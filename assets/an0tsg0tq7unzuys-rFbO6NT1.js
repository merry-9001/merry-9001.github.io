const e=`---
title: webpack配置
urlname: an0tsg0tq7unzuys
date: 2024-10-22 21:08:52 +0800
tags: []
description: const path = require('path'); const TerserPlugin =
  require('terser-webpack-plugin');  module.exports =
  {     //设置是开发模式还是生产模式，不同模式webpack内部会进行一些处理  ...
image: ''
categories: []
---

\`\`\`javascript
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  //设置是开发模式还是生产模式，不同模式webpack内部会进行一些处理
  mode: "production",
  //打包的入口
  entry: "./entry.js",
  //打包出口配置
  output: {
    filename: "entry.bundle.js",
    chunkFilename: "bundle.[name].[chunkhash:8].js",
    path: path.resolve(__dirname, "assets", "js", "bundle"),
    publicPath: "./js/bundle/",
  },
  //优化
  optimization: {
    //terser混淆
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    //分包
    splitChunks: {
      cacheGroups: {
        obj3: {
          chunks: "all",
          test(module) {
            const moduleResource = module.resource || "";
            return (
              /[\\\\/]node_modules[\\\\/]babylonjs/.test(moduleResource) ||
              /3rd[\\\\/]babylon/.test(moduleResource) ||
              /[\\\\/]node_modules[\\\\/]earcut/.test(moduleResource) ||
              /[\\\\/]node_modules[\\\\/]heatmap\\.js/.test(moduleResource)
            );
          },
          name: "obj3",
          maxAsyncRequests: 5,
          priority: 10,
          enforce: true,
        },
        threejs: {
          chunks: "all",
          test(module) {
            const moduleResource = module.resource || "";
            if (/3rd[\\\\/]particle/.test(moduleResource)) {
              return !/fireworks|rainy/.test(moduleResource);
            }
            return (
              /[\\\\/]node_modules[\\\\/]three/.test(moduleResource) ||
              /3rd[\\\\/]three/.test(moduleResource) ||
              /[\\\\/]node_modules[\\\\/]\\@pdf\\-lib/.test(moduleResource)
            );
          },
          name: "threejs",
          maxAsyncRequests: 5,
          priority: 10,
          enforce: true,
        },
        v1widgets: {
          chunks: "all",
          test: /widgets[\\\\/].*(b2.*(?<!\\.v2\\.js))(?<!b2widget\\.js)$/,
          name: "v1widgets",
          maxAsyncRequests: 5,
          priority: 10,
          enforce: true,
        },
        v2widgets: {
          chunks: "all",
          test: /widgets\\.v2[\\\\/].*(b2.*\\.v2\\.js)(?<!b2widget\\.v2\\.js)(?<!b2plugin\\.v2\\.js)$/,
          name: "v2widgets",
          maxAsyncRequests: 5,
          priority: 10,
          enforce: true,
        },
        antv: {
          chunks: "all",
          test: /[\\\\/]node_modules[\\\\/]\\@antv/,
          name: "antv",
          maxAsyncRequests: 5,
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  //模块，loader的加载规则
  module: {
    rules: [
      {
        test: /\\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: [path.resolve(__dirname, "..", "..", "node_modules")],
      },
    ],
  },
  //控制模块解析过程
  resolve: {
    //查找绝对引用文件的路径
    modules: [
      "node_modules",
      path.resolve(__dirname, "../../node_modules"),
      path.resolve(__dirname, "../../src"),
    ],
    //别名
    alias: {
      "@b2": path.resolve(__dirname, "../b2"),
      "assets/js/components/b2": path.resolve(__dirname, "../b2"),
    },
  },
  //插件
  plugins: [],
};
\`\`\`
`;export{e as default};
