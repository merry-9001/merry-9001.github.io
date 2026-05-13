const n=`---
title: 多包管理（monorepo）
urlname: bmknaqvmaa84v5fz
date: 2025-04-05 11:06:13 +0800
tags:
  - 博客文章
description: 介绍什么是包被包管理器（npm、yarn、pnpm）初始化之后的目录，会存在一个包描述文件package.json，那么这样的目录就被称之为包。什么是库被版本控制系统（svn、git）初始化之后的目录，例如使用
  git 进行初始化之后，会存在一个 .git 的目录。包管理方案多仓管理（Mult...
image: https://cdn.nlark.com/yuque/0/2025/png/22718987/1757920365236-d5b9a35f-b1a7-444c-951e-cc9d0c23c40b.png
categories: []
---

# 介绍

## 什么是包

被包管理器（npm、yarn、pnpm）初始化之后的目录，会存在一个包描述文件**package.json**，那么这样的目录就被称之为包。

## 什么是库

被版本控制系统（svn、git）初始化之后的目录，例如使用 git 进行初始化之后，会存在一个 .git 的目录。

## 包管理方案

1. 多仓管理（Multirepo）：一个包对应一个仓库，多个包对应多个仓库
2. 单仓管理（Monorepo）：无论是一个包还是多个包，都对应一个仓库

![](articles/bmknaqvmaa84v5fz/1743822492787-dfb54b3a-ca29-414a-9894-b95064b825e0.png)

monorepo就是一个仓库，多个包混合

### 优势

统一的依赖管理

简化代码共享

更容易进行跨项目更改

更好的跨团队协作

![](articles/bmknaqvmaa84v5fz/1743822593962-e82b607a-4a8a-4335-ae13-c4a417fbd695.png)

### 缺点

1. 代码库规模较大
2. 缺乏独立版本控制
3. 权限和安全性问题
4. 工具和基础设施要求

### 什么时候用

1. 项目之间有很多共享代码和资源的时候
2. 当团队需要进行跨项目协作的时候
3. 统一多个包的依赖非常重要的时候

## Monorepo和Multirepo对比

所谓 Multirepo，就是不同项目和库存储在各自独立的代码库中的策略。

下表是两种代码管理策略的各方面对比：

|          | Monorepo                                                              | Multirepo                                                |
| -------- | --------------------------------------------------------------------- | -------------------------------------------------------- |
| 开发     | 只需要在一个仓库中开发                                                | 仓库体积小，模块划分清晰                                 |
| 复用     | 代码复用高，方便进行代码重构                                          | 需要多个仓库来回切换，无法实现跨项目代码复用             |
| 工程配置 | 所有项目统一使用相同配置                                              | 各个项目可能有一套单独标准                               |
| 依赖管理 | 共同依赖可提升至root，版本控制更加容易，依赖管理更加方便              | 不同项目中会存在相同的依赖，并且依赖会存在版本不同的情况 |
| 代码管理 | 代码全在一个仓库，项目太大用 git 管理会存在问题，无法隔离项目代码权限 | 各个团队可以控制代码权限，也几乎不会有项目太大的问题     |

# 使用方式

## pnpm+workspace

workspace(工作空间)：工作空间就是一个管理多个包的环境，它通过独特的依赖管理方式极大地提高了效率。pnpm 的工作空间支持符号链接和硬链接机制，使得不同包之间能够高效地共享依赖，同时保证每个包的独立性。

有了pnpm+workspace后，一些都需要的依赖就可以装在workspace中统一管理

外层的package.json用来依赖一些架构层面的东西比如vite typescript vue-tsc等等（这些也是公共的，内层可以不用在package.json中定义）

内层的package.json一般依赖axios，vue，单独管理。（调用内层的script时他也能读到外层的node_modules）

## 一般结构

\`\`\`plain
person-monorepo/
  apps/
    web/          React + Vite 前端应用
    api/          NestJS 后端应用

  packages/
    components/   共享 React 组件库
    utils/        共享工具函数和类型

  package.json
  pnpm-workspace.yaml
  pnpm-lock.yaml
  tsconfig.base.json
  node_modules/
\`\`\`

核心分工：

- \`<font style="background-color:rgba(255, 255, 255, 0.1);">apps/*</font>\`：真正会启动、部署、运行的应用。
- \`<font style="background-color:rgba(255, 255, 255, 0.1);">packages/*</font>\`：被应用引用的共享包。
- 根目录：管理整个 workspace 的依赖、脚本、锁文件和公共配置。

也就是说，\`<font style="background-color:rgba(255, 255, 255, 0.1);">apps/web</font>\` 和 \`<font style="background-color:rgba(255, 255, 255, 0.1);">apps/api</font>\` 是产品应用，\`<font style="background-color:rgba(255, 255, 255, 0.1);">packages/components</font>\` 和 \`<font style="background-color:rgba(255, 255, 255, 0.1);">packages/utils</font>\` 是内部 npm 包。

注意：pnpm-lock.yaml只会在根目录，整个仓库共用一份 pnpm-lock.yaml，包内的依赖关系会被放到根目录来处理

![](articles/bmknaqvmaa84v5fz/1777540173101-d8c55c78-422d-4e3e-b8c7-37e8d2412873.png)

## pnpm-workspace.yaml（确定workspace的应用空间）

\`\`\`javascript
packages:
  # packages/ 下所有子包，但是不包括子包下面的包
  - 'packages/*'
  # components/ 下所有的包，包含子包下面的子包
  - 'components/**'
  # 排除 test 目录
  - '!**/test/**'
\`\`\`

## 把依赖安装到 workspace 根目录（root package.json）

\`\`\`markdown
pnpm add <包名> -w
\`\`\`

## 安装工作空间中导出的依赖

\`\`\`markdown
pnpm add <包名B> --workspace --filter <包名A>

--filter <包名A> //只在 包 A 上执行这条命令
--workspace //优先使用 workspace 内的包（如果有的话）
\`\`\`

> 包名就是package.json中的name字段

这个依赖不是从 npm 下载的，而是直接使用当前 monorepo 里的本地包。

\`\`\`json
{
  "dependencies": {
    "@repo/utils": "workspace:*"
  }
}
\`\`\`

## 命令

| 对比点       | \`-w\`   | \`--filter\` |
| ------------ | ------ | ---------- |
| 安装位置     | root   | 指定子包   |
| package.json | 根目录 | 子包       |
| 使用场景     | 工具链 | 业务依赖   |
| 是否精确控制 | ❌     | ✅         |

## 脚本

\`--parallel\` = **并行执行**

\`**--filter**\`**= 筛选包 **

**-r = recursive 递归执行（按依赖顺序执行）**

\`\`\`json
{
  "scripts": {
    "dev": "pnpm --parallel --filter @repo/web --filter @repo/api dev",
    "dev:web": "pnpm --filter @repo/web dev",
    "dev:api": "pnpm --filter @repo/api dev",
    "build": "pnpm -r build",
    "lint": "pnpm -r lint",
    "typecheck": "pnpm -r typecheck"
  }
}
\`\`\`

## turbo

pnpm workspace：包管理、依赖安装、本地包链接

Turbo：任务编排、依赖顺序、增量构建、缓存复用

项目不用 Turbo 也能跑，因为用 pnpm filter 和 pnpm recursive也可以完成调度。

但当项目变大以后，Turbo 会更有价值。

例如：

- 只重新构建变更影响到的包。
- 缓存上一次 build/typecheck/lint 的结果。
- 自动按照依赖图决定构建顺序。
- CI 里减少重复构建时间。

turbo.json

\`\`\`markdown
{
"$schema": "https://turbo.build/schema.json", // turbo 配置的 JSON schema，用于编辑器提示和校验（可有可无，但推荐加）

"tasks": {
"build": {
"dependsOn": ["^build"], // 关键：在执行当前包 build 前，先执行“依赖它的包”的 build（按依赖拓扑顺序）
"outputs": ["dist/**"] // 指定 build 产物目录（告诉 turbo 哪些文件可以被缓存）
},

    "typecheck": {
      "dependsOn": ["^typecheck"], // 类型检查也按依赖顺序执行（先检查依赖包，再检查当前包）
      "outputs": [] // 没有产物（只是检查），但 turbo 仍然可以基于输入做缓存
    },

    "lint": {
      "outputs": [] // lint 没有产物，不需要缓存文件（只是检查代码规范）
    },

    "dev": {
      "cache": false, // dev 不参与缓存（开发服务器是实时运行的，缓存没意义）
      "persistent": true // 标记为“常驻进程”（比如 vite dev / node dev，不会自动结束）
    }

}
}
\`\`\`

\`\`\`json
{
  "scripts": {
    "dev": "turbo dev --filter=@repo/web --filter=@repo/api",
    "dev:web": "turbo dev --filter=@repo/web",
    "dev:api": "turbo dev --filter=@repo/api",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "format": "prettier --write /"**/*.{ts,tsx,js,json,md,css}/""
  }
}
\`\`\`
`;export{n as default};
//# sourceMappingURL=bmknaqvmaa84v5fz-BMQnuogU.js.map
