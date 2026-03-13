const n=`---
title: jest
urlname: stppulnanp55o7mx
date: 2025-02-22 16:55:13 +0800
tags: []
description: 介绍简单易用：Jest 的 API 简单易用，测试用例编写起来非常简单。快速执行：Jest
  使用并发执行，可以大大缩短测试时间。自动化断言：Jest 自带了一个断言库，可以自动化地对测试结果进行断言。Mock 支持：Jest 支持
  Mock，可以方便地模拟各种场景，例如网络请求、计时器等。Sn...
image: ''
categories: []
---

## 介绍

简单易用：Jest 的 API 简单易用，测试用例编写起来非常简单。

快速执行：Jest 使用并发执行，可以大大缩短测试时间。

自动化断言：Jest 自带了一个断言库，可以自动化地对测试结果进行断言。

Mock 支持：Jest 支持 Mock，可以方便地模拟各种场景，例如网络请求、计时器等。

Snapshot 测试：Jest 支持 Snapshot 测试，可以方便地对组件的渲染结果进行比较和验证。

集成测试支持：Jest 支持集成测试，可以方便地测试整个应用程序的功能。

## 入门

安装

\`\`\`typescript
npm install --save-dev jest
\`\`\`

文件tools.js

\`\`\`typescript
/**
 * 工具库
 */
exports.sum = function (a, b) {
  return a + b;
};

exports.sub = function (a, b) {
  return a - b;
};

exports.mul = function (a, b) {
  return a * b;
};

exports.div = function (a, b) {
  return a / b;
};
\`\`\`

测试文件tools.test.js

it是test方法的别名

一个test方法就是一个测试用例

suits代表测试套件，一个文件是一个测试套件

\`\`\`typescript
/**
 * 改文件就是一个测试文件
 * 在该文件中，我们会书写一个一个的测试用例
 * 安装了 jest 之后，默认会提供一些全局的方法和对象
 * test、expect、jest
 */

const { sum, sub, mul, div } = require("./tools");

describe("这是一组测试，测试加减法", () => {
  // 回调函数中就放一个一个的测试用例

  /**
   * 一个 test 方法意味着书写了一个测试用例
   * param1 ：针对这个测试用例的一个描述
   * param2 ：执行该用例所对应的回调函数
   */
  test("测试加法", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("测试减法", () => {
    expect(sub(10, 5)).toBe(5);
  });
});

describe("这是一组测试，测试乘除法", () => {
  /**
   * it 方法实际上是 test 方法的一个别名
   */
  it("测试乘法", () => {
    expect(mul(2, 3)).toBe(6);
  });

  it("测试除法", () => {
    expect(div(10, 2)).toBe(5);
  });
});
\`\`\`

> 安装了 jest 之后，默认会提供一些全局的方法和对象

最好的方式是一个工具函数对应一个测试套件，每一个测试套件里面根据函数的参数来书写测试用例，一个参数对应一个测试用。

### api

test

it

expect

toBe

describe：测试用例分组

## 匹配器

在 Jest 中，提供了丰富的匹配器（Matchers）

目前 Jest 里面支持的修饰符有 3 个：

- .not
- .resolves
- .rejects

not 修饰符

\`\`\`javascript
test("测试加法", () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(1, 2)).not.toBe(4);
});
\`\`\`

### 常用匹配器

常用的匹配器这里介绍两个，一个是 toBe，还有一个是 toEqual，toEqual 可以针对对象进行一个深度比较

\`\`\`javascript
test("深度比较对象", () => {
  const stu = { name: "张三", score: { html: 100, css: 90 } };
  expect(stu).not.toBe({ name: "张三", score: { html: 100, css: 90 } });
  // 使用 toEqual 来进行深度比较
  // toEqual 会递归比较对象的所有属性
  expect(stu).toEqual({ name: "张三", score: { html: 100, css: 90 } });
});
\`\`\`

### 布尔值相关匹配器

一般来讲运行结果得到的是一个布尔值，使用布尔值相关匹配器的时候一般是无需传参的。

\`\`\`javascript
test("布尔值相关匹配器", () => {
  const n = null;
  expect(n).toBeFalsy();
  expect(n).not.toBeTruthy();

  const a = 0;
  expect(a).toBeFalsy();
  expect(a).not.toBeTruthy();
});
\`\`\`

像布尔值相关的这种无参的匹配器，在 Jest 中还有好几个，我们快速过一遍，如下：

\`\`\`javascript
test("无参匹配器", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  const a = 0;
  expect(a).not.toBeNull();
  expect(a).toBeDefined();
  expect(a).not.toBeUndefined();
});
\`\`\`

### 数值相关匹配器

常见的就是两个数值之间大小的比较，有大于、大于等于、小于、小于等于、等于之类的：

\`\`\`javascript
test("数值相关匹配器", () => {
  const value1 = 4;
  // 大于
  expect(value1).toBeGreaterThan(3);
  // 大于等于
  expect(value1).toBeGreaterThanOrEqual(4);
  // 小于
  expect(value1).toBeLessThan(5);
  // 小于等于
  expect(value1).toBeLessThanOrEqual(4);

  // 这里需要注意一下浮点数
  const value2 = 0.1 + 0.2;
  expect(value2).toBeCloseTo(0.3);
  // toBeCloseTo 还接受第二个参数，第二个参数用于指定位数，默认是两位
  expect(0.302).toBeCloseTo(0.301);
  expect(0.302).not.toBeCloseTo(0.301, 5);
});
\`\`\`

上面的匹配器中，主要需要注意浮点数往往需要使用 toBeCloseTo 这个匹配器来进行比较，这个匹配器还可以设置位数。

### 字符串相关的匹配器

toMatch 可以检查字符串是否和某一个正则表达式能够匹配上

\`\`\`javascript
test("字符串相关匹配器", () => {
  expect("this is a test").toMatch(/test/);
  expect("this is a test").not.toMatch(/abc/);
});
\`\`\`

### 数组相关匹配器

一个常见的需求就是需要判断一个数组是否包含某一项，这个时候可以使用 toContain，例如：

\`\`\`javascript
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];
test("数组相关匹配器", () => {
  expect(shoppingList).toContain("milk");
  // toContain 进行的是全等比较，也就是严格比较
  expect([1, 2, 3]).not.toContain("1");
  expect([{ name: "张三" }, { name: "李四" }]).not.toContain({ name: "张三" });
  // toContain 还可以用来检测一个字符串是否是另一个字符串的子串
  expect("this is a test").toContain("test");
  // 也可以用到集合（set）里面
  expect(new Set(shoppingList)).toContain("milk");
});
\`\`\`

### 异常匹配器

有些时候我们需要测试某个函数调用之后是否会抛出异常，那么此时我们可以使用 toThrow 这个匹配器：

\`\`\`javascript
function compileCode() {
  throw new Error("aaa you are using the wrong JDK bbb");
}

test("异常相关的匹配器", () => {
  expect(() => compileCode()).toThrow();
  // toThrow 里面可以传递不同的参数
  expect(() => compileCode()).toThrow(Error);
  expect(() => compileCode()).toThrow("you are using the wrong JDK");
  expect(() => compileCode()).toThrow(/JDK/);
});
\`\`\`

### 非对称匹配器

回顾上面讲的匹配器，基本上都是对称匹配器，比如：

\`\`\`javascript
const stu = { name: "张三", score: { html: 100, css: 90 } };
expect(stu).not.toBe({ name: "张三", score: { html: 100, css: 90 } });
\`\`\`

上面的 toBe 匹配器就是一个对称的匹配器，在 Jest 中还存在一些非对称的匹配器。

\`\`\`javascript
const arr = ["张三"];
test("上面的数组不包含某一项", () => {
  expect(["李四", "王武", "赵六"]).toEqual(expect.not.arrayContaining(arr));
});
\`\`\`

就是期望相等的东西是一个描述就是非对称匹配器

\`\`\`javascript
expect.not.arrayContaining(arr);
\`\`\`

例如

\`\`\`javascript
const obj = { name: "张三" };
test("对象不包含上面的键值对", () => {
  expect({ age: 18 }).toEqual(expect.not.objectContaining(obj));
  expect({ name: "李四", age: 18 }).toEqual(expect.not.objectContaining(obj));
});
\`\`\`

这种非对称匹配器，toEqual 匹配器里面是一段类似于描述的信息。

### 部分源码

在源码中，所有的匹配器都放在了一个名为 matchers 的对象里面

\`\`\`javascript
const matchers = {
  toBe() {
    /* ... */
  },
  toBeCloseTo() {
    /* .. */
  },
  // ...
};
\`\`\`

在 expect 方法里面，实际上调用该方法后会返回一个匹配器对象 expectation，格式如下：

\`\`\`javascript
const expectation = {
  not: {},
  rejects: { not: {} },
  resolves: { not: {} },
};
\`\`\`

之后会为 expectation 这个对象添加上所有的匹配器方法，代码如下：

\`\`\`javascript
const expect = () => {
  // 获取到所有的 matchers
  // 该对象是要向外部返回的
  const expectation = {
    not: {},
    rejects: { not: {} },
    resolves: { not: {} },
  };
  // 将 matchers 对象上面的所有的匹配器添加到 expectation 对象上面
  Object.keys(matchers).forEach((name) => {
    expectation[name] = matchers[name];
    // ...
  });
  return expectation;
};
\`\`\`

## 生命周期方法

在 Jest 中，生命周期方法大致分为两类：

- 重复性的生命周期方法
  - beforeEach
  - afterEach
- 一次性的生命周期方法
  - beforeAll
  - afterAll

上面所罗列的生命周期方法，也是全局方法，不需要引入，直接就可以使用。

### 重复性的生命周期方法

所谓重复性的生命周期方法，就是指这些方法会被添加到每一个测试用例的前后。

\`\`\`javascript
const { sum, sub, mul, div } = require("./tools");

// beforeEach 会在执行每一个测试用例之前被触发
beforeEach(() => {
  console.log("全局的beforeEach");
});

afterEach(() => {
  console.log("全局的afterEach");
});

test("测试加法函数", () => {
  const result = sum(1, 3);
  expect(result).toBe(4);
  console.log("/x1b[31m%s/x1b[0m", "测试加法函数");
});

test("测试减法函数", () => {
  const result = sub(15, 10);
  expect(result).toBe(5);
  console.log("/x1b[31m%s/x1b[0m", "测试减法函数");
});

test("测试乘法函数", () => {
  const result = mul(2, 3);
  expect(result).toBe(6);
  console.log("/x1b[31m%s/x1b[0m", "测试乘法函数");
});

test("测试除法函数", () => {
  const result = div(50, 2);
  expect(result).toBe(25);
  console.log("/x1b[31m%s/x1b[0m", "测试除法函数");
});
\`\`\`

上面的代码为每一个测试用例添加了生命周期方法，beforeEach 和 afterEach 会在每一个测试用例的前后执行。如下图所示：

![](articles/stppulnanp55o7mx/2023-04-18-010931.jpg)

### 一次性的生命周期方法

对应的方法是：

- beforeAll
- afterAll

顾名思义就是在整个测试开始之前，以及测试用例全部执行完之后执行该生命周期方法。

\`\`\`javascript
// ...
// beforeAll 是在整个测试套件的第一个测试用例执行之前执行
beforeAll(() => {
  console.log("全局的beforeAll");
});

// afterAll 会在所有测试用例执行完成之后，然后再执行 afterAll
afterAll(() => {
  console.log("全局的afterAll");
});
// ...
\`\`\`

执行顺序如下图所示：

![](articles/stppulnanp55o7mx/2023-04-18-011423.jpg)

### 在分组中添加生命周期函数

如果测试用例比较多，我们可以使用 describe 来进行分组，在一个分组里面也可以书写生命周期方法，但是在分组中的生命周期方法会变为一个局部的生命周期方法，仅对该组测试用例有效，而且这里还涉及到了一个顺序的问题。

\`\`\`javascript
// ...
// 第二组
describe("第二组", () => {
  beforeEach(() => {
    console.log("/x1b[34m%s/x1b[0m", "分组beforeEach");
  });
  afterEach(() => {
    console.log("/x1b[34m%s/x1b[0m", "分组afterEach");
  });

  test("测试乘法函数", () => {
    const result = mul(2, 3);
    expect(result).toBe(6);
    console.log("/x1b[31m%s/x1b[0m", "测试乘法函数");
  });

  test("测试除法函数", () => {
    const result = div(50, 2);
    expect(result).toBe(25);
    console.log("/x1b[31m%s/x1b[0m", "测试除法函数");
  });
});
// ...
\`\`\`

如果既有全局的 beforeEach 又有分组内部的 beforeEach，那么是先执行全局的 beforeEach，然后再执行分组内部的 beforeEach，如果是全局 afterEach 以及 分组的 afterEach，那么顺序刚好和 beforeEach 相反。

![](articles/stppulnanp55o7mx/2023-04-18-012130.jpg)

同样我们也可以添加分组内部的 beforeAll 和 afterAll，代码如下：

\`\`\`javascript
// 第二组
describe("第二组", () => {
  beforeEach(() => {
    console.log("/x1b[34m%s/x1b[0m", "分组beforeEach");
  });
  afterEach(() => {
    console.log("/x1b[34m%s/x1b[0m", "分组afterEach");
  });

  beforeAll(() => {
    console.log("/x1b[32m%s/x1b[0m", "分组beforeAll");
  });
  afterAll(() => {
    console.log("/x1b[32m%s/x1b[0m", "分组afterAll");
  });

  test("测试乘法函数", () => {
    const result = mul(2, 3);
    expect(result).toBe(6);
    console.log("/x1b[31m%s/x1b[0m", "测试乘法函数");
  });

  test("测试除法函数", () => {
    const result = div(50, 2);
    expect(result).toBe(25);
    console.log("/x1b[31m%s/x1b[0m", "测试除法函数");
  });
});
\`\`\`

beforeAll 是在要执行该分组的测试用例之前会执行，afterAll 是在该分组所有测试用例执行完毕后执行。

如下图所示：

![](articles/stppulnanp55o7mx/2023-04-18-012505.jpg)

在使用 describe 分组 的时候，Jest 会在执行测试文件里面的测试用例之前，把所有的 describe 执行一遍，假设有如下的代码：

\`\`\`javascript
// 第一组
describe("第一组", () => {
  console.log("开始进行第一组测试");

  test("测试加法函数", () => {
    const result = sum(1, 3);
    expect(result).toBe(4);
    console.log("/x1b[31m%s/x1b[0m", "测试加法函数");
  });

  test("测试减法函数", () => {
    const result = sub(15, 10);
    expect(result).toBe(5);
    console.log("/x1b[31m%s/x1b[0m", "测试减法函数");
  });
});

// 第二组
describe("第二组", () => {
  console.log("开始进行第二组测试");

  test("测试乘法函数", () => {
    const result = mul(2, 3);
    expect(result).toBe(6);
    console.log("/x1b[31m%s/x1b[0m", "测试乘法函数");
  });

  test("测试除法函数", () => {
    const result = div(50, 2);
    expect(result).toBe(25);
    console.log("/x1b[31m%s/x1b[0m", "测试除法函数");
  });
});
\`\`\`

那么会先打印 describe 里面的两句话，分别输出“开始进行第一组测试”、“开始进行第二组测试”，然后才是执行每一个分组内部的测试用例。因此我们如果想要在每一个分组执行之前添加一些代码，就应该使用生命周期函数，比如这里的情况就应该使用 beforeAll。

### 补充：test.only

test.only 是用来测试特定的测试用例，也就是说，如果一个测试套件里面假设有10个测试用例，第7个测试用例书写了 test.only，那么在运行整个测试套件的时候，就只会执行第 7 个测试用例。

test.only 一般用于在一个测试套件中，我们要确保某一个测试用例是否 OK 的时候，就可以使用 test.only。

\`\`\`javascript
test.only("测试乘法函数", () => {
  const result = mul(2, 3);
  expect(result).toBe(6);
  console.log("/x1b[31m%s/x1b[0m", "测试乘法函数");
});
\`\`\`

注意在使用 test.only 的时候，对应的生命周期方法也会被执行。

从源码的角度来看，这些生命周期方法的背后，实际上都是调用的同一个名为 /_addHook 的方法。

\`\`\`javascript
const beforeEach: THook = (fn, timeout) =>
  _addHook(fn, 'beforeEach', beforeEach, timeout);
const beforeAll: THook = (fn, timeout) =>
  _addHook(fn, 'beforeAll', beforeAll, timeout);
const afterEach: THook = (fn, timeout) =>
  _addHook(fn, 'afterEach', afterEach, timeout);
const afterAll: THook = (fn, timeout) =>
  _addHook(fn, 'afterAll', afterAll, timeout);
\`\`\`

\`\`\`javascript
const _addHook = (
  fn: Circus.HookFn,
  hookType: Circus.HookType,
  hookFn: THook,
  timeout?: number,
) => {
  const asyncError = new ErrorWithStack(undefined, hookFn);

  if (typeof fn !== 'function') {
    asyncError.message =
      'Invalid first argument. It must be a callback function.';

    throw asyncError;
  }

  dispatchSync({asyncError, fn, hookType, name: 'add_hook', timeout});
};
\`\`\`

/_addHook 主要是做了一个错误相关的处理，之后调用了 dispatchSync

## 模拟函数

在 Jest 中提供了一个全局对象名为 jest，这个对象上面有非常多的方法，有关该对象的方法，可以参阅文档：

[https://jestjs.io/docs/jest-object](https://jestjs.io/docs/jest-object)

jest 对象上面的方法大致分为四类：

- 模拟模块
- 模拟函数
- 模拟计时器
- 其他方法

通过 jest.fn 方法可以创建一个模拟函数（mock fucntion）

\`\`\`javascript
jest.fn(implementation?)
\`\`\`

implementation 是一个可选参数，代表着模拟函数的实现，如果没有传入，那么创建的是一个空的模拟函数。

### 简单举例

\`\`\`javascript
test("基本演示", () => {
  // 创建一个模拟函数
  const mock = jest.fn();
  // 设置这个模拟函数的返回值为 42
  mock.mockReturnValue(42);
  expect(mock()).toBe(42);
});
\`\`\`

在上面的代码中，我们使用 jest.fn 方法创建了一个空的模拟函数，然后通过调用 mockReturnValue 方法来指定该模拟函数的返回值为 42.之后通过 expect 调用对该模拟函数进行一个测试。

在使用 jest.fn 创建模拟函数的时候，也可以传入一个函数来代表模拟函数的实现，一般通过传入的函数能够明确所生成的模拟函数接收几个参数，返回值是多少。

\`\`\`javascript
test("内置实现", () => {
  const mock = jest.fn((x) => 100 + x);
  expect(mock(1)).toBe(101);
});
\`\`\`

调用 jest.fn 方法后返回的是一个模拟函数，之所以可以在函数的基础上调用方法，是因为在 js 中函数也是一种对象，这里的模拟函数类似于如下的表达：

\`\`\`javascript
function a() {}
a.b = function () {};
a.c = function () {};
a.d = function () {};
\`\`\`

### 举例

\`\`\`javascript
test("基本演示", () => {
  // 创建一个模拟函数
  const mock = jest.fn();

  mock
    .mockReturnValue(30) // 设置返回值为 30
    .mockReturnValueOnce(10) // 第一次调用模拟函数对应的返回值
    .mockReturnValueOnce(20); // 第二次调用模拟函数对应的返回值

  expect(mock()).toBe(10);
  expect(mock()).toBe(20);
  expect(mock()).toBe(30);

  // 设置这个模拟函数的返回值为 42
  mock.mockReturnValue(42);
  expect(mock()).toBe(42);
});
\`\`\`

通过模拟函数身上的这些方法，可以控制模拟函数的行为，例如上面我们通过 mockReturnValueOnce 控制函数不同次数的调用对应的返回值。

接下来我们来看两个模拟函数具体的应用场景。

首先第一个，假设我们书写了一个 forEach 函数，这个 forEach 就类似于数组里面的 forEach 方法，该函数会遍历数组里面的每一项，然后针对每一项执行对应的回调函数：

\`\`\`javascript
const arr = [1, 2, 3, 4, 5];
arr.forEach((item) => {
  // item....
});

function forEach(arr, callback) {
  for (let index = 0; i < arr.length; index++) {
    callback(arr[index]);
  }
}
forEach(arr, (item) => {});
\`\`\`

接下来我们想要测试这个 forEach 函数的实现是否有问题，那么这里涉及到了这个 forEach 依赖了 callback 这个函数，因此我们就可以通过模拟函数的方式来对其进行屏蔽

\`\`\`javascript
const arr = [1, 2, 3];

function forEach(arr, callback) {
  for (let index = 0; index < arr.length; index++) {
    callback(arr[index]);
  }
}

test("测试forEach是否正确", () => {
  // 由于 forEach 中依赖了 callback，因此我们可以创建一个模拟函数来模拟这个 callback
  const mockCallback = jest.fn((x) => 100 + x);

  forEach(arr, mockCallback);

  // 接下来就进入到测试环节，我们可以利用模拟函数上面的诸多方法来进行一个验证
  //   [
  //     [ 1 ],
  //     [ 2 ],
  //     [ 3 ]
  //   ];
  expect(mockCallback.mock.calls).toHaveLength(3);
  expect(mockCallback.mock.calls.length).toBe(3);

  // 测试每一次调用 callback 的时候传入的参数是否符合预期
  expect(mockCallback.mock.calls[0][0]).toBe(1);
  expect(mockCallback.mock.calls[1][0]).toBe(2);
  expect(mockCallback.mock.calls[2][0]).toBe(3);

  // 针对每一次 callback 被调用后的返回值进行测试
  expect(mockCallback.mock.results[0].value).toBe(101);
  expect(mockCallback.mock.results[1].value).toBe(102);
  expect(mockCallback.mock.results[2].value).toBe(103);

  // 模拟函数是否被调用过
  expect(mockCallback).toHaveBeenCalled();
  // 前面在调用的时候是否有参数为 1 以及参数为 2 的调用
  expect(mockCallback).toHaveBeenCalledWith(1);
  expect(mockCallback).toHaveBeenCalledWith(2);
  // 还可以对模拟函数的参数进行一个边界判断，判断最后一次调用是否传入的参数为 3
  expect(mockCallback).toHaveBeenLastCalledWith(3);
});
\`\`\`

### 异步举例

接下来我们来看第二例子，我们来模拟一个异步请求的场景。假设有如下的异步请求函数：

\`\`\`javascript
async function fetchData() {
  const res = await fetch("https://www.example.com/data");
  const data = await res.json();
  return data;
}
\`\`\`

在测试这个异步函数的时候，会发送真实的请求进行测试，但是有一些时候，我们知道这个没问题，或者说想要在那时屏蔽这一个异步，假设一个异步是能够正常返回数据的，这种情况下我们就可以针对这个异步请求函数来书写一个模拟函数来代替真实的 fetchData 函数。

\`\`\`javascript
// 创建了一个空的模拟函数
const fetchDataMock = jest.fn();
const fakeData = { id: 1, name: "xiejie" };
// 设置该模拟函数的实现
fetchDataMock.mockImplementation(() => Promise.resolve(fakeData));

// 通过模拟函数的一些方法来设置该模拟函数的行为

test("模拟网络请求正常", async () => {
  const data = await fetchDataMock();
  expect(data).toEqual({ id: 1, name: "xiejie" });
});

test("模拟网络请求出错", async () => {
  // 模拟网络请求第一次请求失败，之后请求没问题
  fetchDataMock.mockImplementationOnce(() =>
    Promise.reject(new Error("network error")),
  );

  await expect(fetchDataMock()).rejects.toThrow("network error");
  await expect(fetchDataMock()).resolves.toEqual({ id: 1, name: "xiejie" });
});
\`\`\`

## 模拟模块

模块可以分为两种模块：

- 第三方模块
- 文件模块

### 模拟第三方模块

在 jest 对象上面有一个名为 mock 的方法。

下面是一个快速入门示例：

\`\`\`javascript
/**
 * 和请求相关的
 */

const axios = require("axios");

class User {
  /**
   * 获取所有的用户
   */
  static all() {
    return axios.get("/users.json").then((resp) => resp.data);
  }
}

module.exports = User;
\`\`\`

假设现在项目中有如上的一个方法，现在我们需要对这个模块的方法进行一个测试，但是会涉及到一个问题，要测试这个模块就必然会涉及到使用 axios 发送真实的 http 请求，这个时候我们想要屏蔽这个真实的请求。

其中一种方案就是像上一小节一样，实现一个 all 方法的模拟方法，屏蔽内部的实现，但是这种方法会有一个问题，我们无法测试 all 方法内部的实现是否正确，如果是这种情况，我们就可以采取模拟 axios 模块的方式来屏蔽 axios 发送请求这个部分。

这个时候我们可以使用 jest.mock 来模拟 axios 这个模块，如下：

\`\`\`javascript
const axios = require("axios");
const User = require("../api/userApi");
const userData = require("./user.json");

// 模拟 axios 模块
jest.mock("axios");

// 测试用例
test("测试获取用户数据", async () => {
  // 模拟响应数据
  const resp = {
    data: userData,
  };
  // 现在我们已经模拟了 axios
  // 但是目前的 axios 没有书写任何的行为
  // 因此我们需要在这里进行一个 axios 模块行为的指定
  // 指定了在使用 axios.get 的时候返回 resp 响应
  axios.get.mockImplementation(() => Promise.resolve(resp));

  await expect(User.all()).resolves.toEqual(userData);
});
\`\`\`

在上面的测试套件中，我们首先使用 jest.mock 方法模拟了 axios 这个模块。

之后书写了一个测试用例，在测试用例里面，我们指定了 axios.get 方法的行为，之后对 User.all 方法进行测试。在 User.all 方法里面使用到 axios.get 方法，这个时候就会使用模拟的 axios 模块。

在上面的示例中，我们也可以传入第二个参数，第二个参数可以指定模块的一些实现，如下：

\`\`\`javascript
// const axios = require("axios");
const User = require("../api/userApi");
const userData = require("./user.json");

// 模拟 axios 模块
jest.mock("axios", () => {
  const userData = require("./user.json");
  // 模拟响应数据
  const resp = {
    data: userData,
  };
  return {
    get: jest.fn(() => Promise.resolve(resp)),
  };
});

// 测试用例
test("测试获取用户数据", async () => {
  // 现在我们已经模拟了 axios
  // 但是目前的 axios 没有书写任何的行为
  // 因此我们需要在这里进行一个 axios 模块行为的指定
  // 指定了在使用 axios.get 的时候返回 resp 响应
  // axios.get.mockImplementation(()=>Promise.resolve(resp));

  await expect(User.all()).resolves.toEqual(userData);
});
\`\`\`

在上面的方法中，我们使用 jest.mock 模拟 axios 模块时，传入了第二个参数，第二个参数是一个工厂函数，指定了模块的一些行为，之后，我们就不用在单独使用诸如 mockImplementation 之类的方法来指定模块的实现了。

除了替换模块本身，还可以为这个模块添加一些额外的方法：

\`\`\`javascript
// 模拟 axios 模块
jest.mock("axios", () => {
  const userData = require("./user.json");
  // 模拟响应数据
  const resp = {
    data: userData,
  };
  return {
    get: jest.fn(() => Promise.resolve(resp)),
    // 这个方法本身 axios 是没有的
    // 我们通过模拟 axios 这个模块，然后给 axios 这个模块添加了这么一个 test方法
    // 这里在实际开发中没有太大意义，仅做演示
    test: jest.fn(() => Promise.resolve("this is a test")),
  };
});
\`\`\`

### 模拟文件模块

通过 jest.mock，我们还可以模拟整个文件模块：

\`\`\`javascript
const { sum, sub, mul, div } = require("../utils/tools");

jest.mock("../utils/tools", () => {
  // 在这里来改写文件模块的实现

  // 拿到 ../utils/tools 路径所对应的文件原始模块
  const originalModule = jest.requireActual("../utils/tools");

  // 这里相当于是替换了原始的模块
  // 一部分方法使用原始模块中的方法
  // 一部分方法（sum、sub）被替换掉了
  return {
    ...originalModule,
    sum: jest.fn(() => 100),
    sub: jest.fn(() => 50),
  };
});

test("对模块进行测试", () => {
  expect(sum(1, 2)).toBe(100);
  expect(sub(10, 3)).toBe(50);
  expect(mul(10, 3)).toBe(30);
  expect(div(10, 2)).toBe(5);
});
\`\`\`

在上面的例子中，我们引入了路径为 ../utils/tools 的文件模块，并且我们对这个文件模块进行了一个模拟，替换掉了这个文件模块里面的部分方法。

在今天的例子中，我们第一次创建了两个测试套件，可以看到在运行的时候，没有再像之前一样显示出测试用例的描述。如果想要显示，可以添加如下的配置：

\`\`\`javascript
"test": "jest --verbose=true"
\`\`\`

这个配置实际上就是 jest cli 的配置选项，关于配置我们后面专门拿一节课来进行介绍。

### 总结

本节课我们介绍了非常有用的 _jest.mock( )_ 方法，通过该方法可以模拟导入的模块，从而方便地测试被测试模块的行为，而不需要真正地执行模块的代码。

除了上面介绍的示例以外，下面罗列了一些在实际开发中可能会使用到 _jest.mock( )_ 方法的例子：

1. 模拟外部依赖  
   当您的被测试模块依赖于外部模块时，您可以使用 _jest.mock( )_ 方法来模拟这些模块的行为，以便更好地控制测试环境。例如，当您的代码依赖于一个需要连接到数据库的模块时，您可以使用 _jest.mock( )_ 方法来模拟这个模块的行为，以便在测试时避免连接到真实的数据库。
2. 模拟函数的行为  
   当您的被测试模块调用其他函数时，您可以使用 _jest.mock( )_ 方法来模拟这些函数的行为，以便更好地控制测试环境。例如，当您的代码调用一个外部第三方库中的函数时，您可以使用 _jest.mock( )_ 方法来模拟这个函数的行为，以便在测试时避免调用真实的库函数，同时确保您的代码正确处理了这个函数的返回值和参数。
3. 模拟组件  
   当您的被测试模块是一个 _React_ 组件时，您可以使用 _jest.mock( )_ 方法来模拟这个组件的行为，以便更好地控制测试环境。例如，当您测试一个依赖于其他组件的组件时，您可以使用 _jest.mock( )_ 方法来模拟这些组件的行为，以便在测试时避免真正地渲染这些组件。

总之，使用 _Jest_ 的 _jest.mock( )_ 方法，可以帮助您轻松地模拟各种依赖项和操作的行为，从而使测试更加简单和可靠。

## 配置文件

在官网对应的 ：[https://jestjs.io/docs/configuration](https://jestjs.io/docs/configuration) 可以看到 Jest 中所有的配置项目。

当我们要对 Jest 进行大量的配置的时候，肯定是需要配置文件的，那么首先我们需要生成一个配置文件：

\`\`\`javascript
npx jest --init
\`\`\`

生成配置文件如下图所示：

![](articles/stppulnanp55o7mx/2023-04-24-012507.png)

下面介绍一些配置文件中常见的配置项。

collectCoverage：会收集并显示测试覆盖率，包含每个文件中每种类型的代码（语句、分支、函数和行）的测试覆盖率

![](articles/stppulnanp55o7mx/1740221480507-3bb3d5f3-4859-4d5a-8371-ff6b63f61190.png)

在上面的表格中，我们能够看到如下的信息：

- % Stmts：包含语句的百分比，即被测试覆盖的语句占总语句数的比例。
- % Branch：包含分支的百分比，即被测试覆盖的分支占总分支数的比例。
- % Funcs：包含函数的百分比，即被测试覆盖的函数占总函数数的比例。
- % Lines：包含行的百分比，即被测试覆盖的行占总行数的比例。
- Uncovered Line #s：未被测试覆盖的行号。

从上面的测试报告中，我们可以看出，tools.js 文件下面的 sum 和 sub 这两个函数的测试没有被覆盖到，因为我们在测试的时候，我们是将原来的 sum 和 sub 替换掉了的。

当 collectCoverage 设置为 true 之后，还可以设置 coverageThreshold 代码覆盖率的阀值：

\`\`\`javascript
module.exports = {
  // ...
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  // ...
};
\`\`\`

另外，在项目根目录下面，还新生成了一个 coverage 的目录，里面其实就是各种格式（xml、json、html）的测试报告，之所以生成不同格式的报告，是为了方便你后面通过不同的工具来进行读取。

例如 HTML 版本的测试报告如下图所示：

![](articles/stppulnanp55o7mx/2023-04-24-015301.png)

testMatch：这个配置项可以指定 Jest 应该运行哪些测试文件。默认情况下， Jest 会查找 .test.js 或者 .spec.js 结尾的文件

例如我们将该配置修改为如下：

\`\`\`javascript
testMatch: [
    "**/test/**/*.[jt]s?(x)",
],
\`\`\`

moduleFileExtensions :指定 Jest 查找测试文件时应该搜索哪些文件扩展名。

setupFilesAfterEnv：指定 Jest 在运行测试之前应该运行哪些文件。例如：

\`\`\`javascript
setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"];
\`\`\`

在执行每个测试套件（文件）之前，都会先执行这个 setupTests 文件

## 测试模块

结合ts

测试浏览器的参数

测试计时器

测试es6类
`;export{n as default};
