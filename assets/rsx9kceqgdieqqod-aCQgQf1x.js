const n=`---
title: 问题总结
urlname: rsx9kceqgdieqqod
date: 2025-08-19 20:53:16 +0800
tags: []
description: symbol的应用场景vue3中provide和inject使用的keywebsocket通信之前是如何鉴权的？客户端和服务器在通信之前会有握手行为（先进行一次http请求）可以在http请求的时候设置请求头(ws连接的时候不会有header)const
  ws = new WebSocket(...
image: ''
categories: []
---

### symbol的应用场景

vue3中provide和inject使用的key

### websocket通信之前是如何鉴权的？

客户端和服务器在通信之前会有握手行为（先进行一次http请求）

可以在http请求的时候设置请求头(ws连接的时候不会有header)

\`\`\`markdown
const ws = new WebSocket("ws://localhost:8080/ws", {
headers: {
Authorization: \`Bearer \${token}\`,
},
});
\`\`\`

### 如何判断一个对象中是否有循环引用

使用weakSet

### 闭包应用场景

vue router源码中大量使用

### 登录方式

jwt token

cookie中存放 token token对应服务器session

### jwt如何限制发出去的令牌

可以服务器设置黑名单

### 创建了闭包的变量何时销毁？

当浏览器检测到这个变量不可能再使用的时候就会销毁

### node的require和webpack的模块转普通函数**\\_webpack\\_\\_**require的区别？

**\\_webpack\\_\\_**require里面对引用有特殊处理

### 在页面(html)之前js死循环，会不会页面白屏？

会的，浏览器会不停的转圈圈，页面不会有东西显示

### 写法疑问

\`\`\`javascript
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
  }

  constructor({ newColor = "green" } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon();
\`\`\`

{ newColor = "green" } = {} 这个写法是什么意思？

相当于是给了一个默认的对象值，如果没有传对象参数那么就使用前面的默认值，如果传递了则会覆盖前面的对象值（后面"={}"这样写应该是固定语法）

### svg改颜色

svg改颜色是改fill属性

### uitls和hooks的区别

<font style="color:rgb(25, 27, 31);background-color:rgb(248, 248, 250);">utils</font><font style="color:rgb(25, 27, 31);">是通用的工具函数，一般是纯函数 ，工具类方法；而</font><font style="color:rgb(25, 27, 31);background-color:rgb(248, 248, 250);">hooks</font><font style="color:rgb(25, 27, 31);">是对</font><font style="color:rgb(25, 27, 31);background-color:rgb(248, 248, 250);">utils</font><font style="color:rgb(25, 27, 31);">的一种封装，用于在组件中共享状态逻辑和副作用，带有生命周期或者是vue api的，涉及到变量保存等，通过使用hooks，我们可以将组件的状态和生命周期方法提取出来，并在多个组件之间共享和重用。这样可以减少代码重复，提高代码的可读性和可测试性。hooks里会用到vue的一些方法，比如ref，watch，调用pinia数据等。</font>

### JavaScript对象和json的区别

<font style="color:rgb(33, 37, 41);">JavaScript Object：程序里的数据结构</font>

<font style="color:rgb(33, 37, 41);">JSON：一种字符串格式，用来在网络/文件里传输数据</font>

<font style="color:rgb(33, 37, 41);"></font>

<font style="color:rgb(33, 37, 41);">JSON:</font>

<font style="color:rgb(33, 37, 41);">只能是数据</font>

<font style="color:rgb(33, 37, 41);">key 必须双引号</font>

<font style="color:rgb(33, 37, 41);">不能有函数</font>

<font style="color:rgb(33, 37, 41);">不能有 undefined</font>

<font style="color:rgb(33, 37, 41);"></font>

<font style="color:rgb(33, 37, 41);">其他的和JS语法一致</font>

<font style="color:rgb(33, 37, 41);"></font>

<font style="color:rgb(33, 37, 41);">可以使用JSON.stringify()和JSON.parse()进行转换</font>

#### <font style="color:rgb(33, 37, 41);">json --> js对象</font>

<font style="color:rgb(33, 37, 41);">JSON.parse()</font>

<font style="color:rgb(33, 37, 41);">它需要一个JSON字符串作为参数，会将该字符串转换为JS对象并返回</font>

\`\`\`plain
var o = JSON.parse(json);
\`\`\`

#### <font style="color:rgb(33, 37, 41);">JS对象 ---> JSON</font>

<font style="color:rgb(33, 37, 41);">JSON.stringify()</font>

<font style="color:rgb(33, 37, 41);">需要一个js对象作为参数，会返回一个JSON字符串</font>

### requestAnimationFrame

window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行 顾名思义，请求动画帧，也称 帧循环。 其实就是该API能以浏览器的显示频率来作为其动画动作的频率，比如浏览器每16.7ms刷新一次，动画回调也每16.7ms调用一次，这样就不会存在过度绘制的问题，动画不会掉帧，自然流畅。

<font style="color:rgb(77, 77, 77);">回调函数执行次数通常是每秒 60 次，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与 浏览器屏幕刷新次数相匹配。 屏幕刷新频率（次数）：屏幕每秒出现图像的次数。普通笔记本为60Hz。</font>

<font style="color:rgb(77, 77, 77);"></font>

<font style="color:rgb(77, 77, 77);">相对定时器的优势</font>

<font style="color:rgb(77, 77, 77);">由系统决定回调函数的执行时间,保证回调函数在屏幕每次的刷新间隔中只被执行一次,不丢帧,不卡顿.</font>

<font style="color:rgb(77, 77, 77);"></font>

<font style="color:rgb(77, 77, 77);">CPU节能</font>

<font style="color:rgb(77, 77, 77);">定时器：当页面被隐藏或最小化时,后台仍在执行动画任务,浪费资源,</font>

<font style="color:rgb(77, 77, 77);">requestAnimationFrame：在页面处理为未激活的状态下,屏幕刷新任务也会被系统暂停,因此跟着屏幕刷新率走的requestAnimationFrame也会停止渲染,当页面再次被激活时,动画再次从上次停留的地方继续执行,节省CPU开销</font>

<font style="color:rgb(77, 77, 77);"></font>

<font style="color:rgb(77, 77, 77);">函数节流</font>

<font style="color:rgb(77, 77, 77);">保证每个刷新间隔期间的刷新只被执行一次,既保证流畅性,又节省函数执行的开销,假设屏幕是60hz的刷新率,那么显示器每1000/60≈16.7毫秒刷新一次,多次绘制并不会在屏幕表现出来.</font>

\`\`\`plain
定义
let i = 0;
function step(timestamp) {
   console.log(i++);
   window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);


清除
let myReq;
let i = 0;
function step(timestamp) {
   console.log(i++);
   myReq = window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

document.onclick = function(){
   window.cancelAnimationFrame(myReq);    // 专属清除方式
}
\`\`\`

### 如何保证计时器的精准

<font style="color:rgb(77, 77, 77);">requestAnimationFrame和setInterval无法保证</font>

<font style="color:rgb(77, 77, 77);"> 剩余时间 = 结束时间戳 - 当前时间戳（最好使用这样的算法） </font>

<font style="color:rgb(77, 77, 77);"></font>

<font style="color:rgb(77, 77, 77);"> performance.now() </font>

\`\`\`markdown
function startSecondCountdown(totalMs, onTick, onDone) {
const end = Date.now() + totalMs;
let t;

function tick() {
const left = Math.max(0, end - Date.now());
onTick(Math.ceil(left / 1000));
if (left === 0) return onDone?.();

    // 对齐到下一秒边界，减少抖动与漂移
    const delay = 1000 - (Date.now() % 1000);
    t = setTimeout(tick, delay);

}

tick();
return () => clearTimeout(t);
}
\`\`\`

### 内存泄露

如果一个东西浏览器检测到你永远都不会再用了，那他就会清理垃圾，否则如果一个东西被引用，但你不会去用，那你就要手动释放

### 使用iconfont与svg的区别

svg是本地自定义样式，iconfont是使用已有的图标样式

1.网络要求不同

2.精细程度和看需要不需要修改

### <font style="color:rgb(37, 41, 51);">对BFF有什么理解？Node为什么支持高并发？多线程除了上下文切换还有什么影响性能？</font>

### eval是做什么的？

它的功能是把对应的字符串解析成JS代码并运行；

应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）。

### new Map()的应用

查找时有最高性能

### cjs，mjs，js文件的区别

| 文件扩展名                                                                                                                                      | 解析规则                                                                                                                                                                                                      | 适用场景                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| \`<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">.cjs</font>\`<br/><br/><br/><font style="color:rgb(31, 35, 41);"></font> | <font style="color:rgb(31, 35, 41);">强制按 CommonJS 解析（无视 package.json）</font>                                                                                                                         | <font style="color:rgb(31, 35, 41);">ESM 项目中兼容 CommonJS 代码、旧脚本</font>       |
| \`<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">.mjs</font>\`                                                            | <font style="color:rgb(31, 35, 41);">强制按 ES 模块解析（无视 package.json）</font>                                                                                                                           | <font style="color:rgb(31, 35, 41);">CommonJS 项目中使用 ESM 语法</font>               |
| \`<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">.js</font>\`                                                             | <font style="color:rgb(31, 35, 41);">受 package.json 的 </font>\`<font style="color:rgb(31, 35, 41);background-color:rgba(0, 0, 0, 0);">type</font>\`<br/><font style="color:rgb(31, 35, 41);"> 字段控制</font> | <font style="color:rgb(31, 35, 41);">项目默认模块规范（统一用 ESM 或 CommonJS）</font> |
`;export{n as default};
