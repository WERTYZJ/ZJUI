<template>
  <div id="app">
    <ZJWelcome v-if="userStore.layout.showWelcome"></ZJWelcome>
    <ZJLoading v-if="userStore.isLoading"></ZJLoading>
    <ZJDefaultMain></ZJDefaultMain>
  </div>
</template>
 
<script setup name='app'>
import ZJWelcome from "@/views/welcome/index.vue"
import ZJLoading from './ui/ZJLoading/index.vue'
import ZJDefaultMain from './layout/LayoutDefault/ZJDefaultMain.vue';
import { useUserStore } from './store';
const userStore = useUserStore();
</script>
 
<style scoped></style>