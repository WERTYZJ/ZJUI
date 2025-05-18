<template>
  <ZJMain>
    <template #header>
      <h2>ZJButton(按钮)</h2>
    </template>
    <h3>按钮用来触发一些操作。</h3>
    <p>基础按钮:类型type="success"</p>
    <div class="ZJDisplayFlex m-t-10">
      <ZJButton type="default" text="default"></ZJButton>
      <ZJButton type="success" text="success"></ZJButton>
      <ZJButton type="error" text="error"></ZJButton>
      <ZJButton type="info" text="info"></ZJButton>
      <ZJButton type="warning" text="warning"></ZJButton>
      <ZJButton type="info2" text="info2"></ZJButton>
    </div>
    <ZJCodeDisplay :code="vueCode1" language="vue" />
    <p>带图标按钮:icon="message"</p>
    <div class="ZJDisplayFlex m-t-10">
      <ZJButton type="default" icon="message"></ZJButton>
      <ZJButton type="success" icon="message"></ZJButton>
      <ZJButton type="error" icon="message"></ZJButton>
      <ZJButton type="info" icon="message"></ZJButton>
      <ZJButton type="warning" icon="message"></ZJButton>
    </div>
    <ZJCodeDisplay :code="vueCode2" language="vue" />
     <p>图标位置(默认图标在文字左侧):iconRight(Boolean)</p>
    <div class="ZJDisplayFlex m-t-10">
      <ZJButton type="default" text="default" icon="message" iconRight></ZJButton>
      <ZJButton type="success" text="success" icon="message" iconRight></ZJButton>
      <ZJButton type="error" text="error" icon="message" iconRight></ZJButton>
      <ZJButton type="info" text="info" icon="message" iconRight></ZJButton>
      <ZJButton type="warning" text="warning" icon="message" iconRight></ZJButton>
    </div>
    <ZJCodeDisplay :code="vueCodeRight" language="vue" />
    <p>带图标和文字按钮:文字text="success"</p>
    <div class="ZJDisplayFlex m-t-10">
      <ZJButton type="default" text="default" icon="message"></ZJButton>
      <ZJButton type="success" text="success" icon="message"></ZJButton>
      <ZJButton type="error" text="error" icon="message"></ZJButton>
      <ZJButton type="info" text="info" icon="message"></ZJButton>
      <ZJButton type="warning" text="warning" icon="message"></ZJButton>
    </div>
    <ZJCodeDisplay :code="vueCode3" language="vue" />
    <p>自定义样式按钮,背景颜色、圆角、边距、字体颜色、大小等等...</p>
    <div class="ZJDisplayFlex m-t-10">
      <ZJButton type="default" text="default" icon="message" style="border-radius:20px;"></ZJButton>
      <ZJButton type="success" text="success" icon="message" style="border-radius:20px;"></ZJButton>
      <ZJButton type="error" text="error" icon="message"
        style="background-color: blueviolet;border: 1px solid blueviolet;border-radius:20px;"></ZJButton>
      <ZJButton type="info" text="info" icon="message" style="color: coral;"></ZJButton>
      <ZJButton type="warning" icon="message" style="border-radius: 50%;padding: 0 6px;"></ZJButton>
    </div>
    <ZJCodeDisplay :code="vueCode4" language="vue" />
    <p>透明背景颜色:transparent</p>
    <div class="ZJDisplayFlex m-t-10">
      <ZJButton type="default" text="default" icon="message" transparent></ZJButton>
      <ZJButton type="success" text="success" icon="message" transparent></ZJButton>
      <ZJButton type="error" text="error" icon="message" transparent></ZJButton>
      <ZJButton type="info" text="info" icon="message" transparent></ZJButton>
      <ZJButton type="warning" text="warning" icon="message" transparent></ZJButton>
      <ZJButton type="info2" text="info2" transparent></ZJButton>
    </div>
    <ZJCodeDisplay :code="vueCode5" language="vue" />
    <p>虚线边框:dashed</p>
    <div class="ZJDisplayFlex m-t-10">
      <ZJButton type="default" text="default" icon="message" dashed transparent></ZJButton>
      <ZJButton type="success" text="success" icon="message" dashed transparent>
      </ZJButton>
      <ZJButton type="error" text="error" icon="message" dashed transparent>
      </ZJButton>
      <ZJButton type="info" text="info" icon="message" dashed transparent>
      </ZJButton>
      <ZJButton type="warning" text="warning" icon="message" dashed transparent>
      </ZJButton>
      <ZJButton type="info2" text="info2" dashed transparent></ZJButton>
    </div>
    <ZJCodeDisplay :code="vueCode6" language="vue" />
  </ZJMain>
