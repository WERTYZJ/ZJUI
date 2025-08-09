<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJSelect(下拉选择)</h2>
      </template>
      <h3>下拉选择用来选择许多数据里面的其中一个或者几个数据</h3>
      <p>选择下拉数据:options="ZJOptions"(必须)</p>
      <p>标签名字:label="姓名"(不必须)</p>
      <p>初始数据值:value="1"(不必须)</p>
      <p>使用ZJSelectVal接收选择到的单选value数值:@ZJSelectVal="ZJSelectVal = $event"</p>
      <p>:selectStyle="{}"选择框自定义样式(传递数据类型为对象Object)</p>
      <p>:dropMenuStyle="{}" 下拉框自定义样式(传递数据类型为对象Object)</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJSelect label="姓名" :options="ZJOptions" @ZJSelectVal="ZJSelectVal = $event"></ZJSelect>

        <ZJSelect label="姓名" :options="ZJOptions" :value="val"
          :selectStyle="{ height: '38px', 'border-radius': '10px', outline: '2px solid var(--ZJ-main-hover)', border: 'none', background: 'var(--ZJ-main)' }"
          :dropMenuStyle="{ 'border-radius': '10px' }" @ZJSelectVal="ZJSelectVal = $event"></ZJSelect>

      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const ZJOptions = ref([
  {
    label: "张三",
    value: 0,
  },
  {
    label: "李四",
    value: 1,
  },
  {
    label: "王五",
    value: 2,
  },
])

const val = ref(1)

const ZJSelectVal = ref(null);

const vueCode = ref(
  `<template>

   <ZJSelect
      label="姓名" 
      :options="ZJOptions"
      @ZJSelectVal="ZJSelectVal = $event"
    ></ZJSelect>

    <ZJSelect label="姓名" :options="ZJOptions"
      :selectStyle="{ height: '38px', 'border-radius': '10px', outline: '2px solid var(--ZJ-main-hover)', border:'none',background: 'var(--ZJ-main)' }"
      :dropMenuStyle="{ 'border-radius': '10px' }" @ZJSelectVal="ZJSelectVal = $event">
    </ZJSelect>

</template>

import { ref, watch } from "vue";

const ZJOptions=ref([
  {
    label:"张三",
    value:1,
  },
  {
    label:"李四",
    value:2,
  },
  {
    label:"王五",
    value:3,
  },
])

const ZJSelectVal = ref(null);

watch(()=>{
  console.log("ZJSelectVal",ZJSelectVal.value)
})
`)
</script>
