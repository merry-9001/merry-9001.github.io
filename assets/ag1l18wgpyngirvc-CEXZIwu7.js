const n=`---
title: vue源码
urlname: ag1l18wgpyngirvc
date: 2024-09-22 14:02:48 +0800
tags: []
description: 源码分类运行时（runtime）：虚拟dom，dom
  diff，h函数创建虚拟dom编译时（building）：AST模版-&gt;render函数响应式：双向数据绑定调试源码https://github.com/vuejs/corepnpm
  i 安装在packages\\vue\\examples下就...
image: ''
categories: []
---

## 源码分类

运行时（runtime）：虚拟dom，dom diff，h函数创建虚拟dom

编译时（building）：AST模版->render函数

响应式：双向数据绑定

## 调试源码

[https://github.com/vuejs/core](https://github.com/vuejs/core)

pnpm i 安装

在packages\\vue\\examples下就是各种测试文件

需要先执行pnpm run build 生成/dist/vue.global.js

\`\`\`bash
"build": "node scripts/build.js",

//增加sourceMap 调试的时候更好的查看源码，浏览器中也需要开启
"build": "node scripts/build.js -s",
\`\`\`

## 学习源码前置知识点

proxy

\`\`\`javascript
let product = {
  price: 10,
  quantity: 2,
};

const proxyProduct = new Proxy(product, {
  //target：原始对象--->product
  //key：属性key
  //newVal: 属性value
  //receiver: 代理对象---->proxyProduct
  set(target, key, newVal, receiver) {
    console.log("我运行了");
    target[key] = newVal;
    return true;
  },
  get(target, key, receiver) {
    return target[key];
  },
});

//修改原始对象product的值会影响到proxyProduct的值，但不会触发handler对象的方法
product.quantity = 3;

//修改代理对象proxyProduct的值会影响到proxy的值，同时会触发handler对象的方法
proxyProduct.quantity = 4;
\`\`\`

Reflect.get(target,key,receiver)：去读取target对象的key属性；如果target对象中指定了getter，receiver则为getter调用时的this值

> 使用target.a和Reflect.get(target,'a')的区别：
>
> Reflect是一个函数，当执行函数的时候，底层就可以做一些事情，比如防止报错、边界判断、修改this指向等。

\`\`\`javascript
const obj = {
  name: "张三",
};

console.log(obj.name); // 张三
console.log(Reflect.get(obj, "name")); // 张三
\`\`\`

receiver应用一：

\`\`\`javascript
const p1 = {
  lastName: "张",
  firstName: "三",
  // 通过 get 标识符标记，可以让方法的调用像属性的调用一样
  get fullName() {
    return this.lastName + this.firstName;
  },
};

const p2 = {
  lastName: "李",
  firstName: "四",
  // 通过 get 标识符标记，可以让方法的调用像属性的调用一样
  get fullName() {
    return this.lastName + this.firstName;
  },
};
console.log(p1.fullName); // 张三
console.log(Reflect.get(p1, "fullName")); // 张三
// 第三个参数 receiver 在对象指定了 getter 时表示为 this
console.log(Reflect.get(p1, "fullName", p2)); // 李四
\`\`\`

receiver应用二：

\`\`\`javascript
const p1 = {
  lastName: "张",
  firstName: "三",
  // 通过 get 标识符标记，可以让方法的调用像属性的调用一样
  get fullName() {
    return this.lastName + this.firstName;
  },
};

const proxy = new Proxy(p1, {
  // target：被代理对象(原始对象)
  // receiver：代理对象
  get(target, key, receiver) {
    console.log("触发了 getter");
    return target[key];
  },
});

//get只会触发1次，因为target是原始对象，他的访问不会再走代理
console.log(proxy.fullName);

const proxy = new Proxy(p1, {
  // target：被代理对象(原始对象)
  // receiver：代理对象
  get(target, key, receiver) {
    console.log("触发了 getter");
    // return target[key]
    return Reflect.get(target, key, receiver);
  },
});

//get只会触发3次，因为Reflect的第三个参数是receiver，相等于是代理的对象，所以后续的访问还会再走代理
console.log(proxy.fullName);
\`\`\`

## 响应式源码数据结构

1.缓存proxy(weakMap)

key：原始对象

value：代理后的proxy对象

2.依赖收集与派发更新（weakMap）

key：原始对象

value：Map结构

key：原始对象的某一个属性

value：数组(set)，一个一个的依赖收集的函数（类实例）

> 调用\\_effect.run()去执行函数

## 响应式源码

reactive.ts

\`\`\`javascript
import { mutableHandlers } from './baseHandlers';
export const reactiveMap = new WeakMap<object, any>();

// 创建响应性对象

function createReactiveObject(
  target: object,
  baseHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<object, any>
) {
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy(target, baseHandlers);
  // 缓存代理对象
  proxyMap.set(target, proxy);
  return proxy;
}

export function reactive(target: object) {
  return createReactiveObject(target, mutableHandlers, reactiveMap);
}
\`\`\`

utils

\`\`\`javascript
// 提供工具方法的文件

/**
 * 判断是否是对象
 * @param {*} target 要判断的值
 * @returns
 */
export function isObject(target) {
  return typeof target === "object" && target !== null;
}

/**
 * 判断值是否改变
 * @param {*} oldValue
 * @param {*} newValue
 * @returns
 */
export function hasChanged(oldValue, newValue) {
  // 使用该方法可以规避一些特殊的情况
  // NaN === NaN 在 JS 中是 false，Object.is 返回的是 true
  // +0 === -0 在 JS 中是 true，Object.is 返回的是 false
  return !Object.is(oldValue, newValue);
}

/**
 * 收集依赖的操作类型
 */
export const TrackOpTypes = {
  GET: "get",
  HAS: "has",
  ITERATE: "iterate",
};

/**
 * 触发器的操作类型
 */
export const TriggerOpTypes = {
  SET: "set",
  ADD: "add",
  DELETE: "delete",
};

/**
 * 这是一个特殊标识
 */
export const RAW = Symbol("raw");

export const ITERATE_KEY = Symbol("iterate");
\`\`\`

effect

\`\`\`javascript
/**
 * 用于记录当前活动的 effect
 */
export let activeEffect = undefined;
export const targetMap = new WeakMap(); // 用来存储对象和其属性的依赖关系
const effectStack = [];

/**
 * 该函数的作用，是执行传入的函数，并且在执行的过程中，收集依赖
 * @param {*} fn 要执行的函数
 */
export function effect(fn, options = {}) {
  const { lazy = false } = options;
  const environment = () => {
    try {
      activeEffect = environment;
      effectStack.push(environment);
      cleanup(environment);
      return fn();
    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1];
    }
  };
  environment.deps = [];
  environment.options = options;
  if (!lazy) {
    environment();
  }
  return environment;
}

export function cleanup(environment) {
  let deps = environment.deps; // 拿到当前环境函数的依赖（是个数组）
  if (deps.length) {
    deps.forEach((dep) => {
      dep.delete(environment);
    });
    deps.length = 0;
  }
}
\`\`\`

track

\`\`\`javascript
import { TrackOpTypes, ITERATE_KEY } from "../utils.js";
import { activeEffect, targetMap } from "./effect.js";

let shouldTrack = true; // 控制是否需要进行依赖收集的开关

/**
 * 暂停依赖收集
 */
export function pauseTracking() {
  shouldTrack = false;
}

/**
 * 恢复依赖收集
 */
export function resumeTracking() {
  shouldTrack = true;
}

/**
 * 收集器：用于收集依赖
 * @param {*} target 原始对象
 * @param {*} type 进行的操作类型
 * @param {*} key 针对哪一个属性
 */
export default function (target, type, key) {
  // 先进行开关状态的判断
  if (!shouldTrack || !activeEffect) {
    return;
  }

  // 这里要做的事情其实很简单，就是一层一层的去找，找到了就存储
  let propMap = targetMap.get(target);
  if (!propMap) {
    propMap = new Map();
    targetMap.set(target, propMap);
  }

  // 之前如果是遍历所有的属性， key 会是 undefined
  // 所以对 key 值做一下参数归一化
  if (type === TrackOpTypes.ITERATE) {
    key = ITERATE_KEY;
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
\`\`\`

trigger

\`\`\`javascript
// 这是触发器
import { TriggerOpTypes, TrackOpTypes, ITERATE_KEY } from "../utils.js";
import { targetMap, activeEffect } from "./effect.js";

// 定义修改数据和触发数据的映射关系
const triggerTypeMap = {
  [TriggerOpTypes.SET]: [TrackOpTypes.GET],
  [TriggerOpTypes.ADD]: [
    TrackOpTypes.GET,
    TrackOpTypes.ITERATE,
    TrackOpTypes.HAS,
  ],
  [TriggerOpTypes.DELETE]: [
    TrackOpTypes.GET,
    TrackOpTypes.ITERATE,
    TrackOpTypes.HAS,
  ],
};

/**
 * 触发器
 * @param {*} target 原始对象
 * @param {*} type 操作的类型
 * @param {*} key 操作的属性
 */
export default function (target, type, key) {
  // 要做的事情很简单，就是找到依赖，然后执行依赖
  const effectFns = getEffectFns(target, type, key);
  if (!effectFns) return;
  for (const effectFn of effectFns) {
    if (effectFn === activeEffect) continue;
    if (effectFn.options && effectFn.options.shcheduler) {
      // 说明用户传递了回调函数，用户期望自己来处理依赖的函数
      effectFn.options.shcheduler(effectFn);
    } else {
      // 执行依赖函数
      effectFn();
    }
  }
}

/**
 * 根据 target、type、key 这些信息找到对应的依赖函数集合
 * @param {*} target
 * @param {*} type
 * @param {*} key
 */
function getEffectFns(target, type, key) {
  const propMap = targetMap.get(target);
  if (!propMap) return;

  // 如果是新增或者删除操作，会涉及到额外触发迭代
  const keys = [key];
  if (type === TriggerOpTypes.ADD || type === TriggerOpTypes.DELETE) {
    keys.push(ITERATE_KEY);
  }

  const effectFns = new Set(); // 用于存储依赖的函数

  for (const key of keys) {
    const typeMap = propMap.get(key);
    if (!typeMap) continue;

    const trackTypes = triggerTypeMap[type];
    for (const trackType of trackTypes) {
      const dep = typeMap.get(trackType);
      if (!dep) continue;
      for (const effectFn of dep) {
        effectFns.add(effectFn);
      }
    }
  }
  return effectFns;
}
\`\`\`

## effect源码

\`\`\`javascript
/**
 * 用于记录当前活动的 effect
 */
export let activeEffect = undefined;
export const targetMap = new WeakMap(); // 用来存储对象和其属性的依赖关系
const effectStack = [];

/**
 * 该函数的作用，是执行传入的函数，并且在执行的过程中，收集依赖
 * @param {*} fn 要执行的函数
 */
export function effect(fn, options = {}) {
  const { lazy = false } = options;
  const environment = () => {
    try {
      activeEffect = environment;
      effectStack.push(environment);
      cleanup(environment);
      return fn();
    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1];
    }
  };
  environment.deps = [];
  environment.options = options;
  if (!lazy) {
    environment();
  }
  return environment;
}

export function cleanup(environment) {
  let deps = environment.deps; // 拿到当前环境函数的依赖（是个数组）
  if (deps.length) {
    deps.forEach((dep) => {
      dep.delete(environment);
    });
    deps.length = 0;
  }
}
\`\`\`

## watch源码

\`\`\`javascript
import { effect, cleanup } from "./effect/effect.js";

/**
 * @param {*} source
 * @param {*} cb 要执行的回调函数
 * @param {*} options 选项对象
 * @returns
 */
export function watch(source, cb, options = {}) {
  let getter;
  if (typeof source === "function") {
    getter = source;
  } else {
    getter = () => traverse(source);
  }

  // 用于保存上一次的值和当前新的值
  let oldValue, newValue;

  // 这里的 job 就是要执行的函数
  const job = () => {
    newValue = effectFn();
    cb(newValue, oldValue);
    oldValue = newValue;
  };

  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler: () => {
      if (options.flush === "post") {
        Promise.resolve().then(job);
      } else {
        job();
      }
    },
  });

  if (options.immediate) {
    job();
  } else {
    oldValue = effectFn();
  }

  return () => {
    cleanup(effectFn);
  };
}

function traverse(value, seen = new Set()) {
  // 检查 value 是否是对象类型，如果不是对象类型，或者是 null，或者已经访问过，则直接返回 value。
  if (typeof value !== "object" || value === null || seen.has(value)) {
    return value;
  }

  // 将当前的 value 添加到 seen 集合中，标记为已经访问过，防止循环引用导致的无限递归。
  seen.add(value);

  // 使用 for...in 循环遍历对象的所有属性。
  for (const key in value) {
    // 递归调用 traverse，传入当前属性的值和 seen 集合。
    traverse(value[key], seen);
  }

  // 返回原始值
  return value;
}
\`\`\`

## computer源码

\`\`\`javascript
import { effect } from "./effect/effect.js";
import track from "./effect/track.js";
import trigger from "./effect/trigger.js";
import { TriggerOpTypes, TrackOpTypes } from "./utils.js";

function normalizeParameter(getterOrOptions) {
  let getter, setter;
  if (typeof getterOrOptions === "function") {
    getter = getterOrOptions;
    setter = () => {
      console.warn(\`Computed property was assigned to but it has no setter.\`);
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return { getter, setter };
}

/**
 *
 * @param {*} getterOrOptions 可能是函数，也可能是对象
 */
export function computed(getterOrOptions) {
  // 1. 第一步，先做参数归一化
  const { getter, setter } = normalizeParameter(getterOrOptions);

  // value 用于记录计算属性的值，dirty 用于标识是否需要重新计算
  let value;
  let dirty = true;
  // 将 getter 传入 effect，getter 里面的响应式属性就会和 getter 建立依赖关系
  const effetcFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true;
      trigger(obj, TriggerOpTypes.SET, "value");
    },
  });

  // 2. 第二步，返回一个新的对象
  const obj = {
    // 外部获取计算属性的值
    get value() {
      track(obj, TrackOpTypes.GET, "value");
      if (dirty) {
        // 第一次会进来，先计算一次，然后将至缓存起来
        value = effetcFn();
        dirty = false;
      }
      // 直接计算出来的值
      return value;
    },
    set value(newValue) {
      setter(newValue);
    },
  };
  return obj;
}
\`\`\`
`;export{n as default};
