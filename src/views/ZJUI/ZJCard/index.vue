<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJCard(卡片)</h2>
      </template>
      <h3>卡片用来展示一些内容</h3>
      <p>使用slot插槽</p>
      <p>header插槽：位于卡片顶部。</p>
      <p>main默认插槽：位于header和footer插槽之间，用于放置卡片的主要内容。</p>
      <p>footer插槽：位于卡片底部。</p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const vueCode=ref(
`<template>
  <ZJCard>
    <template #card-header>
      <h2>ZJCard(卡片header)</h2>
    </template>
    <p>卡片main</p>
    <template #card-footer>
      <h2>ZJCard(卡片footer)</h2>
    </template>
  </ZJCard>
</template>
`)
</script>
