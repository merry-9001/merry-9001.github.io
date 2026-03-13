const n=`---
title: 代码含义
urlname: ubp35atd3ephumq9
date: 2025-04-05 11:31:29 +0800
tags: []
description: 这是类型声明文件env.d.ts，写给ts看的告诉ts，所有以.vue结尾的文件都是一个模块因为ts只认识js文件，如果不声明，他不知道该怎么处理.vue文件declare
  module '*.vue' {   import { App, defineComponent } from 'vue...
image: ''
categories: []
---

这是类型声明文件env.d.ts，写给ts看的

告诉ts，所有以.vue结尾的文件都是一个模块

> 因为ts只认识js文件，如果不声明，他不知道该怎么处理.vue文件

\`\`\`typescript
declare module "*.vue" {
  import { App, defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void;
  };
  export default component;
}
\`\`\`
`;export{n as default};
