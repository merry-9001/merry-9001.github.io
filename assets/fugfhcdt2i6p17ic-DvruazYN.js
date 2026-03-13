const n=`---
title: stylelint
urlname: fugfhcdt2i6p17ic
date: 2025-04-28 11:18:17 +0800
tags: []
description: '在实际的开发中，我们可能会错误的或不规范的书写一些css代码，stylelint插件会即时的发现错误标准库：stylelint-config-standard.stylelintrc文件//.styleintrc
  {   "extends": "stylelint-config-standar...'
image: ''
categories: []
---

在实际的开发中，我们可能会错误的或不规范的书写一些css代码，stylelint插件会即时的发现错误

标准库：\`stylelint-config-standard\`

\`.stylelintrc\`文件

\`\`\`json
//.styleintrc
{
  "extends": "stylelint-config-standard"
}
\`\`\`

此时，如果你的代码出现不规范的地方，编译时将会报出错误

\`\`\`css
body {
  background: #f4;
}
\`\`\`

![](assets/2020-02-05-14-37-11.png)

发生了两处错误：

1. 缩进应该只有两个空格
2. 十六进制的颜色值不正确

如果某些规则并非你所期望的，可以在配置中进行设置

\`\`\`json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "indentation": null
  }
}
\`\`\`

设置为\`null\`可以禁用该规则，或者设置为4，表示一个缩进有4个空格。具体的设置需要参见stylelint文档：[https://stylelint.io/](https://stylelint.io/)

编辑器安装

安装vscode的插件\`stylelint\`即可，它会读取你工程中的配置文件，按照配置进行实时报错

> **实际上，如果你拥有了**\`**stylelint**\`**插件，可以不需要在postcss中使用该插件了**
`;export{n as default};
