<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJProgress(进度条)</h2>
      </template>
      <h3>进度条用来展示一些操作进度</h3>
      <p>总进度:allCount="10"</p>
      <p>已完成进度:finishCount="7"</p>
      <div class="m-t-10">
        <ZJProgress allCount="10" finishCount="7"></ZJProgress>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const vueCode=ref(
`<template>
  <ZJProgress allCount="10" finishCount="7"></ZJProgress>
</template>
`)
</script>
