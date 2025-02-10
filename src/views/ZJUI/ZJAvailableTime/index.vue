<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJAvailableTime(可用时间展示)</h2>
      </template>
      <h3>可用时间展示，图形化，时间段展示可用时间，不可用时间等</h3>
      <p>type="1" 类型为1，可以更改时间选择，不写或其他为只读显示。</p>
      <p>:readAvailableData="readAvailableData" 只读显示 数据，或者更改回显数据。</p>
      <p>@availableData="acceptAvailableData" 接收选择后时间数据</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJAvailableTime
          type="1"
          :readAvailableData="readAvailableData"
          @availableData="acceptAvailableData"
         >
        </ZJAvailableTime>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const readAvailableData  = ref([
  ["03:30-04:00","08:30-09:00"],
  ["05:30-06:00","15:30-16:00"],
  ["23:30-24:00","12:30-13:00"],
  ["21:30-22:00","13:30-14:00"],
  ["18:30-19:00","12:30-13:00"],
  ["03:30-04:00","12:30-13:00"],
  ["03:30-04:00","09:30-10:00"],
])

function acceptAvailableData(val){
  console.log('acceptAvailableDatav',val)
}

const vueCode=ref(
`<template>
  <ZJAvailableTime
    type="1"
    :readAvailableData="readAvailableData"
    @availableData="acceptAvailableData"
    >
  </ZJAvailableTime>
</template>

const readAvailableData  = ref([
  ["03:30-04:00","8:30-9:00"],
  ["05:30-04:00","15:30-16:00"],
  ["23:30-24:00","12:30-13:00"],
  ["21:30-22:00","13:30-14:00"],
  ["18:30-19:00","12:30-13:00"],
  ["03:30-04:00","12:30-13:00"],
  ["07:30-04:00","9:30-10:00"],
])

function acceptAvailableData(val){
  console.log('acceptAvailableDatav',val)
}
<script>
`)
</script>
