import { http } from '@/api/utils/interceptors'


// 登录
export const userLogin = (params = {}) => http.get('/user/userLogin', { params: params});
// 用户获取个人信息
export const getUserInfo = () => http.get('/user/getUserInfo');