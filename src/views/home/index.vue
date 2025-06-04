<template>
  <div class="home">
    <homeTop></homeTop>
    <ZJCard class="mainCard">
      <p style="text-indent:15px;">本ui目前使用 <a>Vue3 + Vite6.3.5 + Pinia + vue-router + highlight.js + vue-i18n</a>
        等主流技术。欢迎各位大佬加入。</p>
      <div v-for="(i, index) in home1" :key='index'>
        <p>{{ index + 1 }}.{{ i.title }}</p>
        <p class="children" v-for="(children, index) in i.children" :key="index">{{ children }}</p>
      </div>
    </ZJCard>
  </div>
</template>

<script setup name="ZJHomeVue">

import homeTop from './components/homeTop.vue';

const home1 = ref([
  {
    title: '项目特点',
    children: [
      '- 多种布局和丰富的主题适配。',
      '- 集成 pinia，vuex 的替代方案，轻量、简单、易用，并且配置pinia持久化插件。',
      '- 随心所欲。',
      '- 国际化,多语言配置'
    ]
  },
  {
    title: '项目用法',
    children: [
      '- npm i',
      '- npm run dev 开发环境',
      '- npm run test 测试环境',
      '- npm run preview 生产环境',
      '- npm run build 打包'
    ]
  },
  {
    title: '联系方式',
    children: [
      'QQ:671678579@qq.com',
    ]
  },
])
</script>

<style scoped>
.children {
  font-size: 14px;
}

a {
  color: var(--ZJ-default-main);
}

.home {
  background-color: var(--ZJ-main-bg-color);
  box-shadow: none;
  padding: 0;
}

.mainCard {
  padding: 20px;
  margin-top: 20px;
  box-shadow: 2px 0 8px 0 rgb(29, 35, 41, 0.05);
}
</style>
