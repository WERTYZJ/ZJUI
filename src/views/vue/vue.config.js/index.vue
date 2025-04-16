<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>vue.config.js(配置文件)</h2>
      </template>
      <p>vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。你也可以使用 package.json 中的
        vue 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写。</p>
      <p>官网地址： <a href="https://cli.vuejs.org/zh/config/#vue-config-js"
          target="_blank">https://cli.vuejs.org/zh/config/#vue-config-js</a></p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const vueCode = ref(`
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
   // 解决.vue文件命名报错问题
  lintOnSave:false,
  // 服务端口
  devServer: {
    port:5200,
  },
})


`)
</script>

<style scoped>
a {
  color: var(--ZJ-default-main);
}
</style>
