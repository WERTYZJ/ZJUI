<template>
    <ZJMain>
      <template #header>
        <h2>ZJCodeDisplay(代码显示)</h2>
      </template>
      <h3>代码显示用来<a>展示</a>一些代码</h3>
      <p>使用第三方插件<a>highlight.js</a></p>
      <p>header插槽：位于卡片顶部。</p>
      <p>在此代码中import 'highlight.js/styles/atom-one-light.css'; 你可以通过更改atom-one-light.css选择其他样式</p>
      <p>样式官网地址：<a href="https://fenxianglu.cn/highlight.html?theme=atom-one-light" target="_blank">https://fenxianglu.cn/highlight.html?theme=atom-one-light</a></p>
      <p>官方链接：<a href="https://highlightjs.org/" target="_blank">https://highlightjs.org/</a></p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
</template>

<script setup>
import { ref } from "vue";

const vueCode=ref(
`<template>
  <ZJCodeDisplay :code="vueCode" language="vue" />
</template>

<script setup>
  import { ref } from "vue";
  const vueCode=ref('示例代码放在这里面！！')
<script>
`)
</script>

<style scoped>
a{
  color: var(--ZJ-default-main);
}
</style>
