<template>
  <div class="barMain">
    <div class="bar-l" ref="barContainer">
      <div :class="{ 'barBox': true, 'barBoxActive': showbarBoxActive === i.path }" v-for="(i, index) in barData"
        :key="index" @click="openRouter(i.path, i.name, index, $event)" @click.right="openHeaderBarTools($event, index)"
        ref="barBoxes">
        <ZJSvgIcons :icon="i.icon" height="18px" width="18px"></ZJSvgIcons>
        <a style="display:flex;min-width: fit-content;">{{ i.name }}</a>
        <div class="barBorClose" v-if="i.name != 'home' && userStore.layout.showHeaderSildebarOpen"
          @click.stop="closeRouter(index)">
          <ZJSvgIcons icon="close" height="18px" width="18px"></ZJSvgIcons>
        </div>
      </div>
    </div>
    <div class="bar-r">
      <reloadRoutre></reloadRoutre>
      <fullScreenRouter></fullScreenRouter>
    </div>
    <headerBarTools v-show="showHeaderBarTools" class="headerBarTools" @selectedBarTools="acceptBarTools"
      :style="{ top: contextMenuTop + 'px', left: contextMenuLeft + 'px' }">
    </headerBarTools>
  </div>
</template>

<script setup name="ZJHeaderBar">
import { onMounted, ref, watch } from "vue";
import fullScreenRouter from "./components/fullScreenRouter.vue"
import reloadRoutre from "./components/reloadRouter.vue";
import { useRouter, useRoute } from 'vue-router';
import router from "@/router";
import { useUserStore } from '@/store';
import headerBarTools from "./components/headerBarTools.vue";
const userStore = useUserStore();


const barData = ref([]);

onMounted(() => {
  barData.value = userStore.ZJHeaderBarList
})

// 获取路由实例
const routerList = useRouter()
// 获取当前路由对象
const route = useRoute();
// 当前已经激活路由
const showbarBoxActive = ref();
// 是否展示当前路由工具弹窗
const showHeaderBarTools = ref(false);

const closeRouterIndex = ref();

const closeRouter = (index) => {

  const a = barData.value;
  if ((a.length - 1) == index) {
    showbarBoxActive.value = a[index - 1].path;
    updateStore(a[index - 1].name, a[index - 1].path);
  }
  if ((a.length - 1) > index) {
    showbarBoxActive.value = a[index + 1].path;
    updateStore(a[index + 1].name, a[index + 1].path);
  }
  router.push(`${showbarBoxActive.value}`);
  barData.value.splice(index, 1);


  // 打印完整路由配置
  // console.log('打印完整路由配置:', router.options.routes)
  // 打印当前激活的路由记录
  // console.log('打印当前激活的路由记录:', route)
};

const openRouter = (path, name, index, event) => {
  const target = event.currentTarget
  // 调用判断函数
  const isVisible = isElementVisibleInParent(target)
  const element = barBoxes.value[index]
  // 方法1：获取计算样式（推荐）
  // const computedStyle = window.getComputedStyle(element)
  // const elWidth = parseFloat(computedStyle.width) || 0;
  // 方法2：获取布局尺寸（包含边框/内边距）
  // const rect = element.getBoundingClientRect()
  // const layoutWidth = rect.width
  // console.log("width",elWidth)
  // console.log('当前元素可视状态:', isVisible ? '可见' : '不可见')
  // 获取元素宽度和位置信息
  const rect = element.getBoundingClientRect()
  const parentRect = barContainer.value.getBoundingClientRect()
  const parentScroll = barContainer.value
  // 仅当不可见时执行滚动
  if (!isVisible) {
    // 计算滚动方向
    const isRightOverflow = rect.right > parentRect.right
    const isLeftOverflow = rect.left < parentRect.left

    // 计算滚动距离（带边界保护）
    let scrollDistance = 0
    if (isRightOverflow) {
      scrollDistance = (rect.right - parentRect.right) * 2 + 20 // 右侧溢出时右滚
    } else if (isLeftOverflow) {
      scrollDistance = -(parentRect.left * 2 - rect.left + 20) // 左侧溢出时左滚
    }

    // 执行滚动（添加平滑过渡）
    parentScroll.scrollTo({
      left: parentScroll.scrollLeft + scrollDistance,
      behavior: 'smooth'
    })
  }
  router.push(`${path}`)
  updateStore(name, path);
  // 打印完整路由配置
  // console.log('打印完整路由配置:', router.options.routes)
  // 打印当前激活的路由记录
  // console.log('打印当前激活的路由记录:', route)
};

