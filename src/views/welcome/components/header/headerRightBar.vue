<template>
  <Transition name="Select">
    <div class="HeaderBar">
      <div v-for="(i, index) in topMore" :key="index" @click="handleWelcomeBar(index)">
        <div class="HeaderBarLi">
          <a>{{ i.text }}</a>
        </div>
        <hr class="HeaderBarHr" :class="{ 'HeaderBarHrLast': index === topMore.length - 1 }">
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store';
const userStore = useUserStore()

const ZJUI_VERSION = import.meta.env.VITE_ZJUI_VERSION;

const topMore = ref(
  [
  {
    text: ZJUI_VERSION,
  },  
  {
    text: '当前是ZJ-UI文档',
  },
  {
    text: '指引',
  },
  {
    text: '配置',
  },
  {
    text: '相关链接',
  },
])

const handleWelcomeBar = (index) => {
  if(index>=0){
    userStore.layout.showWelcome = false;
  }
}

</script>

<style scoped>
.HeaderBar {
  background-color: var(--ZJ-main-message-color);
  box-shadow: var(--ZJ-main-box-shadow);
  padding: 2px 4px;
  border-radius:8px;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.HeaderBarHr {
  border: none;
  margin: 0 10px;
  border-bottom: 1px solid var(--ZJ-main-hover);
}

.HeaderBarHrLast {
  display: none;
}

.HeaderBarLi {
  display: flex;
  align-items: center;
  margin: 4px 0px;
  padding: 0 5px;
  word-break: normal;
  transition: all 0.2s ease-in-out;
  border-radius: 5px;
  color: var(--ZJ-main-text-color);
  cursor: pointer;
}

.HeaderBarLi:hover {
  background-color: var(--ZJ-main-hover);
}

.HeaderBarLi>.img {
  margin-left: 5px;
  height: 22px;
  width: 22px;
}

.HeaderBarLi:hover>.img {
  animation: bar 0.5s ease-in;
}

@keyframes bar {
  0% {
    transform: scale(1);
  }

  30% {
    transform: scale(1.2);
  }

  60% {
    transform: scale(1.05);
  }

  80% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.HeaderBarLi a {
  /* margin:10px 5px 10px 5px; */
  margin: 5px;
  font-family: AlibabaPuHuiTi;
  font-size: 14px;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  font-feature-settings: "kern" on;
  cursor: pointer;
}
</style>