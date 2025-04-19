<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJInput(输入框)</h2>
      </template>
      <p>输入框用来输入数据</p>
      <p>@ZJInputVal="$event => inputVal" 绑定数据</p>
      <p>placeholder="请输入内容" 文本展示</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJInput @ZJInputVal="$event => inputVal" placeholder="请输入内容"></ZJInput>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputVal = ref('')

const vueCode = ref(`
<template>
  <div>
   <ZJInput @ZJInputVal="$event => inputVal" placeholder="请输入内容"></ZJInput>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputVal = ref('')
<script>
`)
</script>

<style scoped>
a {
  color: var(--ZJ-default-main);
}
</style>
