<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJSvgIcons(svg图标)</h2>
      </template>
      <h3>svg图标用来显示一些图形图标</h3>
      <p>基础图标，图标名称:icon="message"</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJSvgIcons class="ZJHeaderToolsBox" icon="message"></ZJSvgIcons>
        <ZJSvgIcons class="ZJHeaderToolsBox" icon="button"></ZJSvgIcons>
        <ZJSvgIcons class="ZJHeaderToolsBox" icon="home"></ZJSvgIcons>
        <ZJSvgIcons class="ZJHeaderToolsBox" icon="ZJUI"></ZJSvgIcons>
        <ZJSvgIcons class="ZJHeaderToolsBox" icon="copy"></ZJSvgIcons>
        <ZJSvgIcons class="ZJHeaderToolsBox" icon="javaScript"></ZJSvgIcons>
      </div>
      <ZJCodeDisplay :code="vueCode"/>
      <p>自定义宽度高度,height="30px" width="30px.</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJSvgIcons class="ZJHeaderToolsBox" icon="copy" height="30px" width="30px"></ZJSvgIcons>
        <ZJSvgIcons class="ZJHeaderToolsBox" icon="javaScript" height="30px" width="30px"></ZJSvgIcons>
      </div>
      <ZJCodeDisplay :code="vueCode2"/>
      <p>自定义颜色,color="green"</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJSvgIcons class="ZJHeaderToolsBox" icon="copy" color="green"></ZJSvgIcons>
        <ZJSvgIcons class="ZJHeaderToolsBox" icon="javaScript" color="red"></ZJSvgIcons>
      </div>
      <ZJCodeDisplay :code="vueCode3"/>
      <p>自定义其他样式,style="你想要更改的样式..."</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJSvgIcons class="ZJHeaderToolsBox" icon="copy" style="background-color: antiquewhite;"></ZJSvgIcons>
        <ZJSvgIcons class="ZJHeaderToolsBox" icon="javaScript" style="background-color: aquamarine;border-radius: 50%;"></ZJSvgIcons>
      </div>
      <ZJCodeDisplay :code="vueCode4"/>
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const vueCode=ref(
`<template>
  <ZJSvgIcons icon="message"></ZJSvgIcons>
  <ZJSvgIcons icon="button"></ZJSvgIcons>
  <ZJSvgIcons icon="home"></ZJSvgIcons>
  <ZJSvgIcons icon="ZJUI"></ZJSvgIcons>
  <ZJSvgIcons icon="copy"></ZJSvgIcons>
  <ZJSvgIcons icon="javaScript"></ZJSvgIcons>
</template>
`)

const vueCode2=ref(
`<template>
  <ZJSvgIcons icon="copy" height="30px" width="30px"></ZJSvgIcons>
  <ZJSvgIcons icon="javaScript" height="30px" width="30px"></ZJSvgIcons>
</template>
`)

const vueCode3=ref(
`<template>
  <ZJSvgIcons icon="copy" color="green"></ZJSvgIcons>
  <ZJSvgIcons icon="javaScript" color="red"></ZJSvgIcons>
</template>
`)

const vueCode4=ref(
`<template>
  <ZJSvgIcons icon="copy" style="background-color: antiquewhite;"></ZJSvgIcons>
  <ZJSvgIcons icon="javaScript" style="background-color: aquamarine;border-radius: 50%;"></ZJSvgIcons>
</template>
`)
</script>
