import { http } from '@/api/utils/interceptors'


// 首页获取评分最高导师
export const getBestTutor = () => http.get('/index/bestTutor');
// 首页获取评价最高导师
export const getBestReview = () => http.get('/index/bestReview');
// 获取学科数据
export const getSubjectList = (params = {}) => http.get('/index/subjectsList', { params: params});