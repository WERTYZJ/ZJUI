const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
   // 解决.vue文件命名报错问题
  lintOnSave:false,
  devServer: {
    port:5200,
  },
})

