<template>
  <div class="ZJDefaultMainBg" ref="scrollTopElement">
    <transition name="fade-slide">
      <router-view class="ZJDefaultMain"></router-view>
    </transition>
    <ZJBackTop 
      :ZJTopHeight="scrollTop"
      :ZJTopElement="scrollTopElement"
      >
    </ZJBackTop>
  </div>
</template>

<script setup name="ZJDefaultMain">
import {ref,onMounted,onUnmounted} from 'vue'

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
.ZJDefaultMainBg{
  height: 100%;
  width:calc(100vw - var(--ZJAsideMenu-width));
  background-color: var(--ZJ-main-bg-color);
  overflow: auto;
  transition: width 0.3s ease-in-out;
}
.ZJDefaultMain{
  padding:20px;
  margin:15px;
  border-radius:7px;
  background-color:var(--ZJ-main);
  color: var(--ZJ-main-text-color);
  box-shadow:2px 0 8px 0 rgb(29, 35, 41, 0.05);
}
</style>
