<template>
  <div>
    <div v-if="item.path != '/:pathMatch(.*)*'" :style="{ paddingLeft: level > 0 ? menuChildLeft() : undefined }"
      :class="{ 'menuFather': true, 'selected': item.name === userStore.ZJAsideMenuNameSelect }"
      @click="toggleChildMenu(item.name, props.index, item.path)">
      <div class="menuFather-icon">
        <ZJSvgIcons :icon="item.meta.icon"></ZJSvgIcons>
        <Transition name="leftBar">
          <a v-if="userStore.isSideBarOpen">{{ item.name }}</a>
        </Transition>
        <!-- <ZJSvgIcons :icon="item.meta.icon" v-if="level < 1"></ZJSvgIcons>
        <Transition name="leftBar">
          <a v-if="userStore.isSideBarOpen" :style="{ 'margin-left': level > 1 ? '60px' : '60px' }">{{ item.name }}</a>
        </Transition> -->
      </div>
      <ZJSvgIcons :class="{ 'ZJRotate-icon-open': isChildMenuOpen, 'ZJRotate-icon-close': !isChildMenuOpen }"
        icon="select" v-if="item.children && item.children.length && userStore.isSideBarOpen" />
    </div>

    <transition name="fade">
      <div ref="childMenuBoxElement" class="menuChildBox"
        :style="{ height: isChildMenuOpen && userStore.isSideBarOpen ? `${childMenuHeight}px` : '0' }">
        <AsideMenuItem v-for="(child, childIndex) in item.children" :key="childIndex" :item="child" :level="level + 1"
          :index="childIndex" @updateHeight="updateHeight" />
      </div>
    </transition>

    <!-- 左侧导航栏弹窗卡片 -->
    <!-- <div v-if="userStore.isSideBarOpen==false && userStore.ZJAsideMenuNameSelect==item.name && isChildMenuCardOpen"
      class="menuChildCard ZJMenu"
      >
      <Transition name="select">
      <AsideMenuItemCard
        :item="item"
        :clickSelectedIndex="toggleChildMenu"
        :index="index"
        :level="0"
        @closeAsideMenuCard="closeAsideMenuCard"
      />
      </Transition>
    </div> -->
  </div>
</template>

<script setup>

import { useUserStore } from '@/store';
import router from '@/router';
import AsideMenuItemCard from './asideMenuItemCard.vue';

const userStore = useUserStore();
const emits = defineEmits(['updateHeight']);

const props = defineProps({
  item: {
    type: Object,
  },
  selectedIndex: {
    type: String,
  },
  clickSelectedIndex: {
    type: Function
  },
  level: {
    type: Number,
    default: 0
  },
  index: {
    type: Number,
    default: 0
  }
});

const isChildMenuOpen = ref(false);
const isChildMenuCardOpen = ref(false);
const childMenuBoxElement = ref(null);
const childMenuHeight = ref(0);

const menuChildLeft = () => `${props.level * 20 + 12}px`;

function updateHeight(val, type) {
  // console.log(val,type)
  emits('updateHeight', val, type);
  if (type) {
    childMenuHeight.value = childMenuHeight.value + val;
  } else {
    childMenuHeight.value = childMenuHeight.value - val;
  }
}

function toggleChildMenu(name, index, path) {

  if (path != '') {
    userStore.ZJAsideMenuNameSelect = name;
    userStore.ZJAsideMenuSelectPath = path;
  }

  if (userStore.ZJAsideMenuNameSelect != name) {
    childMenuHeight.value = 0;
  } else {
    if (userStore.isSideBarOpen == true && childMenuBoxElement.value) {
      childMenuHeight.value = childMenuBoxElement.value.scrollHeight;
    }
  }


  isChildMenuOpen.value = !isChildMenuOpen.value;

  if (props.level == 0) {
    useUserStore.ZJAsideMenuCardNameIndex = index;
  }

  if (userStore.isSideBarOpen == false) {
    isChildMenuCardOpen.value = !isChildMenuCardOpen.value;
  }

  childMenuHeight.value = childMenuBoxElement.value.scrollHeight;
  if (isChildMenuOpen.value) {
    setTimeout(() => {
      if (childMenuBoxElement.value) {
        emits('updateHeight', childMenuHeight.value, true);
      }
    }, 0);
  } else {
    emits('updateHeight', childMenuHeight.value, false);
  }

  if (path) {
    router.push(`${path}`);
  }
  // console.log('isChildMenuCardOpen.value',isChildMenuCardOpen.value)
  // console.log('name',name,selectBarName);
  // console.log('index',index);
  // console.log('path',path);
  // console.log('selectedIndex',selectBarName);
  // console.log('ifChildMenuOpen',ifChildMenuOpen.value);
  // console.log('childMenuHeight',childMenuHeight.value);
  // console.log('childMenuBoxElement',childMenuBoxElement.value);
  // console.log('ZJAsideMenuChildOpen',userStore.ZJAsideMenuChildOpen)
}

onMounted(() => {
  if (childMenuBoxElement.value) {
    childMenuHeight.value = childMenuBoxElement.value.scrollHeight;
  }
});

onUnmounted(() => {
  childMenuHeight.value = 0;
});

function closeAsideMenuCard() {
  isChildMenuCardOpen.value = false;
  // console.log('5555')
}
</script>

<style scoped>
.ZJSlider {
  width: var(--ZJ-AsideMenu-width);
  background-color: var(--ZJ-AsideMenu-bg);
  box-shadow: 2px 0 8px 0 rgb(29, 35, 41, 0.05);
  color: var(--ZJ-AsideMenu-text-color);
  transition: width 0.3s ease-in-out;
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
  transition: var(--ZJ-main-transition);
}

.menuFather:hover {
  background-color: var(--ZJ-AsideMenu-hover2);
  color: var(--ZJ-default-main);
}

.menuFather:active {
  background-color: var(--ZJ-AsideMenu-hover);
  color: var(--ZJ-default-main);
}

.menuFather-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  /* background-color: aquamarine; */
  overflow: hidden;
}

.selected,
.selected a,
.selected:hover {
  transition: var(--ZJ-main-transition);
  background-color: var(--ZJ-AsideMenu-hover);
  color: var(--ZJ-default-main);
}

.menuChildBox {
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  /* 平滑过渡 */
}

.menuChildCard {
  z-index: 10;
  position: absolute;
  margin-left: 56px;
  margin-top: -43px;
  /* box-shadow:var(--ZJ-main-box-shadow);
  border-radius:5px; */
}
</style>
