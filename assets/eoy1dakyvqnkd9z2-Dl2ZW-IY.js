const n=`---
title: css响应式布局
urlname: eoy1dakyvqnkd9z2
date: 2024-12-04 12:09:06 +0800
tags:
  - 博客文章
description: 响应式与自适应响应式:同一个页面用不同设备（电脑、平板、手机）去访问此页面，最后看到的布局和内容都有很大不同。自适应:同一个页面用不同设备（电脑、平板、手机）去访问此页面，最后看到的页面内容和布局基本上还是一样的，就是尺寸略有不同。媒体查询
image: https://cdn.nlark.com/yuque/0/2024/png/22718987/1707013516110-f9363580-ff05-4ba9-aa2f-5fa811359817.png
categories: []
---

## 响应式与自适应

<font style="color:rgb(51, 51, 51);">响应式:同一个页面用不同设备（电脑、平板、手机）去访问此页面，最后看到的布局和内容都有很大不同。</font>  
<font style="color:rgb(51, 51, 51);">自适应:同一个页面用不同设备（电脑、平板、手机）去访问此页面，最后看到的页面内容和布局基本上还是一样的，就是尺寸略有不同。</font>

![](articles/eoy1dakyvqnkd9z2/1707013520836-75ca9799-5e35-4467-8a5b-808e204533fa.png)

## 媒体查询

<font style="color:rgb(77, 77, 77);">使用@media媒体查询可以针对不同的媒体类型定义不同的样式，特别是响应式页面，可以针对不同屏幕的大小，编写多套样式，从而达到自适应的效果</font>

\`\`\`css
@media screen and (max-width: 960px) {
  body {
    background-color: #ff6699;
  }
}

@media screen and (max-width: 768px) {
  body {
    background-color: #00ff66;
  }
}
\`\`\`

## 长度单位控制

像素(px)

屏幕（显示器）实际上是由一个一个的小点点构成的,不同屏幕的像素大小是不同的，像素越小的屏幕显示的效果越清晰,所以同样的200px在不同的设备下显示效果不一样

百分比(%)

设置百分比可以使子元素跟随父元素的改变而改变

em

em会根据父元素字体大小来计算

rem

rem是相对于根元素的字体大小来计算

vw<font style="color:rgb(79, 79, 79);">/vh</font>

<font style="color:rgb(77, 77, 77);">vw表示相对于</font>**<font style="color:rgb(77, 77, 77);">视图窗口</font>**<font style="color:rgb(77, 77, 77);">的宽度，vh表示相对于视图窗口高度</font>

<font style="color:rgb(77, 77, 77);">任意层级元素，在使用vw单位的情况下，1vw都等于视图宽度的百分之一。</font>

## <font style="color:rgb(77, 77, 77);">min-width和max-width</font>

可以设置最大最小宽度

## flex布局

## grid布局

## min()和max()

\`\`\`html
width: min(500px, 80%); /* 比较500px和80%这两个值，取较小的那个作为宽度 */
\`\`\`

## vmin和vmax

vmin:取视口的最短边

vmax:取视口的最长边

\`\`\`javascript
width:100vmin
height:100vmin
\`\`\`

## 解决方案

1. 写两套css 大于多少显示什么东西，或者就不显示，然后显示不下就隐藏
2. 完全响应式，写一套代码，所有东西都要显示下，原来一行的东西变成两行，有些东西收缩 栅格化布局
`;export{n as default};
