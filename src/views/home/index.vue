<template>
  <ZJMain>
    <template #header>
      <h2>ZJ-UI 打造属于自己的ui库</h2>
    </template>
    <p style="text-indent:15px;">本ui目前使用 <a>Vue3 + Pinia + vue-router + highlight.js</a> 等主流技术。目前本UI处于起始阶段欢迎各位大佬加入,目前仅仅是收集自己ZJ制作的一些组件及工具。记录前端学习路上遇到的问题以及解决方案。</p>
    <div v-for="(i,index) in home1" :key='index'>
      <p>{{index+1}}.{{i.title}}</p>
      <p class="children" v-for="(children,index) in i.children" :key="index">{{children}}</p>
    </div>
    
    <template #footer>
      <p></p>
    </template>
  </ZJMain>
</template>

<script setup name="ZJHomeVue">
import { ref } from 'vue';
const home1 = ref([
  {
    title:'项目特点',
    children:[
      '- 多种布局和丰富的主题适配移动端、IPad和PC端。(目前正在制作测试中)',
      '- 集成 pinia，vuex 的替代方案，轻量、简单、易用，并且配置pinia持久化插件。',
      '- 随心所欲。',
    ]
  },
  {
    title:'第三方库',
    children:[
      "- pinia ^2.2.6",
      "- highlight.js ^11.10.0",
      "- vue ^3.5.12",
      "- vue-router ^4.4.5",
    ]
  },
  {
    title:'项目结构',
    children:[
      '- public',
      '- scrips',
      '- src',
    ]
  },
  {
    title:'项目用法',
    children:[
      '- npm i',
      '- npm run dev'
    ]
  },
  {
    title:'联系方式',
    children:[
      'QQ:2603267454@qq.com',
    ]
  },
])
</script>

<style scoped>
.children{
  font-size: 14px;
}
a{
  color: var(--ZJ-default-main);
}
</style>
