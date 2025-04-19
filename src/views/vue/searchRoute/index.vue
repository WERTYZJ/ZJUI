<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>searchRoute(路由实时搜索)</h2>
      </template>
      <p>本案例介绍vue3中实时搜索路由并跳转的案例,以此可以实现其他类似实时搜索的过滤器</p>
      <p>1.在回调函数内部，使用filter方法对routeData.value进行过滤。routeData.value是一个数组，包含所有路由信息。 </p>
      <p>2.filter方法会遍历routeData.value中的每个路由项，并检查其name属性是否包含用户输入的搜索内容。 </p>
      <p>
        3.item.name.toLowerCase().includes(newValue.toLowerCase())：将路由项的name和用户输入的搜索内容都转换为小写，然后使用includes方法检查name是否包含搜索内容。这种不区分大小写的匹配方式可以提高搜索的灵活性。
      </p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const vueCode = ref(`
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import router from '@/router';

const route = useRouter()

const routeData = ref([]); //路由数据
const ZJInputVal = ref('');//输入框的数值
const filteredRoutes = ref([]); // 用于存储过滤后的路由数据

// 监听输入值的变化
watch(ZJInputVal, (newValue) => {
  filteredRoutes.value = routeData.value.filter(item =>
    item.name.toLowerCase().includes(newValue.toLowerCase())
  );
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
  console.log("route", routeData.value)
})

// 点击搜索列表的时候路由跳转
const openSearchPage = (path) => {
  router.push(path)
}
<script>
`)
</script>

<style scoped>
a {
  color: var(--ZJ-default-main);
}
</style>
