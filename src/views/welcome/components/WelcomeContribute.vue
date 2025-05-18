<template>
  <div class="welcome-contributors">
    <div class="welcome-contributors-title">人生自是有缘，相逢未必偶然，如果你今天来到了这里，并且很喜欢ZJ-UI，您可以通过以下方式赞助我们，我们将铭记！</div>
    <div class="welcome-body m-flex-col m-gap-15">
      <div class="welcome-body-box" v-for="(i,index) in welcomeData" :key="index">
        <img :src="i.icon" alt="">
        <span>{{ i.contributor }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const welcomeData = ref([
  {
    icon:require('@/assets/ZJUI/ZJWelcome/Alipay.jpg'),
    contributor:'支付宝'
  },
  {
    icon:require('@/assets/ZJUI/ZJWelcome/WeChat.png'),
    contributor:'微信'
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
  flex-direction: column;
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
  height:350px;
  /* width: 40px; */
  border-radius:10px;
}
.welcome-body-box span{
  font-size: 14px;
  font-weight: 500;
  color: var(--ZJ-main-text-label-color);
}
</style>

