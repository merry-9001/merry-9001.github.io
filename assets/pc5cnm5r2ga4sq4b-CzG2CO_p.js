const n=`---
title: ai应用
urlname: pc5cnm5r2ga4sq4b
date: 2026-02-21 16:57:42 +0800
tags: []
description: 概念api调用或者本地部署（ollama）的常见结构Ollama 提供了丰富的模型选型ollama
  list：查看已下载模型ollama show ：显示模型信息ollama pull ：拉取模型ollama run
  ：拉取并且运行模型存在：直接运行模型不存...
image: articles/pc5cnm5r2ga4sq4b/1771664312456-ee6bb615-73a7-47dd-9ecd-77d15128bfa9.png
categories: []
---

## 概念

api调用或者本地部署（ollama）的常见结构

> Ollama 提供了丰富的模型选型
>
> ollama list：查看已下载模型
>
> ollama show <模型名称>：显示模型信息
>
> ollama pull <模型名称>：拉取模型
>
> ollama run <模型名称>：拉取并且运行模型
>
> 存在：直接运行模型
>
> 不存在：先拉取下来，然后运行
>
> ollama run <模型名称> --verbose：查看每次对话后模型执行的效率细节

常见模型调用流程图

![](articles/pc5cnm5r2ga4sq4b/1771664312456-ee6bb615-73a7-47dd-9ecd-77d15128bfa9.png)

## agent

大模型基座本身不具备联网能力，只有静态知识

具备联网、调用工具能力的是 **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">Agent（智能体）</font>**

真实流程是：**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">Agent 先调用实时接口获取数据 → 将数据作为上下文输入大模型 → 大模型基于最新信息生成回答。</font>**

\`\`\`javascript
// 要支持上下文，背后的原理非常简单：
// 拿一个数组来存储会话的历史记录，之后每一次会将历史会话记录一同发给大模型
const conversations = []; // 该数组存储会话记录
/**
 * conversations = [
 *  {role: "user", content: "你是谁"},
 *  {role: "assistant", content: "大模型的回复"},
 * ]
 */

// 工具函数映射表
const toolsMap = {
  getWeather,
  translate,
};

// 注意，需要是一个post请求
router.post("/ask", async (req, res) => {
  // 拿到用户的问题
  const question = req.body.question || "";

  // 首先需要设置一下响应头
  // 告诉客户端这是一个 Server-Sent-Events 流（SSE）
  res.setHeader("Content-Type", "text/event-stream");
  // 禁用缓存，确保每一次获取到的是最新的内容，防止浏览器缓存 SSE 内容
  res.setHeader("Cache-Control", "no-cache");

  // 首先需要大模型来判断是否需要调用工具
  const functionCallPrompt = buildFunctionCallPrompt(question);
  const functionCallResult = await callLLM(functionCallPrompt);

  // functionCallResult 会有两种情况
  // 1. 无函数调用
  // 2. [{"function": "translate", "args": { "input": "我今天很开心" }}]

  let finalResponse = ""; // 存储最终的回复，因为每一次回复需要更新到历史会话里面

  if (functionCallResult.trim() === "无函数调用") {
    // 进入此分支，说明不需要调用函数，就是常规的对话
    const prompt = [
      "你是一个中文智能助手，请严格使用中文来回答用户的问题",
      ...conversations.map(
        (item) => \`\${item.role === "user" ? "用户" : "助手"}：\${item.content}\`,
      ),
      \`用户的问题：\${question}\`,
    ].join("/n");

    finalResponse = await callLLMStream(prompt, (chunk) => {
      res.write(\`\${JSON.stringify({ response: chunk })}/n\`);
    });
  } else {
    // 进入此分支，说明需要调用工具
    try {
      const toolCalls = JSON.parse(functionCallResult); // [{"function": "translate", "args": { "input": "我今天很开心" }}]

      const toolsResult = []; // 存储工具调用的结果
      for (const tool of toolCalls) {
        const { function: functionName, args } = tool;
        if (toolsMap[functionName]) {
          // 如果有这个工具，那就调用
          try {
            const result = await toolsMap[functionName](args); // 调用工具
            toolsResult.push({
              function: functionName,
              args,
              result,
            });
          } catch (err) {
            console.error(\`\${functionName}工具调用失败☹️\`, err);
            toolsResult.push({
              function: functionName,
              args,
              result: \`工具调用失败☹️：\${err.message}\`,
            });
          }
        } else {
          // 进入此分支，说明不存在这个工具
          console.error(\`\${functionName}工具不存在\`);
          toolsResult.push({
            function: functionName,
            args,
            result: \`未知工具☹️\`,
          });
        }
      }

      // 出了上面的 for 循环后，toolsResult 里面就存储了调用工具的结果
      // 接下来还是需要构建一个提示词
      const answerPrompt = buildAnswerPrompt(question, toolsResult);
      finalResponse = await callLLMStream(answerPrompt, (chunk) => {
        res.write(\`\${JSON.stringify({ response: chunk })}/n\`);
      });
    } catch (err) {
      console.error(\`解析工具的JSON失败☹️：\${err}\`);
    }
  }

  // 将这一次的答案记录到历史会话里面
  conversations.push(
    { role: "user", content: question },
    { role: "assistant", content: finalResponse },
  );

  if (conversations.length > 20)
    conversations.splice(0, conversations.length - 20);

  res.end();
});
\`\`\`

## 流式传输

node端

\`\`\`javascript
const express = require("express");
const router = express.Router();

// 注意，需要是一个post请求
router.post("/ask", async (req, res) => {
  // 拿到用户的问题
  const question = req.body.question || "";

  // 接下来需要将用户问题放入到提示词模板
  const prompt = \`
    你是一个中文智能助手，请使用中文回答用户的问题。
    问题：\${question}
  \`;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt,
      stream: true,
    }),
  });

  // 首先需要设置一下响应头
  // 告诉客户端这是一个 Server-Sent-Events 流（SSE）
  res.setHeader("Content-Type", "text/event-stream");
  // 禁用缓存，确保每一次获取到的是最新的内容，防止浏览器缓存 SSE 内容
  res.setHeader("Cache-Control", "no-cache");

  const reader = response.body.getReader(); // 拿到 Reader 对象
  const decoder = new TextDecoder("utf-8"); // 创建一个 utf-8 的解码器

  while (true) {
    const { done, value } = await reader.read(); // 读取当前块的内容
    if (done) break;

    // 对二进制数据进行解码
    const chunk = decoder.decode(value, { stream: true });
    // chunk = '{"response":"你好"}/n{"response":"，"}/n'

    // 后面就是一些 JS 相关的基操了
    const lines = chunk.split("/n").filter((line) => line.trim());
    // lines = [
    //   '{"response":"你好"}',
    //   '{"response":"，"}',
    //   '{"response":"我是"}',
    //   '{"response":"AI助手"}'
    // ]
    for (const line of lines) {
      try {
        const data = JSON.parse(line); // data = {"response":"你好"}
        if (data.response) {
          // 发送给客户端
          res.write(\`\${JSON.stringify({ response: data.response })}/n\`);
        }
      } catch (e) {
        console.error("JSON解析失败☹️", e.message);
      }
    }
  }
  // 代码来到这里，说明所有的块儿都处理完了
  res.end();
});

module.exports = router;
\`\`\`

client端

\`\`\`vue
async function handleSubmit(){ // 1. 拿到用户输入的内容 const question =
input.value.trim(); if(!question) return; // 2.将用户的消息放入 messages
messages.value.push({ role: 'user', text: question }); // 将输入框清空
input.value = ""; loading.value = true; // 拿到 DOM 元素的最新状态 await
nextTick(); // 让聊天页面做一个滚动 chatBox.value?.scrollTo({ top:
chatBox.value.scrollHeight, behavior: 'smooth' }) // 3. 发送请求到代理服务器
const res = await fetch("/api/ask", { method: "POST", headers: { 'Content-Type':
"application/json"}, body: JSON.stringify({question}) }); // 现在 res 拿到的是流
const reader = res.body?.getReader(); // 先创建一个 reader 对象 if(!reader){
console.error("响应流为空"); loading.value = false; return; } // 创建一个解码器
const decoder = new TextDecoder("utf-8"); let botMessage = ""; //
用于拼接大模型返回的完整消息 const newMessage = reactive({role: 'bot' as const,
text: ''}); // 记录机器人回复的消息 messages.value.push(newMessage);
while(true){ const {done, value} = await reader.read(); if(done) break; //
对于当前读取出来的块儿的数据进行处理 const chunk = decoder.decode(value, {
stream: true}); const lines = chunk.split("/n").filter(line=>line.trim());
for(const line of lines){ try{ const data = JSON.parse(line); // data =
{"response":"你好"} if(data.response){ // 只要开始有数据回来了
if(loading.value){ loading.value = false; // 关闭 loading } botMessage +=
data.response; // 每次回来的数据拼接到之前的数据里面 newMessage.text =
botMessage; // 更新 newMessage } }catch(e){ console.error("JSON解析失败☹️", e);
} } } // 拿到 DOM 元素的最新状态 await nextTick(); // 让聊天页面做一个滚动
chatBox.value?.scrollTo({ top: chatBox.value.scrollHeight, behavior: 'smooth' })
}
\`\`\`

## 支持上下文

想要支持上下文，只需要在node端存储一下数据，一起发给ai

\`\`\`javascript
const express = require("express");
const router = express.Router();

// 要支持上下文，背后的原理非常简单：
// 拿一个数组来存储会话的历史记录，之后每一次会将历史会话记录一同发给大模型
const conversations = []; // 该数组存储会话记录
/**
 * conversations = [
 *  {role: "user", content: "你是谁"},
 *  {role: "assistant", content: "大模型的回复"},
 * ]
 */

// 注意，需要是一个post请求
router.post("/ask", async (req, res) => {
  // 拿到用户的问题
  const question = req.body.question || "";

  // 每一次 prompt 会将历史会话带过去
  const prompt = [
    "你是一个中文智能助手，请使用中文回答用户的问题。",
    // 历史记录
    ...conversations.map(
      (item) => \`\${item.role === "user" ? "用户" : "助手"}：\${item.content}\`,
    ),
    \`用户的问题：\${question}\`,
  ].join("/n");

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt,
      stream: true,
    }),
  });

  // 首先需要设置一下响应头
  // 告诉客户端这是一个 Server-Sent-Events 流（SSE）
  res.setHeader("Content-Type", "text/event-stream");
  // 禁用缓存，确保每一次获取到的是最新的内容，防止浏览器缓存 SSE 内容
  res.setHeader("Cache-Control", "no-cache");

  const reader = response.body.getReader(); // 拿到 Reader 对象
  const decoder = new TextDecoder("utf-8"); // 创建一个 utf-8 的解码器

  let fullResponse = ""; // 用于存储模型这一次的完整回复

  while (true) {
    const { done, value } = await reader.read(); // 读取当前块的内容
    if (done) break;

    // 对二进制数据进行解码
    const chunk = decoder.decode(value, { stream: true });
    // chunk = '{"response":"你好"}/n{"response":"，"}/n'

    // 后面就是一些 JS 相关的基操了
    const lines = chunk.split("/n").filter((line) => line.trim());
    // lines = [
    //   '{"response":"你好"}',
    //   '{"response":"，"}',
    //   '{"response":"我是"}',
    //   '{"response":"AI助手"}'
    // ]
    for (const line of lines) {
      try {
        const data = JSON.parse(line); // data = {"response":"你好"}
        if (data.response) {
          fullResponse += data.response; // 拼接这一次的回答 token 到完整的回复里面
          // 发送给客户端
          res.write(\`\${JSON.stringify({ response: data.response })}/n\`);
        }
      } catch (e) {
        console.error("JSON解析失败☹️", e.message);
      }
    }
  }

  // 将这一次会话记录到历史数组里面
  conversations.push(
    { role: "user", content: question },
    { role: "assistant", content: fullResponse },
  );

  // 限制会话历史的长度，仅保留最近的 20 条消息
  // 在 ChatGPT 或者 Deepseek 这类型的应用中，裁剪历史会话的长度前，会会对之前的会话做一个总结
  if (conversations.length > 20)
    conversations.splice(0, conversations.length - 20);

  // 代码来到这里，说明所有的块儿都处理完了
  res.end();
});

// 用户看到会话的历史记录
router.get("/history", function (req, res) {
  res.json({
    conversations,
  });
});

// 清空会话记录
router.post("/clear", function (req, res) {
  conversations.length = 0;
  res.json({
    message: "对话历史已经清空",
  });
});

module.exports = router;
\`\`\`

## FunctionCalling

如果通过提示词让模型去输出调用工具的话，可能会有的问题：

1. 繁琐：大段大段的提示词，仅仅是为了约束大模型的输出

2. 不标准：每个开发者的提示词的描述千差万别

3. 约束力不高：即便使用了语气最重的提示词，大模型的底层原理决定了它总会有不按照要求回复的情况

Function Calling，通过 JSON Schema 格式来进行标准化的输入，以及标准化的输出

输入

\`\`\`javascript
const tools = [
  {
    type: "function",
    name: "get_weather",
    description: "Get current temperature for provided coordinates in celsius.",
    parameters: {
      type: "object",
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
      },
      required: ["latitude", "longitude"],
      additionalProperties: false,
    },
    strict: true,
  },
];

// 多传入一个参数
const response = await callLLM(messages, toolList, (chunk) => {
  res.write(\`\${JSON.stringify({ response: chunk })}/n\`);
});

if (response.tool_calls) {
  // 进入此分支，说明要调用工具

  const toolResults = []; // 存储工具调用的结果

  //调用参数
  for (const toolCall of response.tool_calls) {
    try {
      // 挨着挨着去调用每一个工具
      const functionName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);

      console.log(functionName, "functionName", typeof functionName);
      console.log(args, "args", typeof args);

      if (toolsMap[functionName]) {
        const result = await toolsMap[functionName](args);
        toolResults.push({
          tool_call_id: toolCall.id,
          role: "tool",
          content: result,
        });
      } else {
        // 说明 toolMaps 不存在当前要调用的工具
        toolResults.push({
          tool_call_id: toolCall.id,
          role: "tool",
          content: \`未知工具\${functionName}\`,
        });
      }
    } catch (err) {
      console.error("工具调用失败☹️", err);
      toolResults.push({
        tool_call_id: toolCall.id,
        role: "tool",
        content: \`工具调用失败☹️\${err.message}\`,
      });
    }
  }

  // 代码来到这里，说明工具调用的环节结束了
  messages.push(
    {
      role: "assistant",
      content: response.content,
      tool_calls: response.tool_calls,
    },
    ...toolResults, // 加入了工具调用的结果
  );
  const finalResponse = await callLLM(messages, toolList, (chunk) => {
    res.write(\`\${JSON.stringify({ response: chunk })}/n\`);
  });

  conversations.push(
    { role: "user", content: question }, // 原始的问题
    // 大模型判断需要调用工具的回复
    {
      role: "assistant",
      content: response.content,
      tool_calls: response.tool_calls,
    },
    // 工具调用的结果
    // 之所以要将工具调用的结果也放入到会话历史里面，是为了之后大模型能够看到之前调用工具的历史
    ...toolResults,
    { role: "assistant", content: finalResponse },
  );
} else {
  // 不需要调用工具
  // 直接记录这一次的会话
  conversations.push(
    { role: "user", content: question },
    { role: "assistant", content: response },
  );
}
\`\`\`

输出

\`\`\`javascript
[
  {
    type: "function_call",
    id: "fc_12345xyz",
    call_id: "call_12345xyz",
    name: "get_weather",
    arguments: '{"latitude":48.8566,"longitude":2.3522}',
  },
];
\`\`\`

## mcp

### 协议层面

**MCP是一套 标准协议，它规定了应用程序之间 如何通信**

如何通信：

通信方式

stdio： 推荐，高效、简洁、本地

http： 可远程

StreamHTTP

SSE

通信格式： 基于JSON-RPC的进一步规范

json-rpc

request

\`\`\`json
{
  "jsonrpc": "2.0",
  "method": "sum",
  "params": {
    "a": 5,
    "b": 6
  },
  "id": 1
}
\`\`\`

response

\`\`\`json
{
  "jsonrpc": "2.0",
  "result": 11,
  "id": 1
}
\`\`\`

基本流程：

1. 初始化 initialize

2. 发现工具 tools/list

3. 工具调用 tools/call

### 应用层面

MCP，全称 Model Context Protocol， 模型上下文协议。 其旨在为AI 应用与外部程序之间建立通信标准，从而使得外部程序可以被部署到任意AI（满足MCP协议）， 也使得AI应用可以使用任意的外部程序（MCP Server）。

MCP 支持 3 种上下文能力：

1. tools：工具

调用函数

2. resources：资源

读取资源(文件)

3. prompts：提示词

输入一个提示词->得到一个更准确的提示词

为什么称之为模型上下文？

无论是工具、资源、提示词，这些信息最终都会作为上下文的一部分，提供给大模型。也就是说，大模型是最终信息的消费者。

### 完整流程

MCP Host: 往往指代AI应用本身，用于发现MCP Server以及其中的工具列表

MCP Client： 用于和MCP Server通信的客户端，往往在Host内部开启，通常情况下，每启动一个MCP Server，就会开启一个MCP Client

1. 在Claude Desk 中打开一个新的聊天窗口

2. Claude查看当前启用了哪些MCP Server

3. Claude（host）为每个MCP Server创建一个Client（在host内部创建很多client用于对MCP server进行连接）

4. 每个Client分别启动各自的MCP Server，并且进行了2次通信，一次是初始化，另外一次是tools/list。

5. 用户在提问的时候，会将工具箱（大模型能够使用的工具）连同问题一起发给大模型

6. 当 LLM 认为当前的问题涉及到工具的时候，会在回复汇总返回一个调用工具的标识

7. 当时机到达时（要调用工具的时候），每个Client负责调用各自的工具并把结果传递给Host

8. Host根据结果处理后续逻辑

![](articles/pc5cnm5r2ga4sq4b/1772264980977-f5c5e326-b459-4bec-a480-78d19f9b309a.png)

## 大模型幻觉

为什么会出现大模型幻觉？

1. 基于统计学习：你给它相应的语料库，它根据你提供的语料库进行学习

2. 训练数据不完整或有偏差

3. 对人类提问的“补全压力”

如何解决大模型幻觉？

1. 提示词工程

2. RAG - 外挂知识库

3. 大模型微调

## <font style="color:rgb(38, 38, 38);">提示词工程</font>

<font style="color:rgb(38, 38, 38);">通过反馈迭代优化，rct构词法，技巧语言来让模型提供更精确的答案</font>

## Rag

全称 Retrieval-Augmented Generation，中文：检索增强生成

![](articles/pc5cnm5r2ga4sq4b/1772272927813-6534b608-9ae4-42ec-ab35-e56215daaf6d.png)

解决的问题：

1. 受限于已有知识库，无法快速新增语料信息
2. 重新训练大模型需要很长的时间

### rag应用架构（原理）

1. 数据索引（Data Indexing）
2. 数据查询（Query）
   1. 检索（Retrieval）
   2. 生成（Generation）

#### 数据索引

1. 加载文档
2. 切分成 chunks
3. 转化为向量嵌入
4. 存入向量数据库

![](articles/pc5cnm5r2ga4sq4b/1772275113483-4dac357b-680e-4f7e-aaaf-ec159f64b145.png)

#### 数据查询

检索

1. 将 Query（用户的问题） 转化为向量
2. 在向量数据库中进行相似度检索（语义检索），相似度的检索，有几种方式
   1. **余弦相似度**
   2. 欧氏距离
   3. 点积
3. 为生成阶段准备检索结果

生成

![](articles/pc5cnm5r2ga4sq4b/1772275034401-746579df-aa65-4508-808d-c7de5820b1a3.png)

### 代码层面（实现）

\`\`\`javascript
/**
 * 将外挂知识库生成对应的向量
 */
async function generateEmbeddings() {
  // 1. 加载外挂知识库
  const buffer = fs.readFileSync("./香蕉手机参数配置.pdf");
  const data = await pdfParse(buffer);

  // 2. 接下来需要对文档进行一个切割
  const paragraphs = data.text
    .split(//n/s*/n/)
    .map((text, idx) => ({
      id: \`chunk-\${idx}\`,
      content: text.trim(),
    }))
    .filter((p) => p.content.length > 20);

  // 3. 将每一块转换为向量
  const withEmbedding = []; // 存储最终转为向量的结果
  for (const p of paragraphs) {
    const embedding = await getEmbedding(p.content);
    withEmbedding.push({
      ...p,
      embedding,
    });
  }

  // 4. 存储到向量数据库
  // 我们这个案例是直接写入到 embeddings.json 文件里面
  fs.writeFileSync(
    EMBEDDING_PATH,
    JSON.stringify(withEmbedding, null, 2),
    "utf8",
  );

  console.log(
    \`生成了 \${withEmbedding.length} 条段落嵌入，并已缓存到 \${EMBEDDING_PATH}\`,
  );

  return withEmbedding;
}

// 加载已经生成好的向量数据内容
async function loadCachedEmbeddings() {
  if (fs.existsSync(EMBEDDING_PATH)) {
    // 说明之前外挂知识库已经生成过对应的向量数据
    // 直接读取即可
    const raw = fs.readFileSync(EMBEDDING_PATH, "utf8");
    return JSON.parse(raw);
  } else {
    // 说明外挂的知识库还没有生成对应的向量数据
    return await generateEmbeddings();
  }
}
\`\`\`

\`\`\`markdown
router.post("/ask", async (req, res) => {
// 做一个外挂知识库的准备，拿到外挂知识库所对应的向量数据
const embeddedDocs = await loadCachedEmbeddings();

// 拿到用户的问题
const question = req.body.question || "";

// 需要将用户的问题放到向量数据库里面进行所有
const relevantDocs = await searchByEmbedding(question, embeddedDocs);

let userMessage = question;

// 接下来需要对应用户的问题进行一个评判
// 看一下用户的问题是否和外挂知识库的内容相关
// 目前，每一个块儿都有一个得分，所有的块儿的得分大于阀值，说明相关
const allDocsRelevant =
relevantDocs.length > 0 &&
relevantDocs.every((doc) => doc.score > RELEVANCE_THRESHOLD);

if (allDocsRelevant) {
// 说明用户这一次的问题，是和外挂知识库的内容相关的
// 需要将外挂知识库中搜索到的内容一起给大模型
console.log(
\`✅ 知识库相关 - 所有文档得分都超过阈值 \${RELEVANCE_THRESHOLD}\`
);
console.log(
\`   文档得分: [\${relevantDocs
        .map((doc) => doc.score.toFixed(3))
        .join(", ")}]\`
);

    // 将相关的知识库内容添加到用户问题中
    const relevantContent = relevantDocs
      .filter((doc) => doc.score > RELEVANCE_THRESHOLD)
      .map((doc) => doc.content)
      .join("/n/n");

    userMessage = \`参考以下资料回答问题：

    \${relevantContent}

    问题：\${question}\`;

}
}
\`\`\`

## 大模型微调

微调（fine-tuning）：在规模较小的 **特定任务或特定领域数据集** 上对模型进行 **针对性的训练**。

可以从不同的维度分类：

1. 技术维度

全量微调（Full Fine-tuning）

参数高效微调（PEFT，Parameter-Efficient Fine-tuning）

2. 任务维度

指令微调

分类任务微调

指令微调

\`\`\`markdown
{
"instruction": "请判断患者是否存在糖尿病风险，并说明依据。",
"input": "患者男，45岁，BMI指数29，空腹血糖6.8 mmol/L。",
"output": "患者可能存在糖尿病前期的风险，建议进一步做 OGTT 检查。"
}
\`\`\`

分类任务微调

\`\`\`markdown
{
"text": "患者男，45岁，BMI指数29，空腹血糖6.8 mmol/L。",
"label": "糖尿病前期"
}
\`\`\`

**微调** 和 **提示词工程**、**RAG** 之间的区别：

| 项目                 | 微调（Fine-tuning）                            | 提示词工程（Prompt Engineering） | RAG（检索增强生成）                        |
| -------------------- | ---------------------------------------------- | -------------------------------- | ------------------------------------------ |
| **定义**             | 基于已有模型，用新数据“训练”一遍以适应特定任务 | 通过设计更优提示词，提高模型表现 | 在生成前引入“外部知识”作为上下文供模型参考 |
| **是否改动模型参数** | ✅ 会，训练会更新模型权重                      | ❌ 不会，只用原始模型            | ❌ 不会，主要改进数据流                    |
| **适用场景**         | 高精度、专属领域（如医疗、法律）               | 通用模型适配多任务、快速试验     | 数据频繁更新、文档 QA、知识密集型任务      |
| **依赖外部数据源**   | 需要少量**高质量**训练数据                     | 可选，通常仅靠提示               | 必须，需要知识库或文档                     |
| **部署复杂度**       | 较高，需要训练和模型部署                       | 最低，只依赖提示词               | 中等，需接入检索系统（如向量库）           |

> 现在微调使用的很少，因为微调方便，验证你的微调结果好不好却很难，而且微调是跟模型版本绑定的，也就是说一旦模型升级，你的微调必须重新来
>
> 注意：微调只能在python语言下实现

## agent functionCall mcp的关系

<font style="color:rgb(38, 38, 38);">agent: node服务器 + 调用大模型  
</font><font style="color:rgb(38, 38, 38);">自己也可以搭一个node服务器来调用大模型 （想要支持上下文的话，可以存多轮对话，可以使用function Calling）  
</font><font style="color:rgb(38, 38, 38);">但是如果想在cursor这个agent服务器中玩上下文的话，就需要mcp协议去进行通信，需要搭一个支持mcp协议输入输出的服务器（agent会自主的根据提示词去决定是否调用你的mcp服务器）  
</font><font style="color:rgb(38, 38, 38);">其实cursor应用就集成了agent服务器

</font>
`;export{n as default};
