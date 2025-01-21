import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    id:1,
    path: '/home',
    name: 'home',
    meta: { icon: 'home' },
    component: () => import('@/views/home/index.vue')
  },
  {
    id:2,
    path: '',
    name: 'ZJUI-Home',
    meta: { icon: 'ZJUI' },
    component:'',
    children:[
      { 
        id:201,
        path: '/ZJCard',
        name: 'ZJCard',
        meta: { icon: 'card' },
        component: () => import('@/views/ZJUI/ZJCard/index.vue'),
      },
      { 
        id:202,
        path: '/ZJCodeDisplay',
        name: 'ZJCodeDisplay',
        meta: { icon: 'copy' },
        component: () => import('@/views/ZJUI/ZJCodeDisplay/index.vue'),
      },
      { 
        id:203,
        path: '/ZJMessage',
        name: 'ZJMessage',
        meta: { icon: 'message' },
        component: () => import('@/views/ZJUI/ZJMessage/index.vue')
      },
      { 
        id:204,
        path: '',
        name: 'ZJItem',
        meta: { icon: 'menu' },
        component:'',
        children:[
          { 
            id:204001,
            path: '/ZJMenu',
            name: 'ZJMenu',
            meta: { icon: 'menu' },
            component: () => import('@/views/ZJUI/ZJItem/ZJMenu/index.vue'),
          },
          { 
            id:204002,
            path: '/ZJMenuCard',
            name: 'ZJMenuCard',
            meta: { icon: 'menu' },
            component: () => import('@/views/ZJUI/ZJItem/ZJMenuCard/index.vue'),
          },
        ]
      },
      { 
        id:205,
        path: '/ZJButton',
        name: 'ZJButton',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJButton/index.vue')
      },
      { 
        id:206,
        path: '/ZJProgress',
        name: 'ZJProgress',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJProgress/index.vue')
      },
      { 
        id:207,
        path: '/ZJRate',
        name: 'ZJRate',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJRate/index.vue')
      },
      { 
        id:208,
        path: '/ZJSvgIcons',
        name: 'ZJSvgIcons',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJSvgIcons/index.vue')
      },
      { 
        id:209,
        path: '/ZJPagination',
        name: 'ZJPagination',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJPagination/index.vue')
      },
      { 
        id:210,
        path: '/ZJSelect',
        name: 'ZJSelect',
        meta: { icon: 'button' },
        component: () => import('@/views/ZJUI/ZJSelect/index.vue')
      },
    ]
  },
  { 
    id:3,
    path: '',
    name: 'javaScript',
    meta: { icon: 'javaScript' },
    component:'',
    children:[
      { 
        id:301,
        path: '/toFixed',
        name: 'js保留两位小数',
        meta: { icon: 'message' },
        component: () => import('@/views/javaScript/toFixed/index.vue')
      },
    ]
  },
  { 
    id:4,
    path: '',
    name: '项目一(WeMaster)',
    meta: { icon: 'weMaster' },
    component:''
  },
  { 
    id:5,
    path:'',
    name:'项目二(WePal)',
    meta: { icon: 'wePal' },
    component:'',
    children:[
      { 
        id:501,
        path: '/Vuex-Pinia',
        name: 'Vuex转换Pinia',
        meta: { icon: 'javaScript' },
        component: () => import('@/views/wepal/Vuex-Pinia/index.vue')
      },
    ]
  },
  { 
    id:6,
    path: '',
    name: 'vue',
    meta: { icon: 'vue' },
    component:'',
    children:[
      { 
        id:601,
        path: '/dev-server',
        name: 'dev-server',
        meta: { icon: 'vue' },
        component: () => import('@/views/javaScript/toFixed/index.vue')
      },
    ]
  },
  { 
    id:7,
    path: '',
    name: '个人中心',
    meta: { icon: 'selfInfo' },
    component:''
  },
  { 
    id:8,
    path: '',
    name: '设置',
    meta: { icon: 'set' },
    component:''
  },
  // {
  //   path: '/SearchTutor',
  //   name: 'SearchTutor',
  //   component: () => import( '../views/searchTutor/index.vue')
  // },
  // {
  //   path: '/LessonsPlan',
  //   name: 'LessonsPlan',
  //   component: () => import( '../views/lessonsPlan/index.vue')
  // },
  // {
  //   path: '/BookLessons',
  //   name: 'BookLessons',
  //   component: () => import( '../views/bookLessons/index.vue')
  // },
  // {
  //   path: '/Account',
  //   name: 'Account',
  //   component: () => import( '../views/account/index.vue')
  // },
  // {
  //   path: '/Dashboard',
  //   name: 'Dashboard',
  //   component: () => import( '../views/dashboard/index.vue')
  // },
  // {
  //   path: '/TutorLessons',
  //   name: 'TutorLessons',
  //   component: () => import( '../views/lesson/indexTutor.vue')
  // },
  // {
  //   path: '/Wallet',
  //   name: 'Wallet',
  //   component: () => import( '../views/wallet/index.vue')
  // },
  // {
  //   path: '/TutorStudents',
  //   name: 'TutorStudents',
  //   component: () => import( '../views/tutorStudents/index.vue')
  // },
  // {
  //   path: '/StudentsLessons',
  //   name: 'StudentsLessons',
  //   component: () => import( '../views/lesson/indexStudent.vue')
  // },
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

export default router
