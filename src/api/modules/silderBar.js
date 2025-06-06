import axios from "axios";

export const getWeather = (params) => {
  return axios({
    url: 'https://whyta.cn/api/tianqi',
    method: 'get',
    params: params
  })
};