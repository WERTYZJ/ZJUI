<template>
  <div class="m-flex m-gap-10 m-col-center" @click="userStore.layout.showWelcome = false;">
    <ZJSvgIcons icon="ZJUILogo" style="height:32px;width:32px;border-radius:10px;"></ZJSvgIcons>
    <span>ZJ-UI(官方文档)</span>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store';
const userStore = useUserStore()
</script>

<style scoped>
span {
  font-size: 15px;
  font-weight: bold;
  white-space: nowrap;
  color: var(--ZJ-main-text-color);
}
@media (max-width:400px) {
  span{
    display: none;
  }
}
</style>

