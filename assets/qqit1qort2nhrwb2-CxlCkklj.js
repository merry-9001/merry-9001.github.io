const n=`---
title: canvas
urlname: qqit1qort2nhrwb2
date: 2024-10-25 13:10:40 +0800
tags: []
description: 介绍canvas是html5的一个新标签，相当于一个画布，可以用来绘制丰富的图形，最终渲染在浏览器上。支持2d绘图，也支持3d绘图（webgl）canvas绘制的图形是一个位图放缩会导致图像失真，所以需要注意放缩比例的控制可以操作每一个点位的像素，进而实现高度自定义的图形绘制和动画效果相当于i...
image: articles/qqit1qort2nhrwb2/1768208651714-a7e4db98-92ca-48e2-9129-185b07095c1f.png
categories: []
---

### 介绍

canvas是html5的一个新标签，相当于一个画布，可以用来绘制丰富的图形，最终渲染在浏览器上。

支持2d绘图，也支持3d绘图（webgl）

canvas绘制的图形是一个位图

1. 放缩会导致图像失真，所以需要注意放缩比例的控制
2. 可以操作每一个点位的像素，进而实现高度自定义的图形绘制和动画效果
3. 相当于img引入的图片，可以右键另存

canvas应用领域：

1. 可视化图表
2. h5游戏制作
3. banner广告

### 特点

canvas是一个行内元素

canvas可以使用width 和 height 设置区域宽高 （默认宽高：300/*150）

#### 坐标系

每一个画布中都有一个坐标系统，画布的左上角为默认的(0,0)原点

#### 画布区域

使用width 和 height属性控制的区域。

这个区域有多大， 其包含的坐标系就有多大。

\`\`\`typescript
<canvas id="c1" width="400" height="400"></canvas>
\`\`\`

表示我们可以看到一个400/*400的坐标系

#### 放置区域

使用style样式控制的区域大小

画布区域中绘制的图形，最终会在放置区域中展示。

默认，放置区域与画布区域相同。

放置区域如果比画布区域大 or 小。 画布中的图形就会按比例放大或缩小。 （图像可能失真）

![](articles/qqit1qort2nhrwb2/1768208651714-a7e4db98-92ca-48e2-9129-185b07095c1f.png)

### 使用

\`\`\`javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// 绘制红色矩形
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 150, 100);

// 绘制蓝色圆形
ctx.beginPath();
ctx.arc(100, 150, 30, 0, 2 * Math.PI);
ctx.fillStyle = "blue";
ctx.fill();
\`\`\`
`;export{n as default};
