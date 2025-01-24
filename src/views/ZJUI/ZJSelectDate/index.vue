<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJSelectData(下拉日期选择)</h2>
      </template>
      <h3>下拉日期用来选择时间</h3>
      <p>标签名字:label="请选择日期"(不必须)</p>
      <p>使用ZJSelectDataVal接收选择到的日期单选value数值:@ZJSelectDataVal="ZJSelectDataVal = $event"</p>
      <div class="ZJDisplayFlex m-t-10">
       <ZJSelectDate
        label="请选择日期"
        @ZJSelectDataVal="ZJSelectDataVal = $event"
       ></ZJSelectDate>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const ZJSelectDataVal = ref(null);

const vueCode=ref(
`<template>
   <ZJSelectDate
    label="请选择日期"
    @ZJSelectDataVal="ZJSelectDataVal = $event"
    ></ZJSelectDate>
</template>

import { ref, watch } from "vue";

const ZJSelectDataVal = ref(null);

watch(()=>{
  console.log("ZJSelectDataVal",ZJSelectDataVal.value)
})
`)
</script>
