const e=`---
title: vite配置
urlname: bqe2uhrfbypgsriv
date: 2024-10-22 21:09:40 +0800
tags: []
description: import { defineConfig, UserConfigExport } from 'vite'; import vue
  from '@vitejs/plugin-vue'; import VueSetupExtend from
  'vite-plugin-vue-setup-exte...
image: ''
categories: []
---

\`\`\`javascript
import { defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import path from 'path';

export default defineConfig({
  base: './',
  //插件
  plugins: [
    vue(), //识别vue文件
    VueSetupExtend(), //解决了 Vue3 中setup函数写法下无法直接使用组件options属性
    AutoImport({ //自动导入vue api
      resolvers: [ElementPlusResolver()]
    }),
    Components({ //按需导入组件
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ]
    }),
    Icons({
      compiler: "vue3",
      autoInstall: true,
      customCollections: {
        "ven-icon": FileSystemIconLoader("src/assets/icons/ven-icon", svg => svg.replace(/^<svg /, "<svg fill=\\"currentColor\\" ")),  // 自定义本地图标示例
      },
    }),
  ],
  //优化
  optimizeDeps: {
    //设置需要依赖预构建（可能没识别到，但是需要的库）
    include: ['schart.js'],

    //设置不需要依赖预构建（能识别到，但不需要预构建）
    exclude: ['element-plus/es/components/popconfirm/style/index', 'element-plus/es/components/tabs/style/index',
      'element-plus/es/components/image/style/index', 'element-plus/es/components/tag/style/index', 'element-plus/es/components/input-number/style/index',
      'element-plus/es/components/radio-button/style/index',
      'element-plus/es/components/tab-pane/style/index', 'element-plus/es/components/rad', 'element-plus/es/components/link/style/index'
    ]
  },
  //别名
  resolve: {
    alias: {
      "@": path.join(__dirname, './src'),
    },
  },
  //打包配置
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue'],
          'vue-router': ['vue-router'],
          'element-plus': ['element-plus']
        }
      }
    },
    outDir: "dist/client",
    chunkSizeWarningLimit: 1000,
  },
  //开发服务器配置
  server: {
    host: "0.0.0.0",
    port: 3456,
    hmr: {
      port: 3456
    },
  }
} as UserConfigExport);

\`\`\`

\`\`\`javascript
import { version } from '../package.json';
import { basename, join } from 'path';
import fs from 'fs';
import { copyFile, mkdir, readdir, rm, stat } from 'fs/promises';
import yazl from 'yazl';

async function copyDirectory(source: string, destination: string) {
  try {
    await mkdir(destination, { recursive: true }); // create destination folder
    const files = await readdir(source); // read files from source folder

    for (const file of files) {
      const sourceFilePath = join(source, file);
      const destinationFilePath = join(destination, file);

      const fileStat = await stat(sourceFilePath); // get file stats

      if (fileStat.isDirectory()) { // if file is directory, copy recursively
        await copyDirectory(sourceFilePath, destinationFilePath);
      } else { // if file is file, copy file
        await copyFile(sourceFilePath, destinationFilePath);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

const zipFolder = async (sourceFolderPath: string, zipFilePath: string) => {
  const zipFile = new yazl.ZipFile();

  // 递归遍历要压缩的文件夹，并将每个文件添加到zip文件中
  async function addFolderToZip(folderPath: string, relativePath: string) {
    // 读取文件夹下的所有文件和子文件夹
    const files = await readdir(folderPath);
    for (const file of files) {
      const filePath = \`\${folderPath}/\${file}\`;
      const fileStat = await stat(filePath);
      if (fileStat.isFile()) {
        // 如果是文件，则添加到zip文件中
        zipFile.addFile(filePath, \`\${relativePath}/\${file}\`);
      } else if (fileStat.isDirectory()) {
        // 如果是文件夹，则递归调用addFolderToZip函数，添加文件夹下的所有文件
        await addFolderToZip(filePath, \`\${relativePath}/\${file}\`);
      }
    }
  }
  const folderName = basename(sourceFolderPath);
  await addFolderToZip(sourceFolderPath, folderName);

  return new Promise((resolve, reject) => {
    // 将zip文件写入磁盘
    zipFile.outputStream.pipe(fs.createWriteStream(zipFilePath))
      .on('error', (error) => {
        reject(error);
      })
      .on('finish', async () => {
        resolve('');
      })
    // 完成zip文件的创建
    zipFile.end();
  })
}


const toZip = async () => {
  console.log('开始打包')
  const distDir = join(process.cwd(), 'dist');
  const sourceDir = join(distDir, 'client');
  const buildDir = join(distDir, \`client-\${version}\`);
  await copyDirectory(sourceDir, buildDir);
  await zipFolder(buildDir, join(distDir, \`client-\${version}.zip\`));
  await rm(buildDir, { recursive: true });
  console.log('打包完成');
}

toZip();
\`\`\`

\`\`\`javascript
// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  process.env.NODE_ENV = command === "build" ? "production" : "development";
  return {
    root: join(__dirname, "src/renderer"),
    plugins: [
      replaceCodePlugin({
        replacements: [
          {
            from: "__DEBUGGER__",
            to: debuggerCode,
          },
        ],
      }),
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => {
              return ["feDistantLight", "webview"].includes(tag);
            },
          },
        },
      }),
      legacy({
        ignoreBrowserslistConfig: true,
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        renderLegacyChunks: false,
        modernPolyfills: [
          "es.array.flat-map",
          "es.array.at",
          "esnext.global-this",
        ],
      }),
      vueJsx(),
      viteExternalsPlugin(
        {
          "@vue/devtools": "Empty",
        },
        { disableInServe: true },
      ),
      //electron打包配置
      VitePluginBuilder(vitePluginBuilderOptions),
      AutoImport({
        resolvers: [
          IconsResolver({
            alias: {
              ven: "ven-icon",
            },
            customCollections: ["ven-icon"], //  使用自定义本地图标需要定义集合名称
          }),
        ],
      }),
      Components({
        dirs: ["./b2/", "./views/", "./components"],
        resolvers: [
          // ElementPlusResolver({
          //   importStyle: "sass",
          // }),
          // 在这里（https://icones.js.org/collection/ep）找图标，目前引入了以下几个图标库：
          // Element Plus, Ant Design, Unicons, Prime
          IconsResolver({
            alias: {
              ven: "ven-icon",
            },
            customCollections: ["ven-icon"], //  使用自定义本地图标需要定义集合名称
          }),
        ],
        dts: true,
      }),
      Icons({
        compiler: "vue3",
        autoInstall: true,
        customCollections: {
          "ven-icon": FileSystemIconLoader(
            "src/renderer/assets/icons/ven-icon",
            (svg) => svg.replace(/^<svg /, '<svg fill="currentColor" '),
          ), // 自定义本地图标示例
        },
      }),
    ],
    optimizeDeps: {
      exclude: [
        "element-plus/es/components/popconfirm/style/index",
        "element-plus/es/components/tabs/style/index",
        "element-plus/es/components/image/style/index",
        "element-plus/es/components/tag/style/index",
        "element-plus/es/components/input-number/style/index",
        "element-plus/es/components/radio-button/style/index",
        "element-plus/es/components/select-v2/style/index",
        "element-plus/es/components/progress/style/index",
        "element-plus/es/components/pagination/style/index",
        "element-plus/es/components/tab-pane/style/index",
        "element-plus/es/components/rad",
        "element-plus/es/components/link/style/index",
      ],
    },
    resolve: {
      alias: {
        "@common": join(__dirname, "src/common"),
        "@main": join(__dirname, "src/main"),
        "@renderer": join(__dirname, "src/renderer"),
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(packageConfig.version),
    },
    base: "./",
    publicDir: outputPublic,
    build: {
      rollupOptions: {
        input: {
          main: join(__dirname, "/src/renderer/index.html"),
          webshare: join(__dirname, "src/renderer/webshare.html"),
          screencast: join(__dirname, "src/renderer/screencast.html"),
        },
      },
      outDir: join(outputApp, "renderer"),
      emptyOutDir: true,
      // sourcemap: "inline",
    },
    css: {
      devSourcemap: true,
    },
    server: {
      host: "0.0.0.0",
      port: 3456,
      hmr: {
        port: 3456,
      },
    },
  };
});
\`\`\`
`;export{e as default};
