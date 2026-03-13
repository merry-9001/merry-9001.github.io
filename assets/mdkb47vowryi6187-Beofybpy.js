const n=`---
title: three.js
urlname: mdkb47vowryi6187
date: 2024-12-19 10:42:54 +0800
tags: []
description: three.js是一个基于webgl的3D图形编程框架3d场景需要的东西1. 场景（screen）【创建场景】2. 相机
  （camera）【远景相机，正交相机】	3. 渲染器 （renderer）	4.
  几何图形（geometry）【创建几何图形】5.光（light）【光源】6.材质()//创...
image: ''
categories: []
---

three.js是一个基于webgl的3D图形编程框架

3d场景需要的东西

1. 场景（screen）【创建场景】

2. 相机 （camera）【远景相机，正交相机】

3. 渲染器 （renderer）

4. 几何图形（geometry）【创建几何图形】

5.光（light）【光源】

6.材质()

\`\`\`javascript
//创建相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000,
);
//创建场景
const scene = new THREE.Scene();
//创建渲染器
const renderer = new THREE.WebGLRenderer();
//设置区域
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
\`\`\`

\`\`\`javascript
// 创建一个立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 添加材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建一个网孔(Mesh)。网孔是用来承载几何模型的一个对象，还可以把材料应用到它上面，然后添加到场景中完成旋转动画。
const cube = new THREE.Mesh(geometry, material);
// 把网孔添加到场景中
scene.add(cube);
// 当我们调用 scene.add() 时，对象将被添加到原点处，即坐标点(0,0,0)，这将导致相机和立方体发生空间重叠。为了避免这样，我们把相机（camera）的位置移出来一些。
camera.position.z = 5;
\`\`\`
`;export{n as default};
