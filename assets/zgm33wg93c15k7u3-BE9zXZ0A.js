const n=`---
title: Tailwind
urlname: zgm33wg93c15k7u3
date: 2025-03-11 10:54:59 +0800
tags: []
description: '介绍简单来说就是在html中书写css，集成PurgeCSS（树摇）配置/** @type
  {import(''tailwindcss'').Config} */ module.exports = {   //应用文件   content:
  ["./src/**/*.{html,js}"],   ...'
image: ''
categories: []
---

### 介绍

简单来说就是在html中书写css，集成PurgeCSS（树摇）

### 配置

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  //应用文件
  content: ["./src/**/*.{html,js}"],
  //自定义配置
  theme: {
    //覆盖原有的tailwind的box-shadow样式
    boxShadow: {
      custom: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },

    //扩展当前主题样式类名
    extend: {
      backgroundColor: {
        "custom-gray": "#333",
        "custom-gray2": "#424242",
      },
      textColor: {
        "custom-light-gray": "#b0b0b0",
        "custom-gray": "#424242",
      },
      // 扩展帧动画
      keyframes: {
        slide: {
          "0%": {
            transform: "translateX(0)",
            filter: "brightness(1)",
          },
          "100%": {
            transform: "translateX(236px)",
            filter: "brightness(1.45)",
          },
        },
        "jump-off-1": {
          "0%": { transform: "rotate(0deg)" },
          "15%": { transform: "rotate(0deg)" },
          "35%": {
            transformOrigin: "-50% center",
            transform: "rotate(-180deg)",
          },
          "100%": {
            transformOrigin: "-50% center",
            transform: "rotate(-180deg)",
          },
        },
        "jump-off-2": {
          "0%": { transform: "rotate(0deg)" },
          "30%": { transform: "rotate(0deg)" },
          "50%": {
            transformOrigin: "-50% center",
            transform: "rotate(-180deg)",
          },
          "100%": {
            transformOrigin: "-50% center",
            transform: "rotate(-180deg)",
          },
        },
        "jump-off-3": {
          "0%": { transform: "rotate(0deg)" },
          "45%": { transform: "rotate(0deg)" },
          "65%": {
            transformOrigin: "-50% center",
            transform: "rotate(-180deg)",
          },
          "100%": {
            transformOrigin: "-50% center",
            transform: "rotate(-180deg)",
          },
        },
        "jump-off-4": {
          "0%": { transform: "rotate(0deg)" },
          "60%": { transform: "rotate(0deg)" },
          "80%": {
            transformOrigin: "-50% center",
            transform: "rotate(-180deg)",
          },
          "100%": {
            transformOrigin: "-50% center",
            transform: "rotate(-180deg)",
          },
        },
        "jump-down-1": {
          "5%": { transform: "scale(1, 1)" },
          "15%": {
            transformOrigin: "center bottom",
            transform: "scale(1.3, 0.7)",
          },
          "20%": {
            transformOrigin: "center bottom",
            transform: "scale(0.8, 1.4)",
          },
          "25%": {
            transformOrigin: "center bottom",
            transform: "scale(0.8, 1.4)",
          },
          "40%": {
            transformOrigin: "center top",
            transform: "scale(1.3, 0.7)",
          },
          "55%": { transform: "scale(1, 1)" },
          "100%": { transform: "scale(1, 1)" },
        },
        "jump-down-2": {
          "20%": { transform: "scale(1, 1)" },
          "30%": {
            transformOrigin: "center bottom",
            transform: "scale(1.3, 0.7)",
          },
          "35%": {
            transformOrigin: "center bottom",
            transform: "scale(0.8, 1.4)",
          },
          "40%": {
            transformOrigin: "center bottom",
            transform: "scale(0.8, 1.4)",
          },
          "55%": {
            transformOrigin: "center top",
            transform: "scale(1.3, 0.7)",
          },
          "70%": { transform: "scale(1, 1)" },
          "100%": { transform: "scale(1, 1)" },
        },
        "jump-down-3": {
          "35%": { transform: "scale(1, 1)" },
          "45%": {
            transformOrigin: "center bottom",
            transform: "scale(1.3, 0.7)",
          },
          "50%": {
            transformOrigin: "center bottom",
            transform: "scale(0.8, 1.4)",
          },
          "55%": {
            transformOrigin: "center bottom",
            transform: "scale(0.8, 1.4)",
          },
          "70%": {
            transformOrigin: "center top",
            transform: "scale(1.3, 0.7)",
          },
          "85%": { transform: "scale(1, 1)" },
          "100%": { transform: "scale(1, 1)" },
        },
        "jump-down-4": {
          "50%": { transform: "scale(1, 1)" },
          "60%": {
            transformOrigin: "center bottom",
            transform: "scale(1.3, 0.7)",
          },
          "65%": {
            transformOrigin: "center bottom",
            transform: "scale(0.8, 1.4)",
          },
          "70%": {
            transformOrigin: "center bottom",
            transform: "scale(0.8, 1.4)",
          },
          "85%": {
            transformOrigin: "center top",
            transform: "scale(1.3, 0.7)",
          },
          "100%": { transform: "scale(1, 1)" },
        },
      },
      // 定义 animation
      animation: {
        slide: "slide 1.5s ease-in-out infinite alternate",
        "jump-off-1": "jump-off-1 1.5s ease-in-out infinite alternate",
        "jump-off-2": "jump-off-2 1.5s ease-in-out infinite alternate",
        "jump-off-3": "jump-off-3 1.5s ease-in-out infinite alternate",
        "jump-off-4": "jump-off-4 1.5s ease-in-out infinite alternate",
        "jump-down-1": "jump-down-1 1.5s ease-in-out infinite alternate",
        "jump-down-2": "jump-down-2 1.5s ease-in-out infinite alternate",
        "jump-down-3": "jump-down-3 1.5s ease-in-out infinite alternate",
        "jump-down-4": "jump-down-4 1.5s ease-in-out infinite alternate",
      },
    },
  },
  //父元素 hover 的时候，子元素显示出来，
  //这里就需要使用到分组变体，分组变体同样需要在配置文件配置一下

  //限制变体的生成，只有配置才会生成，因为工程巨大，为了优化
  variants: {
    extend: {
      display: ["group-hover"],
      backgroundColor: ["group-hover"],
      textColor: ["group-hover"],
    },
  },
  plugins: [],
};
\`\`\`

### 使用

#### 变体

根据元素不同状态来应用原子类

\`\`\`javascript
<button class="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200">
  Click me
</button>
\`\`\`

父元素处于某一个状态的时候，子元素应用对应的原子类

\`\`\`javascript
<div class="group">
  <p class="text-gray-500 group-hover:text-blue-500">Hello, world!</p>
</div>
\`\`\`

当 input 处于 check 状态的时候，label 元素会应用 text-blue-500 原子类

\`\`\`javascript
<input type="checkbox" class="peer" />
<label class="text-gray-500 peer-checked:text-blue-500">Check me</label>
\`\`\`

### 插件

TailwindCSS中是允许我们自定义插件和组件的。需要注意一下两者之间的区别，插件一般指的是实现某一个具体的功能，组件一般是指封装了一段公共的代码。

\`\`\`javascript
module.exports = {
  // ...other configurations...
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".bg-skew-12": {
          transform: "skewY(-12deg)",
        },
        ".bg-skew-6": {
          transform: "skewY(-6deg)",
        },
        ".bg-skew-0": {
          transform: "skewY(0deg)",
        },
        ".bg-skew-6-reverse": {
          transform: "skewY(6deg)",
        },
        ".bg-skew-12-reverse": {
          transform: "skewY(12deg)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
\`\`\`

\`\`\`javascript
<div class="bg-skew-12"></div>
\`\`\`

### 组件

style.css

\`\`\`javascript
.item{
    @apply float-left max-w-[700px] h-40 shadow-md;
}
\`\`\`

\`\`\`javascript
<li class="item bg-img-1"></li>
\`\`\`

### 响应式

默认分隔

_sm_: _640px_ 及以上

_md_: _768px_ 及以上

_lg_: _1024px_ 及以上

_xl_: _1280px_ 及以上

_2xl_: _1536px_ 及以上

自定义分隔

\`\`\`javascript
module.exports = {
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    // ...其他配置
    // 如果你只是想新增一两个断点，那么还是建议在 extend 里面进行扩展
  },
  variants: {},
  plugins: [],
};
\`\`\`

使用

\`\`\`javascript
<div class="flex flex-col lg:flex-row">
  <div class="w-full lg:w-1/3">
    <!-- Column 1 content -->
  </div>
  <div class="w-full lg:w-1/3">
    <!-- Column 2 content -->
  </div>
  <div class="w-full lg:w-1/3">
    <!-- Column 3 content -->
  </div>
</div>
\`\`\`

### 总结

- 各种各样、数量庞大的实用类（原子类）
  - 这个是整个 Tailwindcss 的灵魂
  - 针对这一块的学习，最好的方式还是通过练习，在练习中慢慢熟悉常用的原子类
- 变体
  - 状态变体
    - hover、focus、checked...
  - 分组变体（group）
  - 深度选择器变体（peer）
  - 响应式开发（媒体查询：sm、md、lg）
  - 夜间模式（dark）
- 插件
  - 本质上就是一个函数，不要想那么复杂
  - 一般通过这个函数可以批量的添加自定义类
- 组件
  - 解决多个标签使用重复的类（原子类、自定义类）的问题
  - @apply xxx xxx xxx;
- 和 Postcss 集成
  - Tailwindcss 本身就是基于 Postcss 构建的，因此不需要安装 Postcss
  - 但是使用的时候需要安装具体的 Postcss 相关的插件
  - 在 Postcss 的配置文件中进行配置即可

通过tailwind可以跟vue结合，来数据驱动挂载类
`;export{n as default};