// 判断可视化
const barContainer = ref(null)
const barBoxes = ref([])
const beforeDataList = ref([]) //保存点击前数据
watch(
  () => route,
  (val) => {
    if (barData.value.length == 0) {
      barData.value.push({
        name: 'home',
        icon: 'home',
        path: '/home',
      });
      showbarBoxActive.value = barData.value[0].path;
      return;
    }
    // 使用 some() 方法检查是否存在相同 name

    const exists = barData.value.some(item => item.name === val.name);
    if (!exists) {
      barData.value.push({
        name: val.name,
        icon: val.meta.icon,
        path: val.fullPath,
      });
      // 点击新页面后滚动条横向滚动到最右侧
      const container = barContainer.value;
      nextTick(() => {
        container.scrollLeft = container.scrollWidth;
      });
      // console.log("container.scrollWidth", container.scrollWidth)
      // container.scrollTo({
      //     left: container.scrollWidth,
      //     behavior: 'smooth'
      // });
    }
    showbarBoxActive.value = val.path;
  },
  {
    immediate: true,
    deep: true
  }
)

// //上下导航存在时的函数
// watch(() => userStore.layout.showHeaderSildebarOpen, (val) => {
//   let names = new Set();
//   barData.value.forEach((i) => {
//     names.add(i.name)
//   })
//   if (!val) {
//     beforeDataList.value = barData.value;
//     // 递归写法
//     const processRoutes = (routes) => {
//       routes.forEach(i => {
//         // 路由路径不为空判断
//         if (i.path != '') {
//           const exists = names.has(i.name)
//           // 相同路径只保留一个(去重)
//           if (!exists) {
//             names.add(i.name);
//             barData.value.push({
//               name: i.name,
//               path: i.path,
//               icon: i.meta?.icon || ''
//             })
//           }
//         }

//         if (i.children && i.children.length > 0) {
//           processRoutes(i.children)
//         }
//       })
//     }

//     // 从根路由开始处理
//     processRoutes(routerList.options.routes)
//   } else {
//     barData.value = []
//     barData.value.push({
//       name: 'home',
//       icon: 'home',
//       path: '/home',
//     });
//     router.push('home')
//   }
// },
//   {
//     immediate: false,//默认加载一次
//     deep: true
//   }
// )


// 判断元素是否在父容器内可见
const isElementVisibleInParent = (child) => {
  if (!barContainer.value || !child) return false

  const parentRect = barContainer.value.getBoundingClientRect()
  const childRect = child.getBoundingClientRect()

  // 转换坐标系到父容器
  const parentTop = parentRect.top + window.scrollY
  const parentLeft = parentRect.left + window.scrollX

  // 计算相对位置
  const relativeTop = childRect.top - parentTop
  const relativeBottom = relativeTop + childRect.height
  const relativeLeft = childRect.left - parentLeft
  const relativeRight = relativeLeft + childRect.width

  // 判断条件
  return (
    relativeTop >= 0 &&
    relativeBottom <= parentRect.height &&
    relativeLeft >= 0 &&
    relativeRight <= parentRect.width
  )
}


const contextMenuTop = ref(0);
const contextMenuLeft = ref(0);

