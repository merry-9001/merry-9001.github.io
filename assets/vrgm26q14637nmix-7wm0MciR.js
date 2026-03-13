const e=`---
title: gulp
urlname: vrgm26q14637nmix
date: 2024-11-14 18:26:19 +0800
tags: []
description: '通过esbuild去打包，再通过gulp流传输,指定task，形成任务队列gulp dev的时候监控文件的改变通过vue
  serve可以用来测试，打开一个单页组件"test:Pager": "vue serve
  ./src/components/Pager/test.vue",gulp的打包由...'
image: https://cdn.nlark.com/yuque/0/2024/png/22718987/1725521176492-41fa6b21-58c2-441f-9be8-604aadb94d92.png
categories: []
---

通过esbuild去打包，再通过gulp流传输,指定task，形成任务队列

gulp dev的时候监控文件的改变

通过vue serve可以用来测试，打开一个单页组件

\`\`\`javascript
"test:Pager": "vue serve ./src/components/Pager/test.vue",
\`\`\`

gulp的打包由gulpfile.js来当配置文件

打包步骤：

1.清空当前的文件夹（utils或者ui）

2.根据命令是否为dev判断打包成开发模式还是生产模式

纯函数

开发模式：sourcemaps，通过ts.config去打包成js

生产模式：通过ts.config去打包成js

vue组件

开发模式：通过gulp-esbuild打包，设置sourcemaps，设置混淆，引入一些第三方插件(element-plus,axios,打包模式，平台)

生产模式：通过gulp-esbuild打包，引入一些第三方插件(element-plus,axios,打包模式，平台)

3.复制package.json文件进入打包

gulp命令

task:任务

series:队列，去顺序执行

打包配置

\`\`\`typescript
import { source, dist } from "../config";
import { task, watch, series, parallel, src, dest } from "gulp";
import * as clean from "gulp-clean";
import { createProject } from "gulp-typescript";
import * as esbuild from "gulp-esbuild";
import * as terser from "gulp-terser";
import * as sourcemaps from "gulp-sourcemaps";
import * as log from "fancy-log";
const pluginVue = require("esbuild-plugin-vue-next");

const tsPackages = ["utils"];
const vuePackages = ["ui"];
const outputWithoutDist = ["bootstrap", "utils"];

const distId = process.argv.indexOf("--dist");
const outdir = distId > 0 ? process.argv[distId + 1] || dist : dist;
console.log("outdir", outdir);

function buildTsPackage(packageName: string) {
  const distDir = outputWithoutDist.includes(packageName) ? "" : "dist";
  const project = createProject(\`\${source}/\${packageName}/tsconfig.json\`);
  return project
    .src()
    .pipe(project())
    .pipe(dest(\`\${outdir}/\${packageName}/\${distDir}\`));
}

function buildTsPackageDev(packageName: string) {
  const distDir = outputWithoutDist.includes(packageName) ? "" : "dist";
  const project = createProject(\`\${source}/\${packageName}/tsconfig.json\`);
  return project
    .src()
    .pipe(sourcemaps.init())
    .pipe(project())
    .pipe(
      sourcemaps.mapSources(
        (sourcePath: string) => "./" + sourcePath.split("/").pop(),
      ),
    )
    .pipe(sourcemaps.write(".", {}))
    .pipe(dest(\`\${outdir}/\${packageName}/\${distDir}\`));
}

function buildVuePackage(packageName: string) {
  const distDir = outputWithoutDist.includes(packageName) ? "" : "dist";
  return src([
    \`\${source}/\${packageName}/**/*.ts\`,
    \`\${source}/\${packageName}/**/*.vue\`,
    \`!\${source}/\${packageName}/**/*.d.ts\`,
  ])
    .pipe(
      esbuild({
        outfile: "index.js",
        bundle: true,
        format: "esm",
        platform: "node",
        plugins: [pluginVue()],
        sourcemap: false,
        external: ["vue", "element-plus", "uuid", "axios"],
      }),
    )
    .pipe(
      terser({
        mangle: {
          toplevel: true,
          eval: true,
        },
      }),
    )
    .pipe(dest(\`\${outdir}/\${packageName}/\${distDir}\`));
}

function buildVuePackageDev(packageName: string) {
  const distDir = outputWithoutDist.includes(packageName) ? "" : "dist";
  return src(\`\${source}/\${packageName}/src/index.ts\`)
    .pipe(
      esbuild({
        outfile: "index.js",
        bundle: true,
        format: "esm",
        platform: "node",
        plugins: [pluginVue()],
        sourcemap: true,
        external: ["vue", "element-plus", "uuid", "axios"],
      }),
    )
    .pipe(dest(\`\${outdir}/\${packageName}/\${distDir}\`));
}

function cleanPackage(packageName: string) {
  return src([\`\${outdir}/\${packageName}/*\`], { read: false }).pipe(clean());
}

function copyPackageJson(packageName: string) {
  return src(\`\${source}/\${packageName}/package.json\`).pipe(
    dest(\`\${outdir}/\${packageName}\`),
  );
}

tsPackages.forEach((packageName) => {
  task(
    packageName,
    series(
      () => cleanPackage(packageName),
      () => buildTsPackage(packageName),
      () => copyPackageJson(packageName),
    ),
  );
  task(
    \`\${packageName}:dev\`,
    series(
      () => cleanPackage(packageName),
      () => buildTsPackageDev(packageName),
      () => copyPackageJson(packageName),
    ),
  );
});

vuePackages.forEach((packageName) => {
  task(
    packageName,
    series(
      () => cleanPackage(packageName),
      () => buildVuePackage(packageName),
      () => copyPackageJson(packageName),
    ),
  );
  task(
    \`\${packageName}:dev\`,
    series(
      () => cleanPackage(packageName),
      () => buildVuePackageDev(packageName),
      () => copyPackageJson(packageName),
    ),
  );
});

//默认任务：监控文件自动进行build:dev
function defaultTask() {
  log.info("Watching files..");
  tsPackages.concat(vuePackages).forEach((packageName) => {
    watch(
      [
        \`\${source}/\${packageName}/**/*.ts\`,
        \`\${source}/\${packageName}/*.ts\`,
        \`\${source}/\${packageName}/**/*.vue\`,
        \`\${source}/\${packageName}/*.vue\`,
      ],
      series(\`\${packageName}:dev\`),
    );
  });
}
task("default", defaultTask);
\`\`\`
`;export{e as default};
