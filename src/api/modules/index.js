import { http } from '@/api/utils/interceptors'


// 首页获取评分最高导师
// export const getBestTutor = () => http.get('/index/bestTutor');
// 首页获取评价最高导师
// export const getBestReview = () => http.get('/index/bestReview');
// 获取学科数据
// export const getSubjectList = (params = {}) => http.get('/index/subjectsList', { params: params });


// 获取学科数据
export const getBestTutor = () => {
  return http({
    url: '/index/bestTutor',
    method: 'get'
  })
};

// 获取学科数据
export const getBestReview = () => {
  return http({
    url: '/index/bestReview',
    method: 'get'
  })
};

// 获取学科数据
export const getSubjectList = (params = {}) => {
  return http({
    url: '/index/subjectsList',
    method: 'get',
    params: params
  })
};