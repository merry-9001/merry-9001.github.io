const n=`---
title: TS用法（语法）
urlname: ozn4r7x2bavpcb6k
date: 2024-11-15 09:51:35 +0800
tags: []
description: 介绍基本类型1.八种内置类型2.any nuknown onject Object void
  never用法变量类型标注（除数组）let a:number = 2;变量类型标注（数组）数字类型数组let arr:number[] =
  [1,2,3,4];//数字类型的数组数字类型数组
image: ''
categories: []
---

# 介绍

基本类型

1.八种内置类型

2.any nuknown onject Object void never

# 用法

## 变量类型标注（除数组）

\`\`\`javascript
let a:number = 2;
\`\`\`

## 变量类型标注（数组）

数字类型数组

\`\`\`typescript
let arr: number[] = [1, 2, 3, 4]; //数字类型的数组
\`\`\`

数字类型数组

\`\`\`typescript
let arr1: Array<number> = [1, 2, 3, 4, 5];
\`\`\`

定义数组每一个位置的类型的数组（也叫元组）

\`\`\`typescript
let arr: [string, number] = ["小满", 22]; //这样的方式就叫做元组，定义了每个位置需要满足的不同类型
\`\`\`

嵌套写法

\`\`\`typescript
let arr1: Array<number> = [1, 2, 3, 4, 5];
let arr2: Array<string> = ["1,2,3,4,5"];
let arr3: Array<boolean> = [true];
//泛型数组套娃写法(还能够决定数组里面数组的类型之类的)
let arr4: Array<Array<number>> = [[123], [456]];
\`\`\`

## 函数类型标注

\`\`\`javascript
function test(a: number, b: number):void {

}

const fn = (name:string,age:number):string =>{
    return name + age
}


type Greet = (name: string) => string;
interface Log {
  (userId: number, message?: string): void;
}
\`\`\`

## interface与type

这两个ts的语法就像是函数一样，一次生成多次调用，因为要描述的类型往往可能是一个复杂对象，或者是一个函数，那么用这两种方式定义好类型之后，就可以在后面随便引用而不用每次遇到就写一遍

定义函数

\`\`\`typescript
type Condition = (n: number) => boolean;

interface Condition {
  (n: number): boolean;
}

function sum(numbers: number[], callBack: Condition) {
  let s = 0;
  numbers.forEach((n) => {
    if (callBack(n)) {
      s += n;
    }
  });
  return s;
}
\`\`\`

定义对象

\`\`\`typescript
interface User {
  name: string;
  age: number;
}

type User = {
  name: string;
  age: number;
};

const fn = (user: User): User => {
  //这里的参数填写方式就变得简单了
  return user;
};
\`\`\`

## 联合类型与交叉类型

凡是进行ts标注的地方都是可以使用& 和 | 的语法来表示

\`\`\`typescript
let myPhone: number | string = "010-820";

interface Pople {
  name: string;
  age: number;
}
interface Man {
  sex: number;
}

const xiaoman = (man: Pople & Man): void => {
  console.log(man);
};
\`\`\`

## 类型断言

对类型采用as的语法来明确变量的类型

\`\`\`typescript
let fn = function (num: number | string): void {
  console.log((num as string).length); //用括号括起来，as断言他是string类型
};
\`\`\`

\`\`\`typescript
let fn = (type: A | B) => {
  console.log((<A>type).run);
};
\`\`\`

## 枚举（参与运行）

枚举其实是js真正要运行的内容，可以认为就是一个变量

\`\`\`typescript
enum Color {
  no = "NO",
  yes = 1,
}

//可以认为这就是一个变量
console.log(Color.no);
\`\`\`

## 泛型

泛型函数

\`\`\`typescript
function Sub<T, U>(a: T, b: U): Array<T | U> {
  //这个T跟U随便起名字都行，没有强制规范
  const params: Array<T | U> = [a, b];
  return params;
}

Sub<Boolean, number>(false, 1); //我们这里就将其定义为布尔值类型跟数字类型
\`\`\`

interface + 泛型

\`\`\`typescript
interface MyInter<T> {
  (arg: T): T;
}

function fn<T>(arg: T): T {
  return arg;
}

let result: MyInter<number> = fn;
\`\`\`

泛型定义类

\`\`\`typescript
class Sub<T> {
  attr: T[] = []; //这里的:只是普通的：
  add(a: T): T[] {
    return [a];
  }
}
\`\`\`

## 类型演算

根据已知的信息，计算出新的类型

typeof

typeof是用在实际的对象上，函数上，获取他的类型

\`\`\`typescript
interface Person {
  name: string;
  age: number;
}
const sem: Person = { name: "semlinker", age: 30 };
type Sem = typeof sem; // type Sem = Person
\`\`\`

keyof

同理，获取key值

in

进一步约束属性名只能是name或者age,采用in关键字

\`\`\`typescript
type Obj = {
  [p in "name" | "age"]: string;
};
\`\`\`

infer

占位符

<font style="color:rgba(0, 0, 0, 0.85);">假设你想从一个函数类型中推断出它的参数类型。可以使用 </font>\`<font style="color:rgba(0, 0, 0, 0.85);">infer</font>\`

\`\`\`typescript
type FunctionArgs<T> = T extends (arg: infer U) => any ? U : never;

// 示例函数
function add(a: number, b: number) {
  return a + b;
}

// 推断add函数的参数类型
type AddArgs = FunctionArgs<typeof add>;
// AddArgs的类型为number[]，因为add函数有两个参数，所以推断出参数类型的数组
\`\`\`

<font style="color:rgba(0, 0, 0, 0.85);">在这个例子中，</font>\`<font style="color:rgba(0, 0, 0, 0.85);">FunctionArgs</font>\`<font style="color:rgba(0, 0, 0, 0.85);"> 是一个条件类型，它的定义是：如果 </font>\`<font style="color:rgba(0, 0, 0, 0.85);">T</font>\`<font style="color:rgba(0, 0, 0, 0.85);">（这里 </font>\`<font style="color:rgba(0, 0, 0, 0.85);">T</font>\`<font style="color:rgba(0, 0, 0, 0.85);"> 代表一个函数类型）扩展自一个函数，这个函数接受一个参数 </font>\`<font style="color:rgba(0, 0, 0, 0.85);">arg</font>\`<font style="color:rgba(0, 0, 0, 0.85);">，并且参数类型是通过 </font>\`<font style="color:rgba(0, 0, 0, 0.85);">infer</font>\`<font style="color:rgba(0, 0, 0, 0.85);"> 占位符 </font>\`<font style="color:rgba(0, 0, 0, 0.85);">U</font>\`<font style="color:rgba(0, 0, 0, 0.85);"> 来表示的，那么就返回 </font>\`<font style="color:rgba(0, 0, 0, 0.85);">U</font>\`<font style="color:rgba(0, 0, 0, 0.85);">；否则返回 </font>\`<font style="color:rgba(0, 0, 0, 0.85);">never</font>\`<font style="color:rgba(0, 0, 0, 0.85);">。通过将 </font>\`<font style="color:rgba(0, 0, 0, 0.85);">typeof add</font>\`<font style="color:rgba(0, 0, 0, 0.85);"> 代入 </font>\`<font style="color:rgba(0, 0, 0, 0.85);">T</font>\`<font style="color:rgba(0, 0, 0, 0.85);">，就可以推断出 </font>\`<font style="color:rgba(0, 0, 0, 0.85);">add</font>\`<font style="color:rgba(0, 0, 0, 0.85);"> 函数的参数类型数组。</font>

<font style="color:rgba(0, 0, 0, 0.85);">extend</font>

<font style="color:rgba(0, 0, 0, 0.85);">继承（约束）</font>

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

## 特殊用法

构造函数约束

\`\`\`html
class User{ loginid:string, loginpwd:string, } function createUser(cls:new() =>
User) :User{ return new cls(); }
\`\`\`

# 应用

## 可辨识的联合类型

错误写法

\`\`\`typescript
type Shape = {
  kind: "circle" | "rect";
  radius?: number;
  width?: number;
  height?: number;
};

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // error shape.radius可能未定义
    case "rect":
      return shape.width * shape.height; // error shape.width，shape.height可能未定义
  }
}
\`\`\`

正确写法

\`\`\`typescript
type Circle = { kind: "circle"; radius: number };
type Rect = { kind: "rect"; width: number; height: number };
type Shape = Circle | Rect;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rect":
      return shape.width * shape.height;
  }
}
\`\`\`
`;export{n as default};
