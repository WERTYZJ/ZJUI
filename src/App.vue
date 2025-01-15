<template>
  <div id="app">
    <ZJLoading v-if="userStore.isLoading"></ZJLoading> 
    <ZJDefaultMain></ZJDefaultMain>
  </div>
</template>
 
<script setup name='app'>
import ZJLoading from './ui/ZJLoading/index.vue'
import ZJDefaultMain from './layout/LayoutDefault/ZJDefaultMain.vue';
import { useUserStore } from './store';
const userStore = useUserStore();
</script>
 
<style scoped></style>