<template>
  <div class="ZJHeaderToolsBox" @click="openNotice">
    <ZJSvgIcons icon="notice"></ZJSvgIcons>
  </div>
</template>

<script setup>
import router from '@/router';
const openNotice = () => {
  router.push('/notice')
}
</script>

<style scoped></style>