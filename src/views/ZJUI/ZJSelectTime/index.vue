<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJSelectTime(下拉时间选择)</h2>
      </template>
      <h3>下拉时间选择用来选择具体时间</h3>
      <p>标签名字:label="请选择日期"(不必须)</p>
      <p>使用ZJSelectTimeVal接收选择到的日期单选value数值:@ZJSelectTimeVal="ZJSelectTimeVal = $event"</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJSelectTime label="请选择具体时间" @ZJSelectTimeVal="ZJSelectTimeVal = $event"></ZJSelectTime>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const ZJSelectTimeVal = ref('');

watch(ZJSelectTimeVal, (newVal) => {
  console.log("ZJSelectTimeVal", newVal)
},
  {
    immediate: true
  }
)

const vueCode = ref(
  `<template>
  <ZJSelectTime
    label="请选择具体时间"
    @ZJSelectTimeVal="ZJSelectTimeVal = $event"
  ></ZJSelectTime>
</template>

import { ref, watch } from "vue";

const ZJSelectTimeVal = ref(null);

watch(ZJSelectTimeVal, (newVal) => {
  console.log("ZJSelectTimeVal", newVal)
},
  {
    immediate: true
  }
)
`)
</script>
