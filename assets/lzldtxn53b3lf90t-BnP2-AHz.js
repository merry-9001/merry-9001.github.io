const n=`---
title: postcss
urlname: lzldtxn53b3lf90t
date: 2025-04-28 11:19:14 +0800
tags:
  - 博客文章
description: 介绍类似于一个编译器，可以将样式源码编译成最终的CSS代码postcss对标babel我们写的js代码(怎么爽怎么来) --&gt;
  babel --&gt; 将最新的ts语法进行转换js语法 --&gt; 做一次语法降级  --&gt;
  浏览器客户端去执行我们写的css代码(怎么爽怎么来) --&gt; less编译（解...
image: ''
categories: []
---

### 介绍

类似于一个编译器，可以将样式源码编译成最终的CSS代码

postcss对标babel

我们写的js代码(怎么爽怎么来) --> babel --> 将最新的ts语法进行转换js语法 --> 做一次语法降级  --> 浏览器客户端去执行

我们写的css代码(怎么爽怎么来) --> less编译（解开嵌套，变量） ---> postcss编译（语法降级，前缀补全）

### 解决的问题

1.兼容性处理

2.代码优化与压缩

3.代码检查与规范

### 原理

本质就是node起一个服务，对字符串进行转化

先将文件从sass转化为css

然后postcss本身只会把css转化为AST，然后利用各种各样的插件进行转化（当然也可以自定义插件）

\`\`\`javascript
const fs = require("fs");
const path = require("path");
const sass = require("sass");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

// 定义输入文件的路径
const scssPath = path.resolve("src", "index.scss");

// 编译 scss
const scssResult = sass.compile(scssPath);

// 使用 PostCSS 来进行处理
postcss([autoprefixer, cssnano])
  .process(scssResult.css, { from: undefined })
  .then((res) => {
    // console.log(res.css)
    fs.writeFileSync("build.css", res.css);
    console.log("CSS 后处理完成...");
  })
  .catch((err) => {
    console.error("Error:", err.message);
  });
\`\`\`

### 使用

安装

\`\`\`shell
npm i -D postcss postcss-cli
\`\`\`

命令

\`\`\`shell
postcss 源码文件 -o 输出文件
\`\`\`

### 配置文件

plugins：一个数组，里面包含要使用到的 postcss 的插件以及相关的插件配置。

map：是否生成源码映射，对应的值为一个对象

syntax：用于指定 postcss 应该使用的 CSS 语法，默认情况下 postcss 处理的是标准的 CSS，但是有可能你的 CSS 是使用预处理器来写的，这个时候 postcss 是不认识的，所以这个时候需要安装对应的插件并且在配置中指明 syntax

parser：配置自定义解析器。Postcss 默认的解析器为 postcss-safe-parser，负责将 CSS 字符串解析为 CSS AST，如果你要用其他的解析器，那么可以配置一下

stringifier：自定义字符串化器。用于将 CSS AST 转回 CSS 字符串。如果你要使用其他的字符串化器，那么也是可以在配置文件中进行指定的。

### 插件

下面罗列一些postcss的常用插件

##### autoprefixer

根据browerslist的配置去给css增加前缀

\`\`\`javascript
module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: "last 10 versions",
    }),
  ],
};
\`\`\`

##### cssnano

压缩css文件

\`\`\`javascript
module.exports = {
  plugins: [require("autoprefixer"), require("cssnano")],
};
\`\`\`

##### stylelint

统一css的书写风格

\`\`\`javascript
module.exports = {
  plugins: [require("stylelint"), require("autoprefixer"), require("cssnano")],
};
\`\`\`

##### postcss-preset-env

1. 让你能够使用最新的 _CSS_ 语法，如：_CSS Grid_（网格布局）、_CSS Variables_（变量）等。
2. 自动为你的 _CSS_ 代码添加浏览器厂商前缀，如：-_webkit_-、-_moz_- 等。
3. 根据你的浏览器兼容性需求，将 _CSS_ 代码转换为旧版浏览器兼容的语法。
4. 优化 _CSS_ 代码，如：合并规则、删除重复的代码等。

\`\`\`javascript
module.exports = {
  plugins: [
    require("postcss-preset-env")({
      stage: 2,
    }),
  ],
};
\`\`\`

##### postcss-import

在原生的 CSS 中，存在 @import，可以引入其他的 CSS 文件，但是在引入的时候会存在一个问题，就是客户端在解析 CSS 文件时，发现有 @import 就会发送 HTTP 请求去获取对应的 CSS 文件。

使用 postcss-import：

- 将多个 CSS 文件合并为一个文件
- 避免了浏览器对 @import 规则的额外请求，因为减少了HTTP请求，所以提高了性能

\`\`\`javascript
module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-preset-env")({
      stage: 2,
    }),
  ],
};
\`\`\`

##### purgecss

树摇优化

\`\`\`javascript
module.exports = {
  plugins: [
    require("postcss-import")({
      path: ["src/css"],
    }),
    require("postcss-preset-env")({
      stage: 2,
    }),
    require("@fullhuman/postcss-purgecss")({
      content: ["./src/**/*.html"],
    }),
  ],
};
\`\`\`

### 自定义插件

[https://postcss.org/docs/writing-a-postcss-plugin](https://postcss.org/docs/writing-a-postcss-plugin)

颜色修改插件

\`\`\`plain
const Color = require("color");

module.exports = (opts = {}) => {
  // Plugin creator to check options or prepare caches
  return {
    postcssPlugin: "convertColorsToHex",
    Declaration(decl) {
      // 先创建一个正则表达式，提取出如下的声明
      // 因为如下的声明对应的值一般都是颜色值
      const colorRegex = /(^color)|(^background(-color)?)/;
      if (colorRegex.test(decl.prop)) {
        try {
          // 将颜色值转为 Color 对象，因为这个 Color 对象对应了一系列的方法
          // 方便我们进行转换
          const color = Color(decl.value);
          // 将颜色值转换为十六进制
          const hex = color.hex();
          // 更新属性值
          decl.value = hex;
        } catch (err) {
          console.error(
            \`[convertColorsToHex] Error processing \${decl.prop}: \${error.message}\`
          );
        }
      }
    },
  };
};
module.exports.postcss = true;
\`\`\`
`;export{n as default};
