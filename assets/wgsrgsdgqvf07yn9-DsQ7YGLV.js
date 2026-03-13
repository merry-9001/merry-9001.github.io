const n=`---
title: eslint配置
urlname: wgsrgsdgqvf07yn9
date: 2024-12-11 10:54:41 +0800
tags: []
description: 'module.exports = {   //运行环境   env: {     browser:
  true,     es2021: true,     node: true,   },   //指定eslint继承的模板   extends:
  [     "eslint:recommend...'
image: ''
categories: []
---

\`\`\`javascript
module.exports = {
  //运行环境
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  //指定eslint继承的模板
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
  ],
  //引入具体的场景
  plugins: ["vue", "@typescript-eslint"],
  //具体的规则（引号，空格）
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "@typescript-eslint/ban-types": ["warn"],
  },
};
\`\`\`

plugins和extends的区别

配置plugins后还需要配置具体的规则，而extends集成了双方

\`\`\`javascript
"plugins": ["@typescript - eslint"],
"rules": {
  "@typescript - eslint/ban - types": ["warn"]
}
\`\`\`
`;export{n as default};
