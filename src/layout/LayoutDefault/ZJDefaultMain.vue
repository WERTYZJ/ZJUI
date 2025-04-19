<template>
  <div class="default">
    <ZJSearch></ZJSearch>
    <ZJSet></ZJSet>
    <ZJAsideMenu v-show="userStore.layout.showSilderBar"></ZJAsideMenu>
    <div class="default-main">
      <ZJHeader v-show="userStore.layout.showHeader"></ZJHeader>
      <ZJHeaderBar v-show="userStore.layout.showHeaderBar"></ZJHeaderBar>
      <ZJMain></ZJMain>
    </div>
  </div>
</template>

<script setup name="ZJDefaultMain">
import ZJHeader from '../components/ZJHeader/ZJHeader.vue';
import ZJHeaderBar from '../components/ZJHeaderBar/ZJHeaderBar.vue'
import ZJAsideMenu from '../components/ZJAsideMenu/ZJAsideMenu.vue';
import ZJMain from '../components/ZJMain/ZJMain.vue';
import ZJSet from '../components/ZJSet/ZJSet.vue';
import ZJSearch from '../components/ZJSearch/ZJSearch.vue';
import { useUserStore } from '@/store';
const userStore = useUserStore();
</script>

<style scoped>
.default {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.default-main {
  display: flex;
  flex-direction: column;
}
</style>
