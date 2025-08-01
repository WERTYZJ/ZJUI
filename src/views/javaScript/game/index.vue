<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>Game</h2>
      </template>
      <div class="game-box" id="gameID">
        <div class="move-box" id="moveID"></div>
        <div class="random-box" id="randomID"></div>
        <span class="count-box" v-show="showCountNumber">{{ countNumber }}</span>
      </div>
      <div class="game-tools">
        <ZJButton type="error" text="重新开始游戏" @click="startGame"></ZJButton>
        <ZJButton type="default" :text="scores"></ZJButton>
      </div>
    </ZJMain>
  </div>
</template>

<script setup>
onMounted(() => {
  document.addEventListener('keydown', clickKeyBoard);
  randomBoxFun();
})
const xh = ref(0);
const yh = ref(0);

let spead = 10;
let gameBoxWidth = 40;
let gameBoxHeight = 40;

const clickKeyBoard = (e) => {
  const gameBox = document.getElementById('gameID');
  const bH = gameBox.offsetHeight;
  const bW = gameBox.offsetWidth;
  // console.log("bh,bw", bH, bW)
  // console.log("点击", e)
  // console.log("点击键盘", e.key)
  // console.log("点击键盘", xh.value, yh.value)
  const key = e.key.toLowerCase();
  const moveBox = document.getElementById('moveID');
  if (key == 's') {
    if (xh.value <= (bH - gameBoxHeight - spead)) {
      xh.value = xh.value + spead;
    }
  }
  if (key == 'w') {
    if (xh.value > 0) {
      xh.value = xh.value - spead;
    }
  }
  if (key == 'd') {
    if (yh.value <= (bW - gameBoxWidth - spead)) {
      yh.value = yh.value + spead;
    }
    if ((bW - yh.value - gameBoxWidth) < spead) {
      yh.value = yh.value + (bW - yh.value - gameBoxWidth);
    }
  }
  if (key == 'a') {
    if (yh.value > 0 && yh.value > spead) {
      yh.value = yh.value - spead;
    } else {
      yh.value = 0;
    }
  }
  moveBox.style.transform = `translate(${yh.value}px, ${xh.value}px)`;
  getScores()
};

const randomXH = ref(0);
const randomYH = ref(0);
// 定义轮询的定时器 ID（用于后续清除）
let intervalId = ref(null);
const randomBoxFun = () => {
  // const poll = () => {
  const gameBox = document.getElementById('gameID');
  const bH = gameBox.offsetHeight;
  const bW = gameBox.offsetWidth;
  const randomBox = document.getElementById('randomID');
  const randomX = Math.floor(Math.random() * bH - gameBoxWidth);
  const randomY = Math.floor(Math.random() * bW - gameBoxHeight);
  if (randomX < gameBoxWidth) {
    randomXH.value = Math.floor(Math.random());
  } else {
    randomXH.value = randomX
  }
  if (randomY < gameBoxHeight) {
    randomYH.value = Math.floor(Math.random());
  } else {
    randomYH.value = randomY
  }
  randomBox.style.transform = `translate(${randomYH.value}px, ${randomXH.value}px)`;
  // }
  // intervalId.value = setInterval(poll, 3000);
}

const score = ref(0);
const scores = computed(() => `得分:${score.value}`);
const getScores = () => {
  const moveBox = document.getElementById('moveID');
  const randomBox = document.getElementById('randomID');

  // 获取元素的位置  
  const moveRect = moveBox.getBoundingClientRect();
  const randomRect = randomBox.getBoundingClientRect();

  // 判断是否重叠  
  const isOverlap = !(
    moveRect.right < randomRect.left ||
    moveRect.left > randomRect.right ||
    moveRect.bottom < randomRect.top ||
    moveRect.top > randomRect.bottom
  );

  if (isOverlap) {
    score.value += 10;
    // if (intervalId) clearInterval(intervalId);
    randomBoxFun();
  }
};

const countNumber = ref();
const showCountNumber = ref(false);
const startCountEl = ref(null);
const startGame = () => {
  if (startCountEl.value) {
    // clearInterval(startCountEl.value);
    // startCountEl.value = null;
    console.log("startCountEl.value", startCountEl.value)
    return
  }
  score.value = 0;
  countNumber.value = 4;
  const startCount = () => {
    if (countNumber.value > 0) {
      showCountNumber.value = true;
      countNumber.value--;
    }
    if (countNumber.value == 0) {
      // showCountNumber.value = true;
      // countNumber.value = '开始!!!'
      setTimeout(() => {
        showCountNumber.value = false;
        clearInterval(startCountEl.value);
        startCountEl.value = null;
      }, 1000)

    }
  }
  startCountEl.value = setInterval(startCount, 1000);
}

onUnmounted(() => {
  document.removeEventListener('keydown', clickKeyBoard);
})
</script>

<style scoped>
.game-box {
  width: 100%;
  height: 500px;
  background-color: var(--ZJ-main-hover);
  border-radius: 10px;
  position: relative;
}

.move-box {
  background-color: red;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  position: absolute;
}

.random-box {
  background-color: hsl(140, 100%, 50%);
  height: 40px;
  width: 40px;
  border-radius: 50%;
  position: absolute;
}

.game-tools {
  display: flex;
  margin-top: 15px;
  gap: 15px;
}

.count-box {
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  font-size: 100px;
  font-weight: bold;
  animation: ani-water2 1s ease-in-out infinite;
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