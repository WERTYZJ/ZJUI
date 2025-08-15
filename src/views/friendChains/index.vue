<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>工具链接</h2>
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
    title: "Green Video",
    path: 'https://greenvideo.cc/',
    content: "GreenVideo的使用是完全免费的，在这里你们能够将视频网址输入此地并下载视频。"
  },
  {
    icon: 'https://sqlpub.com/logo.svg',
    title: "SQLPub",
    path: 'https://www.sqlpub.com/',
    content: "SQLPub 提供最新版本、甚至是开发者版本的 MySQL 服务器测试服务。"
  },
  {
    icon: 'https://tools.pdf24.org/static/img/pageIcons/svg/default.svg?v=5cae54fd',
    title: "PDF24",
    path: 'https://tools.pdf24.org/zh/',
    content: "免费且易于使用的在线PDF工具。"
  },
  {
    icon: '/ZJUI.png',
    title: "得奇小说网",
    path: 'https://www.deqixs.com/',
    content: "免费的小说txt下载网站。"
  },
  {
    icon: '',
    title: "CSS3剪贴路径(Clip-path)在线生成器工具",
    path: 'https://tools.jb51.net/code/css3path',
    content: "CSS3剪贴路径(Clip-path)在线生成器工具。"
  },
  {
    icon: '',
    title: "替换PNG图片中的任意颜色为新颜色",
    path: 'https://www.lzltool.cn/Toolkit/ChangePngColor',
    content: "替换PNG图片中的任意颜色为新颜色的工具。"
  },
  {
    icon: '',
    title: "脚本之家在线工具",
    path: 'https://tools.jb51.net/#home',
    content: "万能大全的工具合集。"
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
])

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
  /* overflow: hidden;
  text-overflow: ellipsis; */
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