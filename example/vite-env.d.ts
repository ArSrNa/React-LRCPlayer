/// <reference types="vite/client" />

// 关键：SCSS模块类型声明
declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}

// 可选：普通SCSS文件声明
declare module '*.scss' {
  const content: string;
  export default content;
}
