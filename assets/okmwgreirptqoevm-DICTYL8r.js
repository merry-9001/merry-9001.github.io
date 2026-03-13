const n=`---
title: css属性值计算过程
urlname: okmwgreirptqoevm
date: 2024-12-04 11:14:20 +0800
tags:
  - 博客文章
description: 介绍打开调试控制台，选中一个dom元素它的style可能寥寥无几，但是显示的时候是需要css的每个属性都要有值的,也就是说我们所书写的任何一个
  HTML 元素，实际上都有完整的一整套 CSS 样式。我们可以在浏览器调试窗中切换到computed标签页，观察到一个dom渲染到页面中每一个属性的值...
image: https://cdn.nlark.com/yuque/0/2025/png/22718987/1757919924288-6511ee96-ca5e-45c4-b6ee-3caeab5d1236.png
categories: []
---

## 介绍

打开调试控制台，选中一个dom元素它的style可能寥寥无几，但是显示的时候是需要css的每个属性都要有值的,也就是说我们所书写的任何一个 HTML 元素，实际上都有完整的一整套 CSS 样式。

![](articles/okmwgreirptqoevm/1688878264641-4ab6ef51-2e88-4122-afd2-182d918b9012.png)

我们可以在浏览器调试窗中切换到computed标签页，观察到一个dom渲染到页面中每一个属性的值

![](articles/okmwgreirptqoevm/1688878395732-521e7e77-3458-411d-a0c2-37d23b653113.png)

## 属性值的计算过程

### 1.确定声明值

首先第一步，是确定声明值。所谓声明值就是书写的 CSS 样式

\`\`\`css
p {
  color: red;
}
/* 这里我们声明了 p 元素为红色，那么就会应用此属性设置。 */
\`\`\`

### 2.层叠冲突(处理声明值冲突)

css样式表包含以下四种类型，他们会进行层叠

**1）作者样式表中的!important样式**

**2) 内联样式  
/*/***3) 作者样式表中的普通样式/*/*

总体规则：选择器选中的范围越窄，越特殊

具体规则：通过选择器，计算出一个4位数

    1. 千位：如果是内联样式，记1，否则记0
    2. 百位：等于选择器中所有id选择器的数量
    3. 十位：等于选择器中所有类选择器、属性选择器、伪类选择器的数量
    4. 个位：等于选择器中所有元素选择器、伪元素选择器的数量

**4) 浏览器默认样式表中的样式**

注意：

> 在作者样式表中的普通样式中分数高的属性会被应用，分数一样高则代码书写靠后的胜出

> a链接伪类的优先级排序
>
> link > visited > hover > active

### 3.使用继承

层叠冲突这一步完成后，解决了相同元素被声明了多条样式规则究竟应用哪一条样式规则的问题

\`\`\`html
<div>
  <p>Lorem ipsum dolor sit amet.</p>
</div>
\`\`\`

\`\`\`css
div {
  color: red;
}
\`\`\`

在上面的代码中，我们针对 div 设置了 color 属性值为红色，而针对 p 元素我们没有声明任何的属性，但是由于 color 是可以继承的，因此 p 元素从**最近**的 div 身上继承到了 color 属性的值。

![](articles/okmwgreirptqoevm/1689494075529-fbb022e8-f674-4c1b-aaec-b19e005e99ee.png)

### 4.使用默认值

走到这一步，如果属性值都还不能确定下来，那么就只能是使用默认值了

![](articles/okmwgreirptqoevm/1692696074439-1bfef76e-775f-4896-9fe2-21798bf113d7.png)

前面我们也说过，一个 HTML 元素要在浏览器中渲染出来，必须具备所有的 CSS 属性值，但是绝大部分我们是不会去设置的，用户代理样式表里面也不会去设置，也无法从继承拿到，因此最终都是用默认值。

## 属性值继承规则

样式和文字将被继承，我们为一个元素设置的样式同时也会应用到它的后代元素上

**背景相关的，布局相关等的这些样式都不会被继承。**

### 可以被继承的css属性

1.字体系列属性:font、font-family、font-weight、font-size、font-style;

2.文本系列属性:

内联元素：

color

line-height

word-spacing(设置单词之间的间距)

letter-spacing(设置文本字符间距)

text-transform(用于设置文本的大小写)

uppercase(所有字符强制转为大写)

lowercase(转小写)

capitalize(首字符强制转为大写)

块级元素：text-indent、text-align

3.元素可见性：visibility

4.表格布局属性：caption-side（标题位置）、border-collapse（设置边框分离还是合并）、border-spacing（边框分离状态下设置边框间距）、empty-cells（定义如何渲染无可视内容的单元格边框和背景）、table-layout（定义用于布局单元格行和列的算法）;

5.列表布局属性：list-style

### 不可以被继承的css属性

1.display：规定元素应该生成的框的类型；

2.文本属性：vertical-align、text-decoration(用于设置文本的修饰线外观包括上/下划线，管穿线，删除线，闪烁 );

3.盒子模型的属性：width、height、margin、border、padding;

4.背景属性：background、background-color、background-image;

5.定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、maxwidth、max-height、overflow、clip;
`;export{n as default};
