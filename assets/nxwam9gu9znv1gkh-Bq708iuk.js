const n=`---
title: 响应式问题
urlname: nxwam9gu9znv1gkh
date: 2024-11-19 13:45:46 +0800
tags: []
description: '响应式开发适用于PC和移动端界面改变不大的情况如果两者情况相差过大，那么适合开发两套响应式布局方案1.尽量不定宽，使用flex布局2.媒体查询3.使用vw/vh,min-width和max-width这样的参数媒体查询可以采用sass封装函数主题方案也可以封装函数$xl:
  1200px; $l...'
image: ''
categories: []
---

响应式开发适用于PC和移动端界面改变不大的情况

如果两者情况相差过大，那么适合开发两套

响应式布局方案

1.尽量不定宽，使用flex布局

2.媒体查询

3.使用vw/vh,min-width和max-width这样的参数

媒体查询可以采用sass封装函数

主题方案也可以封装函数

\`\`\`javascript
$xl: 1200px;
$lg: 970px;
$md: 750px;
$sm: 576px;

@mixin over-width() {
  @media all and (min-width: $xl) {
    @content;
  }
}

@mixin xl-width() {
  @media (max-width: $xl) {
    @content;
  }
}

@mixin lg-width() {
  @media (max-width: $lg) {
    @content;
  }
}

@mixin md-width() {
  @media (max-width: $md) {
    @content;
  }
}

@mixin sm-width() {
  @media all and (max-width: $sm) {
    @content;
  }
}


&__summary {
  font-size: 24px;
  line-height: 36px;
  margin: 0;
  @include lg-width {
    font-size: 20px;
    line-height: 32px;
  }
  @include md-width {
    font-size: 18px;
    line-height: 30px;
  }
  @include sm-width {
    font-size: 12px;
    line-height: 24px;
  }
}
\`\`\`

移动端布局

1.后面单位都使用rem，本质就是等比缩放

\`\`\`javascript
html.style.fontSize = 100 * (clientWidth（屏幕宽度） / designWidth（设计稿宽度）) + 'px';
\`\`\`

2.使用transform

\`\`\`javascript
transform: scale(0.5);
\`\`\`

过渡

\`\`\`javascript
transition: left 2s linear 0s;
\`\`\`

动画

\`\`\`javascript
@keyframes moveTest {
  //百分比是指整个动画耗时的百分比  10s
  from{
    transform: translate(0,0) rotate(45deg);
  }
  50%{
    transform: translate(0,500px);
  }
  to{
    transform: translate(500px,600px);
  }
}
animation: 动画名称 持续时间 运行的速度变化 延迟时间 播放次数(默认一次) 播放方向
\`\`\`
`;export{n as default};
