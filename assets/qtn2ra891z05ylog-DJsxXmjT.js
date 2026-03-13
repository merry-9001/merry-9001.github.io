const t=`---
title: echart
urlname: qtn2ra891z05ylog
date: 2024-11-13 17:04:55 +0800
tags: []
description: 生成了一个echarts实例,配置一个对象const myEchart =
  echarts.init(document.getElementById('chart1')); myEchart.setOption({
  })title（标题）主要是文本样式，背景样式，是否显示，位置，阴影 titl...
image: articles/qtn2ra891z05ylog/1731573087821-a579c18d-7d1e-4303-9d1e-aa4546034a34.png
categories: []
---

生成了一个echarts实例,配置一个对象

\`\`\`javascript
const myEchart = echarts.init(document.getElementById("chart1"));

myEchart.setOption({});
\`\`\`

## title（标题）

主要是文本样式，背景样式，是否显示，位置，阴影

\`\`\`javascript
			title: {
				id:'',
				show:true,	//是否显示标题组件
				text:'当月销售业绩清单',
				link:'http://www.baidu.com/',
				target:'self',
				textStyle:{
					color:'gold',
					fontStyle:'italic',
					fontWeight:'normal',
					fontFamily:'Microsoft YaHei',
					fontSize:20,
					lineHeight:30,
					textBorderColor:'red',
					textBorderWidth:2,
					textShadowColor:'#000',
					textShadowBlur:2,
					textShadowOffsetX:10,
					textShadowOffsetY:10,
				},

				//幅标题
				subtext:'陈学辉',
				sublink:'http://www.qq.com/',
				subtarget:'self',
				subtextStyle:{

				},


				textAlign:'left',	//两个标题的内容不一样的话，有可能被截断
				padding:[10,5,20,30],
				itemGap:20,

				left:10,
				top:10,

				backgroundColor:'#ccc',
				borderColor:'#000',
				borderWidth:2,
				borderRadius:[5,10,20,30],

				shadowColor: 'rgba(0, 0, 0, 0.5)',
				shadowBlur: 10,
				shadowOffsetX:5,
				shadowOffsetY:5,
			},
\`\`\`

## legend（图例）

主要设置类型(滚动非滚动),名字，图标，选中模式，动画

\`\`\`javascript
legend: {	//图例组件
  //show:true,
  data: ['今日销量', '昨日销量', {
    name: '明日销量',
    icon: 'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
    textStyle: {
      //float:'left',
    }
  }],
  type: 'plain',
  left: 'right',
  orient: 'horizontal',
  padding: [10, 20],
  itemGap: 20,
  itemWidth: 35,
  itemHeight: 24,
  formatter: '{name} 高么？',
  formatter: function (name) {
    return "你说 " + name + " 高么？";
  },
  selectedMode: 'multiple',
  inactiveColor: '#ccc',
  selected: {
    '今日销量': true,
    '昨日销量': true,
    '明日销量': true,
  },
  textStyle: {
    color: '#f00'
  },

  backgroundColor: 'gray',
},
/* tooltip:{
}, */
\`\`\`

## series（数据）

这里面的type直接决定了图表的形状

\`\`\`javascript
			series:{
				type:'radar',
				data:[
					{
						name:'火箭',
						value:[109,38,29,6,2,60,17]
					},
					{
						name:'勇士',
						value:[118,36,25,6,6,77,13]
					}
				]
			}
\`\`\`

## dataZoom(缩放区域)

图表可以缩放

\`\`\`javascript
dataZoom：{
  type:'inside'
}
\`\`\`

## visualMap（高亮某一部分数据的工具）

\`\`\`javascript
visualMap: [];
\`\`\`

## tooltip(提示框)

鼠标移到某一个位置的提示框

\`\`\`javascript
tooltip：{

}
\`\`\`

![](articles/qtn2ra891z05ylog/1731573087821-a579c18d-7d1e-4303-9d1e-aa4546034a34.png)

## axisPointer（坐标轴指示器）

![](articles/qtn2ra891z05ylog/1731573175691-e377c42c-8cfa-43ea-9c3c-4c02bad38a99.png)

## toolbox（工具栏）

![](articles/qtn2ra891z05ylog/1731573218602-5a5f39f7-9fbf-4643-8cb0-b2490620ab58.png)

## grid（绘图网格）

<font style="color:rgb(77, 85, 94);">可以在网格上绘制</font>[折线图](https://echarts.apache.org/zh/option.html#series-line)<font style="color:rgb(77, 85, 94);">，</font>[柱状图](https://echarts.apache.org/zh/option.html#series-bar)<font style="color:rgb(77, 85, 94);">，</font>[散点图（气泡图）](https://echarts.apache.org/zh/option.html#series-scatter)<font style="color:rgb(77, 85, 94);">。</font>

<font style="color:rgb(77, 85, 94);">直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴</font>

<font style="color:rgb(77, 85, 94);"></font>

<font style="color:rgb(77, 85, 94);">1.图表的背景显示网格，以及背景颜色等</font>

<font style="color:rgb(77, 85, 94);">2.确定图表的位置</font>

\`\`\`javascript
grid:{
  // show:true,
  left:"20%",
  width:"100%",
  containLabel:false,
  backgroundColor:'gray',
  borderColor:'#f00'
},
\`\`\`

## 【直角坐标】

### xAxis,yAxis（x轴,y轴）

\`\`\`javascript
xAxis: [
  {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  {
    data: ["衬衫1", "羊毛衫1", "雪纺衫1", "裤子1", "高跟鞋1", "袜子1"],
  },
  {
    data: ["衬衫2", "羊毛衫2", "雪纺衫2", "裤子2", "高跟鞋2", "袜子2"],
    offset: -100,
  },
];
\`\`\`

## 【极坐标】

### polor(位置)

\`\`\`javascript
polar: {
  center:['50%', '50%'],
  radius:"80%",
},
\`\`\`

### radiusAxis（极坐标系的径向轴）（半径）

### angleAxis（极坐标系的角度轴）（旋转角度）

## 【雷达图】

\`\`\`javascript
rader: {
}
\`\`\`

## 【地理信息】

### geo(坐标)

\`\`\`javascript
geo: {
}
\`\`\`

![](articles/qtn2ra891z05ylog/1731573551187-7d1f1d2b-07bc-4b07-af74-d5b8a4b499a9.png)

## 【平行坐标】

\`\`\`javascript
parallel：{

},
parallelAxis:[

]
\`\`\`

![](articles/qtn2ra891z05ylog/1731573647544-449d6e16-190b-4dde-8d4c-dd804a79d4e6.png)

## 【时间轴】

## 【柱状图】

## 【饼图】

## 【气泡图】

## 【矩阵树图】

webpack打包分析

## 【k线图】

## 【热力图】

![](articles/qtn2ra891z05ylog/1731573881650-3c68b36f-af44-48f9-b0b0-7d1571e986a3.png)
`;export{t as default};
