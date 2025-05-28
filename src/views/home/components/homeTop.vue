<template>
  <div class="ZJHomeTop">
    <div class="left">
      <div class="left-top">欢迎来到ZJUI-Admin !</div>
      <div class="left-center">
        <div class="left-center2">
          <a class="left-center-l">安全运行</a>
          <a class="left-center-r">99天</a>
        </div>
        <div class="left-center3">有朋自远方来，不亦乐乎。</div>
      </div>
      <div class="left-bottom">
        <span class="m-pointer">开始新UI</span>
        <ZJSvgIcons class="left-bottom-icon" icon="right" height="30" width="30" style="cursor: pointer;"></ZJSvgIcons>
      </div>
    </div>

    <div class="center" v-for="(i, index) in listData" :key="index">
      <ZJProgressCircle :ZJCircleData="i"></ZJProgressCircle>
    </div>

    <div v-for="(i, index) in homeTopRight" :key="index" class="right-box">
      <div class="right-top" :style="{ backgroundColor: getTextBgColor(index) }">
        <img :src="i.icon" alt="">
      </div>
      <div class="right-center" :style="{ color: getTextColor(index) }">{{ i.centerText }}</div>
      <div class="right-bottom">{{ i.bottomText }}</div>
    </div>

  </div>
</template>

<script setup>

const listData = ref([
  {
    percent: 28,
    text: "浏览增长",
    bottomText: "相比较昨日",
  },
  {
    percent: 45,
    text: "分享增长",
    bottomText: "相比较上周",
  },
])

const homeTopRight = ref([
  {
    icon:new URL('@/assets/images/index/homeTop/car.svg',import.meta.url).href,
    centerText: "1799",
    bottomText: "预览次数",
  },
  {
    icon:new URL('@/assets/images/index/homeTop/share.svg',import.meta.url).href,
    centerText: "20",
    bottomText: "分享次数",
  },
  {
    icon:new URL('@/assets/images/index/homeTop/dollar.svg',import.meta.url).href,
    centerText: "$0",
    bottomText: "预估收益",
  },
])


function getTextColor(index) {
  switch (index) {
    case 0:
      return '#407EF9';
    case 1:
      return '#FF7E86';
    case 2:
      return '#A162F7';
    default:
      return '#407EF9';
  }
}

function getTextBgColor(index) {
  switch (index) {
    case 0:
      return '#407ef91a';
    case 1:
      return '#ff7e861a';
    case 2:
      return '#a162f71a';
    default:
      return '#407ef91a';
  }
}

</script>

<style scoped>
@import url("https://fontsapi.zeoseven.com/442/main/result.css");

.ZJHomeTop {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  background-color: var(--ZJ-main);
  /* background-color: antiquewhite; */
  box-shadow: 2px 0 8px 0 rgb(29, 35, 41, 0.05);
  border-radius: 7px;
  padding: 20px;
  overflow: hidden;
  font-family: "Maple Mono NF CN";
  font-weight: normal;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.left-top {
  font-size: 24px;
  font-weight: 600;
  color: var(--ZJ-main-color);
  word-break: keep-all;
}

.left-center {
  display: flex;
  flex-direction: column;
  word-break: keep-all;
  flex-shrink: 0;
  gap: 5px;
}

.left-center2 {
  display: flex;
  align-items: end;
  gap: 10px;
  word-break: keep-all;
  flex-shrink: 0;
}

.left-center3 {
  font-size: 16px;
  color: #72767C;
}

.left-center-l {
  font-size: 24px;
  color: #FF6464;
  word-break: keep-all;
  flex-shrink: 0;
}

.left-center-r {
  font-size: 18px;
  color: #A4A5A6;
  word-break: keep-all;
  flex-shrink: 0;
}

.left-bottom {
  border-radius: 20px;
  padding: 5px 15px;
  width: fit-content;
  background-color: #FF6370;
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--ZJ-main);
  cursor: pointer;
}
.left-bottom-icon{
  animation: icon 1s ease-in-out infinite alternate;;
}

@keyframes icon {
  from{
    opacity: 0.2;
    transform: translateX(-5px); /* 向左偏移 */
  }to{
    opacity: 1;
    transform: translateX(5px); /* 向右偏移 */
  }
}

.right-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  word-break: keep-all;
  flex-shrink: 0;
}

.right-top {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  padding: 5px;
  border-radius: 10px;
  background-color: rgba(64, 126, 249, 0.1);
}

.right-center {
  font-size: 22px;
}

.right-bottom {
  font-size: 16px;
  color: #808191;
}
</style>
