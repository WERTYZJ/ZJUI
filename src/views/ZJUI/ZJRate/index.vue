<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJRate(评分)</h2>
      </template>
      <h3>用来评价一些事件</h3>
      <p>评分数:rate="4.5"</p>
      <p>大中小:size="small" size="default" size="large"</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJRate rate="4.5" size="small"></ZJRate>
      </div>
      <div class="ZJDisplayFlex m-t-10">
        <ZJRate rate="4.5" size="default"></ZJRate>
      </div>
      <div class="ZJDisplayFlex m-t-10">
        <ZJRate rate="4.5" size="large"></ZJRate>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const vueCode=ref(
`<template>
  <ZJRate rate="4.5" size="small"></ZJRate>
  <ZJRate rate="4.5" size="default"></ZJRate>
  <ZJRate rate="4.5" size="large"></ZJRate>
</template>
`)
</script>
