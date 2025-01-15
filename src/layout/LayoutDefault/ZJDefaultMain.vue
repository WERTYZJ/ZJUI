<template>
  <div class="default">
    <ZJAsideMenu></ZJAsideMenu>
    <div class="default-main">
      <ZJHeader></ZJHeader>
      <ZJMain></ZJMain>
    </div>
  </div>
</template>

<script setup name="ZJDefaultMain">
import ZJHeader from '../components/ZJHeader/ZJHeader.vue';
import ZJAsideMenu from '../components/ZJAsideMenu/ZJAsideMenu.vue';
import ZJMain from '../components/ZJMain/ZJMain.vue';
</script>

<style scoped>
.default{
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.default-main{
  display: flex;
  flex-direction: column;
}
</style>
