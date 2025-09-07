import { defineConfig } from 'vite';
import path from 'path';
import typescript from '@rollup/plugin-typescript';
import react from "@vitejs/plugin-react";

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

export default defineConfig({
  css: {
    modules: {
      // 配置CSS Modules
      generateScopedName: '[local]', // 保持原类名，不添加哈希
      // 或者使用更复杂的模式保留原类名同时添加作用域
      // generateScopedName: '[local]__[hash:base64:5]',
    },
  },
  plugins: [
    react(),
    typescript(),
  ],
  build: {
    // 打包输出的目录
    outDir: 'dist',
    // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制
    cssTarget: 'chrome61',
    lib: {
      // 组件库源码的入口文件
      entry: resolve('src/index.tsx'),
      // 组件库名称
      name: 'react-lrcplayer',
      fileName: 'react-lrcplayer',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
        },
      },
    },
  }
})