# React，启动！

![1688831370252](image/README/1688831370252.png)

本项目仅供娱乐，请勿用于GNU许可范围外的用途。图标来自《原神》，米哈游版权所有。

# 用法

## 安装

```
npm i react-genshin-progress
```

## 引入

````jsx
import GIProgress from 'react-genshin-progress'
````

## 在任意地方使用

在页面中：

````jsx
<GIProgress num={60} width={300}/>
````

![1688831559455](image/README/1688831559455.png)

## API

| 参数            | 类型       | 内容           |
| --------------- | ---------- | -------------- |
| num             | Number     | 加载进度       |
| width           | Number     | 宽度（单位px） |
| progressStyle   | CSS Object | 进度条上层样式 |
| backgroundStyle | CSS Object | 进度条背景样式 |
