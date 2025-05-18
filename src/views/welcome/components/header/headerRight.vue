<template>
  <div class="m-flex m-gap-20 m-col-center">
    <div v-for="(i, index) in rightBar" :key="index" class="m-flex title">
      <span class="m-pointer">{{ i.text }}</span>
      <ZJSvgIcons :icon="i.icon" style="height: 25px;width: 25px;"></ZJSvgIcons>
      <hr v-if="index==4 || index==5 || index==6">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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
  {
    text: '切换语言',
  },
  {
    text: '切换主题',
  },
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

