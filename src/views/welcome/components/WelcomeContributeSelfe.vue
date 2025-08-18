<template>
  <div class="welcome-contributors">
    <div class="welcome-contributors-title">{{ t('welcome.contribute.t1') }}</div>
    <div class="welcome-body m-flex-col m-gap-15">
      <div class="welcome-body-box" v-for="(i, index) in welcomeData" :key="index">
        <img :src="i.icon" alt="">
        <span>{{ i.contributor }}</span>
        <span>{{ t('welcome.contribute-selfe.t2') }}{{ i.price }}元</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const welcomeData = ref([
  {
    icon: 'https://img.keaitupian.cn/newupload/11/1668419337598639.jpg',
    contributor: 'Alexandr',
    price: '15'
  },
  {
    icon: 'https://ts1.tc.mm.bing.net/th/id/R-C.8da91130f80ff6e4a322e6032ed55e14?rik=oUp77AwHJLrhxA&riu=http%3a%2f%2fpic.imeitou.com%2fuploads%2fallimg%2f240327%2f10-24032G60315.jpg&ehk=SFKJJ6SHEvG0ZDz8nswrimvaX2CJlasFFX8r1sGOlFA%3d&risl=&pid=ImgRaw&r=0',
    contributor: '快乐小土豆',
    price: '2'
  },
  {
    icon: 'https://ts4.tc.mm.bing.net/th/id/OIP-C.eEhSO2ig4TvsZEbt29ta0wAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    contributor: '像风又像雨',
    price: '66'
  },
  {
    icon: 'https://www.keaitupian.cn/cjpic/frombd/2/253/3438104899/1340860520.jpg',
    contributor: '车友车行',
    price: '5'
  },
  {
    icon: 'https://www.keaitupian.cn/cjpic/frombd/0/253/3679842399/4020641040.jpg',
    contributor: '萝卜和白菜',
    price: '0.99'
  },
])
</script>

<style scoped>
.welcome-contributors {
  max-width: 1200px;
  min-width: auto;
  padding: 0 32px;
  width: 100%;
  box-sizing: border-box;
  /* background-color: hsl(316, 35%, 88%); */
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.welcome-contributors-title {
  margin-bottom: 80px;
  color: var(--ZJ-main-text-color);
}

.welcome-body {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.welcome-body-box {
  background-color: var(--ZJ-main-bg-color);
  border-radius: var(--ZJ-main-border-radius-10);
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
}

.welcome-body-box:hover {
  background-color: var(--ZJ-AsideMenu-hover);
  transition: var(--ZJ-main-transition);
}

.welcome-body-box img {
  height: 40px;
  width: 40px;
  border-radius: 10px;
}

.welcome-body-box span {
  font-size: 14px;
  font-weight: 500;
  color: var(--ZJ-main-text-label-color);
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
</style>

