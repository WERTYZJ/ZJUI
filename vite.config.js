import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 保持与原有别名一致
    }
  },
  server: {
    // 服务启动时是否自动打开浏览器
    open: true,
    port: 5200, // 保持原有端口
    // 本地跨域代理 -> 代理到服务器的接口地址
    // proxy: {
    //   "/api": {
    //     target: env.VITE_API_BASE_URL, // 后台服务器地址
    //     changeOrigin: true, // 是否允许不同源
    //     secure: false, // 支持https
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
  build: {
    outDir: 'dist', // 保持原有输出目录
    assetsInlineLimit: 4096 // 调整资源内联阈值
  }
})