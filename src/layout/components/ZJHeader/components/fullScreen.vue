<template>
  <div class="ZJHeaderToolsBox" @click="clickFullScreen">
    <ZJSvgIcons icon="fullScreen"></ZJSvgIcons>
  </div>
</template>

<script setup>
import { ref } from 'vue';
 
const isFullScreen = ref(false);
 
const clickFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      isFullScreen.value = true;
    }).catch(err => {
      console.error('Error attempting to enable full-screen mode:', err.message);
    });
  } else {
    document.exitFullscreen().then(() => {
      isFullScreen.value = false;
    }).catch(err => {
      console.error('Error attempting to exit full-screen mode:', err.message);
    });
  }
};
</script>

<style scoped>
</style>