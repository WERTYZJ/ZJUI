// src/http/axios.js
import axios from 'axios'
// src/someModule.js
import store from '@/store'
import router from '@/router'
import {getCurrentInstance} from '@/vue'

const { appContext } = getCurrentInstance();
const $ZJMessage = appContext.config.globalProperties.$ZJMessage;

// 创建一个 Axios 实例
export const http = axios.create({
  baseURL: 'http://localhost:5200',
  timeout: 10000
})


// 请求拦截器
http.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = store.getters?.getUserData?.token || ''  // 从 localStorage 中获取 token
    // console.log("获取token", token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // 在请求头中添加 token
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject("请求出错" + error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  response => {
    // token过期
    if (response?.data.status === 401) {
      $ZJMessage({
        type: 'warning',
        message: '登录验证已过期，请重新登录！',
      });
      setTimeout(() => {
        router.push('/');
        setTimeout(() => {
          localStorage.removeItem('userData');
          window.location.reload();
        }, 10);
      }, 1000)
    }
    console.log("API返回数据为", response.data)
    return response // 通常我们只关心响应数据，而不是整个响应对象
  },
  error => {
    // 服务器出错
    if (error.response?.status === 500) {
      $ZJMessage({
        type: 'warning',
        message: '服务器出错，请稍后再试！',
      });
    }
    return Promise.reject(error)
  }
)

export default http