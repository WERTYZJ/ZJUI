<template>
  <div>
    <Transition name="mask">
      <div class="modal" style="align-items: start;" v-show="userStore.layout.showSearch" ref="setMaskEl">
        <transition name="showSetSearch">
          <div class="ZJInputMain" v-show="userStore.layout.showSearch" ref="setMainEl">
            <input v-model="ZJInputVal" placeholder="请输入搜索内容">
            <div class="bottom">
              <ZJNoData v-if="filteredRoutes.length < 1" icon="1" label="暂无数据" :iconStyle="{height:'300px',}"></ZJNoData>
              <div class="boxList" v-for="(i, index) in filteredRoutes" :key="index" @click="openSearchPage(i.path)">
                <div class="boxLeft">
                  <ZJSvgIcons :icon="i.icon"></ZJSvgIcons>
                  <!-- <a>{{ i.name }}</a> -->
                  <span v-html="i.name"></span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useUserStore } from '@/store';
import { useRouter } from 'vue-router';
import router from '@/router';

const userStore = useUserStore();
const route = useRouter()

const routeData = ref([]); //路由数据
const ZJInputVal = ref('');//输入框的数值
const filteredRoutes = ref([]); // 用于存储过滤后的路由数据

// 监听输入值的变化
watch(ZJInputVal, (newValue) => {

  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapeRegExp(newValue)})`, 'gi')

  filteredRoutes.value = routeData.value.filter(item =>
    item.name.toLowerCase().includes(newValue.toLowerCase())
  ).map(item => ({
    ...item,
    name: item.name.replace(regex, '<span style="color:var(--ZJ-default-main)">$1</span>')
  }))

});

onMounted(() => {
  // 递归写法
  const processRoutes = (routes) => {
    routes.forEach(i => {

      if (i.path != '') {
        routeData.value.push({
          name: i.name,
          path: i.path,
          icon: i.meta?.icon || ''
        })
      }

      if (i.children && i.children.length > 0) {
        processRoutes(i.children)
      }
    })
  }

  // 从根路由开始处理
  processRoutes(route.options.routes)
  // console.log("route", routeData.value)
})

// 点击搜索列表的时候路由跳转
const openSearchPage = (path) => {
  router.push(path)
  userStore.layout.showSearch = false
}


// 关闭弹窗
const setMainEl = ref(null);
const setMaskEl = ref(null);
onMounted(() => { document.addEventListener('click', closeRightAndMask); });
onUnmounted(() => { document.removeEventListener('click', closeRightAndMask) });
function closeRightAndMask(e) {
  const chatMainEl = setMainEl.value;
  const chatMaskEl = setMaskEl.value;

  const isOutside = !(chatMainEl === e.target)
  const isInMask = (chatMaskEl === e.target)

  if (isOutside && userStore.layout.showSearch && isInMask) {
    userStore.layout.showSearch = false
  }
}

</script>

<style scoped>
.ZJInputMain {
  width: 350px;
  max-height: 500px;
  margin-top: 50px;
  background: var(--ZJ-main-message-color);
  z-index: 1000;
  border-radius: var(--ZJ-main-border-radius-10);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

input {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background: var(--ZJ-main);
  border: none;
  outline: 2px solid var(--ZJ-main-hover);
  text-indent: 10px;
  color: var(--ZJ-main-text-color);
}

input:focus {
  outline: 2px solid var(--ZJ-default-main);
}

input::placeholder {
  /* background-color: #9B8CDF; */
  background-repeat: no-repeat;
  background-position-x: calc(100% - 15px);
  background-position-y: center;
  font-size: 14px;
  font-weight: normal;
  color: var(--ZJ-main-text-label-color);
}

.bottom {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
}

.bottom::-webkit-scrollbar {
  width: 0px;
}

.bottom::-webkit-scrollbar-thumb {
  width: 0px;
}

.boxList {
  border-radius: 10px;
  padding: 10px 10px;
  background-color: var(--ZJ-default-main-hover);
  display: flex;
  align-items: center;
  gap: 20px;
}

.boxList:hover {
  background-color: var(--ZJ-default-main-hover2);
  color: var(--ZJ-main-message-color);
}

.boxLeft {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--ZJ-main-text-color);
}
</style>