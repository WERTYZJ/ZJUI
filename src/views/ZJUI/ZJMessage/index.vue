<template>
  <ZJMain>
    <template #header>
      <h2>ZJMessage(消息提示)</h2>
    </template>
    <h3>消息提示用来显示一些提示消息</h3>
    <p>消息提示示例</p>
    <div class="ZJDisplayFlex m-tb-10">
      <ZJButton type="success" text="success" @click="showSuccessMessage"></ZJButton>
      <ZJButton type="error" text="error" @click="showErrorMessage"></ZJButton>
      <ZJButton type="info" text="info" @click="showInfoMessage"></ZJButton>
      <ZJButton type="warning" text="warning" @click="showWarningMessage"></ZJButton>
    </div>
    <p>在 Vue 3 的 Composition API 中，当你需要在 setup 函数内访问全局属性（如通过 app.config.globalProperties 注册的全局方法或属性）时，你确实需要分两步来进行，这是因为
      setup 函数的调用时机和它的上下文与选项式 API 中的 created 钩子或组件方法不同。
      setup 函数的调用时机：
      setup 函数是在组件实例被创建之前调用的，这意味着在 setup 函数内部，this 关键字是不可用的，因为它还没有指向一个完整的组件实例。因此，你不能直接在 setup 函数内使用 this.$ZJMessage
      来访问全局属性。
      获取当前组件实例：
      为了访问组件实例及其相关的属性（包括全局属性），你需要使用 getCurrentInstance 函数来获取当前的组件实例。这个函数返回一个包含组件实例信息的对象，其中 appContext 属性包含了关于 Vue
      应用上下文的信息。
      访问全局属性：一旦你有了 appContext，你就可以通过 appContext.config.globalProperties 来访问通过 app.config.globalProperties 注册的全局属性或方法。</p>
    <ZJCodeDisplay :code="CodeData3" language="vue" />
  </ZJMain>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance();
const $ZJMessage = appContext.config.globalProperties.$ZJMessage;

const CodeData3 = ref(
  `<template>
  <ZJCard>
    <ZJButton type="success" text="success" @click="showSuccessMessage"></ZJButton>
    <ZJButton type="error" text="error" @click="showErrorMessage"></ZJButton>
    <ZJButton type="info" text="info" @click="showWarningMessage"></ZJButton>
    <ZJButton type="warning" text="warning" @click="showInfoMessage"></ZJButton>
  </ZJCard>
</template>

<script setup>

import {ref,getCurrentInstance} from 'vue'
const { appContext } = getCurrentInstance();
const $ZJMessage = appContext.config.globalProperties.$ZJMessage;

function showSuccessMessage() {
  $ZJMessage({
    type: 'success',
    message: 'This is a success message!',
    duration: 3000,
  });
}
function showErrorMessage() {
  $ZJMessage({
    type: 'error',
    message: '操作失败！',
    duration: 2000,
  });
}
function showWarningMessage() {
  $ZJMessage({
    type: 'warning',
    message: '这是一个警告！',
    duration: 2000,
  });
}
function showInfoMessage() {
  $ZJMessage({
    type: 'info',
    message: '这是一个信息提示！',
    duration: 2000,
  });
}
<script>
`
)

function showSuccessMessage() {
  $ZJMessage({
    type: 'success',
    message: 'This is a success message!',
    duration: 2000,
  });
}
function showErrorMessage() {
  $ZJMessage({
    type: 'error',
    message: '操作失败！',
    duration: 2000,
  });
}
function showWarningMessage() {
  $ZJMessage({
    type: 'warning',
    message: '这是一个警告！',
    duration: 2000,
  });
}
function showInfoMessage() {
  $ZJMessage({
    type: 'info',
    message: '这是一个信息提示！',
    duration: 2000,
  });
}
</script>

<style scoped>/* 这里可以添加其他样式 */</style>