<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJMenuCard(折叠菜单卡片)</h2>
      </template>
      <h3>折叠菜单卡片:当侧边栏缩小时,鼠标移入展示的菜单卡片.</h3>
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
  <ZJMenuCard
    :item="item" //数据
    :clickSelectedIndex="toggleChildMenu" //点击事件
    :index="index" //索引
    :level="0" //层级关系
    @closeAsideMenuCard="closeAsideMenuCard" //鼠标移出关闭
  />
</template>
`)
</script>
