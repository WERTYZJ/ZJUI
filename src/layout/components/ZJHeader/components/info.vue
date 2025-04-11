<template>
  <div class="ZJHeaderInfoBox" @click="open('openInfoHeaderBar')" ref="ZJHeaderInfoBox">
    <a>{{ userName }}</a>
    <img :src="userAvatar" @error="avatarSrcError()" alt="">
    <infoHeaderBar v-show="showInfoHeaderBar" class="ZJHeaderBar"></infoHeaderBar>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import infoHeaderBar from './infoHeaderBar.vue';

const userName = ref('ZJUI-Admin');
const userAvatar = ref(require('@/assets/logo/logo.png'))
const showInfoHeaderBar = ref(false);

function open(action) {
  if (action == 'openInfoHeaderBar') {
    showInfoHeaderBar.value = !showInfoHeaderBar.value
  }
}
// 图片错误处理
function avatarSrcError() {
  this.UserAvatar = require('@/assets/error/Avatar.svg');
}

const ZJHeaderInfoBox = ref(null);
// 监听全局点击事件
function handleClickOutside(event) {
  if (ZJHeaderInfoBox.value && !ZJHeaderInfoBox.value.contains(event.target)) {
    showInfoHeaderBar.value = false;
  }
}
// 组件挂载后添加事件监听
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// 组件卸载前移除事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.ZJHeaderInfoBox {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  border-radius: 10px;
  padding: 0px 10px;
  margin-left: 10px;
  height: 40px;
}

.ZJHeaderInfoBox:hover {
  background-color: var(--ZJ-main-hover);
  transition: all 0.2s ease-in-out;
}

.ZJHeaderBar {
  position: absolute;
  top: 50px;
  right: 25px;
}

img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: relative;
}

a {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 900;
  text-align: right;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  margin-right: 10px;
  color: var(--ZJ-main-text-color);
}
</style>