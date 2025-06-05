<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>宝藏网站</h2>
      </template>
      <div class="main">
        <div class="main-box" v-for="(i, index) in frendlyChains" :key="index" @click="handelBox(path)">
          <div class="left">
            <img :src="i.img || i.icon" @error="errorImg" alt="icon">
          </div>
          <div class="right">
            <div class="right-title" :style="{ color: `${i.titleColor}` }">{{ i.title }}</div>
            <div class="right-content">{{ i.content }}</div>
          </div>
        </div>
      </div>
    </ZJMain>
  </div>
</template>

<script setup>

const frendlyChains = ref([
  {
    icon: '/ZJUI.png',
    title: "Green Video",
    titleColor: "#36ad6a",
    path: 'https://greenvideo.cc/',
    content: "GreenVideo的使用是完全免费的，在这里你们能够将视频网址输入此地并下载视频。"
  },
  {
    icon: '/ZJUI.png',
    img: 'https://sqlpub.com/logo.svg',
    title: "SQLPub",
    titleColor: "#7F56D9",
    path: 'https://www.sqlpub.com/',
    content: "SQLPub 提供最新版本、甚至是开发者版本的 MySQL 服务器测试服务。"
  },
  {
    icon: '/ZJUI.png',
    img: 'https://tools.pdf24.org/static/img/pageIcons/svg/default.svg?v=5cae54fd',
    title: "PDF24",
    titleColor: "#4098fc",
    path: 'https://tools.pdf24.org/zh/',
    content: "免费且易于使用的在线PDF工具。"
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
</style>