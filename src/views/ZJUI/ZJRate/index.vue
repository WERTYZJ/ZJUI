<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJRate(评分)</h2>
      </template>
      <h3>用来评价一些事件</h3>
      <p>评分数:rate</p>
      <p>评分字体样式:fontStyle</p>
      <p>得分图标样式:iconStyle</p>
      <p>未得分图表样式:iconEmptyStyle</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJRate rate="2.6" :fontStyle="{fontSize:'20px'}"></ZJRate>
      </div>
      <div class="ZJDisplayFlex m-t-10">
        <ZJRate rate="3.2" :iconStyle="{color:'green'}"></ZJRate>
      </div>
      <div class="ZJDisplayFlex m-t-10">
        <ZJRate rate="4.5" :iconEmptyStyle="{color:'red'}"></ZJRate>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>

const vueCode=ref(
`<template>
  <ZJRate rate="2.6" :fontStyle="{fontSize:'20px'}"></ZJRate>
  <ZJRate rate="3.2" :iconStyle="{color:'green'}"></ZJRate>
  <ZJRate rate="4.5" :iconEmptyStyle="{color:'red'}"></ZJRate>
</template>
`)
</script>
