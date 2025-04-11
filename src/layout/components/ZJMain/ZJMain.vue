<template>
  <div class="ZJDefaultMainBg" ref="scrollTopElement">

    <!-- vue-router 3.0 写法 -->
    <transition name="fade-slide">
      <router-view class="ZJDefaultMain" v-if="userStore.isRouterActive"></router-view>
    </transition>

    <!-- vue-router 4.0 写法
    在 Vue Router 4+ 中router-view>不再直接支持被包裹在 transition 或 keep-alive 中
    这是由于新的路由匹配机制需要更明确的组件作用域控制
    旧版写法会导致路由组件无法正确响应路由变化 -->

    <!-- <router-view v-slot="{ Component }" class="ZJDefaultMain">
      <transition name="fade-slide">
        <component :is="Component" v-if="userStore.isRouterActive" />
      </transition>
    </router-view> -->

    <ZJBackTop :ZJTopHeight="scrollTop" :ZJTopElement="scrollTopElement">
    </ZJBackTop>
  </div>
</template>

<script setup name="ZJDefaultMain">
import { ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '@/store';
const userStore = useUserStore();

const scrollTopElement = ref('')
const scrollTop = ref(0);

const handleScroll = () => {
  if (scrollTopElement.value) {
    scrollTop.value = scrollTopElement.value.scrollTop;
  }
};

onMounted(() => {
  const e = scrollTopElement.value;
  if (e) {
    e.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  const e = scrollTopElement.value;
  if (e) {
    e.removeEventListener('scroll', handleScroll);
  }
});

</script>

<style scoped>
.ZJDefaultMainBg {
  height: 100%;
  width: calc(100vw - var(--ZJAsideMenu-width));
  background-color: var(--ZJ-main-bg-color);
  overflow-y: auto;
  overflow-x: hidden;
  transition: var(--ZJ-main-transition-width);
}

.ZJDefaultMain {
  padding: 20px;
  margin: 15px;
  border-radius: 7px;
  background-color: var(--ZJ-main);
  color: var(--ZJ-main-text-color);
  box-shadow: 2px 0 8px 0 rgb(29, 35, 41, 0.05);
}
</style>
