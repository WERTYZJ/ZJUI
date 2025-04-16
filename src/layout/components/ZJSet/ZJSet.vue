<template>
  <div>
    <Transition name="mask">
      <div class="modal" v-show="userStore.layout.showSet" ref="setMaskEl"></div>
    </Transition>
    <transition name="showSetRight">
      <div class="user-main" v-show="userStore.layout.showSet" ref="setMainEl">
        <div class="header">
          <div class="header-l">主题配置</div>
          <div class="header-r" @click="close('closeRight')">
            <ZJSvgIcons icon="close"></ZJSvgIcons>
          </div>
        </div>

        <div class="user-more">
          <div class="title">
            <hr>
            <a>主题模式</a>
            <hr>
          </div>
          <div class="more-box">
            <li v-for="(i, index) in setData.setZhuTi" :key="index">{{ i.title }}
              <ZJSwitch :ZJSwitchVal="i.value" @ZJSwitchNewVal="acceptSwitchVal($event, index)">
              </ZJSwitch>
            </li>
          </div>
          <div class="title">
            <hr><a>布局模式</a>
            <hr>
          </div>
          <div class="more-box-buju">
            <!-- 左侧布局 -->
            <div :class="{ 'zuoce': true, 'zuoceOutline': bujuVal == 1 }" @click="ClickbujuVal(1)">
              <div class="zuoce-l"></div>
              <div class="zuoce-r">
                <div class="zuoce-r-t"></div>
                <div class="zuoce-r-b"></div>
              </div>
            </div>
            <!-- 2 -->
            <div :class="{ 'zuoce': true, 'zuoceOutline': bujuVal == 2 }" @click="ClickbujuVal(2)">
              <div class="zuoce2-l">
                <div class="zuoce2-l-l1"></div>
                <div class="zuoce2-l-l2"></div>
              </div>
              <div class="zuoce2-r">
                <div class="zuoce2-r-t"></div>
                <div class="zuoce2-r-b"></div>
              </div>
            </div>
            <!-- 3 -->
            <div :class="{ 'zuoce zuoce3': true, 'zuoceOutline': bujuVal == 3 }" @click="ClickbujuVal(3)">
              <div class="zuoce3-l"></div>
              <div class="zuoce3-r"></div>
            </div>
          </div>
          <div class="title">
            <hr>
            <a>主题颜色</a>
            <hr>
          </div>
        </div>

        <div class="footer">
          <ZJButton type="success" text="重置主题"></ZJButton>
          <ZJButton type="info" text="复制主题"></ZJButton>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '@/store';
const userStore = useUserStore();


const setData = ref({
  setZhuTi: [
    {
      title: "深色侧边栏",
      value: true,
    },
    {
      title: "灰色模式",
      value: false,
    },
    {
      title: "色弱模式",
      value: false,
    },
  ]
})

function close(action) {
  if (action === 'closeRight') {
    userStore.layout.showSet = false
  }
}

const setMainEl = ref(null);
const setMaskEl = ref(null);
onMounted(() => { document.addEventListener('click', closeRightAndMask); });
onUnmounted(() => { document.removeEventListener('click', closeRightAndMask) });

function closeRightAndMask(e) {
  const chatMainEl = setMainEl.value;
  const chatMaskEl = setMaskEl.value;

  const isOutside = !(chatMainEl === e.target)
  const isInMask = (chatMaskEl === e.target)

  if (isOutside && userStore.layout.showSet && isInMask) {
    close('closeRight')
  }
}
/**
 * 布局模式相关
 * 
 **/
const bujuVal = ref(null);
onMounted(() => {
  const currentValue = getComputedStyle(document.documentElement)
    .getPropertyValue('--ZJAsideMenu-width')
    .trim();
  switch (currentValue) {
    case '56px':
      bujuVal.value = 1;
      break;
    case '220px':
      bujuVal.value = 2;
      break;
  }
})
function ClickbujuVal(index) {
  bujuVal.value = index;
  switch (index) {
    case 1:
      clickBtn(1);
      break;
    case 2:
      clickBtn(2);
      break;
    default:
      return;
  }
}

