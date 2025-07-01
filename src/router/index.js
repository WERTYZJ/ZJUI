import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   meta: {
  //     fullPage: true // 自定义元信息标记全屏页面
  //   },
  //   component: () => import('@/views/home/index.vue')
  // },
  {
    path: '/home',
    name: 'home',
    meta: { icon: 'home' },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '',
    name: 'ZJUI-Home',
    meta: { icon: 'ZJUI' },
    component: '',
    children: [
      {
        path: '/ZJCard',
        name: 'ZJCard',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJCard/index.vue'),
      },
      {
        path: '/ZJCodeDisplay',
        name: 'ZJCodeDisplay',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJCodeDisplay/index.vue'),
      },
      {
        path: '/ZJMessage',
        name: 'ZJMessage',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJMessage/index.vue')
      },
      {
        path: '',
        name: 'ZJItem',
        meta: { icon: 'menu' },
        component: '',
        children: [
          {
            path: '/ZJMenu',
            name: 'ZJMenu',
            meta: { icon: 'menu' },
            component: () => import('@/views/ZJUI/ZJItem/ZJMenu/index.vue'),
          },
          {
            path: '/ZJMenuCard',
            name: 'ZJMenuCard',
            meta: { icon: 'menu' },
            component: () => import('@/views/ZJUI/ZJItem/ZJMenuCard/index.vue'),
          },
        ]
      },
      {
        path: '/ZJButton',
        name: 'ZJButton',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJButton/index.vue')
      },
      {
        path: '/ZJProgress',
        name: 'ZJProgress',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJProgress/index.vue')
      },
      {
        path: '/ZJRate',
        name: 'ZJRate',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJRate/index.vue')
      },
      {
        path: '/ZJSvgIcons',
        name: 'ZJSvgIcons',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJSvgIcons/index.vue')
      },
      {
        path: '/ZJPagination',
        name: 'ZJPagination',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJPagination/index.vue')
      },
      {
        path: '/ZJSelect',
        name: 'ZJSelect',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJSelect/index.vue')
      },
      {
        path: '/ZJSelectDate',
        name: 'ZJSelectDate',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJSelectDate/index.vue')
      },
      {
        path: '/ZJSelectDateMore',
        name: 'ZJSelectDateMore',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJSelectDateMore/index.vue')
      },
      {
        path: '/ZJSelectTime',
        name: 'ZJSelectTime',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJSelectTime/index.vue')
      },
      {
        path: '/ZJNoData',
        name: 'ZJNoData',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJNoData/index.vue')
      },
      {
        path: '/ZJLoading',
        name: 'ZJLoading',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJLoading/index.vue')
      },
      {
        path: '/ZJCutAvatar',
        name: 'ZJCutAvatar',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJCutAvatar/index.vue')
      },
      {
        path: '/ZJUpload',
        name: 'ZJUpload',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJUpload/index.vue')
      },
      {
        path: '/ZJCalendar',
        name: 'ZJCalendar',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJCalendar/index.vue')
      },
      {
        path: '/ZJAnchor',
        name: 'ZJAnchor',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJAnchor/index.vue')
      },
      {
        path: '/ZJDialog',
        name: 'ZJDialog',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJDialog/index.vue')
      },
      {
        path: '/ZJBackTop',
        name: 'ZJBackTop',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJBackTop/index.vue')
      },
      {
        path: '/ZJCarousel',
        name: 'ZJCarousel',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJCarousel/index.vue')
      },
      {
        path: '/ZJAvailableTime',
        name: 'ZJAvailableTime',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJAvailableTime/index.vue')
      },
      {
        path: '/ZJSwitch',
        name: 'ZJSwitch',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJSwitch/index.vue')
      },
      {
        path: '/ZJProgressCircle',
        name: 'ZJProgressCircle',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJProgressCircle/index.vue')
      },
      {
        path: '/ZJInput',
        name: 'ZJInput',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJInput/index.vue')
      },
    ]
  },
  {
    path: '',
    name: 'uniApp',
    meta: { icon: 'uniApp' },
    component: '',
    children: [
      {
        path: '/listen',
        name: '监听滚动条',
        meta: { icon: 'uniApp' },
        component: () => import('@/views/uniApp/listen/index.vue')
      },
    ]
  },
  {
    path: '',
    name: 'javaScript',
    meta: { icon: 'javaScript' },
    component: '',
    children: [
      {
        path: '/toFixed',
        name: 'js保留两位小数',
        meta: { icon: 'message' },
        component: () => import('@/views/javaScript/toFixed/index.vue')
      },
      {
        path: '/function',
        name: 'js函数',
        meta: { icon: 'message' },
        component: () => import('@/views/javaScript/function/index.vue')
      },
    ]
  },
  {
    path: '',
    name: 'vue3',
    meta: { icon: 'vue' },
    component: '',
    children: [
      {
        path: '/vue.config.js',
        name: 'vue.config.js',
        meta: { icon: 'vue' },
        component: () => import('@/views/vue/vue.config.js/index.vue')
      },
      {
        path: '/recursion',
        name: 'recursion',
        meta: { icon: 'vue' },
        component: () => import('@/views/vue/recursion/index.vue')
      },
      {
        path: '/searchRoute',
        name: 'searchRoute',
        meta: { icon: 'vue' },
        component: () => import('@/views/vue/searchRoute/index.vue')
      },
      {
        path: '/vue-i18n',
        name: 'vue-i18n',
        meta: { icon: 'vue' },
        component: () => import('@/views/vue/vue-i18n/index.vue')
      },
      {
        path: '/Vuex-Pinia',
        name: 'Vuex转换Pinia',
        meta: { icon: 'pinia' },
        component: () => import('@/views/pinia/Vuex-Pinia/index.vue')
      },
    ]
  },
  {
    path: '/notice',
    name: '消息',
    meta: { icon: 'notice' },
    component: () => import('@/views/message/index.vue')
  },
  {
    path: '/friendChains',
    name: '工具链接',
    meta: { icon: 'webSet' },
    component: () => import('@/views/friendChains/index.vue')
  },
  {
    path: '/studyChains',
    name: '学习链接',
    meta: { icon: 'studyChains' },
    component: () => import('@/views/studyChains/index.vue')
  },
  {
    path: '/info',
    name: '个人中心',
    meta: { icon: 'selfInfo' },
    component: () => import('@/views/info/index.vue')
  },
  // {
  //   path: '/InProcess/:roomID',
  //   name: 'InProcess',
  //   component: () => import( '../views/InProcess.vue'),
  //   beforeEnter: (to, from, next) => {  
  //     const userData = store.getters.getUserData;  
  //     if (!userData || userData === '' || userData === null || userData === undefined) {  
  //       next({ name: 'home' });  
  //     } else {  
  //       next();  
  //     }  
  //   },
  // },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   let token = sessionStorage.getItem('token');

//   if (token || to.path === "/login") {
//     next();
//   } else {
//     next("/login");
//   }
// })

export default router
