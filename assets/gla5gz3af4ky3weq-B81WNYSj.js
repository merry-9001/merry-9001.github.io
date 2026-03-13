const n=`---
title: vite
urlname: gla5gz3af4ky3weq
date: 2024-11-10 21:07:58 +0800
tags: []
description: 为什么vite要在开发环境使用es
  build，生产环境用rollup双模式打包？开发环境和生成环境的构建需求是不一样的开发环境(依赖预构建)自己写的代码不打包；依赖模块的代码需要打包，但会缓存（因为有这两点，所以打包速度快）esbuild底层是使用go语言（效率高）生产环境代码分割，动态导入...
image: articles/gla5gz3af4ky3weq/1733749611924-003ebdd6-843c-4f9d-ba4e-2c1f24abadc6.png
categories: []
---

## 为什么vite要在开发环境使用es build，生产环境用rollup双模式打包？

开发环境和生成环境的构建需求是不一样的

开发环境(依赖预构建)

自己写的代码不打包；依赖模块的代码需要打包，但会缓存（因为有这两点，所以打包速度快）

esbuild底层是使用go语言（效率高）

生产环境

代码分割，动态导入

tree shaking

插件生态

## vite比webpack好在哪里

构建时间短

不需要优化

## vite的依赖预构建是怎么做的

启动服务的时候会运行一个函数开始依赖预构建，依赖预构建会有缓存，保存在一个metadata.js中

该函数会在获取到/_metadata.json文件内容之后去对比lock文件hash以及配置文件optimizeDeps内容，如果一样说明预构建缓存没有任何改变，无需重新预构建，直接使用上次预构建缓存即可

如果没有缓存的话是通过扫描项目中的import语句来得到需要预编译的依赖

![](articles/gla5gz3af4ky3weq/1733749611924-003ebdd6-843c-4f9d-ba4e-2c1f24abadc6.png)
`;export{n as default};
