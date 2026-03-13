const n=`---
title: TS
urlname: klhg7cb6wrg2nui1
date: 2024-11-14 18:08:31 +0800
tags: []
description: unknown与any的区别unknown类型的变量是不能调用方法的（可以保证安全）any就跟没有写类型一样object与Object的区别object代表所有非值类型(非原始类型)的类型，例如
  数组 对象 函数等Object可以给任意值赋值type和interface的区别interface...
image: ''
categories: []
---

## unknown与any的区别

unknown类型的变量是不能调用方法的（可以保证安全）

any就跟没有写类型一样

## object与Object的区别

object代表所有非值类型(非原始类型)的类型，例如 数组 对象 函数等

Object可以给任意值赋值

## type和interface的区别

interface一定以对象的方式开始

\`\`\`css
type Condition = (n: number) = > boolean interface Condition {
  (n:number):boolean;
}
\`\`\`

### <font style="color:rgb(0, 0, 0);">基本定义与语法不同</font>

interface专门用于定义对象类型，type可以定义任何类型

\`\`\`typescript
interface User {
  name: string;
  age: number;
}
\`\`\`

\`\`\`typescript
// 对象类型
type User = {
  name: string;
  age: number;
};

// 基本类型别名
type Age = number;

// 联合类型
type Status = "active" | "inactive" | "deleted";
\`\`\`

### 继承/合并方式不同

interface可以使用extends/implements继承；type用&

> implements是接口，必须要继承才能使用，

\`\`\`css
interface Person{
    run(type:boolean):boolean
}

interface H{
    set():void
}

class A{
    params:string
    constructor(params:string){
        this.params = params
    }
}

//也可以使用继承再使用
class Man extends A implements Person,H{
    run(type:boolean):boolean{
       return type
   }
    set(){
        //啥也没有，这就是用接口去描述类
    }
}
\`\`\`

type如果要扩展类型可以使用 &

\`\`\`css
type s = {
  name: string;
}
& {
  age: number;
}
\`\`\`

### 重复定义处理，interface会合并，type会导致错误

interface

\`\`\`css
interface A{
    name:string | number
}
interface A{
    age:number
}//name跟age会进行合并
\`\`\`

type

\`\`\`css
type Animal = {
  kind: string;
}

// 以下这行代码会导致错误
type Animal = {
  sound: string;
}
\`\`\`

## 介绍一下never类型

never类型通常用于表示不可能出现的情况，它可以用于增强代码的类型安全性和可读性。

当一个变量被推断为never类型时，表示该变量的类型不能是任何其他类型，即不存在任何值与其兼容。

这个类型通用会用于报错

## 如何定义类数组

函数的arguments就是一个类数组

\`\`\`javascript
function test() {
  arguments; //类数组
}
\`\`\`

定义

\`\`\`typescript
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}
\`\`\`
`;export{n as default};
