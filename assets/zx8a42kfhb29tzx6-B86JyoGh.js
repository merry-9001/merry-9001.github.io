const n=`---
title: 提示词工程
urlname: zx8a42kfhb29tzx6
date: 2026-05-18 10:45:02 +0800
tags: []
description: 大模型幻觉为什么会出现大模型幻觉？1. 基于统计学习：你给它相应的语料库，它根据你提供的语料库进行学习2. 训练数据不完整或有偏差3.
  对人类提问的“补全压力”如何解决大模型幻觉？1. 提示词工程2. RAG - 外挂知识库3. 大模型微调提示词工程rct构词法
image: articles/zx8a42kfhb29tzx6/1772272927813-6534b608-9ae4-42ec-ab35-e56215daaf6d.png
categories: []
---

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

### <font style="color:rgb(38, 38, 38);">rct构词法</font>

角色（Role）

- 你是一位严谨的大学教授 - 回答的时候会更加学术化
- 你是一名耐心的初中数学老师 - 回答的时候会更加通俗
- 你是产品经理，正在写 PRD 文档 - 回答的时候会更加结构化

上下文（Context）

- 提供数据、范例、定义、规则、语境
- 指明受众（如“这段话要写给小学生听”）
- 加入限制条件（如“不能超过100字”）

任务（Task）

- 生成类：帮我写一段话、帮我生成一个标题、续写一段话
- 分析类：总结这段话的要点，比较两段话的异同，找错误
- 转换类：给它一段话，切换风格、翻译
- 多轮任务：先分析要点、在总结成一个报告

示例：

假设你是 [角色]。

请基于以下上下文：[上下文内容]。

你的任务是：[任务目标 + 要求]。

<font style="color:rgb(38, 38, 38);">通过反馈迭代优化，，技巧语言来让模型提供更精确的答案</font>

<font style="color:rgb(38, 38, 38);"></font>

### <font style="color:rgb(38, 38, 38);">样本学习</font>

少样本学习：few-shot learning 给一些少量的样本，大模型会基于你所给的样本，给出问题的答案

\`\`\`javascript
例子：
评论：这个产品真不错，用得很顺手！ → 情感：正面
评论：完全失望，质量太差了。 → 情感：负面
评论：快递到了。 → 情感：中性

评论：外观还行，性能一般般。 → 情感：
\`\`\`

One-shot Learning：给一个样本，然后询问大模型问题

\`\`\`javascript
例子：
Input: "Good morning" → Output: "早上好"

请翻译：
Input: "Thank you" → Output:
\`\`\`

零样本学习：zero-shot Learning 完全不给样本，让大模型自己一步一步思考，得出答案

\`\`\`markdown
Q: 小明有 3 个苹果，小红给了他 2 个苹果，然后他吃掉了 1 个。问他现在有几个苹果？
请一步步思考。
\`\`\`

> 常见的提示词：
>
> 请一步一步思考
>
> 请解释你的推理过程
>
> 请详细说明你是如何得到这个答案的

### 反馈迭代优化

**人工迭代**：由人类观察输出并调整提示词。

人工迭代的核心思路是：**人类观察模型的输出 → 找出不足之处 → 修改提示词 → 再次生成 → 循环优化**。

这种方式适合在**风格、重点、结构**等方面有明确要求的任务。

提示词要注意以下几点：

\`\`\`markdown
明确任务目标（做什么）
指定输出形式（列表、段落、表格）
明确输出对象（面向谁）
控制输出范围（字数、限制条件）
给出示例或格式引导（few-shot）
使用上下文或背景信息
避免歧义（如“总结”应说明提取角度）
鼓励模型思考（如“分步骤”）
\`\`\`

**智能迭代**：让模型自动提出改进建议。

与人工迭代依赖人类反馈不同，**智能迭代**的核心思路是：让模型本身（或多个模型协作）自动提出提示词的改进方案。

一种常见做法是**角色分工**，让不同的角色分别承担不同任务：

- **审查者（Reviewer）**：对原始提示词进行打分与评价，指出不足之处
- **提问者（Asker）**：基于审查者的反馈，向用户提出澄清性问题，收集更多上下文
- **提示词生成者（Prompt Generator）**：结合原始提示词、审查意见和用户反馈，生成优化后的提示词

\`\`\`markdown
import OpenAI from "openai";
import readlineSync from "readline-sync";
import dotenv from "dotenv";
dotenv.config();

// 实例化模型
const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
});

// 和模型进行交互
async function askLLM(messages) {
const res = await client.chat.completions.create({
model: "gpt-4o",
messages, // 聊天记录
});
// 向外部返回模型的输出结果
return res.choices[0].message.content.trim();
}

// 入口函数
async function main() {
console.log("=== 智能迭代示例开始 ===");

// 1. 用户输入初始的提示词
const userPrompt = readlineSync.question("请输入您的初始提示词：/n>");

// 2. 审查者就需要对初始的提示词进行审查
const reviewerMsg = [
{
role: "system",
content:
"你是一个提示词审查者。请对用户的提示词进行 1~5 分打分，并写出改进意见。",
},
{
role: "user",
content: \`当前的提示词为：\${userPrompt}\`,
},
];

// 得到审查结果
const review = await askLLM(reviewerMsg);
console.log("/n[审查者反馈]");
console.log(review);

// 3. 提问者根据审查者的意见向用户提问
const askerMsg = [
{
role: "system",
content:
"你是一个提示词提问者。请根据以下审查意见，向用户提出 2~3 个澄清问题，以帮助改进提示词。",
},
{
role: "user",
content: review,
},
];

// 得到向用户提问的问题
const askQuestions = await askLLM(askerMsg);
console.log("/n[提问者的问题]");
console.log(askQuestions);

// 4. 用户需要回答这些问题
const userAnswers = readlineSync.question("/n请回答以上问题：/n> ");

// 5. 进行一个信息汇总，将汇总后的信息交给提示词生成者
const generatorMsg = [
{
role: "system",
content:
"你是提示词生成者。请基于原始提示词、审查意见和用户的补充回答，生成一个改进后的提示词。",
},
{ role: "user", content: \`原始提示词：\${userPrompt}\` },
{ role: "user", content: \`审查意见：\${review}\` },
{ role: "user", content: \`用户回答：\${userAnswers}\` },
];

const newPrompt = await askLLM(generatorMsg);
console.log("/n[新生成的提示词]");
console.log(newPrompt);

console.log("/n=== 智能迭代示例结束 ===");
}

main().catch((err) => console.error(err));
\`\`\`

### 其他常用方式

#### 指导模型提出更多问题

核心思路：提示词末尾询问模型是否理解问题，并指导它主动提出更多问题，是一种非常有效的提示词设计技巧。

你向大模型提问，问大模型是否理解了你的问题，是否了解你的需求

一些示例：

\`\`\`plain
xxxxxxxxx
作为一名智能助手，在开始执行任务前，请先判断自己是否具备足够的信息。如有不明确的地方，请提出最多三个问题澄清任务目标。
\`\`\`

这样做的好处：

- 增强模型的“任务理解意识”
- 降低幻觉和误解
- 模拟“先问再做”的专家行为，特别适合多轮对话系统或具备角色设定的 LLM agent

#### 格式化输出

核心思路：明确要求模型以某种格式输出内容，比如表格、列表、JSON、Markdown、代码块等

常见的格式化输出类型：

| 格式类型      | 示例用途                     |
| ------------- | ---------------------------- |
| 有序/无序列表 | 总结要点、罗列建议、步骤说明 |
| Markdown 表格 | 对比分析、报告生成           |
| JSON 格式     | 给前端/后端传数据、调用接口  |
| 特定模版格式  | 面试对话、文书、邮件、合同等 |
| 代码块格式    | 插入 HTML、JS、Python 等     |

举几个例子：

\`\`\`plain
请用严格的 JSON 格式输出如下信息：
{
  "标题": "",
  "摘要": "",
  "关键词": []
}
注意：不要添加自然语言解释，只输出 JSON。
\`\`\`

格式化提示可以极大提升**输出可控**性。

#### 重复指令

核心思路：在提示词中重复强调核心目标或关键限制条件。一些关键点，反复强调，提升关键点的权重

示例

\`\`\`plain
请按以下结构输出：标题、关键词、摘要、行动建议。再次强调，输出必须包含这四部分，按顺序排列。
\`\`\`

重复指令能够带来如下的收益：

1. 提示词中重复强调可让模型强制遵守
2. 重复格式要求可提升模型输出稳定性
3. 可在多轮对话中“重复指令”，从而保持目标的一致性

#### 使用负面提示

核心思路：明确告诉模型“不要做什么”或“避免某种行为”，以此引导模型的输出更符合预期。

模型默认是“尽力补全”的，它并不能知道哪些内容是你不想要的。如果你不加限制，它可能会：

1. 多余解释

\`\`\`plain
请判断这个句子是正面还是负面
\`\`\`

\`\`\`plain
大模型输出：“这个句子是正面的，因为xxxxx”
\`\`\`

\`\`\`plain
使用负面提示：请判断这个句子是正面还是负面，不要做任何的解释
\`\`\`

\`\`\`plain
大模型输出：“正面”
\`\`\`

2. 编造信息

\`\`\`plain
推荐3本书，不要编造作者或者出版信息，如果不确定可以留空
\`\`\`

3. 风格不符，输出结构错乱

负面提示是正向指令的补充和约束手段，用来“立规矩”：清清楚楚告诉模型——哪些事不准做。负面提示的常见类型：

| 类型               | 说明                                       | 示例句式                       |
| ------------------ | ------------------------------------------ | ------------------------------ |
| 禁止解释           | 防止输出多余说明                           | “不要解释你的答案。”           |
| 禁止虚构信息       | 防止编造引用、术语、链接等                 | “不要生成任何未经验证的内容。” |
| 禁止重复           | 避免啰嗦、循环表达                         | “不要重复前面的句子。”         |
| 禁止特定风格或语气 | 控制输出风格                               | “不要使用幽默语气。”           |
| 禁止某些内容或措辞 | 敏感、专业、品牌用语控制                   | “不要提到 OpenAI 或 ChatGPT。” |
| 禁止特定格式       | 防止模型输出 JSON/代码块等不符合要求的格式 | “不要使用代码块格式。”         |

下面是一句负面提示的示例：

\`\`\`plain
请回答以下问题，不要编造任何不存在的术语或概念。
\`\`\`

\`\`\`plain
请使用正式语气，不要使用幽默、俚语或口语化表达。
\`\`\`

\`\`\`plain
只输出纯文本内容，不要加引号、标题或额外解释。
\`\`\`

\`\`\`plain
如果你不确定答案，请说明“不确定”，不要编造任何信息。
\`\`\`

#### 添加长度限制

核心思路：在提示词中明确要求模型输出的字数、句数、段落数或 token 数不能超过某个范围，以控制内容的长度和精炼度。

在以下场景中非常重要：

- 生成摘要、标题、广告文案
- 编写社交媒体内容（如微博、推文）
- 生成对话、考试答案、简报等

常见长度限制的方式：

1. 字数：不超过 100 字
2. 句数：限制在 3 句内
3. 段落数：输出 1 段文字
4. Token 数量：不超过 300 个 token

#### 提示链

核心思路：指将**任务分解为子任务**，然后用子任务提示大模型，将它的输出作为下一个子任务的输入。

例子：规划一个多目的地旅行计划

\`\`\`plain
请推荐3个夏天适合旅行的城市
模型：青岛、三亚、XXXX...
\`\`\`

\`\`\`plain
请为“青岛”推荐3个酒店
\`\`\`

\`\`\`plain
请为“青岛+住宿时间”为背景，推荐3种特色食物
\`\`\`

#### 影子提示

核心思路：不直接陈述任务，而是巧妙地在提示词中嵌入线索，从而引导模型朝着期望的结果前进。在某些情况下，这可以催生出创造力。

例如：

\`\`\`plain
为孩子们写一个恐怖故事
\`\`\`

相比上面的提示词，不如使用影子提示：

\`\`\`plain
想象我们在一个黑暗神秘的森林中的篝火旁，讲什么故事能让你的年轻观众感到毛骨悚然？
\`\`\`

## <font style="color:rgb(38, 38, 38);">Rag</font>

<font style="color:rgb(38, 38, 38);">全称 Retrieval-Augmented Generation，中文：检索增强生成</font>

![](articles/zx8a42kfhb29tzx6/1772272927813-6534b608-9ae4-42ec-ab35-e56215daaf6d.png)

<font style="color:rgb(38, 38, 38);">解决的问题：</font>

1. <font style="color:rgb(38, 38, 38);">受限于已有知识库，无法快速新增语料信息</font>
2. <font style="color:rgb(38, 38, 38);">重新训练大模型需要很长的时间</font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);">应用场景：</font>

<font style="color:rgb(38, 38, 38);">知识库</font>

### <font style="color:rgb(38, 38, 38);">rag应用架构（原理）</font>

1. <font style="color:rgb(38, 38, 38);">数据索引（Data Indexing）</font>
2. <font style="color:rgb(38, 38, 38);">数据查询（Query）</font>
   1. <font style="color:rgb(38, 38, 38);">检索（Retrieval）</font>
   2. <font style="color:rgb(38, 38, 38);">生成（Generation）</font>

<font style="color:rgb(38, 38, 38);"></font>

#### <font style="color:rgb(38, 38, 38);">数据索引</font>

1. <font style="color:rgb(38, 38, 38);">加载文档</font>
2. <font style="color:rgb(38, 38, 38);">切分成 chunks</font>
3. <font style="color:rgb(38, 38, 38);">转化为向量嵌入</font>
4. <font style="color:rgb(38, 38, 38);">存入向量数据库</font>

![](articles/zx8a42kfhb29tzx6/1772275113483-4dac357b-680e-4f7e-aaaf-ec159f64b145.png)

#### <font style="color:rgb(38, 38, 38);">数据查询</font>

<font style="color:rgb(38, 38, 38);">检索</font>

1. <font style="color:rgb(38, 38, 38);">将 Query（用户的问题） 转化为向量</font>
2. <font style="color:rgb(38, 38, 38);">在向量数据库中进行相似度检索（语义检索），相似度的检索，有几种方式</font>
   1. **余弦相似度**
   2. <font style="color:rgb(38, 38, 38);">欧氏距离</font>
   3. <font style="color:rgb(38, 38, 38);">点积</font>
3. <font style="color:rgb(38, 38, 38);">为生成阶段准备检索结果</font>

生成

![](articles/zx8a42kfhb29tzx6/1772275034401-746579df-aa65-4508-808d-c7de5820b1a3.png)

### <font style="color:rgb(38, 38, 38);">代码层面（实现）</font>

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

\`\`\`javascript

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

## <font style="color:rgb(38, 38, 38);">大模型微调</font>

<font style="color:rgb(38, 38, 38);">微调（fine-tuning）：在规模较小的 </font>**特定任务或特定领域数据集**<font style="color:rgb(38, 38, 38);"> 上对模型进行 </font>**针对性的训练**<font style="color:rgb(38, 38, 38);">。</font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);">可以从不同的维度分类：</font>

<font style="color:rgb(38, 38, 38);">1. 技术维度</font>

**<font style="color:rgb(38, 38, 38);">全量微调（Full Fine-tuning）</font>**

<font style="color:rgb(38, 38, 38);">对模型的 所有参数 进行更新，而不是只更新其中的一小部分</font>

**<font style="color:rgb(38, 38, 38);">参数高效微调（PEFT，Parameter-Efficient Fine-tuning）</font>**

<font style="color:rgb(38, 38, 38);">指的是只训练少量参数或添加轻量模块。</font>

<font style="color:rgb(38, 38, 38);">常见参数高效微调方法：</font>

<font style="color:rgb(38, 38, 38);">LoRA（Low-Rank Adaptation）：插入低秩矩阵来替代直接更新大模型参数</font>

<font style="color:rgb(38, 38, 38);">Prefix Tuning：为每个输入添加一小段可训练的“前缀”向量</font>

<font style="color:rgb(38, 38, 38);">Adapter Tuning：在 Transformer 层之间插入小模块</font>

<font style="color:rgb(38, 38, 38);">QLoRA：LoRA + 量化（Quantization）</font>

<font style="color:rgb(38, 38, 38);">2. 任务维度</font>

<font style="color:rgb(38, 38, 38);">指令微调</font>

<font style="color:rgb(38, 38, 38);">分类任务微调</font>

<font style="color:rgb(38, 38, 38);">指令微调</font>

<font style="color:rgb(38, 38, 38);">指令微调就像是你教模型做开放性问答题或写作题。</font>

- <font style="color:rgb(38, 38, 38);">输入：题目要求和背景材料</font>
- <font style="color:rgb(38, 38, 38);">输出：一段自然语言分析、论述或建议。</font>

<font style="color:rgb(38, 38, 38);">分类任务微调</font>

<font style="color:rgb(38, 38, 38);">分类任务微调则是像你教学生做选择题或判断题。</font>

- 输入：一段信息
- 输出：正确选项是 A、B、C 或 “阳性”、“阴性”。

**微调**<font style="color:rgb(38, 38, 38);"> 和 </font>**提示词工程**<font style="color:rgb(38, 38, 38);">、</font>**RAG**<font style="color:rgb(38, 38, 38);"> 之间的区别：</font>

| <font style="color:rgb(38, 38, 38);">项目</font> | <font style="color:rgb(38, 38, 38);">微调（Fine-tuning）</font>                                                    | <font style="color:rgb(38, 38, 38);">提示词工程（Prompt Engineering）</font> | <font style="color:rgb(38, 38, 38);">RAG（检索增强生成）</font>                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **定义**                                         | <font style="color:rgb(38, 38, 38);">基于已有模型，用新数据“训练”一遍以适应特定任务</font>                         | <font style="color:rgb(38, 38, 38);">通过设计更优提示词，提高模型表现</font> | <font style="color:rgb(38, 38, 38);">在生成前引入“外部知识”作为上下文供模型参考</font> |
| **是否改动模型参数**                             | ✅<font style="color:rgb(38, 38, 38);"> 会，训练会更新模型权重</font>                                              | ❌<font style="color:rgb(38, 38, 38);"> 不会，只用原始模型</font>            | ❌<font style="color:rgb(38, 38, 38);"> 不会，主要改进数据流</font>                    |
| **适用场景**                                     | <font style="color:rgb(38, 38, 38);">高精度、专属领域（如医疗、法律）</font>                                       | <font style="color:rgb(38, 38, 38);">通用模型适配多任务、快速试验</font>     | <font style="color:rgb(38, 38, 38);">数据频繁更新、文档 QA、知识密集型任务</font>      |
| **依赖外部数据源**                               | <font style="color:rgb(38, 38, 38);">需要少量</font>**高质量**<font style="color:rgb(38, 38, 38);">训练数据</font> | <font style="color:rgb(38, 38, 38);">可选，通常仅靠提示</font>               | <font style="color:rgb(38, 38, 38);">必须，需要知识库或文档</font>                     |
| **部署复杂度**                                   | <font style="color:rgb(38, 38, 38);">较高，需要训练和模型部署</font>                                               | <font style="color:rgb(38, 38, 38);">最低，只依赖提示词</font>               | <font style="color:rgb(38, 38, 38);">中等，需接入检索系统（如向量库）</font>           |

> <font style="color:rgb(38, 38, 38);">现在微调使用的很少，因为微调方便，验证你的微调结果好不好却很难，而且微调是跟模型版本绑定的，也就是说一旦模型升级，你的微调必须重新来</font>
>
> <font style="color:rgb(38, 38, 38);">注意：微调只能在python语言下实现</font>

<font style="color:rgb(38, 38, 38);"></font>
`;export{n as default};
//# sourceMappingURL=zx8a42kfhb29tzx6-B86JyoGh.js.map
