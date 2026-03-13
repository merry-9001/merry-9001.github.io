const n=`---
title: gsap
urlname: dh1my31kpuu0u4vv
date: 2026-01-05 10:58:02 +0800
tags: []
description: gsap.to() 将元素的属性从当前值（或初始值）动画到指定的目标值。 gsap.from() 将元素的属性从指定的起始值动画到当前值
image: ''
categories: []
---

gsap.to()

将元素的属性从**<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">当前值</font>**（或初始值）**<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">动画到指定的目标值</font>**。

gsap.from()

将元素的属性从**<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">指定的起始值</font>**动画到**<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">当前值</font>**（回到默认值）

gsap.fromTo()

将元素的属性从**<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">指定的起始值</font>**动画到**<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">指定的目标值</font>**。

\`\`\`javascript
gsap.fromTo(
  targets,
  {
    x: -100, // 起始值
    opacity: 0,
  },
  {
    duration: 1,
    x: 100, // 目标值
    opacity: 1,
  },
);
\`\`\`

gsap.timeline()

会创建一个 **<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">时间线对象</font>**，你可以在这个对象上依次添加动画（\`<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">to</font>\`、\`<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">from</font>\`、\`<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">fromTo</font>\`），GSAP 会自动管理它们的播放顺序。

to的第三个参数用来控制从时间轴的什么时候开始（或者跟上一个动画的间隔）

\`\`\`javascript
const tl = gsap.timeline({
  defaults: { ease: "power2.in" },
  onStart() {
    document.documentElement.style.overflow = "hidden";
  },
  onComplete() {
    document.documentElement.style.overflow = "";
  },
});

tl.to(
  "span",
  {
    duration: 1,
    yPercent: -200,
    opacity: 0,
    stagger: 0.1,
  },
  1,
).to(markRef.current, {
  yPercent: -100,
  duration: 0.2,
});
\`\`\`
`;export{n as default};
