const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 解决.vue文件命名报错问题
  devServer: {
    port: 5200,//端口号
    open:true,//启动项目后自动打开浏览器
  },
})

