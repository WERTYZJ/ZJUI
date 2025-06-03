<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>宝藏网站</h2>
      </template>
      <div class="main">
        <div class="main-box" v-for="(i, index) in frendlyChains" :key="index">
          <div class="left">
            <img :src="i.icon" alt="icon">
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
    titleColor: "green",
    content: "GreenVideo的使用是完全免费的，在这里你们能够将视频网址输入此地并下载视频。"
  },
  {
    icon: '/ZJUI.png',
    title: "Green Video",
    titleColor: "green",
    content: "GreenVideo的使用是完全免费的，在这里你们能够将视频网址输入此地并下载视频。"
  },
  {
    icon: '/ZJUI.png',
    title: "Green Video",
    titleColor: "green",
    content: "GreenVideo的使用是完全免费的，在这里你们能够将视频网址输入此地并下载视频。"
  },
])
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
  border-radius:var(--ZJ-main-border-radius-10);
}

.left {
  height: 40px;
  width: 40px;
  flex-shrink: 0;
}

.left img {
  height: 40px;
  width: 40px;
   border-radius:var(--ZJ-main-border-radius-10);
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