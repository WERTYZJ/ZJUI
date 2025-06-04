<template>
  <div class="ZJSlider">
    <ZJLogo></ZJLogo>
    <div class="menuMain" ref="ZJSlider">
      <AsideMenuItem v-for="(item, index) in menu" :key="index" :item="item" :clickSelectedIndex="clickSelectedIndex"
        :index="index" />
    </div>
    <AsideMenuWeather></AsideMenuWeather>
  </div>
</template>

<script setup name="ZJAsideMenu">

import router from '@/router';
import ZJLogo from './components/asideTopLogo.vue';
import { useUserStore } from '@/store';
import AsideMenuItem from './components/asideMenuItem.vue';
import AsideMenuWeather from './components/asideMenuWeather.vue';


const userStore = useUserStore();
const menu = ref([])

// ❌ 错误写法：router 是自定义实例，不通过自动导入
// const router = useRouter()
// menu.value = router.options.routes // 如果未挂载实例，此处会报错

// 使用计算属性或onMounted来生成menu数据
onMounted(() => {
  menu.value = router.options.routes
  // console.log(router.options.routes)
});


const selectedIndex = ref('home');
const showChildMenu = ref(0);
const ifChildMenuOpen = ref(false);
// const childMenuHeight = ref(0);
// const childMenuBoxElement = ref(null);

function clickSelectedIndex(name, index, path) {

  // let childMenu
  // if(userStore.isSideBarOpen==true){
  //   childMenu = childMenuBoxElement.value[index];
  // }

  if (selectedIndex.value == name) {
    showChildMenu.value = null;
    selectedIndex.value = null;
    ifChildMenuOpen.value = false;
    // childMenuHeight.value = 0;
  } else {
    selectedIndex.value = name;
    showChildMenu.value = index;
    ifChildMenuOpen.value = true;
    // if(userStore.isSideBarOpen==true){
    //   childMenuHeight.value = childMenu.scrollHeight;
    // }
  }
  if (path) {
    router.push(`${path}`)
  }
}

// 点击sidebar以外隐藏menuChildBox2
const ZJSlider = ref(null);

function handleClickOutside(event) {
  if (ZJSlider.value && !ZJSlider.value.contains(event.target)) {
    if (userStore.isSideBarOpen == false) {
      showChildMenu.value = null;
    }
  }
}

onMounted(() => {
  router.push(`/${selectedIndex.value}`)
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

watch(() => userStore.isSideBarOpen, (newVal) => {
  if (newVal == false) {
    ifChildMenuOpen.value = false;
    // childMenuHeight.value = 0;
  }
  // console.log(newVal)
})

</script>

<style scoped>
.ZJSlider {
  width: var(--ZJ-AsideMenu-width);
  background-color: var(--ZJ-AsideMenu-bg);
  box-shadow: 2px 0 8px 2px rgb(29, 35, 41, 0.05);
  color: var(--ZJ-AsideMenu-text-color);
  transition: var(--ZJ-main-transition-width);
  z-index: 2;
  flex-shrink: 0;
  overflow: hidden;
}

a {
  font-size: 14px;
  line-height: normal;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
}

.menuMain {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 56px - 140px);
}

.menuMain::-webkit-scrollbar {
  width: 0px;
}

.menuMain::-webkit-scrollbar-thumb {
  width: 0px;
}

.menuFather {
  font-size: 16px;
  padding: 10px 12px;
  margin: 2px 6px;
  border-radius: 4px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.menuFather:hover {
  background-color: var(--ZJ-main-hover);
}

.menuFather-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  /* background-color: aquamarine; */
}

.selected,
.selected a,
.selected:hover {
  background-color: var(--ZJ-default-main-hover);
  color: var(--ZJ-default-main);
}

.menuMainBox {
  width: 100%;
}

.menuChildBox {
  overflow: hidden;
  /* 防止内容溢出 */
  transition: height 0.3s ease-in-out;
  /* 平滑过渡 */
}

.menuChild {
  padding-left: 30px;
}

.menuChildCard {
  z-index: 10;
  position: absolute;
  margin-left: 56px;
  margin-top: -43px;
}
</style>
