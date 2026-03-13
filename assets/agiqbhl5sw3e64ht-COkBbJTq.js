const n=`---
title: css主题切换
urlname: agiqbhl5sw3e64ht
date: 2025-03-11 14:01:11 +0800
tags: []
description: 介绍主要是切换css样式css中变换最大的，就是颜色相关的属性，图片，icon....解决方案需要在根元素html.setAttribute("class",
  "primary"); html.setAttribute("class", "dark");css变量 + css样式.primar...
image: ''
categories: []
---

### 介绍

主要是切换css样式

css中变换最大的，就是颜色相关的属性，图片，icon....

### 解决方案

需要在根元素

\`\`\`javascript
html.setAttribute("class", "primary");
html.setAttribute("class", "dark");
\`\`\`

#### css变量 + css样式

\`\`\`javascript
.primary{
  --vt-c-bg:#fff;
}

.dark{
  --vt-c-bg:#000
}

//可能使用js，点击某个按钮之后，切换根元素的css样式
//样式切换之后，意味着css变量的值改变了
.layer{
  background-color:var(--vt-c-bg);
}
\`\`\`

\`\`\`javascript
<html class="primary" class="dark">
  <div></div>
</html>
\`\`\`

缺点：

css变量，是当我们点击某个按钮的时候做切换，可能如果变换比较大内容较多，会出现白屏的情况

#### css预处理器(scss,less,styuls...) + css样式

就是使用css预处理器强大的预编译功能，简单来说，就是把css先写好，当切换的时候，就直接切换了

\`\`\`javascript
html.primary .layer{
  color:#fff
}

html.dark .layer{
  color:#000
}
html.primary .container{}

html.dark .container{}

html.primary .link:hover{}
html.dark .link:hover{}
\`\`\`

缺点：

需要牺牲一开始的白屏时间

可以利用预处理器

\`\`\`plain
$themeMap:(
  primary:(
    app-container: #f3f6fd,
    main-color: #1f1c2e,
    secondary-color: #4A4A4A,
    link-color: #1f1c2e,
    link-color-hover: #c3cff4,
    link-color-active: #fff,
    link-color-active-bg: #1f1c2e,
    projects-section: #fff,
    message-box-hover: #fafcff,
    message-box-border: #e9ebf0,
    more-list-bg: #fff,
    more-list-bg-hover: #f6fbff,
    more-list-shadow: rgba(209, 209, 209, 0.4),
    button-bg: #1f1c24,
    search-area-bg: #fff,
    star: #1ff1c2,
    message-btn: #fff,
  ),
  dark:(
    app-container: #1f1d2b,
    main-color: #fff,
    secondary-color: rgba(255,255,255,.8),
    projects-section: #1f2937,
    link-color: rgba(255,255,255,.8),
    link-color-hover: rgba(195, 207, 244, 0.1),
    link-color-active-bg: rgba(195, 207, 244, 0.2),
    button-bg: #1f2937,
    search-area-bg: #1f2937,
    message-box-hover: #243244,
    message-box-border: rgba(255,255,255,.1),
    star: #ffd92c,
    light-font: rgba(255,255,255,.8),
    more-list-bg: #2f3142,
    more-list-bg-hover: rgba(195, 207, 244, 0.1),
    more-list-shadow: rgba(195, 207, 244, 0.1),
    message-btn: rgba(195, 207, 244, 0.1),
  )
);

@mixin themeMixin {
  @each $themeKey, $themeValue in $themeMap {
    html.#{$themeKey} & {
      //下面这样定义的话，就直接固定了混入中要写入什么css内容，不通用
      // color: map-get($themeValue, font-color);
      // background-color: map-get($themeValue, bg-color);
      // border: 1px solid map-get($themeValue, border-color);

      //由于外部要使用循环变量出来的内容，所以声明一个全局变量，方便外部调用
      $currentTheme: $themeValue !global;
      //可以使用scss中的@content，这个就很类似于vue中的插槽
      @content;
      //使用完之后，最好将全局变量清空
      $currentTheme: null !global;
    }
  }
}

//封装一个函数，方便调用取值
@function getVar($key) {
  @return map-get($currentTheme, $key);
}

//直接获取背景颜色的值
@mixin background_color($color) {
  @include themeMixin {
    background-color: getVar($color) !important;
  }
}

//直接获取字体颜色的值
@mixin font_color($color) {
  @include themeMixin {
    color: getVar($color) !important;
  }
}

//直接获取边框颜色的值
@mixin border_color($color) {
  @include themeMixin {
    border-color: getVar($color) !important;
  }
}
\`\`\`

使用

\`\`\`vue
.icon { width: 26px; @include background_color(main-color); }
\`\`\`

### 判断主题方式

1.媒体查询

\`\`\`javascript
@media (prefers-color-scheme: dark) {
  .container{
    color:#fff;
    background-color:#000;
  }
  .layer{
    border:1px solid #fff;
  }
}
\`\`\`

2.api

\`\`\`javascript
const media = window.matchMedia("(prefers-color-scheme: dark)");
const isDark = media.matches;
\`\`\`

跟随系统一共就只有两种颜色：dark和非dark

可以去监听，做切换

\`\`\`javascript
const media = window.matchMedia("(prefers-color-scheme: dark)");
media.addEventListener("change", followSystem);
\`\`\`
`;export{n as default};
