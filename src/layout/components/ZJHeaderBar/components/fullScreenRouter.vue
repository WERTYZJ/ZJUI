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
    userStore.layout.isFullScreenRouter = true
    userStore.layout.showSilderBar = false;
    userStore.layout.showHeader = false;
    document.documentElement.style.setProperty('--ZJMain-width', '100vw');
    document.documentElement.style.setProperty('--ZJ-AsideMenu-width', '0px');
  } else {
    userStore.layout.isFullScreenRouter = false;
    userStore.layout.showSilderBar = true;
    userStore.layout.showHeader = true;
    document.documentElement.style.setProperty('--ZJMain-width', 'calc(100vw - var(--ZJ-AsideMenu-width))');
    document.documentElement.style.setProperty('--ZJ-AsideMenu-width', '220px');
  }

};
</script>

<style scoped></style>