const openHeaderBarTools = (event, index) => {

  closeRouterIndex.value = index
  showHeaderBarTools.value = true;

  // 获取鼠标点击位置
  const x = event.layerX;
  const y = event.layerY;

  // // 获取页面的高度
  const pageHeight = window.innerHeight;

  // // 设置弹出框位置，不超过页面底部边缘
  const contextMenuHeight = 250
  const adjustedTop = Math.min(y, pageHeight - contextMenuHeight);
  contextMenuTop.value = adjustedTop;
  contextMenuLeft.value = x;

  // // 阻止默认右键菜单弹出
  event.preventDefault();
  // // 点击页面其他地方时隐藏右键菜单框
  document.addEventListener('click', hideContextMenu);
}
// 隐藏右键菜单框
const hideContextMenu = () => {
  // 隐藏右键菜单框
  showHeaderBarTools.value = false;
  document.removeEventListener('click', hideContextMenu);
}
const acceptBarTools = (index) => {
  const upDateRouterAndStore = () => {
    if (showbarBoxActive.value != barData.value[closeRouterIndex.value].path) {
      router.push(barData.value[closeRouterIndex.value].path);
      updateStore(barData.value[closeRouterIndex.value].name, barData.value[closeRouterIndex.value].path);
    }
  }
  if (index == 0) {
    closeRouter(closeRouterIndex.value);
  }
  if (index == 1) {
    barData.value = []
    barData.value.push({
      name: 'home',
      icon: 'home',
      path: '/home',
    });
    userStore.ZJHeaderBarList = barData.value;
    updateStore('home', '/home');
    router.push('home');
  }
  if (index == 2) {
    upDateRouterAndStore();
    barData.value.splice(1, closeRouterIndex.value - 1);
  }
  if (index == 3) {
    upDateRouterAndStore();
    barData.value.splice(closeRouterIndex.value + 1, barData.value.length - closeRouterIndex.value);
  }
}
// 更新持久化状态
const updateStore = (name, path) => {
  userStore.ZJAsideMenuNameSelect = name;
  userStore.ZJAsideMenuSelectPath = path;
}
</script>

<style scoped>
.barMain {
  flex-shrink: 0;
  height: var(--ZJ-HeaderBar-height);
  background-color: var(--ZJ-main);
  padding: 0 10px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 1px 1px var(--ZJ-main-hover);
  z-index: 1;
  transition: var(--ZJ-main-transition-width);
  position: relative;
}

.bar-l {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: calc(100vw - var(--ZJ-AsideMenu-width) - 100px);
  overflow-x: scroll;
  overflow-y: hidden;
  /* 隐藏滚动条的核心代码 */
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE/Edge */
  transition: var(--ZJ-main-transition-width);
  padding: 7px 0;
}

.barBox {
  height: 28px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: var(--ZJ-main-border-light);
  border-radius: var(--ZJ-HeaderBar-border-radius);
  font-size: 14px;
  color: var(--ZJ-main-text-color);
  flex-wrap: nowrap;
  transition: var(--ZJ-main-transition-width);
  flex-shrink: 0;
}

.barBox:hover {
  border: 1px solid var(--ZJ-default-main);
  color: var(--ZJ-default-main);
}

.barBoxActive {
  height: 28px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid var(--ZJ-default-main);
  font-size: 14px;
  color: var(--ZJ-default-main);
  background-color: var(--ZJ-default-main-hover);
  flex-wrap: nowrap;
  transition: var(--ZJ-main-transition-width);
  flex-shrink: 0;
}



.barBorClose {
  /* color: var(--ZJ-main-text-color); */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.barBorClose:hover {
  background-color: var(--ZJ-default-main);
  color: var(--ZJ-main);
}

.bar-r {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

/* 设置滚动条的宽度 */
::-webkit-scrollbar {
  height: 0px;
}

/* 设置滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  height: 0px;
}

.headerBarTools {
  position: absolute;
}
</style>
