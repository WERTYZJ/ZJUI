<template>
  <div class="welcome-main">
    <div class="m-flex m-row-between">
      <div class="w-left m-flex-col">
        <p class="text">ZJ-UI</p>
        <p class="text2">下一代前端ui框架</p>
        <div class="m-flex m-gap-10 m-flex-center" style="margin-top: 15px;">
          <span class="text3">随心所欲的组件尽情更改</span>
          <span class="text-v">v1.0.0</span>
        </div>
        <div class="m-flex m-gap-15" style="margin-top: 20px;">
          <ZJButton @click="open('goHome')" type="default" text="开始" style="border-radius:20px;padding: 20px;cursor: pointer;" icon="right" iconRight>
          </ZJButton>
          <ZJButton type="info" text="为什么选择ZJ-UI?" style="border-radius:20px;padding: 20px;"></ZJButton>
          <ZJButton type="success" text="在Gitee上查看" style="border-radius:20px;padding: 20px;"></ZJButton>
        </div>
      </div>
      <div class="w-right">
        <div class="w-right-bg"></div>
        <img class="w-right-img" src="@/assets/logo/w-logo-bg.svg" alt="">
      </div>
    </div>
    <div class="welcome-body m-flex-col m-gap-20">
      <div class="welcome-body-box" v-for="(i,index) in welcomeData" :key="index">
        <ZJSvgIcons :icon="i.icon" class="welcome-body-box-icon" style="background-color:var(--ZJ-main-hover);padding:5px;border-radius:5px;height: 25px;width: 25px;"></ZJSvgIcons>
        <p>{{ i.title }}</p>
        <span>{{ i.content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store';
const userStore = useUserStore()

const welcomeData = ref([
  {
    icon:'VueIcon',
    title:'Vue3及以上版本',
    content:'更快的启动速度，更安全。'
  },
  {
    icon:'Pinia',
    title:'最新的Pinia状态管理库',
    content:'Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。'
  },
  {
    icon:'I18n',
    title:'多语言国际化I18n',
    content:'让你更轻松地实现多语言配置。'
  },
  {
    icon:'HeightLight',
    title:'代码高亮显示Highlight.js',
    content:'使文档代码更加清晰可见，所见皆所得。'
  },
  {
    icon:'Expand',
    title:'可拓展性',
    content:'可随意更改想要的样式，随行所欲。'
  },
  {
    icon:'Module',
    title:'模块化',
    content:'模块化管理UI组件，结构更加清晰可见。'
  },
])

const open = (val)=>{
  switch(val){
    case 'goHome':
      userStore.layout.showWelcome = false;
      break
  }
}

</script>

<style scoped>
.welcome-main {
  margin-top: 44px;
  max-width: 1200px;
  min-width: auto;
  padding: 0 32px;
  width: 100%;
  box-sizing: border-box;
  /* background-color: hsl(316, 35%, 88%); */
  flex-shrink: 0;
}

.text {
  background: var(--ZJ-welcome-name-background);
  -webkit-text-fill-color: var(--ZJ-welcome-name-color);
  -webkit-background-clip: text;
  background-clip: text;
  line-height: 64px;
  font-size: 56px;
  width: fit-content;
}

.text2 {
  color: var(--ZJ-main-text-color);
  line-height: 64px;
  font-size: 56px;
  font-weight: bold;
}

.text3 {
  color: var(--ZJ-main-text-label-color);
  font-size: 24px;
}

.text-v {
  background-color: var(--ZJ-info-light);
  padding: 4px 10px;
  border-radius: 10px;
  color: var(--ZJ-main-bg-color);
  font-weight: bold;
  font-size: 14px;
}
.w-right {
  position: relative;
  z-index: -1;
}

.w-right-bg {
  height: 350px;
  width: 350px;
  background: var(--ZJ-welcome-image-background-image);
  filter: var(--ZJ-welcome-image-filter);
  border-radius: 50%;
}

.w-right-img {
  height: 350px;
  width: 350px;
  position: absolute;
  top: 0;
  left: 0;
}
.welcome-body{
  margin-top:10px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
}
.welcome-body-box{
  background-color: var(--ZJ-main-bg-color);
  border-radius:15px;
  padding: 24px;
}
.welcome-body-box p{
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  color: var(--ZJ-main-text-color);
  margin: 20px 0 8px 0;
}
.welcome-body-box span{
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ZJ-main-text-label-color);
}
</style>

