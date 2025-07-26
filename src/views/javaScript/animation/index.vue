<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>animation(动画效果)</h2>
      </template>
      <p>1.1 css动画</p>
      <ZJCard>
        <div class="ani-box">
          <div v-if="showCardContent" class="ani-card" :class="selectedAnimation"></div>
        </div>
        <template #card-footer>
          <div class="ani-btn">
            <ZJButton v-for="(i, index) in animations" :key="index" type="default" :text="i.name"
              @click="selectAnimation(i.value)"></ZJButton>
          </div>
        </template>
      </ZJCard>
      <ZJCodeDisplay :code="vueCode" language="vue" />
      <p>1.2 js点赞动画 使用到第三方库@mojs/core</p>
      <ZJCard>
        <anHeart></anHeart>
      </ZJCard>
    </ZJMain>
  </div>
</template>

<script setup>

import anHeart from '../animation/components/heart.vue'

const showCardContent = ref(true);
const selectedAnimation = ref('a');

const animations = ref([
  { name: '弹跳', value: 'ani-1', },
  { name: '弹跳2', value: 'ani-2', },
  { name: 'photo图片动画', value: 'photo', },
  { name: 'photo阴影遮罩动画', value: 'mask', },
  { name: 'file文件上传动画', value: 'file', },
  { name: 'select下拉框', value: 'Select', },
  { name: '路由跳转动画router3', value: 'fade', },
  { name: 'message消息框动画', value: 'message', },
  { name: 'HeaderBar动画', value: 'c', },
  { name: '从右往左平滑过渡300px', value: 'showTopMore', },
  { name: '左侧导航栏', value: 'leftBar', },
  { name: '右侧设置遮罩层动画', value: 'showSetmask', },
  { name: '右侧设置菜单动画', value: 'showSetRight', },
  { name: 'search搜索框动画', value: 'showSetSearch', },
]);


const selectAnimation = (anim) => {
  selectedAnimation.value = anim;
  showCardContent.value = false;
  setTimeout(() => {
    showCardContent.value = true;
  }, 50);
};

const vueCode = ref('内容')
</script>

<style scoped>
.ani-box {
  height: 100px;
  width: 100px;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--ZJ-default-main-hover);
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

.ani-1 {
  animation: bounce-in 0.7s;
}

.ani-2 {
  animation: bounce-in 0.7s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
