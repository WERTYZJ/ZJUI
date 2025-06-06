<template>
  <div>

    <div class="main" v-if="userStore.isSideBarOpen">
      <div class="top">
        <img src="@/assets/layout/weather/1.png" alt="">
        <span class="top-temperature">{{ temperature }} ℃</span>
      </div>
      <div class="bottom">
        <div class="bottom-left">
          <span>天气 : {{ weather }}</span>
          <span>{{ time }}</span>
        </div>
        <div class="bottom-right">
          <span>{{ winddirection }} 风</span>
          <span>湿度 : {{ humidity }}</span>
        </div>
      </div>
    </div>

    <div class="main-2" v-if="!userStore.isSideBarOpen">
      <div class="top-2">
        <img src="@/assets/layout/weather/1.png" alt="">
        <span class="top-2-span1">{{ temperature }}℃</span>
        <span>{{ weather }}</span>
        <span>{{ winddirection }}</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import axios from "axios";
import { ref, getCurrentInstance, onMounted } from "vue";
import { useUserStore } from '@/store';
import { getWeather } from "@/api/modules/silderBar";

const userStore = useUserStore();
const { appContext } = getCurrentInstance();
const $ZJMessage = appContext.config.globalProperties.$ZJMessage;

const weather = ref('');
const time = ref('');
const winddirection = ref('');
const temperature = ref('');
const humidity = ref('');
const city = ref('烟台');

onMounted(() => {
  getWeatherData()
  // getLocation();
})

// const getLocation = ()=>{
//   if (!navigator.geolocation) {
//     $ZJMessage({
//       type: 'error',
//       message: '您的浏览器不支持地理位置功能！',
//       duration: 2000,
//     });
//     return;
//   }
//   // 请求位置信息
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       // 成功获取位置的回调
//       const latitude = position.coords.latitude;   // 纬度
//       const longitude = position.coords.longitude; // 经度
//       const accuracy = position.coords.accuracy;   // 精度（米）

//       console.log("当前位置：", {
//         latitude,
//         longitude,
//         accuracy
//       });
//        getWeatherData()
//       // 获取城市信息
//       // getCityFromCoords(latitude, longitude);
//     },
//     (error) => {
//       // 获取位置失败的回调
//       switch(error.code) {
//         case error.PERMISSION_DENIED:
//           $ZJMessage({
//             type: 'error',
//             message: '用户拒绝提供位置信息！',
//             duration: 2000,
//           });
//           break;
//         case error.POSITION_UNAVAILABLE:
//           $ZJMessage({
//             type: 'error',
//             message: '位置信息不可用！',
//             duration: 2000,
//           });
//           break;
//         case error.TIMEOUT:
//           $ZJMessage({
//             type: 'error',
//             message: '获取位置超时！',
//             duration: 2000,
//           });
//           break;
//         default:
//           $ZJMessage({
//             type: 'error',
//             message: '未知错误！',
//             duration: 2000,
//           });
//       }
//     },
//     {
//       // 可选配置项
//       enableHighAccuracy: true, // 尝试获取更精确的位置
//       timeout: 5000,            // 超时时间（毫秒）
//       maximumAge: 0             // 缓存位置的最大时间（毫秒）
//     }
//   );
// }

// 根据坐标获取城市信息
// async function getCityFromCoords(lat, lng) {  
//   try {
//       // 使用Nominatim API进行反向地理编码
//       const response = await fetch(
//           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
//       );

//       if (!response.ok) {
//         $ZJMessage({
//           type: 'error',
//           message: `API请求失败: ${response.status}`,
//           duration: 2000,
//         });
//       }

//       const data = await response.json();

//       // 检查是否有地址信息
//       if (!data.address) {
//         $ZJMessage({
//           type: 'error',
//           message: "无法解析位置信息",
//           duration: 2000,
//         });
//       }

//       // 提取地址信息
//       const address = data.address;

//       // 确定城市名称（不同地区可能有不同字段）
//       const cityName = 
//           address.city || 
//           address.town || 
//           address.village || 
//           address.municipality || 
//           address.county || 
//           "未知";
//       city.value = cityName;
//       getWeatherData()
//   } catch (error) {
//     $ZJMessage({
//       type: 'error',
//       message: `获取城市信息失败: ${error.message}`,
//       duration: 2000,
//     });
//   }
// }

const getWeatherData = () => {
  const params = {
    key: '36de5db81215',
    city: city.value,
  }
  getWeather(params)
    .then(res => {
      // console.log(res.data)
      if (res.data.status == 1) {
        const a = res.data.lives[0]
        weather.value = a.weather;
        const dateObj = new Date(a.reporttime);
        const formattedObj = `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getDate().toString().padStart(2, '0')}`;
        time.value = formattedObj
        winddirection.value = a.winddirection;
        temperature.value = a.temperature;
        humidity.value = a.humidity
      } else {
        $ZJMessage({
          type: 'error',
          message: "获取天气失败！",
          duration: 2000,
        });
      }
    })
    .catch(err => {
      console.log('操作失败' + err);
    })
}

</script>

<style scoped>
.main {
  background-color: var(--ZJ-default-main);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;
  margin: 10px;
  height: 100px;
  border-radius: var(--ZJ-main-border-radius-10);
  position: relative;
}

.top {
  display: flex;
  justify-content: end;
  align-items: center;
}

.top img {
  height: 80px;
  width: 80px;
  position: absolute;
  left: 0px;
  top: -10px;
}

.top-temperature {
  font-size: 18px;
  margin-top: 10px;
  font-weight: bold;
}

.bottom {
  display: flex;
  justify-content: space-between;
}

.bottom-left {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.bottom-right {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

span {
  color: var(--ZJ-main-message-color);
}

.main-2 {
  background-color: var(--ZJ-default-main);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 5px;
  margin: 10px 5px;
  height: 100px;
  border-radius: var(--ZJ-main-border-radius-10);
  position: relative;
}

.top-2 {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.top-2 img {
  height: 50px;
  width: 50px;
  position: absolute;
  top: -8px;
  left: 0px;
}

.top-2-span1 {
  margin-top: 27px;
}
</style>