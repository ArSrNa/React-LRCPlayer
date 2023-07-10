# React，启动！

![1688831370252](image/README/1688831370252.png)

本项目仅供娱乐，请勿用于GNU许可范围外的用途。图标来自《原神》，图标由米哈游版权所有。

本项目基于React开发，仅在React测试通过。

# 用法

## 安装

```
npm i react-genshin-progress
```

## 引入

````jsx
import { GIProgress } from 'genshin-progress';
````

## 示例

在页面中：

````jsx
<GIProgress num={60} width={300}/>
````

![1688831559455](image/README/1688831559455.png)

# API

| 参数            | 类型       | 内容           | 默认值 |
| --------------- | ---------- | -------------- | ------ |
| num             | Number     | 加载进度       | 0      |
| width           | Number     | 宽度（单位px） | 100%   |
| progressStyle   | CSS Object | 进度条上层样式 | null   |
| backgroundStyle | CSS Object | 进度条背景样式 | null   |

## num

此参数表示进度条的进度，范围 [0,100] ，数值为 `93` 正好卡半岩

如果需要动态改变，需要使用 react useState()

```jsx
import { useState } from 'react';
import { GIProgress } from 'react-progress';
const App = () => {
    const [num, setNum] = useState(0);
    return (<>
        <button onClick={() => {
            setNum(previous => (previous++))
        }}>+1</button>
        <GIProgress num={num} />
    </>);
}

export default App;
```

## width

此参数用于定义宽度，传入 `number` 时表示px，例如

````jsx
<GIProgress width={600} />
````

表示这个进度条的宽度为600px

由于进度条本身的 `position: absolute` 直接设置百分比可能没有效果，建议使用绝对宽度。

## progressStyle && backgroundStyle

这两个都是用来定义整个进度条的前景背景样式，由于进度条已内置以下属性：

进度条背景

````js
{
    zIndex: 0,
    position: 'absolute',
    overflow: "hidden"
}
````

进度条前景

````js
{
     zIndex: 1,
     position: 'relative',
     clipPath: `inset(0px ${100 - num}% 0px 0px)`
}
````

直接更改可能会覆盖本身属性，从而失去本身效果

# 常见问题

## Unexpected Token <

这是因为babel编译未成功的错误，在1.2.0版本完全修复

## React is not define

dependency 默认会安装React，如果没有安装，请手动 `npm i react`，并 `import React from 'react';`
