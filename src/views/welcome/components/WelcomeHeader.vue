<template>
  <div class="welcome-header m-flex m-row-between" ref="welcomeHeader">
    <div class="welcome-header-box">
      <headerLeft></headerLeft>
      <headerRight></headerRight>
    </div>
  </div>
</template>

<script setup>
import headerLeft from "@/views/welcome/components/header/headerLeft.vue"
import headerRight from "@/views/welcome/components/header/headerRight.vue"
import { ref,defineProps,watch } from "vue";

const props = defineProps({
  scrollTop: {
    type: String,
    default: '',
  },
})

const welcomeHeader = ref(null)

watch(()=>props.scrollTop,(newVal)=>{
  if (newVal <=0) {
    welcomeHeader.value.classList.remove('welcome-header-top-style');
  } else {
    welcomeHeader.value.classList.add('welcome-header-top-style');
  }
  },
  {
    immediate: false,//默认加载一次
    deep: true
  }
)


</script>

<style scoped>
.welcome-header {
  /* background-color: aqua; */
  width: 100%;
  height: var(--ZJHeader-height);
  border-bottom:1px solid  var(--ZJ-main-hover);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--ZJ-main);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 32px;
}
.welcome-header-top-style {
  background-color: var(--ZJ-welcome-header-bg);
  box-shadow: 2px 12px 24px 0px rgba(9, 5, 21, 0.06);
  backdrop-filter: blur(5px);
}
.welcome-header-box {
  /* background-color: antiquewhite; */
  display: flex;
  justify-content: space-between;
  /* max-width: auto;
  width: 1300px;
  min-width: auto;
  margin: 0 32px;
  flex-shrink: 0; */

  width: 100%; /* 或 max-width: 1300px */
  max-width: 1300px; /* 限制最大宽度 */
  min-width: 0; /* 允许内容挤压（覆盖默认的 min-width: auto） */
  margin: 0 32px;
  /* padding: 0 32px; */
  flex-shrink: 1; /* 允许在父容器空间不足时缩小 */
  overflow: hidden; /* 可选：防止内容溢出 */
}
@media (max-width:600px) {
  .welcome-header{
    padding:0 15px;
  }
}
</style>

