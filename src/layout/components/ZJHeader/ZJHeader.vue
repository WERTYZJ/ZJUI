<template>
  <div class="header">
    <div class="header-box">

      <div class="header-left">
        <headerSidebarOpen v-show="userStore.layout.showHeaderSildebarOpen"></headerSidebarOpen>
        <headerLeft></headerLeft>
      </div>

      <div class="header-right">
        <headerRight></headerRight>
        <Info></Info>
      </div>

    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import headerSidebarOpen from './components/headerSidebarOpen.vue';
import headerLeft from './components/headerLeft.vue';
import headerRight from './components/headerRight.vue';
import Info from './components/info.vue';
import { useUserStore } from '@/store';
const userStore = useUserStore();

function enter(event) {
  if (event.keyCode == 13) {
    if (!event.ctrlKey) {
      event.preventDefault();
      router.push({ path: '/MoreTutor/:SearchVal', })
    }
  }
}
</script>

<style scoped>
/* 头部header */
.header {
  width: var(--ZJMain-width);
  height: var(--ZJHeader-height);
  background-color: var(--ZJ-main);
  transition: var(--ZJ-main-transition-width);
  box-shadow: 0 1px 1px 1px var(--ZJ-main-hover);
  z-index: 1;
}

.header-box {
  height: 56px;
  padding: 0 8px 0 20px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 2px rgb(0, 21, 41, 0.08);
  /* background-color: rgba(95, 158, 160); */
}

.header-left {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  /* background-color: #a66510; */
}

.header-right {
  /* background-color: aqua; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>

