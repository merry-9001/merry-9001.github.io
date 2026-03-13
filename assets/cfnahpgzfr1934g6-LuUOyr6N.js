const n=`---
title: 包发布
urlname: cfnahpgzfr1934g6
date: 2025-03-11 15:40:12 +0800
tags: []
description: 准备工作移除淘宝镜像源到npm官网注册一个账号，并完成邮箱认证本地使用 npm cli 进行登录 使用命令npm
  login登录使用命令npm whoami查看当前登录的账号使用命令npm logout注销创建工程根目录使用npm
  init进行初始化//查询当前使用的镜像源 npm confi...
image: https://cdn.nlark.com/yuque/0/2025/png/22718987/1741679029047-bddc5686-be1c-474c-99a8-a8cb199ab0c8.png
categories: []
---

### 准备工作

1. 移除淘宝镜像源
2. 到npm官网注册一个账号，并完成邮箱认证
3. 本地使用 npm cli 进行登录
   1. 使用命令\`npm login\`登录
   2. 使用命令\`npm whoami\`查看当前登录的账号
   3. 使用命令\`npm logout\`注销
4. 创建工程根目录
5. 使用npm init进行初始化

\`\`\`javascript
//查询当前使用的镜像源
npm config get registry

//设置为淘宝镜像源
npm config set registry https://registry.npmmirror.com/

//还原为官方镜像源
npm config set registry https://registry.npmjs.org/

\`\`\`

### 发布

1. 开发
2. 确定版本
3. 使用命令\`npm publish\`完成发布

### 其他

npm profile 相关的指令来获取个人账号相关的信息

npm logout 退出登陆

npm whoami：查看当前登录的用户

###
`;export{n as default};
