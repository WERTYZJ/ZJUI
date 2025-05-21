<template>
  <div class="m-flex m-gap-20 m-col-center">
    <div v-for="(i, index) in rightBar" :key="index" class="m-flex title">
      <span class="m-pointer">{{ i.text }}</span>
    </div>
    <hr>
    <brightMode></brightMode>
    <hr>
    <language></language>
    <hr>
    <div v-for="(i, index) in rightIcon" :key="index" class="m-flex title">
      <ZJSvgIcons :icon="i.icon" style="height: 25px;width: 25px;"></ZJSvgIcons>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import language from '@/layout/components/ZJHeader/components/language.vue';
import brightMode from '@/layout/components/ZJHeader/components/brightMode.vue';

const rightBar = ref([
  {
    text: '当前是ZJ-UI文档',
  },
  {
    text: '指引',
  },
  {
    text: '配置',
  },
  {
    text: '相关链接',
  },
  {
    text: 'Version',
  },
])

const rightIcon = ref([
   {
    // text: 'Twitter',
    icon:'Twitter',
  },
  {
    // text: 'Gitee',
    icon:'Gitee',
  },
  {
    // text: 'GitHub',
    icon:'GitHub',
  },
])
</script>

<style scoped>
.title {
  font-size: 15px;
  color: var(--ZJ-main-text-color);
  cursor: pointer;
  /* background-color: aqua; */
}

.title:hover {
  color: var(--ZJ-default-main);
}
hr{
  border: none;
  height:25px;
  width: 2px;
  background-color: var(--ZJ-main-hover);
  flex-shrink: 0;
}
</style>

