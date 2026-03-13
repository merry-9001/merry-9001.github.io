const n=`---
title: SSE
urlname: hlzqr2dyzfwsod32
date: 2026-02-26 16:26:27 +0800
tags: []
description: SSESSE 全称 Server-Sent Events，中文是“服务器发送事件”。是一种基于 HTTP
  的单向通信协议，由浏览器发起连接，服务器可以持续不断地向客户端推送数据。SSE（Server-Sent Events）
  是一种浏览器原生支持的、单向的流式通信协议：服务器 → 客户端 持续...
image: ''
categories: []
---

SSE

SSE 全称 Server-Sent Events，中文是“服务器发送事件”。是一种基于 HTTP 的单向通信协议，由浏览器发起连接，服务器可以持续不断地向客户端推送数据。

SSE（Server-Sent Events） 是一种浏览器原生支持的、单向的流式通信协议：

服务器 → 客户端 持续不断推送数据（比如：消息、token、进度）

它基于 HTTP 协议，使用 MIME 类型 text/event-stream。

核心特性

单向通信：只能从服务端推送到客户端（不能反向）

基于 HTTP/1.x：无需额外协议，浏览器天然支持

保持连接、实时推送：服务端主动发送数据，客户端自动接收

使用场景

流式大模型输出（如 ChatGPT/Ollama）

实时日志、监控信息推送

股票/天气/订单状态实时更新

打字机式的问答机器人

demo

node端

\`\`\`javascript
import express from "express";
import { watch } from "chokidar";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const clients = new Set(); // 存储所有的客户端连接

app.use(express.static(join(__dirname, "public")));

app.get("/mcp", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // 假设现在客户端连接过来，那么这里就给客户端推送一个消息
  res.write("event:connected\\n"); // 事件名
  res.write("data:你已经连接上SSE服务器\\n\\n"); // 推送的数据

  clients.add(res);

  // 在客户端断开连接的时候，会触发 close 事件
  req.on("close", () => {
    clients.delete(res);
  });
});

// 监听目录
const watcher = watch(join(__dirname, "watched"), {
  persistent: true,
  ignoreInitial: true,
});

// 需要在目录发生变化的时候，通知所有的客户端
watcher.on("all", (event, path) => {
  // 将监听到的变化的信息，通知所有的客户端

  // 1. 组装要发送给客户端的信息
  const payload = JSON.stringify({
    event, // 当前资源发生变化 1. 新增 add  2. 删除 unlink  3. 修改 change
    path, // 文件的路径
    time: new Date().toLocaleString(),
  });

  // 2. 通知所有的客户端
  for (const client of clients) {
    client.write(\`event: resource_changed\\n\`);
    client.write(\`data: \${payload}\\n\\n\`);
  }

  console.log(\`【发生了变更】\${event} -> \${path}\`);
});

app.listen(3000, () => {
  console.log(\`服务器已启动, 监听3000端口\`);
});
\`\`\`

客户端

\`\`\`markdown
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>SSE 客户端 Demo</title>
  <style>
    body { padding: 20px; font-family: Arial, sans-serif; }
    #message-container { margin-top: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; min-height: 300px; }
    .message { margin: 5px 0; padding: 8px; background: #f5f5f5; border-radius: 2px; }
    .error { color: red; }
    .info { color: green; }
  </style>
</head>
<body>
  <h1>SSE 实时消息推送 Demo</h1>
  <button id="connectBtn">建立 SSE 连接</button>
  <button id="closeBtn" disabled>关闭 SSE 连接</button>
  <div id="message-container"></div>

  <script>
    // 获取 DOM 元素
    const connectBtn = document.getElementById('connectBtn');
    const closeBtn = document.getElementById('closeBtn');
    const messageContainer = document.getElementById('message-container');
    let eventSource = null; // 存储 SSE 连接实例

    // 向页面添加消息的辅助函数
    function addMessage(content, type = 'normal') {
      const div = document.createElement('div');
      div.className = \`message \${type}\`;
      div.textContent = content;
      messageContainer.appendChild(div);
      // 滚动到最新消息
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // 建立 SSE 连接
    connectBtn.addEventListener('click', () => {
      // 避免重复建立连接
      if (eventSource) {
        addMessage('已存在 SSE 连接，无需重复建立', 'info');
        return;
      }

      // 创建 EventSource 实例，连接到服务端的 SSE 接口
      eventSource = new EventSource('http://localhost:3000/sse');

      // 监听服务器发送的消息（默认事件）
      eventSource.onmessage = (e) => {
        try {
          // 解析 JSON 格式的消息
          const data = JSON.parse(e.data);
          addMessage(\`[\${data.time}] \${data.type}: \${data.content} (计数：\${data.count})\`);
        } catch (err) {
          // 非 JSON 格式的消息直接显示
          addMessage(\`[\${new Date().toLocaleTimeString()}] 服务器消息：\${e.data}\`);
        }
      };

      // 监听连接打开事件
      eventSource.onopen = () => {
        addMessage('SSE 连接已建立', 'info');
        connectBtn.disabled = true;
        closeBtn.disabled = false;
      };

      // 监听错误事件
      eventSource.onerror = (e) => {
        if (eventSource.readyState === EventSource.CLOSED) {
          addMessage('SSE 连接已关闭', 'error');
        } else if (eventSource.readyState === EventSource.CONNECTING) {
          addMessage('SSE 正在重连...', 'error');
        } else {
          addMessage('SSE 连接出错', 'error');
        }
        connectBtn.disabled = false;
        closeBtn.disabled = true;
      };
    });

    // 关闭 SSE 连接
    closeBtn.addEventListener('click', () => {
      if (eventSource) {
        eventSource.close(); // 主动关闭连接
        eventSource = null;
        addMessage('已主动关闭 SSE 连接', 'info');
        connectBtn.disabled = false;
        closeBtn.disabled = true;
      }
    });
  <\/script>
</body>
</html>
\`\`\`
`;export{n as default};
