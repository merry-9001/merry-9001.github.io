const n=`---
title: 介绍
urlname: bt1vobqb1ok0n1lg
date: 2024-10-23 17:32:30 +0800
tags:
  - 博客文章
description: 核心原理1.代码会执行两次，服务器端执行一次，客户端执行一次，在 SSR 的过程中，应用仅仅是一次性生成 HTML
  字符串，随后发送给浏览器；这期间根本没有用户交互，也没有实际的 DOM
  更新操作。2.由于代码在服务器端会执行，而服务器代码会面临来自多个客户端的请求，因此以前在客户端直接生产 ...
image: https://cdn.nlark.com/yuque/0/2025/png/22718987/1757920555253-165ce920-8eb5-429f-949c-82913c3797cc.png
categories: []
---

## 核心原理

1.代码会执行两次，服务器端执行一次，客户端执行一次，在 SSR 的过程中，应用仅仅是一次性生成 HTML 字符串，随后发送给浏览器；这期间根本没有用户交互，也没有实际的 DOM 更新操作。

2.由于代码在服务器端会执行，而服务器代码会面临来自多个客户端的请求，因此以前在客户端直接生产 Vue-Router 实例的方式得改造为一个工厂函数，每个请求都会得到一个全新的 Vue-Router 实例。

3.水合操作：所谓水合操作，就是服务器端返回给客户端的 html 重新被激活，变成一个单页应用的过程。水合的时候最常见的错误就是水合不匹配（Hydration mismatch），其原因是因为服务器端生成的 html 结构和客户端生成的 html 结构不匹配造成的。

水合相关的两个词：

脱水：是指在服务器端渲染的过程中，将渲染时使用的关键状态和数据提取出来，并以一种可序列化的形式嵌入到 HTML 中，发送给客户端。这样客户端在加载时可以直接使用这些数据，而不需要再次请求服务器。

注水：是指在客户端接管服务器渲染的页面时，将脱水的状态重新加载到客户端应用中，并使得客户端的 JavaScript 逻辑接管页面上的交互和功能。通过注水，客户端可以避免重复请求数据，实现无缝的客户端功能接管。

Nuxt：全栈上层框架

全栈：不仅仅是客户端开发，还包含**中间服务器**的开发

上层：开箱即用

客户端-中间服务器-后端服务器：中间服务器负责生成 HTML 页面，而后端服务器处理数据和业务逻辑。客户端向中间服务器请求页面时，中间服务器会从后端服务器获取数据，生成完整的首屏 HTML 页面并返回给客户端。（SSR 服务器端渲染阶段）

![](articles/bt1vobqb1ok0n1lg/1743826066377-65c5d647-19e1-4907-ac3b-92ed575f9205.png)

## SSR渲染demo

index.html

\`\`\`markdown
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><!--title--></title>
    <!--meta-->
  </head>
  <body>
    <div id="app"><!--vue-ssr-outlet--></div>
    <!-- 通过cdn的方式引入Vue -->
    <script type="importmap">
      {
        "imports": {
          "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
        }
      }
    <\/script>
    <script type="module" src="/client.js"><\/script>
  </body>
</html>
\`\`\`

app.js

\`\`\`jsx
import { createSSRApp } from "vue";

// 之所以要将创建Vue应用的方法提取出来
// 是因为在服务端渲染和客户端渲染的时候，都需要创建一个Vue应用实例
export function createApp() {
  // 创建一个Vue应用实例
  const app = createSSRApp({
    template: \`
        <div>
            <h1>Hello SSR</h1>
            <p>{{message}}</p>
            <button @click="count++">{{ count }}</button>
        </div>
    \`,
    data: () => ({
      count: 1,
      message: "这是一个SSR最简单的demo",
    }),
  });
  return app;
}
\`\`\`

client.js

\`\`\`jsx
// 客户端要运行的js代码
import { createApp } from "./app.js";
createApp().mount("#app");
\`\`\`

server.js

\`\`\`javascript
import { renderToString } from "vue/server-renderer";
import express from "express";
import fs from "fs";
import { createApp } from "./app.js";

// 创建服务器实例
const server = express();

// 定义一个配置对象，配置页面的元数据信息
const desc = {
  title: "SSR demo",
  meta: '<meta name="description" content="这是一个SSR最简单的demo">',
};

server.get("/", async (req, res) => {
  try {
    // 根据vue实例渲染出来的字符串内容
    const app = createApp();
    const content = await renderToString(app);
    const template = fs.readFileSync("./index.html", "utf-8");
    const html = template
      .replace("<!--title-->", desc.title)
      .replace("<!--meta-->", desc.meta)
      .replace("<!--vue-ssr-outlet-->", content);
    res.send(html);
    // 读取模板文件
  } catch (err) {
    console.log(err);
    res.status(500).send("服务器内部错误");
  }
});

// 使用中间件
// 将当前目录作为静态资源服务器目录
server.use(express.static("."));

server.listen("3000", () => {
  console.log("服务器已启动，监听3000端口......");
});
\`\`\`

用node启动服务器，当浏览器请求页面的时候：

1.服务器先准备好.html模板文件和需要替换的内容

2.利用vue提供的createSSRApp和renderToString的方法，在服务器端渲染好静态页面

3.为了让静态页面能运行js，还需要在模板文件中准备好client.js，后续的操作要交给他来处理

## csr项目改造成ssr

1.改造router

SSR 环境，每一次请求都必须要是全新的路由实例

\`\`\`javascript
export function createRouter() {
  return _createRouter({
    history: createMemoryHistory,
    routes,
  });
}
\`\`\`

2. 改造入口文件

要做的事情和改造router 一致，单独导出一个方法来创建应用实例

\`\`\`vue
export function createApp() { // 创建Vue应用实例，这里使用createSSRApp const app
= createSSRApp(App) // 创建路由实例 const router = createRouter() const pinia =
createPinia() // 引入图标 for (const [key, component] of
Object.entries(ElementPlusIconsVue)) { app.component(key, component) }
app.use(router).use(pinia).use(ElementPlus) // 需要将这些实例返回给外部 return {
app, router, pinia } }
\`\`\`

3. 服务器端入口文件

导出一个方法，该方法会根据传入的 url 做对应的首屏渲染

\`\`\`javascript
// 服务器端入口文件
import { createApp } from "../main";
import { renderToString } from "vue/server-renderer";

/**
 *
 * @param {*} url 用户请求的url
 * 根据不同的url，返回不同的首屏内容
 */
export async function render(url) {
  const { app, router } = createApp();

  // 根据用户请求的url，跳转到对应的路由
  router.push(url);

  // 等待路由跳转完成
  await router.isReady();

  // 目前为止，说明咱们的应用已经跳转到了对应的页面
  // 接下来需要对这个页面进行服务器端渲染，渲染为字符串
  const html = renderToString(app);
  return [html];
}
\`\`\`

> 是一个入口文件，给express服务器提供渲染后的html

4. 创建服务器

\`\`\`javascript
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// 辅助方法
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// 拿到当前文件的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// 定义 resolve 函数，用于拼接绝对路径
const resolve = (p) => path.resolve(__dirname, "..", p);

export async function createServer() {
  // 1. 创建 express 应用
  const app = express();

  // 2. 将 vite 创建的服务器以中间件的形式添加到 express 应用中，从而能够使用 vite 的热模块更新等特性
  const vite = await require("vite").createServer({
    server: {
      middlewareMode: true,
    },
    appType: "custom",
  });
  app.use(vite.middlewares);

  // 3. 处理请求
  app.use("*", async (req, res, next) => {
    try {
      // 拿到请求的 url
      const url = req.originalUrl;
      // 读取出来的模板html文件的字符串
      let template = fs.readFileSync(resolve("index.html"), "utf-8");
      // 调用 vite 的 transformIndexHtml 方法，注入一些必要的脚本和样式，为了使用 vite 的热更新等特性
      template = await vite.transformIndexHtml(url, template);
      // 读取服务端入口文件拿到 render 方法
      const render = (await vite.ssrLoadModule("/src/entry/server-entry.js"))
        .render;
      // 拿到的是Vue应用的html字符串
      const [appHtml] = await render(url);
      // 接下来做替换操作
      const html = template.replace(\`<!--vue-ssr-outlet-->\`, appHtml);
      console.log(html, "html");
      // 返回给客户端
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      console.error(error);
      res.status(500).send("Server Error");
      next();
    }
  });

  return app;
}
\`\`\`

5.还原SPA

进行水合操作，就是指第一次请求完整的 html 之后，需要重新变成一个单页应用。

渲染好后的 html 到达客户端后，去请求对应的客户端 JS，客户端 JS 就会把整个应用重新还原为单页应用。

创建一个客户端入口

\`\`\`javascript
import { createApp } from "../main";

const { app, router } = createApp();

router.isReady().then(() => {
  app.mount("#app");
});
\`\`\`

html中要引入这个js

\`\`\`javascript
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="app"><!--vue-ssr-outlet--></div>
    <script type="module" src="/src/entry/client-entry.js"><\/script>
  </body>
</html>

\`\`\`

6.Element-plus或者其他组件框架可能存在ssr和scr渲染不一致的情况，具体操作去查看组件框架文档

7. 数据预装载

所谓数据预装载，就是指将数据装载到 html 里面后一起发送给客户端。换句话说，即便不做水合操作，第一次请求首页的时候，表格应该是有数据的。

在服务器端执行获取数据的函数

\`\`\`javascript
export const useServerData = async (cb) => {
  // 判断如果是服务器端环境
  // 那么就直接调用cb
  if (import.meta.env.SSR && cb) {
    await cb();
  }
};
\`\`\`

在组件中使用hook

> import.meta.env.SSR通过这个参数可以判断当前的环境

\`\`\`vue
if (!import.meta.env.SSR) { // 仅在客户端渲染时执行 const { data } = await
store.getUserById(id) user = data } await useServerData(async () => { //
仅在服务端渲染时执行 const { data } = await store.getUserById(id)
Object.assign(user, data) })
\`\`\`

8. 数据预取

所谓数据预取，指的是服务器端向客户端返回完整的 html 的时候，不仅仅已经装载好了数据，还要将数据以某种形式额外的返回给客户端

index.html

\`\`\`markdown
<script>
 // 在window对象上面新增一个特殊的属性，用于存储仓库数据
 window.__INITIAL_STATE__ = '<!--pinia-state-->'
<\/script>
\`\`\`

客户端入口

\`\`\`javascript
import { createApp } from "../main";

const { app, router, pinia } = createApp();

router.isReady().then(() => {
  if (window.__INITIAL_STATE__) {
    // 说明返回的html上面挂了额外的数据
    // 需要将这个数据同步到客户端的仓库中
    pinia.state.value = JSON.parse(window.__INITIAL_STATE__);
  }
  app.mount("#app");
});
\`\`\`

##
`;export{n as default};
