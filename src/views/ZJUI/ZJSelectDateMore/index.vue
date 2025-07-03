<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJSelectDateMore(下拉日期选择-日期时间段选择)</h2>
      </template>
      <h3>日期时间段选择用来选择时间起始和结束时间段</h3>
      <p>标签名字:label="请选择日期"(不必须)</p>
      <p>使用StartTime接收选择到的起始日期:@StartTime="StartTime = $event"</p>
      <p>使用EndTime接收选择到的结束日期:@EndTime="EndTime = $event"</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJSelectDateMore label="请选择日期时间段" @StartTime="StartTime = $event" @EndTime="EndTime = $event"></ZJSelectDateMore>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const StartTime = ref('');
const EndTime = ref('');

watch([StartTime, EndTime], ([startTime, endTime]) => {
  console.log("StartTime", startTime)
  console.log("EndTime", endTime)
}, { immediate: true })

const vueCode = ref(
  `<template>
  <ZJSelectDateMore
    label="请选择日期时间段"
    @StartTime="StartTime = $event"
    @EndTime="EndTime = $event"
  ></ZJSelectDateMore>
</template>

import { ref,watch } from "vue";

const StartTime = ref(null);
const EndTime = ref(null);

watch([StartTime, EndTime], ([startTime, endTime]) => {
  console.log("StartTime", startTime)
  console.log("EndTime", endTime)
}, { immediate: true })
`)
</script>
