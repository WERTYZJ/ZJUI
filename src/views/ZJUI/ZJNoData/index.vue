<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJNoData(无数据)</h2>
      </template>
      <h3>下拉时间选择用来选择具体时间</h3>
      <p>标签名字:label="暂无数据"(不必须)</p>
      <p>图标样式:icon="1"(可选数据1、2)</p>
      <p>字体样式:fontStyle</p>
      <p>整体图标大小:iconStyle</p>
      <div class="ZJDisplayFlex m-t-10">
       <ZJNoData
        icon="1"
        label="暂无数据"
        size="150"
       ></ZJNoData>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const vueCode=ref(
`<template>
  <ZJNoData
    icon="1"
    label="暂无数据"
    size="150"
    ></ZJNoData>
</template>
`)
</script>
