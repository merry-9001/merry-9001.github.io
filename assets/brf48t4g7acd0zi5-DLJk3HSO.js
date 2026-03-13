const n=`---
title: 场景题
urlname: brf48t4g7acd0zi5
date: 2024-11-10 21:08:59 +0800
tags: []
description: 你在vite从0到1搭建的过程中遇到了哪些问题，怎么解决的？选型的话肯定使用的是vue3+vite
  因为我们整体的框架都已经迁移到了vue3,官方也更加推荐vite，vite的开发环境启动速度也更快在vite配置方面的话插件：vue（）【识别vue】AutoImport（）【自动导入组件，el...
image: ''
categories: []
---

## 你在vite从0到1搭建的过程中遇到了哪些问题，怎么解决的？

选型的话肯定使用的是vue3+vite 因为我们整体的框架都已经迁移到了vue3,官方也更加推荐vite，vite的开发环境启动速度也更快

在vite配置方面的话

插件：

vue（）【识别vue】

AutoImport（）【自动导入组件，element-plus和自己写的组件】

Components()【element-plus组件按需导入】【tree-shaking】

Icons（）【将一些svg图标的语法，可以动态引入图标（compoent）】

optimizeDeps：(依赖预构建)

将element-plus的样式也进行预构建（因为设置了按需加载，Vite的优化触发是在style样式加载）

resolve

alias:设置别名

build:

分包

server:

设置端口，热更新

---

约定式路由

---

打包文件，上传至beta服务器测试

\`\`\`typescript
import fs from "fs";
import { copyFile, mkdir, readdir, rm, stat } from "fs/promises";
\`\`\`

使用的第三方库

请求库

element-plus

pinia

router

qrcode

ali-oss

xlsx

wangeditor

## 当QPS（每秒访问量）达到峰值时，该如何处理

前端

缓存：本地缓存，服务器缓存,使用第三方cdn

合并请求：雪碧图

延迟请求：懒加载，请求队列

用户体验：提示，loading

后端

扩容

数据库优化：sql，索引，读写分离

负载均衡

## 分片上传文件，如何校验文件完整性？

1.hash

2.checksum(校验和)

遍历二进制->加法操作，性能高，准确性不高

3.文件大小

4.进度监控

由服务器来控制

## 如何做网站的seo

使用服务器渲染，这样在爬虫读网站源代码的时候有内容

设置好keywords，description的关键词检索

可以设置一个sitemap供搜索引擎使用（把所有的页面收录）

## 之前写过的代码是怎么测试的

一般会先定义好功能边界，一旦定好，就直接使用，我们有alpha和beta测试环境可以进行部署测试

页面还原度：一般交由设计师核对

功能还原度：产品经理和功能需求人核对

然后交由测试

## js如何做到精确计时

由于事件循环的存在，计时器不能做到精确计时

想要精确计时可以使用：

1.requestAnimationFrame(),调用一次的时间约为16.6ms

2.performance.now()得到当前时间

## 前端AST的应用

1.webpack分析依赖打包

2.vue模板的解析生成render函数

## 如何进行公共组件的设计

确定组件的使用边界在哪，通用到什么程度（这会影响到这个组件的开发难度），设计组件功能根据其使用场景，设计出组件的属性、事件、使用说明文档，测试用例根据使用说明文档编写组件测试用例

要设计出来以后，尽量不耦合使用者的场景，而且尽量要使得调用者更加方便

## 如何封装一个弹窗组件

html,css

里面的话可以分为顶部内容区域和中间内容区域；绝对定位，加上一个很大的z-index去展示这个弹窗，也可以使用vue3的<\`<font style="color:rgb(48, 49, 51);">Teleport</font>\`<font style="color:rgb(48, 49, 51);"> >把他发送到最外层body内</font>

<font style="color:rgb(48, 49, 51);"></font>

<font style="color:rgb(48, 49, 51);">属性：显示隐藏，宽度，是否显示关闭按钮，是否可拖拽</font>

<font style="color:rgb(48, 49, 51);">事件：打开弹窗的回调，关闭弹窗的回调，聚焦弹窗的回调</font>

<font style="color:rgb(48, 49, 51);">插槽：弹窗头部(title),默认插槽（内部）</font>

## 如何封装一个表格组件

html,css:

可以写一个table也可以用div

<font style="color:rgb(48, 49, 51);">属性：</font>

<font style="color:rgb(48, 49, 51);">数据（对象结构，key是表头，value是内容）</font>

<font style="color:rgb(48, 49, 51);">表头固定</font>

<font style="color:rgb(48, 49, 51);">斑马纹</font>

<font style="color:rgb(48, 49, 51);">数据是否撑开列</font>

<font style="color:rgb(48, 49, 51);">是否开启多选单选</font>

<font style="color:rgb(48, 49, 51);">高度</font>

<font style="color:rgb(48, 49, 51);">每行样式方法（参数就是每一行的数据）</font>

<font style="color:rgb(48, 49, 51);">合并行合并列方法（参数就是每一行的数据）</font>

<font style="color:rgb(48, 49, 51);">事件：滚动事件，hover事件，点击事件，选中事件，排序事件</font>

<font style="color:rgb(48, 49, 51);">插槽：每一行返回数据由外部来决定显示</font>

## 实现拖拽

\`\`\`javascript
// 当开始拖拽时触发的事件处理函数（拖拽的元素）
draggableElement.addEventListener("dragstart", function (e) {
  e.dataTransfer.setData("text/plain", "这是被拖拽的元素");
  // 记录拖拽开始时元素的坐标
  startX = draggableElement.offsetLeft;
  startY = draggableElement.offsetTop;
});

// 当在放置目标区域释放（放下）拖拽元素时触发的事件处理函数（拖入内部的元素，放置元素）
dropzone.addEventListener("drop", function (e) {
  e.preventDefault();
  // 获取鼠标在放置区域内的坐标（相对放置区域的坐标）
  const rect = dropzone.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  // 重新设置拖拽元素的位置，使其停留在放下的位置
  draggableElement.style.left = x + "px";
  draggableElement.style.top = y + "px";
});

// 阻止放置区域默认的dragenter和dragover行为，以允许放置
["dragenter", "dragover"].forEach(function (eventName) {
  dropzone.addEventListener(eventName, function (e) {
    e.preventDefault();
  });
});
\`\`\`

利用mousedown，mousemove，mouseup（计算位置）

\`\`\`javascript
// 获取要拖拽的元素
const dragableElement = document.getElementById("dragable");

// 记录鼠标按下时的坐标以及元素初始位置坐标
let startX, startY, initialLeft, initialTop;

// 鼠标按下事件
dragableElement.addEventListener("mousedown", function (e) {
  // 获取鼠标按下时的页面坐标
  startX = e.pageX;
  startY = e.pageY;
  // 获取元素初始的left和top值（相对定位情况下的偏移量）
  initialLeft = parseInt(window.getComputedStyle(dragableElement).left) || 0;
  initialTop = parseInt(window.getComputedStyle(dragableElement).top) || 0;

  // 鼠标移动事件（在鼠标按下后监听移动）
  document.addEventListener("mousemove", moveElement);
  // 鼠标抬起事件（当鼠标抬起时移除移动事件监听，停止拖拽）
  document.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", moveElement);
  });
});

function moveElement(e) {
  // 计算鼠标移动的距离
  const dx = e.pageX - startX;
  const dy = e.pageY - startY;
  // 根据移动距离更新元素的left和top值，实现位置改变
  dragableElement.style.left = initialLeft + dx + "px";
  dragableElement.style.top = initialTop + dy + "px";
}
\`\`\`

利用dragable

\`\`\`javascript
// 获取可拖拽元素
const dragableElement = document.getElementById("dragable-element");
// 获取放置目标区域
const dropTarget = document.getElementById("drop-target");

// 定义一个用于存储被拖拽元素的数据（可以是任意你想传递的数据）
dragableElement.dataset.transferData = "这是被拖拽元素携带的数据";

// 当拖拽开始时触发的事件
dragableElement.addEventListener("dragstart", function (e) {
  // 设置拖拽的数据以及数据类型，这里只是简单示例，可以设置更复杂的比如文件等数据类型
  e.dataTransfer.setData("text/plain", "拖拽的数据");
  // 可以设置一些拖拽时的样式等，比如让被拖拽元素半透明
  this.style.opacity = 0.5;
});

// 当拖拽结束（无论是否成功放置到目标区域）时触发的事件
dragableElement.addEventListener("dragend", function () {
  // 恢复元素的样式，比如透明度恢复正常
  this.style.opacity = 1;
});

// 当被拖拽元素进入目标区域时触发的事件
dropTarget.addEventListener("dragenter", function (e) {
  e.preventDefault();
  // 可以改变目标区域的样式提示用户可以放置在此处，比如改变背景色
  this.style.backgroundColor = "lightgray";
});

// 当被拖拽元素离开目标区域时触发的事件
dropTarget.addEventListener("dragleave", function () {
  // 恢复目标区域的样式
  this.style.backgroundColor = "";
});

// 当在目标区域进行放置操作时触发的事件
dropTarget.addEventListener("drop", function (e) {
  e.preventDefault();
  // 恢复目标区域的样式
  this.style.backgroundColor = "";
  // 获取被拖拽元素携带的数据（这里只是简单示例展示获取数据的方式）
  const transferredData = e.dataTransfer.getData("text/plain");
  console.log("接收到的拖拽数据:", transferredData);
  console.log(
    "被拖拽元素携带的自定义数据:",
    dragableElement.dataset.transferData,
  );
});

// 阻止默认的放置行为，这样才能触发我们自定义的drop事件
dropTarget.addEventListener("dragover", function (e) {
  e.preventDefault();
});
\`\`\`

\`\`\`javascript
document.addEventListener("DOMContentLoaded", function () {
  var draggable = document.getElementById("draggable");
  var dropzone = document.getElementById("dropzone");

  draggable.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", "draggable");
  });

  dropzone.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  dropzone.addEventListener("drop", function (event) {
    event.preventDefault();
    dropzone.appendChild(draggable);
  });
});
\`\`\`

## 如何将一个csr改造成一个ssr

客户端代码和服务器代码有差异

> 服务器没有window变量

ICE 放置原来代码，会显示报错

## 省略号怎么做

\`\`\`css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
\`\`\`

## 讲讲如何做一个登录与后台权限管理

## fileRead和URL.createObjectURL有什么区别

fileRead要花费更多的时间，去读取内容，最后生成的是一个data base64的dataUrl

URL.createObjectURL则是一个本地的blob临时访问地址，保存在内存中

## 处理用户bug的方式/步骤

用户反馈bug

1.服务监控

2.还原用户环境

3.复现bug

4.调试

## 页面定位属性

pageX，pageY：它反映的都是在完整页面布局中的位置

clientX，clientY：浏览器视口位置

scrollX，scrollY：已经滚动的位置（已经滚动了多少）

offsetX，offsetY：表示相对于触发事件元素自身的左上角为坐标原点的坐标值，用于确定鼠标在元素内部的相对位置。

screenX，screenY：<font style="color:rgba(0, 0, 0, 0.85);">绝对的屏幕坐标位置</font>

<font style="color:rgba(0, 0, 0, 0.85);"></font>

## <font style="color:rgba(0, 0, 0, 0.85);">如何计算滚动条宽度</font>

外层offsetWidth - 内部clientWidth

> clientWidth：<font style="color:rgba(0, 0, 0, 0.85);">它返回的是元素的内部宽度</font>
>
> <font style="color:rgba(0, 0, 0, 0.85);">offsetWidth：返回元素的布局宽度</font>

## <font style="color:rgba(0, 0, 0, 0.85);">如何判断一个属性是否存在？有哪些方案？</font>

<font style="color:rgba(0, 0, 0, 0.85);">1.布尔判定</font>

\`\`\`javascript
if (obj.a) {
}
\`\`\`

<font style="color:rgba(0, 0, 0, 0.85);">这种方式判定范围太广了，0，NaN，NULL，FALSE都会判断为false</font>

<font style="color:rgba(0, 0, 0, 0.85);"></font>

<font style="color:rgba(0, 0, 0, 0.85);">2.undefined</font>

\`\`\`javascript
if (obj.a === undefined) {
}
\`\`\`

<font style="color:rgba(0, 0, 0, 0.85);">这种方式的话，万一obj.a的值就为undefined就无法判断</font>

<font style="color:rgba(0, 0, 0, 0.85);"></font>

<font style="color:rgba(0, 0, 0, 0.85);">3.Object.keys()</font>

\`\`\`javascript
const obj = {
  a: 0,
};
Object.keys(obj).includes("a");
\`\`\`

<font style="color:rgba(0, 0, 0, 0.85);">不可枚举属性不会在遍历结果中</font>

<font style="color:rgba(0, 0, 0, 0.85);"></font>

<font style="color:rgba(0, 0, 0, 0.85);">4.obj.hasOwnProperty() 底层:Reflect.hasOwnProperty()</font>

\`\`\`javascript
const obj = {
  a: 0,
};
obj.hasOwnProperty(obj, "a");
\`\`\`

<font style="color:rgba(0, 0, 0, 0.85);">判断这个对象是否是自有属性（继承的会认为是false），这个属性不看原型链</font>

<font style="color:rgba(0, 0, 0, 0.85);"></font>

<font style="color:rgba(0, 0, 0, 0.85);">5.in 底层:Reflect.has()</font>

\`\`\`javascript
const obj = {
  a: 0,
};
"a" in obj;
\`\`\`

<font style="color:rgba(0, 0, 0, 0.85);">涉及原型链</font>

## 根据页面，说出抽象的数据结构
`;export{n as default};
