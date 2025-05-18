<template>
  <div class="ZJLogo" @click="userStore.layout.showWelcome = true;">
    <!-- <img src="@/assets/logo/logo.svg" alt=""> -->
    <ZJSvgIcons icon="ZJUILogo" style="height:32px;width:32px;border-radius:10px;"></ZJSvgIcons>
    <Transition name="leftBar">
    <a v-if="userStore.isSideBarOpen==true">ZJUI-Admin</a>
    </Transition>
  </div>
</template>

<script setup name="ZJDefaultMain">
import { useUserStore } from '@/store';
const userStore = useUserStore();
</script>

<style scoped>
.ZJLogo{
  height:56px;
  /* background-color: antiquewhite; */
  display: flex;
  align-items: center;
  gap: 15px;
  padding-left: 11px;
}
a{
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
  color: var(--ZJ-default-main);
}
</style>
