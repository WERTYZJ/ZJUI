<template>
  <div class="welcome" ref="welcomeMain">
    <div class="welcome-box">
      <WelcomeHeader :scrollTop="welcomeMainScrollTop"></WelcomeHeader>
      <WelcomeMain></WelcomeMain>
      <hr class="welcome-box-hr">
      <WelcomeContributors></WelcomeContributors>
      <hr class="welcome-box-hr">
      <WelcomeContributeSelfe></WelcomeContributeSelfe>
      <hr class="welcome-box-hr">
      <WelcomeContribute></WelcomeContribute>
      <hr class="welcome-box-hr" style="margin-bottom: 0;">
      <WelcomeFooter></WelcomeFooter>
    </div>
  </div>
</template>

<script setup>
import WelcomeHeader from "@/views/welcome/components/WelcomeHeader.vue"
import WelcomeMain from "@/views/welcome/components/WelcomeMain.vue"
import WelcomeContributors from "./components/WelcomeContributors.vue"
import WelcomeContributeSelfe from "./components/WelcomeContributeSelfe.vue"
import WelcomeContribute from "./components/WelcomeContribute.vue"
import WelcomeFooter from "@/views/welcome/components/WelcomeFooter.vue"
 
const welcomeMain = ref(null);
const welcomeMainScrollTop = ref(0);
 
const checkElementScrollPosition = () => {
    welcomeMainScrollTop.value = welcomeMain.value.scrollTop;
    // console.log("元素滚动位置:", welcomeMainScrollTop.value);
}
 
onMounted(() => {
  if (welcomeMain.value) {
    welcomeMain.value.addEventListener('scroll', checkElementScrollPosition);
  }
})
 
onUnmounted(() => {
  if (welcomeMain.value) {
    welcomeMain.value.removeEventListener('scroll', checkElementScrollPosition);
  }
})
</script>

<style scoped>
.welcome {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--ZJ-main);
  z-index: 3;
  display: flex;
  justify-content: center;
  overflow-y: auto;
}

.welcome-box {
  /* background-color: antiquewhite; */
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: auto;
  width: 1300px;
  min-width: auto;
  margin: 0 32px;
}
.welcome-box-hr{
  border: none;
  height: 1px;
  width:100%;
  box-sizing: border-box;
  flex-shrink: 0;
  background-color:var(--ZJ-main-hover);
  margin: 80px 0;
}
@media (max-width:600px) {
  .welcome-box{
    margin: 0;
  }
}


/* 设置滚动条的宽度 */
::-webkit-scrollbar {
  width: 0px;
}

/* 设置滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  width: 0px;
}

/* 设置垂直滚动条的滑块样式 */
::-webkit-scrollbar-thumb:vertical {
  width: 0px;
}
</style>

