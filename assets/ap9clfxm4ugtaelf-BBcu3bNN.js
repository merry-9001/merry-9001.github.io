const n=`---
title: 性能优化vite
urlname: ap9clfxm4ugtaelf
date: 2024-09-24 09:44:40 +0800
tags: []
description: 开发时态构建优化（开发时）vite是按需加载，不太需要这方面的优化传输优化（生产运行时）tree shakingsplit
  chunk(代码分割)好处：1.减少初始加载时间2.按需加载3.并行加载4.缓存利用默认行为：异步导入的js和css会单独成一个模块，当要用到的时候引入
image: https://cdn.nlark.com/yuque/0/2024/png/22718987/1724839808268-a4c47253-c721-4585-ace0-5d94fbb36f64.png
categories: []
---

## 开发时态构建优化（开发时）

vite是按需加载，不太需要这方面的优化

## 传输优化（生产运行时）

### tree shaking

### split chunk(代码分割)

好处：

1.减少初始加载时间

2.按需加载

3.并行加载

4.缓存利用

默认行为：异步导入的js和css会单独成一个模块，当要用到的时候引入

\`\`\`javascript
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue'],
          'vue-router': ['vue-router'],
          'element-plus': ['element-plus']
        }
      }
    },
    outDir: "dist/client",
    chunkSizeWarningLimit: 1000,
  },
\`\`\`

### 代码压缩

\`\`\`javascript
yarn add terser
\`\`\`

vite配置

\`\`\`javascript
minify: 'terser',
terserOptions: {
  compress: {
      drop_console: viteEnv.VITE_DROP_CONSOLE,
      drop_debugger: viteEnv.VITE_DROP_CONSOLE,
  }
}
\`\`\`

### 分包策略

build里配置，可以使得build打包不乱码

![](articles/ap9clfxm4ugtaelf/1724840397851-b28f82d5-f260-4b48-aafb-2e559b7fb9f0.png)

因为浏览器有缓存，将第三方模块单独打包成一个js可以利用缓存，因为第三方模块不会变

\`\`\`typescript
build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue'],
          'vue-router': ['vue-router'],
          'element-plus': ['element-plus']
        }
      }
    },
    outDir: "dist/client",
    chunkSizeWarningLimit: 1000,
  },
\`\`\`

配置多入口

![](articles/ap9clfxm4ugtaelf/1724844025818-62442076-f4b5-462b-9ae6-69fcafe9b478.png)

### gzip压缩

![](articles/ap9clfxm4ugtaelf/1724844140269-4b8ef65b-0761-42d8-9658-6012e2f3e5f1.png)

### 动态导入（懒加载）

vite是按需加载，先加载main.js然后再根据main.js要引入的文件再去加载

动态导入和按需加载有异曲同工之妙

采用import(xxx)的语法

采用动态导入会导致打包结果分包（代码分割）

应用

可以用在vue-router里，路由组件可以用到再去加载

无动态导入

![](articles/ap9clfxm4ugtaelf/1724848891493-0df11d47-6db8-4ed9-9054-219630f109b6.png)

假如这样，那么当这个模块被加载的时候，Home和Login都会被加载（读整个文件）

但如果采用动态导入（懒加载），那么只会在切换到那个页面的时候才会加载

原理

\`\`\`javascript
function import(path){
  return new Promise((resolve)=>{
    //vite用的es原生的动态导入
    //不让他进入fulfilled状态
    //进入到对应路由时将webpack_require.e这个promoise的状态设置为fulfilled(调用resolve)
    //如果没进入过懒加载的页面，就让webpack_require.e永远悬停在(pending状态)
    //创造一个promise.all 创建script标签，src指向懒加载进来的这个文件，然后把他放入html的body中
    webpack_require.e().then(()=>{
      const result = await webpakc_require(path)
    })
  })
}
\`\`\`

### cdn加速

cdn的第三方模块会根据你的网络给你提供最近的，最快的第三方服务器

![](articles/ap9clfxm4ugtaelf/1724845021916-6f9f2b7b-64b6-4918-aada-bf42912d1a65.png)

原理

1.会把你配置的cdn插入到html中

2.会根据这个配置去修改rollup的配置（影响rollup配置）

### 图片压缩

\`\`\`javascript
yarn vite-plugin-imagemin -D
\`\`\`

\`\`\`javascript
viteImagemin({
  gifsicle: {
    optimizationLevel: 7,
    interlaced: false,
  },
  optipng: {
    optimizationLevel: 7,
  },
  mozjpeg: {
    quality: 20,
  },
  pngquant: {
    quality: [0.8, 0.9],
    speed: 4,
  },
  svgo: {
    plugins: [
      {
        name: "removeViewBox",
      },
      {
        name: "removeEmptyAttrs",
        active: false,
      },
    ],
  },
});
\`\`\`

## 分析插件

### rollup-plugin-visualizer

分析依赖模块的大小占比，可以让我们更有针对性的进行体积优化

构建成功之后会在根目录下生成一个 stats.html

\`\`\`javascript
import { visualizer } from "rollup-plugin-visualizer";

plugins: [
  visualizer({
    open: true,
  }),
],
\`\`\`

### vite-plugin-inspect

用来分析各文件的编译结果

可以在 [http://localhost:5173//_/_inspect/](http://localhost:5173/__inspect/) 里面看到每一个组件编译后的结果。

\`\`\`javascript
// vite.config.js
import Inspect from "vite-plugin-inspect";

export default {
  plugins: [Inspect()],
};
\`\`\`
`;export{n as default};
