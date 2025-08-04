<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>animation(动画效果)</h2>
      </template>
      <p>1.1 css动画</p>
      <ZJCard style="padding: 10px;">
        <div class="ani-box">
          <div v-if="showCardContent" :class="selectedAnimation"></div>
        </div>
        <template #card-footer>
          <div class="ani-btn">
            <ZJButton v-for="(i, index) in animations" :key="index" type="default" :text="i.name"
              @click="selectAnimation(i.value)"></ZJButton>
          </div>
        </template>
      </ZJCard>
      <ZJCodeDisplay :code="vueCode" language="vue" hideText />
      <p>1.2 js点赞动画 使用到第三方库@mojs/core</p>
      <ZJCard style="padding: 10px;">
        <anHeart></anHeart>
      </ZJCard>
      <ZJCodeDisplay :code="anHeartCode" language="vue" hideText />
    </ZJMain>
  </div>
</template>

<script setup>

import anHeart from '../animation/components/heart.vue'

const showCardContent = ref(true);
const selectedAnimation = ref('a');

const animations = ref([
  { name: '弹跳 ani-1', value: 'ani-1 ani-card', },
  { name: '弹跳 ani-2', value: 'ani-2 ani-card', },
  { name: '水纹波动动画 ani-water', value: 'ani-water', },
  { name: '扩散波纹带底色动画 ani-water2', value: 'ani-water2', },
  { name: '加载动画 loader', value: 'loader', },
  { name: '加载动画 loader-line', value: 'loader-line', },
]);


const selectAnimation = (anim) => {
  selectedAnimation.value = anim;
  showCardContent.value = false;
  setTimeout(() => {
    showCardContent.value = true;
  }, 50);
};

const vueCode = ref('');
const anHeartCode = ref('');

const initFiles = () => {
  // 使用动态导入，并添加raw查询参数
  import('./css/animation.css?raw')
    .then(res => {
      vueCode.value = res.default;
    })
    .catch(error => {
      console.error('Failed to load CSS file:', error);
      vueCode.value = '/* 加载CSS文件失败 */';
    });
  import('./components/heart.vue?raw')
    .then(res => {
      anHeartCode.value = res.default;
    })
    .catch(error => {
      console.error('Failed to load CSS file:', error);
      anHeartCode.value = '/* 加载VUE文件失败 */';
    });
};

onMounted(() => {
  initFiles();
  selectAnimation('ani-1 ani-card');
})

</script>

<style scoped>
@import './css/animation.css';

.ani-box {
  height: 140px;
  width: 140px;
  padding: 10px;
  border-radius: 10px;
  /* background-color: #f8f8f8; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.ani-card {
  height: 100px;
  width: 100px;
  border-radius: 10px;
  background-color: var(--ZJ-default-main-hover2);
}

.ani-btn {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
