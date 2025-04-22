<template>
  <div class="ZJHeaderToolsBox" @click="open('openInfoHeaderBar')" ref="ZJHeaderInfoBox">
    <ZJSvgIcons icon="language"></ZJSvgIcons>
    <languageHeaderBar v-show="showInfoHeaderBar" class="ZJHeaderBarLanguage"></languageHeaderBar>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import languageHeaderBar from './languageHeaderBar.vue';

const showInfoHeaderBar = ref(false);

function open(action) {
  if (action == 'openInfoHeaderBar') {
    showInfoHeaderBar.value = !showInfoHeaderBar.value
  }
}

const ZJHeaderInfoBox = ref(null);
// 监听全局点击事件
function handleClickOutside(event) {
  if (ZJHeaderInfoBox.value && !ZJHeaderInfoBox.value.contains(event.target)) {
    showInfoHeaderBar.value = false;
  }
}
// 组件挂载后添加事件监听
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// 组件卸载前移除事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.ZJHeaderBarLanguage {
  position: absolute;
  top: 50px;
}
</style>