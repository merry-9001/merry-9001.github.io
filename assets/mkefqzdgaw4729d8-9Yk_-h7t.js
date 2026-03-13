const n=`---
title: nuxt.js
urlname: mkefqzdgaw4729d8
date: 2025-04-28 16:23:39 +0800
tags: []
description: 介绍基于 Vue 的组件渲染成 HTML 并传输到客户端vue
  ssr的脚手架框架特点它以配置即开发（约定式）为理念，提供开箱即用的功能基于文件的路由：根据 pages
  目录下面的组件自动生成路由。自动导入：会将一些目录下的组件（components）自动导入到页面组件能自动导入的东西：Vue...
image: ''
categories: []
---

## 介绍

基于 Vue 的组件渲染成 HTML 并传输到客户端

> vue ssr的脚手架框架

## 特点

**它以配置即开发（约定式）为理念，提供开箱即用的功能**

基于文件的路由：根据 pages 目录下面的组件自动生成路由。

自动导入：会将一些目录下的组件（components）自动导入到页面组件

> 能自动导入的东西：
>
> Vue API：包括一系列的响应式 API，例如 ref、reactive、computed.....
>
> components 目录(存放功能性组件)下第一层组件
>
> composables 目录(存放组合式函数)
>
> pages: 视图组件
>
> layouts：布局组件

数据获取工具：内置了很多组件、组合式函数以及工具函数

默认使用的是 Vite构建工具

## nuxt的基本目录

.nuxt: 开发阶段 Nuxt 生成的临时目录。又 Nuxt 自动创建和管理的，里面会存放和框架运行相关的代码和文件。

.output：构建生产环境项目的时候，打包后的内容会放置在此目录。

components：组件，可以直接使用

layouts:模板，每个页面可以使用不一样的模板

middleware:中间件,用于打开页面的服务器前置条件

pages：每一个页面对应一个路由

> \\_开头是一个动态路由 nuxt框架

static:静态文件(图标)

store:全局可用的数据

plugins:第三方插件在这里(axios,element-plus)

nuxt.config.ts：基本所有的配置放在这里

## $fetch、useAsyncData、useFetch

$fetch会在客户端和服务器请求两次

useAsyncData只会在服务器预取数据

useFetch只会在服务器预取数据

> useAsyncData和useFetch的数据将作为有效负载转发到客户端，解决了此问题。
>
> 有效负载是一个通过 [<font style="color:rgb(0, 193, 106);">useNuxtApp().payload</font>](https://nuxt.zhcndoc.com/docs/api/composables/use-nuxt-app#payload) 访问的 JavaScript 对象。它在客户端上使用，以避免在代码在浏览器中执行时重新获取相同的数据 [<font style="color:rgb(0, 193, 106);">在水合期间</font>](https://nuxt.zhcndoc.com/docs/guide/concepts/rendering#universal-rendering)。

## 常见问题

### 什么时候用ClientOnly包裹？

在 Nuxt3 中，ClientOnly 组件用于确保其包裹的内容仅在客户端渲染（Client-Side Rendering, CSR），而不会在服务端渲染（Server-Side Rendering, SSR）过程中执行

使用场景

1.依赖浏览器 API 的组件 / 逻辑

<font style="color:rgba(0, 0, 0, 0.85) !important;">当组件需要访问</font>**<font style="color:rgb(0, 0, 0) !important;">仅在浏览器环境存在的 API</font>**<font style="color:rgba(0, 0, 0, 0.85) !important;">（如 </font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;">window</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;">、</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;">document</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;">、</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;">localStorage</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;"> 等）时，若直接在服务端渲染中使用，会导致以下问题：</font>

- **<font style="color:rgb(0, 0, 0) !important;">服务端报错</font>**<font style="color:rgba(0, 0, 0, 0.85) !important;">：服务端没有浏览器全局对象，会抛出</font><font style="color:rgba(0, 0, 0, 0.85) !important;"> </font>\`<font style="color:rgb(0, 0, 0);">ReferenceError</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;">（如</font><font style="color:rgba(0, 0, 0, 0.85) !important;"> </font>\`<font style="color:rgb(0, 0, 0);">window is not defined</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;">）。</font>
- **<font style="color:rgb(0, 0, 0) !important;">逻辑异常</font>**<font style="color:rgba(0, 0, 0, 0.85) !important;">：服务端渲染的内容可能与客户端不一致，导致页面显示错误。</font>

> 当然有时候也可以不使用ClientOnly，把涉及到window的逻辑放入onMounted()中，或者本身使用window就在点击按钮后，则可以不使用ClientOnly

<font style="color:rgb(0, 0, 0);">2.</font><font style="color:rgb(0, 0, 0) !important;">第三方库 / 插件的兼容性问题</font>

<font style="color:rgba(0, 0, 0, 0.85) !important;">某些第三方库（如依赖 DOM 的 UI 组件、图表库、动画库等）未适配服务端渲染，直接使用会导致：</font>

- <font style="color:rgba(0, 0, 0, 0.85) !important;">服务端渲染时崩溃。</font>
- <font style="color:rgba(0, 0, 0, 0.85) !important;">客户端激活（hydration）时出现 “水合失败”（Hydration Mismatch）。</font>

<font style="color:rgb(0, 0, 0) !important;">3.动态加载非必要的客户端资源</font>

<font style="color:rgba(0, 0, 0, 0.85) !important;">对于某些</font>**<font style="color:rgb(0, 0, 0) !important;">非关键内容</font>**<font style="color:rgba(0, 0, 0, 0.85) !important;">（如广告、统计脚本、动态交互组件），可以通过 </font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;">ClientOnly</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;"> 延迟到客户端加载，以：</font>

- **<font style="color:rgb(0, 0, 0) !important;">优化服务端性能</font>**<font style="color:rgba(0, 0, 0, 0.85) !important;">：减少服务端渲染的负担。</font>
- **<font style="color:rgb(0, 0, 0) !important;">提升首屏加载速度</font>**<font style="color:rgba(0, 0, 0, 0.85) !important;">：避免阻塞核心内容的渲染。</font>

<font style="color:rgba(0, 0, 0, 0.85) !important;"></font>

<font style="color:rgb(0, 0, 0) !important;">原理与实现机制</font>

<font style="color:rgb(0, 0, 0);">1. </font><font style="color:rgb(0, 0, 0) !important;">服务端渲染阶段</font>

- \`<font style="color:rgb(0, 0, 0);">ClientOnly</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;"> </font><font style="color:rgba(0, 0, 0, 0.85) !important;">包裹的内容会被</font>**<font style="color:rgb(0, 0, 0) !important;">替换为一个空的注释节点</font>**<font style="color:rgba(0, 0, 0, 0.85) !important;">（</font>\`<font style="color:rgb(0, 0, 0);"><!--client-only--></font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;">），避免服务端执行其中的逻辑。</font>
- <font style="color:rgba(0, 0, 0, 0.85) !important;">服务端返回的 HTML 中不包含实际内容，仅保留注释占位符。</font>

<font style="color:rgb(0, 0, 0);">2. </font><font style="color:rgb(0, 0, 0) !important;">客户端激活阶段</font>

- <font style="color:rgba(0, 0, 0, 0.85) !important;">当客户端 JavaScript 加载完成后，</font>\`<font style="color:rgb(0, 0, 0);">ClientOnly</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;"> </font><font style="color:rgba(0, 0, 0, 0.85) !important;">会被</font>**<font style="color:rgb(0, 0, 0) !important;">替换为真实的组件内容</font>**<font style="color:rgba(0, 0, 0, 0.85) !important;">，并在浏览器中渲染。</font>
- <font style="color:rgba(0, 0, 0, 0.85) !important;">此时可以安全地访问浏览器 API 或执行客户端逻辑。</font>

> 说白了就是，ClientOnly包裹的组件会在客户端进行渲染，也会脱离seo
`;export{n as default};
