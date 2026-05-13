const n=`---
title: ai应用
urlname: pc5cnm5r2ga4sq4b
date: 2026-02-21 16:57:42 +0800
tags:
  - 博客文章
description: cc
  switchai技术认知无论是模型服务还是ai应用，只能玩两个东西1.输入什么给模型加一些提示词加一些mcp,skill......2.如何处理模型的输出可能会加一些提示词，继续提问模型可能做一些格式处理可能做函数
image: https://cdn.nlark.com/yuque/0/2026/png/22718987/1776075473763-09936d69-84ce-4212-9d73-e8c5d58dc241.png
categories: []
---

cc switch

## ai技术认知

无论是模型服务还是ai应用，只能玩两个东西

1.输入什么给模型

加一些提示词

加一些mcp,skill

......

2.如何处理模型的输出

可能会加一些提示词，继续提问模型

可能做一些格式处理

可能做函数调用

.......

上层调用下层

### 用户

使用ai应用

### ai应用

应用开发（Agent）：调用模型服务的接口，做一个具体有价值的ai工具

要学习的东西：概念，skill，tool，mcp，LangChain，LangGraph

工具使用：概念，具体工具使用（claude Code，Codex）

运行过程：

1.连接初始化(告诉模型我有哪些技能，但不是把全部内容给模型)

2.当用户触发关键词的时候才会使用技能，然后再次调用模型，传入技能全文

![](articles/pc5cnm5r2ga4sq4b/1775443711879-3df4dcae-7464-4199-b536-35bcc6c9fe34.png)

> 注意：mcp，skill这些工具可以在ai应用层处理，当然模型服务接口也会提供这些处理

### 模型服务

模型服务：API接口/SDK，temperature，top_k，top_p

输入：自然语言

输出：自然语言

![](articles/pc5cnm5r2ga4sq4b/1775441925399-5b5e86f4-200d-4db8-9452-71fb39637c7b.png)

前处理：

身份/权限认证

提示词注入

tokenization 分词 token化

自回归：调用模型

\`\`\`javascript
// 模拟：之前 tokenization（分词）的结果，比如用户输入的 prompt 转成的 token ID 数组
const input: number[] = [/* ...... */];

// 存储最终生成的输出 token 序列
const output: number[] = [];

// 自回归生成循环：逐 token 生成，直到遇到结束符
while (true) {
    // 1. 用原始模型根据当前输入序列，计算下一个 token 的概率分布
    // raw_model 通常是大模型的前向推理（forward pass），输入是当前上下文，输出是 vocab 维度的 logits/prob
    const prob: number[] = raw_model(input);

    // 2. 根据概率分布 + 采样策略（如贪心、Top-k/Top-p、温度采样），选择下一个 token
    const token: number = pickToken(prob, {
        temperature: 0.7, // 温度参数，控制随机性
        top_p: 0.9,       // 核采样参数
        // 其他采样配置...
    });

    // 3. 检查是否为结束 token（如 <|endoftext|>、EOS 等），是则终止生成
    if (isOver(token)) {
        break;
    }

    // 4. 将生成的 token 加入输出序列
    output.push(token);
    // 5. 【关键】将新生成的 token 追加到输入序列，作为下一轮生成的上下文
    input.push(token);
}
\`\`\`

后处理：

detokenization 把token变成自然语言

合规性检查

### 裸模型

裸模型：GPT5.2，Kimi，Gemini（注意力机制，KV-Cache，上下窗口）

输入：token List

\`\`\`javascript
[3, 6.99, 15];
\`\`\`

输出：概率分布（下一个token的概率分布）

\`\`\`javascript
{
  15:0.7,
  222:0.1
}
\`\`\`

处理过程：裸模型调用权重矩阵，本地部署模型的时候，要把模型下载到本地，实际部署的是权重矩阵（本质是一串数字），比如transfomer架构，本质就是用transfomer架构里面有一些函数去调用这个矩阵

> 注意：transfomer训练出来的矩阵，要用transfomer函数去调用

大模型本质上就是一个纯函数

![](articles/pc5cnm5r2ga4sq4b/1775441395980-d948d646-0ba4-43c3-9c9f-ad8937b4c1ab.png)

多模态：本质上无论输入的是什么，都会转化为token list，输出的话还是一个概率分布，只不过输出的东西可能对应的是一个像素点信息，一个文字，或者视频的一帧

## 模型调用方式

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

## FunctionCalling（调用工具）

Function Calling 是大模型的能力：让 AI 理解外部工具 / 自定义函数的描述，自动判断「什么时候该调用、传什么参数、怎么接收返回结果」，实现大模型 + 外部能力联动。

如何告诉大模型有工具可以调用？

1.直接描述

2.JSON Schema来约束描述方式

如果通过提示词让模型去输出调用工具的话，可能会有的问题：

1. 繁琐：大段大段的提示词，仅仅是为了约束大模型的输出

2. 不标准：每个开发者的提示词的描述千差万别

3. 约束力不高：即便使用了语气最重的提示词，大模型的底层原理决定了它总会有不按照要求回复的情况

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
const response = await callLLM(messages, tools, (chunk) => {
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

mcp扩充了ai应用程序的边界

### 协议层面

**MCP是一套标准协议，它规定了应用程序之间 如何通信**

**通信方式**

stdio： 推荐，高效、简洁、本地

http： 可远程

StreamHTTP

SSE

> 一般都会使用stdio通信方式，因为绝大多数mcp服务器是运行在本地的(因为需要操作本地电脑写文件等等，操作当前计算机)

**通信格式**： 基于JSON-RPC的进一步规范

json-rpc格式示例：

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

应用场景

效能工具：AISC（ai安全检查），AISC（单元测试），AICR（代码审查）

### 完整流程

MCP Host: 往往指代AI应用本身，用于发现MCP Server以及其中的工具列表（配置，禁用，启动mcp服务器）

MCP Client： 用于和MCP Server通信的客户端，往往在Host内部开启，通常情况下，每启动一个MCP Server，就会开启一个MCP Client

![](articles/pc5cnm5r2ga4sq4b/1775364791839-f113539f-148b-415a-9407-8feb594a571d.png)

1. 在Claude Desk 中打开一个新的聊天窗口

2. Claude查看当前启用了哪些MCP Server

3. Claude（host）为每个MCP Server创建一个Client（在host内部创建很多client用于对MCP server进行连接）

4. 每个Client分别启动各自的MCP Server，并且进行了2次通信，一次是初始化，另外一次是tools/list。

5. 用户在提问的时候，会将工具箱（大模型能够使用的工具）连同问题一起发给大模型

6. 当 LLM 认为当前的问题涉及到工具的时候，会在回复汇总返回一个调用工具的标识

7. 当时机到达时（要调用工具的时候），每个Client负责调用各自的工具并把结果传递给Host

8. Host根据结果处理后续逻辑

![](articles/pc5cnm5r2ga4sq4b/1772264980977-f5c5e326-b459-4bec-a480-78d19f9b309a.png)

ai应用会自主解决怎么调用，什么时候来调用mcp服务器

cursor里面配置mcp服务器

\`\`\`javascript
{
  "mcpServers": {
    "MCP测试服务器": {
      "command": "node", //最好找到node的绝对路径
      "args": ["src/server.js"] //最好找到服务器的绝对路径
    }
  }
}
\`\`\`

如何使用别人的mcp服务器

发布包到npm，别人可以使用npx来使用

\`\`\`javascript
{
  "mcpServers": {
    "MCP测试服务器": {
      "command": "/Users/yuanjin/.nvm/versions/node/v20.12.1/bin/node",
      "args": ["/Users/yuanjin/Desktop/use-sdk/src/server.js"]
    },
    "Bazi": {
      "command": "npx",
      "args": ["bazi-mcp"]
    }
  }
}
\`\`\`

## agent functionCall mcp的关系

**<font style="color:rgb(38, 38, 38);">agent</font>**<font style="color:rgb(38, 38, 38);">：node服务器 + 调用大模型  
</font><font style="color:rgb(38, 38, 38);">自己也可以搭一个node服务器来调用大模型 （想要支持上下文的话，可以存多轮对话，可以使用</font>**<font style="color:rgb(38, 38, 38);">（function Calling）</font>**<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">但是如果想在cursor这个agent服务器中玩上下文的话，就需要mcp协议去进行通信，需要搭一个支持mcp协议输入输出的服务器（agent会自主的根据提示词去决定是否调用你的mcp服务器）  
</font><font style="color:rgb(38, 38, 38);">其实cursor应用就集成了agent服务器

</font>**<font style="color:rgb(38, 38, 38);">mcp</font>**<font style="color:rgb(38, 38, 38);">服务器是由ai应用（agent） 自主来决定怎么调用，什么时候调用，他在合适的时间就会调用我们的mcp服务器，来搞定一些额外的事情</font>

<font style="color:rgb(38, 38, 38);">一般mcp服务器都放在本地 所以ai应用和mcp服务器通过stdio来交互，如果想要分享可以采用，npx的方式分享出去给别人使用</font>

<font style="color:rgb(38, 38, 38);">mcp host === ai应用本身</font>

<font style="color:rgb(38, 38, 38);">ai应用可以用来配置服务器，管理服务器  
</font>

模型都是不联网的，觉得联网是因为agent会去调用其他的工具

agent就是一个主循环

模型有方面缺陷：

1.功能性缺陷（做不到，靠mcp和function Call)

2.知识性缺陷（不知道，靠rag）

## rules skills的使用

Rules：始终存在的系统约束

\`\`\`javascript
- 必须中文回答
- 不允许删除文件
- 使用 TS
\`\`\`

特点：全局生效、持续存在、影响所有任务

Skills：按需注入的任务能力

\`\`\`javascript
React skill
Debug skill
SQL optimization skill
\`\`\`

特点： 只有需要时才加载

skills可以只有提示词，那就像一句说明书

也可以有：

- Prompt
- Tool
- Memory
- Planner
- Workflow

| 文件名      | 作用说明                                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| prompt.md   | 定义调试代理的角色、行事原则、禁止规则，以及面向用户的简体中文固定交付物格式                                        |
| tools.ts    | 定义调试调查手段枚举，并配置默认优先级：读源码、grep 检索、lint 检查、项目构建、浏览器网络 / 控制台等               |
| workflow.ts | 标准化调试全流程分阶段检查清单：问题接入 (intake) → 问题复现 → 分层隔离 → 提出假设 → 验证假设 → 问题修复 → 回归验证 |
| examples.md | 收录优质 / 劣质调试结论对照范本，提供可直接复用的 Markdown 标准化报告模板                                           |
| memory.json | 约定会话结论的 JSON 数据结构与 Schema 规范，附带示例，用于沉淀记录已排除项、根因、关联涉及文件                      |
| config.json | 配置技能元数据、项目入口文件映射关系、代理行为开关等全局配置项                                                      |
`;export{n as default};
//# sourceMappingURL=pc5cnm5r2ga4sq4b-C9ZcHJHE.js.map