</template>

<script setup>
import { ref } from "vue";
const vueCode1 = ref(
  `<template>
  <ZJButton type="default" text="default"></ZJButton>
  <ZJButton type="success" text="success"></ZJButton>
  <ZJButton type="error" text="error" ></ZJButton>
  <ZJButton type="info" text="info"></ZJButton>
  <ZJButton type="warning" text="warning"></ZJButton>
</template>
`)

const vueCode2 = ref(
  `<template>
  <ZJButton type="default" icon="message"></ZJButton>
  <ZJButton type="success" icon="message"></ZJButton>
  <ZJButton type="error" icon="message"></ZJButton>
  <ZJButton type="info" icon="message"></ZJButton>
  <ZJButton type="warning" icon="message"></ZJButton>
</template>
`)

const vueCode3 = ref(
  `<template>
  <ZJButton type="default" text="default" icon="message"></ZJButton>
  <ZJButton type="success" text="success" icon="message"></ZJButton>
  <ZJButton type="error" text="error" icon="message"></ZJButton>
  <ZJButton type="info" text="info" icon="message"></ZJButton>
  <ZJButton type="warning" text="warning" icon="message"></ZJButton>
</template>
`)

const vueCode4 = ref(
  `<template>
  <ZJButton type="default" text="default" icon="message" style="border-radius:20px;"></ZJButton>
  <ZJButton type="success" text="success" icon="message" style="border-radius:20px;"></ZJButton>
  <ZJButton type="error" text="error" icon="message" style="background-color: blueviolet;border: 1px solid blueviolet;border-radius:20px;"></ZJButton>
  <ZJButton type="info" text="info" icon="message" style="color: coral;"></ZJButton>
  <ZJButton type="warning"  icon="message" style="border-radius: 50%;padding: 0 6px;"></ZJButton>
</template>
`)

const vueCode5 = ref(
  `<template>
  <ZJButton type="default" text="default" icon="message" transparent></ZJButton>
  <ZJButton type="success" text="success" icon="message" transparent></ZJButton>
  <ZJButton type="error" text="error" icon="message" transparent></ZJButton>
  <ZJButton type="info" text="info" icon="message" transparent></ZJButton>
  <ZJButton type="warning"  icon="message" transparent></ZJButton>
  <ZJButton type="info2" text="info2" transparent></ZJButton>
</template>
`)

const vueCode6 = ref(
  `<template>
     <ZJButton type="default" text="default" icon="message" dashed transparent></ZJButton>
  <ZJButton 
    type="success" 
    text="success" 
    icon="message" 
    dashed
    transparent
    >
  </ZJButton>
  <ZJButton type="error" text="error" icon="message" 
    dashed
    transparent
    >
  </ZJButton>
  <ZJButton type="info" text="info" icon="message" 
    dashed
    transparent
    >
  </ZJButton>
  <ZJButton type="warning" text="warning"  icon="message" 
    dashed
    transparent
    >
  </ZJButton>
  <ZJButton type="info2" text="info2" dashed transparent></ZJButton>
</template>
`)

const vueCodeRight = ref(
  `<template>
  <ZJButton type="default" text="default" icon="message" iconRight></ZJButton>
  <ZJButton type="success" text="success" icon="message" iconRight></ZJButton>
  <ZJButton type="error" text="error" icon="message" iconRight></ZJButton>
  <ZJButton type="info" text="info" icon="message" iconRight></ZJButton>
  <ZJButton type="warning" text="warning" icon="message" iconRight></ZJButton>
</template>
`)
</script>