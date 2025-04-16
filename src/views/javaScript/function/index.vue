<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>js function(函数)</h2>
      </template>
      <p>(一)替换函数</p>
      <p>1.1 .replace() 方法</p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
      <p>1.2 .match() 方法将字符串与正则表达式进行匹配。</p>
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const vueCode = ref(
  `this.content = this.content.replace(/<\/a >/g, '</a ></div >');
`)
</script>
