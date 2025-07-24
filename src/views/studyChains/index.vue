<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>学习链接</h2>
      </template>
      <div class="main">
        <div class="main-box" v-for="(i, index) in frendlyChains" :key="index" @click="handelBox(i.path)">
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
    img: '',
    title: "JWT",
    titleColor: "#36ad6a",
    path: 'https://blog.51cto.com/u_16175478/12761202',
    content: "在Java中，JWT(JSON Web Token) 常用来身份校验和信息交换，增强安全性。"
  },
  {
    icon: '/ZJUI.png',
    img: '',
    title: "TS(TypeScript)",
    titleColor: "#fcb040",
    path: 'https://zhuanlan.zhihu.com/p/505175155',
    content: "对比与JS，TS是JS的超集，简单的说就是在 JavaScript 的基础上加入了类型系统，让每个参数都有明确的意义，从而带来了更加智能的提示。"
  },
  {
    icon: '/ZJUI.png',
    img: 'https://static.jyshare.com/images/favicon.ico',
    title: "菜鸟教程",
    titleColor: "#4098fc",
    path: 'https://www.runoob.com/',
    content: "菜鸟教程是一个提供各种编程语言、技术和工具的在线学习平台，涵盖了HTML、CSS、JavaScript、Python、Java、C、SQL、AI等多个领域。"
  },
  {
    icon: '/ZJUI.png',
    img: 'https://static.jyshare.com/images/favicon.ico',
    title: "w3school",
    titleColor: "#7F56D9",
    path: 'https://www.w3school.com.cn/jsref/jsref_obj_math.asp',
    content: "w3school是一个提供各种编程语言、技术和工具的在线学习平台，涵盖了HTML、CSS、JavaScript、Python、Java、C、SQL、AI等多个领域。"
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