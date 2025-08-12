<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJInput(输入框)</h2>
      </template>
      <p>输入框用来输入数据</p>
      <p>@ZJInputVal="$event => acceptVal($event)" 绑定数据</p>
      <p>placeholder="请输入内容" 文本展示</p>
      <p>val="绑定输入框初次数据"</p>
      <p>ZJInputEl.value.reSetVal();重置输入框函数</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJInput @ZJInputVal="inputVal" placeholder="请输入内容" :val="firstVal" ref="ZJInputEl"></ZJInput>
        <ZJButton @click="reSetVal" type="error" text="重置" icon="reload"></ZJButton>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const inputVal = ref('')
const firstVal = ref('绑定输入框初次数据');

const ZJInputEl = ref(null)
const reSetVal = () => {
  ZJInputEl.value.reSetVal();
}
watch(inputVal.value, (newVal) => {
  console.log("newval", newVal)
})

const vueCode = ref(`
<template>
  <div>
   <ZJInput @ZJInputVal="$event => acceptVal($event)" placeholder="请输入内容" :val="firstVal" ref="ZJInputEl"></ZJInput>
   <ZJButton @click="reSetVal" type="error" text="重置" icon="reload"></ZJButton>
  </div>
</template>

<script setup>
const inputVal = ref('')
const firstVal = ref('绑定输入框初次数据');

const ZJInputEl = ref(null)
const reSetVal = () => {
  ZJInputEl.value.reSetVal();
}
const acceptVal = (newVal) => {
  inputVal.value = newVal
}
<script>
`)
</script>

<style scoped>
a {
  color: var(--ZJ-default-main);
}
</style>
