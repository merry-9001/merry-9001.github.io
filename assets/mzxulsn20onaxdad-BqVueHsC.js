const e=`---
title: 介绍
urlname: mzxulsn20onaxdad
date: 2025-04-27 15:24:55 +0800
tags: []
description: 前端工具一个工具就是负责做一些事情Prettier：Prettier 是一个代码格式化工具，用于自动格式化
  JavaScript、TypeScript、CSS、HTML 等文件。Prettier
  可以确保团队遵循一致的代码风格，从而提高代码的可读性和维护性。ESLint：ESLint 是一个静...
image: ''
categories: []
---

### 前端工具

一个工具就是负责做一些事情

1. Prettier：Prettier 是一个代码格式化工具，用于自动格式化 JavaScript、TypeScript、CSS、HTML 等文件。Prettier 可以确保团队遵循一致的代码风格，从而提高代码的可读性和维护性。
2. ESLint：ESLint 是一个静态代码分析工具，用于检查 JavaScript 和 TypeScript 代码中的潜在问题和编码规范。ESLint 通过可配置的规则来检查代码，并可以与 Prettier 结合使用，以确保代码质量和风格的一致性。
3. Babel：Babel 是一个 JavaScript 编译器，用于将新版 JavaScript（如 ES6+）转换为兼容旧版浏览器的代码。Babel 支持插件系统，可以进行语法转换、优化和其他代码转换任务。
4. Terser：Terser 是一个 JavaScript 压缩器，用于移除无用的代码、空格和注释，从而减小代码的文件大小。Terser 支持 ES6+ 语法，并可以用于压缩和优化生产环境的 JavaScript 代码。

主要学习

- API
- CLI
- 配置文件
- 规则
- 插件
- VSCode 扩展

### 构建工具

通过构建工具，可以将从工具A到工具Z的处理工作自动的跑一遍。

- Grunt：Grunt 是一个任务运行器，它使用基于配置的方法来定义任务。Grunt 有丰富的插件生态系统，可以执行各种前端构建任务。
- Gulp：Gulp 是一个基于流的任务运行器，它允许开发者编写简洁的任务来处理文件。Gulp 使用插件系统处理各种任务，如编译 Sass、压缩图片、合并文件等。
- Webpack：Webpack 是一个非常流行的模块打包器，它可以处理 JavaScript、CSS、HTML 和其他文件类型。Webpack 提供了许多插件和加载器，以便在打包过程中执行各种任务，如压缩、转换、热替换等。
- Parcel：Parcel 是一个零配置的 Web 应用打包器，它提供了快速的构建性能和自动代码拆分。Parcel 支持多种文件类型，并且可以自动处理模块热替换和资源优化。
- Rollup：Rollup 是一个 JavaScript 模块打包器，专注于生成高效的 ES6 模块。Rollup 支持插件系统，可以处理各种任务，如编译、压缩、处理 CSS 等。
- esbuild：esbuild 是一个极速的 JavaScript 打包器和压缩器，它使用 Go 语言编写，并利用了 Go 的并发特性来实现高速构建。esbuild 提供了一种简单易用的方式来打包 JavaScript、TypeScript 和 JSX 代码。它还支持 CSS、JSON 和其他文件类型的导入。esbuild 的目标是实现最小的配置和最快的构建速度，因此它可能不像其他构建工具那样具有丰富的插件生态系统。

### 脚手架

脚手架是一种自动化的工具，主要是帮助我们自动化的搭建项目结构、配置文件和项目基础代码

1. vue-cli：vue-cli 是 Vue.js 官方提供的一种命令行工具，用于快速生成 Vue.js 项目。它提供了一个带有预配置的开发环境，包括构建系统（基于 webpack 或 Vite）、代码检查（ESLint）、单元测试（Jest 或 Mocha）等。vue-cli 还支持插件系统，允许开发者添加额外的功能，例如 Vuex（状态管理）、Vue Router（路由）等。vue-cli 通过可视化的 Web 界面，让开发者可以轻松地管理项目和插件。
2. create-react-app：create-react-app 是 React 官方提供的一种脚手架，用于快速创建基于 React 的单页应用（SPA）。create-react-app 为开发者提供了一个预配置的开发环境，包括热重载、构建优化、代码检查（ESLint）等。create-react-app 的目标是让开发者无需关注配置，而可以专注于编写 React 代码。需要注意的是，create-react-app 对于配置的自定义性较低，如果需要高度自定义配置，可以选择其他的技术，例如 Next.js 或 Gatsby。
3. Vite：Vite 是一种新型的构建工具和脚手架，由 Vue.js 的作者尤雨溪创建。Vite 使用原生的 ES modules 特性，实现了极快的开发服务器和构建性能。Vite 支持 Vue.js、React、Preact 等多种框架，并提供了一套预配置的开发环境，包括热模块替换（HMR）、CSS 预处理器、代码检查（ESLint）等。Vite 还支持插件系统，可以轻松地扩展功能和集成其他工具。
4. Angular CLI：Angular CLI 是 Angular 官方提供的脚手架，用于创建、开发和部署 Angular 应用。它提供了一个预配置的开发环境，包括构建系统（基于 webpack）、代码检查（TSLint）、单元测试（Karma 或 Jest）等。Angular CLI 还支持插件系统，可以轻松地添加额外功能，如 Angular Material（UI 库）等。

> vite下层使用了esbuild和rollup进行打包
`;export{e as default};
