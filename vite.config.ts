import { defineConfig } from 'vite';
import path, { format } from 'path';
import typescript from '@rollup/plugin-typescript';
import react from "@vitejs/plugin-react";

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

export default defineConfig({
  // css: {
  //   modules: {
  //     generateScopedName: '[name]__[local]', // 禁用哈希
  //   },
  // },
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
      compilerOptions: {
        target: "esnext", // 指定ECMAScript目标版本
        module: "esnext",
        lib: [
          "ES6",
          "DOM",
        ],
        declaration: true, // 生成 `.d.ts` 文件
        outDir: "./dist", // 编译后生成的文件目录
        strict: false,
        jsx: "react-jsx",
        noEmit: false, // 确保 noEmit 为 false（默认值）
        emitDeclarationOnly: false, // 确保 emitDeclarationOnly 为 false（默认值）
        allowImportingTsExtensions: false, // 禁用该选项
      },
      include: [
        resolve("./packages/**/*"),
      ],
      exclude: [
        resolve("./node_modules/**/*"),
      ],
    }),
  ],
  build: {
    cssCodeSplit: false,
    // 打包输出的目录
    outDir: 'dist',
    lib: {
      formats: ['es', 'umd'],
      // 组件库源码的入口文件
      entry: resolve('packages/index.ts'),
      // 组件库名称
      name: 'index',
      fileName: (format) => `index.${format}.js`,
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
        manualChunks: undefined,
      },
    },
  }
})