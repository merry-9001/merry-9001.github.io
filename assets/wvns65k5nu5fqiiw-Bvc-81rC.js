const n=`---
title: 工作
urlname: wvns65k5nu5fqiiw
date: 2025-01-05 12:18:23 +0800
tags: []
description: 后台总结后台叫名pass平台工作准备一个任务看这几个东西：yapi接口figma原型图coding描述代码业务学习详情页下面一个功能一个tabmac地址留空自动获取提交的时候commit可以参考下changelog
image: https://cdn.nlark.com/yuque/0/2025/png/22718987/1738246317254-b6d342cf-74c7-484b-9bc3-aa72791b27bc.png
categories: []
---

# 后台总结

后台叫名pass平台

## 工作准备

一个任务看这几个东西：

yapi接口

figma原型图

coding描述

代码

## 业务学习

详情页下面一个功能一个tab

mac地址留空自动获取

提交的时候commit可以参考下changelog

常见的可以把一个复杂的表单项封装成一个组件

## 代码参考

路径写法：@/views/Ipaas/hooks/useCluster

单行某一个选项修改 src/views/Asset/Metic/Update/components/Labels.vue

table中 单行两个form相互影响的 src/views/Sas/Instance/Create/NetworkSet.vue

> table的datasource和customRender的opt是互通响应式的

多渠道组件 src/views/Mpaas/components/ChannelConf/index.vue

可拖拽的表单 src/components/Common/Form/src/Key/index.vue

设计一个通用item input src/views/Ipaas/components/NetworkFormItem.vue

prop属性定义

src/components/Common/Descriptions/src/props.ts props文件

src/components/Base/BdImport/src/index.vue 单独文件

src/components/Base/BdSplit/src/index.vue 默认值

src/components/Business/SimpleAlarmRules/index.vue 无默认值

图标方案

1.@ant-design/icons-vue

2.iconfont BaseIcon组件

打开弹窗的两种方式  
1.src/views/Workorder/Mine/index.vue  
2.src/views/Ipaas/EcsSnapshotTask/components/SnapshotTagTable.vue

v-model有时候可以拆成

<Radio.Group :value="formState.sourceType" @update:value="setSourceType" />

表格修改1

src/views/Asset/Metic/Update/components/Labels.vue

表格修改2

src/views/Sas/Instance/Create/NetworkSet.vue

表单自定义验证 异步验证 告警配置

src/views/Apaas/App/components/WorkloadPanel/useValidate.ts 异步验证

下级table apass/ 服务发布和src/views/Apaas/Gateway/index.vue

formstate 动态key src/components/Business/SimpleAlarmRules/index.vue

插槽穿透 D:/coding/ca-cloud-master/src/components/Business/RichAlert.vue

自定义selectOption样式 src/components/Business/EmailReceiverSelect.vue

复杂的tableForm src/views/Ipaas/EcsSecurityGroup/components/ARForm/index.vue

两级表格筛选 src/views/Message/SystemMessage/index.vue

一个formItem 对应多个选择项 src/views/Operate/components/FlavorSelect.vue

两个选项框用同一个v-model src/views/Operate/components/PeriodSelect.vue

src/components/Base/Terminal/src/Setting.vue 设置禁用与非禁用的css

自定义表单某一项样式 src/views/Mpaas/Alarm/Update/components/ConditionRule/index.vue

组件是函数的写法 src/views/Mpaas/Alarm/Update/components/Expr/Item.vue

## 用到的css

\`\`\`javascript
& > * {
  padding: 0 4px;
  color: @gray;
  font-size: 14px;
  line-height: 20px;
}

gap: 20px
height: 200vh
width: 100wh
width: calc(100% - 62px);
color: fade(@black, 60%);
background: fade(@white, 90%);

@ns: base-upload;
.ant-form-item-has-error {
  .@{ns} {
    .ant-upload-drag {
      border-color: @error-color;
    }
  }
}

&__btm {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: @white;

  & > *:not(:last-child) {
    margin-right: @margin-md;
  }
}

.editable-text {
  display: flex;
  align-items: center;
  max-width: 100%;

  &--large {
    font-size: @font-size-lg;
  }

  &__text {
    flex: 1;

    &--ellipsis {
      .text-show-row(22px);
    }
  }

  &__icon {
    .active();
    margin-left: @margin-sm;
    cursor: pointer;
  }
}

// 指定错误box
@ns: rick-editor;
.form-item-error(rick-editor__box);


  &:hover:not(&--disabled),
  &--active {
    background: #f5f5f5;
  }


display: inline-flex;


&:not(:last-child) {
  margin-right: @margin-xs;

  &::after {
    margin-left: @padding-xs;
    color: @text-color-secondary;
    content: '/';
  }
}
\`\`\`

## 语法学习

写tsx的时候里面也可以套.vue组件

通过toRef方法可以让子组件修改父组件的值 类似emit

api参数写法

\`\`\`javascript
//写法一
const api = (params) =>
  API_FLAVOR_LIST({ ...params, cpu: props.cpu, ram: props.ram });
//写法二
const api = API_FLAVOR_LIST;
\`\`\`

打注释的方法

\`\`\`javascript
/**
 * 获取选中的文本
 * @param val 选中的值
 */
\`\`\`

watch的时候可以深层watch，也可以监听xx.xxx.xx的单值

在template模板中，可以直接使用$route和$router

修改不属于本身响应式值的方法

useVModel

toref

cpmputed设置set与get

> cpmputed的set和get和useVModel区别：
>
> cpmputed的set和get可以额外加其他操作，而useVModel不行
>
> 应用:
>
> 当没有其他的操作的时候useVModel可以当做穿透使用

有时候要使用:value与@update:value，而不是v-model，因为在update的时候可能会有额外操作

可以手动去触发表单事件，为了校验等等

\`\`\`markdown
const { onFieldChange, onFieldBlur } = Form.useInjectFormItemContext()
\`\`\`

权限与跳转的方式

\`\`\`javascript
<Button v-permission="$AK.EcsInstance.Create" type="primary" @click="$tools.safeGo($AK.EcsInstance.Create)">创建云主机 </Button>
\`\`\`

\`\`\`javascript
<Menu.Item @click="setBps.open(record)" v-if="$permission($AK.EcsPublicIp.SetBps)">设置带宽</Menu.Item>
\`\`\`

\`\`\`javascript
const $AK = useActionKey()
createAction: {
  title: '申请',
    fn: params => API_PUBLIC_IP_APPLY(clusterId.value, params),
    permission: $AK.EcsPublicIp.Apply
},
\`\`\`

$开头是全局变量

多个表格的columns的属性尽量不要重复（拆出来）

对于api的处理，可以放在api模块中，也可以放在请求之前的代码中，也可以放在配置的入口中（Fn），要看场景不同，做不同的选择，需要处理的时候才用async函数，否则返回promise就行

类型转换用+和tostring

取整 (nPeriod / 1000) | 0

!! 强制转化为布尔类型

？？ 如果前面的值不是null或者undefined返回前面的

|| 则会将0 ''之类的也返回后面的

hook只能在顶层setup中使用

都需要监听的时候也可以在pinia（hook）里面放watch

ben规范

&/_/_xx

激活：&/_/_xx--active

scoped的时候用deep

注意常见值有css变量

有些时候也可以用伪元素来表示“/”之类的东西

功能和组件都要尽量拆小，尽量复用

当关系复杂的时候，比如快照id和快照record，不应该同时手动设置，而是watch快照id，去修改快照record，然后再watch 快照record去修改硬盘的值

第三方库放最上面，at的库放中间，最后放./的文件

解构出来可以重新命名

\`\`\`vue
const { result: subnets, loading, getData } = useBaseDetail({ getFn:
API_SUBNET_LIST })
\`\`\`

...是剩余参数

可以使用解构+剩余参数

要保持有套/_box的想法

BdTable里的列属性有ellipsis：true来控制省略号

什么时候用scoped，什么时候不用？

scoped可以覆盖默认样式，处理优先级问题

通用型的组件可以用scoped保持内部结构

业务组件简单修改不是本组件样式可以用scoped

如果要写很多css就不要用scoped

## ts

可以这样定义一个新的ts

\`\`\`typescript
type UnitData = ApiMpaasMetric.Item["unitData"];
\`\`\`

<font style="color:rgba(0, 0, 0, 0.85);">把对象变成数组</font>

\`\`\`markdown
type DictionaryRes = DictionaryItem[]
\`\`\`

<font style="color:rgba(0, 0, 0, 0.85);"></font>

<font style="color:rgba(0, 0, 0, 0.85);">omit</font>

\`\`\`javascript
// 使用 Omit 排除 User 类型中的 age 属性
type UserWithoutAge = Omit<User, 'age'>;
\`\`\`

把T中所有属性变成可选

\`\`\`markdown
type StateType = Partial<ApiApaasMonitor.AlarmRule & { receivers: string[] }>
\`\`\`

任意的字符串key和any值

\`\`\`typescript
interface Props {
  [key: string]: any;
  namePre?: NamePre;
}
\`\`\`

 // @ts-ignore:可以忽略ts的报错

还有 as any

<font style="color:rgba(0, 0, 0, 0.85);">declare namespace xxxx: 定义一个命名空间，防止变量冲突</font>

<font style="color:rgba(0, 0, 0, 0.85);">declare xxx 相等于是一个全局定义</font>

<font style="color:rgba(0, 0, 0, 0.85);"></font>

<font style="color:rgba(0, 0, 0, 0.85);">!表示告诉ts，这个变量不会是null或者undefined</font>

## 命名

display:展示

box:盒子

item：每一项

tool/help 纯函数

constant 常量

columns 表格列

## 组件

有api select

有api table select

有table form

## 用法

.vue文件写tsx语法，.vue文件写template语法，写.tsx文件（tsx语法）

.tsx文件和vue tsx的区别

vue文件中可以补充写style，.tsx文件想要写样式需要再引用css文件

.vue文件写tsx语法和.vue文件写template语法的区别

1.tsx代码可以像普通的 JavaScript/TypeScript 函数一样进行封装和复用。将一些通用的 UI 组件封装成函数，在不同的地方直接调用，提高代码的复用率。

2.当组件包含复杂的动态逻辑和条件渲染时，TSX 语法可以更好地处理这些情况。TSX 允许直接在代码中使用 JavaScript 表达式和函数，避免了在 <template> 中使用复杂的指令，使代码更具可读性和可维护性（.tsx语法中循环用map,判断用js语法，不使用v-if,@click）

3.tsx语法对于ts更加友好

4.性能来说template语法更好

tsx语法

onxxx是方法 onSetCursorStyle

xx是属性 fontSize

使用变量都是{}的方式

<></>类似于<template></template>

正常的函数一般是{},但是如果没有js，tsx会使用()包裹，这里面也可以使用null

定义常量对象（映射写法）

\`\`\`typescript
export enum WORKLOAD_STATUS {
  REPLICA_FAILURE = "ReplicaFailure",
  PROGRESSING = "Progressing",
  AVAILABLE = "Available",
}
export const WORKLOAD_STATUS_COLOR = {
  [WORKLOAD_STATUS.REPLICA_FAILURE]: "error",
  [WORKLOAD_STATUS.PROGRESSING]: "processing",
  [WORKLOAD_STATUS.AVAILABLE]: "success",
};
\`\`\`

系统内部是包含字典的（字典：key/value的转换）

一个表单数据，可能来自多个组件，于是可以抽离状态为hook，然后将同一状态应用于多个组件，数据和界面分离，一个复杂的表单数据用pinia

props和attrs 定义过的是props，没定义过的是attrs

v-slots 和slot.default()去使用

## 状态抽离

什么时候数据外面，什么时候放里面

什么时候用Pinia，什么时候不用

如果ref不定义在init方法中，数据一辈子不会丢失的，这时候要依赖mounted去resetState

多vue文件共享状态可以用pinia的

但文件抽数据出去，其实可以将状态定义在方法之中（init之中）

## vue

v-slot

attr

属性

方法

ref

expose

### 传递一堆属性

\`\`\`vue
{summaryData.value.map(item => (
  <QuotaCard {...item} class={bem('item')}></QuotaCard>
))}
\`\`\`

### 组件穿透v-model(useVModel)

\`\`\`vue
const emits = defineEmits(['update:value'])
const valueTmp = computed<any[]>({
  get() {
    if (!props.value) return []

    if (isRef(props.value)) {
      return isString(props.value.value) ? props.value.value.split(',') : props.value.value
    }
    return isString(props.value) ? props.value.split(',') : props.value
  },
  set(nval) {
    const _res = props.format ? nval.join(',') : nval
    emits('update:value', _res)
  }
})
\`\`\`

computed可以设置get与set 类似于useVModel

### 组件穿透属性v-bind

\`\`\`vue
<template>
  <Top v-bind="topProps">
  </Top>
</template>
<script lang="ts">
const props = defineProps(pageDetailProps)
//可以通过这个方式过滤出来几个不需要传递进去
const topProps = computed(() => {
  const { panels, activeKey, defaultActiveKey, ...rest } = props
  return rest
})
<script>
\`\`\`

### <font style="color:rgba(0, 0, 0, 0.85);"> v-bind="$attrs"</font>

const attrs = useAttrs()

可以将所有父组件传递过来的非prop属性传递给里面的组件

### v-slot透传插槽

传递插槽可以使用<template #footer>

也可以这样去绑定

\`\`\`vue
<Table
    size='middle'
    class={bem({ hideno: props.useLastId })}
    scroll={{ y: props.height }}
    rowKey={props.valueKey}
    rowSelection={rowSelectionMerged.value}
    columns={props.columns}
    pagination={props.pagination === false ? false : pagination.value}
    loading={state.loading}
    dataSource={state.dataSource}
    custom-row={customRow}
    v-slots={{
      footer
    }}
    {...attrs}
  />
\`\`\`

插槽透传

\`\`\`vue
setup(props, { slots, attrs }) {
  const renderTitle = () => <DivideTitleBase>{props.title}</DivideTitleBase>
  return () =>
  <Card
    loading={props.loading}
    class={bem()}
    v-slots={{ title: renderTitle, ...slots }} {...attrs}>
  </Card>
}
\`\`\`

bdcard里面也有插槽用法

![](articles/wvns65k5nu5fqiiw/1738474089400-0983a835-59de-47dd-853d-de41f0d699f6.png)

循环透传

\`\`\`vue
<template v-for="item in Object.keys($slots)" #[item]="data">
  <slot :name="item" v-bind="data || {}" />
</template>
\`\`\`

单个穿透

\`\`\`vue
<div v-if="$slots.extra" :class="bem('extra')">
  <slot name="extra" />
</div>
\`\`\`

### 深度数据使用provide,inject

hook:带响应式的函数

# 后台

## 代码结构

### api

### assets:静态资源

### components:通用组件

### constant:常量

枚举，固定常量对象

### directive:指令

app----->v-app

permission->v-permission 没有权限按钮隐藏

### hook:逻辑复用

页面跳转

sql条件

弹窗确认

异步组件

弹窗确认删除

Tabs组件初始化(ant-design)

form组件初始化(ant-design)

table组件刷新，初始化(ant-table)

页面详情数据

图片预览

轮询

密码

重定向

验证码

### layout：布局模板

### plugins：插件

菜单管理常量

dayjs额外功能

g2自定义主题

发布订阅

页面跳转工具

### router：路由（守卫）

功能模块：

容器云(apass)

系统日志(audit)

个人信息(center)

费用中心(finance)

云主机(ipass)

站内消息(message)

告警中心(mpass)

云运营(operator)

轻量服务器(sas)

应用管理(setting)

工单(workorder)

### store：仓库

字典数据

权限

当前用户个人信息

当前用户消息

### styles：样式

通用样式

主题颜色

### utils：工具函数

浏览器存储

单位格式化

客户端，浏览器适配格式化

判断网络

判断环境

## 部署

提交coding后，进行build

然后在coding中

看持续集成->构建计划->ca-cloud-master_feature

每一条构建对应一个commit id

复制commit id

替换k8s上对应deployment的tag

全自动部署

dev:开发

pre:预发布

pro:生产

## 功能介绍

产品与服务

云运营

告警中心

容器云

轻量服务器 sas

云主机 ipass

个人

费用中心

工单中心

个人中心

云审计（登陆日志）

管理

系统管理

## 架构

路由

权限

字典

大页面框架layout

页面整体布局

# 网站(nuxt.js)

## 语法学习

在computed中使用...mapGetters(['layoutData','xxx')的语法即可获取到仓库数据，供页面使用

做新功能的时候一定要想以前有没有做过，有没有通用的组件和方案，切记上来大费周折，也不会对的

arr.reduce可以用来做数据处理

mixin.js不一定要写在目录的mixins下，几个文件也可以共用一个mixins，类似于小范围hook

bem规范，一个文件也可以分成几块name-a/_/_xx name-b_xxx，状态的更改用--xxx

滚动有ScrollMixin.js

页面内容一定要组件化，一块内容为一个组件，一块就是重复的样式

重复item.case一定要大肠包小肠，一个复杂功能也要拆成一个文件

定义一个$this: &;，然后使用#{$this}，为了bem规范好使用

页面结构就是node.js静态数据的结构，由于结构一致，还很好的去做栏目层级

flex做布局的时候list是最外层，item是内层，但真正写东西可以写在最里面那层card中

参考Character.vue

多个页面的重复一定要写入mixin中

bao-content是固定1400的宽，如果你不需要或者选择需要，可以设置成动态class

\`\`\`javascript
<div :class="size === 'large' ? 'bao__content--large' : 'bao__content'">
\`\`\`

点击以后需要动画，参考components/PageAiService/Tab.vue

inline-block,inline-flex可以考虑

&:not(:last-child) 带类名的不是最后一个元素

如果害怕一个元素没有，而动画报错，可以参考components/PageCardBase.vue

优先级不够就直接用!important

## 命令

\`\`\`json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
},
\`\`\`

dev:开发环境，同时会热更新

build:生产环境打包

start:生产环境运行

> 无论是dev还是build都会生成.nuxt文件夹，里面是静态文件--->真正的执行文件
>
> 当然pnpm dev和pnpm build里面生成的内容是不同的
>
> 如果需要打包的话，必须先执行yarn build 再执行 yarn start

## 项目结构

### 仓库（store）

定义全局数据（页面数据，栏目数据【nodeList】,布局数据）

注意：nuxtServerInit方法会在服务器端执行，提供数据（他会在服务启动的时候立刻执行）

### 插件（plugins）

api接口的封装（注入inject）

vue懒加载指令

数据格式化处理（日期，电话，邮箱）

### 页面（page）

具体路由对应的页面

> 注意：只有这里面的.vue文件才可以使用asyncData，asyncData会在服务器端请求数据，并且组装好html页面

### 混合（mixins）

mixins 的调用和处理时机是在 asyncData之前的，mixins 完成选项合并为后续 asyncData 等逻辑的执行提供了基础的组件配置。

> <font style="color:rgba(0, 0, 0, 0.85);">混合规则：</font>
>
> <font style="color:rgba(0, 0, 0, 0.85);">数据对象 data：递归合并，组件的数据会覆盖 mixin 中同名的数据。</font>
>
> <font style="color:rgba(0, 0, 0, 0.85);">方法、计算属性和监听器：若有同名情况，组件的选项会覆盖 mixin 的选项。</font>
>
> <font style="color:rgba(0, 0, 0, 0.85);">生命周期钩子：合并后按顺序执行，mixin 的钩子会先执行。</font>

### <font style="color:rgba(0, 0, 0, 0.85);">配置（config）</font>

静态数据

### 路由

获取当前路由信息

this.$router ------->跳转

this.$route ------>路由信息

可以watch路由

\`\`\`vue
watch: { $route() { this.visible = false } }
\`\`\`

嵌套路由结构

![](articles/wvns65k5nu5fqiiw/1738298012023-f0ec8794-9f86-4e3a-a7fb-219095690df7.png)

![](articles/wvns65k5nu5fqiiw/1738298472670-321d525d-9137-4cf9-8e6e-2db64fc6b861.png)

[https://blog.csdn.net/mantou_riji/article/details/131878558](https://blog.csdn.net/mantou_riji/article/details/131878558)

### css

1.媒体查询，确定同一个样式在不同宽度下的设置

2.统一的颜色变量

3.不同尺寸下的字体大小

4.布局列宽

通过不同尺寸的flex设置

通过设置grid的重复个数

单位使用

px

vw

百分比

### 常用功能

gsap 动画库

包含插件：ScrollTrigger

.fromTo（元素，起始状态，结束状态）

起始状态的每一个属性的值可以是一个函数，通过计算，他会给你提供一些信息

.timeline

动画的本质：从一个状态变到另一个状态

滚动处理

滚动条样式

文字省略

放大图片

引入js的方式  
1.全局引入  
2.单文件引入，在mouted的时候动态引入  
3.用v-html写成富文本引入

注意nuxt-link不可用，他不是全局刷新，不会运行script内的脚本  
但a标签可以，因为他是ssr服务器渲染

## 部署

<font style="color:rgba(0, 0, 0, 0.85);">docker-compose up -d</font>

<font style="color:rgba(0, 0, 0, 0.85);">docker-compose up会去读</font><font style="color:rgb(0, 0, 0);">docker-compose.yml，然后运行这个docker</font>

<font style="color:rgba(0, 0, 0, 0.85);">-d 选项表示在后台运行容器，即启动容器后，命令行终端会立即返回，不会阻塞在容器的输出日志上，方便用户继续在同一终端执行其他操作。</font>

# 其他

## 前置工作

代码：coding（集成oa,集成ci/cd）

> [https://g-rxhx8847.coding.net/user/projects](https://g-rxhx8847.coding.net/user/projects)

接口: yapi

静态页面: figma

> [https://www.figma.com/design/1IcOQnUqkDVK4KKTY3PxPS/paas%E5%8E%9F%E5%9E%8B?node-id=2819-4103&p=f&m=dev](https://www.figma.com/design/1IcOQnUqkDVK4KKTY3PxPS/paas%E5%8E%9F%E5%9E%8B?node-id=2819-4103&p=f&m=dev)

邮箱： 阿里企业邮箱

安装nvm 使用Node18

设置nvm下载地址：node_mirror: [https://npmmirror.com/mirrors/node/](https://npmmirror.com/mirrors/node/)

安装

npm install -g cgr

cgr ls

cgr use taobao

设置编辑器的crlf与lcrlf

<font style="color:rgb(0, 0, 0);background-color:rgb(250, 250, 250);">git config </font><font style="color:rgb(166, 127, 89);">--</font><font style="color:rgb(0, 0, 0);background-color:rgb(250, 250, 250);">global core</font><font style="color:rgb(153, 153, 153);">.</font><font style="color:rgb(0, 0, 0);background-color:rgb(250, 250, 250);">autocrlf </font><font style="color:rgb(1, 132, 187);">false</font>

> 设置不要自动切换换行符，可以保持一致性

## 账号密码

电脑密码

calpass123

宝武vpn账号

524315

3318590znjll

coding邮箱密码

kuai.yu@yunbianyun.com

Yk19970901!

邮箱

kuai.yu@yunbianyun.com

Yk19970901

pass后台（线上）

18258231842

Yk19970901!

pass后台（测试）

18258231842

admin123456.

## 代码规范工具

cypress：测试框架-------->jest.config.js

Prettier：代码格式化工具-------->prettier.js

ESLint：修正代码问题---------> .eslintrc.js

<font style="color:rgba(0, 0, 0, 0.85);">plop：自动生成代码的工具</font>

<font style="color:rgba(0, 0, 0, 0.85);">.husky：提交规范------>commitlint.config.js</font>

<font style="color:rgba(0, 0, 0, 0.85);">styleLint：css规范------->.stylelintrc.js</font>

<font style="color:rgba(0, 0, 0, 0.85);"></font>

<font style="color:rgba(0, 0, 0, 0.85);">代码格式：.editorconfig</font>

<font style="color:rgba(0, 0, 0, 0.85);">js兼容性：.babelrc</font>

<font style="color:rgba(0, 0, 0, 0.85);">浏览器兼容性：.browerslistrc</font>

<font style="color:rgba(0, 0, 0, 0.85);">包安装配置：.npmrc</font>

## 专业术语

### ci/cd

持续集成（Continuous Integration，CI）

持续交付（Continuous Delivery，CD）

### <font style="color:rgba(0, 0, 0, 0.85);">函数单一原则</font>

一个函数或者一个hook就做一件事情

<font style="color:rgba(0, 0, 0, 0.85);">一个函数应该只负责一项单一的任务或功能</font>

<font style="color:rgba(0, 0, 0, 0.85);">为了可读性，可维护性，可复用性</font>

### <font style="color:rgba(0, 0, 0, 0.85);">pr</font>

Pull Request（代码提交请求）

### cr

代码审查（Code Review）

代码的修改

### gitflow

五种分支

master：主分支，线上分支

hotfix：热补丁分支，负责线上紧急问题的修复

release：预上线分支

develop：开发分支

feature：功能分支

source tree可以查看整个代码的图谱

## 面试提问

最近一份工作不满一年的人，会觉得不稳定

上一份工作内容，职级，部门有多少人

算法

核心原理源码

有做开源贡献吗

个人源码地址

## 工具

nvm

node

npm

yarn

pnpm

git ssh

可以去获取缓存的位置 通过命令行

18.20.4

9.1.1------->当前已经被修改版本

9.15.3---->运行版本

## ....

**只要你不想从同事那边获得到信息或者好处 冷漠是很好的方式**

---

**其实拍领导马屁或者同事拉帮结派，玩的就是一个社交 拉近关系 相互信任 好办事**

不要被工作内容和同事的话语影响情绪

说实话 这个想到简单 做到很难

计算方式无敌恶心

换合同

加班 日常卷？

大家好 我的名字叫俞快 是新来的前端开发 刚来公司有什么不懂的希望大家多多关照 谢谢

网站这边东西还挺多的 然后陈总希望年前就要弄完 感觉自己上周改这个后台挺多的 如果还是这样肯定弄不完这个

领导1

说话模棱两可 你们这两个前端 后面话也不说

领导2

我k8s都没弄过 就说要我部署

我说做不完 他还说让我。效率高点就行

他一旦挨叼了，就会到处发疯

找bug，找漏洞 开始活跃起来

大领导

他对别人催他时，降低要求cr，会先合并，后面再自己去改

对代码质量有要求

不尊重，不耐烦，沟通困难（现在有所好转）

说话喜欢拉高维度 + 拉高要求

不是很在乎话术 自己能讲

上网冲浪之人

同事1

甩锅说接口说做好了 人情世故

说是今天能给，但只是缓兵之计 让领导看起来好一点

明明还没有那个接口却在老板面前说有

下班了 我走了以后 他还要进老板办公室提一嘴 恶心我一下

没给他打车钱 没给我吃饭钱

同事2

年会人情世故：

1.于找陈总 搭话

2.跟领导说要办公体现热爱工作 跟我们说不想活动准备跑路

3.表面不想去 实则左右逢源 还搭话了需求方

4.问老金为何不来 搭话

5.搞活动参加的时候 跑的飞快，写纸的时候还看我一眼

6.一开始的时候叫我们一起走，后面自己说要走还不走，还要叫我们一起走来试探，要走的时候知道找陈总说下情况 回苏州等等

7.关于奖品 他很知道如何去拿 如何去操作

过年打牌一定要让我参与进来，绑到一条船上

一方面说没意思 一方面说延长试用期 但还是人情世故，察言观色 也没有想走 说说而已

自己躲在角落观察 其实本事却总是扭转屏幕做其他事情

本来10点来，今天9.30，来的时候催人下班，下班的时候，急着走；不说原因，但需要拉人

说话模棱两可

隐藏细节 隐藏不好的 不展示事实

会喜欢先叫？

会说自己很苦很累，会叫的孩子有奶吃？

不催他不急不慢 催了开始叫

一进来就说自己待着没意思 过完年就走 但是不走

我空着还难受 要给我安排活

发消息故意不回复

要看我写的总结，但自己知道关于更多信息却不与我共享

透露我薪资 有点恶心

偷看我电脑 手机 股票 无边界

其实他很懂 不用公司网 不听扭动电脑屏幕不让别人看

同事之间搞好关系，面对领导阿谀奉承 表现的很积极，但其实背后一直不干活

全是负面 诉苦 但其实还是不会走 纯纯恶心队友

不想走的时候编理由手机要充电，他有自己的时间，急的时候很急，缓的时候很缓。不让看电脑屏幕，却要看别人屏幕

在忙别的时候没听清的时候，说自己要进电梯了

为了跟离职同事最后时间一起走 最后三天 居然决定早那么多来

然后人走了 现在又开始迟到

今天迟到又找别人打卡了 不会跟你说的

我问他干嘛 他居然想到说设备对账，明明自己在学权限管理 离谱了哦

套我话 想偷 其实我可以不跟他说这么多的 又共情了 这人跟你玩猫腻的 你还有啥说啥

还故意说帮我一起写 其实怎么可能

领导那边说这周交 其实还在摸鱼 明明不会给他弄完 还答应干脆

他位置坐里面 好像他随时监控我一样 但我却不知道他的屏幕

故意放出一些声音 陈或者对接的声音

故意隐藏一些声音 自己的摸鱼声音

求人的时候，问问题的时候， 一声声快哥

然后 你明天有没有空，想要我帮他忙，干活

他先去吃兰州 然后问老板要可乐 跟老板说你给我可乐 明天给你带生意

然后跟我们说去吃这家 送可乐（一边拿好处，一边还给人情）

<font style="color:rgb(38, 38, 38);">其实他内心还是在意这个公司的，觉得这公司还可以的，其中点：  
</font><font style="color:rgb(38, 38, 38);">1.做表面功夫，说好话  
</font><font style="color:rgb(38, 38, 38);">2.在乎事情，不轻易请假  
</font><font style="color:rgb(38, 38, 38);">3.用自己网干别的事情，害怕被知道</font>

<font style="color:rgb(38, 38, 38);">4.代码提交不上去很急，想着各种对策，叫我帮他解决问题，拖着我时间  
</font>

帮他解决了问题

还延长了自己30分钟，而且工作时间也耗费了我很多时间精力

还增加了自己帮他解决问题的时间

还想骗我帮他加班看问题。

应对

一定要置之不理，不要管他的话，不要被他影响

下次不想吃直接拒绝 想上去也直接上去

他抽着烟，你还要凑过去帮他看问题，你是不是贱啊，你还要吸他二手烟，太离谱了吧

拒绝理由

明天去女朋友家，我先走了

我没坐地铁，我在这边住的

抽烟

喝酒

打牌

台球

商k

按摩洗浴

-------->外向 有些操作自带社交属性 拍马屁

-------->说话不用负责，今天与明天的想法也不同

同事3

pua话不断，问问题不耐烦，接口问题巨大，工作心不在焉，傲气，拉踩

说话阴阳怪气

大厂经历

使劲玩套路，欺下媚上

日志里面数据别人处理好的 他需要前端处理

搜索别人是后端做，他需要前端做

别人是给具体值，他只给id,需要前端去查

有一些自定义组件，他希望前端尽量多写

他希望前端去做滚动 拖拉等操作 自己却只给一个简单接口

比如一个单位数据，他需要你把单位处理好给他

我问他的时候态度不耐烦 语气很冲

他问我的时候 我却对他正常回答

从没有主动示好 我也不要对他这样

接口给的随心所欲 完全就是逻辑让前端来处理，保证自己不粘锅

领导面前 阿谀奉承 我找他阴阳怪气

我找他改数据 一副不情愿，而且还是经过我主管同意的 我跟他确认的东西他要改 他张口一句 我正常回答好的

领导面前 我这边都好了 就差前端 其实自己还有很多没弄好

给我提的bug 都是一些奇奇怪怪的需求 对前端要求高 对自己接口要求低

一旦让他做 这个不要 那个不要 前端来做的东西 这个要 那个要

看到问题的时候说我也注意到了，但我还没提

这个前端还没接

这个我这边改了字段 前端还没接

每次找领导都是在自己弄完，前端没弄完的时候

故意开门说话

故意说单元测试，或者讲一些麻烦的事情

开会的时候 来我们这边打水

一口一个陈总 都是舔的词语

过来问我有没有什么要对的，我说没有，他还要来句 真是少见（意思说你咋没问题？）

开会之前 擦黑板 眼里有活

提问的时候刷存在感 集团有益的问最后时间 给人一种努力工作的感觉

同事4

找别人借火

左右逢源，制造话题

针对某一个同事，抬杠。啥事都要了解，都要关注，都会问，算是想当消息中心，也有可能是面试想吹牛皮

同事1说是要买月饼 然后要去灵隐寺 同事2.3响应 因为领导1去年去了 即使很早 即使要买门票

同事5

注意:在更换了任务系统后，后端发现前端不知道，于是要跟后端主管确认后才肯给链接，严谨

同事N+后端+c

他们都喜欢指责别人

臭外包的

scc怎么这样啊

lzx弄半天也不行

华为云做成这样

又开始跟傻子对话了

下班了 找后端主管说点事情，或者说点话，折腾点动静出来，刷下存在感

餐巾纸问题

<font style="color:rgb(38, 38, 38);">独揽餐巾纸，一个人边上两包</font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);">他们的社交方式</font>

一起抽烟

<font style="color:rgb(38, 38, 38);">搞一些社会话题，新闻</font>

<font style="color:rgb(38, 38, 38);">吃饭，下班等</font>

<font style="color:rgb(38, 38, 38);">说不发工资，来引起共鸣</font>

<font style="color:rgb(38, 38, 38);"></font>

个人礼仪和学习的地方

不能说随便你，而是你看呗，可能口气会更好一些

分开的时候，我说拜拜还在看手机，应该礼貌性的看他一眼

团建吃饭

不要记住自己的傻逼点

一开始吃饭的时候一定要杯子里倒点喝的

不倒 倒加多宝就算了 还是别人吃过的

吃过的算了 还想去倒酒 其实自己里面还有饮料

还被人指指点点 我头太痛了

其实想走就走吧

给我饮料我还不喝 我是傻逼

让领导倒酒 还来一句领导夹菜我转桌

喝酒还要多倒给自己 呵呵

打招呼：

拿外卖

去吃饭

吃完了

走拉，下班了

不要跟别人主动说前端很忙，一旦这样，他们就会说前端没空做，变成卡在前端了。。。。（实际可能他们也没有弄完）

## 坚持不下去看一看

gap期太久了 你这里不去真的没工作了 要过年了

他待遇还是可以的 7000五险一金 13k

他还要开年会 工作日两天 后面马上过年了 说不定还发东西 坚持一下

上一天班拿590

不是外包

不用出差

技术栈符合

双休

能学到东西，纯前端

弹性打卡

想想开局混的2天

想想年会前的3天

想想过年前的3天

想想年后的一周

想想最近的3天

想想旭还要出差

想想还有进步日

想想之前还要加班 公积金 社保还低

想想之前的摸鱼时光 想想服务员4-6k

加班忍忍

挨骂忍忍

## 开会

去上海开了一次会-->与我无关

年度总结--->写了一篇

研发大会---->与我无关

陈总来杭州开会--->与我无关

Q1汇报----->写ppt

Q2汇报

Q2-中 汇报

Q2结束

## 总结相关

### coding任务

[<font style="color:rgb(32, 45, 64);">事件中心查看告警历史</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/3457)

[<font style="color:rgb(32, 45, 64);">告警中心查看历史分页和增加字段</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/3478)

[<font style="color:rgb(32, 45, 64);">告警静音</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/3484)

[<font style="color:rgb(32, 45, 64);">云平台端口增加可用地址对功能</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/3481)

[<font style="color:rgb(32, 45, 64);">通知渠道增加文档，飞书渠道增加秘钥</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/3491)

[<font style="color:rgb(32, 45, 64);">告警历史增加多渠显示</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/3492)

[<font style="color:rgb(32, 45, 64);">云主机接入mpaas监控接口</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/4137)

[<font style="color:rgb(32, 45, 64);">快照恢复，快照回滚</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/4165)**<font style="color:rgb(32, 45, 64);">  
</font>**[<font style="color:rgb(32, 45, 64);">修复监控图表无法渲染</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/4174)

[<font style="color:rgb(0, 102, 255);">云主机告警与告警事件</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/4166)

[<font style="color:rgb(32, 45, 64);">pinia重写状态,云硬盘镜像创建云主机</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/4173)

[<font style="color:rgb(32, 45, 64);">创建应用，子网默认选中默认值</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/4208)

[<font style="color:rgb(32, 45, 64);">云硬盘增加快照入口</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/4227)

[<font style="color:rgb(32, 45, 64);">创建服务器，网络随机分配参数fix</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/4230)

[<font style="color:rgb(32, 45, 64);">资管指标单位获取</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/4232)

[<font style="color:rgb(32, 45, 64);">告警指标增加单位展示</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/4234)

[<font style="color:rgb(32, 45, 64);">创建虚拟机网络接口修改</font>](https://g-rxhx8847.coding.net/p/ca-cloud-web/d/ca-cloud-master/git/merge/4243)

### 素材

遇到的困难 做了那些事情，成果是什么

我自己下一季度的计划

理解组件 熟悉组件

理解业务

多从review中学到一些东西

多记笔记，后面再飞书多做总结，多思考，多花时间去理解吧

先会用，然后后面也有能够封装好组件的能力

尽可能的按照老金之前的思路去写

加深组件化，模块化的思想

老金的代码质量确实厉害，很高，无论从语义上，架构上都有很高的复用性和可维护性

也希望能够与后端同事好好，逻辑方面，接口方面我有不懂的地方也请多指教

工作中也看见了不一样的用法，打开了新的思路，对我来说也是宝贵的财富

### 总体任务

1 云网资管运维平台落地

2 @paas平台各产品推进

3 @wan2.0 平台改造

4 AI智能体平台上线

### c句

前端工作不是按原型ui设计的写 尤其管理端一定要深入理解业务

你们自己真的就就我们这里有写有写，有写网站的，有写后台的。业务你要自己去理解，用什么组件控件会更加合适，要要多沟通。嗯，觉得你在沟通这块东西上面的话，其实还是要更加主动，对吧，不要等着老金。就看到问题了，去催，然后还有就是老金给你们review的代码，所有的意见的东西啊，记笔记吧，我觉得就不行的话，真的记笔记就就把它记下来，然后然后然后那个。哎，在那个飞书上面，其实是有那个知识库的。我觉得你们两个可以共同去建一个知识库，放在那边。

一定要把效率提起来

### 转正提交

1.多去理解和学习已有的组件和工程化的代码架构，在拿到一个功能的时候能够灵活运用已有组件，加深组件化，模块化的思想，写出符合要求的代码

2.对已经cr的代码去写笔记总结，理解代码为什么需要这样去改，下次遇到类似场景能以更好的方式去处理

3.更多的去理解业务，理解产品功能与功能的之间的潜在关联，做出更好的交互逻辑和效果

本岗位主要是根据设计稿去完成页面的开发，在做paas开发的时候还需要去更多的了解业务，才能明白页面与页面，选项与选项之间的逻辑关系，在做网站开发时还需要考虑一些响应式布局和交互的动效果；当然，在开发的过程中还需要和后端与ui多沟通交流，确保需求的准确无误。

## 后端名词

openstack

gateway 网关

netros

ks8 docker

jks

公网ip

机器

redis 一主二从三哨兵

nginx

## 公司学习

打印机 docker k8s

feature dev pre

## 难点亮点

树相关：树转数组，数组转树，查找树，生成树，展示树等等 多父树的处理

讲讲这个详细描述组件

src/components/Common/Select/src/Desc/index.vue

讲讲bdTable,bdform

骨架屏

hook

拖拽，右键，文件上传

权限

## 第三方库

@wangeditor 富文本编辑器

xterm 远程连接机器

codemirror 写代码和展示代码

@vue-office/excel excel预览

v-contextmenu 右键菜单

vue-draggable-next 页面元素拖拽

## 报销

云边云科技（上海）有限公司杭州分公司

91330109MADH5HAF67

## 人情个人

那天解决网站bug:

我不应该把抱怨的话发给陈总

金是跟我有关系 而且熟悉才说的

但是这个我不知道给c看合适不合适

恶心人的人那天问我的那个问题：

我回了 我过去找他

这一步 我不该过去的，而是找coding,回消息可以有点滞后的，自己需要多想想（他总是对人最大恶意，没有好态度，没必要对他，跟他有关系）

## 暂存恶心

元旦前他请假了

给我发图片，给我发链接，但他不主动要做去弄数据，其实我可以装不知道 自己非要讨好他，然后我给他发还不回，想想其实他给我发的我也可以不回

之前机器人英文我说过一嘴，我来弄的，其实我不该这么说的，而且还是聊天记录，有记录有凭证。然后他就给我发机器人群里的截图，就是想说要我搞呗，截图给我，不直说，呵呵

被恶心了一手c，其实他就是一个要面子，要派头，很装，想压榨多干点活的人，自己不懂

他直接就说要改界面

l不喜欢这样 去迎合他的领导？

然后问他问题模棱两可 说话模棱两可 为了没有漏洞 后面不背锅呗 心思真多

源清则流清 具象化了

c本身也是要甩锅的 找人背锅 喜欢背后问人家接口如何 背后评价人

c和l和j都是要表面面子的人，不希望顶撞 特别是当众

l喜欢或者希望是有个好态度跟他说话的 不接受脾气不好的说话

c由于自己不懂，于是很依赖l和j，所以都跟他们说话都有点带开玩笑或者配笑脸的 特别是讨论问题或者解决着急bug的时候

## 帮助打卡

### 起因：

需要我给他提供打卡证明

### 欺负人的地方：

辩不过来就扯开话题

明明跟l抽烟，却不问他要

明明没请假，却要骗我 还是说请假到了3.44

推辞不掉了就扯开话题

一定要给我喝饮料请我喝酸奶

反复问 还是不认 但也不敢澄清，包有问题的，我不想说了 知道他不是什么好人就行

### 给自己的退路：

给了我就说不知道呗

### 找他确认的话：

你是不是没请假

然后手机电量 咱们都真诚点

我也不傻 我觉得这话咱们讲讲清楚 咱们

### 告诉他的事情：

都是前端

我看我这么久 又告密或者说什么坏话吗

你心里记着就行

下次咱们互相帮忙

表达爽快帮忙

表示互相帮助

真诚

我不是傻子

### 拒绝理由：

干坏事不能老拉上我 我不接受，良心过不去

你们干啥 别拉我上我，我肯定事不关己的

而且我感觉我都第二次找你 你还是没跟我说实话

我内心不让我做这个事，而且我觉得做了我不舒服

我昨天也直接就拿出来了 我可以不给的 对吧

我没坐地铁 跟女朋友在滨江玩
`;export{n as default};
