<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>Game</h2>
      </template>
      <div class="game-box" id="gameID">
        <div class="move-box run" id="moveID"></div>
        <div class="random-box" id="barID"></div>
        <div class="count-box" id="countID" v-show="showCountNumber">{{ countNumber }}</div>
      </div>
      <div class="game-tools">
        <ZJButton type="error" text="重新开始游戏" @click="startGame"></ZJButton>
        <ZJButton type="default" :text="scores"></ZJButton>
      </div>
    </ZJMain>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';

// 小球位置
const xh = ref(0);
const yh = ref(0);
// 小球速度
const speedX = ref(3); // X轴速度
const speedY = ref(3); // Y轴速度

let barSpead = 40;
let gameBoxWidth = 40;
let gameBoxHeight = 40;

// 动画ID
let animationId = null;
const gameStates = ref(true);

// 碰撞检测标记
let isColliding = false;
let lastCollisionY = 0;

// 得分
const score = ref(0);
const scores = computed(() => `得分:${score.value}`);

const barXh = ref();
const barBoxWidth = 100;
const barBoxHeight = 15;

// 开始自由运动
const startFreeMovement = () => {
  const gameBox = document.getElementById('gameID');
  const moveBox = document.getElementById('moveID');
  const countBox = document.getElementById('countID');
  const barBox = document.getElementById('barID');
  // 获取容器尺寸
  const containerWidth = gameBox.offsetWidth;
  const containerHeight = gameBox.offsetHeight;

  const move = () => {
    // 更新位置
    xh.value += speedX.value;
    yh.value += speedY.value;

    // 检测碰撞 - 左右墙壁
    if (xh.value <= 0) {
      xh.value = 0;
      speedX.value = Math.abs(speedX.value); // 反弹
    } else if (xh.value >= containerHeight - gameBoxHeight) {
      countBox.classList.add('stopAnimation');
      countNumber.value = '游戏结束!';
      showCountNumber.value = true;
      gameStates.value = false
      stopFreeMovement();
    }

    // 检测碰撞 - 上下墙壁
    if (yh.value <= 0) {
      yh.value = 0;
      speedY.value = Math.abs(speedY.value); // 反弹
    } else if (yh.value >= containerWidth - gameBoxWidth) {
      yh.value = containerWidth - gameBoxWidth;
      speedY.value = -Math.abs(speedY.value); // 反弹
    }

    // 应用新位置
    moveBox.style.transform = `translate(${yh.value}px, ${xh.value}px)`;

    // 继续动画
    if (gameStates.value) {
      animationId = requestAnimationFrame(move);
    }

    // 检测与绿色小球的碰撞
    getScores();
  };

  const getScores = () => {

    // 获取元素的位置  
    const moveRect = moveBox.getBoundingClientRect();
    const barRect = barBox.getBoundingClientRect();

    // 判断是否重叠  
    const isOverlap = !(
      moveRect.right < barRect.left ||
      moveRect.left > barRect.right ||
      moveRect.bottom < barRect.top ||
      moveRect.top > barRect.bottom
    );

    if (isOverlap) {
      // 检查是否是新的碰撞
      if (!isColliding) {
        score.value += 10;
        speedX.value = -Math.abs(speedX.value) * (0.8 + Math.random() * 0.4);
        isColliding = true;
        lastCollisionY = xh.value;
      }
    } else {
      // 当小球离开挡板一定距离后重置碰撞标记
      if (isColliding && Math.abs(xh.value - lastCollisionY) > 10) {
        isColliding = false;
      }
    }
  };

  // 启动动画
  animationId = requestAnimationFrame(move);
};

// 停止自由运动
const stopFreeMovement = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
};


const clickKeyBoard = (e) => {
  const gameBox = document.getElementById('gameID');
  const bW = gameBox.offsetWidth;
  const key = e.key.toLowerCase();
  const moveBox = document.getElementById('barID');
  barXh.value = moveBox.offsetLeft;

  if (key == 'd') {
    if (barXh.value < bW - barBoxWidth) {
      if ((bW - barBoxWidth - barXh.value) < barSpead) {
        barXh.value = barXh.value + (bW - barBoxWidth - barXh.value);
      } else {
        barXh.value = barXh.value + barSpead;
      }
    }
  }
  if (key == 'a') {
    if (barXh.value > 0 && barXh.value < barSpead) {
      barXh.value = 0;
    } else if (barXh.value > 0) {
      barXh.value = barXh.value - barSpead;
    }
  }
  moveBox.style.left = `${barXh.value}px`;
};

const countNumber = ref();
const showCountNumber = ref(false);
const startCountEl = ref(null);
const startGame = () => {
  if (startCountEl.value) {
    return;
  }

  // 重置游戏
  const countBox = document.getElementById('countID')
  countBox.classList.remove('stopAnimation');
  gameStates.value = true;
  stopFreeMovement();
  score.value = 0;
  xh.value = 0;
  yh.value = 0;
  speedX.value = 3;
  speedY.value = 3;

  // 重置小球位置
  const moveBox = document.getElementById('moveID');
  moveBox.style.transform = `translate(0px, 0px)`;

  countNumber.value = 3;
  showCountNumber.value = true;

  const startCount = () => {
    if (countNumber.value > 0) {
      countNumber.value--;
    }
    if (countNumber.value == 0) {
      setTimeout(() => {
        showCountNumber.value = false;
        clearInterval(startCountEl.value);
        startCountEl.value = null;

        // 开始自由运动
        startFreeMovement();
      }, 1000)
    }
  }

  startCountEl.value = setInterval(startCount, 1000);
}

onMounted(() => {
  document.addEventListener('keydown', clickKeyBoard);
})

onUnmounted(() => {
  document.removeEventListener('keydown', clickKeyBoard);
  stopFreeMovement();
  if (startCountEl.value) {
    clearInterval(startCountEl.value);
  }
})
</script>

<style scoped>
.game-box {
  width: 100%;
  height: 500px;
  background-color: var(--ZJ-main-hover);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  /* 防止小球超出容器 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.move-box {
  /* background-image: url('./static/images/moveRole/cat.png'); */
  background-color: red;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  background-size: cover;
  transition: transform 0.1s linear;
  /* 平滑移动效果 */
}

.random-box {
  background-color: #00ff55;
  height: 15px;
  width: 100px;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  bottom: 50px;
}

.game-tools {
  display: flex;
  margin-top: 15px;
  gap: 15px;
}

.count-box {
  font-size: 3em;
  font-weight: bold;
  animation: ani-water2 1s ease-in-out infinite;
}

.stopAnimation {
  animation-play-state: paused;
}

@keyframes ani-water2 {
  0% {
    transform: scale(1.0);
  }

  50% {
    opacity: 1.0;
  }

  100% {
    opacity: 0.2;
    transform: scale(2.0);
  }
}
</style>