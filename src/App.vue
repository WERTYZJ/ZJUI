<template>
  <div id="app">
    <ZJWelcome v-if="userStore.layout.showWelcome"></ZJWelcome>
    <ZJLoading v-if="userStore.isLoading"></ZJLoading>
    <ZJLogin v-if="!userStore?.userData?.token"></ZJLogin>
    <ZJDefaultMain v-else></ZJDefaultMain>
  </div>
</template>
 
<script setup name='app'>
import ZJWelcome from "@/views/welcome/index.vue"
import ZJLoading from '@/ui/components/ZJLoading/index.vue'
import ZJLogin from "@/views/login/index.vue"
import ZJDefaultMain from './layout/LayoutDefault/ZJDefaultMain.vue';
import { useUserStore } from './store';
const userStore = useUserStore();
</script>
 
<style scoped></style>