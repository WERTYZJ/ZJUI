<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>transition(vue动画效果)</h2>
      </template>

      <ZJCard>
        <div class="ani-box">
          <transition :name="selectedAnimation">
            <div v-if="showCardContent" class="ani-card"></div>
          </transition>
        </div>
        <template #card-footer>
          <div class="ani-btn">
            <ZJButton v-for="(i, index) in animations" :key="index" type="default" :text="i.name"
              @click="selectAnimation(i.value)"></ZJButton>
          </div>
        </template>
      </ZJCard>
      <ZJCodeDisplay :code="vueCode" language="vue" hideText />
    </ZJMain>
  </div>
</template>

<script setup>

const showCardContent = ref(true);
const selectedAnimation = ref('a');

const animations = ref([
  { name: '全局动画效果', value: 'a', },
  { name: 'list动画效果', value: 'l', },
  { name: 'photo图片动画', value: 'photo', },
  { name: 'photo阴影遮罩动画', value: 'mask', },
  { name: 'file文件上传动画', value: 'file', },
  { name: 'select下拉框', value: 'Select', },
  { name: '路由跳转动画router3', value: 'fade', },
  { name: 'message消息框动画', value: 'message', },
  { name: 'HeaderBar动画', value: 'c', },
  { name: '从右往左平滑过渡300px', value: 'showTopMore', },
  { name: '左侧导航栏', value: 'leftBar', },
  { name: '右侧设置遮罩层动画', value: 'showSetmask', },
  { name: '右侧设置菜单动画', value: 'showSetRight', },
  { name: 'search搜索框动画', value: 'showSetSearch', },
]);


const selectAnimation = (anim) => {
  selectedAnimation.value = anim;
  showCardContent.value = false;
  setTimeout(() => {
    showCardContent.value = true;
  }, 50);
};

const readZJTransitionCss = () => {
  // 使用动态导入，并添加raw查询参数
  import('/src/styles/ZJTransition.css?raw')
    .then(res => {
      vueCode.value = res.default;
    })
    .catch(error => {
      console.error('Failed to load CSS file:', error);
      vueCode.value = '/* 加载CSS文件失败 */';
    });
};

onMounted(() => {
  readZJTransitionCss();
})

const vueCode = ref('内容')
</script>

<style scoped>
.ani-box {
  height: 100px;
  width: 100px;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--ZJ-default-main-hover);
}

.ani-card {
  height: 100px;
  width: 100px;
  border-radius: 10px;
  background-color: var(--ZJ-default-main-hover2);
}

.ani-btn {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
