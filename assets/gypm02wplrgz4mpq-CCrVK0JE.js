const n=`---
title: package.json
urlname: gypm02wplrgz4mpq
date: 2025-03-29 17:51:16 +0800
tags: []
description: 包的说明文件说明文件就是 package.json，当我们使用 npm init -y
  去初始化一个项目的时候，就会自动的生成一个package.json
  文件。参数介绍scripts：配置你的可执行命令name：包的名称，该名称必须是英文单词字符，支持连接符version：版本 版本规范：主...
image: articles/gypm02wplrgz4mpq/1741679029047-bddc5686-be1c-474c-99a8-a8cb199ab0c8.png
categories: []
---

### 包的说明文件

说明文件就是 package.json，当我们使用 npm init -y 去初始化一个项目的时候，就会自动的生成一个package.json 文件。

### 参数介绍

- scripts：配置你的可执行命令
- name：包的名称，该名称必须是**英文单词字符**，支持连接符
- version：版本
  - 版本规范：主版本号.次版本号.补丁版本号
  - 主版本号：仅当程序发生了重大变化时才会增长，如新增了重要功能、新增了大量的API、技术架构发生了重大变化
  - 次版本号：仅当程序发生了一些小变化时才会增长，如新增了一些小功能、新增了一些辅助型的API
  - 补丁版本号：仅当解决了一些 bug 或 进行了一些局部优化时更新，如修复了某个函数的 bug、提升了某个函数的运行效率
- description：包的描述
- homepage：官网地址
- author：包的作者，必须是有效的 npm 账户名，书写规范是 \`account <mail>\`，例如：\`zhangsan <zhangsan@gmail.com>\`，不正确的账号和邮箱可能导致发布包时失败

\`\`\`json
"author": {
  "name": "John Doe",
  "email": "john.doe@example.com",
  "url": "https://example.com/johndoe"
}
\`\`\`

- repository：包的仓储地址，通常指 git 或 svn 的地址，它是一个对象
  - type：仓储类型，git 或 svn
  - url：地址

\`\`\`json
"repository": {
  "type": "git",
  "url": "https://github.com/username/my-awesome-package.git"
}
\`\`\`

- **main：包的入口文件，使用包的人默认从该入口文件导入包的内容**
- keywords: 搜索关键字，发布包后，可以通过该数组中的关键字搜索到包
- contributors：包的贡献者名单
- license：包的许可证信息，指定包的开源类型
- engines:用来指定项目需要的 node 版本以及 npm 版本，从而避免用户在使用你的包的时候出现一些因为版本不支持而产生的问题。

\`\`\`json
"engines": {
  "node": ">=12.0.0",
  "npm": ">=6.0.0"
},
\`\`\`

- \`main\` 字段是为 Node.js 环境指定模块的入口文件。

\`\`\`json
"main": "lib/index.js",
\`\`\`

- \`browser\` 字段是为浏览器环境指定模块的入口文件，或者提供文件的映射关系，以此来处理 Node.js 和浏览器环境的差异。

\`\`\`json
"browser": {
  "./lib/node-specific-module.js": "./lib/browser-specific-module.js",
  "fs": false
}
\`\`\`

> \`"./lib/node-specific-module.js": "./lib/browser-specific-module.js"\` 表示在浏览器环境中，当引用 \`./lib/node-specific-module.js\` 时，实际加载的是 \`./lib/browser-specific-module.js\`。
>
> \`"fs": false\` 表示在浏览器环境中，当引用 \`fs\` 模块时，不加载任何内容（即忽略该模块）。

- dependencies：生产环境的依赖包
- devDependencies：仅开发环境的依赖包
- peerDependencies：该配置项通常用于开发插件或者库的时候，表示需要与项目（这里的项目指的是使用我们插件或者库的项目）一起使用的依赖，确保这些依赖有一个合适的版本。

\`\`\`json
{
  "name": "my-react-plugin",
  "version": "1.0.0",
  "peerDependencies": {
    "react": "^17.0.0",
    "react-dom": "^17.0.0"
  }
}
\`\`\`

- files：只有 files 字段里面出现的文件或目录才会被上传。

> 类似设置一个白名单

- type：设置模块类型,type 对应的有两个值

> commonjs：当 type 的值设置为 commonjs 时，node.js 将默认使用 CommonJS 模块系统，这是 node.js 中最常见的模块系统。在这种情况下，可以直接使用 require 函数来导入模块。如果想使用 ECMAScript 模块（即使用 import 和 export 语法），则需要将文件扩展名设置为 .mjs。
>
> module：当 type 的值设置为 module 时，node.js 将默认使用 ECMAScript 模块系统。在这种情况下，可以直接使用 import 和 export 语法来导入和导出模块。如果你想使用 CommonJS 模块（即使用 require 导入模块），则需要将文件扩展名设置为 .cjs。

- exports：用于定义一个模块的导出映射，通过这个配置项，可以对模块的导入环境以及条件做一个更精细的控制，指定不同的模块的入口文件

### .npmignore（白名单与黑名单）

黑名单

在项目根目录下面创建一个 .npmignore 的文件，该文件就用于设置哪些文件或者目录不需要上传到 npm

\`\`\`json
# .npmignore
src
tests
\`\`\`

白名单就是在pageage.json里设置files字段

### .npmrc

配置仓库镜像

### dependencies和devDependencies的区别

\`\`\`shell
## 安装依赖到生产环境
npm i 包名
npm i --save 包名
npm i -S 包名

## 安装依赖到开发环境
npm i --save-dev 包名
npm i -D 包名

不加包名会从package.json的目录去读要下载哪些依赖，当你只需要下载生产环境的依赖，可以
增加参数
## 仅安装生产环境的依赖 dependencies
npm install --production
\`\`\`

只要是项目中用到的依赖（且安装到 node_modules 中），不管这个依赖是放在 devDependencies 还是放在 dependencies ，都会被打包工具解析、构建，最后都打进 dist 产物中。

**生产打包 与 devDependencies 字段无关**。

如果我们只是单纯的做项目，那么我们可简单地认为生产环境和开发环境做为一种友善的提示，实质没有什么区别；但是，如果在发布npm包的时候，两种环境安装方式是有很大区别的！！！

在发布npm包的时候，本身dependencies下的模块会作为依赖，一起被下载；devDependencies下面的模块就不会自动下载了；但对于项目而言，npm install 会自动下载devDependencies和dependencies下面的模块。

### peerDependencies

回头别人在使用你这个插件的时候，它就必须确保安装符合版本要求的依赖。否则 npm 是会给出警告。

peerDependencies一般只会记入一个插件的主要依赖（angular、react、vue）

下面有一些建议，可以帮助你做出决策：

    - 假设你现在在开发一个 react 插件，你在开发 react 的时候肯定会涉及到使用 react 的环境，如果此时你将 react 记入到 dependencies，那么则意味着别人项目在使用你的插件的时候，也会去下载 react。这里就会存在两个问题
        * 别人既然使用你这个插件，那么说明别人也是在做 react 的开发，别人的项目自然而然已经安装了react
        * 如果不记入到 dependencies 里面，那么又会存在因为版本不一致可能出现的兼容问题
    - peerDependencies 就是用来解决这个问题，例如我现在在开发一个 react 的插件，用到了 react 以及 react-dom
    - 考虑你的插件的目标受众。如果你认为大部分使用你插件的项目都已经在使用你所依赖的库（例如 _lodash_），那么将这些库声明为 _peerDependencies_ 可能是合适的。
    - 考虑插件与依赖项之间的紧密程度。如果你的插件仅依赖于依赖项的一个小功能，而且这个功能在未来版本中不太可能发生变化，那么你可以将这个依赖项声明为 _dependencies_。
    - 如果你决定将某些库声明为 _peerDependencies_，请确保在插件的文档中明确提醒用户需要安装这些库。

### type和exports

现在的 node，你使用哪一种模块规范都无所谓，因为它两种都支持，你只需要通过 type 值来配置一下就可以了。

关于 type 这个配置项，不是 npm 所提供的配置选项，而是 node 提供的配置选项。

node 常见的配置项除了 type 以外，还有一个 exports，该配置项用于定义一个模块的导出映射，通过这个配置项，可以对模块的导入环境以及条件做一个更精细的控制，指定不同的模块的入口文件。

\`\`\`plain
{
  "exports": {
    "import": "./dist/index.esm.js",
    "require": "./dist/index.cjs"
  }
}
\`\`\`

我们在这里为不同的模块系统提供了不同的入口文件

- 使用的 ESM，那么在导入模块的时候，node.js 会去加载 index.esm.js
- 使用的是 commonjs，那么在导入模块的时候，node.js 会去加载 index.cjs

最终上传的包结构

![](articles/gypm02wplrgz4mpq/1741679029047-bddc5686-be1c-474c-99a8-a8cb199ab0c8.png)

### 示例

\`\`\`markdown
{
"name": "duyi-jstools",
"version": "1.0.1",
"description": "this package just for study and useless",
"main": "index.js",
"type": "module",
"scripts": {
"build": "rollup -c"
},
"exports": {
"require": "./dist/index.cjs",
"import": "./dist/index.js"
},
"keywords": [
"study",
"useless"
],
"files": [
"/dist"
],
"author": "xiejie",
"license": "ISC",
"devDependencies": {
"rollup": "^2.79.1",
"rollup-plugin-node-resolve": "^5.2.0",
"rollup-plugin-terser": "^7.0.2"
}
}
\`\`\`
`;export{n as default};
