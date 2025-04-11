<template>
  <div class="ZJHeaderToolsBox" @click="clickFullScreenRouter">
    <ZJSvgIcons icon="fullScreen" height="18px" width="18px"></ZJSvgIcons>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store';
const userStore = useUserStore();


const clickFullScreenRouter = () => {
  if (!userStore.layout.isFullScreenRouter) {
    userStore.layout.showSilderBar = false;
    userStore.layout.showHeader = false;
  }

};
</script>

<style scoped></style>