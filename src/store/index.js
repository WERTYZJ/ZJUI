// src/store/index.js  
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state: () => ({
    // 尝试从localStorage加载用户数据，如果没有则默认为空对象
    userData: (function () {
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
    // 加载动画
    isLoading: false,
    // 侧边框
    isSideBarOpen: true,
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
      // 侧边栏导航
      showSilderBar: true,
      // 路由刷新
      showRouterActive: true,
      isFullScreenRouter: false,
    },
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
  },
});

// 当需要以下情况时，使用 action：
// 执行异步操作
// 执行复杂业务逻辑
// 需要触发副作用（如保存 localStorage）
// 需要集中管理状态修改逻辑

// 当需要以下情况时，使用 getters：
// 计算派生状态：基于现有状态生成新值
// 封装访问逻辑：隐藏状态访问细节，提供统一接口
// 缓存优化：自动缓存计算结果（当依赖状态未变化时不会重新计算）