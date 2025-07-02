<template>
  <Transition name="Select">
    <div class="HeaderBar">
      <div v-for="(item, index) in topMore" :key="index" @click="HeaderTopBar(item.type)">
        <div class="HeaderBarLi">
          <ZJSvgIcons class="img" :icon="item.img"></ZJSvgIcons>
          <a>{{ item.name }}</a>
        </div>
        <hr class="HeaderBarHr" :class="{ 'HeaderBarHrLast': index === topMore.length - 1 }">
      </div>
    </div>
  </Transition>
</template>

<script setup>

import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../../store';

const router = useRouter();
const { t } = useI18n();
const { appContext } = getCurrentInstance();
const $ZJMessage = appContext.config.globalProperties.$ZJMessage;
const userStore = useUserStore();

const topMore = ref(
  [
    {
      img: 'personalCenter',
      name: '个人中心',
      type: 'Account',
    },
    {
      img: 'logout',
      name: '登出',
      type: 'Logout',
    },
  ])
// 头部下拉框
function HeaderTopBar(val) {
  if (val == 'Account') {
    router.push('/info')
  } else if (val == 'Logout') {
    userStore.userData = {};
    userStore.routerList = [];
    $ZJMessage({
      type: 'success',
      message: t('info.login.loginOut'),
      duration: 3000,
    });
  }
}
</script>

<style scoped>
.HeaderBar {
  background-color: var(--ZJ-main-message-color);
  box-shadow: var(--ZJ-main-box-shadow);
  padding: 0 4px;
  border-radius: 5px;
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
}
</style>