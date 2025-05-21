<template>
  <div class="welcome-contributors">
    <div class="welcome-contributors-title">感谢以下赞助者的赞数和支持，我们ZJ-UI将越来越好。</div>
    <div class="welcome-body m-flex-col m-gap-15">
      <div class="welcome-body-box" v-for="(i,index) in welcomeData" :key="index">
        <img :src="i.icon" alt="">
        <span>{{ i.contributor }}</span>
        <span>赞助金额:{{ i.price }}元</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const welcomeData = ref([
  {
    icon:require('@/assets/logo/logo.png'),
    contributor:'ヾAlexandrζ',
    price:'520'
  },
])
</script>

<style scoped>
.welcome-contributors {
  max-width: 1200px;
  min-width: auto;
  padding: 0 32px;
  width: 100%;
  box-sizing: border-box;
  /* background-color: hsl(316, 35%, 88%); */
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.welcome-contributors-title{
  margin-bottom: 80px;
  color: var(--ZJ-main-text-color);
}
.welcome-body{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3,1fr);
}
.welcome-body-box{
  background-color: var(--ZJ-main-bg-color);
  border-radius: var(--ZJ-main-border-radius-10);
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
}
.welcome-body-box:hover{
  background-color: var(--ZJ-AsideMenu-hover);
  transition: var(--ZJ-main-transition);
}
.welcome-body-box img{
  height: 40px;
  width: 40px;
  border-radius:10px;
}
.welcome-body-box span{
  font-size: 14px;
  font-weight: 500;
  color: var(--ZJ-main-text-label-color);
}
</style>

