<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJLoading(无数据)</h2>
      </template>
      <h3>下拉时间选择用来选择具体时间</h3>
      <p>标签名字:label="暂无数据"(不必须)</p>
      <p>图标样式:icon="2"(可选数据1、2)</p>
      <p>大小:size="150"(可选数据150、100、50)</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJButton type="success" text="点击加载动画" @click="loadData"></ZJButton>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/index";
const userStore = useUserStore();

// 加载数据的函数
const loadData = async () => {
  userStore.startLoading();
  await new Promise(resolve => setTimeout(resolve, 2000));
  userStore.stopLoading();
  console.log(userStore.isLoading)
};

const vueCode=ref(
`<template>
  <ZJLoading
    icon="2"
    label="暂无数据"
    size="150"
    ></ZJLoading>
</template>
`)
</script>
