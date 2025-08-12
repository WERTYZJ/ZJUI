<template>
  <div class="welcome-main">
    <div class="m-flex m-row-between main">
      <div class="w-left m-flex-col">
        <p class="text">{{ t('welcome.main.t1') }}</p>
        <p class="text2">{{ t('welcome.main.t2') }}</p>
        <div class="m-flex m-gap-10 m-flex-center" style="margin-top: 15px;">
          <span class="text3">{{ t('welcome.main.t3') }}</span>
          <span class="text-v">{{ ZJUI_VERSION }}</span>
        </div>
        <div class="m-flex m-gap-15 w-button" style="margin-top: 20px;">
          <ZJButton @click="open('goHome')" type="default" :text="t('welcome.main.b1')"
            style="border-radius:20px;padding: 20px;cursor: pointer;" icon="right" iconRight>
          </ZJButton>
          <ZJButton @click="open('goGitee')" type="info" :text="t('welcome.main.b2')"
            style="border-radius:20px;padding: 20px;"></ZJButton>
          <ZJButton @click="open('goGitHub')" type="success" :text="t('welcome.main.b3')"
            style="border-radius:20px;padding: 20px;"></ZJButton>
        </div>
      </div>
      <div class="w-right">
        <div class="w-right-bg"></div>
        <img class="w-right-img" src="@/assets/images/logo/w-logo-bg.svg" alt="">
      </div>
    </div>
    <div class="welcome-body m-flex-col m-gap-20">
      <div class="welcome-body-box" v-for="(i, index) in welcomeData" :key="index">
        <ZJSvgIcons :icon="i.icon" class="welcome-body-box-icon"
          style="background-color:var(--ZJ-main-hover);padding:5px;border-radius:5px;height: 25px;width: 25px;">
        </ZJSvgIcons>
        <p>{{ i.title }}</p>
        <span>{{ i.content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store';
import { useI18n } from 'vue-i18n';
const { t, tm } = useI18n();
const userStore = useUserStore();

const ZJUI_VERSION = import.meta.env.VITE_ZJUI_VERSION;

const welcomeData = computed(() => {
  const items = tm('welcome.main.items')

  return items.map((item, index) => ({
    icon: ['VueIcon', 'ViteIcon', 'Pinia', 'I18n', 'HeightLight', 'Expand'][index],
    title: item.title,
    content: item.content
  }))
})

const open = (val) => {
  switch (val) {
    case 'goHome':
      userStore.layout.showWelcome = false;
      break;
    case 'goGitee':
      window.open('https://gitee.com/WERTYUZJ/zjui.git', '_blank');
      break;
    case 'goGitHub':
      window.open('https://github.com/WERTYZJ/ZJUI', '_blank');
      break;
  }
}

</script>

<style scoped>
.welcome-main {
  margin-top: 44px;
  max-width: 1200px;
  min-width: auto;
  padding: 0 32px;
  width: 100%;
  box-sizing: border-box;
  /* background-color: hsl(316, 35%, 88%); */
  flex-shrink: 0;
}

.text {
  background: var(--ZJ-welcome-name-background);
  -webkit-text-fill-color: var(--ZJ-welcome-name-color);
  -webkit-background-clip: text;
  background-clip: text;
  line-height: 64px;
  font-size: 56px;
  width: fit-content;
}

.text2 {
  color: var(--ZJ-main-text-color);
  line-height: 64px;
  font-size: 56px;
  font-weight: bold;
}

.text3 {
  color: var(--ZJ-main-text-label-color);
  font-size: 24px;
}

.text-v {
  background-color: var(--ZJ-info-light);
  padding: 4px 10px;
  border-radius: 10px;
  color: var(--ZJ-main-bg-color);
  font-weight: bold;
  font-size: 14px;
}

.w-right {
  position: relative;
  z-index: -1;
}

.w-right-bg {
  height: 350px;
  width: 350px;
  background: var(--ZJ-welcome-image-background-image);
  filter: var(--ZJ-welcome-image-filter);
  border-radius: 50%;
}

.w-right-img {
  height: 350px;
  width: 350px;
  position: absolute;
  top: 0;
  left: 0;
}

.welcome-body {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.welcome-body-box {
  background-color: var(--ZJ-main-bg-color);
  border-radius: 15px;
  padding: 24px;
}

.welcome-body-box p {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  color: var(--ZJ-main-text-color);
  margin: 20px 0 8px 0;
}

.welcome-body-box span {
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ZJ-main-text-label-color);
}

@media (max-width:940px) {
  .text {
    display: none;
  }

  .text2 {
    font-size: 6vw;
  }

  .text3 {
    font-size: 3vw;
  }

  .w-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .main {
    flex-direction: column-reverse;
    padding-bottom: 30px;
  }

  .w-right-bg,
  .w-right-img {
    width: 35vw;
    height: 25vh;
  }
}

@media (max-width:890px) {
  .welcome-body {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width:600px) {
  .welcome-body {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width:550px) {
  .w-button {
    display: flex;
    flex-direction: column;
  }

  .w-right-bg,
  .w-right-img {
    display: none;
  }

  .main {
    padding: 40px 0;
  }
}
</style>

