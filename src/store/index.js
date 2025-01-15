// src/store/index.js  
import { defineStore } from "pinia";  
  
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
    isSideBarOpen:true,
    ZJAsideMenuNameSelect:'home',
    ZJAsideMenuCardNameSelect:null,
    ZJAsideMenuCardNameIndex:-1,
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