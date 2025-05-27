<template>
  <div class="ZJHeaderToolsBox" @click="clickBtn">
    <ZJSvgIcons :icon="sidebarIcon" height="18px" width="18px" style="cursor:pointer;"></ZJSvgIcons>
  </div>
</template>

<script setup>

import { useUserStore } from '@/store';
const userStore = useUserStore();

const sidebarIcon = ref('sidebarOpen')

onMounted(()=>{
  if(!userStore.isSideBarOpen){
    clickBtn();
  }
})

function clickBtn() {
  // 获取当前 --ZJ-AsideMenu-width 的值
  const currentValue = getComputedStyle(document.documentElement)
    .getPropertyValue('--ZJ-AsideMenu-width')
    .trim(); // 使用 trim() 去除可能的空白字符

  // 检查当前值，并设置新的值
  if (currentValue === '220px') {
    userStore.isSideBarOpen = false
    document.documentElement.style.setProperty('--ZJ-AsideMenu-width', '56px');
  } else if (currentValue === '56px') {
    userStore.isSideBarOpen = true
    document.documentElement.style.setProperty('--ZJ-AsideMenu-width', '220px');
  }
}
</script>

<style scoped></style>