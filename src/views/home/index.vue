<template>
  <div class="home">
    <homeTop></homeTop>
    <ZJCard class="mainCard">
      <p style="text-indent:15px;">本ui目前使用 <a>Vue3 + Pinia + vue-router + highlight.js + vue-i18n</a>
        等主流技术。目前本UI处于起始阶段欢迎各位大佬加入,目前仅仅是收集自己ZJ制作的一些组件及工具。记录前端学习路上遇到的问题以及解决方案。</p>
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
      '- 多种布局和丰富的主题适配移动端、IPad和PC端。(目前正在制作测试中)',
      '- 集成 pinia，vuex 的替代方案，轻量、简单、易用，并且配置pinia持久化插件。',
      '- 随心所欲。',
      '- 国际化,多语言配置'
    ]
  },
  {
    title: '项目用法',
    children: [
      '- npm i',
      '- npm run dev'
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
