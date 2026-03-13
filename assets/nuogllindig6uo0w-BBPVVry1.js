const n=`---
title: 原理
urlname: nuogllindig6uo0w
date: 2025-04-28 16:24:15 +0800
tags:
  - 博客文章
description: vue原理(vue3)vue特点数据响应式只需要关注数据的变化，而不用关注页面的变化） 数据变化 -&gt;
  重新渲染数据决定界面，解决了界面展示与数据展示不一致虚拟dom单向数据流谁的数据谁负责，其他人动不了预编译虚拟DOM
image: https://cdn.nlark.com/yuque/0/2025/png/22718987/1757920519369-f441390a-d64e-4408-a6df-5503f221238f.png
categories: []
---

# vue原理(vue3)

## vue特点

1. 数据响应式

只需要关注数据的变化，而不用关注页面的变化） 数据变化 -> 重新渲染

数据决定界面，解决了界面展示与数据展示不一致

2. 虚拟dom
3. 单向数据流

谁的数据谁负责，其他人动不了

4. 预编译

## 虚拟DOM

vue依靠虚拟dom树生成真实的dom（他的优势在于修改时）

虚拟dom本质上就是一个普通的JS对象，用于描述视图的界面结构

用vue提供的h函数，返回的就是一个虚拟dom(VNode)

> 虚拟dom就是一个js对象
>
> 调用vue的h函数会得到一个虚拟dom对象
>
> 调用render函数会得到一个虚拟dom对象
>
> 模板(template)会被vue编译成一个render函数，render函数调用得到一个虚拟dom对象
>
> VNode === 虚拟dom === js对象

在vue中，**每个组件**都有一个render函数，每个render函数都会返回一个虚拟dom树，这也就意味着每个组件都对应一棵虚拟DOM树

后面如果组件更新了，他只管重新渲染他自己的虚拟dom树

Vue在生成真实的DOM之前，会将我们的节点转换成VNode，而VNode组合在一起形成一颗树结构，就是虚拟DOM树（VDOM）

组件树：指的是一个一个组件所形成的树结构。

虚拟 DOM 树：指的是某一个组件内部的虚拟 DOM 数据结构，并非整个应用的虚拟 DOM 结构。

![](articles/nuogllindig6uo0w/1719381232663-6316d6df-277b-48d3-83d5-01b92854a5b1.png)

一个虚拟DOM（VNode）会包括以下属性：

key：标识节点唯一性

el：对应的实际元素

prop：属性信息(id,class,href);<font style="color:rgba(0, 0, 0, 0.85);">对于自定义组件，这里会包含传递给组件的所有 props（属性）值。</font>

type：类型

children：子节点

component：子组件

### 生成虚拟dom的方法

#### 编写模板

vue框架中有一个compile模块，它主要负责将模板（本质是一个字符串）转换为render函数

模板编译器在对模板字符串进行编译的时候，是一点一点转换而来的，整个过程：

![](articles/nuogllindig6uo0w/1732868874691-dff8b280-730c-47df-8457-b6567d75e6cf.png)

- 解析器：负责将模板字符串解析为对应的模板AST
- 转换器：负责将模板AST转换为 JS AST
- 生成器：将 JS AST 生成最终的渲染函数（h函数）

如果使用传统的引入方式，则编译时间发生在组件第一次加载时，这称之为运行时编译。

如果是在vue-cli或者vite的默认配置下，编译发生在打包时，这称之为模板预编译。

模板预编译(template)

当使用 DOM 内模板或 JavaScript 内的字符串模板时，模板会在运行时被编译为渲染函数。通常情况下这个过程已经足够快了，但对性能敏感的应用还是最好避免这种用法。

预编译模板最简单的方式就是使用单文件组件——相关的构建设置会自动把预编译处理好，所以构建好的代码已经包含了编译出来的渲染函数而不是原始的模板字符串。

如果你使用 webpack，并且喜欢分离 JavaScript 和模板文件，你可以使用 vue-template-loader，它也可以在构建过程中把模板文件转换成为 JavaScript 渲染函数。

简单来说，当vue进行打包时，会直接把组件中的模板转换为render函数，这叫做模板预编译

**模板预编译只会发生在单文件组件(SFC)，并且把模板代码写在template里面的时候**

\`\`\`javascript
export default {
  //这样不会发生预编译
  template() {},
};
\`\`\`

> 在单文件组件(SFC)中，同时拥有template和render函数的时候，率先运行template，而在普通方式引入的时候会率先读取render函数

**这样做的好处在于：**

运行时就不再需要编译模板了，提高了运行效率，打包结果中不再需要vue的编译代码，减少了打包体积

打包完成的时候，还没有运行的时候，模板已经变成了一个render 函数，这样就省略了打包结果中还需要再进行编译模板的代码，减少打包体积（这一步是打包的时候做的）

编译是一个极其耗费性能的操作，预编译可以有效的提高运行时的性能，而且，由于运行的时候已不需要编译，vue-cli在打包时会排除掉vue中的compile模块，以减少打包体积

模板的存在，仅仅是为了让开发人员更加方便的书写界面代码

**vue最终运行的时候，最终需要的是render函数，而不是模板，因此，模板中的各种语法，在虚拟dom中都是不存在的，它们都会变成虚拟dom的配置**

#### template选项中编写html

在template 中的HTML 最终也是使用渲染函数生成对应的VNode

#### h函数

除非一些特殊的场景，真的需要JavaScript的完全编程的能力，这个时候你可以使用渲染函数

h() 函数是一个用于创建 vnode(虚拟DOM)的一个函数；

其实更准确的命名是 createVNode() 函数，但是为了简便在Vue将之简化为 h() 函数；

可以在setup函数中返回使用(vue3写法)

![](articles/nuogllindig6uo0w/1719380860684-85064e90-7cc4-4d59-be0e-da7ba24403ed.png)

<font style="color:rgba(0, 0, 0, 0.75);">render函数选项中（vue2写法）</font>

\`\`\`javascript
render(h){
  return h("div", [h("h1", "title1"), h("h2", "title2")])
}
\`\`\`

### render函数和setup函数的区别

vue2可以通过render函数（内部调用h函数）生成虚拟dom

vue3可以通过setup函数(内部都是使用h函数) 生成虚拟dom

render函数主要用于在**组件实例化后**以编程方式构建和更新组件的视图

> \`<font style="color:rgb(0, 0, 0);">render</font>\`<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(249, 250, 251);"> 函数里可以通过 </font>\`<font style="color:rgb(0, 0, 0);">this</font>\`<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(249, 250, 251);"> 访问 Vue 实例的 </font>\`<font style="color:rgb(0, 0, 0);">data</font>\`<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(249, 250, 251);">、</font>\`<font style="color:rgb(0, 0, 0);">methods</font>\`<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(249, 250, 251);"> 等属性。</font>

setup函数则是在**组件实例化过程中**

> \`<font style="color:rgb(0, 0, 0);background-color:rgb(249, 250, 251);">setup</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;background-color:rgb(249, 250, 251);"> 函数在组件实例初始化之前执行，此时 </font>\`<font style="color:rgb(0, 0, 0);background-color:rgb(249, 250, 251);">this</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;background-color:rgb(249, 250, 251);"> 并不指向组件实例，所以不能通过 </font>\`<font style="color:rgb(0, 0, 0);background-color:rgb(249, 250, 251);">this</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;background-color:rgb(249, 250, 251);"> 来访问组件的属性和方法。</font>\`<font style="color:rgb(0, 0, 0);background-color:rgb(249, 250, 251);">setup</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;background-color:rgb(249, 250, 251);"> 函数接收两个参数：</font>\`<font style="color:rgb(0, 0, 0);background-color:rgb(249, 250, 251);">props</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;background-color:rgb(249, 250, 251);"> 和 </font>\`<font style="color:rgb(0, 0, 0);background-color:rgb(249, 250, 251);">context</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;background-color:rgb(249, 250, 251);">，</font>\`<font style="color:rgb(0, 0, 0);background-color:rgb(249, 250, 251);">props</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;background-color:rgb(249, 250, 251);"> 用于接收父组件传递的数据，</font>\`<font style="color:rgb(0, 0, 0);background-color:rgb(249, 250, 251);">context</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;background-color:rgb(249, 250, 251);"> 包含 </font>\`<font style="color:rgb(0, 0, 0);background-color:rgb(249, 250, 251);">attrs</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;background-color:rgb(249, 250, 251);">、</font>\`<font style="color:rgb(0, 0, 0);background-color:rgb(249, 250, 251);">slots</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;background-color:rgb(249, 250, 251);"> 和 </font>\`<font style="color:rgb(0, 0, 0);background-color:rgb(249, 250, 251);">emit</font>\`<font style="color:rgba(0, 0, 0, 0.85) !important;background-color:rgb(249, 250, 251);"> 等属性。</font>

### 为什么需要虚拟dom？

js的计算效率要比创建和销毁dom的效率高很多，由于真实DOM的创建、更新、插入等操作会带来大量的性能损耗，从而就会极大的降低渲染效率。所以vue增加了虚拟dom，当页面结构发生变化的时候，先比较两棵树的虚拟dom，利用diff算法去计算出要更新的节点，然后再更新必要的节点。这样方式的效果高。

使用 diff 计算出更新的节点（JS 层面）

更新必要的 DOM 节点（DOM 层面）

> 不是使用虚拟dom效率会高，而是vue2/3的设计是以组件为单位的，当组件中有视图元素发生了变化，他只能重新渲染这个组件，因为他不知道具体哪个节点要更新，不得已才搞出了虚拟dom,如果每一次变动，vue都能准确的监控到，那他就没必要虚拟dom,有些框架和vue正在研究一个没有虚拟dom的新版本

使用虚拟dom的好处

虚拟 DOM 实际上是增加一层抽象层，相当于和原本的底层操作 DOM 进行解藕。这个其实就是设计原则里面的依赖倒置原则

在一个组件实例首次被渲染时，它先生成虚拟dom树，然后根据虚拟dom树创建真实dom，并把真实dom挂载到页面中合适的位置，此时，每个虚拟dom便会对应一个真实的dom。

如果一个组件受响应式数据变化的影响，需要重新渲染时，它仍然会重新调用render函数，创建出一个新的虚拟dom树，用新树和旧树对比，通过对比，vue会找到最小更新量，然后更新必要的虚拟dom节点，最后，这些更新过的虚拟节点，会去修改它们对应的真实dom

这样一来，就保证了对真实dom达到最小的改动。

![](articles/nuogllindig6uo0w/1719381262844-0f568e56-1e2c-4eca-bbda-544c97080c39.png)

### vue3怎么查看vnode 虚拟dom

调用组件的实例方法，里面有一个属性采用对象的方式去描述虚拟DOM

\`\`\`javascript
//获取当前实例的虚拟dom结构
const instance = getCurrentInstance()?.vnode;
\`\`\`

## 数据响应式

### 数据拦截

数据拦截就是在对数据进行操作，例如读数据、写数据的时候我们需要一种机制，在读写操作的中途进行一个打断，从而方便做一些额外的事情。这种机制我们就称之为数据拦截。

比如组件从初始化到正常渲染的时间线里，设置了几个拦截点（生命周期钩子），从而方便开发者做一些额外的事情，这也是一种数据拦截

数据拦截的方式

1. Object.defineProperty：对应2.x 响应式
2. Proxy：对应 Vue3.x 响应式

两者相同

1.都可以针对对象成员拦截（拦截读取，写入操作）

2.都可以深度拦截

两者不同

1.拦截广度

Object.defineProperty 是针对对象特定属性的读写操作进行拦截

Proxy 则是针对一整个对象的多种操作，包括属性的读取、赋值、属性的删除、属性描述符的获取和设置、原型的查看、函数调用等行为能够进行拦截。

2.Object.defineProperty新增属性无法拦截，proxy可以

3.proxy效率更高

两者递归拦截

Object.defineProperty

\`\`\`javascript
const data = {
  level1: {
    level2: {
      value: 100,
    },
  },
};

function deepDefineProperty(obj) {
  for (let key in obj) {
    // 首先判断是否是自身属性以及是否为对象
    if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
      // 递归处理
      deepDefineProperty(obj[key]);
    }
    // 缓存一下属性值
    let _value = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        console.log(\`读取\${key}属性\`);
        return _value;
      },
      set(value) {
        console.log(\`设置\${key}属性\`);
        _value = value;
      },
      configurable: true,
      enumerable: true,
    });
  }
}
deepDefineProperty(data);
console.log(data.level1.level2.value);
console.log("----------------");
data.level1.level2.value = 200;
\`\`\`

访问data.level1.level2.value

他会读取level1属性，读取level2属性，读取value属性

设置data.level1.level2.value = 200

他会读取level1属性，读取level2属性，设置value属性

> 每一层递归都会先读到子目录

Proxy

\`\`\`javascript
const data = {
  level1: {
    level2: {
      value: 100,
    },
  },
};
function deepProxy(obj) {
  return new Proxy(obj, {
    get(obj, prop) {
      console.log(\`读取了\${prop}属性\`);
      if (typeof obj[prop] === "object") {
        // 递归的再次进行代理
        return deepProxy(obj[prop]);
      }
      return obj[prop];
    },
    set(obj, prop, value) {
      console.log(\`设置了\${prop}属性\`);
      if (typeof value === "object") {
        return deepProxy(value);
      }
      obj[prop] = value;
    },
  });
}
const proxyData = deepProxy(data);
console.log(proxyData.level1.level2.value);
console.log("----------------");
proxyData.level1.level2.value = 200;
\`\`\`

访问data.level1.level2.value

他会读取level1属性，读取level2属性，读取value属性

设置data.level1.level2.value = 200

他会读取level1属性，读取level2属性，设置value属性

> 每一层递归都会先读到子目录

### 响应式数据本质

什么是响应式数据？其实就是被拦截的对象。

当对象被拦截后，针对对象的各种操作也就能够被拦截下来，从而让我们有机会做一些额外的事情。因此只要是被拦截了对象，就可以看作是一个响应式数据。

在 Vue3 中，创建响应式数据的方式，有 ref 和 reactive 两种，这两个 API 的背后，就是就是针对对象添加拦截。

在 JS 中，要实现数据拦截，要么是 Object.defineProperty，要么是 Proxy，而这两者都是针对对象来进行操作的。

#### ref源码

\`\`\`javascript
function createRef(rawValue, shallow = false) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}


class RefImpl<T> {
  private _value: T
  private _rawValue: T

  public dep?: Dep = undefined
  public readonly __v_isRef = true

  constructor(value: T) {
    this._rawValue =  toRaw(value)
    // 有可能是原始值，有可能是 reactive 返回的 proxy
    this._value =  toReactive(value)
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newVal) {
    newVal = toReactive(newVal);
    //判断两次值是否有变化
    if (hasChanged(newVal, this._value)) {
      this._value = newVal;
      triggerRefValue(this, newVal);
    }
  }
}

// 判断是否是对象，是对象就用 reactive 来处理，否则返回原始值
function toReactive(value){
  if(isObject(value)){
    return reactive(value);
  }
  return value
}

const data = createRef(false);
\`\`\`

#### reactive 源码

\`\`\`javascript
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>,
) {
  // ...

  // 创建 Proxy 代理对象
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers,
  )
  proxyMap.set(target, proxy)
  return proxy
}

export function reactive(target: object) {
  // ...

  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap,
  )
}

const data = reactive({a:1});
\`\`\`

#### 判断是否会产生拦截

注意：

1. 做题的时候先看是ref还是reactive，再看ref里面的是对象还是原始值
2. 做题的时候脑子里想着源码结构
3. ref.value是get和set
4. 对象的内部是proxy

只有产生拦截，才会有后续的依赖收集和派发更新一类的操作

\`\`\`javascript
// demo1
let state = ref(1);
state; // 不会拦截
console.log(state); // 不会拦截
console.log(state.value); // 会拦截，因为访问了 value 属性
console.log(state.a); // 不会拦截
state.a = 3; // 不会拦截
state.value = 3; // 会拦截
delete state.value; // 不会拦截
state = 3; // 不会拦截
\`\`\`

\`\`\`javascript
// demo2
let state = ref({ a: 1 });
state; // 不会拦截
console.log(state); // 不会拦截
console.log(state.value); // 会拦截
console.log(state.a); // 不会拦截（这是一个undefined）
console.log(state.value.a); // 会拦截，拦截到 value 和 a 属性的 get 操作
delete state.value.a; // 会拦截，value 的 get 操作，a 属性的 delete 操作
state.value = 3; // 会拦截，value 的 set 操作
delete state.value; // 不会拦截
state = 3; // 不会拦截
\`\`\`

\`\`\`javascript
// demo3
let state = reactive({});
state; // 不会拦截
console.log(state); // 不会拦截
console.log(state.a); // 会拦截
state.a = 3; // 会拦截
state.a = {
  b: {
    c: 3,
  },
}; // 会拦截，拦截到 a 属性的 set 操作
console.log("-------------");
console.log(state.a.b.c); // 会拦截，拦截 a 是 get 操作，拦截 b 是 get 操作,拦截 c 是 get 操作
delete state.a.b; // 会拦截 a 是 get 操作，b 是 delete 操作
\`\`\`

\`\`\`javascript
// demo4
const state = ref({ a: 1 });
const k = state.value;
console.log("-------------");
// 不会拦截，k 相当于是一个 proxy 对象，没有针对成员进行操作
//他既没有触发(state.value的set),也没有触发访问proxy内部的属性
console.log(k);
k.a = 3; // 会拦截，因为 k 是一个 proxy 对象，对 k 的成员进行操作会触发代理的 set 操作
const n = k.a; // 会拦截，因为访问了 k 的成员 a，会触发代理的 get 操作
console.log("-------------");
console.log(n);
\`\`\`

\`\`\`javascript
// demo5
const arr = reactive([1, 2, 3]);
arr; // 不会拦截
arr.length; // 会拦截
arr[0]; // 会拦截，拦截 0 的 get 操作
arr[0] = 3; // 会拦截，拦截 0 的 set 操作
arr.push(4); // 会被拦截
\`\`\`

### 响应式本质

是被监控的函数和**函数中用到**的**响应式数据**的关联

函数：被监控的函数

render

watchEffect

watch

computed函数

effect(源码内部的底层实现)

> 注意:如果在函数的运行期间存在异步代码，那么异步的代码统统不看了（不产生关联）

**函数中用到**的**响应式数据（一定要是获取对象的某个属性，并且这个对象是响应式的）**

props

ref

reactive

computed返回的数据

数据和函数关联起来以后，将来有一天数据发生变化，函数重新运行

函数在运行期间，出现了读取响应式数据被拦截的情况，我们就称之为两者之间产生了依赖，这个依赖（也就是一个对应关系）是会被收集的，方便响应式数据发生变化时重新执行对应的函数。

被监控的函数，在它的**同步**代码运行期间，读取或者操作被拦截的响应式数据会建立依赖关系（依赖收集）；建立了依赖关系之后，响应式数据发生变化，对应的函数才会重新执行（派发更新）。

所谓响应式，背后其实就是函数和数据的一组映射，当数据发生变化，会将该数据对应的所有函数全部执行一遍。当然这里的数据和函数都是有要求的。数据是响应式数据，函数是被监控的函数。

> 收集数据和函数的映射关系在 Vue 中被称之为依赖收集
>
> 数据变化通知映射的函数重新执行被称之为派发更新
>
> 依赖收集：所谓依赖收集，其实就是收集的一些函数。因为当数据发生变化的时候，需要重新执行这些函数，因此需要提前收集起来。
>
> 派发更新：所谓派发更新，就是通知被收集了的函数，现在数据已经更新了，你们需要重新执行一遍。

\`\`\`javascript
// demo4
var a = ref({ b: 1 });
const k = a.value;
const n = k.b;
function foo() {
  a;
  a.value;
  k.b;
  n;
}
// 有依赖关系
// foo 依赖 a 的 value 属性
// foo 依赖 k 的 b 属性
\`\`\`

\`\`\`javascript
// demo5
var a = ref({ b: 1 });
const k = a.value;
const n = k.b;
function foo() {
  a;
  a.value;
  a.value.b;
  k;
  k.b;
  n;
}
// 有依赖关系
// foo 依赖 k 的 b 属性
// foo 依赖 a.value
// foo 依赖 a 的 value 以及 b 属性
// foo 不会依赖 k
\`\`\`

注意:如果在函数的运行期间存在异步代码，那么之后的代码统统不看了。

\`\`\`javascript
// demo8
var a = ref({ b: 1 });
const k = a.value;
const n = k.b;
async function foo() {
  a;
  a.value; // 产生依赖，依赖 value 属性
  await 1;
  k.b; // 没有依赖，因为它是异步后面的代码
  n;
}
\`\`\`

运行题

注意：

1.看一段时间后，值到底变化了没有，没有变化是不会运行watchEffect的

2.看watchEffect里面到底是依赖谁，同时还要看是赋值还是仅仅一个变量（含义不一样）

\`\`\`javascript
// demo1
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  // 首先判断依赖关系
  console.log("运行");
  state; // 没有依赖关系产生
  state.value; // 会产生依赖关系，依赖 value 属性
  state.value.a; // 会产生依赖关系，依赖 value 和 a 属性
  n; // 没有依赖关系
});
setTimeout(() => {
  state.value = { a: 3 }; // 要重新运行
}, 500);
\`\`\`

\`\`\`javascript
// demo2
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value; // value
  state.value.a; // value a
  n;
});
setTimeout(() => {
  //   state.value; // 不会重新运行（值未改变）
  state.value.a = 1; // 不会重新运行（值未改变）
}, 500);
\`\`\`

\`\`\`javascript
// demo3
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value; // value
  state.value.a; // value、a
  n;
});
setTimeout(() => {
  k.a = 2; // 这里相当于是操作了 proxy 对象的成员 a
  // 要重新运行
  // 如果将上面的 state.value.a; 这句话注释掉，就不会重新运行
}, 500);
\`\`\`

\`\`\`javascript
// demo4
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
let n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value;
  state.value.a;
  n;
});
setTimeout(() => {
  n++; // 不会重新运行
}, 500);
\`\`\`

\`\`\`javascript
// demo5
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
let n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value;
  state.value.a; //相等于监听到这个属性了;
  n;
});
setTimeout(() => {
  state.value.a = 100; // 要重新运行
  state = 100; // 不要重新运行
}, 500);
\`\`\`

\`\`\`javascript
// demo9
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a = 2; // 注意这里的依赖仅仅只有 value 属性（没有监听a属性）
});
setTimeout(() => {
  //   state.value.a = 100; // 不会重新运行的
  state.value = {}; // 要重新运行
}, 500);
\`\`\`

\`\`\`javascript
// demo7
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value; // value 会被收集
  n;
});
setTimeout(() => {
  state.value.a = 100; // 不会重新执行（没监控这个属性）
}, 500);
\`\`\`

\`\`\`javascript
// demo8
import { ref, watchEffect } from "vue";
let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a; // value、a
});
setTimeout(() => {
  state.value = { a: 1 }; // 要重新运行(state.value的set会改变state.value.a)
}, 500);
\`\`\`

\`\`\`javascript
// demo10
import { ref, watchEffect } from "vue";
let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value.a; // value、a
  n;
});
setTimeout(() => {
  state.value.a = 2; // 要重新运行
}, 500);
setTimeout(() => {
  //   k.a = 3; // 要重新运行
  k.a = 2; // 因为值没有改变，所以不会重新运行
}, 1000);
\`\`\`

\`\`\`javascript
// demo11
import { ref, watchEffect } from "vue";
let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a; // value、a
});
setTimeout(() => {
  state.value = { a: 1 }; // 要重新运行
}, 500);
setTimeout(() => {
  k.a = 3; // 这里不会重新运行，因为前面修改了 state.value，不再是同一个代理对象
}, 1000);
\`\`\`

\`\`\`javascript
// demo12
import { ref, watchEffect } from "vue";
let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a; // value、a
});
setTimeout(() => {
  state.value = { a: 1 }; // 要重新执行
}, 500);
setTimeout(() => {
  state.value.a = 2; // 要重新执行
}, 1000);
\`\`\`

\`\`\`javascript
// demo13
import { ref, watchEffect } from "vue";
let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a; // value、a
});
setTimeout(() => {
  state.value = { a: 1 }; // 重新执行
}, 500);
setTimeout(() => {
  state.value.a = 1; // 不会重新执行，因为值没有变化
}, 1500);
\`\`\`

\`\`\`javascript
// demo14
import { ref, watchEffect } from "vue";
let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a; // value、a
  k.a; // 返回的 proxy 对象的 a 成员
});
setTimeout(() => {
  state.value = { a: 1 }; // 要重新运行
}, 500);
setTimeout(() => {
  k.a = 3; // 会重新执行
}, 1000);
setTimeout(() => {
  state.value.a = 4; // 会重新执行
}, 1500);
\`\`\`

父组件传过来的props是响应式数据，里面的数据只是具体的数据值而已

在vue3里面，只有他给你生成的代理是响应式数据，里面的属性并不是

界面不会刷新

![](articles/nuogllindig6uo0w/1725434025196-fd385483-75cf-4dc8-a0a8-92894d5520eb.png)

界面会刷新

![](articles/nuogllindig6uo0w/1725433990548-4278357c-988b-4e95-857a-366cae86e17b.png)

> 被监控的函数
>
> vue2：被放入Wacher的函数
>
> vue3: 被放入effect的函数

### 响应式和组件渲染

模板的本质：对应的就是 render 渲染函数，该函数执行之后，会返回虚拟 DOM，这是一种用来描述真实 DOM 的数据结构。

响应式的本质：当数据发生变化的时候，依赖该数据的函数重新运行。

render函数会和响应式数据关联起来，当响应式数据发生变化的时候，所关联的 render 函数会重新运行，从而得到新的虚拟 DOM 结构，然后渲染器会根据新的虚拟 DOM 结构去更新真实 DOM 结构，从而在视觉感官上看到的是界面的变化。（可以认为render函数跟watchEffect一样都是一个被监控的函数，一开始会收集依赖，当响应式数据变化的时候就会派发更新）

Vue 的更新是组件级别的，通过响应式，能够知道具体是哪个组件更新了。

因为响应式数据是和 render 函数关联在一起，整个 render 函数对应的就是一整个组件的结构，回头只要响应式数据一变化，render 函数就会重新执行，生成组件新的虚拟 DOM 结构。

之后要知道具体是哪一个节点更新，就需要靠 diff 算法了。

Vue2: 双端 diff

Vue3: 快速 diff

2.0 的响应式是一个组件对应一个 watcher，因为 watcher 是组件级别，只能知道是哪个组件要更新，但是组件内部具体是哪一个节点更新是无从得知的。这个时候虚拟 DOM 就派上用场了，通过对虚拟 DOM 进行 diff 计算，就能够知道组件内部具体是哪一个节点更新。

![](articles/nuogllindig6uo0w/1726540988588-a267e091-5bfe-4530-9534-912dc18cec77.png)

Vue3 的响应式在架构层面上面是没有改变的，仍然是响应式+虚拟DOM

响应式：精确到组件级别，能够知道哪一个组件更新了。不过 Vue3 的响应式基于 Proxy.

虚拟 DOM：通过 diff 算法计算哪一个节点需要更新，不过 diff 算法也不再是 Vue2 的 diff 算法，算法方面也有更新。

### 手写响应式

1.监听数据的读写（proxy）

2.拦截后对应的处理

收集器：针对读取的行为，会触发收集器去收集依赖，所谓收集依赖，其实就是建立数据和函数之间的依赖关系

触发器：针对写入行为，触发器会工作，触发器所做的事情就是触发数据所关联的所有函数，让这些函数重新执行

下面是不同行为对应的事情：

是否存在某个属性：收集器

获取属性：收集器

遍历属性：收集器

设置属性：触发器

新增属性：触发器

删除属性：触发器

只要涉及到属性的访问，那就是收集器，只要涉及到属性的设置（新增、删除都算设置），那就是触发器。

WeakMap + Map + Set

map：保存依赖关系（响应式对象的哪个属性和哪个函数发生关联）

WeakMap 键对应的是响应式对象，值是一个 Map，这个 Map 的键是该对象的属性，值是一个 Set，Set 里面存储了所有依赖于这个属性的 effect 函数

大致思路是收集依赖放到一个函数数组中，然后去触发一个数组中每一个函数的运行

\`\`\`javascript
// 映射表：用于存储原始对象和代理对象之间的映射关系
const proxyMap = new WeakMap();

// 用来存储对象和其属性的依赖关系
const targetMap = new WeakMap();

const handlers = {
  get: getHandler,
  set: setHandler,
  deleteProperty: deleteHandler,
  has: hasHandler,
  ownKeys: ownKeysHandler,
};

//get
function getHandler(target, key) {
  // 拦截到 get 操作后，要做一些额外的事情
  // 要做的事情，就是收集依赖
  track(target, TrackOpTypes.GET, key);

  //获取值
  const result = Reflect.get(target, key);

  // 获取到的成员可能是对象，需要递归处理，将其转换为响应式
  if (isObject(result)) {
    return reactive(result);
  }
  return result;
}

function track(target, type, key) {
  // 这里要做的事情其实很简单，就是一层一层的去找，找到了就存储
  let propMap = targetMap.get(target);
  if (!propMap) {
    propMap = new Map();
    targetMap.set(target, propMap);
  }

  let typeMap = propMap.get(key);
  if (!typeMap) {
    typeMap = new Map();
    propMap.set(key, typeMap);
  }

  // 最后一步，根据 type 值去找对应的 Set
  let depSet = typeMap.get(type);
  if (!depSet) {
    depSet = new Set();
    typeMap.set(type, depSet);
  }

  // 现在找到 set 集合了，就可以存储依赖了
  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect);
    activeEffect.deps.push(depSet); // 将集合存储到 deps 数组里面
  }
}

//set
function setHandler(target, key, value) {
  // 在设置之前需要缓存一下旧值
  const oldValue = target[key];

  // 先进行设置操作
  const result = Reflect.set(target, key, value);

  // 要不要派发更新需要一些判断
  if (hasChanged(oldValue, value)) {
    // 派发更新
    trigger(target, type, key);
  }
  return result;
}

function trigger(target, type, key) {
  // 要做的事情很简单，就是找到依赖，然后执行依赖
  const effectFns = getEffectFns(target, type, key);
  if (!effectFns) return;
  for (const effectFn of effectFns) {
    if (effectFn.options && effectFn.options.shcheduler) {
      // 说明用户传递了回调函数，用户期望自己来处理依赖的函数
      effectFn.options.shcheduler(effectFn);
    } else {
      // 执行依赖函数
      effectFn();
    }
  }
}

function reactive(target) {
  //设置代理
  const proxy = new Proxy(target, handlers);

  // 将原始对象和代理对象存储到映射表中
  proxyMap.set(target, proxy);
  return proxy;
}
\`\`\`

## 响应式系统

**编译器**

主要负责将开发者所书写的**模板转换为渲染函数**。例如：

\`\`\`vue
<template>
  <div>
    <h1 :id="someId">Hello</h1>
  </div>
</template>
\`\`\`

编译后的结果为：

\`\`\`javascript
function render() {
  return h("div", [h("h1", { id: someId }, "Hello")]);
}
\`\`\`

执行渲染函数，就会得到 JS 对象形式的 UI 表达。

整体来讲，整个编译过程如下图所示：

![](articles/nuogllindig6uo0w/1745833611440-ae0b3163-b856-4f90-8359-e2cfc57d920b.png)

可以看到，在编译器的内部，实际上又分为了：

- 解析器：负责将模板解析为对应的模板 AST（抽象语法树）
- 转换器：负责将模板AST转换为 JS AST
- 生成器：将 JS AST 生成对应的 JS 代码（渲染函数）

Vue3 的编译器，除了最基本的编译以外，还做了很多的优化：

1. 静态提升
2. 预字符串化
3. 缓存事件处理函数
4. Block Tree
5. PatchFlag

**渲染器**

执行渲染函数得到的就是虚拟 DOM，也就是像这样的 JS 对象，里面包含着 UI 的描述信息

\`\`\`html
<div>点击</div>
\`\`\`

\`\`\`javascript
const vnode = {
  tag: "div",
  props: {
    onClick: () => alert("hello"),
  },
  children: "点击",
};
\`\`\`

渲染器拿到这个虚拟 DOM 后，就会将其转换为真实的 DOM

![](articles/nuogllindig6uo0w/1728722251574-d266c27a-f6ea-485f-8019-6c582aeadeb8.png)

一个简易版渲染器的实现思路：

1. 创建元素
2. 为元素添加属性和事件
3. 处理children

\`\`\`javascript
function renderer(vnode, container) {
  // 1. 创建元素
  const el = document.createElement(vnode.tag);
  // 2. 遍历 props，为元素添加属性
  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      // 如果 key 以 on 开头，说明它是事件
      el.addEventListener(
        key.substr(2).toLowerCase(), // 事件名称 onClick --->click
        vnode.props[key], // 事件处理函数
      );
    }
  }
  // 3. 处理children
  if (typeof vnode.children === "string") {
    el.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    // 递归的调用 renderer
    vnode.children.forEach((child) => renderer(child, el));
  }

  container.appendChild(el);
}
\`\`\`

**组件的本质**

组件本质就是**一组 DOM 元素**的封装。

假设函数代表一个组件：

\`\`\`javascript
// 这个函数就可以当作是一个组件
const MyComponent = function () {
  return {
    tag: "div",
    props: {
      onClick: () => alert("hello"),
    },
    children: "click me",
  };
};
\`\`\`

vnode 的 tag 就不再局限于 html 元素，而是可以写作这个函数名：

\`\`\`javascript
const vnode = {
  tag: MyComponent,
};
\`\`\`

渲染器需要新增针对这种 tag 类型的处理：

\`\`\`javascript
function renderer(vnode, container) {
  if (typeof vnode.tag === "string") {
    // 说明 vnode 描述的是标签元素
    mountElement(vnode, container);
  } else if (typeof vnode.tag === "function") {
    // 说明 vnode 描述的是组件
    mountComponent(vnode, container);
  }
}
\`\`\`

组件也可以使用对象的形式：

\`\`\`javascript
const MyComponent = {
  render() {
    return {
      tag: "div",
      props: {
        onClick: () => alert("hello"),
      },
      children: "click me",
    };
  },
};
\`\`\`

\`\`\`javascript
function renderer(vnode, container) {
  if (typeof vnode.tag === "string") {
    // 说明 vnode 描述的是标签元素
    mountElement(vnode, container);
  } else if (typeof vnode.tag === "object") {
    // 说明 vnode 描述的是组件
    mountComponent(vnode, container);
  }
}
\`\`\`

**响应式系统**

总结：当模板编译成的渲染函数执行时，渲染函数内部用到的响应式数据会和渲染函数本身构成依赖关系，之后只要响应式数据发生变化，渲染函数就会重新执行。

介绍一下 Vue3 内部的运行机制是怎样的？

Vue3 是一个声明式的框架。声明式的好处在于，它直接描述结果，用户不需要关注过程。Vue.js 采用模板的方式来描述 UI，但它同样支持使用虚拟 DOM 来描述 UI。**虚拟 DOM 要比模板更加灵活，但模板要比虚拟 DOM 更加直观**。

当用户使用模板来描述 UI 的时候，内部的 **编译器** 会将其编译为渲染函数，渲染函数执行后能够确定响应式数据和渲染函数之间的依赖关系，之后响应式数据一变化，渲染函数就会重新执行。

渲染函数执行的结果是得到虚拟 DOM，之后就需要 **渲染器** 来将虚拟 DOM 对象渲染为真实 DOM 元素。它的工作原理是，递归地遍历虚拟 DOM 对象，并调用原生 DOM API 来完成真实 DOM 的创建。渲染器的精髓在于后续的更新，它会通过 Diff 算法找出变更点，并且只会更新需要更新的内容。

编译器、渲染器、响应式系统都是 Vue 内部的核心模块，它们共同构成一个有机的整体，不同模块之间互相配合，进一步提升框架性能。

## computer

谈谈 computed 的机制，缓存了什么？

缓存的是上一次 getter 计算出来的值。

为什么 computed 不支持异步？

computed 属性在 Vue 中不支持异步操作的主要原因是设计上的理念和使用场景的考虑。computed 属性的初衷是用于计算并缓存一个基于响应式依赖的同步计算结果，当其依赖的响应式数据发生变化时，Vue 会自动重新计算 computed 的值，并将其缓存，以提高性能。

computed 不支持异步的几个具体原因：

缓存机制与同步计算：computed 属性的一个核心特性是缓存。当依赖的响应式数据没有变化时，computed 的计算结果会被缓存并直接返回，而不会重新执行计算。这种缓存机制是基于同步计算的，假如允许异步计算，那么在异步操作完成之前，computed 属性无法提供有效的返回值，这与它的同步缓存理念相违背。

数据一致性：computed 属性通常用于模板中的绑定，它的计算结果需要在渲染期间是稳定且可用的。如果 computed 支持异步操作，渲染过程中的数据可能不一致，会导致模板渲染时无法确定使用什么数据，从而可能造成视图的闪烁或数据错误。

调试与依赖追踪困难：如果 computed 属性是异步的，那么在调试和依赖追踪时就会变得非常复杂。异步操作的完成时间不确定，会使得依赖追踪的过程变得不直观，也难以预期。

如果需要进行异步操作，通常推荐使用 watch 来实现。

computer为什么不支持异步？

因为其实vue内部都是依靠effect函数去查找响应式数据的，这个过程是同步的，这个函数都是同步的，你异步的操作可能就会不起作用放到微队列里面执行。

如果要异步，就采用watch。

> 如果异步 随机数 就是有副作用的

## watch与computer对比

**computed**

- 作用：用于创建计算属性，依赖于 Vue 的响应式系统来做数据追踪。当依赖的数据发生变化时，会自动重新计算。
- 无副作用：计算属性内部的计算应当是没有副作用的，也就是说仅仅基于数据做二次计算。
- 缓存：计算属性具备缓存机制，如果响应式数据没变，每次获取计算属性时，内部直接返回的是上一次计算值。
- 用处：通常用于模板当中，以便在模板中显示二次计算后的结构。
- 同步：计算属性的一个核心特性是缓存，而这种缓存机制是基于同步计算的，假如允许异步计算，那么在异步操作完成之前，计算属性无法提供有效的返回值，这与它的缓存设计理念相违背。

**watch**

- 作用：用于监听数据的变化，可以监听一个或者多个数据，当数据发生改变时，执行一些用户指定的操作。
- 副作用：监听器中的回调函数可以执行副作用操作，例如发送网络请求、手动操作 DOM 等。
- 无缓存：监听器中的回调函数执行结果不会被缓存，也没办法缓存，因为不知道用户究竟要执行什么操作，有可能是包含副作用的操作，有可能是不包含副作用的操作。
- 用处：常用于响应式数据发生变化后，重新发送网络请求，或者修改 DOM 元素等场景。
- 支持异步：在监听到响应式数据发生变化后，可以进行同步或者异步的操作。

## 指令的本质

v-if会放入三目运算符

v-bind和使用$id绑定动态属性

v-on去编写方法

![](articles/nuogllindig6uo0w/1732871685182-63e862da-5f82-471f-89bf-32347ccabc06.png)

## 插槽的本质

当父组件向子组件去传递插槽的时候，实际上传递的是一个对象；每传一个插槽，就相等于是传了一个key/value(key是插槽名，value是一个render函数)，调用可以得到虚拟dom

> 父组件->子组件传递
>
> function的参数是子组件传递给父组件，父组件等于说利用这个数据又写了一个render函数传递给了子组件，子组件来运行渲染模板

![](articles/nuogllindig6uo0w/1725434969384-28d99bdc-13ed-49b8-a53d-26d704090799.png)

每个属性的值是一个函数，虚拟节点是这个函数的返回结果

作用域插槽相等于传了一个参数

当我们使用插槽的时候相等于是在调用函数，一调用函数就拿到一个虚拟节点，如果函数有参数，那么需要使用的时候定义(传)

传进来的slots就是一个对象

> 子组件可以拿到插槽对象

![](articles/nuogllindig6uo0w/1725435165565-577b95ae-4221-4415-9d78-ed909fcc0739.png)

### 作用域插槽

<font style="color:rgb(33, 53, 71);">在某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据。要做到这一点，我们需要一种方法来让子组件在渲染时将一部分数据提供给插槽。</font>

\`\`\`plain
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
\`\`\`

<font style="color:rgb(33, 53, 71);">当需要接收插槽 props 时，默认插槽和具名插槽的使用方式有一些小区别。下面我们将先展示默认插槽如何接受 props，通过子组件标签上的 </font>v-slot<font style="color:rgb(33, 53, 71);"> 指令，直接接收到了一个插槽 props 对象：</font>

\`\`\`plain
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
\`\`\`

![](https://cdn.nlark.com/yuque/0/2024/svg/22718987/1707197205348-ed185c74-7343-4b4d-ac13-d51d698d8feb.svg)

## v-model本质

v-model的用法，总结起来就是两个场景：

1.表单元素和响应式数据双向绑定

2.父子组件传递数据

无论哪种情况v-model都是一种语法糖，他实际表示了传递一个属性和一个方法

在表单情况下，表示是根据绑定表单的内容来确定

在组件情况下

一个名为 modelValue 的 prop，本地 ref 的值与其同步；

一个名为 update:modelValue 的事件，当本地 ref 的值发生变更时触发。

## keep-alive本质

keep-alive

\`\`\`vue
const KeepAlive = { // 这是 keepalive 组件独有的属性，用于标识这是一个 keepalive
组件 __isKeepAlive: true, setup(props, { slots }) { // 这是一个缓存对象 //
key：vnode.type // value: vnode const cache = new Map() // 存储当前 keepalive
组件的实例 const instance = currentInstance; //
这里从组件实例上面解构出来两个方法，这两个方法实际上是由渲染器注入的 const {
move, createElement } = instance.keepAliveCtx; // 创建隐藏容器 const
storageContainer = createElement("div"); //
这两个方法所做的事情，就是将组件从页面和隐藏容器之间进行移动 //
这两个方法在渲染器中会被调用 instance._deActivate = (vnode) => { move(vnode,
storageContainer); }; instance._activate = (vnode, container, anchor) => {
move(vnode, container, anchor); }; return () => { // 获取到默认插槽里面的内容
let rawVNode = slots.default(); //
如果不是对象，说明是非组件的虚拟节点，直接返回 if (typeof rawVNode.type !==
"object") { return rawVNode; } //
接下来我们从缓存里面找一下，看当前的组件是否存在于缓存里面 const cachedVNode =
cache.get(rawVNode.type); if (cachedVNode) { // 缓存中存在 //
如果缓存中存在，直接使用缓存的组件实例 rawVNode.component =
cachedVNode.component; // 并且挂上一个 keptAlive 属性 rawVNode.keptAlive = true;
} else { // 缓存中不存在 // 那么就添加到缓存里面，方便下次使用
cache.set(rawVNode.type, rawVNode); } // 接下来又挂了一个 shouldKeepAlive 属性
rawVNode.shouldKeepAlive = true; // 将 keepalive 组件实例也添加到 vnode
上面，后面在渲染器中有用 rawVNode.keepAliveInstance = instance; return rawVNode;
}; }, };
\`\`\`

渲染器内部

- keptAlive：标识内部组件已经被缓存了，这样当内部组件需要重新渲染的时候，渲染器并不会重新挂载它，而是将其激活。

\`\`\`javascript
// 渲染器内部代码片段
function patch(n1, n2, container, anchor) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1);
    n1 = null;
  }

  const { type } = n2;

  if (typeof type === "string") {
    // 省略部分代码
  } else if (type === Text) {
    // 省略部分代码
  } else if (type === Fragment) {
    // 省略部分代码
  } else if (typeof type === "object" || typeof type === "function") {
    // component
    if (!n1) {
      // 如果该组件已经被 KeepAlive，则不会重新挂载它，而是会调用_activate 来激活它
      if (n2.keptAlive) {
        n2.keepAliveInstance._activate(n2, container, anchor);
      } else {
        mountComponent(n2, container, anchor);
      }
    } else {
      patchComponent(n1, n2, anchor);
    }
  }
}
\`\`\`

- shouldKeepAlive：该属性会被添加到 vnode 上面，这样当渲染器卸载内部组件的时候，不会真正的去卸载，而是将其移动到隐藏的容器里面

\`\`\`plain
// 渲染器代码片段
function unmount(vnode) {
  if (vnode.type === Fragment) {
    vnode.children.forEach((c) => unmount(c));
    return;
  } else if (typeof vnode.type === "object") {
    // vnode.shouldKeepAlive 是一个布尔值，用来标识该组件是否应该 KeepAlive
    if (vnode.shouldKeepAlive) {
      // 对于需要被 KeepAlive 的组件，我们不应该真的卸载它，而应调该组件的父组件，
      // 即 KeepAlive 组件的 _deActivate 函数使其失活
      vnode.keepAliveInstance._deActivate(vnode);
    } else {
      unmount(vnode.component.subTree);
    }
    return;
  }
  const parent = vnode.el.parentNode;
  if (parent) {
    parent.removeChild(vnode.el);
  }
}
\`\`\`

- keepAliveInstance：该属性让内部组件持有了 KeepAlive 的组件实例，回头在渲染器中的某些场景下可以通过该属性来访问 KeepAlive 组件实例上面的 /_deActivate 以及 /_activate。

## key的作用

key就是每一个节点的身份证号，唯一

不要用下标作为key，因为可能会修改顺序

1. **高效的更新：** key 帮助 Vue 识别哪些元素是变化的、哪些是新的、哪些是需要被移除的。
   - 在没有 key 的情况下，Vue 会尽量复用已有元素，而不管它们的实际内容是否发生了变化，这可能导致不必要的更新或者错误的更新。
   - 通过使用 key，Vue 可以准确地知道哪些元素发生了变化，从而高效地更新 DOM。
2. **确保元素的唯一性：** key 属性需要是唯一的，这样每个元素在列表中都可以被唯一标识。这避免了在元素移动、插入或删除时出现混淆，确保 Vue 可以正确地追踪每个元素。
3. **提升渲染性能：** 使用 key 可以显著提升列表渲染的性能。因为 Vue 能通过 key 快速定位到需要更新的元素，而不是重新渲染整个列表。尤其在处理大型列表时，使用 key 可以避免大量不必要的 DOM 操作，提升应用的响应速度。

# vue2与vue3差异

### 构造方式差异

vue3要挂载的东西放入实例，而不是全局的原型方法，这样可以不影响全局

\`\`\`javascript
import { createApp } from "vue"; //不会默认导出vue来让你做构造函数
import App from "./App.vue";
import "./index.css";

// vue2
// const app = new Vue(options)
// Vue.use() //这样使用会影响全局
// app.$mount("#app")

// vue3
// 不存在构造函数Vue
// const app = createApp(App); //传入根组件
// app.mount("#app");
createApp(App).mount("#app");
\`\`\`

组件实例中的API

ctrateApp返回的是一个组件应用，而不是组件实例

在vue3中，组件实例是一个Proxy，它仅提供了下列成员，功能和vue2一样

vue2中，一个组件里使用created生命周期打印this，返回的是组件实例

vue3中，打印this，返回的是一个proxy，他里面只会给你你要用到的东西

为什么vue3中去掉了vue构造函数？

vue2的全局构造函数带来了诸多问题：

1. 调用构造函数的静态方法会对所有vue应用生效，不利于隔离不同应用
2. vue2的构造函数集成了太多功能，不利于tree shaking，vue3把这些功能使用普通函数导出，能够充分利用tree shaking优化打包体积

> tree shaking：引入一个vue，比如采用了createApp函数，那打包的时候就把用到的createApp函数打包进入结果里面，没有用到的就不进行打包

3. vue2没有把组件实例和vue应用两个概念区分开，在vue2中，通过new Vue创建的对象，既是一个vue应用，同时又是一个特殊的vue组件。vue3中，把两个概念区别开来，通过createApp创建的对象，是一个vue应用，它内部提供的方法是针对整个应用的，而不再是一个特殊的组件。

### 组件实例代理和数据响应式代理(proxy)

**响应式数据在beforeCreate之后,Create之前完成**

vue2和vue3均在相同的生命周期完成数据响应式，但做法不一样

![](articles/nuogllindig6uo0w/1717902983310-69e00e0d-d850-4e0d-8917-f07dea3bb8ef.png)

vue2循环遍历，非常暴力，效率低，而且后面再加一个属性，没法再去监听

vue3采用proxy，所有属性动态代理，用到的时候才会去运行get和set函数，如果访问的是一个对象，那会给你返回一个新的代理

![](https://cdn.nlark.com/yuque/0/2023/jpeg/22718987/1697202828052-669af539-32fe-4e65-905e-c8c48535f52c.jpeg)

在使用<font style="color:rgb(33, 53, 71);">选项式 API 的时候，vue3打印this会发生是一个代理对象</font>

![](https://cdn.nlark.com/yuque/0/2024/jpeg/22718987/1717415783549-0dab14f8-56ee-4f66-a9e6-8a4fe55b7c75.jpeg)

> 在模板(template)中使用响应式数据不用.value（vue做了特殊处理）
>
> 在scrpit中使用响应式数据需要.value

vue3数据响应式

vue3不再使用Object.defineProperty的方式定义完成数据响应式，而是使用Proxy。

除了Proxy本身效率比Object.defineProperty更高之外，由于不必递归遍历所有属性，而是直接得到一个Proxy。所以在vue3中，对数据的访问是动态的，当访问某个属性的时候，再动态的获取和设置，这就极大的提升了在组件初始阶段的效率。(没有了this.$set()之类的操作，因为vue3已经不需要了)

同时，由于Proxy可以监控到成员的新增和删除，因此，在vue3中新增成员、删除成员、索引访问等均可以触发重新渲染，而这些在vue2中是难以做到的。

相比较 Vue2，Vue3 在响应式的实现方面有这么一些方面的改变：

1. 数据拦截从 Object.defineProperty 改为了 Proxy + Object.defineProperty 的拦截方式，其中
   - ref：使用 ObjectdefineProperty + Proxy 方式
   - reactive：使用 Proxy 方式
2. 创建响应式数据在语法层面有了变化：
   - Vue2: 通过 data 来创建响应式数据
   - Vue3: 通过 ref、reactvie 等方法来创建响应式数据
3. 依赖收集上面的变化
   - Vue2：Watcher + Dep
   - Vue3：WeakMap + Map + Set
   - 这种实现方式可以实现更细粒度的依赖追踪和更新控制

### 生命周期函数

| vue2 option api | vue3 option api       | vue 3 composition api           |
| --------------- | --------------------- | ------------------------------- |
| beforeCreate    | beforeCreate          | 不再需要，代码可直接置于setup中 |
| created         | created               | 不再需要，代码可直接置于setup中 |
| beforeMount     | beforeMount           | onBeforeMount                   |
| mounted         | mounted               | onMounted                       |
| beforeUpdate    | beforeUpdate          | onBeforeUpdate                  |
| updated         | updated               | onUpdated                       |
| beforeDestroy   | ==改== beforeUnmount  | onBeforeUnmount                 |
| destroyed       | ==改==unmounted       | onUnmounted                     |
| errorCaptured   | errorCaptured         | onErrorCaptured                 |
| -               | ==新==renderTracked   | onRenderTracked                 |
| -               | ==新==renderTriggered | onRenderTriggered               |

新增钩子函数说明：

| 钩子函数        | 参数          | 执行时机                       |
| --------------- | ------------- | ------------------------------ |
| renderTracked   | DebuggerEvent | 渲染dom收集到的每一次依赖时    |
| renderTriggered | DebuggerEvent | 某个依赖变化导致组件重新渲染时 |

DebuggerEvent:

- target: 跟踪或触发渲染的对象
- key: 跟踪或触发渲染的属性
- type: 跟踪或触发渲染的方式

### diff算法不同

### 效率提升

#### 静态提升

提升静态节点

一个dom或者节点是不是响应式的，在编译成render函数的时候就应该知道了，所以假如一个节点不是动态的，那就可以把createVNode这个函数的返回值提升到外面，因为他永远不会改变，所以就没有必要在重新运行render函数的时候重新运行

\`\`\`typescript
// vue2 的静态节点
render(){
  createVNode("h1", null, "Hello World")
  // ...
}

// vue3 的静态节点
const hoisted = createVNode("h1", null, "Hello World")
function render(){
  return hoisted;
  // 直接使用 hoisted 即可
}
\`\`\`

静态属性提升，同理如上

\`\`\`typescript
<div class="user">
  {{user.name}}
</div>
const hoisted = { class: "user" }

function render(){
  createVNode("div", hoisted, user.name)
  // ...
}
\`\`\`

#### 预字符串化

\`\`\`html
<div class="menu-bar-container">
  <div class="logo">
    <h1>logo</h1>
  </div>
  <ul class="nav">
    <li><a href="">menu</a></li>
    <li><a href="">menu</a></li>
    <li><a href="">menu</a></li>
    <li><a href="">menu</a></li>
    <li><a href="">menu</a></li>
  </ul>
  <div class="user">
    <span>{{ user.name }}</span>
  </div>
</div>
\`\`\`

**当编译器遇到大量连续的静态内容，会直接将其编译为一个普通字符串节点，连续20个节点会进行预字符串化**

\`\`\`plain
const _hoisted_2 = _createStaticVNode("<div class=/"logo/"><h1>logo</h1></div><ul class=/"nav/"><li><a href=/"/">menu</a></li><li><a href=/"/">menu</a></li><li><a href=/"/">menu</a></li><li><a href=/"/">menu</a></li><li><a href=/"/">menu</a></li></ul>")
\`\`\`

![](articles/nuogllindig6uo0w/1717900362800-e5ea37a6-b24a-4888-b96e-236abe622417.png)

道理如上，还是因为静态节点数据不会改变，所以可以把多个静态节点合并成为一个静态节点

#### 缓存事件处理函数

\`\`\`html
<button @click="count++">plus</button>
\`\`\`

\`\`\`plain
// vue2
render(ctx){
  return createVNode("button", {
    onClick: function($event){
      ctx.count++;
    }
  })
}

// vue3
render(ctx, _cache){
  return createVNode("button", {
    onClick: cache[0] || (cache[0] = ($event) => (ctx.count++))
  })
}
\`\`\`

同理，因为click事件的内容是不变，所以也可以做缓存

#### Block Tree

vue2在对比新旧树的时候，并不知道哪些节点是静态的，哪些是动态的，因此只能一层一层比较，这就浪费了大部分时间在比对静态节点上

\`\`\`html
<form>
  <div>
    <label>账号：</label>
    <input v-model="user.loginId" />
  </div>
  <div>
    <label>密码：</label>
    <input v-model="user.loginPwd" />
  </div>
</form>
\`\`\`

![](articles/nuogllindig6uo0w/1717900942067-83ac5bd2-b12c-4983-832d-90abca6331b6.png)

进行差异改变的时候，还是利用了静态节点不会改变的道理，只比较动态的节点进行更新，createVNode的时候，如果是动态节点会多传入一个参数来进行标记。

他会把所有的动态节点变成一个block数组，到时候更新的时候只去对比block数组来进行更新，当然如果数组不稳定增加或者减少的时候，就会拆开blcok（递归），进行一块一块的block进行对比

#### PatchFlag

vue2在对比每一个节点时，并不知道这个节点哪些相关信息会发生变化，因此只能将所有信息依次比对

\`\`\`html
<div class="user" data-id="1" title="user name">{{user.name}}</div>
\`\`\`

![](articles/nuogllindig6uo0w/1717901439260-af283b13-0050-4371-b326-e6b4264b8f85.png)

在使用createVNode创建的时候，如果一个节点是动态的，他不仅是标记是动态，还会标记节点的哪一个属性是动态的，到时候只对比这一个节点的一个或几个属性

### <font style="color:rgb(33, 53, 71);">组合式 API (Composition API)</font>

![](https://cdn.nlark.com/yuque/0/2023/jpeg/22718987/1697202657324-28292b47-2f3f-4306-b1b0-06f6f23818e8.jpeg)

让同种功能的代码写在一起。高内聚，低耦合，同时还可以把模块提出去，复用/拆分等。

功能多，项目大的时候就建议用这种方式去书写代码

#### setup

由于vue作者知道你要在setup用到各种各样的api来完成功能，vue就提供了各种各样的具名函数，同时setup连导入都不需要，就可以直接引入使用

\`\`\`vue
import { ref } from "vue"; //通过这样就把代码提出去了 function useCount() { let
countRef = ref(0); const increase = () => { countRef.value++; }; const decrease
= () => { countRef.value--; }; return { countRef, increase, decrease, }; }
export default { setup() { // console.log("所有生命周期钩子函数之前调用"); //
console.log(this); // this -> undefined // setup中，count是一个对象 //
实例代理中，count是一个count.value //setup里this不能用，也没法得到组件实例
//但在setup里返回的东西会附着到组件实例中去(包括数据和方法，模板中就可使用 let
count = ref(0)
//这时候的count被封装成对象，由于采用了代理的方式（响应式数据也采用代理），
这时候在模板里通过组件实例去访问的时候会自己给你加上.value(模板是实例环境，在setup
里都不存在this.没有实例，所以访问的时候必须带上.value return { ...useCount(), };
}, };
\`\`\`

composition api相比于option api有哪些优势？

> 从两个方面回答：
>
> 1. 为了更好的逻辑复用和代码组织
> 2. 更好的类型推导

有了composition api，配合reactivity api，可以在组件内部进行更加细粒度的控制，使得组件中不同的功能高度聚合，提升了代码的可维护性。对于不同组件的相同功能，也能够更好的复用。

相比于option api，composition api中没有了指向奇怪的this，所有的api变得更加函数式，这有利于和类型推断系统比如TS深度配合。

### v-model

vue2提供了两种双向绑定：v-model和.sync，在vue3中，去掉了.sync修饰符，只需要使用v-model进行双向绑定即可。

不加参数的v-model相等于是v-model:modelValue

\`\`\`html
<!-- vue3 -->
<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
<!-- 简写为 -->
<ChildComponent v-model="pageTitle" />

<!-- vue3 -->
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
<!-- 简写为 -->
<ChildComponent v-model:title="pageTitle" />
\`\`\`

v-model可以绑定修饰符，但功能需要自己实现

### v-if v-for

vue3里面 v-if 的优先级高于 v-for

如果需要并行使用，可以先使用computed方法

### key

- 当使用<template>进行v-for循环时，需要把key值放到<template>中，而不是它的子元素中
- 当使用v-if v-else-if v-else分支的时候，不再需要指定key值，因为vue3会自动给予每个分支一个唯一的key

即便要手工给予key值，也必须给予每个分支唯一的key，**不能因为要重用分支而给予相同的 key**

### 组件可以有多个根组件

vue2只能有一个<template></template>

vue3没有限制

# vue2响应式原理

**响应式数据的最终目标**，是当对象本身或对象属性发生变化时，将会运行一些函数(做一些事)，最常见的就是render函数。

![](articles/nuogllindig6uo0w/1727185891202-cd26be7c-1861-4823-99fb-f38d57b0a5dc.png)

1.把数据通过Object.defineProperty()遍历对象的每一个属性(变成get和set,读取属性的时候运行get,设置属性的时候运行set)

2.在render函数(模版)中可能用到了响应式的数据，一旦读取了响应式的数据，就会运行get函数，有一个东西叫Watcher就会记录下来有一个render函数他用到这个响应式的数据（依赖收集）

3.将来有一天他用到的这个响应式的数据重新赋值了（运行set函数），就会去通知Watcher（派发更新）

4.Watcher会重新触发执行依赖这个响应式数据的函数

在具体实现上，vue用到了**几个核心部件**：

1. Observer
2. Dep
3. Watcher
4. Scheduler

## Observer

Observer要实现的目标非常简单，就是把一个普通的对象转换为响应式的对象

为了实现这一点，Observer把对象的每个属性通过\`Object.defineProperty\`转换为带有\`getter\`和\`setter\`的属性，这样一来，当访问或设置属性时，\`vue\`就有机会做一些别的事情。

![](articles/nuogllindig6uo0w/1727185602475-06263270-3160-4def-9598-9f420f56f8ee.png)

Observer是vue内部的构造器，我们可以通过Vue提供的静态方法\`Vue.observable( object )\`间接的使用该功能。

在组件生命周期中，这件事发生在\`beforeCreate\`之后，\`created\`之前。

具体实现上，它会递归遍历对象的所有属性，以完成深度的属性转换。

由于遍历时只能遍历到对象的当前属性，因此无法监测到将来动态增加或删除的属性，因此\`vue\`提供了\`$set\`和\`$delete\`两个实例方法，让开发者通过这两个实例方法对已有响应式对象添加或删除属性。

对于数组，\`vue\`会更改它的隐式原型，之所以这样做，是因为vue需要监听那些可能改变数组内容的方法

![](articles/nuogllindig6uo0w/1727185602437-d8bd96f9-0cc7-40aa-8bc9-13a8fdc25bf6.png)

总之，Observer的目标，就是要让一个对象，它属性的读取、赋值，内部数组的变化都要能够被vue感知到。

## Dep

这里有两个问题没解决，就是读取属性时要做什么事，而属性变化时要做什么事，这个问题需要依靠Dep来解决。

Dep的含义是\`Dependency\`，表示依赖的意思。

\`Vue\`会为响应式对象中的每个属性、对象本身、数组本身创建一个\`Dep\`实例。

![](articles/nuogllindig6uo0w/1727229901277-ed50602b-222a-4c75-8993-7a344d73f511.png)

> 比如把一个对象变成响应式后，他会创建这么多个dep实例
>
> 当在对象中增加或者删除是触发外层对象的dep

每个\`Dep\`实例都有能力做以下两件事：

- 记录依赖：是谁在用我（从watcher里面拿依赖人）
- 派发更新：我变了，我要通知那些用到我的人(通知所有Watcher依赖人)

当读取响应式对象的某个属性时，它会进行依赖收集：有人用到了我

当改变某个属性时，它会派发更新：那些用我的人听好了，我变了

![](articles/nuogllindig6uo0w/1727185602765-9bb93e7d-579d-4ea2-8b62-11091ae84733.png)

在进行dep.depend()的时候，他可以检查全局变量知道是哪个函数在运行我

## Watcher

这里又出现一个问题，就是Dep如何知道是谁在用我？

要解决这个问题，需要依靠另一个东西，就是Watcher。

当某个函数执行的过程中，用到了响应式数据，响应式数据是无法知道是哪个函数在用自己的

因此，vue通过一种巧妙的办法来解决这个问题

我们不要直接执行函数，而是把函数交给一个叫做watcher的东西去执行，watcher是一个对象，每个这样的函数执行时都应该创建一个watcher，通过watcher去执行

> 比如说render函数里用到obj.a，obj.a是响应式的，obj.a运行的get函数是无法知道是谁在调用他的,所以需要Watcher

**watcher会设置一个全局变量，让全局变量记录当前负责执行的watcher等于自己，然后再去执行函数，在函数的执行过程中，如果发生了依赖记录**\`**dep.depend()**\`**，那么**\`**Dep**\`**就会把这个全局变量记录下来，表示：有一个watcher用到了我这个属性**

当Dep进行派发更新时，它会通知之前记录的所有watcher：我变了

![](articles/nuogllindig6uo0w/1727185602453-651c03aa-63d2-4e22-a126-f1c1d5dcc660.png)

每一个\`vue\`组件实例，都至少对应一个\`watcher\`，该\`watcher\`中记录了该组件的\`render\`函数。

> Watcher就是要重新运行的函数

\`watcher\`首先会把\`render\`函数运行一次以收集依赖，于是那些在render中用到的响应式数据就会记录这个watcher。

当数据变化时，dep就会通知该watcher，而watcher将重新运行render函数，从而让界面重新渲染同时重新记录当前的依赖。

## Scheduler

现在还剩下最后一个问题，就是Dep通知watcher之后，如果watcher执行重运行对应的函数，就有可能导致函数频繁运行，从而导致效率低下

试想，如果一个交给watcher的函数，它里面用到了属性a、b、c、d，那么a、b、c、d属性都会记录依赖，于是下面的代码将触发4次更新：

\`\`\`javascript
state.a = "new data";
state.b = "new data";
state.c = "new data";
state.d = "new data";
\`\`\`

这样显然是不合适的，因此，watcher收到派发更新的通知后，实际上不是立即执行对应函数，而是把自己交给一个叫调度器的东西

调度器维护一个执行队列，该队列同一个watcher仅会存在一次，队列中的watcher不是立即执行，它会通过一个叫做\`nextTick\`的工具方法，把这些需要执行的watcher放入到事件循环的微队列中，nextTick的具体做法是通过\`Promise\`完成的

> nextTick 通过 \`this.$nextTick\` 暴露给开发者
>
> nextTick 的具体处理方式见：[https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)

也就是说，当响应式数据变化时，\`render\`函数的执行是异步的，并且在微队列中

## 总体流程

![](articles/nuogllindig6uo0w/1745833611678-3d97d2c9-af1d-4ea9-a6ef-7c5d1c93e3be.png)

1.原始对象交给observer,把他变成响应式对象，拥有get和set

2.当有一个函数要执行(比如render函数)，他不是直接执行，而是交给Watcher来执行(Watcher会先设置一个全局变量，然后再运行这个函数)，由于render函数里面用到了响应式的数据，于是这些属性就会收集起来【dep来收集数据属性的依赖函数，通过Watcher设置的全局变量(依赖收集)和当数据变化的时候去通知哪些Watcher(派发更新)】

3.当数据改变的时候他不是立即去执行这个函数而是交给Scheduler(调度器)，把他放入微队列异步执行

4.当运行render函数以后又会用到响应式数据，重新收集依赖，当数据变化后重新走这个流程

#
`;export{n as default};
