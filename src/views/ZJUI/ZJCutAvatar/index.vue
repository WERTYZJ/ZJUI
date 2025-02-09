<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJCutAvatar(头像裁剪)</h2>
      </template>
      <h3>头像裁剪</h3>
      <p>使用avatarVal接收裁剪后的图片文件:@avatarUrl="avatarVal = $event"</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJCutAvatar @avatarUrl="avatarVal = $event"></ZJCutAvatar>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref,watch } from "vue";

const avatarVal = ref(null);

watch(()=>avatarVal.value,(newVal)=>{
  console.log("avatarVal",newVal)
})

const vueCode=ref(
`<template>
  <ZJCutAvatar @avatarUrl="avatarVal = $event"></ZJCutAvatar>
</template>

<script setup>
import { ref,watch } from "vue";

const avatarVal = ref(null);

watch(()=>avatarVal.value,(newVal)=>{
  console.log("avatarVal",newVal)
})
<script>
`)
</script>
