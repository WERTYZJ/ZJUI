import { http } from '@/api/utils/interceptors'


// 登录
export const userLogin = (params = {}) => {
  return http({
    url: '/user/userLogin',
    method: 'get',
    params: params
  })
};

// 用户获取个人信息
export const getUserInfo = () => {
  return http({
    url: '/user/getUserInfo',
    method: 'get',
  })
};