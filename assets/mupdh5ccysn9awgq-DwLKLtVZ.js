const n=`---
title: react
urlname: mupdh5ccysn9awgq
date: 2024-10-24 20:04:21 +0800
tags: []
description: 介绍react native
  可以进行原生应用开发JSX模版语法vue中通过template来描述页面react通过jsx来描述页面jsx规则根元素只能有一个JSX 中使用
  JavaScript 表达式。表达式写在花括号 {}
image: articles/mupdh5ccysn9awgq/1731150236795-2c108237-2a51-4271-b25a-52fa160a7bee.png
categories: []
---

## 介绍

react native 可以进行原生应用开发

## JSX模版语法

vue中通过template来描述页面

react通过jsx来描述页面

jsx规则

> 根元素只能有一个
>
> JSX 中使用 JavaScript 表达式。表达式写在花括号 {} 中
>
> 属性值指定为字符串字面量，或者在属性值中插入一个 JavaScript 表达式
>
> style 对应样式对象，class 要写作 className
>
> 注释需要写在花括号
>
> JSX 允许在模板中插入数组，数组会自动展开所有成员

jsx是React.createElement函数的语法糖

\`\`\`javascript
function App() {
  return <h1 className="greeting">Hello, world!</h1>;
}

//相当于
function App() {
  return React.createElement("h1", { className: "greeting" }, "Hello, world!");
}
\`\`\`

jsx的本质是一个js对象，而不是一个html（只是看起来比较像）

### vue与react的语法区别

1.vue采用template，react采用jsx来描述视图

2.<template>在 vue中表示空标签,<>在 react表示空标签

3.vue中{{]}表示动态表达式，react用{}

4.vue中template和js逻辑放开，react合并在一起

## react组件

在React 16.8 推出 Hooks 后，现在更多的是使用函数组件了

类组件又称为有状态组件，函数组件称为无状态组件（现在有hooks）

参数是父组件传过来的参数

### 类组件（告别）

#### this绑定

\`\`\`javascript
class App extends React.Component {
  constructor() {
    super();
    // 3. 使用 bind 方法来强制绑定 this 的指向
    this.clickHandle = this.clickHandle.bind(this);
  }

  // 1. 将事件处理函数修改为箭头函数
  // clickHandle=()=>{
  //   console.log(this);
  // }

  clickHandle(str) {
    console.log(str);
  }

  render() {
    return (
      // 2.将事件绑定修改为箭头函数
      // <button onClick={(e)=>this.clickHandle("Hello")}>按钮</button>
      // <button onClick={this.clickHandle}>按钮</button>
      <button onClick={this.clickHandle.bind(this, "Hello222")}>按钮</button>
    );
  }
}
\`\`\`

#### 状态

react默认this.state就是组件的状态

\`\`\`plain
class 类名 extends React.Component{
  constructor(){
    super();

    // 1.设置组件自身的数据状态
    this.state = {
      xxx : xxx
    }
  }

  // 2.设置组件自身的数据状态
  state = {
      xxx : xxx
  }

  render(){
    return (
    	// 通过 {this.state.xxx} 来获取状态数据
    )
  }
}
\`\`\`

不要直接修改状态，而是使用setState

\`\`\`plain
this.setState({
  xxx: 新值
})
\`\`\`

> setState，它对状态的改变，可能是异步的。
>
> 如果改变状态的代码处于某个 HTML 元素的**事件**中，则其是异步的，否则是同步（为了效率，点击以后如果多次修改值，页面上只会重新渲染一次）

要获取异步修改后的数据

\`\`\`plain
this.setState((cur)=>{
  //这个参数就是cur，更新后的数据
})

this.setState({}，（）=>{
  //采用回调函数的方式
})
\`\`\`

最佳实践：

把所有的 setState 当作是异步的

永远不要信任 setState 调用之后的状态

如果要使用改变之后的状态，需要使用回调函数（setState 的第二个参数）

如果新的状态要根据之前的状态进行运算，使用函数的方式改变状态（setState 的第一个函数）

React 会对异步的 setState 进行优化，将多次 setState 进行合并（将多次状态改变完成后，再统一对 state 进行改变，然后触发 render）

#### 参数

\`\`\`plain
class 组件名 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
       // 一段 JSX
    	 // 通过 this.props.xxx 获取传入的值
        <div>
          <p>姓名：{this.props.name}</p>
          <p>年龄：{this.props.age}</p>
          <p>性别：{this.props.gender}</p>
        </div>
     );
	}
}
\`\`\`

通过 props.children，可以实现类似于 Vue 中插槽的功能，例如

\`\`\`plain
class 组件B extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
          {this.props.children}
      </div>
    );
  }
}

class APP extends React.Component {
  render() {
    return (
        <组件B>hello</组件B>
     );
	}
}
\`\`\`

#### 生命周期（类组件独有）

- constructor
  - 同一个组件对象只会创建一次
  - 不能在第一次挂载到页面之前，调用 setState，为了避免问题，构造函数中严禁使用 setState
- render
  - render 是整个类组件中必须要书写的生命周期方法
  - 返回一个虚拟 DOM，会被挂载到虚拟 DOM 树中，最终渲染到页面的真实 DOM 中
  - render 可能不只运行一次，只要需要重新渲染，就会重新运行
  - 严禁使用 setState，因为可能会导致无限递归渲染
- componentDidMount
  - 类似于 Vue 里面的 mounted
  - 只会执行一次
  - 可以使用 setState
  - 通常情况下，会将网络请求、启动计时器等一开始需要的操作，书写到该函数中
- componentWillUnmount
  - 通常在该函数中销毁一些组件依赖的资源，比如计时器

### 函数组件

基于jsx的模板，他把js代码和模板写在一起

#### 函数式编程

函数式编程 把功能或者页面拆至最小

便于复用，便于测试

#### 绑定事件

\`\`\`javascript
function App() {
  function clickHandle(e) {
    console.log(e);
    console.log(e.nativeEvent);
  }

  function eventHandler(str, e) {
    e.preventDefault();
    console.log(str);
  }

  return (
    <>
      <button onClick={clickHandle}>按钮</button>
      <a
        href="https://www.baidu.com/"
        onClick={(e) => eventHandler("Hello333", e)}
      >
        this is a test
      </a>
    </>
  );
}
\`\`\`

#### 参数

\`\`\`javascript
function App(props) {
  return (
    // 一段 JSX
    // 通过 props.xxx 获取传入的值
    <div>
      <p>姓名：{props.name}</p>
      <p>年龄：{props.age}</p>
      <p>性别：{props.gender}</p>
    </div>
  );
}
\`\`\`

#### 验证参数

\`\`\`javascript
function Greeting(props) {
  const { name, age, gender } = props;
  return (
    <div>
      <p>姓名：{name}</p>
      <p>年龄：{age}</p>
      <p>性别：{gender}</p>
    </div>
  );
}
// 设置默认的 props 值，当组件没有传值时会使用默认值
Greeting.defaultProps = {
  name: "xiejie",
  age: 18,
  gender: "male",
};
\`\`\`

#### hooks

解决了以下问题：

1. 告别令人疑惑的生命周期（同样的代码，可能需要在不同的生命周期书写）
2. 告别类组件中烦人的 _this_

- 在类组件中，会存在 _this_ 的指向问题，例如在事件处理函数中，不能直接通过 _this_ 获取组件实例，需要修改 _this_ 指向

3. 告别繁重的类组件，回归前端程序员更加熟悉的函数

> 另外，_Hooks_ 的出现，还有更加重要的一个信号，那就是整个 _React_ 思想上面的转变，从“面向对象”的思想开始转为“函数式编程”的思想。这是编程范式上面的转变。

特点：

1.可以复用状态

使用

只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。

只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。

useState（设置状态）

\`\`\`javascript
import { useState } from "react";

function App(props) {
  let [count, setCount] = useState(0);

  function clickhandle() {
    //设置状态是异步的，第二个回调里面拿到的是状态更新后的值
    setFruit(++count, () => {
      console.log(
        "The fruit has been updated and the component has re - rendered.",
      );
    });
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={clickhandle}>+1</button>
    </div>
  );
}

export default App;
\`\`\`

useEffect

副作用的概念

- 纯函数：一个确切的参数在你的函数中运行后，一定能得到一个确切的值，例如下面的例子：
- 如果一个函数中，存在副作用，那么我们就称该函数不是一个纯函数，所谓副作用，就是指函数的结果是不可控，不可预期。
- 常见的副作用有发送网络请求、添加一些监听的注册和取消注册，手动修改 _DOM_，以前我们是将这些副作用写在生命周期钩子函数里面，现在就可以书写在 _useEffect_ 这个 _Hook_ 里面

useEffect的执行时机

当页面发生渲染,请求等会重新运行这个函数

使用

\`\`\`javascript
import { useState, useEffect } from "react";

function App() {
  let [count, setCount] = useState(0);

  useEffect(() => {
    // 书写你要执行的副作用，会在组件渲染完成后执行
    // 并且页面每次修改都会重新触发里面的函数
    document.title = \`你点击了\${count}次\`;
  });

  function clickhandle() {
    setCount(++count);
  }

  return (
    <div>
      <div>你点击了{count}次</div>
      <button onClick={clickhandle}>+1</button>
    </div>
  );
}

export default App;
\`\`\`

执行清理工作

useEffect返回一个函数会在下一次渲染之后，但是在执行副作用操作之前执行

\`\`\`javascript
import { useState, useEffect } from "react";

function App() {
  let [count, setCount] = useState(0);

  useEffect(() => {
    // 书写你要执行的副作用，会在组件渲染完成后执行
    const stopTimer = setInterval(() => {
      console.log("Hello");
    }, 1000);
    // console.log("副作用函数执行了");

    // 在 useEffect 中，可以返回一个函数，该函数我们称之为清理函数（一般就是做一些清理操作）
    // 该函数会在下一次渲染之后，但是在执行副作用操作之前执行
    return () => {
      // console.log("清理函数执行了");
      clearInterval(stopTimer);
    };
  });

  function clickhandle() {
    setCount(++count);
  }

  return (
    <div>
      <div>你点击了{count}次</div>
      <button onClick={clickhandle}>+1</button>
    </div>
  );
}

export default App;
\`\`\`

设置副作用的依赖项

\`\`\`javascript
import { useState, useEffect } from "react";

function App() {
  let [count1, setCount1] = useState(0);
  let [count2, setCount2] = useState(0);
  let [count3, setCount3] = useState(0);

  useEffect(() => {
    console.log("执行副作用函数");
  }, [count1]);

  //如果写一个空数组，表示只会执行一次
  useEffect(() => {
    console.log("执行副作用函数");
  }, []);

  return (
    <div>
      <div>count1:{count1}</div>
      <div>count2:{count2}</div>
      <div>count3:{count3}</div>
      <button onClick={() => setCount1(++count1)}>+1</button>
      <button onClick={() => setCount2(++count2)}>+1</button>
      <button onClick={() => setCount3(++count3)}>+1</button>
    </div>
  );
}

export default App;
\`\`\`

## React-router

### 使用

index.js

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
\`\`\`

app.js

\`\`\`javascript
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Add from "./components/Add";

import "./css/App.css";

function App() {
  return (
    // 最外层容器
    <div id="app" className="container">
      {/* 导航栏 */}
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="navbar-brand">学生管理系统</div>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <NavLink to="/home" className="navigation">
                主页
              </NavLink>
              <NavLink to="/about" className="navigation">
                关于我们
              </NavLink>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <NavLink to="/add" className="navigation">
                添加用户
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
      {/* 匹配上的路由所对应的组件显示在这个位置 */}
      <div className="content">
        <Routes>
          {/* 在 route 组件中书写你对应的路由，以及路由所对应的组件 */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<Add />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
\`\`\`

### 组件

- BrowserRouter：整个前端路由以 history 模式开始，包裹根组件
- HashRouter：整个前端路由以 hash 模式开始，包裹根组件
- Routes：类似于 v5 版本的 Switch，主要是提供一个上下文环境
- Route：在 Route 组件中书写你对应的路由，以及路由所对应的组件
  - path：匹配的路由
  - element：匹配上该路由时，要渲染的组件
- Navigate：导航组件，类似于 useNavigate 的返回值函数，只不过这是一个组件
- NavLink：类似于 Link，最终和 Link 一样，会被渲染为 a 标签，注意它和 Link 的区别，实际上就是当前链接，会有一个名为 active 的激活样式，所以一般用于做顶部或者左侧导航栏的跳转

### Hooks

- useLocation：获取到 location 对象，获取到 location 对象后，我们可以获取 state 属性，这往往是其他路由跳转过来的时候，会在 state 里面传递额外的数据
- useNavigate：调用之后会返回一个函数，通过该函数可以做跳转。
- useParams：获取动态参数

## React-redux

### 使用

app.jsx

\`\`\`javascript
import { Provider } from "react-redux";

// 引入仓库
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
\`\`\`

store.jsx

\`\`\`javascript
// 引入创建仓库的方法
import { configureStore } from "@reduxjs/toolkit";
import todolistReducer from "./todolistSlice";

// 调用该方法时，传入一个配置对象
// 其中一个选项是配置 reducer
export default configureStore({
  reducer: {
    todo: todolistReducer,
  },
});
\`\`\`

仓库

\`\`\`javascript
import { createSlice } from "@reduxjs/toolkit";

export const todolistSlice = createSlice({
  // 切片的命名空间
  name: "todolist",
  // 初始化仓库数据
  initialState: {
    list: [
      {
        content: "学习 React",
        status: false,
      },
      {
        content: "复习 Vue",
        status: false,
      },
      {
        content: "玩游戏",
        status: false,
      },
      {
        content: "听歌",
        status: false,
      },
    ],
  },
  // reducers
  reducers: {
    /**
     *
     * @param {*} state 上一次的仓库数据
     * @param {*} param1 传递过来的数据
     */
    add: (state, { payload }) => {
      // 允许你的直接修改 state
      // 如果你去阅读 redux-toolkit 的源码
      // 你会发现底层使用到了 immer.js 这个库
      state.list.push({
        content: payload,
        status: false,
      });
    },
    del: (state, { payload }) => {
      state.list.splice(payload, 1);
    },
    change: (state, { payload }) => {
      state.list[payload].status = !state.list[payload].status;
    },
  },
});

export const { add, del, change } = todolistSlice.actions;

export default todolistSlice.reducer;
\`\`\`

使用

\`\`\`javascript
import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../redux/todolistSlice";

function Input() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  function clickHandle() {
    // 将用户填写的内容提交到仓库
    // dispatch 方法会派发一个 action 对象到 reducer 里面
    // addListAction(value) ===> { type : ADD, data : value}
    // 这个就是我们的 action 描述对象，该对象会被 dispatch（派发）到 reducer 里面
    // props.store.dispatch(addListAction(value));

    // 之前使用纯 redux 的时候，dispatch 是通过 store 拿到的
    // 现在是通过 useDispatch 来拿到
    dispatch(add(value));
  }

  return (
    <div className="form-inline">
      <input
        type="text"
        className="form-control"
        placeholder="请输入待办事项"
      />
      <button className="btn btn-primary" onClick={clickHandle}>
        提交
      </button>
    </div>
  );
}

export default Input;
\`\`\`

### hooks

useDispatch 修改仓库数据

useSelector 获取仓库数据

useStore

## umi

### dva（过去式）

dva = React-Router + Redux + Redux-saga

### umi

Umi.js是由蚂蚁金服所推出的基于 React 的前端框架，它和前面所介绍的 Dva、Antd pro 之间的关系是包含关系，也就是说整个 Umi 是一个集大成的框架，这从官方给出的插图也能看出来：

![](articles/mupdh5ccysn9awgq/1732181516219-41814366-afac-4ab0-8cab-1c55d03f98af.png)

特点：

- 约定式路由
- 插件机制
- 构建时配置和运行时配置

使用react现在都使用umi去搭建框架

他里面集成了react+react-router+react-redux+Ant Design Pro(可选，组件模板)

## 技术栈

ant-design(页面模版) + antd(组件) + umi(集成redux和router) + react

## vscode插件

![](articles/mupdh5ccysn9awgq/1731150236795-2c108237-2a51-4271-b25a-52fa160a7bee.png)
`;export{n as default};
