const n=`---
title: electron
urlname: zqe39u1xzgesdew5
date: 2024-10-23 14:23:33 +0800
tags: []
description: 介绍在 Electron 的内部，集成了两大部件：Chromium：为 Electron 提供了强大的 UI
  能力，可以在不考虑兼容的情况下，利用 Web 的生态来开发桌面应用的界面。Node.js：让 Electron
  有了底层的操作能力，比如文件读写，而且还可以使用大量开源的 npm 包来...
image: articles/zqe39u1xzgesdew5/1732612546355-92f8699e-e72f-403f-b3cf-327473ce1138.png
categories: []
---

## 介绍

在 Electron 的内部，集成了两大部件：

Chromium：为 Electron 提供了强大的 UI 能力，可以在不考虑兼容的情况下，利用 Web 的生态来开发桌面应用的界面。

Node.js：让 Electron 有了底层的操作能力，比如文件读写，而且还可以使用大量开源的 npm 包来辅助开发。

由于Chromium 和 Node.js 都是跨平台的，这意味着我们使用 Electron 所开发的应用也能够很轻松的解决跨平台的问题。

## 使用

### 启动方式（原始）

\`\`\`typescript
const { app, BrowserWindow } = require("electron");

// 创建窗口的方法
const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程（在窗口）里面使用 node.js
      contextIsolation: false, // 关闭上下文隔离
    },
  });
  win.loadFile("index.html");
};

// whenReady是一个生命周期方法，会在 Electron 完成应用初始化后调用
// 返回一个 promise
app.whenReady().then(() => {
  createWindow();
});
\`\`\`

配置项

> maxWidth：设置窗口的最大宽度
>
> minWidth：设置窗口的最小宽度
>
> maxHeight：设置窗口的最大高度
>
> minHeight：设置窗口的最小高度
>
> resizeable：是否可以改变大小，当设置 resizeable 为 false 之后
>
> moveable：是否可以移动、
>
> x：控制窗口在屏幕的横向坐标
>
> y：控制窗口在屏幕的纵向坐标
>
> icon：设置标题栏的图标，一般来讲是 ico 格式
>
> frame: false, // 隐藏窗口边框
>
> transparent: true, // 设置窗口透明

### 渲染安全策略

\`\`\`typescript
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
\`\`\`

有一个启动index.js

然后就是client和server两部分传递数据

client我们有一个渲染进程类似vue，封装一个页面stack

ipcRenderer 直接封装成http一样的请求

electron可以操作用户的电脑（操作系统），读文件等，可以本地存储文件

\`\`\`javascript
//这里提供用户的硬件信息
const os = require("os");
\`\`\`

## 进程与线程

electron是多进程的，我们应用入口文件的index.js，是由主进程负责的任务

> 浏览器也是多进程，而且一个页面一个进程，其中还有一个渲染主线程

![](articles/zqe39u1xzgesdew5/1732612546355-92f8699e-e72f-403f-b3cf-327473ce1138.png)

> 在 Electron 应用中，有一个窗口进程，由窗口进程来创建的窗口，之后才是渲染进程来渲染的页面。这也是为什么我们关闭了渲染进程，但是窗口还存在的原因

## 通信

![](articles/zqe39u1xzgesdew5/1734337749862-426d389f-d49f-4c94-af7d-f1cb52854cb6.png)

主进程：ipcMain模块

渲染进程：ipcRenderer模块

> 本质上用到了发布订阅模式

主进程

\`\`\`typescript
const { ipcMain } = require("electron");

// 接收
ipcMain.on("test", (event, data) => {
  // 主进程拿到数据之后，我们要给渲染进程回一个话
  try {
    console.log(data, "主进程");
    // 给渲染进程回话
    event.reply("data-res", "主进程已经收到消息啦，哈哈哈哈哈");
  } catch (err) {
    console.error(err);
  }
});
\`\`\`

渲染进程

\`\`\`typescript
const { ipcRenderer } = require("electron");

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  //发送
  ipcRenderer.send("test", data);
});

//接收
ipcRenderer.on("data-res", (event, data) => {
  console.log("收到回复，主进程回复的消息为：", data);
});
\`\`\`

## 常见设置

electron都提供了api去完成下面的功能

快捷键

\`\`\`typescript
const ret = globalShortcut.register("ctrl+e", () => {
  dialog.showMessageBox({
    message: "全局快捷键 ctrl+e 被触发了",
    buttons: ["好的"],
  });
});
\`\`\`

托盘图标

\`\`\`javascript
// 创建托盘图标方法
const createTray = () => {
  // 构建托盘图标的路径
  const trayPath = path.join(__dirname, "assets/tray.png");
  tray = new Tray(trayPath);

  tray.on("click", () => {
    // tray.getBounds() 方法可以获取到托盘图标的位置和大小
    // 返回的是一个对象 {x, y, width, height}
    const trayBounds = tray.getBounds();
    // 接下来设置窗口的位置
    win.setPosition(
      trayBounds.x + trayBounds.width / 2 - width / 2,
      trayBounds.height,
    );
    win.isVisible() ? win.hide() : win.show();
  });
};

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(() => {
  createWindow();
  createTray();
});
\`\`\`

剪切板

系统通知

\`\`\`typescript
const notifyBtn = document.getElementById("notifyBtn");
notifyBtn.addEventListener("click", function () {
  const option = {
    title: "您有一条新的消息，请及时查看",
    body: "这是一条测试消息，技术支持来源于 HTML5 的 notificationAPI",
  };
  const myNotify = new Notification(option.title, option);
  myNotify.onclick = function () {
    console.log("用户点击了通知");
  };
});
\`\`\`

进度条

\`\`\`javascript
ipcMain.on("uploadProgress", (_, progress) => {
  win.setProgressBar(progress);
});
\`\`\`

## 数据保存

1.利用node做持久化

2.利用浏览器缓存做持久化

> 数据可以保存在目录，主进程可以读写文件

用户数据目录：在 Windows 操作系统中，应用程序通常在以下路径之一存储用户数据：

C:/Users/[用户名]/AppData/Roaming/：用于存储漫游数据，即用户在不同计算机上使用相同用户账户时可以访问的数据。

C:/Users/[用户名]/AppData/Local/：用于存储特定于单个计算机的数据。

> 在 Electron 中可以通过 app.getPath("userData") 来获取到默认的用户数据目录。

简单数据electron提供了api

\`\`\`typescript
const Store = require("electron-store");
const store = new Store();
\`\`\`

大量数据通过node的fs去写

\`\`\`javascript
const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "exampleDir");

// 检查目录是否存在
if (!fs.existsSync(dirPath)) {
  // 如果目录不存在，则创建它
  fs.mkdirSync(dirPath, { recursive: true });
  console.log("Directory created successfully!");
} else {
  console.log("Directory already exists.");
}
\`\`\`

## 生命周期

will-finish-launching：在应用完成基本启动进程之后触发

ready：当 Electron 完成初始化后触发

window-all-closed：所有窗口都关闭的时候触发，特别是在 windows 和 linux 里面，所有窗口都关闭则意味着应用退出

before-quit：退出应用之前触发

will-quit：即将退出应用的时候

quit：退出应用的时候

渲染进程事件监听

除了 app 模块以外，BrowserWindow 也有很多的事件钩子：

closed：当窗口被关闭的时候

focus：当窗口聚焦的时候

show：当窗口展示的时候

hide：当窗口隐藏的时候

maxmize：当窗口最大化的时候

minimize：当窗口最小化的时候

## 打包

electron-builder

可以有一个配置

## 更新

electron-updater

# 公司

公司是设置单窗口的，然后前端不使用node

前端是vue3,后端是nest

我们公司没有渲染进程之间的通信，然后的话由于我们公司有sass，会把ipc通信封装的跟http请求一样的用法。通过环境去检查
`;export{n as default};
