const n=`---
title: 系统准备
urlname: datisxcvmh376gv3
date: 2026-02-10 16:21:36 +0800
tags: []
description: 讲讲权限我们权限是跟菜单列表联动的我们的权限是到是控制到按钮级别，页面级别超级管理员可以管理端去配置，左边菜单栏，然后以及每一个菜单下有哪些action然后用户进来的时候，就可以得到他能看见的routeMap,然后通过addRoute去动态加路由封装了v-permission的指令，如果没有权...
image: articles/datisxcvmh376gv3/1770714651217-9df78815-bf52-4dd2-8e20-cb81356636e0.png
categories: []
---

讲讲权限

我们权限是跟菜单列表联动的

我们的权限是到是控制到按钮级别，页面级别

超级管理员可以管理端去配置，左边菜单栏，然后以及每一个菜单下有哪些action

然后用户进来的时候，就可以得到他能看见的routeMap,然后通过addRoute去动态加路由

封装了v-permission的指令，如果没有权限的话，通过el.parentNode?.removeChild(el)来移除dom

讲讲路由，讲讲登录

讲讲这个项目主要业务

云主机 轻量服务器

![](articles/datisxcvmh376gv3/1770714651217-9df78815-bf52-4dd2-8e20-cb81356636e0.png)

告警中心

![](articles/datisxcvmh376gv3/1770714684762-5fd6bce0-65cb-410b-b5a0-d474c2f183b3.png)

![](articles/datisxcvmh376gv3/1770714708882-86699449-366a-480a-b533-82c4eeee823b.png)

![](articles/datisxcvmh376gv3/1770714725250-25ace673-4e05-4b46-8279-7009b56b0f58.png)

集群管理

![](articles/datisxcvmh376gv3/1770714742043-185b8c5c-29f8-43bd-a2ad-ba9ba6bd7a95.png)

类似kuboard，去可视化配置的k8s指标 当然也可以用yaml

云运营

接入阿里云 腾讯云等等

费用中心

消费记录

工单中心

问题反馈

管理端：审计，菜单，权限等等

第三方库

xterm 远程连接机器

codemirror 写代码和展示代码

v-contextmenu 右键菜单

vue-draggable-next 页面元素拖拽

novnc 远程连接

marked 解析成markdown

难点亮点

树相关：树转数组，数组转树，查找树，展示树等等 多父树的处理

详细描述组件

src/components/Common/Select/src/Desc/index.vue

bdTable,bdform

大文件上传

这个由前端主导，实现可行之后再由后端来接的，所以node层 我也有参与

src/components/Base/Terminal/src/Console/index.vue

输入框

讲讲项目工程化与架构
`;export{n as default};
