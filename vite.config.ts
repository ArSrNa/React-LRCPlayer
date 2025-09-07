import { defineConfig } from 'vite';
import path from 'path';
import typescript from '@rollup/plugin-typescript';
import react from "@vitejs/plugin-react";

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

export default defineConfig({
  publicDir: false,
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    open: false,
    watch: {
      usePolling: true, // 修复HMR热更新失效
    },
  },
  plugins: [
    react(),
    typescript({
      target: 'esnext',
      module: 'esnext',
      rootDir: resolve('packages/'),
      declaration: true,
      declarationDir: resolve('dist'),
      exclude: resolve('node_modules/**'),
      allowSyntheticDefaultImports: true,
      noForceEmit: true,
    }),
  ],
  build: {
    // 打包输出的目录
    outDir: 'dist',
    // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制
    cssTarget: 'chrome61',
    lib: {
      // 组件库源码的入口文件
      entry: resolve('packages/index.tsx'),
      // 组件库名称
      name: 'react-lrcplayer',
      fileName: 'react-lrcplayer',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom', 'antd', 'typescript'],
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