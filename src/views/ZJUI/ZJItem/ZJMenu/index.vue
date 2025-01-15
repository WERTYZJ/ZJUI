<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJMenu(折叠菜单)</h2>
      </template>
      <h3>折叠菜单用来导航一些需要链接的部分</h3>
      <p>特点:无限递归</p>
      <p>演示:目前仅限侧边栏导航使用</p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const vueCode=ref(
`<template>
  <ZJMenu
    v-for="(item, index) in menu"
    :key="index"
    :item="item"
    :clickSelectedIndex="clickSelectedIndex"
    :index="index"
  />
</template>
`)
</script>
