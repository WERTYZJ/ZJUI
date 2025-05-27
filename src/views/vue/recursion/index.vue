<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>recursion(递归循环)</h2>
      </template>
      <p>当路由里面嵌套了children的时候,我们需要去循环使用数据，这时我们可以使用递归遍历来处理数据。</p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>

const vueCode = ref(`
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '@/store';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter()

const routeData = ref([]);

onMounted(() => {
  // 递归写法
  const processRoutes = (routes) => {
    routes.forEach(route => {

      routeData.value.push({
        name: route.name,
        path: route.path,
        icon: route.meta?.icon || ''
      })

      if (route.children && route.children.length > 0) {
        processRoutes(route.children)
      }
    })
  }

  // 从根路由开始处理
  processRoutes(router.options.routes)
  console.log("route", routeData.value)
})
<script>
`)
</script>

<style scoped>
a {
  color: var(--ZJ-default-main);
}
</style>
