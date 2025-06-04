import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { URL, fileURLToPath } from "node:url";
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // 开发或生产环境服务的公共基础路径
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router' // 如果需要路由相关 API
      ],
      dts: true // 生成自动导入的类型声明文件
    })
  ],

  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", import.meta.url)),
      // "@": fileURLToPath(new URL("./src", import.meta.url)),
      '@': path.resolve(__dirname, './src'), // 确保别名配置正确
    }
  },

  // Terser压缩配置
  terserOptions: {
    compress: {
      drop_console: true,  // 移除console
      drop_debugger: true  // 移除debugger
    },
    format: {
      comments: false // 移除注释
    }
  },

  server: {
    open: true,// 服务启动时是否自动打开浏览器
    port: 5200,
    // 本地跨域代理 -> 代理到服务器的接口地址
    proxy: {
      // "/api": {
      //   target: env.VITE_API_BASE_URL, // 后台服务器地址
      //   changeOrigin: true, // 是否允许不同源
      //   secure: false, // 支持https
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
      '/api/tianqi': {
        target: 'https://whyta.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tianqi/, '/api/tianqi'), // Path rewrite
      }
    },
  },

  build: {
    outDir: 'dist', // 保持原有输出目录
    assetsDir: 'assets', // 静态资源目录
    assetsInlineLimit: 4096 // 调整资源内联阈值
  }
})