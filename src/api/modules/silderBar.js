import axios from "axios";

// 获取天气信息
export const getWeather = (params) => {
  return axios({
    url: 'https://whyta.cn/api/tianqi',
    method: 'get',
    params: params
  })
};