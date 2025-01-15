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
      <p>1.3接下来，创建一个Pinia store来替代Vuex store：</p>
      <ZJCodeDisplay :code="vueCode2" language="vue" />
      <p>1.4在你的Vue组件中，你可以这样使用这个store：</p>
      <ZJCodeDisplay :code="vueCode3" language="vue" />
      <p>2.1注意：在Pinia中，state 是一个函数，返回一个对象，这与Vuex的state对象略有不同。
      在Pinia中，mutations被替换为直接修改state的actions。
      getters 的使用方式相同，但是在组件中需要通过store实例来访问。</p>
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const vueCode=ref(
`import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');
`);
const vueCode2=ref(
`// stores/userStore.js 或 stores/userStore.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    // 尝试从localStorage加载用户数据，如果没有则默认为空对象
    userData: (function() {
      try {
        const userDataJSON = localStorage.getItem('userData');
        if (userDataJSON) {
          const userData = JSON.parse(userDataJSON);
          // 检查userData是否是一个对象且包含id属性
          if (typeof userData === 'object' && userData !== null && 'id' in userData) {
            return userData;
          }
        }
        // 如果userData不存在、不是对象或没有id属性，则返回null
        return null;
      } catch (error) {
        // 如果JSON.parse失败（比如因为格式错误），也返回null
        console.error('Error parsing userData from localStorage:', error);
        return null;
      }
    })(),
    isLoading: false,
  }),
  actions: {
    async setUserData(userData) {
      this.userData = userData;
      // 更新状态后，保存到localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
    },
    // 更新用户头像
    addFieldToUserData(fieldName, fieldValue) {
      this.userData = {
        ...this.userData,
        [fieldName]: fieldValue,
      };
      localStorage.setItem('userData', JSON.stringify(this.userData));
    },
    startLoading() {
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    },
  },
  getters: {
    getUserData: (state) => state.userData,
    isLoading: (state) => state.isLoading,
  },
});
`);
const vueCode3=ref(
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