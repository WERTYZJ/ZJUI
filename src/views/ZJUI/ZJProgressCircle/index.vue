<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJProgressCircle(圆圈进度条)</h2>
      </template>
      <h3>进度条用来展示一些操作进度</h3>
      <p>:ZJCircleData="i" 绑定的数据外部数据。</p>
      <p>i.percent 进度条的展示进度。（100为完成, 必须）</p>
      <p>i.text 圆圈进度条中间展示的说明性文字。（不必须）</p>
      <p>i.bottomText 圆圈进度条下面展示的说明性文字。（不必须）</p>
      <div class="m-t-10" style="display: flex; gap: 30px;">
        <div v-for="(i, index) in listData" :key="index">
          <ZJProgressCircle :ZJCircleData="i"></ZJProgressCircle>
        </div>

      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const listData = ref([
  {
    percent: 85,
    text: "新增人数",
    bottomText: "新增人数增长",
  },
  {
    percent: 45,
    text: "浏览增长",
    bottomText: "新增人数增长",
  },
  {
    percent: 28,
    text: "交易人数",
    bottomText: "新增人数增长",
  },
])

const vueCode = ref(
  `<template>
 <div v-for="(i, index) in listData" :key="index">
    <ZJProgressCircle :ZJCircleData="i"></ZJProgressCircle>
  </div>
</template>

import { ref } from "vue";

const listData = ref([
  {
    percent: 85,
    text: "新增人数",
    bottomText: "新增人数增长",
  },
  {
    percent: 45,
    text: "浏览增长",
    bottomText: "新增人数增长",
  },
  {
    percent: 28,
    text: "交易人数",
    bottomText: "新增人数增长",
  },
])
`)
</script>
