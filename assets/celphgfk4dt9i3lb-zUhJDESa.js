const n=`---
title: 做题技巧
urlname: celphgfk4dt9i3lb
date: 2024-09-19 13:56:16 +0800
tags: []
description: promise分析技巧前置准备then函数中onfulfilled回调函数的执行时机（进微队列的时机）1.如果注册回调函数的时候promise对象的状态已经完成了，onfulfilled直接进微队列2.如果注册回调函数的时候promise对象的状态还是pending,那就等promise调用r...
image: https://cdn.nlark.com/yuque/0/2024/png/22718987/1726199614241-c22d3866-48db-43b8-99ba-3125f3dfd8d3.png
categories: []
---

## promise分析技巧

### 前置准备

then函数中onfulfilled回调函数的执行时机（进微队列的时机）

1.如果注册回调函数的时候promise对象的状态已经完成了，onfulfilled直接进微队列

2.如果注册回调函数的时候promise对象的状态还是pending,那就等promise调用reslove()之后再进微队列

then里面的回调函数如果不是函数，相等于是没有

\`\`\`javascript
Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
//相等于
Promise.resolve(1).then(console.log);

1;
\`\`\`

3.(特殊可以不学)如果then方法要吸收一个新的promise状态，他需要等待两个微队列的时机

注意await后面的代码（下一行的代码）其实在一个事件队列中

await后面的函数还是会立即执行的

最外层的await要等里层的await先返回才会继续进行

\`\`\`javascript
async function m() {
  console.log(0);
  const n = await 1; //当m函数运行到await就其实已经结束了
  console.log(n);
}

// function m() {
//   return Promise.resolve(1).then((n) => {
//     console.log(n);
//   });
// }

console.log(m())

先执行0，然后运行到await,相当于是要进入一个微队列，m()函数的返回值是then方法这个promise对象的返回值
所以输出结果：
0
pending
1
\`\`\`

注意

如果promise里面没有异步代码，那会直接返回fulfilled

\`\`\`javascript
const a = new Promise((resolve) => {
  resolve();
});
console.log(a);
\`\`\`

![](articles/celphgfk4dt9i3lb/1726739893807-89b9672d-4157-426c-99c0-ef06fa8c0ee1.png)

如果用promise的静态方法all,any,race的任务数组的每一项如果不是Promise对象，则使用Promise.resolve转成Promise对象，静态方法无论里面代码是否异步，一开始的状态都是pending

> 跟上面不一样

\`\`\`javascript
const a = Promise.all([1]);
console.log(a);
\`\`\`

![](articles/celphgfk4dt9i3lb/1726744038512-c5368e6c-3273-42c8-98e0-67db80be9ee6.png)

### 做题方式

做题的时候准备好两个队列，把要执行的函数依次排入

上面可以再来一行记录Promise的状态

执行栈：

宏队列：

微队列：

1.分析每一个promise对象的状态的数据

2.根据事件循环机制执行代码

### 例子1

\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    resolve();
    console.log(3);
  });
});

promise.then(() => {
  console.log(4);
});

console.log(5);
\`\`\`

> 分析
>
> promise 状态 返回值
>
> 执行栈
>
> 宏队列 setFn()
>
> 微队列
>
> 控制台
>
> 开始做题
>
> 1.先执行promise里面的执行函数，控制台输出1
>
> 2.setTimeout由于计时为0秒，于是立马完成，推入宏队列
>
> 3.promise这个变量的值被赋为promise对象，状态是pending（promise这个变量会拿到后面的运算结果）
>
> 4.promise对象注册成功之后的回调，但此时不会推入微队列中，因为他要等promise对象状态变为成功以后再执行（微队列中）
>
> 5.执行log，控制台输出5
>
> 6.这个时候执行栈已经执行完毕了，这个时候微队列里面没有东西，于是把宏队列里面的东西拿出来执行，控制台输出2，把promise对象的状态改为fufilled,同时把注册的回调函数(onfulfilled)推入微队列中，继续执行（必须要先把执行栈里面的东西执行完），控制台输出5
>
> 7.执行栈执行完毕，这个时候把微队列里面的函数拿来执行

### 例子2

\`\`\`javascript
var a;
var b = new Promise((resolve, reject) => {
  console.log("promise1");
  setTimeout(() => {
    resolve();
  }, 1000);
})
  .then(() => {
    console.log("promise2");
  })
  .then(() => {
    console.log("promise3");
  })
  .then(() => {
    console.log("promise4");
  });

a = new Promise(async (resolve, reject) => {
  console.log(a);
  await b;
  console.log(a);
  console.log("after1");
  await a;
  resolve(true);
  console.log("after2");
});

console.log("end");
\`\`\`

> 分析
>
> 1.刚开始定义a，a的值为undefined
>
> 2.定义b，b的值要等后面的函数执行完才会得到结果，刚开始也是undefined
>
> 3.开始执行函数，输出promise1
>
> 4.运行到一个setTimeout函数，等计时线程（1秒后）推入宏队列中
>
> 5.调用三个then方法，但是由于前一个promise对象的状态还是挂起，所以then方法里面的函数不会执行
>
> 6.三个then函数运行完成以后b的值被赋值为一个promise对象，状态是挂起
>
> 7.开始给a赋值，同样a的值要等后面的promise执行完毕以后才能拿到结果，刚开始是undefined，下一行代码等待b,这个时候promise构造函数内部的函数已经执行完毕了，主线程不会等，所以这个a的值变成了promise对象，状态是挂起
>
> 8.输出end

promise1，undefined，end，promise2，promise3，promise4,promise<pending>,after1

## 值和引用分析技巧

![](articles/celphgfk4dt9i3lb/1725503768687-095356ce-08b6-4dc6-bddd-0e9ff004bd73.png)
`;export{n as default};
