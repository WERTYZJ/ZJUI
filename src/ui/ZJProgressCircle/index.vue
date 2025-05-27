<template>
  <div class="ZJProgressCircle">
    <div class="circle-box">
      <div class="g-progress" :style="progressStyle(props.ZJCircleData.percent)"></div>
      <div class="g-circle" :style="circleStyle(props.ZJCircleData.percent)"></div>
      <div class="percent-text">
        <p>{{ props.ZJCircleData?.text }}</p>
        <p>{{ props.ZJCircleData?.percent }}%</p>
      </div>
    </div>
    <div class="text-box">
      <a class="type-text">{{ props.ZJCircleData?.bottomText }}</a>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  ZJCircleData: {
    type: Object,
  },
})

function progressStyle(percent) {
  let color = '#FFCDB2'
  if (percent >= 50) { color = '#14D2B8'; }
  else if (percent >= 30) { color = '#FFCDB2'; }
  else if (percent >= 0) { color = '#FF8B8C'; }
  else { color = '#FFCDB2' }
  return `background: conic-gradient(${color} 0, ${color} ${percent}%, var(--ZJ-main-hover)  ${percent}%, var(--ZJ-main-hover));`
}

function circleStyle(percent) {
  let color = '#FFCDB2'
  if (percent >= 50) { color = '#14D2B8'; }
  else if (percent >= 30) { color = '#FFCDB2'; }
  else if (percent >= 0) { color = '#FF8B8C'; }
  else { color = '#FFCDB2' }
  return `--progress-rotate: ${percent * 3.6}deg;--progress-color: ${color};`
}
</script>

<style scoped>
.ZJProgressCircle {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.circle-box {
  width: 120px;
  height: 120px;
  position: relative;
}

.g-progress {
  position: relative;
  margin: auto;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  mask: radial-gradient(transparent, transparent 45px, #000 45.5px, #000 0);
  transition: all 0.3s ease;
  overflow: hidden;
}

.g-circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  /* 添加旋转过渡 */
  transition: none;
  /* 禁用过渡 */
}

.g-circle::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 52px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--progress-color);
}

.g-circle::after {
  content: "";
  position: absolute;
  top: 50px;
  left: 50px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--progress-color);
  /* 动态圆点 */
  transform: rotate(var(--progress-rotate, 0deg)) translate(0, -50px);
  transform-origin: 10px 10px;
  /* 关键调整：设置旋转中心 */
  transition: transform 0.3s ease;
}

.percent-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 15px;
  /* background-color: red; */
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

p {
  line-height: normal;
}

.text-box {
  /* // background-color: #3498db; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20upx;
}

.type-text {
  font-size: 15px;
}
</style>