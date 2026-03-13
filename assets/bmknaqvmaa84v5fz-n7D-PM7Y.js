const n=`---
title: 多包管理（monorepo）
urlname: bmknaqvmaa84v5fz
date: 2025-04-05 11:06:13 +0800
tags:
  - 博客文章
description: 介绍什么是包被包管理器（npm、yarn、pnpm）初始化之后的目录，会存在一个包描述文件package.json，那么这样的目录就被称之为包。什么是库被版本控制系统（svn、git）初始化之后的目录，例如使用
  git 进行初始化之后，会存在一个 .git 的目录。包管理方案多仓管理（Mult...
image: https://cdn.nlark.com/yuque/0/2025/png/22718987/1757920365236-d5b9a35f-b1a7-444c-951e-cc9d0c23c40b.png
categories: []
---

# 介绍

## 什么是包

被包管理器（npm、yarn、pnpm）初始化之后的目录，会存在一个包描述文件**package.json**，那么这样的目录就被称之为包。

## 什么是库

被版本控制系统（svn、git）初始化之后的目录，例如使用 git 进行初始化之后，会存在一个 .git 的目录。

## 包管理方案

1. 多仓管理（Multirepo）：一个包对应一个仓库，多个包对应多个仓库
2. 单仓管理（Monorepo）：无论是一个包还是多个包，都对应一个仓库

![](articles/bmknaqvmaa84v5fz/1743822492787-dfb54b3a-ca29-414a-9894-b95064b825e0.png)

## monorepo

一个仓库，多个包混合

### 优势

统一的依赖管理

简化代码共享

更容易进行跨项目更改

更好的跨团队协作

![](articles/bmknaqvmaa84v5fz/1743822593962-e82b607a-4a8a-4335-ae13-c4a417fbd695.png)

### 缺点

1. 代码库规模较大
2. 缺乏独立版本控制
3. 权限和安全性问题
4. 工具和基础设施要求

### 什么时候用

1. 项目之间有很多共享代码和资源的时候
2. 当团队需要进行跨项目协作的时候
3. 统一多个包的依赖非常重要的时候

## Monorepo和Multirepo对比

所谓 Multirepo，就是不同项目和库存储在各自独立的代码库中的策略。

下表是两种代码管理策略的各方面对比：

|          | Monorepo                                                              | Multirepo                                                |
| -------- | --------------------------------------------------------------------- | -------------------------------------------------------- |
| 开发     | 只需要在一个仓库中开发                                                | 仓库体积小，模块划分清晰                                 |
| 复用     | 代码复用高，方便进行代码重构                                          | 需要多个仓库来回切换，无法实现跨项目代码复用             |
| 工程配置 | 所有项目统一使用相同配置                                              | 各个项目可能有一套单独标准                               |
| 依赖管理 | 共同依赖可提升至root，版本控制更加容易，依赖管理更加方便              | 不同项目中会存在相同的依赖，并且依赖会存在版本不同的情况 |
| 代码管理 | 代码全在一个仓库，项目太大用 git 管理会存在问题，无法隔离项目代码权限 | 各个团队可以控制代码权限，也几乎不会有项目太大的问题     |

# 搭建monorepo

## 采用pnpm+workspace的方式

workspace(工作空间)：工作空间就是一个管理多个包的环境，它通过独特的依赖管理方式极大地提高了效率。pnpm 的工作空间支持符号链接和硬链接机制，使得不同包之间能够高效地共享依赖，同时保证每个包的独立性。

## 使用

1.根目录下创建pnpm-workspace.yaml文件,确定workspace的应用空间

\`\`\`javascript
packages:
  # packages/ 下所有子包，但是不包括子包下面的包
  - 'packages/*'
  # components/ 下所有的包，包含子包下面的子包
  - 'components/**'
  # 排除 test 目录
  - '!**/test/**'
\`\`\`

如果需要将依赖到工作空间里面

\`\`\`markdown
pnpm add <包名> -w
\`\`\`

如果需要安装工作空间中导出的依赖

\`\`\`markdown
pnpm add <包名B> --workspace --filter <包名A>
\`\`\`

包名就是package.json中的name字段

有了pnpm+workspace后，一些都需要的依赖就可以装在workspace中统一管理

项目结构

![](articles/bmknaqvmaa84v5fz/1743823345062-43ff61b3-fcb2-4c03-87ac-2bd6fe25d697.png)

2.注意库文件需要在package.json中指定入口

\`\`\`json
{
  "name": "tools",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "type": "module",
  "types": "dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "scripts": {
    "test": "vitest",
    "build": "rollup -c"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
\`\`\`

# vite打包库模式

**库模式**

库模式指的是将应用打包成一个依赖库，方便其他应用来使用。因此和普通打包是有一定区别的：

1. 入口文件：
   - 普通应用：html 文件
   - 库模式：不包含 html 文件，入口文件是一个 js 文件
2. 输出格式：
   - 普通应用：一般是浏览器环境
   - 库模式：通常需要支持多种模块系统
3. 外部依赖：
   - 普通应用：需要一起打包进去
   - 库模式：通常需要将外部依赖（vue、react）排除掉

在库模式（lib）中，我们可以定义**入口点**、**库的名称**、**输出文件名**，以及**如何处理外部依赖**。这些配置确保你的库被打包成适用于不同消费场景的格式，如 ES 模块或 UMD 格式。

举一个例子：

\`\`\`plain
my-lib/
├── lib/
│   ├── main.js        // 库的入口文件
│   ├── Foo.vue        // Vue 组件
│   └── Bar.vue        // 另一个 Vue 组件
├── index.html         // 用于开发测试的 HTML 文件
├── package.json
└── vite.config.js     // Vite 配置文件
\`\`\`

**Vite 配置文件 (vite.config.js)**

\`\`\`javascript
// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.js"),
      name: "MyLib",
      fileName: (format) => \`my-lib.\${format}.js\`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
\`\`\`

- entry: 指定库的入口文件。
- name: name 是用来指定你的库在 UMD 和 IIFE 构建格式下的全局变量名称。
  - 当你的库被加载时，如果是在一个没有模块系统的环境（例如直接在浏览器中通过 <script> 标签引入），这个名称将成为全局变量，通过这个名称可以访问到你的库。
  - 如果你设置 name: 'MyLib'，在浏览器环境中加载时，可以通过 window.MyLib 访问到你的库。
- fileName: 输出文件的命名规则。
- external: 告诉 rollup 不要将 Vue 打包进库，因为我们假设用户环境已有 Vue。
- globals: globals 用于指定外部依赖在 UMD 和 IIFE 构建格式下的全局变量名称。
  - 当你的库依赖某些外部库（如 Vue），你需要告诉构建工具这些库在目标环境中的全局变量名称，以确保在没有模块系统的环境中正确引用这些依赖。
  - 如果你的库依赖 vue，并且 globals 中配置了 vue: 'Vue'，在目标环境中，你的库会假定 Vue 是一个已经存在的全局变量。

**构建输出**

执行 vite build 后，输出目录可能如下所示：

\`\`\`plain
my-lib/
├── dist/
│   ├── my-lib.es.js        // ES 模块格式
│   ├── my-lib.umd.js       // UMD 格式
│   └── assets/             // 包含所有静态资源，如编译后的 CSS
└── ...
\`\`\`

**package.json 配置**

\`\`\`json
{
  "name": "my-lib",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/my-lib.umd.js",
  "module": "./dist/my-lib.es.js",
  "exports": {
    ".": {
      "import": "./dist/my-lib.es.js",
      "require": "./dist/my-lib.umd.js"
    }
  }
}
\`\`\`

这里的配置确保了无论是使用 require 还是 import，使用者都能正确地加载到适当格式的文件。
`;export{n as default};
