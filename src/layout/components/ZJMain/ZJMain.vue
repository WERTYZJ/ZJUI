<template>
  <div class="ZJDefaultMainBg">
    <transition name="fade-slide">
      <router-view class="ZJDefaultMain"></router-view>
    </transition>
  </div>
</template>

<script setup name="ZJDefaultMain"></script>

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
