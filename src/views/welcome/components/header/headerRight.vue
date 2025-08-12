<template>
  <div class="m-flex m-gap-20 m-col-center">
    <div v-for="(i, index) in rightBar" :key="index" class="m-flex title hide" @click="handleRightBar(index)">
      <span class="m-pointer">{{ i.text }}</span>
    </div>
    <div class="m-flex title left-hid" @click="handleRightBar(rightBar.length)">
      <span class="m-pointer" ref="headerBarEl">{{ rightBar[rightBar.length - 1].text }}</span>
      <headerRightBar v-show="showHeaderRightBar" class="headerBarElPosition"></headerRightBar>
    </div>
    <hr>
    <brightMode></brightMode>
    <hr>
    <language></language>
    <hr class="hide">
    <div v-for="(i, index) in rightIcon" :key="index" class="m-flex title hide" @click="handleRightIcon(index)">
      <ZJSvgIcons :icon="i.icon" style="height: 25px;width: 25px;"></ZJSvgIcons>
    </div>
  </div>
</template>

<script setup>

import language from '@/layout/components/ZJHeader/components/language.vue';
import brightMode from '@/layout/components/ZJHeader/components/brightMode.vue';
import { useUserStore } from '@/store';
import headerRightBar from '@/views/welcome/components/header/headerRightBar.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const userStore = useUserStore()
const { appContext } = getCurrentInstance();
const $ZJMessage = appContext.config.globalProperties.$ZJMessage;

const rightBar = computed(() => {
  return [
    {
      text: t('welcome.header.menu.guide'),
    },
    {
      text: t('welcome.header.menu.config'),
    },
    {
      text: t('welcome.header.menu.links'),
    },
    {
      text: t('welcome.header.menu.version'),
    },
  ]
})

const handleRightBar = (index) => {
  if (index >= 0 && index != rightBar.value.length) {
    userStore.layout.showWelcome = false;
  }
  if (index == rightBar.value.length) {
    showHeaderRightBar.value = !showHeaderRightBar.value
  }
}

const rightIcon = ref([
  {
    // text: 'Twitter',
    icon: 'Twitter',
  },
  {
    // text: 'Gitee',
    icon: 'Gitee',
  },
  {
    // text: 'GitHub',
    icon: 'GitHub',
  },
])

const handleRightIcon = (index) => {
  if (index == 0) {
    $ZJMessage({
      type: 'warning',
      message: '目前只有Gitee和GitHub仓库哟！',
    });
    // setTimeout(()=>{
    //   $ZJMessage({
    //     type: 'warning',
    //     message: '正在跳转Gitee',
    //   })
    //   setTimeout(() => {
    //     window.open('https://gitee.com/WERTYUZJ/zjui.git', '_blank');
    //   }, 1000);
    // },2000)
  }
  if (index == 1) {
    window.open('https://gitee.com/WERTYUZJ/zjui.git', '_blank');
  }
  if (index == 2) {
    window.open('https://github.com/WERTYZJ/ZJUI', '_blank');
  }
}

const showHeaderRightBar = ref(false)
const headerBarEl = ref(null)

// 监听全局点击事件
function handleClickOutside(event) {
  if (headerBarEl.value && !headerBarEl.value.contains(event.target)) {
    showHeaderRightBar.value = false;
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
.title {
  font-size: 15px;
  color: var(--ZJ-main-text-color);
  cursor: pointer;
  /* background-color: aqua; */
}

.title:hover {
  color: var(--ZJ-default-main);
}

hr {
  border: none;
  height: 25px;
  width: 2px;
  background-color: var(--ZJ-main-hover);
  flex-shrink: 0;
}

.headerBarElPosition {
  position: absolute;
  top: 50px;
}

.left-hid {
  display: none;
}

@media (max-width:920px) {
  .hide {
    display: none;
  }

  .left-hid {
    display: block;
  }
}</style>

