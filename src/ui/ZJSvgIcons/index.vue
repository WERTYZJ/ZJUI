<template>
  <svg class="svg-icon" :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
    :style="{ width, height, color, ...style }" v-html="iconContent"></svg>
</template>

<script setup>

import { icons } from './svgIcons'; // 假设 svgIcons.js 与 ZJSvgIcons.vue 在同一目录下

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: '20px'
  },
  height: {
    type: String,
    default: '20px'
  },
  color: {
    type: String,
    default: ''
  },
  style: {
    type: Object,
    default: () => ({})
  }
});

// 计算图标内容
const iconContent = computed(() => {
  return icons[props.icon] || '';
});

</script>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  min-width: 18px;
}
</style>
