<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>学习链接</h2>
      </template>
      <div class="main">
        <div class="main-box" v-for="(i, index) in frendlyChains" :key="index" @click="handelBox(i.path)">
          <div class="left">
            <img :src="i.icon" @error="$ZJ_ErrorImg" alt="icon">
          </div>
          <div class="right">
            <div class="right-title" :style="{ color: getColor(index) }">{{ i.title }}</div>
            <div class="right-content">{{ i.content }}</div>
          </div>
        </div>
      </div>
    </ZJMain>
  </div>
</template>

<script setup>

import { ref, getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance();
const $ZJ_ErrorImg = appContext.config.globalProperties.$ZJ_ErrorImg;

const getColor = (index) => {
  const colorArrey = [
    { bg: "#d8f0d8", text: "#4CAF50" },
    { bg: "#cae6fd", text: "#589be0" },
    { bg: "#ffe3cc", text: "#FFA500" },
    { bg: "#fbddda", text: "#FF5252" },
    { bg: "#EFF0FF", text: "#7F56D9" },
  ];
  const colorIndex = index % colorArrey.length;
  const color = colorArrey[colorIndex].text;
  return color;
}

const frendlyChains = ref([
  {
    icon: '/ZJUI.png',
    title: "JWT",
    path: 'https://blog.51cto.com/u_16175478/12761202',
    content: "在Java中，JWT(JSON Web Token) 常用来身份校验和信息交换，增强安全性。"
  },
  {
    icon: '/ZJUI.png',
    title: "TS(TypeScript)",
    path: 'https://zhuanlan.zhihu.com/p/505175155',
    content: "对比与JS，TS是JS的超集，简单的说就是在 JavaScript 的基础上加入了类型系统，让每个参数都有明确的意义，从而带来了更加智能的提示。"
  },
  {
    icon: 'https://static.jyshare.com/images/favicon.ico',
    title: "菜鸟教程",
    path: 'https://www.runoob.com/',
    content: "菜鸟教程是一个提供各种编程语言、技术和工具的在线学习平台，涵盖了HTML、CSS、JavaScript、Python、Java、C、SQL、AI等多个领域。"
  },
  {
    icon: 'https://static.jyshare.com/images/favicon.ico',
    title: "w3school",
    path: 'https://www.w3school.com.cn/jsref/jsref_obj_math.asp',
    content: "w3school是一个提供各种编程语言、技术和工具的在线学习平台，涵盖了HTML、CSS、JavaScript、Python、Java、C、SQL、AI等多个领域。"
  },
  {
    icon: '',
    title: "如何使用Netlify之前端HTML+后端Node.js的简单部署",
    path: 'https://blog.csdn.net/qq_42489313/article/details/145992896',
    content: "netlify的自动化部署方法。"
  },
  {
    icon: '',
    title: "uniapp使用uview-plus(vue3项目)",
    path: 'https://blog.csdn.net/qq_16182677/article/details/129935901',
    content: "uniapp中安装uview-plus"
  },
  {
    icon: '',
    title: "JS数组函数 reduce() 的用法—包含基础、进阶、高阶用法",
    path: 'https://blog.csdn.net/sunyctf/article/details/134491546',
    content: "reduce() 的用法"
  },
  {
    icon: '',
    title: "如何使用 JavaScript 根据 ID 删除数组中的对象",
    path: 'https://blog.csdn.net/m0_55666986/article/details/140476507',
    content: "根据 ID 删除数组中的对象"
  },
  {
    icon: 'https://www.cnblogs.com/images/logo.svg?v=2SMrXdIvlZwVoB1akyXm38WIKuTHVqvGD0CweV-B6cY',
    title: "uni-app 常用提示弹框 uni.showToast",
    path: 'https://www.cnblogs.com/hailexuexi/p/17049290.html',
    content: "uni.showToast使用方法"
  },
])

const errorImg = (event) => {
  event.target.src = '/ZJUI.png'
}

const handelBox = (path) => {
  window.open(path, '_blank')
}
</script>

<style scoped>
.main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 30px;
}

.main-box {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: var(--ZJ-main-hover);
  border-radius: var(--ZJ-main-border-radius-10);
}

.left {
  height: 40px;
  width: 40px;
  flex-shrink: 0;
}

.left img {
  height: 40px;
  width: 40px;
  border-radius: var(--ZJ-main-border-radius-10);
}

.right {
  display: flex;
  gap: 5px;
  flex-direction: column;
}

.right-title {
  font-size: 16px;
}

.right-content {
  font-size: 14px;
}

@media (max-width:1200px) {
  .main {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width:800px) {
  .main {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>