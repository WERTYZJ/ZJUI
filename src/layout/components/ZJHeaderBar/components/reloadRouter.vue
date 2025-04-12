<template>
  <div class="ZJHeaderToolsBox" @click="clickReload">
    <ZJSvgIcons icon="reload" height="18px" width="18px" :class="{ 'rotate-animation': isRotating }">
    </ZJSvgIcons>
  </div>
</template>

<script setup>
import { ref, nextTick,getCurrentInstance } from 'vue';
// import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store';
const userStore = useUserStore();
const { appContext } = getCurrentInstance();
const $ZJMessage = appContext.config.globalProperties.$ZJMessage;

const isRotating = ref(false);
// 获取路由实例
// const router = useRouter()
// 获取当前路由对象
// const route = useRoute();

const clickReload = () => {
  isRotating.value = true;
  userStore.isRouterActive = false;

  setTimeout(() => {
    nextTick(() => {
      userStore.isRouterActive = true;
    })
    isRotating.value = false;
    // router.go(0)
    $ZJMessage({
      type: 'success',
      message: '页面刷新成功!',
      duration: 3000,
    });
  }, 1000);

  // 打印完整路由配置
  // console.log('打印完整路由配置:', router.options.routes)

  // 打印当前激活的路由记录
  // console.log('打印当前激活的路由记录:', route)

};


</script>

<style scoped>
.rotate-animation {
  animation: rotate360 1s ease-in-out forwards;
}

@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(720deg);
  }
}
</style>