<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>Vuex转换Pinia</h2>
      </template>
      <p>1.1安装Pinia</p>
      <p>npm install pinia</p>
      <p>1.2创建并配置Pinia实例</p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
      <p>1.3接下来，创建一个Pinia store来替代Vuex store：可以下载持久化插件（"pinia-plugin-persistedstate": "^4.3.0"）并配置 persist: {
        storage: localStorage,}//指定需要的本地存储方式</p>
      <ZJCodeDisplay :code="vueCode2" language="vue" />
      <p>持久化插件的main.js配置方法如下：</p>
      <ZJCodeDisplay :code="vueCode3" language="vue" />
      <p>1.4在你的Vue组件中，你可以这样使用这个store：</p>
      <ZJCodeDisplay :code="vueCode4" language="vue" />
      <p>2.1注意：在Pinia中，state 是一个函数，返回一个对象，这与Vuex的state对象略有不同。
        在Pinia中，mutations被替换为直接修改state的actions。
        getters 的使用方式相同，但是在组件中需要通过store实例来访问。</p>
    </ZJMain>
  </div>
</template>

<script setup>

const vueCode = ref(
  `import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');
`);
const vueCode2 = ref(
  `// src/store/index.js  
import { defineStore } from "pinia";

// 从 localStorage 读取整个 userData 初始化数据
const localData = localStorage.getItem('user');
let userLocalData = localData ? JSON.parse(localData) : {};

export const useUserStore = defineStore('user', {
  state: () => ({
    // 尝试从localStorage加载用户数据，如果没有则默认为空对象
    userData: {},
    // 加载动画
    isLoading: false,
    // 侧边框
    isSideBarOpen: userLocalData.isSideBarOpen ?? true,
    // 初始化选中侧边框
    ZJAsideMenuNameSelect: 'home',
    // 初始化测边框卡片
    ZJAsideMenuCardNameSelect: null,
    // 初始化测边框卡片索引
    ZJAsideMenuCardNameIndex: -1,
    // 刷新页面
    isRouterActive: true,
    // 布局相关状态
    layout: {
      // 头部
      showHeader: true,
      // 头部路由
      showHeaderBar: true,
      // 头部左侧侧边栏打开按钮
      showHeaderSildebarOpen: true,
      // 侧边栏导航
      showSilderBar: true,
      // 路由刷新
      showRouterActive: true,
      //设置
      showSet: false,
      //展示搜索
      showSearch: false,
      // 单页面全屏
      isFullScreenRouter: false,
      // 是否展示欢迎页面
      showWelcome: true,
    },
  }),
  actions: {
    startLoading() {
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    },
  },
  getters: {
    getUserData: (state) => state.userData,
  },
  // 持久化存储
  persist: {
    storage: localStorage,//指定需要的本地存储方式
  }
  // persist:{
  //   storage: sessionStorage,
  // }
  // persist:[
  //   {
  //     key: 'my-custom-key', // 自定义键名
  //     storage: sessionStorage,
  //     paths: ['state.layout.showWelcome'], // 仅持久化 layout.showWelcome
  //   }
  // ],
});
`);
const vueCode3 = ref(`
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.mount('#app')
`)
const vueCode4 = ref(
  `<template>
  <div>
    <p v-if="userData">User ID: {{ userData.id }}</p>
    <p v-else>No user data found</p>
    <button @click="startLoading">Start Loading</button>
    <button @click="stopLoading">Stop Loading</button>
  </div>
</template>

<script>
import { useUserStore } from './stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();

    return {
      userData: userStore.getUserData,
      startLoading: userStore.startLoading,
      stopLoading: userStore.stopLoading,
    };
  },
};
<script>`);
</script>