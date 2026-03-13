const n=`---
title: Prettier
urlname: dz6po4itg6w10pi3
date: 2025-04-27 15:31:36 +0800
tags: []
description: 介绍一致的代码风格：可以帮助团队成员统一代码风格，减少代码审查时关于代码格式的讨论。集成多种编辑器：支持许多流行的代码编辑器，如
  Visual Studio Code、Sublime Text、Atom 等都有相应的插件，可以在编写代码时自动运行 Prettier。可配置性：虽然
  默认配置通常...
image: ''
categories: []
---

### 介绍

- 一致的代码风格：可以帮助团队成员统一代码风格，减少代码审查时关于代码格式的讨论。
- 集成多种编辑器：支持许多流行的代码编辑器，如 _Visual Studio Code、Sublime Text、Atom_ 等都有相应的插件，可以在编写代码时自动运行 _Prettier_。
- 可配置性：虽然 默认配置通常已经足够，但它仍支持自定义配置。你可以在项目根目录下创建一个 ._prettierrc_ 文件，根据项目需求调整格式化选项。
- 自动格式化：可以自动格式化文件，无需手动调整代码格式。
- 支持多种语言：支持多种编程语言和文件格式，提供广泛的适用性。

### 原理

把代码抽象为语法树，然后通过规则去生成代码

### 使用

安装

\`\`\`typescript
pnpm add --save-dev --save-exact prettier
\`\`\`

命令与命令行工具

\`\`\`plain
"scripts": {
    // ...
    "format": "prettier --write ."
 },
\`\`\`

vscode安装插件，可以实时进行格式修改

配置

根目录下新建.prettierrc或者prettier.config.cjs

.prettierignore（忽略文件）

### 常见规则

行宽

缩进

分号

引号

尾随逗号

### api

其实命令行的执行也是在调用api，一切本质就是调用api去格式化代码

\`\`\`typescript
const prettier = require("prettier");

prettier.format(jsSource, options).then((res) => {
  // 将格式化好的结果重新写入到原来的文件里面
  fs.writeFileSync(sourcePath, res, "utf-8");
});
\`\`\`
`;export{n as default};
