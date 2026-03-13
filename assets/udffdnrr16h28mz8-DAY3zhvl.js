const n=`---
title: 兼容性问题
urlname: udffdnrr16h28mz8
date: 2024-12-11 10:46:31 +0800
tags: []
description: '在package.json的配置中加入browserslist"browserslist": [   "last 2
  version",   "&gt; 1%" ]postcss.config.js中可配置module.exports = {     map: false,
  //关闭source-m...'
image: ''
categories: []
---

在package.json的配置中加入browserslist

\`\`\`javascript
"browserslist": [
  "last 2 version",
  "> 1%"
]
\`\`\`

postcss.config.js中可配置

\`\`\`javascript
module.exports = {
  map: false, //关闭source-map
  plugins: {
    "postcss-preset-env": {
      stage: 0, //哪怕是处于草案阶段的语法，也需要转换
      preserve: false,
    },
    "postcss-apply": {},
    "postcss-color-function": {},
  },
};
\`\`\`

.babelrc

\`\`\`javascript
{
    "presets": [
        ["@babel/preset-env", {
            "useBuiltIns": "usage",
            "corejs": 3
        }]
    ]
}
\`\`\`
`;export{n as default};
