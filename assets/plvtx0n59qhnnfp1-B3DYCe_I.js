const n=`---
title: ts配置
urlname: plvtx0n59qhnnfp1
date: 2024-12-18 13:12:21 +0800
tags: []
description: '{   "compilerOptions": {     //将 TypeScript 代码编译成符合最新 ECMAScript
  标准     "target": "ESNext",      //采用最新的 ECMAScript 模块标准     "module":
  "ESNext",   ...'
image: ''
categories: []
---

\`\`\`javascript
{
  "compilerOptions": {
    //将 TypeScript 代码编译成符合最新 ECMAScript 标准
    "target": "ESNext",

    //采用最新的 ECMAScript 模块标准
    "module": "ESNext",
    //ts处理兼容问题
    "esModuleInterop": true,
    //按照node的标准去找模块
    "moduleResolution": "Node",

    //代码严格模式
    "strict": false,

    //要不要生成.map文件
    "sourceMap": true,

    //跳过声明文件检查
    "skipLibCheck": true,
    "baseUrl": ".",

    //定义路径别名
    "paths": {
    "@/*": ["src/*"]
    }
  },

  //指定哪些文件需要被解析
  "include": ["src/**/*.ts", "src/**/*.d.ts","src/**/*.vue"],

    //引用别的配置文件
    "references": [{ "path": "./tsconfig.node.json" }]
}
\`\`\`
`;export{n as default};