function clickBtn(index) {
  // 获取当前 --ZJAsideMenu-width 的值
  const currentValue = getComputedStyle(document.documentElement)
    .getPropertyValue('--ZJAsideMenu-width')
    .trim();
  if (index == 1) {
    if (currentValue != '56px') {
      document.documentElement.style.setProperty('--ZJAsideMenu-width', '56px');
      userStore.isSideBarOpen = !userStore.isSideBarOpen;
    }
    return;
  }
  if (index == 2) {
    if (currentValue != '220px') {
      document.documentElement.style.setProperty('--ZJAsideMenu-width', '220px');
      userStore.isSideBarOpen = !userStore.isSideBarOpen;
    }
    return;
  }

}

function acceptSwitchVal(e, index) {
  console.log("开关的数值为", e)
  console.log("开关的数值index为", index)
}

</script>

<style scoped>
.more-box-buju {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.zuoce {
  border-radius: 5px;
  height: 46px;
  width: 74px;
  box-shadow: 0 1px 3px 0 var(--ZJ-main-set-box-shadow-color);
  padding: 6px;
  display: flex;
  gap: 6px;
  border: 2px solid transparent;
}

.zuoce:hover,
.zuoceOutline {
  border: 2px solid var(--ZJ-default-main);
}

/* 左侧菜单模式 */
.zuoce-l {
  background-color: var(--ZJ-default-main-hover2);
  border-radius: 5px;
  height: 46px;
  width: 15px;
}

.zuoce-r {
  border-radius: 5px;
  height: 46px;
  width: 57px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.zuoce-r-t {
  background-color: var(--ZJ-default-main);
  border-radius: 5px;
  height: 15px;
  width: 57px;
}

.zuoce-r-b {
  background-color: var(--ZJ-default-main-hover);
  border-radius: 5px;
  height: 39px;
  width: 57px;
}

/* 左侧菜单混合模式 */
.zuoce2-l {
  height: 46px;
  width: 26px;
  display: flex;
  gap: 6px;
}

.zuoce2-l-l1 {
  background-color: var(--ZJ-default-main-hover2);
  border-radius: 5px;
  height: 46px;
  width: 8px;
}

.zuoce2-l-l2 {
  background-color: var(--ZJ-default-main-hover2);
  border-radius: 5px;
  height: 46px;
  width: 12px;
}

.zuoce2-r {
  height: 46px;
  width: 42px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.zuoce2-r-t {
  background-color: var(--ZJ-default-main);
  border-radius: 5px;
  height: 15px;
  width: 42px;
}

.zuoce2-r-b {
  background-color: var(--ZJ-default-main-hover);
  border-radius: 5px;
  height: 39px;
  width: 42px;
}

/* 顶部菜单模式 */
.zuoce3 {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.zuoce3-l {
  background-color: var(--ZJ-default-main);
  border-radius: 5px;
  height: 14px;
  width: 74px;
}

.zuoce3-r {
  background-color: var(--ZJ-default-main-hover);
  border-radius: 5px;
  height: 26px;
  width: 74px;
}

.title {
  /* background-color: paleturquoise; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 25px 0;
  color: var(--ZJ-main-text-color);
}

hr {
  width: 110px;
  height: 1px;
  border: none;
  background: var(--ZJ-main-hover);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  border-bottom: 1px solid var(--ZJ-main-hover);
  color: var(--ZJ-main-text-color);
  font-size: 18px;
}

.header-r {
  height: 20px;
  width: 20px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--ZJ-main-border-radius-dropdown);
}

.header-r:hover {
  background-color: var(--ZJ-default-main-hover);
  color: var(--ZJ-default-main);
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  border-top: 1px solid var(--ZJ-main-hover);
  color: var(--ZJ-main-text-color);
  font-size: 18px;
}

.user-main {
  position: fixed;
  right: 0;
  top: 0;
  width: 360px;
  height: 100%;
  background: var(--ZJ-main-message-color);
  z-index: 1000;
  border-radius: 10px 0 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

li {
  list-style: none;
  padding: 5px;
  line-height: 20px;
  margin: 2px 0px 0 0px;
  color: var(--ZJ-main-text-color);
  font-size: 14px;
}

.SwitchView {
  float: right;
}

.user-more {
  padding: 15px 25px;
  /* background-color: aqua; */
  height: calc(100vh - 155px);
  overflow: auto;
}

.more-box {
  margin-top: 15px;
}

.more-box li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--ZJ-main-text-color);
}
</style>